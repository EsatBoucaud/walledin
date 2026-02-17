
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ChallengeData } from '../lib/chapter-data';
import { TEXTURES } from '../lib/constants';
import { Waves, Zap, Check, X, HelpCircle, Lightbulb, Image as ImageIcon, Type, MousePointer2, Grid, BrainCircuit } from 'lucide-react';

interface ChallengeProps {
  data: ChallengeData;
  onComplete: (points: number) => void;
}

// --- VISUAL FX UTILS ---
const ParticleBurst: React.FC<{ x: number; y: number }> = ({ x, y }) => {
    return (
        <div className="absolute pointer-events-none z-[100]" style={{ left: x, top: y }}>
            {[...Array(12)].map((_, i) => (
                <div
                    key={i}
                    className="absolute w-2 h-2 bg-amber-glow rounded-full animate-ping"
                    style={{
                        transform: `rotate(${i * 30}deg) translate(40px)`,
                        animationDuration: '0.6s',
                        opacity: 0
                    }}
                />
            ))}
        </div>
    );
};

// --- JIGSAW UTILS ---

type EdgeType = 0 | 1 | -1; // 0: Flat, 1: Tab (Outie), -1: Slot (Innie)

interface JigsawPieceShape {
    top: EdgeType;
    right: EdgeType;
    bottom: EdgeType;
    left: EdgeType;
}

const generateJigsawShapes = (gridSize: number): JigsawPieceShape[] => {
    const shapes: JigsawPieceShape[] = [];
    const horizontalEdges: EdgeType[][] = Array(gridSize).fill(0).map(() => Array(gridSize - 1).fill(0));
    const verticalEdges: EdgeType[][] = Array(gridSize - 1).fill(0).map(() => Array(gridSize).fill(0));

    // Generate random internal edges
    // Horizontal connections (Left <-> Right)
    for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize - 1; c++) {
            horizontalEdges[r][c] = Math.random() > 0.5 ? 1 : -1;
        }
    }
    // Vertical connections (Top <-> Bottom)
    for (let r = 0; r < gridSize - 1; r++) {
        for (let c = 0; c < gridSize; c++) {
            verticalEdges[r][c] = Math.random() > 0.5 ? 1 : -1;
        }
    }

    // Construct shapes
    for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
            const top = r === 0 ? 0 : (verticalEdges[r - 1][c] * -1 as EdgeType);
            const bottom = r === gridSize - 1 ? 0 : (verticalEdges[r][c] as EdgeType);
            const left = c === 0 ? 0 : (horizontalEdges[r][c - 1] * -1 as EdgeType);
            const right = c === gridSize - 1 ? 0 : (horizontalEdges[r][c] as EdgeType);
            shapes.push({ top, right, bottom, left });
        }
    }
    return shapes;
};

// SVG Path Generator for a Puzzle Piece
// Size is standard 100x100, but path extends outside for Tabs. 
// Viewbox should be approx -25 -25 150 150 to accommodate tabs.
const getPiecePath = (shape: JigsawPieceShape, size: number) => {
    const tabSize = size * 0.25; // 25% of piece size
    // Bezier curves for a standard puzzle tab
    // We draw clockwise: Top -> Right -> Bottom -> Left

    // Let's generate absolute path string manually
    let path = `M 0 0`;

    // TOP (0,0 to 100,0)
    if (shape.top === 0) {
        path += ` L ${size} 0`;
    } else {
        const sign = shape.top === 1 ? -1 : 1;
        const h = tabSize * sign;
        path += ` L ${size * 0.35} 0`;
        path += ` C ${size * 0.35} ${h * 0.2}, ${size * 0.4} ${h}, ${size * 0.5} ${h}`;
        path += ` C ${size * 0.6} ${h}, ${size * 0.65} ${h * 0.2}, ${size * 0.65} 0`;
        path += ` L ${size} 0`;
    }

    // RIGHT (100,0 to 100,100)
    if (shape.right === 0) {
        path += ` L ${size} ${size}`;
    } else {
        const sign = shape.right === 1 ? -1 : 1;
        // Negative is Right (out), Positive is Left (in) -- wait, standard coord system:
        // Right is X+, Down is Y+. "Out" means X > 100. So we add.
        const actualSign = shape.right === 1 ? 1 : -1;
        const w = tabSize * actualSign;
        
        path += ` L ${size} ${size * 0.35}`;
        path += ` C ${size + w * 0.2} ${size * 0.35}, ${size + w} ${size * 0.4}, ${size + w} ${size * 0.5}`;
        path += ` C ${size + w} ${size * 0.6}, ${size + w * 0.2} ${size * 0.65}, ${size} ${size * 0.65}`;
        path += ` L ${size} ${size}`;
    }

    // BOTTOM (100,100 to 0,100)
    if (shape.bottom === 0) {
        path += ` L 0 ${size}`;
    } else {
        // Out means Y > 100.
        const actualSign = shape.bottom === 1 ? 1 : -1;
        const h = tabSize * actualSign;
        path += ` L ${size * 0.65} ${size}`;
        path += ` C ${size * 0.65} ${size + h * 0.2}, ${size * 0.6} ${size + h}, ${size * 0.5} ${size + h}`;
        path += ` C ${size * 0.4} ${size + h}, ${size * 0.35} ${size + h * 0.2}, ${size * 0.35} ${size}`;
        path += ` L 0 ${size}`;
    }

    // LEFT (0,100 to 0,0)
    if (shape.left === 0) {
        path += ` L 0 0`;
    } else {
        // Out means X < 0.
        const actualSign = shape.left === 1 ? -1 : 1;
        const w = tabSize * actualSign;
        path += ` L 0 ${size * 0.65}`;
        path += ` C ${w * 0.2} ${size * 0.65}, ${w} ${size * 0.6}, ${w} ${size * 0.5}`;
        path += ` C ${w} ${size * 0.4}, ${w * 0.2} ${size * 0.35}, 0 ${size * 0.35}`;
        path += ` L 0 0`;
    }

    return path;
};


// --- 1. TUNER (CANVAS) ---
const TunerChallenge: React.FC<ChallengeProps> = ({ data, onComplete }) => {
  const [frequency, setFrequency] = useState(50);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const target = data.tunerData?.targetFrequency || 82;
  const tolerance = data.tunerData?.tolerance || 2;
  const distance = Math.abs(frequency - target);
  const signalStrength = Math.max(0, 1 - distance / 20);
  
  useEffect(() => {
    if (distance < tolerance && !isUnlocked) {
      setIsUnlocked(true);
      setTimeout(() => onComplete(data.points), 2000);
    }
  }, [distance, isUnlocked, onComplete, data.points]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let frameId: number;
    const render = () => {
      ctx.fillStyle = '#060608';
      ctx.fillRect(0,0,canvas.width,canvas.height);
      const noise = (1 - signalStrength) * 60;
      ctx.strokeStyle = isUnlocked ? '#4ade80' : `hsla(45, 100%, 60%, ${0.2 + signalStrength})`;
      ctx.lineWidth = 3;
      ctx.beginPath();
      for(let i=0; i<canvas.width; i+=4) {
        const t = Date.now() * 0.005;
        const wave = Math.sin(t + i * 0.02) * (signalStrength * 50);
        const interference = Math.random() * noise;
        const y = canvas.height/2 + wave + interference;
        if(i===0) ctx.moveTo(i,y); else ctx.lineTo(i,y);
      }
      ctx.stroke();
      if (signalStrength > 0.5) {
          ctx.fillStyle = `rgba(255,255,255,${(signalStrength - 0.5) * 0.1})`;
          ctx.fillRect(0, canvas.height/2 - 2, canvas.width, 4);
      }
      frameId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(frameId);
  }, [signalStrength, isUnlocked]);

  return (
    <div className="w-full flex flex-col items-center animate-in zoom-in duration-500">
      <div className="relative w-full aspect-video bg-black rounded-3xl border-2 border-white/5 overflow-hidden mb-8 shadow-inner ring-1 ring-white/10">
        <canvas ref={canvasRef} width={800} height={450} className="w-full h-full" />
        <div className={`absolute inset-0 flex items-center justify-center p-12 text-center transition-all duration-1000 ${isUnlocked ? 'opacity-100 blur-0' : 'opacity-0 blur-lg'}`} style={{ opacity: Math.max(0, signalStrength - 0.2) }}>
            <div className={`font-serif italic text-3xl md:text-4xl ${isUnlocked ? 'text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]' : 'text-amber-glow'}`}>"{data.tunerData?.quote}"</div>
        </div>
      </div>
      <div className="w-full flex items-center gap-4 bg-white/5 p-4 rounded-full border border-white/5 shadow-xl">
        <Waves size={20} className="text-white/20 ml-2" />
        <input 
            type="range" min="0" max="100" step="0.1" value={frequency}
            onChange={(e) => setFrequency(parseFloat(e.target.value))}
            className="flex-1 h-2 bg-black rounded-full appearance-none accent-amber-glow cursor-pointer"
        />
        <div className="font-mono text-xs text-amber-glow w-16 text-right">{frequency.toFixed(1)}Hz</div>
      </div>
    </div>
  );
};

// --- 2. SLIDE PUZZLE (CLASSIC) ---
const SlidePuzzleChallenge: React.FC<ChallengeProps> = ({ data, onComplete }) => {
  const gridSize = data.slideData?.gridSize || 3;
  const [tiles, setTiles] = useState<number[]>([]);
  const [isSolved, setIsSolved] = useState(false);

  useEffect(() => {
    const total = gridSize * gridSize;
    let init = Array.from({ length: total }, (_, i) => i);
    // Solvability check simulation
    for(let i = 0; i < 60; i++) {
        const empty = init.indexOf(total-1);
        const neighbors = [];
        if (Math.floor(empty/gridSize) > 0) neighbors.push(empty-gridSize);
        if (Math.floor(empty/gridSize) < gridSize-1) neighbors.push(empty+gridSize);
        if (empty % gridSize > 0) neighbors.push(empty-1);
        if (empty % gridSize < gridSize-1) neighbors.push(empty+1);
        const swap = neighbors[Math.floor(Math.random()*neighbors.length)];
        [init[empty], init[swap]] = [init[swap], init[empty]];
    }
    setTiles(init);
  }, [gridSize]);

  const handleMove = (idx: number) => {
    if(isSolved) return;
    const empty = tiles.indexOf(gridSize * gridSize - 1);
    const r = Math.floor(idx / gridSize), c = idx % gridSize;
    const er = Math.floor(empty / gridSize), ec = empty % gridSize;
    if(Math.abs(r - er) + Math.abs(c - ec) === 1) {
        const next = [...tiles];
        [next[idx], next[empty]] = [next[empty], next[idx]];
        setTiles(next);
        if(next.every((v, i) => v === i)) {
            setIsSolved(true);
            setTimeout(() => onComplete(data.points), 1500);
        }
    }
  };

  return (
    <div className="relative animate-in zoom-in duration-500">
        <div className={`grid gap-1.5 p-3 bg-[#111] rounded-[2rem] border-4 border-white/10 shadow-2xl transition-all duration-1000 ${isSolved ? 'border-green-500/50 shadow-[0_0_50px_rgba(74,222,128,0.2)]' : ''}`} style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)`, width: '350px', height: '350px' }}>
        {tiles.map((v, i) => {
            const empty = v === gridSize * gridSize - 1;
            return (
            <div 
                key={i} onClick={() => handleMove(i)}
                className={`relative rounded-lg overflow-hidden transition-all duration-200 ${empty ? 'opacity-0 pointer-events-none' : 'cursor-pointer hover:brightness-110 active:scale-95 border border-white/5 bg-white/5'}`}
                style={{ 
                    backgroundImage: !empty ? `url(${data.slideData?.imageUrl})` : 'none', 
                    backgroundSize: `${gridSize * 100}%`, 
                    backgroundPosition: `${(v % gridSize) * (100/(gridSize-1))}% ${Math.floor(v/gridSize) * (100/(gridSize-1))}%`,
                    boxShadow: !empty ? 'inset 0 0 20px rgba(0,0,0,0.5)' : 'none'
                }}
            />
            );
        })}
        </div>
        {isSolved && <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-[2rem] animate-in fade-in duration-500">
             <Check className="text-green-400 w-16 h-16 drop-shadow-[0_0_15px_rgba(74,222,128,1)]" />
        </div>}
    </div>
  );
};

// --- 3. TILE SWAP (Previous Jigsaw) ---
const TileSwapChallenge: React.FC<ChallengeProps> = ({ data, onComplete }) => {
    const d = data.swapData!;
    const gridSize = d.gridSize;
    const [tiles, setTiles] = useState<number[]>([]);
    const [selected, setSelected] = useState<number | null>(null);
    const [solved, setSolved] = useState(false);
    const [correctTiles, setCorrectTiles] = useState<boolean[]>([]);

    useEffect(() => {
        const init = Array.from({ length: gridSize * gridSize }, (_, i) => i);
        for (let i = init.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [init[i], init[j]] = [init[j], init[i]];
        }
        setTiles(init);
        setCorrectTiles(init.map((v, i) => v === i));
    }, [gridSize]);

    const handleTileClick = (idx: number) => {
        if (solved) return;
        
        if (selected === null) {
            setSelected(idx);
        } else {
            const newTiles = [...tiles];
            [newTiles[selected], newTiles[idx]] = [newTiles[idx], newTiles[selected]];
            setTiles(newTiles);
            setSelected(null);
            const newCorrect = newTiles.map((v, i) => v === i);
            setCorrectTiles(newCorrect);
            if (newCorrect.every(Boolean)) {
                setSolved(true);
                setTimeout(() => onComplete(data.points), 1500);
            }
        }
    };

    return (
        <div className="relative flex flex-col items-center gap-6 animate-in zoom-in duration-500">
            <div 
                className={`grid gap-1 p-2 bg-black rounded-xl border border-white/20 shadow-2xl transition-all duration-500 ${solved ? 'border-green-500 shadow-green-500/20' : ''}`}
                style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)`, width: '350px', height: '350px' }}
            >
                {tiles.map((val, idx) => {
                    const isCorrect = correctTiles[idx];
                    const isSelected = selected === idx;
                    const row = Math.floor(val / gridSize);
                    const col = val % gridSize;
                    return (
                        <div
                            key={idx}
                            onClick={() => handleTileClick(idx)}
                            className={`relative cursor-pointer overflow-hidden rounded-md transition-all duration-300 ${isSelected ? 'ring-2 ring-amber-glow z-10 scale-105' : 'hover:opacity-80'} ${isCorrect ? 'ring-1 ring-green-500/50' : ''}`}
                        >
                            <div className="w-full h-full bg-cover" style={{ backgroundImage: `url(${d.imageUrl})`, backgroundPosition: `${col * (100 / (gridSize - 1))}% ${row * (100 / (gridSize - 1))}%`, backgroundSize: `${100 * gridSize}%` }} />
                            {isCorrect && !solved && <div className="absolute inset-0 bg-green-500/10 pointer-events-none animate-pulse" />}
                        </div>
                    );
                })}
            </div>
            {solved && <div className="text-green-400 font-mono text-xl tracking-widest flex items-center gap-2 animate-in slide-in-from-bottom-2"><Check size={24} /> RESTORED</div>}
        </div>
    );
};

// --- 4. CONSTRUCTION (Real Jigsaw with Drag & Drop) ---
const ConstructionChallenge: React.FC<ChallengeProps> = ({ data, onComplete }) => {
    const d = data.constructionData!;
    const gridSize = d.gridSize;
    const totalTiles = gridSize * gridSize;
    
    // State: Shapes generated once on mount
    const [shapes, setShapes] = useState<JigsawPieceShape[]>([]);
    
    // State: Board slots (null = empty, number = tile ID)
    const [board, setBoard] = useState<(number | null)[]>(Array(totalTiles).fill(null));
    // State: Bank pieces (number = tile ID)
    const [bank, setBank] = useState<number[]>([]);
    const [solved, setSolved] = useState(false);

    // Drag State
    const [dragOverSlot, setDragOverSlot] = useState<number | null>(null);
    const [isDraggingBank, setIsDraggingBank] = useState(false);

    useEffect(() => {
        // 1. Generate unique edge shapes for the whole puzzle
        const newShapes = generateJigsawShapes(gridSize);
        setShapes(newShapes);

        // 2. Init bank with shuffled pieces
        const pieces = Array.from({ length: totalTiles }, (_, i) => i);
        for (let i = pieces.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
        }
        setBank(pieces);
    }, [totalTiles, gridSize]);

    // --- DRAG HANDLERS ---

    const handleDragStart = (e: React.DragEvent, id: number, source: 'bank' | 'board', index: number) => {
        if (solved) {
            e.preventDefault();
            return;
        }
        e.dataTransfer.setData('application/json', JSON.stringify({ id, source, index }));
        e.dataTransfer.effectAllowed = 'move';
        
        // Optional: Hide default ghost to customize? 
        // Default ghost is usually fine for jigsaw pieces if the div is sized right.
    };

    const handleDragOver = (e: React.DragEvent, slotIndex?: number) => {
        e.preventDefault(); // Allows Drop
        e.dataTransfer.dropEffect = 'move';
        
        if (slotIndex !== undefined) {
            if (dragOverSlot !== slotIndex) setDragOverSlot(slotIndex);
        } else {
            // Dragging over Bank
            if (!isDraggingBank) setIsDraggingBank(true);
        }
    };

    const handleDragLeave = () => {
        setDragOverSlot(null);
        setIsDraggingBank(false);
    };

    const handleDropOnBoard = (e: React.DragEvent, targetIndex: number) => {
        e.preventDefault();
        setDragOverSlot(null);
        setIsDraggingBank(false);

        const dataStr = e.dataTransfer.getData('application/json');
        if (!dataStr) return;
        
        const { id, source, index: sourceIndex } = JSON.parse(dataStr);
        
        const newBoard = [...board];
        const newBank = [...bank];
        const existingInTarget = newBoard[targetIndex];

        // 1. Moving from Bank
        if (source === 'bank') {
            // Remove from Bank
            newBank.splice(sourceIndex, 1);
            // Place on Board
            newBoard[targetIndex] = id;
            // If something was there, return it to bank
            if (existingInTarget !== null) {
                newBank.push(existingInTarget);
            }
        } 
        // 2. Moving from Board (Swap)
        else if (source === 'board') {
            if (sourceIndex === targetIndex) return; // Same slot
            
            // Swap pieces
            newBoard[sourceIndex] = existingInTarget;
            newBoard[targetIndex] = id;
        }

        setBoard(newBoard);
        setBank(newBank);
        checkWin(newBoard);
    };

    const handleDropOnBank = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOverSlot(null);
        setIsDraggingBank(false);

        const dataStr = e.dataTransfer.getData('application/json');
        if (!dataStr) return;
        
        const { id, source, index: sourceIndex } = JSON.parse(dataStr);

        // Only act if coming from Board (return to bank)
        if (source === 'board') {
            const newBoard = [...board];
            const newBank = [...bank];
            
            newBoard[sourceIndex] = null; // Clear board slot
            newBank.push(id); // Add to bank
            
            setBoard(newBoard);
            setBank(newBank);
        }
        // If source is bank, reordering is optional (not implemented for simplicity)
    };

    const checkWin = (currentBoard: (number | null)[]) => {
        if (currentBoard.every((val, idx) => val === idx)) {
            setSolved(true);
            setTimeout(() => onComplete(data.points), 1500);
        }
    };

    // Rendering Helper for SVG Piece
    const JigsawPiece = ({ id, shape, isGhost = false }: { id: number, shape: JigsawPieceShape, isGhost?: boolean }) => {
        const pathData = getPiecePath(shape, 100);
        // Calculate image offset based on correct ID position
        const row = Math.floor(id / gridSize);
        const col = id % gridSize;
        const xOff = col * -100;
        const yOff = row * -100;
        const totalW = gridSize * 100;
        const totalH = gridSize * 100;

        return (
            <svg 
                viewBox="-25 -25 150 150" 
                className={`
                    w-24 h-24 md:w-28 md:h-28 transition-all duration-300 drop-shadow-xl
                    ${isGhost ? 'opacity-20 pointer-events-none' : 'opacity-100 hover:scale-105 z-10'}
                `}
                style={{ filter: isGhost ? 'none' : 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))' }}
            >
                <defs>
                    <clipPath id={`clip-${id}`}>
                        <path d={pathData} />
                    </clipPath>
                </defs>
                
                {isGhost ? (
                    <path 
                        d={pathData} 
                        fill="none" 
                        stroke="rgba(255,255,255,0.3)" 
                        strokeWidth="2" 
                        strokeDasharray="4 4"
                    />
                ) : (
                    <g clipPath={`url(#clip-${id})`}>
                        <image 
                            href={d.imageUrl} 
                            x={xOff} 
                            y={yOff} 
                            width={totalW} 
                            height={totalH} 
                            preserveAspectRatio="none"
                        />
                        {/* Inner Bevel/Highlight for depth */}
                        <path d={pathData} fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                        <path d={pathData} fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="1" transform="translate(1,1)" />
                    </g>
                )}
            </svg>
        );
    };

    if (shapes.length === 0) return <div>Initializing Matrix...</div>;

    return (
        <div className="flex flex-col md:flex-row gap-8 items-start justify-center w-full max-w-5xl animate-in zoom-in duration-500 select-none">
            
            {/* BOARD AREA */}
            <div className="flex flex-col gap-4 items-center">
                <div className="text-xs font-mono uppercase tracking-widest text-white/50">Assembly Matrix</div>
                <div 
                    className={`relative bg-[#111] rounded-xl border-2 transition-all duration-500 overflow-hidden ${solved ? 'border-green-500 shadow-[0_0_30px_rgba(74,222,128,0.2)]' : 'border-white/20'}`}
                    style={{ 
                        width: `${gridSize * 90}px`,
                        height: `${gridSize * 90}px`,
                        minWidth: '300px', minHeight: '300px'
                    }}
                >
                    {/* Ghost Background (Guide) */}
                    <div className="absolute inset-0 opacity-10 grayscale pointer-events-none" style={{ backgroundImage: `url(${d.imageUrl})`, backgroundSize: 'cover' }} />

                    {/* Slots */}
                    <div className="relative w-full h-full">
                        {Array.from({ length: totalTiles }).map((_, idx) => {
                            const row = Math.floor(idx / gridSize);
                            const col = idx % gridSize;
                            
                            const pieceId = board[idx];
                            const shape = shapes[idx]; // The shape REQUIRED for this slot
                            const isOver = dragOverSlot === idx;

                            return (
                                <div 
                                    key={`slot-${idx}`}
                                    onDragOver={(e) => handleDragOver(e, idx)}
                                    onDragLeave={handleDragLeave}
                                    onDrop={(e) => handleDropOnBoard(e, idx)}
                                    className={`
                                        absolute flex items-center justify-center transition-all z-${row * 10 + col}
                                        ${isOver ? 'bg-amber-glow/20 shadow-inner' : ''}
                                    `}
                                    style={{
                                        width: '33.33%', height: '33.33%',
                                        left: `${(col / gridSize) * 100}%`,
                                        top: `${(row / gridSize) * 100}%`,
                                    }}
                                >
                                    {/* Show Ghost Shape if Empty */}
                                    {pieceId === null && !solved && (
                                        <div className="opacity-30 pointer-events-none transform scale-90">
                                            <JigsawPiece id={idx} shape={shape} isGhost={true} />
                                        </div>
                                    )}

                                    {/* Show Placed Piece */}
                                    {pieceId !== null && (
                                        <div 
                                            draggable={!solved}
                                            onDragStart={(e) => handleDragStart(e, pieceId, 'board', idx)}
                                            className="transform scale-105 cursor-grab active:cursor-grabbing"
                                        >
                                            <JigsawPiece 
                                                id={pieceId} 
                                                shape={shapes[pieceId]} 
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* BANK AREA */}
            <div className="flex flex-col gap-4 items-center w-full md:w-80">
                <div className="text-xs font-mono uppercase tracking-widest text-white/50">Fragment Bank</div>
                <div 
                    onDragOver={(e) => handleDragOver(e)}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDropOnBank}
                    className={`
                        flex flex-wrap gap-2 justify-center bg-white/5 p-4 rounded-xl min-h-[300px] w-full content-start transition-all
                        ${isDraggingBank ? 'ring-2 ring-amber-glow/50 bg-white/10' : ''}
                    `}
                >
                    {bank.map((val, idx) => {
                        return (
                            <div 
                                key={`bank-${val}`}
                                draggable={!solved}
                                onDragStart={(e) => handleDragStart(e, val, 'bank', idx)}
                                className="relative cursor-grab active:cursor-grabbing transition-all duration-200 p-2 hover:scale-105"
                            >
                                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                                    <JigsawPiece id={val} shape={shapes[val]} />
                                </div>
                            </div>
                        );
                    })}
                    {bank.length === 0 && !solved && (
                        <div className="text-white/20 text-xs text-center py-12 italic w-full pointer-events-none">
                            Bank Empty<br/><span className="text-[9px]">Drag from board to return</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- 5. MEMORY MATCH ---
const MemoryChallenge: React.FC<ChallengeProps> = ({ data, onComplete }) => {
    const d = data.memoryData!;
    // Generate pairs
    const [cards, setCards] = useState<{id: number, img: string, isFlipped: boolean, isMatched: boolean}[]>([]);
    const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
    const [isLocked, setIsLocked] = useState(false);

    useEffect(() => {
        // Create 2 of each image
        let items = [...d.images, ...d.images]; 
        
        // Shuffle
        items.sort(() => Math.random() - 0.5);
        
        setCards(items.map((img, i) => ({
            id: i,
            img,
            isFlipped: false,
            isMatched: false
        })));
    }, [d.images]);

    const handleCardClick = (idx: number) => {
        if (isLocked || cards[idx].isFlipped || cards[idx].isMatched) return;

        // Flip logic
        const newCards = [...cards];
        newCards[idx].isFlipped = true;
        setCards(newCards);
        
        const newFlipped = [...flippedIndices, idx];
        setFlippedIndices(newFlipped);

        if (newFlipped.length === 2) {
            setIsLocked(true);
            const idx1 = newFlipped[0];
            const idx2 = newFlipped[1];

            if (newCards[idx1].img === newCards[idx2].img) {
                // Match
                setTimeout(() => {
                    newCards[idx1].isMatched = true;
                    newCards[idx2].isMatched = true;
                    setCards([...newCards]);
                    setFlippedIndices([]);
                    setIsLocked(false);
                    
                    // Check Win
                    if (newCards.every(c => c.isMatched)) {
                        setTimeout(() => onComplete(data.points), 1000);
                    }
                }, 600);
            } else {
                // Mismatch
                setTimeout(() => {
                    newCards[idx1].isFlipped = false;
                    newCards[idx2].isFlipped = false;
                    setCards([...newCards]);
                    setFlippedIndices([]);
                    setIsLocked(false);
                }, 1000);
            }
        }
    };

    return (
        <div className="flex flex-col items-center gap-8 animate-in slide-in-from-bottom-8">
            <div className={`grid gap-3 p-4 bg-white/5 rounded-2xl border border-white/10`} style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                {cards.map((card, idx) => (
                    <div 
                        key={idx}
                        onClick={() => handleCardClick(idx)}
                        className={`
                            relative w-20 h-24 md:w-24 md:h-32 cursor-pointer perspective-1000 group
                        `}
                    >
                        <div className={`
                            w-full h-full transition-all duration-500 preserve-3d
                            ${card.isFlipped || card.isMatched ? 'rotate-y-180' : 'hover:scale-105'}
                        `}>
                            {/* Front (Hidden) */}
                            <div className="absolute inset-0 backface-hidden bg-[#1a1a1a] rounded-lg border border-white/10 flex items-center justify-center overflow-hidden">
                                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${TEXTURES.CUBES})` }} />
                                <BrainCircuit className="text-white/20" size={24} />
                            </div>

                            {/* Back (Image) */}
                            <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-lg overflow-hidden border-2 border-amber-glow/50 bg-black">
                                <img src={card.img} className="w-full h-full object-cover" alt="" />
                                {card.isMatched && <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center"><Check className="text-green-400" /></div>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- 6. LYRIC SCRAMBLE ---
const LyricScrambleChallenge: React.FC<ChallengeProps> = ({ data, onComplete }) => {
    const d = data.scrambleData!;
    const correctWords = useMemo(() => d.phrase.split(' '), [d.phrase]);
    
    const [shuffledWords, setShuffledWords] = useState<{id: string, text: string}[]>([]);
    const [userOrder, setUserOrder] = useState<{id: string, text: string}[]>([]);
    const [solved, setSolved] = useState(false);
    const [wrongShake, setWrongShake] = useState(false);

    useEffect(() => {
        const words = d.phrase.split(' ').map((w, i) => ({ id: `${i}-${w}`, text: w }));
        for (let i = words.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [words[i], words[j]] = [words[j], words[i]];
        }
        setShuffledWords(words);
        setUserOrder([]);
    }, [d.phrase]);

    const handleWordSelect = (word: {id: string, text: string}) => {
        if (solved) return;
        setShuffledWords(prev => prev.filter(w => w.id !== word.id));
        setUserOrder(prev => {
            const next = [...prev, word];
            if (next.length === correctWords.length) {
                const phrase = next.map(w => w.text).join(' ');
                if (phrase === d.phrase) {
                    setSolved(true);
                    setTimeout(() => onComplete(data.points), 1500);
                } else {
                    setWrongShake(true);
                    setTimeout(() => {
                        setWrongShake(false);
                        setShuffledWords(d.phrase.split(' ').map((w, i) => ({ id: `${i}-${w}`, text: w })).sort(() => Math.random() - 0.5));
                        setUserOrder([]);
                    }, 800);
                }
            }
            return next;
        });
    };

    const handleUndo = (word: {id: string, text: string}) => {
        if (solved) return;
        setUserOrder(prev => prev.filter(w => w.id !== word.id));
        setShuffledWords(prev => [...prev, word]);
    };

    return (
        <div className="flex flex-col items-center w-full max-w-2xl gap-8 animate-in slide-in-from-bottom-8 duration-500">
            <div className={`
                min-h-[100px] w-full bg-white/5 border-2 rounded-2xl flex flex-wrap items-center justify-center p-6 gap-3 transition-all duration-300
                ${solved ? 'border-green-500 bg-green-500/10' : wrongShake ? 'border-red-500 bg-red-500/10 animate-shake' : 'border-white/10'}
            `}>
                {userOrder.length === 0 && !solved && (
                    <span className="text-white/20 italic text-sm">Construct the lyric line here...</span>
                )}
                {userOrder.map((word) => (
                    <button
                        key={word.id}
                        onClick={() => handleUndo(word)}
                        className="px-4 py-2 bg-black border border-white/20 rounded-lg text-white font-serif shadow-lg hover:bg-white/10 active:scale-95 transition-all animate-in zoom-in duration-300"
                    >
                        {word.text}
                    </button>
                ))}
            </div>
            <div className="flex flex-wrap justify-center gap-3">
                {shuffledWords.map((word) => (
                    <button
                        key={word.id}
                        onClick={() => handleWordSelect(word)}
                        className="px-4 py-2 bg-amber-glow/10 border border-amber-glow/30 hover:bg-amber-glow/20 text-amber-glow rounded-lg font-serif transition-all active:scale-95 animate-in fade-in"
                    >
                        {word.text}
                    </button>
                ))}
            </div>
            {solved && <div className="absolute inset-0 flex items-center justify-center pointer-events-none"><ParticleBurst x={300} y={300} /></div>}
        </div>
    );
};

// --- 7. VISUAL QUIZ ---
const VisualQuizChallenge: React.FC<ChallengeProps> = ({ data, onComplete }) => {
    const d = data.visualQuizData!;
    const [selected, setSelected] = useState<number | null>(null);
    const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');

    const handleOption = (idx: number) => {
        if (status !== 'idle') return;
        setSelected(idx);
        
        if (idx === d.correctIndex) {
            setStatus('correct');
            setTimeout(() => onComplete(data.points), 2000);
        } else {
            setStatus('wrong');
            setTimeout(() => {
                setStatus('idle');
                setSelected(null);
            }, 1000);
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-8 items-center w-full max-w-4xl animate-in fade-in duration-500">
            <div className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0 rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl">
                <div 
                    className={`w-full h-full bg-cover transition-all duration-[1500ms] ease-in-out ${status === 'correct' ? 'scale-100 blur-0' : 'scale-150'}`}
                    style={{ 
                        backgroundImage: `url(${d.imageUrl})`,
                        ...(status === 'correct' ? { backgroundPosition: 'center', backgroundSize: 'cover' } : { 
                            backgroundPosition: `${d.cropStyle.left} ${d.cropStyle.top}`,
                            backgroundSize: `${d.cropStyle.width}` 
                        })
                    }}
                />
                {status !== 'correct' && <div className="absolute inset-0 bg-black/20 ring-inset ring-8 ring-black/50 pointer-events-none" />}
                {status === 'correct' && <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center animate-in fade-in duration-500"><Check size={48} className="text-white drop-shadow-lg" /></div>}
            </div>
            <div className="flex-1 space-y-6 w-full">
                <h3 className="text-xl font-serif text-white">{d.question}</h3>
                <div className="grid gap-3">
                    {d.options.map((opt, i) => (
                        <button
                            key={i}
                            onClick={() => handleOption(i)}
                            className={`
                                w-full text-left p-4 rounded-xl border transition-all duration-300 flex justify-between items-center
                                ${selected === i 
                                    ? status === 'correct' ? 'bg-green-500 border-green-400 text-black' 
                                    : status === 'wrong' ? 'bg-red-500 border-red-400 text-white animate-shake' 
                                    : 'bg-white/10'
                                    : 'bg-black/40 border-white/10 hover:bg-white/5 text-white/70'
                                }
                            `}
                        >
                            <span>{opt}</span>
                            {selected === i && status === 'correct' && <Check size={18} />}
                            {selected === i && status === 'wrong' && <X size={18} />}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const ChallengeInterface: React.FC<ChallengeProps> = (props) => {
  const [showHint, setShowHint] = useState(false);
  
  return (
    <div className="w-full space-y-8 flex flex-col items-center">
        <div className="text-center space-y-4 max-w-lg">
            <h3 className="text-2xl font-serif text-white tracking-tight uppercase flex items-center justify-center gap-3">
                <Zap size={24} className="text-amber-glow" />
                {props.data.title}
            </h3>
            <p className="text-xs font-mono text-white/50 tracking-[0.15em] border-t border-white/10 pt-4">
                {props.data.description}
            </p>
            {props.data.hint && (
                <div className="pt-2">
                    {!showHint ? (
                        <button 
                            onClick={() => setShowHint(true)}
                            className="text-[10px] uppercase tracking-widest text-amber-glow/50 hover:text-amber-glow flex items-center gap-2 mx-auto transition-colors"
                        >
                            <HelpCircle size={12} /> Access Hint Protocol
                        </button>
                    ) : (
                        <div className="bg-amber-glow/5 border border-amber-glow/10 rounded-lg p-3 mx-auto max-w-xs animate-in fade-in slide-in-from-top-2">
                             <div className="flex items-center gap-2 text-amber-glow mb-1 justify-center">
                                <Lightbulb size={12} />
                                <span className="text-[9px] font-bold uppercase tracking-widest">Guidance</span>
                             </div>
                             <p className="text-xs text-white/70 italic leading-relaxed">{props.data.hint}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
        
        <div className="w-full flex justify-center py-4">
            {props.data.type === 'tuner' && <TunerChallenge {...props} />}
            {props.data.type === 'slide-puzzle' && <SlidePuzzleChallenge {...props} />}
            {props.data.type === 'tile-swap' && <TileSwapChallenge {...props} />}
            {props.data.type === 'construction' && <ConstructionChallenge {...props} />}
            {props.data.type === 'memory' && <MemoryChallenge {...props} />}
            {props.data.type === 'lyric-scramble' && <LyricScrambleChallenge {...props} />}
            {props.data.type === 'visual-quiz' && <VisualQuizChallenge {...props} />}
        </div>
    </div>
  );
};
