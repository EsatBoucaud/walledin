import React, { useMemo } from 'react';
import { useAudio } from '../context/AudioContext';
import { TrackData } from '../types';
import { Play } from 'lucide-react';

interface StanzaLineProps {
  line: string;
  startIndex: number;
  track: TrackData;
  isPaused: boolean;
}

// Deterministic random for consistent visual noise per word
const getStableRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
};

export const StanzaLine: React.FC<StanzaLineProps> = ({ line, startIndex, track, isPaused }) => {
  const { currentTime, currentTrackId, seek } = useAudio();
  
  const words = useMemo(() => line.trim().split(/\s+/), [line]);
  const activeBaseColor = track.color || '#ffffff';

  // Determine if this specific line is "Active" in time (for seek/highlight context)
  const isActiveLine = useMemo(() => {
    if (currentTrackId !== track.id) return false;
    const wordCount = words.length;
    const firstWord = track.wordMap[startIndex];
    const lastWord = track.wordMap[startIndex + wordCount - 1];
    
    if (!firstWord) return false;
    
    const startTime = firstWord.timeMs;
    const endTime = lastWord ? lastWord.timeMs + 500 : startTime + 2000;
    const timeMs = currentTime * 1000;
    
    return timeMs >= startTime - 500 && timeMs < endTime;
  }, [currentTime, currentTrackId, track.id, startIndex, words.length]);

  const handleSeek = (e: React.MouseEvent) => {
    e.stopPropagation();
    const firstWord = track.wordMap[startIndex];
    if (firstWord) {
      seek(firstWord.timeMs / 1000);
    }
  };

  const getWordStyle = (isActive: boolean, hasPassed: boolean, progress: number, globalIndex: number) => {
    // NEW BASE STYLE: "Cinematic Focus"
    // No layout shifts. Purely optical.
    const style: React.CSSProperties = {
        display: 'inline-block',
        position: 'relative',
        padding: '0.1em 0.25em',
        margin: '0 0.05em',
        borderRadius: '4px',
        // Sophisticated easing for "expensive" feel
        transition: 'all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)', 
        transformOrigin: 'center bottom',
        zIndex: isActive ? 20 : 1,
        
        // Default State (Inactive)
        color: hasPassed ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.25)',
        filter: hasPassed ? 'blur(0px)' : 'blur(1.5px)', // Blur future words
        transform: 'scale(1) translateY(0)',
        textShadow: 'none',
        outline: 'none',
        boxShadow: 'none',
        backgroundColor: 'transparent'
    };

    // ACTIVE STATE
    if (isActive) {
        style.color = '#ffffff';
        style.filter = 'blur(0px)'; // Sharpen
        style.transform = 'scale(1.05) translateY(-2px)'; // Subtle lift, no huge pop
        // 33% Opacity Glow using track color
        style.textShadow = `0 0 20px ${activeBaseColor}55`;
    }

    const effect = track.visualStyle;

    // --- EFFECT LIBRARY (REFINED) ---

    switch (effect) {
      // 1. GLOW / ENERGY
      case 'neon-pulse':
      case 'nuclear-haze':
      case 'neural-spark':
        if (isActive) {
          style.textShadow = `0 0 10px ${activeBaseColor}, 0 0 30px ${activeBaseColor}44`;
          style.transform = `translateY(-3px)`;
        }
        break;

      // 2. GLITCH / TECH
      case 'chromatic-ghost':
      case 'vhs-tracking':
      case 'scanline-crt':
        if (isActive) {
          // Horizontal tearing instead of scaling
          const shift = Math.sin(progress * Math.PI * 10) * 1;
          style.transform = `translateX(${shift}px) skewX(-5deg)`;
          style.textShadow = `2px 0 0 ${activeBaseColor}44, -2px 0 0 rgba(255,255,255,0.4)`;
          style.borderBottom = `1px solid ${activeBaseColor}66`;
        } 
        break;

      // 3. FLUID / COLOR
      case 'prism-split':
      case 'chrome-liquid':
        if (isActive) {
          style.backgroundImage = `linear-gradient(135deg, #fff 0%, ${activeBaseColor} 50%, #fff 100%)`;
          style.backgroundSize = '200% auto';
          style.backgroundPosition = `${progress * 100}% 50%`;
          style.WebkitBackgroundClip = 'text';
          style.WebkitTextFillColor = 'transparent';
          style.transform = 'scale(1.1)'; // Slight scale allowed here for liquid feel
        }
        break;

      // 4. FOCUS / DEPTH (Enhanced)
      case 'focus-depth':
        if (isActive) {
          style.filter = 'blur(0px)';
          style.transform = 'scale(1.1)'; // Just focusing
          style.opacity = 1;
        } else {
          style.filter = 'blur(3px)'; // Heavier blur
          style.opacity = 0.3;
        }
        break;

      // 5. MOTION
      case 'perspective-tilt':
      case 'lorenz':
        if (isActive) {
          style.transform = `perspective(400px) rotateX(10deg)`;
          style.borderBottom = `2px solid ${activeBaseColor}44`;
        }
        break;

      // 6. KINETIC / FLOATING
      case 'kinetic-float':
      case 'boids':
      case 'loom-weave':
        if (isActive) {
          const yOffset = Math.sin(progress * Math.PI) * -6;
          style.transform = `translateY(${yOffset}px)`;
        } 
        break;

      // 7. BRUTALIST (Inverted Box)
      case 'type-brutal':
      case 'pillars':
      case 'construct':
      case 'containment-box':
        if (isActive) {
          style.backgroundColor = activeBaseColor; 
          style.color = '#000000'; // High contrast
          style.borderRadius = '0px';
          style.transform = 'translateY(0)';
          style.boxShadow = `4px 4px 0px rgba(255,255,255,0.2)`;
          style.textShadow = 'none';
        }
        break;

      // 8. IMPACT
      case 'weight-shift':
      case 'snare-impact':
        if (isActive) {
            style.transform = `scale(1.05)`;
            style.letterSpacing = '0.05em'; // Widen slightly
            style.textShadow = `0 0 0 ${activeBaseColor}`; // Hard shadow
        }
        break;
        
      case 'spiders':
          if (isActive) {
              style.textDecoration = 'underline';
              style.textDecorationColor = activeBaseColor;
              style.transform = `rotate(${Math.sin(progress * 10)*2}deg)`;
          }
          break;
    }

    return style;
  };

  const highlightLyricWords = () => {
    const renderedWords: React.ReactNode[] = [];
    const isActiveTrack = currentTrackId === track.id;
    const currentTimeMs = currentTime * 1000;

    words.forEach((wordText, localIndex) => {
      const globalIndex = startIndex + localIndex;
      const wordData = track.wordMap[globalIndex];
      const nextWordData = track.wordMap[globalIndex + 1];
      
      // Default timing if data missing
      let startTime = 0;
      let endTime = 0;
      
      if (wordData) {
          startTime = wordData.timeMs;
          endTime = nextWordData ? nextWordData.timeMs : startTime + 600;
      }

      const duration = endTime - startTime;
      const isActive = isActiveTrack && currentTimeMs >= startTime && currentTimeMs < endTime;
      const hasPassed = isActiveTrack && currentTimeMs >= endTime;
      const wordProgress = isActive ? Math.min(1, Math.max(0, (currentTimeMs - startTime) / duration)) : 0;

      const style = getWordStyle(isActive, hasPassed, wordProgress, globalIndex);

      renderedWords.push(
        <span 
          key={`${globalIndex}-${wordText}`} 
          style={style}
          className="font-serif select-none cursor-pointer hover:text-white transition-colors"
        >
          {wordText}
        </span>
      );
    });

    return renderedWords;
  };

  return (
    <div 
      className={`
        relative group/line flex flex-wrap justify-center items-center py-2 md:py-3 px-4 rounded-xl transition-all duration-1000
        ${isActiveLine 
            ? 'opacity-100 scale-100' 
            : 'opacity-30 hover:opacity-50 scale-100 grayscale-[0.8]' 
        }
      `}
    >
      
      {/* LYRIC TEXT CONTAINER */}
      <div 
        onClick={handleSeek}
        className="relative z-10 leading-relaxed text-2xl md:text-4xl lg:text-5xl text-center max-w-4xl"
      >
          {highlightLyricWords()}
      </div>

      {/* JUMP INDICATOR (Hover) */}
      <div className="absolute left-0 -translate-x-full pr-4 opacity-0 group-hover/line:opacity-100 transition-opacity duration-300 hidden md:flex items-center">
            <button 
                onClick={handleSeek} 
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/50 transition-all"
            >
                <Play size={10} fill="currentColor" />
            </button>
      </div>

    </div>
  );
};
