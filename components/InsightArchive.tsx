
import React from 'react';
import { TrackData } from '../types';
import { X, FileText, BrainCircuit, ScanLine, Microscope, Terminal, Layers, ArrowRight, Hash, Search } from 'lucide-react';
import { getHandoffForTrack } from '../lib/track-handoffs';

interface InsightArchiveProps {
  track: TrackData;
  onClose: () => void;
}

// Utility to render text with bold markers like **text**
const FormattedText: React.FC<{ text: string }> = ({ text }) => {
    // Safety check: ensure text is a string
    if (typeof text !== 'string') {
        return <span>{String(text || "")}</span>;
    }

    const parts = text.split(/(\*\*.*?\*\*)/g);
    return (
        <span>
            {parts.map((part, i) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={i} className="text-white font-bold text-amber-glow">{part.slice(2, -2)}</strong>;
                }
                return <span key={i}>{part}</span>;
            })}
        </span>
    );
};

export const InsightArchive: React.FC<InsightArchiveProps> = ({ track, onClose }) => {
  const analysis = track.analysis;
  const hasAnalysis = analysis && analysis.nodes && analysis.nodes.length > 0;
  const handoff = getHandoffForTrack(track.id);
  const hasResearch = Boolean(
    analysis?.research &&
    (
      typeof analysis.research.confidence === 'number' ||
      (analysis.research.sources && analysis.research.sources.length > 0) ||
      (analysis.research.unknowns && analysis.research.unknowns.length > 0)
    )
  );
  const hasCritique = Boolean(
    analysis?.victor_critique &&
    (
      (analysis.victor_critique.strengths && analysis.victor_critique.strengths.length > 0) ||
      (analysis.victor_critique.gaps && analysis.victor_critique.gaps.length > 0) ||
      analysis.victor_critique.next_pass_focus
    )
  );

  // Scroll to section handler
  const scrollToSection = (id: string) => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="fixed inset-0 z-[160] flex items-center justify-center p-0 md:p-8 animate-in fade-in zoom-in-95 duration-300">
      
      {/* 1. BACKDROP */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl z-0" onClick={onClose} />
      
      {/* 2. MAIN DOSSIER CONTAINER */}
      <div className="relative w-full max-w-[90rem] h-full md:h-[90vh] bg-[#0c0c0e] rounded-none md:rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col z-10">
        
        {/* HEADER TOOLBAR */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-white/10 bg-[#08080a]">
            <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-amber-glow/10 rounded flex items-center justify-center text-amber-glow">
                    <BrainCircuit size={18} />
                </div>
                <div>
                    <h2 className="text-sm font-bold text-white uppercase tracking-widest">{track.title}</h2>
                    <span className="text-[10px] text-white/40 font-mono">ARCHIVAL ANALYSIS RECORD</span>
                </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-colors">
                <X size={20} />
            </button>
        </div>

        {/* CONTENT BODY (Split View) */}
        <div className="flex-1 flex overflow-hidden">
            
            {/* LEFT SIDEBAR (TOC) - Hidden on mobile */}
            <div className="hidden md:flex w-72 flex-col border-r border-white/10 bg-[#08080a] overflow-y-auto custom-scrollbar">
                <div className="p-4">
                    <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-4 px-2">Lyrical Breakdown</div>
                    {hasAnalysis && analysis.nodes.map((node, i) => (
                        <button 
                            key={i}
                            onClick={() => scrollToSection(`section-${i}`)}
                            className="w-full text-left p-3 rounded hover:bg-white/5 text-xs text-white/60 hover:text-white transition-colors group flex gap-3 mb-1"
                        >
                            <span className="font-mono text-white/20 group-hover:text-amber-glow">{(i+1).toString().padStart(2, '0')}</span>
                            <span className="truncate">{Array.isArray(node.lyric) ? node.lyric[0] : node.lyric}</span>
                        </button>
                    ))}
                    {hasAnalysis && handoff && (
                        <button
                            onClick={() => scrollToSection('section-transition')}
                            className="w-full text-left p-3 rounded hover:bg-white/5 text-xs text-white/70 hover:text-white transition-colors group flex gap-3 mt-4 border border-white/10"
                        >
                            <span className="font-mono text-white/30 group-hover:text-amber-glow">{'->'}</span>
                            <span className="truncate">Relationship To Next Track</span>
                        </button>
                    )}
                </div>
            </div>

            {/* RIGHT MAIN CONTENT */}
            <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#0c0c0e] relative">
                
                {!hasAnalysis ? (
                    <div className="h-full flex flex-col items-center justify-center text-white/30 gap-4">
                        <Search size={48} />
                        <p className="font-mono text-xs uppercase tracking-widest">No archival data found.</p>
                        <p className="text-xs max-w-md text-center">Ensure the JSON source is correctly mapped in the library.</p>
                    </div>
                ) : (
                    <div className="max-w-4xl mx-auto p-8 md:p-16 space-y-16">
                        
                        {/* 1. HERO: GAN SYNTHESIS */}
                        {analysis.gan && (
                            <div className="bg-white/5 border border-white/10 rounded-xl p-8 space-y-8">
                                <div className="flex items-center gap-3 text-amber-glow mb-2 border-b border-white/10 pb-4">
                                    <Terminal size={18} />
                                    <span className="text-xs font-bold uppercase tracking-[0.2em]">System Synthesis</span>
                                </div>
                                
                                <div className="grid md:grid-cols-2 gap-12">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-xs font-bold text-green-400 uppercase tracking-widest">
                                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                                            Generator Perspective
                                        </div>
                                        <p className="text-sm leading-relaxed text-white/80 font-serif italic">
                                            "{analysis.gan.generator}"
                                        </p>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-widest">
                                            <div className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                                            Discriminator Perspective
                                        </div>
                                        <p className="text-sm leading-relaxed text-white/80 font-serif italic">
                                            "{analysis.gan.discriminator}"
                                        </p>
                                    </div>
                                </div>

                                {analysis.gan.truth && (
                                    <div className="pt-6 border-t border-white/10 mt-2">
                                        <div className="text-[10px] text-white/40 uppercase tracking-widest mb-2 font-mono">Latent Truth</div>
                                        <p className="text-white text-base leading-relaxed">
                                            <FormattedText text={analysis.gan.truth} />
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* 1B. TRACK META */}
                        {analysis.meta && (
                            <div className="bg-white/5 border border-white/10 rounded-xl p-8 space-y-4">
                                <div className="flex items-center gap-3 text-blue-300 mb-2 border-b border-white/10 pb-4">
                                    <ScanLine size={18} />
                                    <span className="text-xs font-bold uppercase tracking-[0.2em]">Narrative Role</span>
                                </div>
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div>
                                        <div className="text-[10px] text-white/40 uppercase tracking-widest mb-2 font-mono">Role</div>
                                        <p className="text-sm text-white/90 leading-relaxed">{analysis.meta.role}</p>
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-white/40 uppercase tracking-widest mb-2 font-mono">Context</div>
                                        <p className="text-sm text-white/90 leading-relaxed">{analysis.meta.key_context}</p>
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-white/40 uppercase tracking-widest mb-2 font-mono">Valence</div>
                                        <p className="text-sm text-white/90 leading-relaxed">{analysis.meta.emotional_valence}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 1C. RESEARCH LEDGER */}
                        {hasResearch && analysis.research && (
                            <div className="bg-white/5 border border-white/10 rounded-xl p-8 space-y-8">
                                <div className="flex items-center gap-3 text-cyan-300 mb-2 border-b border-white/10 pb-4">
                                    <FileText size={18} />
                                    <span className="text-xs font-bold uppercase tracking-[0.2em]">Research Ledger</span>
                                </div>

                                {typeof analysis.research.confidence === 'number' && (
                                    <div>
                                        <div className="flex items-center justify-between text-[10px] text-white/50 uppercase tracking-widest mb-2 font-mono">
                                            <span>Reference Confidence</span>
                                            <span>{Math.round(analysis.research.confidence * 100)}%</span>
                                        </div>
                                        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                                            <div
                                                className="h-full bg-cyan-400 transition-all duration-700"
                                                style={{ width: `${Math.max(0, Math.min(100, analysis.research.confidence * 100))}%` }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {analysis.research.sources && analysis.research.sources.length > 0 && (
                                    <div className="space-y-4">
                                        <div className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Sources</div>
                                        {analysis.research.sources.map((source, sIdx) => (
                                            <div key={sIdx} className="rounded-lg border border-white/10 bg-black/20 p-4 space-y-2">
                                                <p className="text-sm text-white/90 leading-relaxed">
                                                    <FormattedText text={source.claim} />
                                                </p>
                                                <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-widest font-mono text-white/50">
                                                    <span>{source.source_type}</span>
                                                    <span className="text-white/20">|</span>
                                                    <span>{source.reliability}</span>
                                                </div>
                                                {source.url ? (
                                                    <a
                                                        href={source.url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="inline-flex items-center gap-2 text-xs text-amber-glow hover:text-amber-200 transition-colors"
                                                    >
                                                        <span>{source.reference}</span>
                                                        <ArrowRight size={12} />
                                                    </a>
                                                ) : (
                                                    <p className="text-xs text-white/60">{source.reference}</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {analysis.research.unknowns && analysis.research.unknowns.length > 0 && (
                                    <div className="space-y-3">
                                        <div className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Unknowns</div>
                                        {analysis.research.unknowns.map((u, uIdx) => (
                                            <div key={uIdx} className="text-sm text-white/80 leading-relaxed border-l border-amber-glow/30 pl-3">
                                                {u}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* 1D. PASS CRITIQUE */}
                        {hasCritique && analysis.victor_critique && (
                            <div className="bg-white/5 border border-white/10 rounded-xl p-8 space-y-8">
                                <div className="flex items-center gap-3 text-emerald-300 mb-2 border-b border-white/10 pb-4">
                                    <BrainCircuit size={18} />
                                    <span className="text-xs font-bold uppercase tracking-[0.2em]">Pass Critique</span>
                                </div>

                                {analysis.victor_critique.strengths && analysis.victor_critique.strengths.length > 0 && (
                                    <div className="space-y-3">
                                        <div className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Strengths</div>
                                        {analysis.victor_critique.strengths.map((s, i) => (
                                            <p key={i} className="text-sm text-white/85 leading-relaxed border-l border-emerald-400/40 pl-3">
                                                {s}
                                            </p>
                                        ))}
                                    </div>
                                )}

                                {analysis.victor_critique.gaps && analysis.victor_critique.gaps.length > 0 && (
                                    <div className="space-y-3">
                                        <div className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Gaps</div>
                                        {analysis.victor_critique.gaps.map((g, i) => (
                                            <p key={i} className="text-sm text-white/85 leading-relaxed border-l border-red-400/40 pl-3">
                                                {g}
                                            </p>
                                        ))}
                                    </div>
                                )}

                                {analysis.victor_critique.next_pass_focus && (
                                    <div className="pt-2">
                                        <div className="text-[10px] text-white/40 uppercase tracking-widest mb-2 font-mono">Next Pass Focus</div>
                                        <p className="text-sm text-white leading-relaxed">
                                            <FormattedText text={analysis.victor_critique.next_pass_focus} />
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* 2. NODES LIST */}
                        <div className="space-y-24">
                            {analysis.nodes.map((node, idx) => (
                                <div key={idx} id={`section-${idx}`} className="scroll-mt-24 group">
                                    {/* Lyric Header */}
                                    <div className="flex gap-6 mb-6">
                                        <span className="font-mono text-sm text-white/20 mt-1">{(idx+1).toString().padStart(2, '0')}</span>
                                        <h3 className="text-2xl md:text-3xl font-serif text-white leading-tight italic">
                                            "{Array.isArray(node.lyric) ? node.lyric[0] : node.lyric}"
                                        </h3>
                                    </div>

                                    {/* Content Block */}
                                    <div className="ml-0 md:ml-12 pl-6 border-l border-white/10 space-y-8 group-hover:border-amber-glow/30 transition-colors">
                                        
                                        {/* Surface Meaning */}
                                        <div className="bg-[#1a1a1c] p-6 rounded-lg border border-white/5">
                                            <div className="flex items-center gap-2 mb-2 text-white/40">
                                                <Layers size={14} />
                                                <span className="text-[10px] font-bold uppercase tracking-widest">Surface Translation</span>
                                            </div>
                                            <p className="text-sm md:text-base text-white/80 leading-relaxed">
                                                <FormattedText text={node.surface} />
                                            </p>
                                        </div>

                                        {/* Deep Context Points */}
                                        <div className="space-y-6">
                                            {node.deep.map((item, dIdx) => (
                                                <div key={dIdx} className="flex gap-4 items-start">
                                                    <div className="mt-1 w-6 h-6 rounded bg-amber-glow/10 flex items-center justify-center text-amber-glow flex-shrink-0">
                                                        <Microscope size={12} />
                                                    </div>
                                                    <div>
                                                        <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest block mb-1">
                                                            {item.category}
                                                        </span>
                                                        <p className="text-sm md:text-base text-white/90 leading-relaxed">
                                                            <FormattedText text={item.text} />
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Rhymes (If Available) */}
                                        {node.rhymes && node.rhymes.length > 0 && (
                                            <div className="flex flex-wrap gap-2 pt-4">
                                                {node.rhymes.map((r, rIdx) => (
                                                    <div key={rIdx} className="px-2 py-1 rounded bg-white/5 border border-white/5 text-[10px] font-mono text-white/60 flex items-center gap-2">
                                                        <span>{r.word}</span>
                                                        <span className="text-green-400">{r.score}/10</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 3. TRACK HANDOFF SECTION (Bottom Linkage) */}
                        {handoff && (
                            <div id="section-transition" className="scroll-mt-24 bg-white/5 border border-white/10 rounded-xl p-8 space-y-8">
                                <div className="flex items-center gap-3 text-violet-300 mb-2 border-b border-white/10 pb-4">
                                    <BrainCircuit size={18} />
                                    <span className="text-xs font-bold uppercase tracking-[0.2em]">Relationship To Next Track</span>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-xs text-white/70">
                                        <span className="px-2 py-1 rounded bg-white/10 border border-white/10 font-mono">{handoff.track_title}</span>
                                        <ArrowRight size={14} className="text-amber-glow" />
                                        <span className="px-2 py-1 rounded bg-amber-glow/10 border border-amber-glow/30 text-amber-glow font-mono">{handoff.next_track_title}</span>
                                    </div>
                                    <p className="text-sm text-white/90 leading-relaxed">
                                        <FormattedText text={handoff.bridge_summary} />
                                    </p>
                                </div>

                                {handoff.lyric_threads.length > 0 && (
                                    <div className="space-y-4">
                                        <div className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Lyric Threads</div>
                                        {handoff.lyric_threads.map((thread, idx) => (
                                            <div key={idx} className="rounded-lg border border-white/10 bg-black/20 p-4 space-y-2">
                                                <div className="text-xs text-white/70">
                                                    <span className="text-white/40 font-mono">FROM:</span> {thread.from_signal}
                                                </div>
                                                <div className="text-xs text-white/70">
                                                    <span className="text-white/40 font-mono">TO:</span> {thread.to_signal}
                                                </div>
                                                <p className="text-sm text-white/90 leading-relaxed">{thread.interpretation}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {handoff.narrative_threads.length > 0 && (
                                    <div className="space-y-3">
                                        <div className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Narrative Continuity</div>
                                        {handoff.narrative_threads.map((item, idx) => (
                                            <p key={idx} className="text-sm text-white/85 leading-relaxed border-l border-violet-400/40 pl-3">
                                                {item}
                                            </p>
                                        ))}
                                    </div>
                                )}

                                {handoff.sonic_threads.length > 0 && (
                                    <div className="space-y-3">
                                        <div className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Sonic Continuity</div>
                                        {handoff.sonic_threads.map((item, idx) => (
                                            <p key={idx} className="text-sm text-white/85 leading-relaxed border-l border-cyan-400/40 pl-3">
                                                {item}
                                            </p>
                                        ))}
                                    </div>
                                )}

                                {handoff.reference_threads.length > 0 && (
                                    <div className="space-y-3">
                                        <div className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Reference Continuity</div>
                                        {handoff.reference_threads.map((item, idx) => (
                                            <p key={idx} className="text-sm text-white/85 leading-relaxed border-l border-emerald-400/40 pl-3">
                                                {item}
                                            </p>
                                        ))}
                                    </div>
                                )}

                                {handoff.long_range_links.length > 0 && (
                                    <div className="space-y-3">
                                        <div className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Long-Range Linkages</div>
                                        {handoff.long_range_links.map((item, idx) => (
                                            <p key={idx} className="text-sm text-white/85 leading-relaxed border-l border-amber-glow/40 pl-3">
                                                {item}
                                            </p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* END MARKER */}
                        <div className="flex justify-center pt-24 pb-12 opacity-30">
                            <Hash size={24} />
                        </div>

                    </div>
                )}
            </div>
        </div>

      </div>
    </div>
  );
};
