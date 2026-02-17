
// --- VISUALIZERS FOR LANDING PAGE ROWS ---
// Adapted from VisualizerCanvas.tsx to fit horizontal track rows

export const ROW_VISUALIZERS: Record<string, (ctx: CanvasRenderingContext2D, w: number, h: number, time: number) => void> = {
    // 01 VICTOR: DRAGONFLIES
    '01': (ctx, w, h, time) => {
        const drawDragonfly = (x: number, y: number, scale: number, seed: number) => {
            ctx.save();
            ctx.translate(x, y);
            const vibX = Math.sin(time * (40 + seed % 20) + seed) * 1.5;
            const vibY = Math.cos(time * (50 + seed % 20) + seed) * 1.5;
            ctx.translate(vibX, vibY);
            const angle = Math.sin(time * 0.5 + seed) * 0.3;
            ctx.rotate(angle + Math.PI / 4); 
            const color = '#a3e635'; 

            // Body
            ctx.fillStyle = color;
            ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 40 * scale); ctx.lineTo(-2 * scale, 40 * scale); ctx.lineTo(-3 * scale, 0); ctx.fill();
            
            // Thorax
            ctx.fillStyle = color;
            ctx.beginPath(); ctx.ellipse(0, -5 * scale, 4 * scale, 6 * scale, 0, 0, Math.PI*2); ctx.fill();

            // Head
            ctx.fillStyle = '#ecfccb';
            ctx.beginPath(); ctx.arc(0, -12 * scale, 5 * scale, 0, Math.PI*2); ctx.fill();

            // Wings
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.lineWidth = 0.5;
            const wingSpeed = time * (70 + (seed % 30)) + seed * 10;
            const flutter = Math.sin(wingSpeed) * 0.5; 
            
            ctx.beginPath(); ctx.ellipse(15 * scale, -5 * scale, 25 * scale, Math.abs(4 * scale * flutter), 0.2, 0, Math.PI*2); ctx.fill(); ctx.stroke();
            ctx.beginPath(); ctx.ellipse(-15 * scale, -5 * scale, 25 * scale, Math.abs(4 * scale * flutter), -0.2, 0, Math.PI*2); ctx.fill(); ctx.stroke();
            ctx.beginPath(); ctx.ellipse(15 * scale, 2 * scale, 22 * scale, Math.abs(3 * scale * -flutter), 0.4, 0, Math.PI*2); ctx.fill(); ctx.stroke();
            ctx.beginPath(); ctx.ellipse(-15 * scale, 2 * scale, 22 * scale, Math.abs(3 * scale * -flutter), -0.4, 0, Math.PI*2); ctx.fill(); ctx.stroke();
            ctx.restore();
        };

        const count = 5;
        for(let i=0; i<count; i++) {
            const speedVar = 0.3 + (i % 3) * 0.15;
            const t = time * speedVar + i * 234.5; 
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

    // 02 BROADRIPPLE: INFERNO
    '02': (ctx, w, h, time) => {
        const count = 100;
        for(let i=0; i<count; i++) {
            const seed = i * 13.5;
            const y = (h - ((time * 80 + seed * 100) % (h + 50))); 
            const x = (w * 0.5) + (Math.sin(time * 2 + i) * w * (0.3 + (y/h)*0.2)); // Wider spread
            const size = (Math.sin(time * 10 + i) + 2) * 1.5;
            const alpha = Math.max(0, (y/h) - 0.2);
            ctx.fillStyle = `rgba(255, ${Math.floor(Math.random()*150)}, 50, ${alpha})`;
            ctx.beginPath(); ctx.arc(x, y, size, 0, Math.PI*2); ctx.fill();
        }
    },

    // 03 COG-SCI: NEURAL
    '03': (ctx, w, h, time) => {
        const nodes = [];
        const count = 30;
        for(let i=0; i<count; i++) {
            nodes.push({
                x: w/2 + Math.cos(i * 13 + time * 0.1) * (w * 0.35),
                y: h/2 + Math.sin(i * 19 + time * 0.15) * (h * 0.45)
            });
        }
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.2)'; 
        ctx.lineWidth = 1;
        ctx.beginPath();
        for(let i=0; i<count; i++) {
            for(let j=i+1; j<count; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = dx*dx + dy*dy;
                if (dist < 10000) { 
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                }
            }
        }
        ctx.stroke();
    },

    // 04 RUM DRUM: RIPPLES
    '04': (ctx, w, h, time) => {
        const cx = w/2;
        const cy = h/2;
        const count = 8;
        const maxR = Math.min(w,h) * 0.8;
        for(let i=0; i<count; i++) {
            const progress = (time * 0.5 + i/count) % 1;
            const r = progress * maxR;
            const opacity = 1 - progress;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
            ctx.lineWidth = 2;
            ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2); ctx.stroke();
        }
    },

    // 05 MONUMENTAL: BLOCKS
    '05': (ctx, w, h, time) => {
        const cols = 30;
        const colW = w / cols;
        for(let i=0; i<cols; i++) {
            const speed = 1 + (i % 5);
            const y = (time * 50 * speed) % (h + 200) - 200;
            const hBlock = 50 + (i * 30) % 100;
            ctx.fillStyle = `rgba(255, 255, 255, 0.05)`;
            ctx.fillRect(i * colW, 0, colW - 2, h); 
            ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.fillRect(i * colW, y, colW - 2, hBlock); 
        }
    },

    // 06 LENDER: ELECTRON FLOW
    '06': (ctx, w, h, time) => {
        const cx = w/2; const cy = h/2;
        const dist = 100;
        
        // Atom A
        const scaleA = 1 + Math.sin(time * 3) * 0.05;
        ctx.fillStyle = '#4ade80';
        ctx.beginPath(); ctx.arc(cx - dist/2, cy, 10 * scaleA, 0, Math.PI*2); ctx.fill();
        ctx.strokeStyle = 'rgba(74, 222, 128, 0.2)';
        ctx.beginPath(); ctx.arc(cx - dist/2, cy, 40, 0, Math.PI*2); ctx.stroke();

        // Atom B
        const scaleB = 1 + Math.cos(time * 3) * 0.05;
        ctx.fillStyle = '#60a5fa';
        ctx.beginPath(); ctx.arc(cx + dist/2, cy, 10 * scaleB, 0, Math.PI*2); ctx.fill();
        ctx.strokeStyle = 'rgba(96, 165, 250, 0.2)';
        ctx.beginPath(); ctx.arc(cx + dist/2, cy, 40, 0, Math.PI*2); ctx.stroke();

        // Electrons
        const particleCount = 12;
        for (let i = 0; i < particleCount; i++) {
            const t = (time * 0.3 + (i / particleCount)) % 1; 
            let x, y, alpha;
            const startX = cx - dist/2;
            const endX = cx + dist/2;
            
            if (t < 0.3) {
                const angle = t * 20; 
                x = startX + Math.cos(angle) * 40;
                y = cy + Math.sin(angle) * 40;
                alpha = t / 0.3; 
            } else if (t < 0.7) {
                const prog = (t - 0.3) / 0.4; 
                x = startX + (endX - startX) * prog;
                y = cy + Math.sin(prog * Math.PI * 2) * 15; 
                alpha = 1;
            } else {
                const prog = (t - 0.7) / 0.3;
                const angle = prog * 20;
                x = endX + Math.cos(angle + Math.PI) * 40;
                y = cy + Math.sin(angle + Math.PI) * 40;
                alpha = 1 - prog; 
            }
            ctx.fillStyle = `rgba(251, 191, 36, ${Math.max(0, Math.min(1, alpha))})`;
            ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI*2); ctx.fill();
        }
    },

    // 07 GLOOM: ABYSSAL RAIN
    '07': (ctx, w, h, time) => {
        const count = 100;
        ctx.fillStyle = 'rgba(167, 139, 250, 0.4)'; 
        for(let i=0; i<count; i++) {
            const x = (i * 13 + time * 50) % w; 
            const speed = (i % 5) + 15;
            const y = (time * 60 * speed + i * 100) % (h + 100);
            const len = speed * 3;
            ctx.fillRect(x, y - len, 1.5, len);
        }
    },

    // 08 EARNEST READER: FALLING WORDS
    '08': (ctx, w, h, time) => {
        const words = ["SEED", "READ", "FLOW", "GROW", "BIND", "MIND", "TIME", "LINE"];
        ctx.fillStyle = 'rgba(196, 181, 253, 0.8)';
        ctx.font = '10px monospace';
        const cols = Math.floor(w / 40);
        for(let i=0; i<cols; i++) {
            const speed = (i % 3) + 1; 
            const y = (time * 30 * speed + i * 50) % (h + 50);
            const wordIndex = (i + Math.floor(time)) % words.length;
            ctx.globalAlpha = Math.min(1, y / 50); 
            ctx.fillText(words[wordIndex], i * 40 + 10, y - 10);
            ctx.globalAlpha = 1;
        }
    },

    // 09 THE BETTER: SUNSET
    '09': (ctx, w, h, time) => {
        const g = ctx.createLinearGradient(0, 0, 0, h);
        g.addColorStop(0, '#3b0764'); g.addColorStop(0.5, '#be185d'); g.addColorStop(1, '#f59e0b'); 
        ctx.fillStyle = g; ctx.fillRect(0,0,w,h);

        const sunY = h * 0.6;
        const sunPulse = 40 + Math.sin(time * 2) * 5;
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath(); ctx.arc(w/2, sunY, sunPulse, 0, Math.PI*2); ctx.fill();

        ctx.fillStyle = 'rgba(255, 100, 100, 0.1)';
        for(let i=0; i<5; i++) {
            const cx = (time * 20 + i * 150) % (w + 200) - 100;
            const cy = h * 0.2 + i * 20;
            ctx.beginPath(); ctx.ellipse(cx, cy, 60, 20, 0, 0, Math.PI*2); ctx.fill();
        }

        ctx.strokeStyle = 'rgba(245, 158, 11, 0.6)';
        ctx.lineWidth = 2;
        const reflectionY = h * 0.65;
        for(let i=0; i<10; i++) {
            const y = reflectionY + i * 8;
            if (y > h) break;
            const widthBase = 100 - i * 5;
            const offset = Math.sin(y * 0.1 - time * 5) * 10; 
            const width = widthBase + Math.sin(time * 3 + i) * 20;
            ctx.globalAlpha = 1 - (i/10);
            ctx.beginPath(); ctx.moveTo(w/2 - width/2 + offset, y); ctx.lineTo(w/2 + width/2 + offset, y); ctx.stroke();
        }
        ctx.globalAlpha = 1;
    },

    // 10 MOMENTUM: WARP TUNNEL
    '10': (ctx, w, h, time) => {
        const cx = w/2; const cy = h/2;
        const numRects = 15;
        ctx.lineWidth = 2;
        for(let i=0; i<numRects; i++) {
            const depth = (time * 0.5 + i / numRects) % 1;
            const size = Math.pow(depth, 3) * w;
            const opacity = depth; 
            if (size < 2) continue;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.strokeRect(cx - size/2, cy - size/2, size, size);
        }
    },

    // 11 KNEE SOCKS: BOKEH
    '11': (ctx, w, h, time) => {
        const count = 20;
        ctx.globalCompositeOperation = 'screen';
        for(let i=0; i<count; i++) {
            const x = (Math.sin(i + time * 0.5) * 0.5 + 0.5) * w;
            const y = (Math.cos(i * 1.5 + time * 0.2) * 0.5 + 0.5) * h;
            const r = 20 + Math.sin(time + i) * 10;
            const color = i % 3 === 0 ? '255, 100, 150' : i % 3 === 1 ? '100, 200, 255' : '255, 200, 100';
            const g = ctx.createRadialGradient(x, y, 0, x, y, r);
            g.addColorStop(0, `rgba(${color}, 0.4)`); g.addColorStop(1, `rgba(${color}, 0)`);
            ctx.fillStyle = g;
            ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2); ctx.fill();
        }
        ctx.globalCompositeOperation = 'source-over';
    },

    // 12 WORLD IN A JAR: STORM BOTTLE
    '12': (ctx, w, h, time) => {
        const cx = w * 0.5; const cy = h/2; const r = 50;
        ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2); ctx.stroke();
        
        ctx.save();
        ctx.beginPath(); ctx.arc(cx, cy, r - 2, 0, Math.PI*2); ctx.clip();
        ctx.fillStyle = '#1e293b'; ctx.fillRect(cx - r, cy - r, r*2, r*2);

        for(let i=0; i<5; i++) {
            const angle = time * (1 + i * 0.2) + i;
            const dist = Math.sin(time * 0.5 + i) * (r * 0.6);
            const bx = cx + Math.cos(angle) * dist;
            const by = cy + Math.sin(angle) * dist;
            const size = 20 + Math.sin(time + i) * 10;
            const g = ctx.createRadialGradient(bx, by, 0, bx, by, size);
            g.addColorStop(0, 'rgba(148, 163, 184, 0.5)'); g.addColorStop(1, 'rgba(148, 163, 184, 0)');
            ctx.fillStyle = g; ctx.beginPath(); ctx.arc(bx, by, size, 0, Math.PI*2); ctx.fill();
        }
        ctx.restore();
    },

    // 13 THE LIQ TICK: VISCOUS
    '13': (ctx, w, h, time) => {
        ctx.fillStyle = 'rgba(217, 249, 157, 0.8)'; 
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(w, 0);
        for(let x = 0; x <= w; x += 10) {
            const drip = Math.sin(x * 0.05 + time) * 30 + Math.sin(x * 0.1 + time * 2) * 20;
            ctx.lineTo(x, 40 + Math.max(0, drip));
        }
        ctx.fill();
        for(let i=0; i<10; i++) {
            const bx = (i * w/10 + time * 20) % w;
            const by = h - ((time * 50 + i * 50) % h);
            ctx.beginPath(); ctx.arc(bx, by, 3 + Math.random()*4, 0, Math.PI*2); ctx.fill();
        }
    },

    // 14 THE MACHINE: GEARS
    '14': (ctx, w, h, time) => {
        const drawGear = (x: number, y: number, teeth: number, radius: number, speed: number, color: string) => {
            ctx.save(); ctx.translate(x, y); ctx.rotate(time * speed);
            ctx.fillStyle = color; ctx.beginPath();
            const outer = radius; const inner = radius - 8;
            for(let i=0; i<teeth * 2; i++) {
                const angle = (Math.PI * 2 * i) / (teeth * 2);
                const r = (i % 2 === 0) ? outer : inner;
                ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
            }
            ctx.closePath(); ctx.fill();
            ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(0,0, radius*0.3, 0, Math.PI*2); ctx.fill();
            ctx.restore();
        };
        const cx = w/2; const cy = h/2;
        drawGear(cx - 30, cy, 12, 40, 1, 'rgba(251, 191, 36, 0.8)');
        drawGear(cx + 30, cy, 12, 40, -1, 'rgba(200, 200, 200, 0.5)');
    },

    // 15 SINCERE WRITER: QUILL
    '15': (ctx, w, h, time) => {
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.9)'; 
        ctx.lineWidth = 2; ctx.lineCap = 'round';
        ctx.beginPath();
        const points = 50;
        for (let i = 0; i < points; i++) {
            const t = time - (i * 0.05);
            const x = w/2 + Math.cos(t * 3) * (w/4) + Math.sin(t) * 30;
            const y = h/2 + Math.sin(t * 2) * (h/4) + Math.cos(t * 5) * 10;
            if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
    },

    // 16 THE STRANGER: CROWD
    '16': (ctx, w, h, time) => {
        const drawPerson = (x: number, y: number, color: string) => {
            ctx.fillStyle = color; ctx.strokeStyle = color; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.arc(x, y - 10, 4, 0, Math.PI*2); ctx.fill();
            ctx.beginPath(); ctx.moveTo(x, y - 6); ctx.lineTo(x, y + 10); ctx.stroke();
            const legSwing = Math.sin(time * 10 + x * 0.1) * 5;
            ctx.beginPath(); ctx.moveTo(x, y + 10); ctx.lineTo(x - legSwing, y + 20); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(x, y + 10); ctx.lineTo(x + legSwing, y + 20); ctx.stroke();
        };
        const count = 30;
        for(let i=0; i<count; i++) {
            const isStranger = i === 0;
            const x = isStranger ? w/2 : (i * 50 + time * 50) % (w + 200) - 100;
            const y = h/2 + (i%3)*10;
            const color = isStranger ? '#4ade80' : 'rgba(100, 116, 139, 0.5)';
            drawPerson(x, y, color);
        }
    },

    // 17 GLITCH
    '17': (ctx, w, h, time) => {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.font = '10px monospace';
        for(let i=0; i<30; i++) {
            const x = Math.random() * w; const y = Math.random() * h;
            if (Math.random() > 0.5) ctx.fillText(Math.random() > 0.5 ? '1' : '0', x, y);
        }
    },

    'default': (ctx, w, h, time) => { ctx.fillStyle = 'rgba(255,255,255,0.1)'; ctx.fillRect(0,0,w,h); }
};
