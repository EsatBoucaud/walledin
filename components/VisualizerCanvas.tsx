
import React, { useEffect, useRef } from 'react';

// --- VISUALIZER ENGINES ---
export const VISUALIZERS: Record<string, (ctx: CanvasRenderingContext2D, w: number, h: number, time: number) => void> = {
    // 1. VICTOR: REALISTIC DRAGONFLIES (INDEPENDENT)
    'track-victor-ep': (ctx, w, h, time) => {
        const drawDragonfly = (x: number, y: number, scale: number, seed: number) => {
            ctx.save();
            ctx.translate(x, y);
            
            // Hover/Dart Physics (Unique per fly)
            const vibX = Math.sin(time * (40 + seed % 20) + seed) * 1.5;
            const vibY = Math.cos(time * (50 + seed % 20) + seed) * 1.5;
            ctx.translate(vibX, vibY);

            // Rotate based on movement (darting)
            const angle = Math.sin(time * 0.5 + seed) * 0.3;
            ctx.rotate(angle + Math.PI / 4); 

            const color = '#a3e635'; // Lime green
            
            // 1. Long Abdomen
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, 40 * scale); 
            ctx.lineTo(-2 * scale, 40 * scale);
            ctx.lineTo(-3 * scale, 0);
            ctx.fill();
            
            ctx.fillStyle = 'rgba(0,0,0,0.3)';
            for(let i=1; i<8; i++) {
                ctx.fillRect(-3*scale, i * 5 * scale, 3*scale, 1);
            }

            // 2. Thorax
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.ellipse(0, -5 * scale, 4 * scale, 6 * scale, 0, 0, Math.PI*2);
            ctx.fill();

            // 3. Head
            ctx.fillStyle = '#ecfccb'; // Lighter head
            ctx.beginPath();
            ctx.arc(0, -12 * scale, 5 * scale, 0, Math.PI*2);
            ctx.fill();

            // 4. Wings
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.lineWidth = 0.5;
            
            // Unique flutter speed
            const wingSpeed = time * (70 + (seed % 30)) + seed * 10;
            const flutter = Math.sin(wingSpeed) * 0.5; 
            
            ctx.beginPath();
            ctx.ellipse(15 * scale, -5 * scale, 25 * scale, Math.abs(4 * scale * flutter), 0.2, 0, Math.PI*2);
            ctx.fill(); ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(-15 * scale, -5 * scale, 25 * scale, Math.abs(4 * scale * flutter), -0.2, 0, Math.PI*2);
            ctx.fill(); ctx.stroke();

            ctx.beginPath();
            ctx.ellipse(15 * scale, 2 * scale, 22 * scale, Math.abs(3 * scale * -flutter), 0.4, 0, Math.PI*2);
            ctx.fill(); ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(-15 * scale, 2 * scale, 22 * scale, Math.abs(3 * scale * -flutter), -0.4, 0, Math.PI*2);
            ctx.fill(); ctx.stroke();

            ctx.restore();
        };

        const count = 5;
        for(let i=0; i<count; i++) {
            // Independent movement logic
            const speedVar = 0.3 + (i % 3) * 0.15;
            const t = time * speedVar + i * 234.5; // Offset start
            
            const step = Math.floor(t); 
            const interp = t - step;
            const ease = interp < 0.2 ? interp * 5 : 1; 
            
            const seedX1 = (step * 9301 + 49297) % 233280;
            const seedY1 = (step * 49297 + 9301) % 233280;
            const seedX2 = ((step + 1) * 9301 + 49297) % 233280;
            const seedY2 = ((step + 1) * 49297 + 9301) % 233280;

            const x1 = (seedX1 / 233280) * w;
            const y1 = (seedY1 / 233280) * h;
            const x2 = (seedX2 / 233280) * w;
            const y2 = (seedY2 / 233280) * h;
            
            const currX = x1 + (x2 - x1) * ease;
            const currY = y1 + (y2 - y1) * ease;

            drawDragonfly(currX, currY, 0.6 + (i%2)*0.2, i);
        }
    },

    // 2. BROADRIPPLE: INFERNO
    'track-broadripple': (ctx, w, h, time) => {
        const count = 150;
        for(let i=0; i<count; i++) {
            const seed = i * 13.5;
            const y = (h - ((time * 80 + seed * 100) % (h + 100))); 
            const x = (w * 0.5) + (Math.sin(time * 2 + i) * w * (0.1 + (y/h)*0.4));
            const size = (Math.sin(time * 10 + i) + 2) * 1.5;
            const alpha = Math.max(0, (y/h) - 0.2);
            ctx.fillStyle = `rgba(255, ${Math.floor(Math.random()*150)}, 50, ${alpha})`;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI*2);
            ctx.fill();
        }
    },

    // 3. COG-SCI: NEURAL
    'track-cogsci': (ctx, w, h, time) => {
        const nodes = [];
        const count = 40;
        for(let i=0; i<count; i++) {
            nodes.push({
                x: w/2 + Math.cos(i * 13 + time * 0.1) * (w * 0.35),
                y: h/2 + Math.sin(i * 19 + time * 0.15) * (h * 0.35)
            });
        }
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.15)'; 
        ctx.lineWidth = 1;
        ctx.beginPath();
        for(let i=0; i<count; i++) {
            for(let j=i+1; j<count; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = dx*dx + dy*dy;
                if (dist < 15000) { 
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                }
            }
        }
        ctx.stroke();
    },

    // 4. RUM DRUM: RIPPLES
    'track-rumdrum': (ctx, w, h, time) => {
        const cx = w/2;
        const cy = h/2;
        const count = 8;
        const maxR = Math.min(w,h) * 0.6;
        for(let i=0; i<count; i++) {
            const progress = (time * 0.5 + i/count) % 1;
            const r = progress * maxR;
            const opacity = 1 - progress;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, Math.PI*2);
            ctx.stroke();
        }
    },

    // 5. MONUMENTAL: BLOCKS
    'track-monumental': (ctx, w, h, time) => {
        const cols = 25;
        const colW = w / cols;
        for(let i=0; i<cols; i++) {
            const speed = 1 + (i % 5);
            const y = (time * 50 * speed) % (h + 200) - 200;
            const hBlock = 100 + (i * 30) % 150;
            ctx.fillStyle = `rgba(255, 255, 255, 0.1)`;
            ctx.fillRect(i * colW, 0, colW - 2, h); 
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.fillRect(i * colW, y, colW - 2, hBlock); 
        }
    },

    // 6. LENDER: SMOOTH ELECTRON FLOW
    'track-lender': (ctx, w, h, time) => {
        const cx = w/2; const cy = h/2;
        const dist = 140;
        
        // Atom A (Donor) - Pulse
        const scaleA = 1 + Math.sin(time * 3) * 0.05;
        ctx.fillStyle = '#4ade80';
        ctx.beginPath(); ctx.arc(cx - dist/2, cy, 15 * scaleA, 0, Math.PI*2); ctx.fill();
        ctx.strokeStyle = 'rgba(74, 222, 128, 0.2)';
        ctx.beginPath(); ctx.arc(cx - dist/2, cy, 50, 0, Math.PI*2); ctx.stroke();

        // Atom B (Acceptor) - Pulse
        const scaleB = 1 + Math.cos(time * 3) * 0.05;
        ctx.fillStyle = '#60a5fa';
        ctx.beginPath(); ctx.arc(cx + dist/2, cy, 15 * scaleB, 0, Math.PI*2); ctx.fill();
        ctx.strokeStyle = 'rgba(96, 165, 250, 0.2)';
        ctx.beginPath(); ctx.arc(cx + dist/2, cy, 50, 0, Math.PI*2); ctx.stroke();

        // PARTICLE SYSTEM for Seamless Flow
        const particleCount = 12;
        
        for (let i = 0; i < particleCount; i++) {
            const t = (time * 0.3 + (i / particleCount)) % 1; 
            
            let x, y, alpha;
            const startX = cx - dist/2;
            const endX = cx + dist/2;
            
            if (t < 0.3) {
                const angle = t * 20; 
                x = startX + Math.cos(angle) * 50;
                y = cy + Math.sin(angle) * 50;
                alpha = t / 0.3; 
            } 
            else if (t < 0.7) {
                const prog = (t - 0.3) / 0.4; 
                x = startX + (endX - startX) * prog;
                y = cy + Math.sin(prog * Math.PI * 2) * 20; 
                alpha = 1;
                
                ctx.fillStyle = `rgba(251, 191, 36, 0.3)`;
                ctx.beginPath(); ctx.arc(x - 2, y, 2, 0, Math.PI*2); ctx.fill();
            } 
            else {
                const prog = (t - 0.7) / 0.3;
                const angle = prog * 20;
                x = endX + Math.cos(angle + Math.PI) * 50;
                y = cy + Math.sin(angle + Math.PI) * 50;
                alpha = 1 - prog; 
            }

            ctx.fillStyle = `rgba(251, 191, 36, ${Math.max(0, Math.min(1, alpha))})`;
            ctx.shadowBlur = 10; ctx.shadowColor = '#fbbf24';
            ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI*2); ctx.fill();
            ctx.shadowBlur = 0;
        }
    },

    // 07 GLOOM: ABYSSAL RAIN
    'track-gloom': (ctx, w, h, time) => {
        const count = 200;
        ctx.fillStyle = 'rgba(167, 139, 250, 0.4)'; 
        
        for(let i=0; i<count; i++) {
            const x = (i * 13 + time * 50) % w; 
            const speed = (i % 5) + 15;
            const y = (time * 60 * speed + i * 100) % (h + 100);
            const len = speed * 3;
            ctx.fillRect(x, y - len, 1.5, len);
        }
        
        const g = ctx.createLinearGradient(0, h * 0.5, 0, h);
        g.addColorStop(0, 'rgba(0,0,0,0)');
        g.addColorStop(1, 'rgba(10, 5, 20, 0.9)');
        ctx.fillStyle = g;
        ctx.fillRect(0, h * 0.5, w, h * 0.5);
    },

    // 08 EARNEST READER: FALLING WORDS
    'track-earnest': (ctx, w, h, time) => {
        const words = ["SEED", "READ", "FLOW", "GROW", "BIND", "MIND", "TIME", "LINE"];
        ctx.fillStyle = 'rgba(196, 181, 253, 0.8)';
        ctx.font = '10px monospace';
        
        const cols = Math.floor(w / 40);
        for(let i=0; i<cols; i++) {
            const speed = (i % 3) + 1; 
            const y = (time * 30 * speed + i * 50) % (h + 50);
            const wordIndex = (i + Math.floor(time)) % words.length;
            
            ctx.globalAlpha = Math.min(1, y / 100); 
            ctx.fillText(words[wordIndex], i * 40 + 10, y - 10);
            
            ctx.globalAlpha = 0.3;
            ctx.fillText(words[wordIndex][0], i * 40 + 10, y - 30);
        }
        ctx.globalAlpha = 1;
    },

    // THE BETTER: ANIMATED SUNSET
    'track-better': (ctx, w, h, time) => {
        const g = ctx.createLinearGradient(0, 0, 0, h);
        g.addColorStop(0, '#3b0764'); 
        g.addColorStop(0.3 + Math.sin(time*0.2)*0.1, '#be185d'); 
        g.addColorStop(0.6, '#f59e0b'); 
        g.addColorStop(1, '#000'); 
        ctx.fillStyle = g;
        ctx.fillRect(0,0,w,h);

        const sunY = h * 0.55;
        const sunPulse = 60 + Math.sin(time * 2) * 5;
        ctx.fillStyle = '#fbbf24';
        ctx.shadowColor = '#f59e0b'; ctx.shadowBlur = 40;
        ctx.beginPath(); ctx.arc(w/2, sunY, sunPulse, 0, Math.PI*2); ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = 'rgba(255, 100, 100, 0.1)';
        for(let i=0; i<5; i++) {
            const cx = (time * 20 + i * 150) % (w + 200) - 100;
            const cy = h * 0.2 + i * 30;
            ctx.beginPath();
            ctx.ellipse(cx, cy, 80, 30, 0, 0, Math.PI*2);
            ctx.fill();
        }

        ctx.fillStyle = '#171717';
        ctx.beginPath();
        ctx.moveTo(0, h);
        ctx.lineTo(0, h * 0.7);
        ctx.lineTo(w * 0.2, h * 0.5); 
        ctx.lineTo(w * 0.5, h * 0.7); 
        ctx.lineTo(w * 0.8, h * 0.45); 
        ctx.lineTo(w, h * 0.7);
        ctx.lineTo(w, h);
        ctx.fill();

        ctx.strokeStyle = 'rgba(245, 158, 11, 0.6)';
        ctx.lineWidth = 3;
        const reflectionY = h * 0.7;
        
        for(let i=0; i<25; i++) {
            const y = reflectionY + i * 12;
            if (y > h) break;
            
            const widthBase = 200 - i * 5;
            const offset = Math.sin(y * 0.1 - time * 5) * 20; 
            const width = widthBase + Math.sin(time * 3 + i) * 30;
            
            ctx.globalAlpha = 1 - (i/25);
            ctx.beginPath();
            ctx.moveTo(w/2 - width/2 + offset, y);
            ctx.lineTo(w/2 + width/2 + offset, y);
            ctx.stroke();
        }
        ctx.globalAlpha = 1;
    },

    // 09 MOMENTUM: WARP TUNNEL
    'track-momentum': (ctx, w, h, time) => {
        const cx = w/2; const cy = h/2;
        const numRects = 15;
        
        ctx.lineWidth = 2;
        
        for(let i=0; i<numRects; i++) {
            const depth = (time * 0.5 + i / numRects) % 1;
            const size = Math.pow(depth, 3) * Math.max(w, h);
            const opacity = depth; 
            
            if (size < 2) continue; 

            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.strokeRect(cx - size/2, cy - size/2, size, size);
        }
    },

    // 10 KNEE SOCKS: NYC CHIC (Bokeh)
    'track-kneesocks': (ctx, w, h, time) => {
        const count = 20;
        ctx.globalCompositeOperation = 'screen';
        for(let i=0; i<count; i++) {
            const x = (Math.sin(i + time * 0.5) * 0.5 + 0.5) * w;
            const y = (Math.cos(i * 1.5 + time * 0.2) * 0.5 + 0.5) * h;
            const r = 30 + Math.sin(time + i) * 10;
            const color = i % 3 === 0 ? '255, 100, 150' : i % 3 === 1 ? '100, 200, 255' : '255, 200, 100';
            
            if (r > 0 && Number.isFinite(x) && Number.isFinite(y)) {
                const g = ctx.createRadialGradient(x, y, 0, x, y, r);
                g.addColorStop(0, `rgba(${color}, 0.4)`);
                g.addColorStop(1, `rgba(${color}, 0)`);
                ctx.fillStyle = g;
                ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2); ctx.fill();
            }
        }
        ctx.globalCompositeOperation = 'source-over';
    },

    // 11 WORLD IN A JAR: STORM BOTTLE
    'track-world-jar': (ctx, w, h, time) => {
        const cx = w * 0.5; const cy = h/2; 
        const r = 80;
        
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2); ctx.stroke();
        
        ctx.lineWidth = 4;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath(); ctx.arc(cx, cy, r - 5, Math.PI * 1.1, Math.PI * 1.4); ctx.stroke();

        ctx.save();
        ctx.beginPath(); ctx.arc(cx, cy, r - 2, 0, Math.PI*2); ctx.clip();
        
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(cx - r, cy - r, r*2, r*2);

        for(let i=0; i<8; i++) {
            const angle = time * (1 + i * 0.2) + i;
            const dist = Math.sin(time * 0.5 + i) * (r * 0.6);
            const bx = cx + Math.cos(angle) * dist;
            const by = cy + Math.sin(angle) * dist;
            const size = 30 + Math.sin(time + i) * 10;
            
            const g = ctx.createRadialGradient(bx, by, 0, bx, by, size);
            g.addColorStop(0, 'rgba(148, 163, 184, 0.5)'); 
            g.addColorStop(1, 'rgba(148, 163, 184, 0)');
            ctx.fillStyle = g;
            ctx.beginPath(); ctx.arc(bx, by, size, 0, Math.PI*2); ctx.fill();
        }

        if (Math.random() > 0.92) {
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.shadowColor = '#fff'; ctx.shadowBlur = 10;
            ctx.beginPath();
            let lx = cx + (Math.random() - 0.5) * r;
            let ly = cy - r * 0.5;
            ctx.moveTo(lx, ly);
            for(let j=0; j<5; j++) {
                lx += (Math.random() - 0.5) * 20;
                ly += 20;
                ctx.lineTo(lx, ly);
            }
            ctx.stroke();
            ctx.shadowBlur = 0;
            
            ctx.fillStyle = 'rgba(255,255,255,0.2)';
            ctx.fillRect(cx - r, cy - r, r*2, r*2);
        }
        ctx.restore();
    },

    // 12 THE LIQ TICK: VISCOUS
    'track-liq-tick': (ctx, w, h, time) => {
        ctx.fillStyle = 'rgba(217, 249, 157, 0.8)'; 
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(w, 0);
        for(let x = 0; x <= w; x += 10) {
            const drip = Math.sin(x * 0.05 + time) * 50 + Math.sin(x * 0.1 + time * 2) * 30;
            ctx.lineTo(x, 50 + Math.max(0, drip));
        }
        ctx.fill();
        for(let i=0; i<10; i++) {
            const bx = (i * w/10 + time * 20) % w;
            const by = h - ((time * 50 + i * 50) % h);
            ctx.beginPath(); ctx.arc(bx, by, 5 + Math.random()*5, 0, Math.PI*2); ctx.fill();
        }
    },

    // 13 THE MACHINE: GEARS W/ HEARTS
    'track-machine': (ctx, w, h, time) => {
        const drawGear = (x: number, y: number, teeth: number, radius: number, speed: number, color: string) => {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(time * speed);
            ctx.fillStyle = color;
            ctx.beginPath();
            const outer = radius;
            const inner = radius - 10;
            for(let i=0; i<teeth * 2; i++) {
                const angle = (Math.PI * 2 * i) / (teeth * 2);
                const r = (i % 2 === 0) ? outer : inner;
                ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
            }
            ctx.closePath();
            ctx.fill();
            
            ctx.fillStyle = '#000';
            ctx.beginPath();
            const hr = radius * 0.4;
            ctx.moveTo(0, hr/2);
            ctx.bezierCurveTo(hr/2, -hr/2, hr, 0, 0, hr);
            ctx.bezierCurveTo(-hr, 0, -hr/2, -hr/2, 0, hr/2);
            ctx.fill();
            ctx.restore();
        };

        const cx = w/2; const cy = h/2;
        drawGear(cx - 40, cy, 12, 50, 1, 'rgba(251, 191, 36, 0.8)');
        drawGear(cx + 40, cy, 12, 50, -1, 'rgba(200, 200, 200, 0.5)');
    },

    // 14 SINCERE WRITER: GOLDEN QUILL (Alchemy)
    'track-sincere-writer': (ctx, w, h, time) => {
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.9)'; 
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#fbbf24';
        
        ctx.beginPath();
        const points = 50;
        for (let i = 0; i < points; i++) {
            const t = time - (i * 0.05); 
            const x = w/2 + Math.cos(t * 3) * (w/3) + Math.sin(t) * 50;
            const y = h/2 + Math.sin(t * 2) * (h/4) + Math.cos(t * 5) * 30;
            
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
        
        ctx.shadowBlur = 0;
        const tipX = w/2 + Math.cos(time * 3) * (w/3) + Math.sin(time) * 50;
        const tipY = h/2 + Math.sin(time * 2) * (h/4) + Math.cos(time * 5) * 30;
        ctx.fillStyle = '#fff';
        ctx.beginPath(); ctx.arc(tipX, tipY, 4, 0, Math.PI*2); ctx.fill();
    },

    // 15 THE STRANGER: THE CROWD SWARM (VARIED & SUBTLE)
    'track-stranger': (ctx, w, h, time) => {
        const drawPerson = (x: number, y: number, color: string, seed: number) => {
            ctx.fillStyle = color;
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            
            const heightMod = Math.sin(seed * 123.4) * 3;
            const widthMod = Math.cos(seed * 321.5) * 2;
            
            const bob = Math.sin(time * 10 + x * 0.1 + seed) * 2;
            const py = y + bob;

            ctx.beginPath(); ctx.arc(x, py - 10 - heightMod, 4 + widthMod/2, 0, Math.PI*2); ctx.fill();
            
            ctx.beginPath(); ctx.moveTo(x, py - 6 - heightMod); ctx.lineTo(x, py + 10); ctx.stroke();
            
            const legSwing = Math.sin(time * 10 + x * 0.1) * (5 + widthMod);
            ctx.beginPath(); 
            ctx.moveTo(x, py + 10); ctx.lineTo(x - legSwing, py + 20 + heightMod); 
            ctx.moveTo(x, py + 10); ctx.lineTo(x + legSwing, py + 20 + heightMod); 
            ctx.stroke();
        };

        const count = 60;
        const speed = 50;
        
        const safeHeight = Math.max(h, 200); 
        const verticalSpacing = Math.min(40, safeHeight / 10);
        
        for(let i=0; i<count; i++) {
            const row = i % 5;
            const y = safeHeight/2 + (row - 2) * verticalSpacing; 
            const isStranger = i === 0;
            
            let x;
            if (isStranger) {
                x = w/2; 
                drawPerson(x, y, '#4ade80', i); 
            } else {
                x = (i * 50 + time * speed) % (w + 200) - 100;
                const alpha = Math.sin(((x+100)/(w+200))*Math.PI);
                ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
                drawPerson(x, y, '#64748b', i); 
                ctx.globalAlpha = 1;
            }
        }
    },

    // 17 THE GLITCH
    'track-glitch': (ctx, w, h, time) => {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.font = '10px monospace';
        for(let i=0; i<30; i++) {
            const x = Math.random() * w; const y = Math.random() * h;
            if (Math.random() > 0.5) ctx.fillText(Math.random() > 0.5 ? '1' : '0', x, y);
        }
    },

    'default': (ctx, w, h, time) => {
        ctx.save();
        ctx.translate(w/2, h/2);
        const slices = 12;
        const angleStep = (Math.PI * 2) / slices;
        for (let i = 0; i < slices; i++) {
            ctx.save();
            ctx.rotate(i * angleStep + time * 0.05);
            if (i % 2 === 1) ctx.scale(1, -1); 
            ctx.beginPath();
            ctx.moveTo(0, 0);
            const r1 = 100 + Math.sin(time * 2) * 20;
            const r2 = 200 + Math.cos(time * 1.5) * 30;
            ctx.lineTo(r1, 50);
            ctx.bezierCurveTo(r1 + 50, 100, r2 - 50, 150, r2, 0);
            ctx.strokeStyle = `hsla(${(time * 20 + i * 30) % 360}, 60%, 50%, 0.15)`;
            ctx.stroke();
            ctx.restore();
        }
        ctx.restore();
    }
};

export const VisualizerCanvas: React.FC<{ active: boolean; trackId: string; className?: string }> = ({ active, trackId, className }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let frameId: number;
        let time = 0;

        const render = () => {
            if (!active) {
                // Stop loop if inactive to save resources
                return; 
            }

            time += 0.01;
            
            if (canvas.width !== canvas.parentElement?.clientWidth || canvas.height !== canvas.parentElement?.clientHeight) {
                canvas.width = canvas.parentElement?.clientWidth || 800;
                canvas.height = canvas.parentElement?.clientHeight || 600;
            }

            const w = canvas.width;
            const h = canvas.height;

            ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'; 
            ctx.fillRect(0, 0, w, h);

            ctx.globalCompositeOperation = 'screen';
            const visualizer = VISUALIZERS[trackId as keyof typeof VISUALIZERS] || VISUALIZERS['default'];
            visualizer(ctx, w, h, time);
            ctx.globalCompositeOperation = 'source-over';
            
            frameId = requestAnimationFrame(render);
        };

        // If inactive, draw one blank frame and don't loop
        if (!active) {
            if (canvas.width > 0) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
        } else {
            render();
        }

        return () => cancelAnimationFrame(frameId);
    }, [active, trackId]);

    return <canvas ref={canvasRef} className={`block w-full h-full ${className || ''}`} />;
};
