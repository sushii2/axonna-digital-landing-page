"use client";

import { useEffect, useRef, useMemo } from "react";

interface DotWaveBackgroundProps {
  dotColor?: string;
  dotSize?: number;
  spacing?: number;
  waveAmplitude?: number;
  waveSpeed?: number;
  className?: string;
}

export function DotWaveBackground({
  dotColor = "rgba(255, 255, 255, 0.15)",
  dotSize = 2,
  spacing = 30,
  waveAmplitude = 25,
  waveSpeed = 0.015,
  className = "",
}: DotWaveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const dotsRef = useRef<{ x: number; y: number; baseY: number }[]>([]);
  const timeRef = useRef(0);

  const config = useMemo(
    () => ({
      dotSize,
      dotColor,
      spacingX: spacing,
      spacingY: spacing,
      waveAmplitude,
      waveFrequency: 0.02,
      waveSpeed,
    }),
    [dotColor, dotSize, spacing, waveAmplitude, waveSpeed]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      initDots(rect.width, rect.height);
    };

    const initDots = (width: number, height: number) => {
      dotsRef.current = [];
      const cols = Math.ceil(width / config.spacingX) + 2;
      const rows = Math.ceil(height / config.spacingY) + 2;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * config.spacingX;
          const y = row * config.spacingY;
          dotsRef.current.push({ x, y, baseY: y });
        }
      }
    };

    const animate = () => {
      if (!canvas || !ctx) return;

      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      timeRef.current += config.waveSpeed;

      dotsRef.current.forEach((dot) => {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const dx = dot.x - centerX;
        const dy = dot.baseY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const wave =
          Math.sin(distance * config.waveFrequency - timeRef.current) *
          config.waveAmplitude;

        const newY = dot.baseY + wave;

        ctx.beginPath();
        ctx.arc(dot.x, newY, config.dotSize, 0, Math.PI * 2);
        ctx.fillStyle = config.dotColor;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [config]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
    />
  );
}
