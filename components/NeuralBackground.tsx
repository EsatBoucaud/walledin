
import React, { useEffect, useRef } from 'react';

type QualityLevel = 'low' | 'medium' | 'high';

interface NeuralBackgroundProps {
  inverted?: boolean;
  colorHex?: string;
  paused?: boolean;
  quality?: QualityLevel;
}

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  hue: number;
  noiseScale: number;
  speedMult: number;
  lineWidth: number;
  opacityBase: number;
};

const QUALITY_SETTINGS: Record<
  QualityLevel,
  { layers: number; particlesPerLayer: number; maxFps: number; trailDark: number; trailLight: number }
> = {
  low: { layers: 4, particlesPerLayer: 54, maxFps: 24, trailDark: 0.2, trailLight: 0.26 },
  medium: { layers: 6, particlesPerLayer: 82, maxFps: 34, trailDark: 0.14, trailLight: 0.2 },
  high: { layers: 9, particlesPerLayer: 108, maxFps: 42, trailDark: 0.1, trailLight: 0.16 }
};

const clamp = (value: number, min: number, max: number): number => Math.max(min, Math.min(max, value));

const hexToHue = (hex: string): number => {
  const clean = hex.replace(/^#/, '');
  const bigint = parseInt(clean, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;

  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;

  if (max !== min) {
    const d = max - min;
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        break;
    }
    h /= 6;
  }

  return h * 360;
};

export const NeuralBackground: React.FC<NeuralBackgroundProps> = ({
  inverted = false,
  colorHex,
  paused = false,
  quality = 'medium'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const settings = QUALITY_SETTINGS[quality];
    const fixedHue = colorHex ? hexToHue(colorHex) : null;

    let animationFrameId = 0;
    let particles: Particle[] = [];
    let frame = 0;
    let renderWidth = 1;
    let renderHeight = 1;
    let lastFrameAt = 0;
    const frameInterval = 1000 / settings.maxFps;

    const initParticles = () => {
      particles = [];
      frame = 0;

      const areaFactor = clamp(Math.sqrt((renderWidth * renderHeight) / (1920 * 1080)), 0.55, 1.35);
      const particleCount = Math.max(12, Math.round(settings.particlesPerLayer * areaFactor));

      for (let layer = 0; layer < settings.layers; layer++) {
        for (let i = 0; i < particleCount; i++) {
          const hueBase =
            fixedHue !== null ? fixedHue + (Math.random() * 24 - 12) : (90 + layer * 26 + Math.random() * 14) % 360;
          const lane = layer % 4;

          particles.push({
            x: Math.random() * renderWidth,
            y: Math.random() * renderHeight,
            vx: 0,
            vy: 0,
            hue: hueBase,
            noiseScale: 0.002 + lane * 0.0015 + Math.random() * 0.0012,
            speedMult: 0.5 + lane * 0.24 + Math.random() * 0.3,
            lineWidth: lane === 0 ? 1.6 : 1,
            opacityBase: lane === 0 ? 0.52 : 0.3
          });
        }
      }
    };

    const resize = () => {
      if (!canvas.parentElement) return;

      const cssWidth = Math.max(1, Math.floor(canvas.parentElement.clientWidth));
      const cssHeight = Math.max(1, Math.floor(canvas.parentElement.clientHeight));
      const pixelRatio = clamp(window.devicePixelRatio || 1, 1, 1.25);

      canvas.width = Math.floor(cssWidth * pixelRatio);
      canvas.height = Math.floor(cssHeight * pixelRatio);
      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;

      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      renderWidth = cssWidth;
      renderHeight = cssHeight;
      initParticles();
    };

    const render = (now: number) => {
      animationFrameId = requestAnimationFrame(render);

      if (paused || document.hidden) return;
      if (now - lastFrameAt < frameInterval) return;
      lastFrameAt = now;
      frame += 1;

      const trailAlpha = inverted ? settings.trailLight : settings.trailDark;
      ctx.fillStyle = inverted ? `rgba(224, 224, 224, ${trailAlpha})` : `rgba(0, 0, 0, ${trailAlpha})`;
      ctx.fillRect(0, 0, renderWidth, renderHeight);

      const time = frame * 0.016;
      const lightness = inverted ? '35%' : '60%';

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const flow =
          Math.sin((p.x + time * 42) * p.noiseScale) +
          Math.cos((p.y - time * 35) * (p.noiseScale * 1.12));
        const angle = flow * Math.PI;

        p.vx += Math.cos(angle) * 0.045 * p.speedMult;
        p.vy += Math.sin(angle) * 0.045 * p.speedMult;
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = renderWidth;
        if (p.x > renderWidth) p.x = 0;
        if (p.y < 0) p.y = renderHeight;
        if (p.y > renderHeight) p.y = 0;

        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.vx * 2, p.y - p.vy * 2);
        ctx.strokeStyle = `hsla(${p.hue}, 70%, ${lightness}, ${p.opacityBase})`;
        ctx.lineWidth = p.lineWidth;
        ctx.stroke();
      }
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        lastFrameAt = 0;
      }
    };

    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    resize();
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, [inverted, colorHex, paused, quality]);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
};
