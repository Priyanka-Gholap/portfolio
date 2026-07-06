import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticElement from './MagneticElement';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredSection, setHoveredSection] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scrollspy logic
  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = ['home', 'about', 'journey', 'education', 'skills', 'projects', 'contact'];
      // Use offset to trigger active state slightly before hitting the top boundary
      const scrollPosition = window.scrollY + 250;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy);
    // Initial call
    handleScrollSpy();
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header 
      className={`${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-is-open' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 100,
        padding: scrolled ? '12px 0' : '20px 0',
        transition: 'padding 0.3s ease, background-color 0.3s ease, border-color 0.3s ease',
        background: scrolled ? 'rgba(5, 5, 8, 0.75)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid transparent'
      }}
    >
      <div className="container nav-content">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="logo"
        >
          Priyanka<span className="text-gradient">.dev</span>
        </motion.div>
        
        {/* Desktop Navigation */}
        <motion.nav 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          className="nav-links desktop-only"
          style={{ position: 'relative', display: 'flex', gap: '8px', alignItems: 'center' }}
        >
          {['about', 'education', 'skills', 'projects', 'contact'].map((sec) => {
            const isActive = activeSection === sec;
            const isHovered = hoveredSection === sec;
            return (
              <div
                key={sec}
                onMouseEnter={() => setHoveredSection(sec)}
                onMouseLeave={() => setHoveredSection(null)}
                style={{ position: 'relative' }}
              >
                <MagneticElement>
                  <a 
                    href={`#${sec}`} 
                    style={{ 
                      position: 'relative', 
                      padding: '8px 16px', 
                      display: 'inline-block',
                      borderRadius: '50px',
                      zIndex: 2,
                      cursor: 'pointer'
                    }}
                  >
                    <span style={{ 
                      color: isActive ? 'var(--accent-cyan)' : 'var(--text-muted)', 
                      transition: 'color 0.3s ease',
                      fontWeight: isActive ? '600' : '400',
                      fontSize: '0.95rem'
                    }}>
                      {sec.charAt(0).toUpperCase() + sec.slice(1)}
                    </span>
                    
                    {/* Active Underline Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        style={{
                          position: 'absolute',
                          bottom: '0px',
                          left: '16px',
                          right: '16px',
                          height: '2px',
                          background: 'var(--gradient-neon)',
                          borderRadius: '2px',
                          boxShadow: '0 0 8px var(--accent-cyan)',
                          zIndex: 3
                        }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </MagneticElement>

                {/* Sliding Hover Pill Background */}
                {isHovered && (
                  <motion.div
                    layoutId="hoverNavIndicator"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '50px',
                      zIndex: 1,
                      pointerEvents: 'none'
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                )}
              </div>
            );
          })}
        </motion.nav>

        {/* Mobile Hamburger Button */}
        <motion.div 
          className="mobile-toggle" 
          onClick={toggleMenu}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ cursor: 'pointer' }}
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </motion.div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            className="mobile-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              width: '100%',
              background: 'rgba(5, 5, 8, 0.95)',
              backdropFilter: 'blur(16px)',
              borderBottom: '1px solid rgba(255,255,255,0.05)'
            }}
          >
            <nav className="mobile-nav-links" style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <a href="#home" onClick={closeMenu}>Home</a>
              <a href="#about" onClick={closeMenu}>About</a>
              <a href="#education" onClick={closeMenu}>Education</a>
              <a href="#skills" onClick={closeMenu}>Skills</a>
              <a href="#projects" onClick={closeMenu}>Projects</a>
              <a href="#contact" onClick={closeMenu}>Contact</a>
              <a href="/resume.pdf" target="_blank" rel="noreferrer" onClick={closeMenu}>Resume</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
