import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Background from './components/Background';
import Hero from './components/Hero';
import About from './components/About';
import EngineeringJourney from './components/EngineeringJourney';
import Education from './components/Education';
import Skills from './components/Skills';
import WhyHireMe from './components/WhyHireMe';
import Projects from './components/Projects';
import DevelopmentActivity from './components/DevelopmentActivity';
import Contact from './components/Contact';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide loader after 2000ms (to let loading bar complete and content expand/fade)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });

    return () => clearTimeout(timer);
  }, []);

  // Lock body scroll while loader is active
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" />}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <CustomCursor />
        <Navbar />
        <Background />
        <main>
          <Hero />
          <About />
          <EngineeringJourney />
          <Education />
          <Skills />
          <WhyHireMe />
          <Projects />
          <DevelopmentActivity />
          <Contact />
        </main>
        <footer>
          <p>&copy; {new Date().getFullYear()} Priyanka S. Gholap. Built with React, Framer Motion & CSS Grid.</p>
        </footer>
      </motion.div>
    </>
  );
}

export default App;
