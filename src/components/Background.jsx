import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const NUM_STARS = 75;
const stars = Array.from({ length: NUM_STARS }).map((_, i) => ({
  id: i,
  size: Math.random() * 2 + 1,
  left: Math.random() * 110 - 5 + "vw",
  top: Math.random() * 110 - 5 + "vh",
  twinkleDuration: Math.random() * 3 + 2 + "s",
  twinkleDelay: Math.random() * 2 + "s",
  opacity: Math.random() * 0.5 + 0.3,
}));

const Background = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 30, stiffness: 100 });
  const smoothY = useSpring(mouseY, { damping: 30, stiffness: 100 });

  // Parallax translation factors
  const farX = useTransform(smoothX, [-1, 1], [-15, 15]);
  const farY = useTransform(smoothY, [-1, 1], [-15, 15]);

  const midX = useTransform(smoothX, [-1, 1], [-35, 35]);
  const midY = useTransform(smoothY, [-1, 1], [-35, 35]);

  const nearX = useTransform(smoothX, [-1, 1], [-75, 75]);
  const nearY = useTransform(smoothY, [-1, 1], [-75, 75]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="space-background">
      <div className="space-base"></div>
      
      {/* Far Stars */}
      <motion.div className="parallax-layer far-layer" style={{ x: farX, y: farY }}>
        {stars.slice(0, 40).map(star => (
          <div key={star.id} className="star far-star" style={{
            left: star.left, top: star.top, width: star.size, height: star.size,
            animationDuration: star.twinkleDuration, animationDelay: star.twinkleDelay,
            opacity: star.opacity
          }}></div>
        ))}
      </motion.div>

      {/* Mid Stars */}
      <motion.div className="parallax-layer mid-layer" style={{ x: midX, y: midY }}>
        {stars.slice(40, 65).map(star => (
          <div key={star.id} className="star mid-star" style={{
            left: star.left, top: star.top, width: star.size + 1, height: star.size + 1,
            animationDuration: star.twinkleDuration, animationDelay: star.twinkleDelay,
            backgroundColor: '#00f0ff',
            opacity: star.opacity + 0.2
          }}></div>
        ))}
      </motion.div>

      {/* Near Stars / Planets */}
      <motion.div className="parallax-layer near-layer" style={{ x: nearX, y: nearY }}>
        {stars.slice(65, 75).map(star => (
          <div key={star.id} className="star near-star" style={{
            left: star.left, top: star.top, width: star.size + 2, height: star.size + 2,
            animationDuration: star.twinkleDuration, animationDelay: star.twinkleDelay,
            backgroundColor: '#9d00ff',
            boxShadow: '0 0 10px #9d00ff',
            opacity: star.opacity + 0.3
          }}></div>
        ))}
        {/* Glowing distant nebula/planet */}
        <div className="blurry-planet"></div>
        <div className="blurry-planet" style={{ background: 'var(--accent-cyan)', top: '10%', left: '80%', opacity: 0.2 }}></div>
      </motion.div>
    </div>
  );
};

export default Background;
