
import React, { useState } from 'react';
import { CHALLENGES } from '../lib/chapter-data';
import { ChallengeInterface } from './ChallengeComponents';
import { X, ArrowRight, Gamepad2, Trophy, Sparkles } from 'lucide-react';

export const AdminPuzzleTester: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    // Playlist Sequence
    const testIds = [
        'jigsaw-construct-victor',
        'memory-posters',
        'scramble-victor-1',
        'slide-glitch-1',
        'visual-quiz-rum',
        'tile-swap-sincere',
        'tuner-hauntology'
    ];
    
    const [index, setIndex] = useState(0);
    const [flash, setFlash] = useState(false);
    const [score, setScore] = useState(0);
    const [pointsAnim, setPointsAnim] = useState<{val: number, id: number} | null>(null);

    const currentChallenge = CHALLENGES.find(c => c.id === testIds[index]);
    const progress = ((index + 1) / testIds.length) * 100;

    const handleNext = (pointsAwarded: number = 0) => {
        // Points Animation
        if (pointsAwarded > 0) {
            setScore(prev => prev + pointsAwarded);
            setPointsAnim({ val: pointsAwarded, id: Date.now() });
            setTimeout(() => setPointsAnim(null), 2000);
        }

        // Transition Flash
        setFlash(true);
        setTimeout(() => setFlash(false), 300);
        
        if (index < testIds.length - 1) {
            setTimeout(() => setIndex(prev => prev + 1), 500); // Slight delay for effect
        } else {
            // End of Arcade
            setTimeout(onClose, 1000);
        }
    };

    if (!currentChallenge) return null;

    return (
        <div className="fixed inset-0 z-[300] bg-[#060608] flex flex-col items-center justify-center animate-in fade-in duration-300 font-sans text-slate-300">
            {/* Ambient Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#060608] to-black pointer-events-none" />
            <div className="absolute inset-0 opacity-20 pointer-events-none" 
                style={{ 
                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', 
                    backgroundSize: '50px 50px' 
                }} 
            />

            {/* Flash Effect on Transition */}
            {flash && <div className="absolute inset-0 bg-white/10 z-[200] animate-out fade-out duration-300 pointer-events-none" />}

            {/* Header / Toolbar */}
            <div className="absolute top-0 left-0 right-0 h-24 flex items-center justify-between px-8 md:px-16 z-[100] bg-gradient-to-b from-black/80 to-transparent">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-glow shadow-[0_0_15px_rgba(251,191,36,0.2)]">
                        <Gamepad2 size={20} />
                    </div>
                    <div>
                        <h2 className="text-white font-serif text-xl tracking-wide">Arcade</h2>
                        <div className="text-white/30 font-mono text-[10px] uppercase tracking-widest">
                            Level {index + 1} / {testIds.length}
                        </div>
                    </div>
                </div>

                {/* Score HUD */}
                <div className="absolute left-1/2 -translate-x-1/2 top-8 flex flex-col items-center">
                    <div className="flex items-center gap-2 text-amber-glow font-mono text-xl font-bold">
                        <Trophy size={18} />
                        {score.toLocaleString()}
                    </div>
                    {pointsAnim && (
                        <div key={pointsAnim.id} className="absolute top-8 text-green-400 font-bold text-sm animate-out slide-out-to-top-8 fade-out duration-[1500ms]">
                            +{pointsAnim.val} PTS
                        </div>
                    )}
                </div>
                
                {/* Right Controls: Skip + Close */}
                <div className="flex items-center gap-4">
                    <button 
                        onClick={(e) => { e.stopPropagation(); handleNext(0); }}
                        className="group px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white rounded-full font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 transition-all active:scale-95"
                    >
                        <span>Skip</span>
                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button 
                        onClick={() => onClose()}
                        className="p-3 hover:bg-white/10 rounded-full transition-all text-white/50 hover:text-white"
                    >
                        <X size={24} />
                    </button>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="absolute top-0 left-0 h-1 bg-white/5 w-full z-[90]">
                <div className="h-full bg-amber-glow transition-all duration-500 ease-out shadow-[0_0_10px_#fbbf24]" style={{ width: `${progress}%` }} />
            </div>

            {/* Main Content Area */}
            <div className="w-full max-w-5xl flex-1 flex flex-col items-center justify-center p-8 md:p-12 pb-12 overflow-y-auto custom-scrollbar relative z-10">
                <div className="w-full flex justify-center animate-in zoom-in-95 duration-500">
                    <ChallengeInterface 
                        key={currentChallenge.id} 
                        data={currentChallenge} 
                        onComplete={handleNext} 
                    />
                </div>
            </div>
        </div>
    );
};
