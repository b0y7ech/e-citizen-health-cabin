'use client';

import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
    type: 'circle' | 'cross' | 'pulse';
}

export default function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationRef = useRef<number>();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createParticles = () => {
            const particles: Particle[] = [];
            const particleCount = 30;

            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 4 + 2,
                    speedX: (Math.random() - 0.5) * 0.3,
                    speedY: (Math.random() - 0.5) * 0.3,
                    opacity: Math.random() * 0.3 + 0.1,
                    type: ['circle', 'cross', 'pulse'][Math.floor(Math.random() * 3)] as Particle['type'],
                });
            }

            particlesRef.current = particles;
        };

        const drawCross = (x: number, y: number, size: number, opacity: number) => {
            ctx.strokeStyle = `rgba(45, 212, 191, ${opacity})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            // Vertical line
            ctx.moveTo(x, y - size);
            ctx.lineTo(x, y + size);
            // Horizontal line
            ctx.moveTo(x - size, y);
            ctx.lineTo(x + size, y);
            ctx.stroke();
        };

        const drawPulse = (x: number, y: number, size: number, opacity: number) => {
            ctx.strokeStyle = `rgba(201, 169, 89, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            // Simple heartbeat line
            ctx.moveTo(x - size * 2, y);
            ctx.lineTo(x - size, y);
            ctx.lineTo(x - size * 0.5, y - size);
            ctx.lineTo(x, y + size * 0.5);
            ctx.lineTo(x + size * 0.5, y - size * 0.5);
            ctx.lineTo(x + size, y);
            ctx.lineTo(x + size * 2, y);
            ctx.stroke();
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach((particle) => {
                // Update position
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                // Wrap around edges
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;

                // Draw based on type
                if (particle.type === 'circle') {
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(45, 212, 191, ${particle.opacity})`;
                    ctx.fill();
                } else if (particle.type === 'cross') {
                    drawCross(particle.x, particle.y, particle.size, particle.opacity);
                } else {
                    drawPulse(particle.x, particle.y, particle.size * 2, particle.opacity);
                }
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        resizeCanvas();
        createParticles();
        animate();

        window.addEventListener('resize', resizeCanvas);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-0"
            style={{ opacity: 0.6 }}
        />
    );
}
