"use client";

import * as React from "react";
import { useEffect, useRef } from "react";

interface Particle3D {
  x: number;
  y: number;
  z: number;
  radius: number;
  angle: number;
  distance: number;
  speed: number;
  color: string;
  baseAlpha: number;
}

export function CinematicHeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates for 3D parallax & warp
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initVortex();
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize);

    const PARTICLE_COUNT = width < 768 ? 160 : 340;
    let particles: Particle3D[] = [];
    const colors = [
      "#FF9900", // AWS Orange
      "#FFA41C", // AWS Amber
      "#43B7FF", // Electric Blue
      "#38BDF8", // Sky Blue
      "#F5F7FA", // White Starlight
    ];

    const initVortex = () => {
      particles = [];
      const maxDist = Math.max(width, height) * 0.75;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const distance = Math.pow(Math.random(), 0.7) * maxDist + 40;
        const angle = Math.random() * Math.PI * 2;
        particles.push({
          x: 0,
          y: 0,
          z: Math.random() * 800 - 400, // 3D depth
          radius: Math.random() * 1.8 + 0.6,
          angle,
          distance,
          speed: (0.0015 + Math.random() * 0.003) * (Math.random() > 0.5 ? 1 : -0.7),
          color: colors[Math.floor(Math.random() * colors.length)],
          baseAlpha: Math.random() * 0.7 + 0.3,
        });
      }
    };

    initVortex();

    // Shockwave pulse timer
    let pulseRadius = 0;
    let pulseAlpha = 0;
    let ringAngle1 = 0;
    let ringAngle2 = 0;

    const render = (time: number) => {
      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.045;
      mouseY += (targetMouseY - mouseY) * 0.045;

      const tiltX = (mouseX - width / 2) / (width / 2); // -1 to 1
      const tiltY = (mouseY - height / 2) / (height / 2); // -1 to 1

      const centerX = width / 2 + tiltX * 25;
      const centerY = height * 0.42 + tiltY * 20;

      ctx.clearRect(0, 0, width, height);

      // 1. Deep Atmospheric Cosmic Fog & Vignette
      const bgGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        20,
        centerX,
        centerY,
        width * 0.6
      );
      bgGrad.addColorStop(0, "rgba(255, 153, 0, 0.09)");
      bgGrad.addColorStop(0.3, "rgba(67, 183, 255, 0.06)");
      bgGrad.addColorStop(0.7, "rgba(16, 26, 44, 0.4)");
      bgGrad.addColorStop(1, "rgba(8, 10, 15, 0)");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Concentric Sci-Fi Orbital Rings (Techfest Festival Aesthetic)
      ringAngle1 += 0.002;
      ringAngle2 -= 0.0015;

      // Outer Ring
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(1, 0.42); // Elliptical projection for 3D perspective
      ctx.rotate(ringAngle1);

      ctx.beginPath();
      ctx.arc(0, 0, width < 768 ? 160 : 320, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(67, 183, 255, 0.12)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 14]);
      ctx.stroke();

      // Outer Ring Tick Marks
      const ticks = 16;
      for (let t = 0; t < ticks; t++) {
        const a = (t / ticks) * Math.PI * 2;
        const r1 = width < 768 ? 154 : 312;
        const r2 = width < 768 ? 166 : 328;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * r1, Math.sin(a) * r1);
        ctx.lineTo(Math.cos(a) * r2, Math.sin(a) * r2);
        ctx.strokeStyle = t % 4 === 0 ? "rgba(255, 153, 0, 0.4)" : "rgba(67, 183, 255, 0.2)";
        ctx.lineWidth = 1.2;
        ctx.setLineDash([]);
        ctx.stroke();
      }
      ctx.restore();

      // Inner Ring
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(1, 0.42);
      ctx.rotate(ringAngle2);

      ctx.beginPath();
      ctx.arc(0, 0, width < 768 ? 95 : 190, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 153, 0, 0.18)";
      ctx.lineWidth = 1.2;
      ctx.setLineDash([8, 18]);
      ctx.stroke();
      ctx.restore();

      // 3. Periodic Energy Shockwave
      pulseRadius += 2.2;
      pulseAlpha = Math.max(0, 0.35 - (pulseRadius / (width * 0.7)) * 0.35);
      if (pulseRadius > width * 0.7) {
        pulseRadius = 30;
        pulseAlpha = 0.35;
      }
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(1, 0.42);
      ctx.beginPath();
      ctx.arc(0, 0, pulseRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 153, 0, ${pulseAlpha})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // 4. Update and Render 3D Vortex Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.angle += p.speed;

        // Subtle breathing expansion/contraction
        const dist = p.distance + Math.sin(time * 0.001 + i) * 8;

        // 3D perspective projection with tilt
        const rawX = Math.cos(p.angle) * dist;
        const rawY = Math.sin(p.angle) * dist * 0.45; // Flatten into orbit plane
        const zScale = (p.z + 600) / 600; // Perspective scaling factor

        const posX = centerX + rawX + tiltX * (p.z * 0.08);
        const posY = centerY + rawY + tiltY * (p.z * 0.08);

        // Interactive mouse repulsion/pull
        const dx = mouseX - posX;
        const dy = mouseY - posY;
        const mouseDist = Math.sqrt(dx * dx + dy * dy);
        let finalX = posX;
        let finalY = posY;

        if (mouseDist < 180) {
          const force = (1 - mouseDist / 180) * 22;
          finalX += (dx / mouseDist) * force;
          finalY += (dy / mouseDist) * force;
        }

        const size = Math.max(0.4, p.radius * Math.max(0.4, zScale));
        const alpha = Math.min(1, Math.max(0.05, p.baseAlpha * zScale));

        ctx.beginPath();
        ctx.arc(finalX, finalY, size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.color === "#FF9900" ? 8 : 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 1;

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none w-full h-full z-0 opacity-85"
      style={{ display: "block" }}
      aria-hidden="true"
    />
  );
}
