import React, { useEffect, useRef } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

const Background = () => {
  const canvasRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 30, stiffness: 100 });
  const smoothY = useSpring(mouseY, { damping: 30, stiffness: 100 });

  // Track absolute mouse coordinates for interactive physics
  const mousePosRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(x);
      mouseY.set(y);

      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mousePosRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    // Particle model
    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.8;
        
        // Base drift speed
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        
        // Select color corresponding to portfolio design
        const rand = Math.random();
        if (rand < 0.25) {
          this.color = '#00f0ff'; // Neon Cyan
        } else if (rand < 0.5) {
          this.color = '#9d00ff'; // Purple Accent
        } else {
          this.color = '#ffffff'; // Starlight White
        }
        
        this.opacity = Math.random() * 0.5 + 0.3;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce on screen edges
        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;

        // Gravity pull/interaction when mouse is near
        const dx = mousePosRef.current.x - this.x;
        const dy = mousePosRef.current.y - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          this.x += (dx / dist) * force * 0.6;
          this.y += (dy / dist) * force * 0.6;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
      }
    }

    let particles = [];
    const initParticles = () => {
      particles = [];
      const densityMultiplier = window.innerWidth < 768 ? 20000 : 12000;
      const count = Math.min(Math.floor((width * height) / densityMultiplier), 120);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    initParticles();

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Compute smooth parallax translate
      const px = smoothX.get() * -20;
      const py = smoothY.get() * -20;

      ctx.save();
      ctx.translate(px, py);

      // 1. Update & Draw Particles
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      // 2. Draw Connection Lines between near particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < 120) {
            const alpha = ((120 - dist) / 120) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            
            const grad = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );
            grad.addColorStop(0, particles[i].color);
            grad.addColorStop(1, particles[j].color);

            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.5;
            ctx.globalAlpha = alpha;
            ctx.stroke();
          }
        }
      }

      // 3. Draw Connection Lines from Mouse to Particles
      if (mousePosRef.current.x !== -1000) {
        particles.forEach(p => {
          const dx = mousePosRef.current.x - (p.x + px);
          const dy = mousePosRef.current.y - (p.y + py);
          const dist = Math.hypot(dx, dy);
          if (dist < 150) {
            const alpha = ((150 - dist) / 150) * 0.2;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mousePosRef.current.x - px, mousePosRef.current.y - py);
            ctx.strokeStyle = '#00f0ff';
            ctx.lineWidth = 0.6;
            ctx.globalAlpha = alpha;
            ctx.stroke();
          }
        });
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [smoothX, smoothY]);

  return (
    <div className="space-background" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none', overflow: 'hidden' }}>
      <div className="space-base" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'var(--bg-dark)' }} />
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      
      {/* Glowing blur filters representing nebulas */}
      <div className="blurry-planet" style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: 'var(--accent-purple)', filter: 'blur(150px)', opacity: 0.15, top: '15%', left: '10%', pointerEvents: 'none' }} />
      <div className="blurry-planet" style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', background: 'var(--accent-cyan)', filter: 'blur(150px)', opacity: 0.1, top: '55%', left: '75%', pointerEvents: 'none' }} />
    </div>
  );
};

export default Background;
