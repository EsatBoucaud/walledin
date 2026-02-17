
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { MediaItem } from '../types';

interface MediaCarouselProps {
    items?: MediaItem[];
}

export const MediaCarousel: React.FC<MediaCarouselProps> = ({ items }) => {
    // Logic: Start with the Main Video (any video that ISN'T a 'decon' video).
    const getBestStartIndex = (mediaItems: MediaItem[]) => {
        if (!mediaItems || mediaItems.length === 0) return 0;
        // 1. Try to find a MAIN video (not decon)
        const mainVideoIndex = mediaItems.findIndex(i => i.type === 'video' && !i.filename.toLowerCase().includes('decon'));
        if (mainVideoIndex !== -1) return mainVideoIndex;
        // 2. Try to find ANY video (Decon fallback)
        const anyVideoIndex = mediaItems.findIndex(i => i.type === 'video');
        if (anyVideoIndex !== -1) return anyVideoIndex;
        // 3. Fallback to start
        return 0;
    };

    const [currentIndex, setCurrentIndex] = useState(0);
    // transitionState: 'idle' (visible) | 'out' (covered/loading) | 'in' (revealing)
    const [transitionState, setTransitionState] = useState<'idle' | 'out' | 'in'>('out'); 
    const [hasError, setHasError] = useState(false);
    const navigatingRef = useRef(false);

    // --- TRACK SWITCHING / INIT ---
    useEffect(() => {
        setHasError(false);
        if (!items || items.length === 0) {
            setCurrentIndex(0);
            return;
        }
        
        const nextIndex = getBestStartIndex(items);
        
        // 1. Cover the stage immediately
        setTransitionState('out');
        
        // 2. Swap content after brief delay to allow cover to render
        const t = setTimeout(() => {
            setCurrentIndex(nextIndex);
            // We rely on onLoad / onCanPlay to trigger 'in' state
        }, 300);

        return () => clearTimeout(t);
    }, [items]); // Re-run when track changes

    if (!items || items.length === 0) return null;

    const currentItem = items[currentIndex];
    const hasMultiple = items.length > 1;

    // --- NAVIGATION ---
    const changeIndex = (newIndex: number) => {
        if (navigatingRef.current) return;
        navigatingRef.current = true;
        setHasError(false);
        
        // 1. Cover
        setTransitionState('out');

        // 2. Swap
        setTimeout(() => {
            setCurrentIndex(newIndex);
            // Wait for media to load...
        }, 300);
    };

    const next = () => changeIndex((currentIndex + 1) % items.length);
    const prev = () => changeIndex((currentIndex - 1 + items.length) % items.length);

    // --- MEDIA HANDLERS ---

    const triggerReveal = () => {
        // Only reveal if we are currently covered ('out')
        setTransitionState(prev => {
            if (prev === 'out') {
                // Schedule the 'idle' state (curtain up)
                setTimeout(() => {
                    setTransitionState('idle');
                    navigatingRef.current = false;
                }, 300); // Matches CSS transition duration
                return 'in'; // Start revealing
            }
            return prev;
        });
    };

    const handleMediaReady = () => {
        triggerReveal();
    };

    const handleVideoTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
        const vid = e.currentTarget;
        if (!vid.duration) return;

        // Loop Logic: "Bite into the end" - Skip last 0.6s
        if (vid.currentTime >= vid.duration - 0.6) {
            if (!navigatingRef.current) {
                if (items.length === 1) {
                    vid.currentTime = 0.15; // Loop single
                    vid.play();
                } else {
                    next(); // Go to next item
                }
            }
        }
    };

    const handleError = () => {
        console.warn("Media failed to load:", currentItem.url);
        setHasError(true);
        // Force reveal so we see the error state
        triggerReveal();
    };

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[22rem] h-[22rem] md:w-[30rem] md:h-[30rem] z-30 pointer-events-auto">
            {/* Glass Container */}
            <div className="w-full h-full relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-white/[0.03] backdrop-blur-md group">
                
                {/* --- TRANSITION OVERLAY (The Curtain) --- */}
                {/* Visible when state is 'out' or 'in' (fading out) */}
                <div 
                    className={`absolute inset-0 z-20 bg-[#080808] flex items-center justify-center transition-opacity duration-500 pointer-events-none ${
                        transitionState === 'idle' ? 'opacity-0' : 'opacity-100'
                    }`}
                >
                    {/* Glitch / Load Effect in Center */}
                    {transitionState !== 'idle' && (
                        <div className="relative flex flex-col items-center gap-4">
                            <div className="w-16 h-0.5 bg-amber-glow/50 blur-[2px] animate-pulse" />
                            <div className="text-[9px] font-mono text-amber-glow/50 uppercase tracking-widest animate-pulse">
                                Loading Asset...
                            </div>
                        </div>
                    )}
                </div>

                {/* --- MEDIA CONTENT --- */}
                <div className={`w-full h-full transition-transform duration-700 ease-out ${transitionState !== 'idle' ? 'scale-95 blur-sm' : 'scale-100 blur-0'}`}>
                    {hasError ? (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-white/5 text-white/40 gap-4">
                            <AlertCircle size={32} />
                            <span className="text-xs font-mono uppercase">Signal Lost</span>
                        </div>
                    ) : currentItem.type === 'video' ? (
                        <video 
                            key={currentItem.url}
                            src={currentItem.url} 
                            autoPlay 
                            muted 
                            loop={false} 
                            playsInline
                            className="w-full h-full object-cover"
                            onLoadedMetadata={(e) => { e.currentTarget.currentTime = 0.15; }}
                            onCanPlay={handleMediaReady}
                            onTimeUpdate={handleVideoTimeUpdate}
                            onError={handleError}
                        />
                    ) : (
                        <img 
                            key={currentItem.url}
                            src={currentItem.url} 
                            alt="Track Asset" 
                            className="w-full h-full object-cover"
                            onLoad={handleMediaReady}
                            onError={handleError}
                        />
                    )}
                </div>

                {/* Gloss Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none mix-blend-overlay z-10" />
                <div className="absolute inset-0 ring-1 ring-white/10 rounded-2xl pointer-events-none z-10" />

                {/* Controls */}
                {hasMultiple && (
                    <>
                        <button 
                            onClick={(e) => { e.stopPropagation(); prev(); }}
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-3 bg-black/40 hover:bg-black/80 text-white/50 hover:text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm z-30"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button 
                            onClick={(e) => { e.stopPropagation(); next(); }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-black/40 hover:bg-black/80 text-white/50 hover:text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm z-30"
                        >
                            <ChevronRight size={20} />
                        </button>
                        
                        {/* Pagination Dots */}
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 pointer-events-none z-30">
                            {items.map((_, idx) => (
                                <div 
                                    key={idx} 
                                    className={`w-1.5 h-1.5 rounded-full shadow-sm transition-all duration-300 ${idx === currentIndex ? 'bg-amber-glow scale-125' : 'bg-white/30'}`} 
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
            
            {/* Ambient Glow Behind */}
            <div className="absolute -inset-4 bg-amber-glow/5 blur-3xl -z-10 rounded-full opacity-50 pointer-events-none" />
        </div>
    );
};
