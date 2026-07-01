import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <motion.div
      className="loader-container"
      initial={{ opacity: 1 }}
      exit={{ 
        y: "-100vh", 
        opacity: 0,
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
      }}
      style={{
        position: 'fixed',
        top: 0, left: 0, width: '100vw', height: '100vh',
        background: 'var(--bg-dark)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 99999
      }}
    >
      <div 
        className="loader-content"
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}
      >
        {/* Priyanka Name Expand Keyframe Animates */}
        <motion.h1 
          className="brand-font text-gradient"
          style={{ 
            fontSize: '3rem', 
            fontWeight: 800, 
            margin: 0, 
            letterSpacing: '8px',
            textTransform: 'uppercase',
            paddingLeft: '8px'
          }}
          initial={{ opacity: 0, letterSpacing: '4px', y: 15, scale: 0.9 }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            letterSpacing: ['4px', '12px', '12px', '18px'],
            y: [15, 0, 0, -15],
            scale: [0.9, 1, 1, 1.3]
          }}
          transition={{ 
            times: [0, 0.4, 0.8, 1],
            duration: 2.0,
            ease: "easeInOut"
          }}
        >
          PRIYANKA
        </motion.h1>
        
        {/* Progress Bar with fade out shrink transitions */}
        <motion.div 
          className="loading-bar-wrapper"
          style={{
            width: '200px',
            height: '3px',
            background: 'rgba(255,255,255,0.06)',
            borderRadius: '10px',
            overflow: 'hidden',
            marginTop: '10px'
          }}
          animate={{ 
            opacity: [1, 1, 0],
            scale: [1, 1, 0.9]
          }}
          transition={{ 
            times: [0, 0.8, 1],
            duration: 2.0,
            ease: "easeInOut"
          }}
        >
          <motion.div 
            className="loading-bar"
            style={{
              height: '100%',
              background: 'var(--gradient-neon)',
              width: '0%'
            }}
            initial={{ width: '0%' }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Loader;
