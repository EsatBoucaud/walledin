
import React, { useState, useRef, useEffect } from 'react';
import { MoveRight, ArrowDown } from 'lucide-react';
import { NeuralBackground } from './NeuralBackground';
import { TrackRow } from './TrackRow';
import { ASSET_BASE } from '../lib/data';

// NEW: Glass Comic Strobe Component (Refined: Expansive, Non-Dizzy, Full Aura)
const GlassComicStrobe = () => (
    <div className="absolute -inset-32 z-[-1] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-screen">
        <div className="absolute inset-0 border-[40px] border-cyan-400/20 bg-cyan-400/5 blur-3xl -rotate-6 scale-110 transition-transform duration-[2000ms] group-hover:translate-x-4 group-hover:translate-y-4" />
        <div className="absolute inset-0 border-[40px] border-fuchsia-500/20 bg-fuchsia-500/5 blur-3xl rotate-6 scale-110 transition-transform duration-[2500ms] group-hover:-translate-x-4 group-hover:-translate-y-2" />
        <div className="absolute inset-0 bg-gradient-to-t from-yellow-300/10 via-transparent to-transparent blur-2xl opacity-50" />
        <div 
            className="absolute inset-0 opacity-10 mix-blend-overlay" 
            style={{ 
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, #fff 20px, #fff 21px)' 
            }}
        />
    </div>
);

export const LandingPage: React.FC<{ onEnter: () => void }> = ({ onEnter }) => {
  const [exiting, setExiting] = useState(false);
  const [heroHovered, setHeroHovered] = useState(false);
  const displacementMapRef = useRef<SVGFEDisplacementMapElement | null>(null);
  const dichotomyRef = useRef<HTMLCanvasElement>(null);
  const footerRef = useRef<HTMLCanvasElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const dichotomySectionRef = useRef<HTMLDivElement>(null);
  const tracklistSectionRef = useRef<HTMLDivElement>(null);
  const footerSectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [centeredIndex, setCenteredIndex] = useState(-1);
  const [cycleIndex, setCycleIndex] = useState(0);
  const [cyclePhase, setCyclePhase] = useState<'in' | 'stay' | 'crumble'>('in');
  const centeredIndexRef = useRef(-1);
  const scrollTickingRef = useRef(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [isDichotomyVisible, setIsDichotomyVisible] = useState(false);
  const [isTracklistVisible, setIsTracklistVisible] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  
  const handleEnter = () => { setExiting(true); setTimeout(onEnter, 1200); };

  // --- TRACK DATA ---
  const tracks = [
    { id: "01", title: "VICTOR", role: "THE ARCHITECT", desc: "Victor Yuan a director flip a script like Rob Reiner.", color: "#739472", img: `${ASSET_BASE}/Posters/1.webp` }, 
    { id: "02", title: "Broadripple", role: "THE FIRE", desc: "Get high at school and burn like Broadripple.", color: "#F43F5E", img: `${ASSET_BASE}/Posters/3.webp` }, 
    { id: "03", title: "Cog-Sci", role: "THE LOGIC", desc: "I'll start relearning things that I thought I knew.", color: "#FBBF24", img: `${ASSET_BASE}/Posters/4.webp` }, 
    { id: "04", title: "The Rum Drum", role: "THE RHYTHM", desc: "The Rum Drum, A nightly Conundrum.", color: "#A5E6EA", img: `${ASSET_BASE}/Posters/6.webp` }, 
    { id: "05", title: "Monumental", role: "THE SYSTEM", desc: "I got a monumental mental Mon.", color: "#A8A29E", img: `${ASSET_BASE}/Posters/11.webp` }, 
    { id: "06", title: "Lender", role: "THE TAX", desc: "We on the bus ride away, can you lend me an ear?", color: "#4ADE80", img: `${ASSET_BASE}/Posters/9.webp` }, 
    { id: "07", title: "GLOOM", role: "THE SHADOW", desc: "Orpheus in the valley of the shadow of death.", color: "#C084FC", img: `${ASSET_BASE}/Posters/10.webp` }, 
    { id: "08", title: "Earnest Reader", role: "THE SEED", desc: "She sat between the reeds, sewing beads, flowing seeds.", color: "#C4B5FD", img: `${ASSET_BASE}/Posters/13.webp` }, 
    { id: "09", title: "The Better", role: "THE GAMBLE", desc: "Getting lost in your eyes, watching the day turn to night.", color: "#FCA5A5" },
    { id: "10", title: "Momentum", role: "THE FLIGHT", desc: "I got a body full of cortisol and not a friend to call.", color: "#A8A29E", img: `${ASSET_BASE}/Posters/12.webp` }, 
    { id: "11", title: "Knee Socks", role: "THE STASIS", desc: "Lights on in afternoon, write songs on raft in light of moon.", color: "#FDA4AF", img: `${ASSET_BASE}/Posters/16.webp` }, 
    { id: "12", title: "World in a Jar", role: "THE SPECIMEN", desc: "She'll hurl, from the swirl of your whirl in a jar.", color: "#99F6E4", img: `${ASSET_BASE}/Posters/15.webp` }, 
    { id: "13", title: "The Liq Tick", role: "THE VARNISH", desc: "It's a varnish for the wood rot, a garnish for a good thought.", color: "#D9F99D", img: `${ASSET_BASE}/Posters/7.webp` }, 
    { id: "14", title: "The Machine", role: "THE ROUTINE", desc: "Ay, You know I try my best.", color: "#FBBF24", img: `${ASSET_BASE}/Posters/2.webp` }, 
    { id: "15", title: "Sincere Writer", role: "THE ALCHEMY", desc: "I'm liable to scream, ripping and prying at a pliable seam.", color: "#C4B5FD", img: `${ASSET_BASE}/Posters/14.webp` }, 
    { id: "16", title: "The Stranger", role: "THE END", desc: "I'm just a Stranger in your Town.", color: "#EF4444", img: `${ASSET_BASE}/Posters/8.webp` }, 
    { id: "17", title: "01010101", role: "THE VOID", desc: "SIGNAL_LOST_RETRY_CONNECT", color: "#555" },
  ];

  useEffect(() => {
    const handleScroll = () => {
        if (scrollTickingRef.current || !scrollContainerRef.current) return;
        scrollTickingRef.current = true;

        requestAnimationFrame(() => {
            const container = scrollContainerRef.current;
            if (!container) {
                scrollTickingRef.current = false;
                return;
            }

            const containerRect = container.getBoundingClientRect();
            const centerY = containerRect.top + containerRect.height / 2;
            let closestIndex = -1;
            let minDistance = Infinity;

            rowRefs.current.forEach((row, idx) => {
                if (!row) return;
                const rect = row.getBoundingClientRect();
                if (rect.bottom < 0 || rect.top > window.innerHeight) return;
                const rowCenter = rect.top + rect.height / 2;
                const dist = Math.abs(centerY - rowCenter);
                if (dist < minDistance) {
                    minDistance = dist;
                    closestIndex = idx;
                }
            });

            if (closestIndex !== centeredIndexRef.current) {
                centeredIndexRef.current = closestIndex;
                setCenteredIndex(closestIndex);
            }
            scrollTickingRef.current = false;
        });
    };

    const scroller = scrollContainerRef.current;
    if (scroller) {
        scroller.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
    }
    return () => scroller?.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
      const root = scrollContainerRef.current;
      const heroTarget = heroSectionRef.current;
      const dichotomyTarget = dichotomySectionRef.current;
      const tracklistTarget = tracklistSectionRef.current;
      const footerTarget = footerSectionRef.current;
      if (!root || !heroTarget || !dichotomyTarget || !tracklistTarget || !footerTarget) return;

      const observer = new IntersectionObserver(
          (entries) => {
              entries.forEach((entry) => {
                  if (entry.target === dichotomyTarget) {
                      setIsDichotomyVisible(entry.isIntersecting);
                  } else if (entry.target === heroTarget) {
                      setIsHeroVisible(entry.isIntersecting);
                  } else if (entry.target === tracklistTarget) {
                      setIsTracklistVisible(entry.isIntersecting);
                  } else if (entry.target === footerTarget) {
                      setIsFooterVisible(entry.isIntersecting);
                  }
              });
          },
          { root, threshold: 0.08 }
      );

      observer.observe(heroTarget);
      observer.observe(dichotomyTarget);
      observer.observe(tracklistTarget);
      observer.observe(footerTarget);
      return () => observer.disconnect();
  }, []);

  useEffect(() => {
      let timeouts: ReturnType<typeof setTimeout>[] = [];
      const runCycle = () => {
          setCyclePhase('in');
          timeouts.push(setTimeout(() => { setCyclePhase('stay'); }, 800));
          timeouts.push(setTimeout(() => { setCyclePhase('crumble'); }, 4000));
          timeouts.push(setTimeout(() => { setCycleIndex(prev => (prev + 1) % tracks.length); runCycle(); }, 5000));
      };
      runCycle();
      return () => timeouts.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;
    displacementMapRef.current = document.getElementById('fluidDisplacement') as unknown as SVGFEDisplacementMapElement;
    let targetScale = 0; let currentScale = 0; let animationFrame: number;
    const loop = () => {
        currentScale += (targetScale - currentScale) * 0.1;
        if (displacementMapRef.current) { displacementMapRef.current.scale.baseVal = currentScale; }
        animationFrame = requestAnimationFrame(loop);
    };
    loop();
    const handleMouseMove = (e: MouseEvent) => {
        const speed = Math.abs(e.movementX) + Math.abs(e.movementY);
        const baseDistortion = Math.min(speed * 0.5, 20); 
        let isTarget = false;
        const target = e.target;
        if (target instanceof Element) {
             if (target.closest('.fluid-target')) isTarget = true;
             if (isTarget) { targetScale = 30 + baseDistortion; } else if (target.closest('button') || target.closest('a')) { targetScale = 5; } else { targetScale = 0; }
        }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => { window.removeEventListener('mousemove', handleMouseMove); cancelAnimationFrame(animationFrame); };
  }, []);

  // --- WEBGL SHADER BACKGROUND (DICHOTOMY) ---
  useEffect(() => {
        if (!isDichotomyVisible) return;
        const canvas = dichotomyRef.current;
        if (!canvas) return;
        
        const gl = canvas.getContext('webgl2');
        if (!gl) return;

        const vsSource = `#version 300 es
        in vec4 position;
        void main() {
            gl_Position = position;
        }`;

        const fsSource = `#version 300 es
        precision highp float;
        uniform vec2 iResolution;
        uniform float iTime;
        out vec4 fragColor;

        void main() {
            vec2 r = iResolution;
            float t = iTime;
            vec2 FC = gl_FragCoord.xy;
            vec4 o = vec4(0.0);
            vec2 p = (FC.xy * 2. - r) / r.y / .4;
            vec2 v = vec2(0.0);
            for(float i=0.; i<9.; i++) {
                float i_val = i + 1.; 
                v = p;
                float l = 0.;
                for(float f=0.; f<9.; f++) {
                    float f_val = f + 1.;
                    v += cos(ceil(v.yx * f_val + i_val * .1) + t / 2.) / f_val;
                }
                l = length(v * v.yx);
                o += .01 / l * (cos(i_val/4. + v.y + vec4(0,1,2,4)) + 1.);
            }
            o *= 0.5;
            fragColor = vec4(tanh(o.rgb), 1.0); 
        }`;

        const createShader = (type: number, source: string) => {
            const shader = gl.createShader(type);
            if (!shader) return null;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        };

        const vertexShader = createShader(gl.VERTEX_SHADER, vsSource);
        const fragmentShader = createShader(gl.FRAGMENT_SHADER, fsSource);
        if (!vertexShader || !fragmentShader) return;

        const program = gl.createProgram();
        if (!program) return;
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.useProgram(program);

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);

        const positionLocation = gl.getAttribLocation(program, "position");
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        const iResolutionLocation = gl.getUniformLocation(program, "iResolution");
        const iTimeLocation = gl.getUniformLocation(program, "iTime");

        let animationFrameId: number;
        const startTime = Date.now();

        const render = () => {
            if (!canvas.parentElement) return;
            const width = canvas.parentElement.clientWidth;
            const height = canvas.parentElement.clientHeight;
            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width; canvas.height = height; gl.viewport(0, 0, width, height);
            }
            const time = (Date.now() - startTime) * 0.001;
            gl.uniform2f(iResolutionLocation, width, height);
            gl.uniform1f(iTimeLocation, time);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
            animationFrameId = requestAnimationFrame(render);
        };
        render();
        return () => { cancelAnimationFrame(animationFrameId); gl.deleteProgram(program); };
    }, [isDichotomyVisible]);

  // --- WEBGL SHADER BACKGROUND (FOOTER) ---
  useEffect(() => {
        if (!isFooterVisible) return;
        const canvas = footerRef.current;
        if (!canvas) return;
        
        const gl = canvas.getContext('webgl2');
        if (!gl) return;

        const vsSource = `#version 300 es
        in vec4 position;
        void main() {
            gl_Position = position;
        }`;

        const fsSource = `#version 300 es
        precision highp float;
        uniform vec2 iResolution;
        uniform float iTime;
        out vec4 fragColor;

        void main() {
            vec2 r = iResolution;
            float t = iTime;
            vec3 FC = vec3(gl_FragCoord.xy, 0.0);
            vec4 o = vec4(0.0);
            vec3 w, p;
            float z = 0.0;
            float d = 0.1;
            
            for(float i=0.; i<100.; i++) {
                p = z * (FC * 2.0 - vec3(r, r.y)) / r.y + 1.0;
                w = p;
                
                for(float f=0.; f<5.; f++) {
                    float k = f + 1.0;
                    w += sin(w.zxy * k - 9.0 * exp(-d / 0.1) + t) / k;
                }
                
                vec4 shift = vec4(0.0, 1.0, 2.0, 3.0) / 100.0;
                o += 0.03 / abs(mix(p, w, 0.1).y + shift) * d;
                
                d = 0.3 * (length(cos(p.xz)) - 0.4);
                z += d;
            }
            
            o = tanh(o);
            vec3 tint = vec3(0.71, 0.95, 0.96); // Ice Blue #B5F3F5
            fragColor = vec4(o.rgb * tint, 1.0);
        }`;

        const createShader = (type: number, source: string) => {
            const shader = gl.createShader(type);
            if (!shader) return null;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        };

        const vertexShader = createShader(gl.VERTEX_SHADER, vsSource);
        const fragmentShader = createShader(gl.FRAGMENT_SHADER, fsSource);
        if (!vertexShader || !fragmentShader) return;

        const program = gl.createProgram();
        if (!program) return;
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.useProgram(program);

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);

        const positionLocation = gl.getAttribLocation(program, "position");
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        const iResolutionLocation = gl.getUniformLocation(program, "iResolution");
        const iTimeLocation = gl.getUniformLocation(program, "iTime");

        let animationFrameId: number;
        const startTime = Date.now();

        const render = () => {
            if (!canvas.parentElement) return;
            const width = canvas.parentElement.clientWidth;
            const height = canvas.parentElement.clientHeight;
            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width; canvas.height = height; gl.viewport(0, 0, width, height);
            }
            const time = (Date.now() - startTime) * 0.001;
            gl.uniform2f(iResolutionLocation, width, height);
            gl.uniform1f(iTimeLocation, time);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
            animationFrameId = requestAnimationFrame(render);
        };
        render();
        return () => { cancelAnimationFrame(animationFrameId); gl.deleteProgram(program); };
    }, [isFooterVisible]);

  return (
    <div className={`fixed inset-0 z-[300] bg-museum-black text-museum-paper font-sans transition-transform duration-[1.5s] ease-[cubic-bezier(0.77,0,0.175,1)] ${exiting ? '-translate-y-full' : 'translate-y-0'}`}>
      
      <div ref={scrollContainerRef} className="w-full h-full overflow-y-auto overflow-x-hidden" style={{ WebkitOverflowScrolling: 'touch' }}>
        
        {/* 1. HERO --- */}
        <div ref={heroSectionRef} className="min-h-screen flex flex-col justify-center items-center relative px-6 overflow-hidden bg-black">
            {/* STACKED BACKGROUND: Neural Flow + Video */}
            <div className="absolute inset-0 z-0">
                {/* 1. Neural Motion Layer */}
                <div className="absolute inset-0 opacity-100">
                    <NeuralBackground quality="low" paused={!isHeroVisible} />
                </div>
                
                {/* 2. Video Layer (Semi-transparent) */}
                <video 
                    src={`${ASSET_BASE}/Posters/Videos/Missing_draft_one/Van%20Gogh%20Video.webm`}
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen" 
                />
                
                {/* 3. Vignette/Dimmer */}
                <div className="absolute inset-0 bg-black/50" />
            </div>
            
            <div className="relative z-10 text-center select-none fluid-target w-full">
                <div 
                    className="relative group cursor-pointer active:scale-95 transition-transform duration-300"
                    onMouseEnter={() => setHeroHovered(true)} onMouseLeave={() => setHeroHovered(false)}
                    onTouchStart={() => setHeroHovered(true)} onTouchEnd={() => setHeroHovered(false)}
                >
                    <h2 className="font-serif text-[15vw] leading-[0.8] tracking-tighter text-sage-green mix-blend-screen transition-opacity duration-700 group-hover:opacity-0 blur-0 group-hover:blur-sm animate-pulse-slow md:animate-none">EARNEST...</h2>
                    <h2 className="absolute inset-0 font-serif text-[15vw] leading-[0.8] tracking-tighter text-muted-purple mix-blend-screen opacity-0 group-hover:opacity-100 transition-all duration-300 scale-110 group-hover:scale-100">SINCERE...</h2>
                    <div className="absolute -top-12 left-0 w-full text-center"><span className="font-sans font-bold text-xs tracking-[0.5em] text-white/40">IT IS HARD TO BE</span></div>
                </div>
            </div>
            <div className="mt-24 w-full text-center z-10 mix-blend-difference relative h-12 flex justify-center overflow-visible">
                <p className={`absolute font-serif italic text-white/60 text-xl md:text-2xl leading-relaxed transition-all duration-700 ease-in-out whitespace-normal md:whitespace-nowrap ${heroHovered ? 'opacity-0 translate-y-8 blur-sm' : 'opacity-100 translate-y-0 blur-0'}`}>"When they burn us and learn us, demands that we flourish."</p>
                <p className={`absolute font-serif italic text-muted-purple text-xl md:text-2xl leading-relaxed transition-all duration-700 ease-in-out whitespace-normal md:whitespace-nowrap ${heroHovered ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 -translate-y-8 blur-sm'}`}>"When they paint a veneer, constrain us as they steer..."</p>
            </div>
            <div className="absolute bottom-12 left-0 right-0 flex justify-center animate-bounce mix-blend-difference opacity-20"><ArrowDown className="text-white" size={24} /></div>
        </div>

        {/* 2. EDITORIAL --- */}
        <div ref={dichotomySectionRef} className="relative bg-black text-white py-32 px-6 md:px-24 overflow-hidden">
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes split-dicho {
                0%, 100% { transform: translate(0, 0); }
                50% { transform: translate(-4px, -2px); } 
              }
              @keyframes split-tomy {
                0%, 100% { transform: translate(0, 0); }
                50% { transform: translate(4px, 2px); }
              }
            `}} />
            
            {/* SHADER BACKGROUND */}
            <canvas ref={dichotomyRef} className="absolute inset-0 w-full h-full opacity-100 pointer-events-none" />
            
            <div className="relative z-10 max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
                    <div className="flex-1 w-full">
                        {/* TITLE BOX */}
                        <div className="bg-black/30 backdrop-blur-[2px] p-8 md:p-10 rounded-2xl border border-white/5 shadow-2xl">
                            <h3 className="font-serif text-5xl md:text-7xl leading-[0.9] tracking-tight">
                                The False <br/>
                                <span className="italic text-sage-green inline-block whitespace-nowrap">
                                    <span className="inline-block" style={{ animation: 'split-dicho 6s ease-in-out infinite' }}>Dicho</span>
                                    <span className="inline-block" style={{ animation: 'split-tomy 6s ease-in-out infinite' }}>tomy.</span>
                                </span>
                            </h3>
                        </div>
                    </div>
                    <div className="flex-1 w-full">
                        {/* TEXT BODY BOX */}
                        <div className="bg-black/30 backdrop-blur-[2px] p-8 md:p-10 rounded-2xl border border-white/5 shadow-2xl h-full flex flex-col justify-center">
                            <div className="space-y-8 font-serif text-lg md:text-xl leading-relaxed text-white/90">
                                <p>We separate the architect from the inhabitant. The one who builds the walls to keep the world out, and the one who tends the garden within them.</p>
                                <p>This is an exhibition of relationships between the <span className="text-white font-bold">Conqueror</span> and the <span className="text-white font-bold">Creative</span> within the same skull.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* 3. CRUMBLING TEXT CYCLER (Condensed) --- */}
        <div className="bg-black text-white py-12 px-6 overflow-hidden flex flex-col items-center justify-center border-y border-white/10 relative min-h-[150px]">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 pointer-events-none" />
            <div className="text-center w-full max-w-7xl relative z-20">
                <div className="h-16 flex items-center justify-center overflow-visible">
                    <h3 className="font-serif text-lg md:text-2xl lg:text-3xl leading-tight tracking-tight text-center relative max-w-[90vw]">
                        {tracks[cycleIndex].desc.split('').map((char, i) => {
                            // Seeded random logic based on index and character code
                            const seed = (i * 1337 + char.charCodeAt(0));
                            const randX = (Math.sin(seed) * 100); 
                            const randY = (Math.cos(seed) * 100); 
                            const rotate = (Math.sin(seed * 0.5) * 180);
                            const crumbleDelay = Math.abs(Math.sin(seed * 0.77)) * 420;

                            let style: React.CSSProperties = {
                                display: 'inline-block',
                                transition: 'all 1s cubic-bezier(0.2, 0.8, 0.2, 1)',
                                minWidth: char === ' ' ? '0.3em' : 'auto'
                            };

                            if (cyclePhase === 'in') {
                                style.opacity = 0;
                                style.transform = 'translateY(20px) scale(0.8)';
                                style.filter = 'blur(10px)';
                                style.transitionDelay = `${i * 20}ms`;
                            } else if (cyclePhase === 'stay') {
                                style.opacity = 1;
                                style.transform = 'translate(0, 0) scale(1) rotate(0deg)';
                                style.filter = 'blur(0px)';
                            } else if (cyclePhase === 'crumble') {
                                style.opacity = 0;
                                style.transform = `translate(${randX}px, ${randY}px) rotate(${rotate}deg)`;
                                style.filter = 'blur(2px)';
                                style.transitionDelay = `${crumbleDelay}ms`;
                            }

                            return (
                                <span key={i} style={style}>
                                    {char}
                                </span>
                            );
                        })}
                    </h3>
                </div>
                <div className={`mt-4 transition-opacity duration-1000 ${cyclePhase === 'stay' ? 'opacity-100' : 'opacity-0'}`}>
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-500">
                        /// {tracks[cycleIndex].title} ///
                    </span>
                </div>
            </div>
        </div>

        {/* 4. GALLERY --- */}
        <div className="bg-[#0a0a0c] py-32 px-6 md:px-24 border-t border-white/5">
            <div className="max-w-[1800px] mx-auto">
                <div className="mb-24 text-center"><span className="font-mono text-xs text-white/30 uppercase tracking-[0.3em]">The Subjects</span></div>
                
                {/* CAREY */}
                <div className="flex flex-col md:flex-row gap-12 md:gap-32 items-center mb-48">
                    <div className="w-full md:w-1/2 fluid-target select-none">
                        <div className="relative aspect-[3/4] transition-all duration-700 ease-out group active:scale-[0.98] duration-200">
                            {/* STROBE EFFECT (Expansive, Non-Dizzy) */}
                            <GlassComicStrobe />
                            
                            <div className="relative w-full h-full overflow-hidden">
                                <img src={`${ASSET_BASE}/Posters/13.webp`} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Carey" />
                                <div className="absolute inset-0 bg-sage-green mix-blend-multiply opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 text-left space-y-8">
                        <span className="inline-block px-3 py-1 border border-sage-green/30 text-sage-green text-[10px] tracking-[0.2em] uppercase">Figure 01</span>
                        <h3 className="font-serif text-6xl md:text-8xl text-white">Carey.</h3>
                        <p className="font-sans text-white/50 text-sm md:text-base leading-loose max-w-md">The Socialist of the Soul. He believes the signal belongs to everyone. He "feeds on seeds" and creates "teary songs" to bridge the gap between strangers.</p>
                        <div className="h-px w-24 bg-sage-green" />
                    </div>
                </div>

                {/* VICTOR */}
                <div className="flex flex-col md:flex-row-reverse gap-12 md:gap-32 items-center">
                    <div className="w-full md:w-1/2 fluid-target select-none">
                        <div className="relative aspect-[3/4] transition-all duration-700 ease-out group active:scale-[0.98] duration-200">
                            {/* STROBE EFFECT (Expansive, Non-Dizzy) */}
                            <GlassComicStrobe />

                            <div className="relative w-full h-full overflow-hidden">
                                <img src={`${ASSET_BASE}/Posters/1.webp`} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Victor" />
                                <div className="absolute inset-0 bg-muted-purple mix-blend-multiply opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 text-right md:text-left flex flex-col md:items-start items-end space-y-8">
                        <span className="inline-block px-3 py-1 border border-muted-purple/30 text-muted-purple text-[10px] tracking-[0.2em] uppercase">Figure 02</span>
                        <h3 className="font-serif text-6xl md:text-8xl text-white">Victor.</h3>
                        <p className="font-sans text-white/50 text-sm md:text-base leading-loose max-w-md text-right md:text-left">The Darwinist of the Mind. He believes in the survival of the fittest draft. He carries a "sword in sheath" and "flips the script" to ensure victory.</p>
                        <div className="h-px w-24 bg-muted-purple" />
                    </div>
                </div>
            </div>
        </div>

        {/* 6. INDEX (Tracklist) --- */}
        <div ref={tracklistSectionRef} className="bg-[#0a0a0a] text-white min-h-screen py-32 relative overflow-hidden border-t border-white/5">
            {/* NEURAL BACKGROUND (Standard Dark Mode) */}
            <div className="absolute inset-0 opacity-30 pointer-events-none z-0">
                <NeuralBackground quality="low" paused={!isTracklistVisible} />
            </div>
            
            <div className="max-w-[90%] mx-auto relative z-10">
                <div className="mb-24 flex justify-between items-end border-b border-white/10 pb-8">
                    <h2 className="font-serif text-[10vw] leading-[0.8] tracking-tighter text-white/90">TRACKLIST</h2>
                    <span className="font-mono text-xs text-white/30 uppercase tracking-[0.2em] hidden md:block">Volume 001 - The Corpus</span>
                </div>

                <div className="flex flex-col border-t border-white/10">
                    {tracks.map((track, i) => (
                        <TrackRow 
                            key={i} 
                            track={track} 
                            index={i} 
                            onClick={handleEnter} 
                            isCentered={i === centeredIndex} 
                            ref={(el) => { rowRefs.current[i] = el; }}
                        />
                    ))}
                </div>
            </div>
        </div>

        {/* 8. FOOTER --- */}
        <div ref={footerSectionRef} className="bg-museum-black h-[80vh] flex flex-col items-center justify-center relative overflow-hidden text-center px-6 border-t border-white/10">
            {/* SHADER CANVAS */}
            <canvas ref={footerRef} className="absolute inset-0 w-full h-full opacity-60 mix-blend-screen pointer-events-none" />
            
            <h2 className="relative z-20 font-serif text-3xl md:text-5xl text-white mix-blend-difference mb-8 max-w-4xl leading-tight">Dedicated to <span className="text-ice-blue font-bold">my family</span>,<br/>and <span className="italic text-white/50">New York City.</span></h2>
            <button onClick={handleEnter} className="relative z-20 group inline-flex items-center gap-6 px-16 py-8 border-2 border-white/30 hover:border-ice-blue bg-black/50 hover:bg-ice-blue transition-all duration-500 overflow-hidden rounded-full mt-12 hover:scale-105 hover:shadow-[0_0_40px_rgba(181,243,245,0.3)] backdrop-blur-sm">
                <span className="relative z-10 text-sm font-bold uppercase tracking-[0.4em] text-white group-hover:text-black transition-colors">Enter Exhibition</span>
                <MoveRight className="relative z-10 text-white group-hover:text-black transition-colors group-hover:translate-x-2" size={20} />
            </button>
            <div className="absolute bottom-8 right-8 text-white/10 text-[10px] uppercase tracking-[0.4em] font-sans font-bold z-20">THE EASTERN SEABOARD</div>
        </div>

      </div>
    </div>
  );
};
