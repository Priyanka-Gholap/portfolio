import React from 'react';
import { motion } from 'framer-motion';
import MagneticElement from './MagneticElement';
import { FaGithub, FaLinkedin, FaEnvelope, FaFileAlt, FaLaptopCode, FaCode } from 'react-icons/fa';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="container hero-content" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', alignItems: 'center', gap: '40px', width: '100%' }}>
        
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-left-col"
        >
          {/* Pulsing Recruiter Badge */}
          <div className="pulsing-badge-container" style={{ marginBottom: '20px' }}>
            <span className="pulsing-badge">
              <span className="pulse-dot"></span>
              Available for Internship
            </span>
          </div>

          <h4 className="text-gradient brand-font" style={{ fontSize: '1.2rem', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 600 }}>
            Hi, I am
          </h4>
          <h1 style={{ fontSize: '4.5rem', lineHeight: 1.1, marginBottom: '20px' }}>Priyanka <span className="text-gradient">Gholap</span></h1>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '20px', color: '#fff', fontWeight: 500 }}>
            Full Stack Developer <span style={{ color: 'var(--accent-cyan)' }}>(MERN)</span>
          </h2>
          
          <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', marginBottom: '30px', lineHeight: '1.7' }}>
            Building scalable, responsive, and modern web applications with MERN and AI technologies. Focused on bridging efficient backend workflows with high-performance frontend interactivity.
          </p>

          {/* Core Recruiter Statistics */}
          <div className="hero-stats-badge-grid">
            <div className="hero-stat-item">
              <span className="text-gradient" style={{ fontWeight: 800 }}>✦</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>7+ Real Projects</span>
            </div>
            <div className="hero-stat-item">
              <span className="text-gradient" style={{ fontWeight: 800 }}>✦</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>MERN Stack Developer</span>
            </div>
            <div className="hero-stat-item">
              <span className="text-gradient" style={{ fontWeight: 800 }}>✦</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>AI/ML Projects</span>
            </div>
            <div className="hero-stat-item">
              <span className="text-gradient" style={{ fontWeight: 800 }}>✦</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Computer Engineering Student</span>
            </div>
            <div className="hero-stats-footer-span hero-stat-item">
              <span className="text-gradient" style={{ fontWeight: 800 }}>★</span>
              <span style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 600 }}>React • Node.js • MongoDB</span>
            </div>
          </div>

          <div className="hero-btns">
            <motion.a 
              href="#projects" 
              className="btn btn-primary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              View My Work
            </motion.a>
            <motion.a 
              href="mailto:priyankagholap182@gmail.com" 
              className="btn btn-secondary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <FaEnvelope size={16} /> Contact Me
            </motion.a>
          </div>

          <motion.div 
            className="social-links"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <MagneticElement>
              <a href="https://github.com/Priyanka-Gholap" target="_blank" rel="noreferrer" className="social-icon">
                <FaGithub size={20} />
              </a>
            </MagneticElement>
            <MagneticElement>
              <a href="https://www.linkedin.com/in/priyankagholap-in" target="_blank" rel="noreferrer" className="social-icon">
                <FaLinkedin size={20} />
              </a>
            </MagneticElement>
            <MagneticElement>
              <a href="/resume.pdf" target="_blank" rel="noreferrer" className="social-icon" title="View Resume">
                <FaFileAlt size={20} />
              </a>
            </MagneticElement>
          </motion.div>
        </motion.div>

        {/* Right Column: Character floating */}
        <motion.div 
          className="character-container"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}
        >
          {/* Orbits */}
          <motion.div 
            style={{ position: 'absolute', width: '350px', height: '350px', border: '1px dashed rgba(0,240,255,0.3)', borderRadius: '50%' }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
          />
          <motion.div 
            style={{ position: 'absolute', width: '250px', height: '250px', border: '1px dashed rgba(157,0,255,0.4)', borderRadius: '50%' }}
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
          />
          <motion.div 
            style={{ position: 'absolute', width: '150px', height: '150px', border: '2px solid rgba(255,255,255,0.1)', borderRadius: '50%' }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
          />

          {/* Coder Character */}
          <motion.div 
            className="astronaut"
            animate={{ y: [-15, 15, -15] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            style={{ fontSize: '8rem', color: '#fff', filter: 'drop-shadow(0 0 20px var(--accent-cyan))' }}
          >
            <FaLaptopCode />
          </motion.div>
          
          <motion.div 
            animate={{ y: [10, -10, 10], rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
            style={{ position: 'absolute', top: '20%', right: '20%', fontSize: '3rem', color: 'var(--accent-purple)' }}
          >
            <FaCode />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
