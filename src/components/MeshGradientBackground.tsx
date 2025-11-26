'use client';

import { useEffect, useRef } from 'react';

export const MeshGradientBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let t = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        const colors = [
            [10, 25, 47],   // Dark Blue
            [20, 10, 40],   // Dark Purple
            [5, 5, 10],     // Almost Black
        ];

        const draw = () => {
            t += 0.002;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Create a dynamic gradient
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);

            // Animate colors slightly
            const r1 = Math.sin(t) * 20 + 20;
            const g1 = Math.cos(t * 1.2) * 20 + 20;
            const b1 = Math.sin(t * 0.8) * 50 + 100;

            gradient.addColorStop(0, `rgb(${r1}, ${g1}, ${b1})`); // Dynamic dark blue
            gradient.addColorStop(0.5, '#0f172a'); // Slate 900
            gradient.addColorStop(1, '#020617'); // Slate 950

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw floating orbs
            for (let i = 0; i < 5; i++) {
                const x = Math.sin(t * 0.5 + i) * canvas.width * 0.3 + canvas.width / 2;
                const y = Math.cos(t * 0.3 + i * 1.5) * canvas.height * 0.3 + canvas.height / 2;
                const radius = Math.sin(t + i) * 100 + 300;

                const orbGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
                orbGradient.addColorStop(0, `rgba(100, 100, 255, 0.1)`);
                orbGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

                ctx.fillStyle = orbGradient;
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fill();
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-10 h-full w-full bg-slate-950"
        />
    );
};
