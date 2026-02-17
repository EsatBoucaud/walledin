
import React, { useState, useMemo, useEffect, useRef, Suspense } from 'react';
import { AudioProvider, useAudio } from './context/AudioContext';
import { ProgressionProvider, useProgression } from './context/ProgressionContext';
import { StanzaLine } from './components/StanzaLine';
import { PlayerControls } from './components/PlayerControls';
import { StageLighting } from './components/StageLighting';
import { LandingPage } from './components/LandingPage';
import { VisualizerCanvas } from './components/VisualizerCanvas'; 
import { MediaCarousel } from './components/MediaCarousel';
import { NeuralBackground } from './components/NeuralBackground';
import { PresentationMode } from './components/PresentationMode';
import { Manifesto } from './components/Manifesto';
import { TRACKS } from './lib/data';
import { parseLyricJson, parseExplanationJson } from './lib/parsers';
import { applyAnalysisOverridesForTrack } from './lib/analysis-overrides-loader';
import { getHiddenSignalAnalysis } from './lib/hidden-track-analysis-loader';
import { getLocalTrackContentForTrack } from './lib/local-track-content-loader';
import { Settings, Loader2, RefreshCw, Maximize2 } from 'lucide-react';

// --- LAZY LOADED COMPONENTS (Code Splitting) ---
const AboutMe = React.lazy(() => import('./components/AboutMe').then(module => ({ default: module.AboutMe })));
const CuratorChat = React.lazy(() => import('./components/CuratorChat').then(module => ({ default: module.CuratorChat })));
const ChapterSession = React.lazy(() => import('./components/ChapterSession').then(module => ({ default: module.ChapterSession })));
const StoryArchive = React.lazy(() => import('./components/StoryArchive').then(module => ({ default: module.StoryArchive })));
const AdminPuzzleTester = React.lazy(() => import('./components/AdminPuzzleTester').then(module => ({ default: module.AdminPuzzleTester })));
const InsightArchive = React.lazy(() => import('./components/InsightArchive').then(module => ({ default: module.InsightArchive })));

const parseJsonWithRecovery = (text: string): any => {
  const noBom = text.replace(/^\uFEFF/, '');
  try {
    return JSON.parse(noBom);
  } catch {
    const fixed = noBom.replace(/,\s*([\]}])/g, '$1');
    return JSON.parse(fixed);
  }
};

const AppContent: React.FC = () => {
  const { currentTrackId, isPlaying, trackAssets, currentTime, seek, play } = useAudio();
  const { startChapter } = useProgression();
  
  // MODALS
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isCuratorOpen, setIsCuratorOpen] = useState(false);
  const [isArcadeOpen, setIsArcadeOpen] = useState(false);
  const [isInsightsOpen, setIsInsightsOpen] = useState(false);
  
  // INTRO STATE
  const [isManifestoOpen, setIsManifestoOpen] = useState(() => {
      // Check immediately on mount if previously seen to prevent flash
      return !sessionStorage.getItem('walled_garden_exhibition_opened');
  });

  // VIEW MODE: 'presentation' is now the default after landing
  const [viewMode, setViewMode] = useState<'archive' | 'presentation'>('presentation');

  // Dynamic Track Data State (for async lyric loading)
  const [dynamicTracks, setDynamicTracks] = useState(TRACKS);
  
  // LANDING PAGE STATE
  const [hasEnteredSite, setHasEnteredSite] = useState(false);

  // SCROLL SYNC STATE (For Archive View)
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const stanzaRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [autoScroll, setAutoScroll] = useState(true);
  const analyzedTrackIdsRef = useRef<Set<string>>(new Set());

  const activeTrack = useMemo(() => 
    dynamicTracks.find(t => t.id === currentTrackId) || dynamicTracks[0], 
  [currentTrackId, dynamicTracks]);

  // --- DYNAMIC DATA LOADING EFFECTS ---
  useEffect(() => {
    let cancelled = false;
    if (!activeTrack.jsonSrc || activeTrack.stanzas.length > 0) {
      return () => { cancelled = true; };
    }

    const applyLyrics = (payload: any) => {
      if (cancelled) return;
      const { stanzas, wordMap } = parseLyricJson(payload);
      setDynamicTracks(prev =>
        prev.map(t => (t.id === activeTrack.id ? { ...t, stanzas, wordMap } : t))
      );
    };

    const loadLyrics = async () => {
      try {
        const res = await fetch(activeTrack.jsonSrc as string, { cache: 'force-cache' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        applyLyrics(await res.json());
        return;
      } catch (err) {
        console.warn(`Primary lyric load failed for ${activeTrack.title}, trying local fallback:`, err);
      }

      try {
        const local = await getLocalTrackContentForTrack(activeTrack.id);
        if (local?.lyrics) {
          applyLyrics(local.lyrics);
        }
      } catch (err) {
        console.warn(`Local lyric fallback failed for ${activeTrack.title}:`, err);
      }
    };

    loadLyrics();
    return () => { cancelled = true; };
  }, [activeTrack.id, activeTrack.jsonSrc, activeTrack.stanzas.length, activeTrack.title]);

  useEffect(() => {
    let cancelled = false;
    if (!isInsightsOpen) {
      return () => { cancelled = true; };
    }

    const setAnalysisOnTrack = async (payload: any) => {
      if (cancelled) return;
      const base = parseExplanationJson(payload);
      const overridden = await applyAnalysisOverridesForTrack(activeTrack.id, base);
      if (cancelled) return;
      const analysis = overridden ?? base;
      analyzedTrackIdsRef.current.add(activeTrack.id);
      setDynamicTracks(prev =>
        prev.map(t => (t.id === activeTrack.id ? { ...t, analysis } : t))
      );
    };

    const hydrateExistingAnalysis = async () => {
      if (!activeTrack.analysis) return;
      if (analyzedTrackIdsRef.current.has(activeTrack.id)) return;
      const overridden = await applyAnalysisOverridesForTrack(activeTrack.id, activeTrack.analysis);
      if (cancelled) return;
      analyzedTrackIdsRef.current.add(activeTrack.id);
      if (overridden && overridden !== activeTrack.analysis) {
        setDynamicTracks(prev =>
          prev.map(t => (t.id === activeTrack.id ? { ...t, analysis: overridden } : t))
        );
      }
    };

    const loadAnalysis = async () => {
      // If this track already has analysis, only apply lazy overrides once.
      if (activeTrack.analysis) {
        await hydrateExistingAnalysis();
        return;
      }

      // 1) Remote JSON explanations (non-.txt) when available.
      if (activeTrack.explanationSrc && !activeTrack.explanationSrc.endsWith('.txt')) {
        try {
          const res = await fetch(activeTrack.explanationSrc, { cache: 'force-cache' });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const rawText = await res.text();
          await setAnalysisOnTrack(parseJsonWithRecovery(rawText));
          return;
        } catch (err) {
          console.warn(`Primary analysis load failed for ${activeTrack.title}, trying local fallback:`, err);
        }
      }

      // 2) Hidden signal hardcoded analysis (now lazy-loaded).
      if (activeTrack.id === 'track-mantra') {
        try {
          const hidden = await getHiddenSignalAnalysis();
          await setAnalysisOnTrack(hidden);
          return;
        } catch (err) {
          console.warn(`Hidden signal analysis load failed for ${activeTrack.title}:`, err);
        }
      }

      // 3) Local archive fallback for tracks with broken/missing remote explanations.
      try {
        const local = await getLocalTrackContentForTrack(activeTrack.id);
        if (local?.analysis) {
          await setAnalysisOnTrack(local.analysis);
        }
      } catch (err) {
        console.warn(`Local analysis fallback failed for ${activeTrack.title}:`, err);
      }
    };

    loadAnalysis();
    return () => { cancelled = true; };
  }, [isInsightsOpen, activeTrack.id, activeTrack.explanationSrc, activeTrack.analysis, activeTrack.title]);

  // --- ACTIVE STANZA CALCULATION (FOR ARCHIVE VIEW) ---
  const activeStanzaIndex = useMemo(() => {
      if (!activeTrack.wordMap.length) return -1;
      const timeMs = currentTime * 1000;
      
      let wordGlobalIndex = 0;
      for (let s = 0; s < activeTrack.stanzas.length; s++) {
          const stanza = activeTrack.stanzas[s];
          let stanzaWordCount = 0;
          stanza.forEach(line => {
              stanzaWordCount += line.trim().split(/\s+/).length;
          });

          const startWord = activeTrack.wordMap[wordGlobalIndex];
          const endWord = activeTrack.wordMap[wordGlobalIndex + stanzaWordCount - 1];
          
          if (startWord && endWord) {
              if (timeMs >= startWord.timeMs - 500 && timeMs <= endWord.timeMs + 2000) {
                  return s;
              }
          }
          wordGlobalIndex += stanzaWordCount;
      }
      return -1;
  }, [currentTime, activeTrack]);

  // --- AUTO SCROLL EFFECT (ARCHIVE VIEW) ---
  useEffect(() => {
      if (viewMode === 'archive' && autoScroll && activeStanzaIndex !== -1 && stanzaRefs.current[activeStanzaIndex]) {
          stanzaRefs.current[activeStanzaIndex]?.scrollIntoView({
              behavior: 'smooth',
              block: 'center'
          });
      }
  }, [activeStanzaIndex, autoScroll, viewMode]);

  // Reset auto-scroll when track changes
  useEffect(() => {
      setAutoScroll(true);
      if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop = 0;
      }
  }, [currentTrackId]);

  const handleUserScrollInteraction = () => {
      if (autoScroll) {
          setAutoScroll(false);
      }
  };

  // --- RENDER ---

  // 1. SQUEEZE PAGE / LANDING
  if (!hasEnteredSite) {
      return <LandingPage onEnter={() => { setHasEnteredSite(true); play(); }} />;
  }

  // 2. MAIN APPLICATION
  let wordIndexTracker = 0;
  const isLyricsLoading = activeTrack.jsonSrc && activeTrack.stanzas.length === 0;

  return (
    <>
      {/* GLOBAL INTRO - Overlays everything, then dismisses */}
      <Manifesto onClose={() => setIsManifestoOpen(false)} />

      {/* SUSPENSE WRAPPER FOR LAZY COMPONENTS */}
      <Suspense fallback={<div className="fixed inset-0 pointer-events-none" />}>
          {isAboutOpen && <AboutMe isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />}
          {isCuratorOpen && <CuratorChat isOpen={isCuratorOpen} onClose={() => setIsCuratorOpen(false)} />}
          {isArcadeOpen && <AdminPuzzleTester onClose={() => setIsArcadeOpen(false)} />}
          {isInsightsOpen && <InsightArchive track={activeTrack} onClose={() => setIsInsightsOpen(false)} />}
      </Suspense>

      {viewMode === 'presentation' ? (
          // --- PRESENTATION MODE ---
          // playIntro prop ensures the poster timer doesn't start until Manifesto is done
          <PresentationMode 
            track={activeTrack} 
            onExit={() => setViewMode('archive')} 
            playIntro={!isManifestoOpen}
          />
      ) : (
          // --- ARCHIVE / SPLIT VIEW ---
          <div className="fixed inset-0 bg-deep-bg text-slate-300 overflow-hidden flex flex-col animate-in fade-in duration-1000">
            
            <Suspense fallback={null}>
                <ChapterSession />
                <StoryArchive />
            </Suspense>
            
            <StageLighting />

            {/* --- HEADER --- */}
            <header className="fixed top-0 left-0 right-0 z-[120] h-16 flex items-center px-6 md:px-12 pointer-events-none bg-gradient-to-b from-black/80 to-transparent">
              <div className="w-full flex justify-between items-center pointer-events-auto">
                
                {/* STACKED LOGO */}
                <div className="flex items-center gap-4 group select-none">
                  <div className={`w-1 h-8 rounded-sm transition-all duration-1000 ${isPlaying ? 'bg-amber-glow shadow-[0_0_15px_#fbbf24] scale-y-110' : 'bg-white/10 scale-y-75'}`} />
                  <div className="flex flex-col justify-center space-y-[2px]">
                    <h1 className="text-xs md:text-sm font-serif font-black italic tracking-[0.4em] text-white leading-none">WALLED</h1>
                    <h1 className="text-xs md:text-sm font-sans font-light tracking-[0.4em] text-white/40 leading-none">GARDEN</h1>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <button 
                      onClick={() => setViewMode('presentation')} 
                      className="p-2 text-white/40 hover:text-white transition-all flex items-center gap-2 group"
                      title="Enter Presentation Mode"
                  >
                    <span className="hidden group-hover:block text-[9px] uppercase tracking-widest font-bold">Presentation</span>
                    <Maximize2 size={16} />
                  </button>
                  <button onClick={() => setIsAboutOpen(true)} className="p-2 text-white/20 hover:text-white transition-all">
                    <Settings size={16} />
                  </button>
                </div>
              </div>
            </header>

            {/* --- MAIN SPLIT LAYOUT --- */}
            <main className="flex-1 h-full relative z-50 pt-0 md:pt-0 pb-0 md:pb-0 md:flex md:flex-row">
              
              {/* LEFT: VISUALS */}
              <div className="fixed inset-0 z-0 md:relative md:w-[45%] md:h-full md:inset-auto flex items-center justify-center pointer-events-none md:pointer-events-auto bg-black md:border-r border-white/5 overflow-hidden">
                  
                  {/* CANVAS VISUALIZER LAYER */}
                  <div className="absolute inset-0 z-0">
                    <VisualizerCanvas active={isPlaying} trackId={currentTrackId || ''} />
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60 md:via-transparent md:to-black/50 pointer-events-none z-10" />
                  
                  <MediaCarousel items={activeTrack.media} />

                  {/* Visual Info Overlay */}
                  <div className="hidden md:block absolute bottom-8 left-8 z-20 pointer-events-none">
                      <div className="text-[9px] font-mono uppercase tracking-widest text-white/40 mb-1">Signal Processing</div>
                      <div className="text-xs text-amber-glow font-bold animate-pulse">{activeTrack.visualStyle}</div>
                  </div>
              </div>

              {/* RIGHT: LYRICS SCROLL */}
              <div className="relative z-10 w-full h-full md:w-[55%] flex flex-col bg-transparent md:bg-[#060608]/90 md:backdrop-blur-md md:border-l border-white/5 md:shadow-[-20px_0_40px_rgba(0,0,0,0.3)]">
                  
                  <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                      <NeuralBackground colorHex={activeTrack.color} />
                  </div>

                  <div 
                      ref={scrollContainerRef}
                      onWheel={handleUserScrollInteraction}
                      onTouchMove={handleUserScrollInteraction}
                      className="flex-1 overflow-y-auto custom-scrollbar relative z-10 px-6 md:px-16 pt-20 pb-48 md:pb-48 scroll-smooth"
                  >
                      <div className="flex flex-col items-start mb-12 md:mb-16 border-b border-white/10 md:border-white/5 pb-8">
                          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-2 leading-none tracking-tight drop-shadow-2xl md:drop-shadow-none">
                              {activeTrack.title}
                          </h2>
                          <div className="flex items-center gap-4 text-white/60 md:text-white/30 text-xs font-mono uppercase tracking-[0.2em] shadow-black drop-shadow-md">
                              <span>{activeTrack.artist}</span>
                              <span className="w-1 h-1 rounded-full bg-white/40" />
                              <span>{activeTrack.bpm} BPM</span>
                              <span className="w-1 h-1 rounded-full bg-white/40" />
                              <span>{activeTrack.key || 'C MINOR'}</span>
                          </div>
                      </div>

                      {isLyricsLoading ? (
                          <div className="w-full flex justify-center py-20 animate-pulse">
                              <div className="flex items-center gap-3 text-white/30">
                                  <Loader2 size={24} className="animate-spin" />
                                  <span className="text-xs font-mono uppercase tracking-widest">Decrypting Archives...</span>
                              </div>
                          </div>
                      ) : (
                          <div className="w-full max-w-3xl animate-in slide-in-from-right-4 fade-in duration-500">
                              {activeTrack.stanzas.map((stanza, sIdx) => {
                                  const isActiveStanza = sIdx === activeStanzaIndex;
                                  return (
                                      <div 
                                          key={sIdx} 
                                          ref={el => { stanzaRefs.current[sIdx] = el; }}
                                          className={`mb-16 md:mb-24 relative group transition-opacity duration-1000 ${isActiveStanza ? 'opacity-100' : 'opacity-40 hover:opacity-80'}`}
                                      >
                                          <div className="absolute -left-8 md:-left-12 top-0 text-[10px] font-mono text-white/10 group-hover:text-white/20 transition-colors select-none">
                                              {String(sIdx + 1).padStart(2, '0')}
                                          </div>

                                          {stanza.map((line, lIdx) => {
                                              const lineWordCount = line.trim().split(/\s+/).length;
                                              const startIndex = wordIndexTracker;
                                              wordIndexTracker += lineWordCount;
                                              
                                              return (
                                                  <div key={`${sIdx}-${lIdx}`} className="mb-6 drop-shadow-md md:drop-shadow-none">
                                                      <StanzaLine 
                                                          line={line} 
                                                          startIndex={startIndex} 
                                                          track={activeTrack} 
                                                          isPaused={!isPlaying}
                                                      />
                                                  </div>
                                              );
                                          })}
                                      </div>
                                  );
                              })}
                          </div>
                      )}
                      <div className="h-48" />
                  </div>

                  {!autoScroll && (
                      <div className="absolute bottom-24 right-8 z-[60] animate-in slide-in-from-bottom-4 fade-in duration-500">
                          <button 
                              onClick={() => setAutoScroll(true)}
                              className="flex items-center gap-2 bg-amber-glow text-black px-5 py-2.5 rounded-full shadow-[0_4px_20px_rgba(251,191,36,0.3)] hover:shadow-[0_4px_30px_rgba(251,191,36,0.5)] hover:scale-105 transition-all font-bold text-xs uppercase tracking-widest"
                          >
                              <RefreshCw size={14} className={isPlaying ? "animate-spin-slow" : ""} />
                              <span>Re-Sync</span>
                          </button>
                      </div>
                  )}
              </div>

            </main>

            <PlayerControls 
              onToggleGame={() => setIsArcadeOpen(true)}
              onToggleCurator={() => setIsCuratorOpen(!isCuratorOpen)}
              onToggleChapters={() => startChapter(currentTrackId || TRACKS[0].id)}
              onToggleInsights={() => setIsInsightsOpen(true)}
            />
          </div>
      )}
    </>
  );
};

const App: React.FC = () => {
  return (
    <ProgressionProvider>
      <AudioProvider>
        <AppContent />
      </AudioProvider>
    </ProgressionProvider>
  );
};

export default App;
