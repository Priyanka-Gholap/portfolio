import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticElement from './MagneticElement';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-is-open' : ''}`}>
      <div className="container nav-content">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="logo"
        >
          Priyanka<span className="text-gradient">.dev</span>
        </motion.div>
        
        {/* Desktop Navigation */}
        <motion.nav 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="nav-links desktop-only"
        >
          <MagneticElement><a href="#about">About</a></MagneticElement>
          <MagneticElement><a href="#education">Education</a></MagneticElement>
          <MagneticElement><a href="#skills">Skills</a></MagneticElement>
          <MagneticElement><a href="#projects">Projects</a></MagneticElement>
          <MagneticElement><a href="#contact">Contact</a></MagneticElement>
        </motion.nav>

        {/* Mobile Hamburger Button */}
        <div className="mobile-toggle" onClick={toggleMenu}>
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            className="mobile-drawer"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="mobile-nav-links">
              <a href="#about" onClick={closeMenu}>About</a>
              <a href="#education" onClick={closeMenu}>Education</a>
              <a href="#skills" onClick={closeMenu}>Skills</a>
              <a href="#projects" onClick={closeMenu}>Projects</a>
              <a href="#contact" onClick={closeMenu}>Contact</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
