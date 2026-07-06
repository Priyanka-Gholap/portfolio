import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Motion values for exact cursor coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Springs for the trailing outer ring
  const trailX = useSpring(mouseX, { damping: 25, stiffness: 200, mass: 0.5 });
  const trailY = useSpring(mouseY, { damping: 25, stiffness: 200, mass: 0.5 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px) or (pointer: coarse)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const mouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName.toLowerCase() === 'a' || 
        e.target.tagName.toLowerCase() === 'button' || 
        e.target.closest('a') !== null || 
        e.target.closest('button') !== null ||
        e.target.closest('.exploring-card') !== null ||
        e.target.closest('.why-hire-card') !== null ||
        e.target.closest('.about-card') !== null ||
        e.target.closest('.journey-content-card') !== null ||
        e.target.closest('.solar-system-container') !== null
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isMobile, mouseX, mouseY]);

  if (isMobile) return null;

  return (
    <>
      {/* Trailing Outer Ring */}
      <motion.div
        className="custom-cursor"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 10000,
          border: '2px solid var(--accent-cyan)',
          background: 'transparent',
          transition: 'width 0.2s ease, height 0.2s ease, background-color 0.2s ease, border-color 0.2s ease',
          ...(isHovering && {
            width: '64px',
            height: '64px',
            backgroundColor: 'rgba(0, 240, 255, 0.1)',
            borderColor: 'var(--accent-purple)',
            mixBlendMode: 'screen'
          })
        }}
      />
      {/* Tight Inner Dot */}
      <motion.div
        className="custom-cursor-dot"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          backgroundColor: 'var(--accent-cyan)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 10001,
          transition: 'width 0.15s ease, height 0.15s ease',
          ...(isHovering && {
            width: '12px',
            height: '12px',
            backgroundColor: 'var(--accent-purple)'
          })
        }}
      />
    </>
  );
};
export default CustomCursor;
