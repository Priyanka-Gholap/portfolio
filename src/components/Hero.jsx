import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MagneticElement from './MagneticElement';
import { FaGithub, FaLinkedin, FaEnvelope, FaFileAlt, FaLaptopCode, FaCode } from 'react-icons/fa';

// Animated Letter reveal helper
const AnimateText = ({ text, className, style, delay = 0 }) => {
  const letters = Array.from(text);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.04, 
        delayChildren: delay 
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 150,
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
      style={{ display: 'inline-flex', flexWrap: 'wrap', ...style }}
    >
      {letters.map((char, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

// Animated typing role component
const TypingRoles = () => {
  const roles = [
    "Full Stack Developer (MERN)",
    "Creative Web Architect",
    "Computer Engineering Student",
    "Problem Solver"
  ];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const fullText = roles[currentIdx];
    const speed = isDeleting ? 30 : 70;

    if (!isDeleting && currentText === fullText) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentIdx((prev) => (prev + 1) % roles.length);
    } else {
      timer = setTimeout(() => {
        setCurrentText((prev) =>
          isDeleting
            ? fullText.substring(0, prev.length - 1)
            : fullText.substring(0, prev.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentIdx]);

  return (
    <span style={{ display: 'inline-block' }}>
      <span style={{ color: 'var(--accent-cyan)' }}>{currentText}</span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        style={{
          marginLeft: "2px",
          color: "var(--accent-cyan)",
          fontWeight: "bold"
        }}
      >
        |
      </motion.span>
    </span>
  );
};

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 20, stiffness: 100 }
    }
  };

  return (
    <section className="hero" id="home">
      <div className="container hero-content" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', alignItems: 'center', gap: '40px', width: '100%' }}>
        
        {/* Left Column */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="hero-left-col"
        >
          {/* Pulsing Recruiter Badge */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
            }}
            className="pulsing-badge-container" 
            style={{ marginBottom: '20px' }}
          >
            <span className="pulsing-badge">
              <span className="pulse-dot"></span>
              Available for Internship
            </span>
          </motion.div>

          <h4 className="text-gradient brand-font" style={{ fontSize: '1.2rem', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 600 }}>
            <AnimateText text="Hi, I am" delay={0.1} />
          </h4>
          
          <h1 style={{ fontSize: '4.5rem', lineHeight: 1.1, marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <AnimateText text="Priyanka" delay={0.4} />
            <AnimateText text="Gholap" className="text-gradient" delay={0.8} />
          </h1>
          
          <motion.h2 variants={childVariants} style={{ fontSize: '1.8rem', marginBottom: '20px', color: '#fff', fontWeight: 500 }}>
            I am a <TypingRoles />
          </motion.h2>
          
          {/* Description fades in line-by-line */}
          <motion.p 
            variants={childVariants} 
            style={{ fontSize: '1.15rem', color: 'var(--text-muted)', marginBottom: '30px', lineHeight: '1.7' }}
          >
            {[
              "Building scalable, responsive, and modern web applications with MERN and AI technologies.",
              "Focused on bridging efficient backend workflows with high-performance frontend interactivity."
            ].map((line, idx) => (
              <motion.span
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay: idx * 0.15 } }
                }}
                style={{ display: 'block', marginBottom: idx === 0 ? '5px' : '0' }}
              >
                {line}
              </motion.span>
            ))}
          </motion.p>

          {/* Statistics appear one after another */}
          <motion.div variants={childVariants} className="hero-stats-badge-grid">
            {[
              { label: "7+ Real Projects" },
              { label: "MERN Stack Developer" },
              { label: "AI/ML Projects" },
              { label: "Computer Engineering Student" }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                variants={{
                  hidden: { opacity: 0, scale: 0.9, y: 10 },
                  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 150, delay: idx * 0.08 } }
                }}
                className="hero-stat-item"
              >
                <span className="text-gradient" style={{ fontWeight: 800 }}>✦</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{stat.label}</span>
              </motion.div>
            ))}
            <motion.div 
              variants={{
                hidden: { opacity: 0, scale: 0.9, y: 10 },
                visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 150, delay: 0.35 } }
              }}
              className="hero-stats-footer-span hero-stat-item"
            >
              <span className="text-gradient" style={{ fontWeight: 800 }}>★</span>
              <span style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 600 }}>React • Node.js • MongoDB</span>
            </motion.div>
          </motion.div>

          {/* CTA buttons animate sequentially */}
          <motion.div variants={childVariants} className="hero-btns" style={{ display: 'flex', gap: '15px' }}>
            <motion.a 
              href="#projects" 
              className="btn btn-primary"
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 240, 255, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 120 } }
              }}
            >
              View My Work
            </motion.a>
            <motion.a 
              href="mailto:priyankagholap182@gmail.com" 
              className="btn btn-secondary"
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(157, 0, 255, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 120, delay: 0.1 } }
              }}
            >
              <FaEnvelope size={16} /> Contact Me
            </motion.a>
          </motion.div>

          {/* Social icons pop in with stagger */}
          <motion.div 
            className="social-links"
            variants={childVariants}
            style={{ display: 'flex', gap: '15px', marginTop: '25px' }}
          >
            {[
              { href: "https://github.com/Priyanka-Gholap", icon: <FaGithub size={20} /> },
              { href: "https://www.linkedin.com/in/priyankagholap-in", icon: <FaLinkedin size={20} /> },
              { href: "/resume.pdf", icon: <FaFileAlt size={20} />, title: "View Resume" }
            ].map((link, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, scale: 0 },
                  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 200, delay: idx * 0.1 } }
                }}
              >
                <MagneticElement>
                  <a href={link.href} target="_blank" rel="noreferrer" className="social-icon" title={link.title || ""}>
                    {link.icon}
                  </a>
                </MagneticElement>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column: Character floating & orbiting planets */}
        <motion.div 
          className="character-container"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}
        >
          {/* Orbits */}
          <motion.div 
            className="hero-orbit hero-orbit-outer"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
          />
          <motion.div 
            className="hero-orbit hero-orbit-mid"
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
          />
          <motion.div 
            className="hero-orbit hero-orbit-inner"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
          />

          {/* Decorative rotating planet 1 (attached to outer orbit) */}
          <motion.div
            style={{
              position: 'absolute',
              width: '240px', height: '240px',
              display: 'flex', alignItems: 'center', justifyContent: 'flex-start',
              pointerEvents: 'none',
              zIndex: 1
            }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
          >
            <motion.div
              style={{
                width: '12px', height: '12px',
                borderRadius: '50%',
                background: 'var(--accent-cyan)',
                boxShadow: '0 0 12px var(--accent-cyan)',
                marginLeft: '-6px'
              }}
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            />
          </motion.div>

          {/* Decorative rotating planet 2 (attached to mid orbit) */}
          <motion.div
            style={{
              position: 'absolute',
              width: '340px', height: '340px',
              display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
              pointerEvents: 'none',
              zIndex: 1
            }}
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
          >
            <motion.div
              style={{
                width: '16px', height: '16px',
                borderRadius: '50%',
                background: 'var(--accent-purple)',
                boxShadow: '0 0 15px var(--accent-purple)',
                marginRight: '-8px'
              }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            />
          </motion.div>

          {/* Coder Character */}
          <motion.div 
            className="astronaut hero-astronaut"
            animate={{ y: [-15, 15, -15] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          >
            <FaLaptopCode />
          </motion.div>
          
          <motion.div 
            className="hero-code-icon"
            animate={{ y: [10, -10, 10], rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
          >
            <FaCode />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
