
import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useAudio } from '../context/AudioContext';
import { TrackData } from '../types';
import { TRACKS } from '../lib/data';
import { TEXTURES } from '../lib/constants';
import { StanzaLine } from './StanzaLine';
import { VisualizerCanvas } from './VisualizerCanvas';
import { NeuralBackground } from './NeuralBackground';
import { ChevronRight, ChevronLeft, LayoutGrid, Pause, Play, Film, Image as ImageIcon, Scan, Activity, RefreshCw } from 'lucide-react';

interface PresentationModeProps {
  track: TrackData;
  onExit: () => void;
  playIntro?: boolean; // Controls whether to run the intro timer
}

const clamp01 = (value: number): number => Math.max(0, Math.min(1, value));

type FlatLineMeta = {
    globalLineIndex: number;
    stanzaIndex: number;
    lineIndex: number;
    line: string;
    wordCount: number;
    startMs: number;
    endMs: number;
};

type StanzaWindow = {
    stanzaIndex: number;
    lineStartIndex: number;
    lineEndIndex: number;
    startMs: number;
    endMs: number;
    wordTotal: number;
    lineCount: number;
};

type MotionProfileKey = 'cinema' | 'organic' | 'tech' | 'fracture' | 'pendulum';

type MotionProfile = {
    id: MotionProfileKey;
    driftTempoX: number;
    driftTempoY: number;
    driftAmpX: number;
    driftAmpY: number;
    driftEnergyBoost: number;
    bgScaleBase: number;
    bgScaleEnergy: number;
    bgScaleBeat: number;
    wallpaperVideoBase: number;
    wallpaperImageBase: number;
    visualizerBase: number;
    visualizerEnergy: number;
    neuralBase: number;
    neuralEnergy: number;
    spotlightStartX: number;
    spotlightTravel: number;
    spotlightBaseY: number;
    spotlightWobble: number;
    spotlightSoftness: number;
    vignetteBase: number;
    vignetteEnergy: number;
    introFloatAmp: number;
    headerSwayAmp: number;
    stanzaActiveScaleBase: number;
    stanzaActiveScaleEnergy: number;
    stanzaIdleScale: number;
    stanzaYOffsetAmp: number;
    lineActiveScaleBase: number;
    lineActiveScaleEnergy: number;
    lineNearScale: number;
    lineFarScale: number;
    lineYOffsetAmp: number;
    lineNearOpacity: number;
    lineFarOpacity: number;
    lineGlowBase: number;
    lineGlowEnergy: number;
    minimapWidth: number;
    minimapGap: number;
    footerBars: number;
    footerBarBase: number;
    footerBarRange: number;
    footerTempo: number;
    footerBreath: number;
    sheenTravel: number;
};

const MOTION_PROFILES: Record<MotionProfileKey, MotionProfile> = {
    cinema: {
        id: 'cinema',
        driftTempoX: 1800,
        driftTempoY: 2600,
        driftAmpX: 1.2,
        driftAmpY: 0.8,
        driftEnergyBoost: 4,
        bgScaleBase: 1.03,
        bgScaleEnergy: 0.05,
        bgScaleBeat: 0.01,
        wallpaperVideoBase: 0.5,
        wallpaperImageBase: 0.38,
        visualizerBase: 0.08,
        visualizerEnergy: 0.24,
        neuralBase: 0.05,
        neuralEnergy: 0.2,
        spotlightStartX: 16,
        spotlightTravel: 68,
        spotlightBaseY: 32,
        spotlightWobble: 6,
        spotlightSoftness: 56,
        vignetteBase: 0.2,
        vignetteEnergy: 0.32,
        introFloatAmp: 0.8,
        headerSwayAmp: 0.6,
        stanzaActiveScaleBase: 1,
        stanzaActiveScaleEnergy: 0.02,
        stanzaIdleScale: 0.985,
        stanzaYOffsetAmp: 3,
        lineActiveScaleBase: 1.16,
        lineActiveScaleEnergy: 0.04,
        lineNearScale: 1.09,
        lineFarScale: 1.04,
        lineYOffsetAmp: 6,
        lineNearOpacity: 0.82,
        lineFarOpacity: 0.62,
        lineGlowBase: 14,
        lineGlowEnergy: 20,
        minimapWidth: 3,
        minimapGap: 2,
        footerBars: 11,
        footerBarBase: 8,
        footerBarRange: 22,
        footerTempo: 560,
        footerBreath: 0.04,
        sheenTravel: 170
    },
    organic: {
        id: 'organic',
        driftTempoX: 2600,
        driftTempoY: 3300,
        driftAmpX: 1.8,
        driftAmpY: 1.4,
        driftEnergyBoost: 5,
        bgScaleBase: 1.035,
        bgScaleEnergy: 0.06,
        bgScaleBeat: 0.008,
        wallpaperVideoBase: 0.46,
        wallpaperImageBase: 0.36,
        visualizerBase: 0.06,
        visualizerEnergy: 0.2,
        neuralBase: 0.08,
        neuralEnergy: 0.24,
        spotlightStartX: 12,
        spotlightTravel: 64,
        spotlightBaseY: 34,
        spotlightWobble: 8,
        spotlightSoftness: 62,
        vignetteBase: 0.18,
        vignetteEnergy: 0.25,
        introFloatAmp: 1.4,
        headerSwayAmp: 0.9,
        stanzaActiveScaleBase: 1.01,
        stanzaActiveScaleEnergy: 0.03,
        stanzaIdleScale: 0.99,
        stanzaYOffsetAmp: 4.5,
        lineActiveScaleBase: 1.14,
        lineActiveScaleEnergy: 0.05,
        lineNearScale: 1.08,
        lineFarScale: 1.03,
        lineYOffsetAmp: 7,
        lineNearOpacity: 0.85,
        lineFarOpacity: 0.65,
        lineGlowBase: 12,
        lineGlowEnergy: 18,
        minimapWidth: 4,
        minimapGap: 2.5,
        footerBars: 13,
        footerBarBase: 9,
        footerBarRange: 20,
        footerTempo: 640,
        footerBreath: 0.05,
        sheenTravel: 160
    },
    tech: {
        id: 'tech',
        driftTempoX: 1200,
        driftTempoY: 3000,
        driftAmpX: 1.4,
        driftAmpY: 0.5,
        driftEnergyBoost: 3.5,
        bgScaleBase: 1.022,
        bgScaleEnergy: 0.032,
        bgScaleBeat: 0.006,
        wallpaperVideoBase: 0.52,
        wallpaperImageBase: 0.4,
        visualizerBase: 0.12,
        visualizerEnergy: 0.3,
        neuralBase: 0.04,
        neuralEnergy: 0.16,
        spotlightStartX: 22,
        spotlightTravel: 58,
        spotlightBaseY: 30,
        spotlightWobble: 4,
        spotlightSoftness: 50,
        vignetteBase: 0.24,
        vignetteEnergy: 0.36,
        introFloatAmp: 0.6,
        headerSwayAmp: 0.5,
        stanzaActiveScaleBase: 1,
        stanzaActiveScaleEnergy: 0.015,
        stanzaIdleScale: 0.982,
        stanzaYOffsetAmp: 2.6,
        lineActiveScaleBase: 1.14,
        lineActiveScaleEnergy: 0.035,
        lineNearScale: 1.07,
        lineFarScale: 1.025,
        lineYOffsetAmp: 4.8,
        lineNearOpacity: 0.78,
        lineFarOpacity: 0.58,
        lineGlowBase: 16,
        lineGlowEnergy: 22,
        minimapWidth: 2.5,
        minimapGap: 1.5,
        footerBars: 15,
        footerBarBase: 7,
        footerBarRange: 20,
        footerTempo: 500,
        footerBreath: 0.03,
        sheenTravel: 190
    },
    fracture: {
        id: 'fracture',
        driftTempoX: 1500,
        driftTempoY: 2200,
        driftAmpX: 1.6,
        driftAmpY: 1,
        driftEnergyBoost: 5.2,
        bgScaleBase: 1.03,
        bgScaleEnergy: 0.058,
        bgScaleBeat: 0.012,
        wallpaperVideoBase: 0.53,
        wallpaperImageBase: 0.4,
        visualizerBase: 0.1,
        visualizerEnergy: 0.28,
        neuralBase: 0.06,
        neuralEnergy: 0.2,
        spotlightStartX: 14,
        spotlightTravel: 72,
        spotlightBaseY: 31,
        spotlightWobble: 9,
        spotlightSoftness: 54,
        vignetteBase: 0.25,
        vignetteEnergy: 0.38,
        introFloatAmp: 1.1,
        headerSwayAmp: 0.8,
        stanzaActiveScaleBase: 1.012,
        stanzaActiveScaleEnergy: 0.03,
        stanzaIdleScale: 0.98,
        stanzaYOffsetAmp: 5.5,
        lineActiveScaleBase: 1.17,
        lineActiveScaleEnergy: 0.05,
        lineNearScale: 1.1,
        lineFarScale: 1.03,
        lineYOffsetAmp: 8,
        lineNearOpacity: 0.8,
        lineFarOpacity: 0.56,
        lineGlowBase: 18,
        lineGlowEnergy: 26,
        minimapWidth: 3.5,
        minimapGap: 2,
        footerBars: 11,
        footerBarBase: 9,
        footerBarRange: 24,
        footerTempo: 460,
        footerBreath: 0.055,
        sheenTravel: 180
    },
    pendulum: {
        id: 'pendulum',
        driftTempoX: 2300,
        driftTempoY: 2300,
        driftAmpX: 1.3,
        driftAmpY: 1.3,
        driftEnergyBoost: 4.2,
        bgScaleBase: 1.028,
        bgScaleEnergy: 0.04,
        bgScaleBeat: 0.01,
        wallpaperVideoBase: 0.48,
        wallpaperImageBase: 0.37,
        visualizerBase: 0.09,
        visualizerEnergy: 0.22,
        neuralBase: 0.07,
        neuralEnergy: 0.2,
        spotlightStartX: 18,
        spotlightTravel: 60,
        spotlightBaseY: 33,
        spotlightWobble: 10,
        spotlightSoftness: 58,
        vignetteBase: 0.21,
        vignetteEnergy: 0.29,
        introFloatAmp: 1,
        headerSwayAmp: 1.2,
        stanzaActiveScaleBase: 1.008,
        stanzaActiveScaleEnergy: 0.022,
        stanzaIdleScale: 0.986,
        stanzaYOffsetAmp: 4.8,
        lineActiveScaleBase: 1.15,
        lineActiveScaleEnergy: 0.04,
        lineNearScale: 1.085,
        lineFarScale: 1.035,
        lineYOffsetAmp: 7.2,
        lineNearOpacity: 0.82,
        lineFarOpacity: 0.6,
        lineGlowBase: 14,
        lineGlowEnergy: 21,
        minimapWidth: 3,
        minimapGap: 2,
        footerBars: 9,
        footerBarBase: 8,
        footerBarRange: 21,
        footerTempo: 700,
        footerBreath: 0.045,
        sheenTravel: 165
    }
};

const VISUAL_STYLE_TO_PROFILE: Partial<Record<TrackData['visualStyle'], MotionProfileKey>> = {
    'type-brutal': 'tech',
    'construct': 'tech',
    'scanline-crt': 'tech',
    'vhs-tracking': 'tech',
    'chromatic-ghost': 'tech',
    'containment-box': 'tech',
    'perspective-tilt': 'tech',
    'focus-depth': 'organic',
    'kinetic-float': 'organic',
    'loom-weave': 'organic',
    'boids': 'organic',
    'spiders': 'organic',
    'prism-split': 'organic',
    'chrome-liquid': 'organic',
    'nuclear-haze': 'fracture',
    'snare-impact': 'fracture',
    'pillars': 'fracture',
    'strobe-sync': 'fracture',
    'weight-shift': 'fracture',
    'neon-pulse': 'fracture',
    'pendulum': 'pendulum',
    'lorenz': 'pendulum',
    'neural-spark': 'pendulum'
};

const resolveMotionProfile = (style: TrackData['visualStyle']): MotionProfile =>
    MOTION_PROFILES[VISUAL_STYLE_TO_PROFILE[style] ?? 'cinema'];

// --- SUB-COMPONENT: UNIQUE POSTER FRAME (Intro) ---
const PosterFrame: React.FC<{ track: TrackData; isPlaying: boolean; beatPulse: number; motionEnergy: number }> = ({ track, isPlaying, beatPulse, motionEnergy }) => {
    const style = track.visualStyle;
    
    // Determine frame vibe
    const isTech = ['type-brutal', 'construct', 'scanline-crt', 'vhs-tracking'].includes(style);
    const isOrganic = ['focus-depth', 'kinetic-float', 'loom-weave', 'earnest'].includes(style);
    const isAggressive = ['nuclear-haze', 'strobe-sync', 'snare-impact', 'pillars'].includes(style);

    return (
        <div className="relative group perspective-1000">
            {/* 1. DYNAMIC AURA (Background) */}
            <div 
                className="absolute inset-0 z-0 blur-[80px] opacity-60 transition-all duration-1000 animate-pulse-slow"
                style={{ 
                    backgroundColor: track.color || '#ffffff',
                    transform: isPlaying
                        ? `scale(${1.12 + motionEnergy * 0.08}) translate3d(${Math.sin(beatPulse * Math.PI) * 4}px, ${Math.cos(beatPulse * Math.PI) * 2}px, 0)`
                        : 'scale(1)'
                }} 
            />
            
            {/* 2. STYLE-SPECIFIC BACKGROUND FX */}
            {isTech && (
                <>
                    {/* Replaced spinning border with static tech frame */}
                    <div className="absolute -inset-4 border border-white/10 z-0" />
                    <div className="absolute -inset-2 border-t border-b border-white/20 z-0 animate-pulse" />
                    {/* Corner Markers */}
                    <div className="absolute -top-6 -left-6 w-4 h-4 border-t-2 border-l-2 border-white/40" />
                    <div className="absolute -bottom-6 -right-6 w-4 h-4 border-b-2 border-r-2 border-white/40" />
                </>
            )}

            {isOrganic && (
                <>
                    <div className="absolute inset-0 rounded-full border border-white/5 scale-110 animate-ping opacity-20 duration-[3000ms]" />
                    <div className="absolute inset-0 rounded-full border border-white/10 scale-105 animate-pulse opacity-30" />
                </>
            )}

            {isAggressive && (
                <div className="absolute inset-0 bg-red-500/10 mix-blend-color-dodge animate-pulse z-0 blur-xl" />
            )}

            {/* 3. MAIN POSTER CONTAINER */}
            <div 
                className={`
                    relative z-10 w-[70vw] h-[70vw] md:w-[500px] md:h-[500px] 
                    bg-black shadow-[0_30px_60px_rgba(0,0,0,0.8)]
                    overflow-hidden transition-all duration-[2s] ease-out
                    ${isOrganic ? 'rounded-full' : 'rounded-sm'}
                    ${isTech ? 'border-2 border-white/10' : ''}
                    hover:scale-[1.01]
                `}
            >
                {/* Image Layer */}
                <img 
                    src={track.coverArt} 
                    className={`
                        w-full h-full object-cover transition-transform duration-[10s] ease-linear
                        ${isPlaying ? 'scale-110' : 'scale-100'} 
                        ${style === 'vhs-tracking' ? 'grayscale contrast-125' : ''}
                    `}
                    alt="" 
                />

                {/* Overlay Texture (Grain/Scanlines) */}
                <div 
                    className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" 
                    style={{ backgroundImage: `url(${TEXTURES.STARDUST})` }}
                />
                {isTech && (
                    <div 
                        className="absolute inset-0 z-20 pointer-events-none"
                        style={{ 
                            background: TEXTURES.NOISE_OVERLAY, 
                            backgroundSize: '100% 2px, 3px 100%' 
                        }}
                    />
                )}
                
                {/* Rim Light */}
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />
            </div>

            {/* 4. FOREGROUND FLOATING ELEMENTS */}
            {isTech && (
                <div className="absolute -right-8 top-12 flex flex-col gap-2 text-[9px] font-mono text-white/40 uppercase tracking-widest vertical-rl rotate-180">
                    <span>SYS.OVRD</span>
                    <span>{track.bpm} BPM</span>
                </div>
            )}
        </div>
    );
};


export const PresentationMode: React.FC<PresentationModeProps> = ({ track, onExit, playIntro = true }) => {
  const trackColor = track.color || '#fbbf24';
  const motionProfile = useMemo(() => resolveMotionProfile(track.visualStyle), [track.visualStyle]);
  const { 
    isPlaying, 
    currentTime, 
    duration, 
    togglePlayPause, 
    seek,
    selectTrack, 
    currentTrackId 
  } = useAudio();

  // Scroll & Sync State
  const [autoScroll, setAutoScroll] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]); // Flat array of line refs
  
  // --- PRESENTATION STATE ---
  const [showIntro, setShowIntro] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // --- ASSET RESOLUTION ---
  const backgroundVideoSrc = useMemo(() => {
      if (!track.media) return track.videoSrc; 
      const standardVid = track.media.find(m => m.type === 'video' && !m.filename.toLowerCase().includes('decon'));
      const anyVid = track.media.find(m => m.type === 'video');
      return standardVid?.url || anyVid?.url || track.videoSrc;
  }, [track]);

  const backgroundImageSrc = useMemo(() => {
      const img = track.media?.find(m => m.type === 'image');
      return img?.url || track.coverArt;
  }, [track]);

  // --- INTRO SEQUENCE ENGINE ---
  useEffect(() => {
      // Always reset intro to visible when track changes
      setShowIntro(true);
      setAutoScroll(true); 
      
      // Only start the dismiss timer if we are allowed to play the intro (i.e. global intro is done)
      if (playIntro) {
          const t = setTimeout(() => {
              setShowIntro(false);
          }, 3500); 
          return () => clearTimeout(t);
      }
  }, [track.id, playIntro]);

  // --- CALCULATE ACTIVE LINE INDEX ---
  // Returns the index of the line that should currently be centered
  const activeGlobalLineIndex = useMemo(() => {
      if (!track.wordMap.length) return -1;
      const timeMs = currentTime * 1000;
      let globalLineIndex = 0;
      let globalWordIndex = 0;

      for (let s = 0; s < track.stanzas.length; s++) {
          for (let l = 0; l < track.stanzas[s].length; l++) {
              const line = track.stanzas[s][l];
              const wordCount = line.trim().split(/\s+/).length;
              
              const startWord = track.wordMap[globalWordIndex];
              const endWord = track.wordMap[globalWordIndex + wordCount - 1];

              if (startWord) {
                  // A line is "active" from its start time until slightly after its end time
                  // or until the next line starts.
                  const endTime = endWord ? endWord.timeMs + 500 : startWord.timeMs + 2000;
                  if (timeMs >= startWord.timeMs - 500 && timeMs <= endTime) {
                      return globalLineIndex;
                  }
              }
              
              globalWordIndex += wordCount;
              globalLineIndex++;
          }
      }
      return -1;
  }, [currentTime, track]);

  const timeline = useMemo(() => {
      const lines: FlatLineMeta[] = [];
      const stanzas: StanzaWindow[] = [];
      let globalLineIndex = 0;
      let globalWordIndex = 0;
      let previousEndMs = 0;

      for (let s = 0; s < track.stanzas.length; s++) {
          const stanza = track.stanzas[s];
          const lineStartIndex = globalLineIndex;
          let stanzaStartMs = Number.POSITIVE_INFINITY;
          let stanzaEndMs = 0;
          let wordTotal = 0;

          for (let l = 0; l < stanza.length; l++) {
              const line = stanza[l];
              const wordCount = line.trim().split(/\s+/).length;
              const startWord = track.wordMap[globalWordIndex];
              const endWord = track.wordMap[globalWordIndex + wordCount - 1];

              const fallbackStart = previousEndMs + 220;
              const startMs = startWord?.timeMs ?? fallbackStart;
              let endMs = endWord?.timeMs ?? (startMs + Math.max(1400, wordCount * 280));
              if (endMs <= startMs) endMs = startMs + Math.max(1200, wordCount * 240);
              endMs += 500;

              lines.push({
                  globalLineIndex,
                  stanzaIndex: s,
                  lineIndex: l,
                  line,
                  wordCount,
                  startMs,
                  endMs
              });

              stanzaStartMs = Math.min(stanzaStartMs, startMs);
              stanzaEndMs = Math.max(stanzaEndMs, endMs);
              previousEndMs = Math.max(previousEndMs, endMs);

              wordTotal += wordCount;
              globalWordIndex += wordCount;
              globalLineIndex += 1;
          }

          if (!Number.isFinite(stanzaStartMs)) {
              stanzaStartMs = previousEndMs + 200;
              stanzaEndMs = stanzaStartMs + 1800;
              previousEndMs = stanzaEndMs;
          }

          stanzas.push({
              stanzaIndex: s,
              lineStartIndex,
              lineEndIndex: Math.max(lineStartIndex, globalLineIndex - 1),
              startMs: stanzaStartMs,
              endMs: stanzaEndMs,
              wordTotal,
              lineCount: stanza.length
          });
      }

      return { lines, stanzas };
  }, [track.stanzas, track.wordMap]);

  const currentMs = currentTime * 1000;
  const playbackProgress = useMemo(() => duration > 0 ? clamp01(currentTime / duration) : 0, [currentTime, duration]);
  const beatPhase = useMemo(() => {
      const beats = currentTime * (track.bpm / 60);
      return beats - Math.floor(beats);
  }, [currentTime, track.bpm]);
  const beatPulse = useMemo(
      () => (isPlaying ? (1 - Math.cos(beatPhase * Math.PI * 2)) * 0.5 : 0),
      [isPlaying, beatPhase]
  );

  const activeLineMeta = activeGlobalLineIndex >= 0 ? timeline.lines[activeGlobalLineIndex] : null;
  const activeStanzaIndex = activeLineMeta?.stanzaIndex ?? -1;
  const activeLineProgress = useMemo(() => {
      if (!activeLineMeta) return 0;
      const span = Math.max(1, activeLineMeta.endMs - activeLineMeta.startMs);
      return clamp01((currentMs - activeLineMeta.startMs) / span);
  }, [activeLineMeta, currentMs]);

  const lineDensity = useMemo(() => {
      if (!activeLineMeta) return 0;
      const seconds = Math.max(0.35, (activeLineMeta.endMs - activeLineMeta.startMs) / 1000);
      return clamp01(activeLineMeta.wordCount / (seconds * 5));
  }, [activeLineMeta]);

  const motionEnergy = useMemo(
      () => (isPlaying ? clamp01(0.12 + beatPulse * 0.55 + lineDensity * 0.4) : 0.08),
      [isPlaying, beatPulse, lineDensity]
  );

  const stanzaProgressByIndex = useMemo(() => {
      const progress = new Map<number, number>();
      timeline.stanzas.forEach((stanza) => {
          const span = Math.max(1, stanza.endMs - stanza.startMs);
          progress.set(stanza.stanzaIndex, clamp01((currentMs - stanza.startMs) / span));
      });
      return progress;
  }, [timeline.stanzas, currentMs]);

  const backgroundTransform = useMemo(() => {
      const driftX = Math.sin(currentMs / motionProfile.driftTempoX + beatPhase * Math.PI * 2) *
          (motionProfile.driftAmpX + motionEnergy * motionProfile.driftEnergyBoost);
      const driftY = Math.cos(currentMs / motionProfile.driftTempoY + Math.PI / 4) *
          (motionProfile.driftAmpY + motionEnergy * motionProfile.driftEnergyBoost * 0.72);
      const scale = motionProfile.bgScaleBase + motionEnergy * motionProfile.bgScaleEnergy + beatPulse * motionProfile.bgScaleBeat;
      return `translate3d(${driftX.toFixed(2)}px, ${driftY.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
  }, [currentMs, beatPhase, motionEnergy, beatPulse, motionProfile]);

  const wallpaperOpacity = useMemo(
      () => clamp01(
          (videoEnabled ? motionProfile.wallpaperVideoBase : motionProfile.wallpaperImageBase) +
          motionEnergy * 0.24
      ),
      [videoEnabled, motionEnergy, motionProfile]
  );

  const visualizerOpacity = useMemo(
      () => clamp01(motionProfile.visualizerBase + motionEnergy * motionProfile.visualizerEnergy),
      [motionEnergy, motionProfile]
  );
  const neuralOpacity = useMemo(
      () => clamp01(motionProfile.neuralBase + motionEnergy * motionProfile.neuralEnergy),
      [motionEnergy, motionProfile]
  );
  const stanzaCount = Math.max(track.stanzas.length, timeline.stanzas.length, 1);
  const lineCount = Math.max(timeline.lines.length, 1);
  const activeStanzaDisplay = activeStanzaIndex >= 0 ? activeStanzaIndex + 1 : 1;
  const activeLineDisplay = activeGlobalLineIndex >= 0 ? activeGlobalLineIndex + 1 : 1;
  const spotlightX = useMemo(
      () => motionProfile.spotlightStartX + playbackProgress * motionProfile.spotlightTravel,
      [playbackProgress, motionProfile]
  );
  const spotlightY = useMemo(
      () => motionProfile.spotlightBaseY + Math.sin(currentMs / 2500 + beatPhase * Math.PI) *
          (motionProfile.spotlightWobble + motionEnergy * 8),
      [currentMs, beatPhase, motionEnergy, motionProfile]
  );
  const stageVignetteOpacity = useMemo(
      () => clamp01(motionProfile.vignetteBase + motionEnergy * motionProfile.vignetteEnergy),
      [motionEnergy, motionProfile]
  );
  const footerControlScale = useMemo(
      () => 1 + beatPulse * motionProfile.footerBreath,
      [beatPulse, motionProfile]
  );
  const footerMeter = useMemo(
      () =>
          Array.from({ length: motionProfile.footerBars }, (_, idx) => {
              const phase = currentMs / motionProfile.footerTempo + idx * 0.72 + beatPhase * Math.PI * 2;
              const wave = Math.abs(Math.sin(phase));
              return clamp01(0.22 + wave * (0.52 + motionEnergy * 0.36) + lineDensity * 0.18);
          }),
      [currentMs, beatPhase, motionEnergy, lineDensity, motionProfile]
  );

  // --- AUTO SCROLL EFFECT ---
  useEffect(() => {
      if (autoScroll && activeGlobalLineIndex !== -1 && lineRefs.current[activeGlobalLineIndex]) {
          lineRefs.current[activeGlobalLineIndex]?.scrollIntoView({
              behavior: 'smooth',
              block: 'center'
          });
      }
  }, [activeGlobalLineIndex, autoScroll]);

  // --- AUTO TRACK SWITCHING ---
  useEffect(() => {
    if (duration > 0 && currentTime >= duration - 0.5) {
        const currentIndex = TRACKS.findIndex(t => t.id === currentTrackId);
        const nextIndex = (currentIndex + 1) % TRACKS.length;
        selectTrack(TRACKS[nextIndex].id);
    }
  }, [currentTime, duration, currentTrackId, selectTrack]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentIndex = TRACKS.findIndex(t => t.id === currentTrackId);
    const nextIndex = (currentIndex + 1) % TRACKS.length;
    selectTrack(TRACKS[nextIndex].id);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentIndex = TRACKS.findIndex(t => t.id === currentTrackId);
    const prevIndex = (currentIndex - 1 + TRACKS.length) % TRACKS.length;
    selectTrack(TRACKS[prevIndex].id);
  };

  const handleSync = () => {
      setAutoScroll(true);
      // Force immediate scroll attempt
      if (activeGlobalLineIndex !== -1 && lineRefs.current[activeGlobalLineIndex]) {
          lineRefs.current[activeGlobalLineIndex]?.scrollIntoView({
              behavior: 'smooth',
              block: 'center'
          });
      }
  };

  const handleJumpToStanza = (stanzaIndex: number) => {
      const stanza = timeline.stanzas[stanzaIndex];
      if (!stanza) return;

      const firstLine = timeline.lines[stanza.lineStartIndex];
      if (firstLine) {
          seek(firstLine.startMs / 1000);
          setAutoScroll(true);
      }
  };

  // Logic for tracking word indices as we map through stanzas
  let wordIndexRenderTracker = 0;
  let lineIndexRenderTracker = 0;

  return (
    <div className="fixed inset-0 z-[100] bg-black text-white flex flex-col overflow-hidden animate-in fade-in duration-1000 font-sans">
      
      {/* 1. WALLPAPER ENGINE (Background) */}
      <div className="absolute inset-0 z-0">
          {videoEnabled && backgroundVideoSrc ? (
              <video 
                ref={videoRef}
                key={backgroundVideoSrc} // Force remount on change
                src={backgroundVideoSrc} 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover transition-all duration-[900ms] ease-linear"
                style={{
                    opacity: wallpaperOpacity,
                    transform: backgroundTransform,
                    filter: `saturate(${1 + motionEnergy * 0.25}) contrast(${1 + motionEnergy * 0.12})`
                }}
              />
          ) : (
              <img 
                src={backgroundImageSrc} 
                className="w-full h-full object-cover transition-all duration-[900ms] ease-linear"
                style={{
                    opacity: wallpaperOpacity,
                    transform: backgroundTransform,
                    filter: `saturate(${1 + motionEnergy * 0.22}) contrast(${1 + motionEnergy * 0.1})`
                }}
                alt="Wallpaper"
              />
          )}
          
          {/* Gradient Overlays for Readability */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80 transition-opacity duration-700"
            style={{ opacity: clamp01(0.72 + motionEnergy * 0.24) }}
          />
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-[2px] transition-opacity duration-700"
            style={{ opacity: clamp01(0.65 + motionEnergy * 0.2) }}
          />
          <div
            className="absolute inset-0 pointer-events-none transition-all duration-500"
            style={{
              opacity: stageVignetteOpacity,
              background: `radial-gradient(circle at ${spotlightX.toFixed(2)}% ${spotlightY.toFixed(2)}%, ${trackColor}42 0%, ${trackColor}00 ${motionProfile.spotlightSoftness}%)`
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500"
            style={{
              opacity: clamp01(0.16 + motionEnergy * 0.24),
              background:
                'linear-gradient(110deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 28%, rgba(255,255,255,0.00) 65%)'
            }}
          />
          
          {/* Subtle Tech Texture Layer */}
          <div
            className="absolute inset-0 mix-blend-screen pointer-events-none transition-opacity duration-500"
            style={{ opacity: visualizerOpacity }}
          >
             <VisualizerCanvas active={true} trackId={track.id} />
          </div>
          <div
            className="absolute inset-0 mix-blend-screen pointer-events-none transition-opacity duration-500"
            style={{ opacity: neuralOpacity }}
          >
             <NeuralBackground colorHex={track.color} />
          </div>
      </div>

      {/* 2. INTRO OVERLAY (Cinema Title Card) */}
      <div 
        className={`absolute inset-0 z-[80] flex flex-col items-center justify-center bg-black/90 backdrop-blur-xl transition-all duration-[1500ms] ease-in-out ${showIntro ? 'opacity-100' : 'opacity-0 pointer-events-none delay-500'}`}
        style={{
          backgroundColor: `rgba(0,0,0,${0.82 + motionEnergy * 0.1})`
        }}
      >
          <div
            className={`flex flex-col items-center gap-12 transition-all duration-[2000ms] ease-out ${showIntro ? 'scale-100 translate-y-0 blur-0' : 'scale-110 -translate-y-12 blur-lg'}`}
            style={{
              transform: showIntro
                ? `translate3d(0, ${Math.sin(currentMs / 1300) * (motionProfile.introFloatAmp + motionEnergy * 1.6)}px, 0)`
                : undefined
            }}
          >
               
              {/* ENHANCED POSTER COMPONENT */}
              <PosterFrame track={track} isPlaying={isPlaying} beatPulse={beatPulse} motionEnergy={motionEnergy} />
              
              <div className="text-center space-y-4">
                  <h1 className="text-6xl md:text-9xl font-serif font-bold text-white tracking-tight leading-none mix-blend-difference drop-shadow-2xl">
                      {track.title}
                  </h1>
                  <div className="flex items-center justify-center gap-6 text-sm font-mono uppercase tracking-[0.3em] text-white/50">
                      <span className="flex items-center gap-2"><Scan size={14} /> {track.artist}</span>
                      <span
                        className="w-1.5 h-1.5 bg-amber-glow rounded-full"
                        style={{ transform: `scale(${1 + beatPulse * 0.4})` }}
                      />
                      <span className="flex items-center gap-2"><Activity size={14} /> {track.bpm} BPM</span>
                  </div>
              </div>
          </div>
      </div>

      {/* 3. HEADER CONTROLS */}
      <div
        className={`absolute top-0 left-0 right-0 z-50 p-6 md:p-8 flex justify-between items-start transition-opacity duration-1000 ${showIntro ? 'opacity-0' : 'opacity-100'}`}
        style={{
          transform: `translate3d(0, ${Math.sin(currentMs / 1700) * (motionProfile.headerSwayAmp + motionEnergy)}px, 0)`
        }}
      >
        <div className="space-y-1">
            {/* Small Title (Visible after intro) */}
            <h2
            className="text-2xl font-serif font-bold tracking-tight text-white drop-shadow-md opacity-80 transition-[text-shadow] duration-500"
              style={{ textShadow: `0 0 ${14 + motionEnergy * 20}px ${trackColor}33` }}
            >
                {track.title}
            </h2>
            <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">
                <span style={{ color: trackColor }}>{track.visualStyle.replace(/-/g, ' ')}</span>
                <span className="text-white/30">S {activeStanzaDisplay}/{stanzaCount}</span>
                <span className="text-white/30">L {activeLineDisplay}/{lineCount}</span>
            </div>
            <div className="mt-2 w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300 ease-linear"
                  style={{
                    width: `${playbackProgress * 100}%`,
                    backgroundColor: trackColor,
                    boxShadow: `0 0 ${10 + motionEnergy * 16}px ${trackColor}66`
                  }}
                />
            </div>
        </div>
        
        <div className="flex items-center gap-4">
            <div
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-black/30 backdrop-blur-md text-[10px] font-mono uppercase tracking-[0.22em] text-white/50"
              style={{ boxShadow: `0 0 ${6 + motionEnergy * 12}px ${trackColor}33` }}
            >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: trackColor,
                    transform: `scale(${1 + beatPulse * 0.45})`,
                    opacity: clamp01(0.55 + beatPulse * 0.4)
                  }}
                />
                <span>{autoScroll ? 'sync lock' : 'manual drift'}</span>
            </div>
            {/* Video/Image Toggle */}
            {backgroundVideoSrc && (
                <button 
                    onClick={() => setVideoEnabled(!videoEnabled)}
                    className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full backdrop-blur-md transition-all text-white/60 hover:text-white"
                    title={videoEnabled ? "Disable Video Loop" : "Enable Video Loop"}
                >
                    {videoEnabled ? <Film size={16} /> : <ImageIcon size={16} />}
                </button>
            )}

            <button 
                onClick={onExit}
                className="group flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full backdrop-blur-md transition-all text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white"
            >
                <LayoutGrid size={14} />
                <span className="hidden md:inline">Archive View</span>
            </button>
        </div>
      </div>

      {/* 4. MAIN LYRIC STAGE (SCROLLABLE STREAM) */}
      <div className={`flex-1 relative z-20 w-full overflow-hidden transition-opacity duration-1000 ${showIntro ? 'opacity-0' : 'opacity-100'}`}>
         
         <div 
            ref={scrollContainerRef}
            onWheel={() => { if(autoScroll) setAutoScroll(false); }}
            onTouchMove={() => { if(autoScroll) setAutoScroll(false); }}
            className="h-full w-full overflow-y-auto px-6 md:px-24 py-[50vh] scroll-smooth no-scrollbar"
            style={{ 
                maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)'
            }}
         >
            <div className="max-w-6xl mx-auto text-center space-y-16 md:space-y-24">
                {track.stanzas.map((stanza, sIdx) => {
                    const stanzaProgress = stanzaProgressByIndex.get(sIdx) ?? (sIdx < activeStanzaIndex ? 1 : 0);
                    const isActiveStanza = sIdx === activeStanzaIndex;
                    const isPastStanza = activeStanzaIndex >= 0 && sIdx < activeStanzaIndex;
                    const stanzaOpacity = isActiveStanza ? 1 : isPastStanza ? 0.78 : 0.58;
                    const stanzaScale = isActiveStanza
                        ? motionProfile.stanzaActiveScaleBase + motionEnergy * motionProfile.stanzaActiveScaleEnergy
                        : motionProfile.stanzaIdleScale;
                    const stanzaYOffset = isActiveStanza
                        ? (0.5 - activeLineProgress) * (motionProfile.stanzaYOffsetAmp + motionEnergy * 4)
                        : 0;

                    return (
                        <div
                            key={sIdx}
                            className="relative space-y-6 md:space-y-10 rounded-2xl transition-all duration-700"
                            style={{
                                opacity: stanzaOpacity,
                                transform: `translate3d(0, ${stanzaYOffset.toFixed(2)}px, 0) scale(${stanzaScale.toFixed(4)})`,
                                boxShadow: isActiveStanza ? `0 0 ${22 + motionEnergy * 30}px ${trackColor}26` : 'none'
                            }}
                        >
                            <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-[55%] max-w-lg h-[2px] bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-300 ease-linear"
                                    style={{
                                        width: `${clamp01(stanzaProgress) * 100}%`,
                                        backgroundColor: trackColor,
                                        boxShadow: `0 0 ${8 + motionEnergy * 14}px ${trackColor}66`
                                    }}
                                />
                            </div>

                            {stanza.map((line, lIdx) => {
                                const lineWordCount = line.trim().split(/\s+/).length;
                                const startIndex = wordIndexRenderTracker;
                                wordIndexRenderTracker += lineWordCount;

                                const currentLineGlobalIndex = lineIndexRenderTracker;
                                lineIndexRenderTracker++;

                                const distanceToActive = activeGlobalLineIndex >= 0 ? Math.abs(currentLineGlobalIndex - activeGlobalLineIndex) : 99;
                                const isActiveLine = currentLineGlobalIndex === activeGlobalLineIndex;
                                const nearLine = distanceToActive <= 2;
                                const lineOpacity = isActiveLine ? 1 : nearLine ? motionProfile.lineNearOpacity : motionProfile.lineFarOpacity;
                                const lineScale = isActiveLine
                                    ? motionProfile.lineActiveScaleBase + motionEnergy * motionProfile.lineActiveScaleEnergy
                                    : nearLine ? motionProfile.lineNearScale : motionProfile.lineFarScale;
                                const lineYOffset = isActiveLine
                                    ? (0.5 - activeLineProgress) * (motionProfile.lineYOffsetAmp + motionEnergy * 7)
                                    : 0;

                                return (
                                    <div 
                                        key={`${sIdx}-${lIdx}`} 
                                        ref={el => { lineRefs.current[currentLineGlobalIndex] = el; }}
                                        className="transform transition-all duration-500 origin-center"
                                        style={{
                                            opacity: lineOpacity,
                                            transform: `translate3d(0, ${lineYOffset.toFixed(2)}px, 0) scale(${lineScale.toFixed(4)})`,
                                            filter: `drop-shadow(0 0 ${isActiveLine ? motionProfile.lineGlowBase + motionEnergy * motionProfile.lineGlowEnergy : 6}px ${trackColor}${isActiveLine ? '55' : '1f'})`
                                        }}
                                    >
                                        <StanzaLine 
                                            line={line} 
                                            startIndex={startIndex} 
                                            track={track} 
                                            isPaused={!isPlaying} 
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
                
                {!track.stanzas.length && (
                     <div className="text-white/30 font-mono text-sm uppercase tracking-widest animate-pulse py-20">
                         Instrumental / Lyrics Loading...
                     </div>
                )}
            </div>
         </div>

         {timeline.stanzas.length > 1 && (
             <div
               className="hidden xl:flex absolute right-6 top-1/2 -translate-y-1/2 z-40 flex-col rounded-2xl bg-black/25 border border-white/10 backdrop-blur-md px-2.5 py-3"
               style={{
                 gap: `${motionProfile.minimapGap * 4}px`,
                 boxShadow: `0 0 ${8 + motionEnergy * 14}px ${trackColor}22`
               }}
             >
                 {timeline.stanzas.map((stanza, idx) => {
                     const isActive = idx === activeStanzaIndex;
                     const progress = stanzaProgressByIndex.get(idx) ?? 0;
                     const barHeight = Math.max(18, Math.min(36, 16 + stanza.lineCount * 4));

                     return (
                         <button
                             key={stanza.stanzaIndex}
                             onClick={() => handleJumpToStanza(idx)}
                             className="group relative rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                             style={{ height: `${barHeight}px`, width: `${motionProfile.minimapWidth * 4}px` }}
                             title={`Jump to stanza ${idx + 1}`}
                         >
                             <span
                               className="absolute inset-x-0 bottom-0 rounded-full transition-all duration-300"
                               style={{
                                 height: `${clamp01(progress) * 100}%`,
                                 backgroundColor: trackColor,
                                 boxShadow: isActive ? `0 0 ${10 + motionEnergy * 12}px ${trackColor}88` : 'none'
                               }}
                             />
                             <span
                               className="absolute -left-8 top-1/2 -translate-y-1/2 text-[9px] font-mono text-white/40 opacity-0 group-hover:opacity-100 transition-opacity"
                             >
                               {String(idx + 1).padStart(2, '0')}
                             </span>
                             {isActive && (
                                 <span
                                   className="absolute -inset-1 rounded-full border transition-all duration-300"
                                   style={{
                                     borderColor: `${trackColor}aa`,
                                     boxShadow: `0 0 ${8 + motionEnergy * 10}px ${trackColor}66`
                                   }}
                                 />
                             )}
                         </button>
                     );
                 })}
             </div>
         )}
      </div>

      {/* 5. FOOTER CONTROLS */}
      <div className={`absolute bottom-0 left-0 right-0 z-50 p-8 md:p-12 flex flex-col items-center justify-end transition-all duration-1000 ${showIntro ? 'translate-y-24 opacity-0' : 'translate-y-0 opacity-100'}`}>
         
         <div className="relative w-full max-w-2xl h-1 bg-white/10 rounded-full mb-8 overflow-hidden backdrop-blur-sm">
              <div 
                 className="h-full bg-amber-glow shadow-[0_0_15px_#fbbf24] transition-all duration-300 ease-linear" 
                 style={{
                    width: `${playbackProgress * 100}%`,
                    boxShadow: `0 0 ${12 + motionEnergy * 18}px ${trackColor}99`,
                    backgroundColor: trackColor
                 }}
              />
              <div
                className="absolute inset-y-0 -left-1/3 w-1/3 pointer-events-none"
                style={{
                  transform: `translateX(${(playbackProgress * motionProfile.sheenTravel).toFixed(2)}%)`,
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)',
                  opacity: clamp01(0.18 + beatPulse * 0.35 + motionEnergy * 0.2),
                  transition: 'transform 180ms linear, opacity 220ms ease-out'
                }}
              />
          </div>

         <div className="mb-6 flex items-end justify-center gap-1.5 h-8">
            {footerMeter.map((value, idx) => (
                <span
                  key={idx}
                  className="w-1 rounded-full transition-all duration-200 ease-out"
                  style={{
                    height: `${motionProfile.footerBarBase + value * motionProfile.footerBarRange}px`,
                    backgroundColor: idx % 2 === 0 ? trackColor : '#f8fafc',
                    opacity: 0.35 + value * 0.55,
                    transform: `translateY(${(1 - value) * 3}px)`,
                    boxShadow: `0 0 ${4 + value * 10}px ${idx % 2 === 0 ? trackColor : '#ffffff44'}`
                  }}
                />
            ))}
         </div>

         <div className="flex items-center gap-8 md:gap-16">
            <button onClick={handlePrev} className="p-4 text-white/30 hover:text-white transition-all hover:scale-110">
                <ChevronLeft size={32} />
            </button>
            
            <button 
                onClick={togglePlayPause}
                className="w-20 h-20 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 backdrop-blur-md flex items-center justify-center hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all"
                style={{
                    transform: `scale(${footerControlScale.toFixed(4)})`,
                    boxShadow: `0 0 ${18 + motionEnergy * 28}px ${trackColor}33`
                }}
            >
                {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-2" />}
            </button>

            <button onClick={handleNext} className="p-4 text-white/30 hover:text-white transition-all hover:scale-110">
                <ChevronRight size={32} />
            </button>

            {/* Sync Button (Moved to Controls Row) */}
            <button 
                onClick={handleSync}
                className={`p-4 rounded-full border border-white/10 hover:border-white/30 text-white/30 hover:text-white transition-all hover:scale-110 ${!autoScroll ? 'bg-amber-glow/20 text-amber-glow border-amber-glow/50' : ''}`}
                title="Re-Sync Lyrics"
            >
                <RefreshCw size={20} className={isPlaying && autoScroll ? "animate-spin-slow" : ""} />
            </button>
         </div>
      </div>

    </div>
  );
};
