import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Tilt from 'react-parallax-tilt';
import { FaCoffee, FaCode, FaGlobe, FaReact, FaServer, FaBrain, FaRocket } from 'react-icons/fa';

const journeySteps = [
  {
    year: "2023",
    icon: <FaCoffee />,
    title: "Java Programming Foundations",
    description: "Started my academic journey learning Java. Mastered core Object-Oriented Programming (OOP) concepts, inheritance, polymorphism, and basic data structures."
  },
  {
    year: "2024",
    icon: <FaCode />,
    title: "Built Java Desktop Applications",
    description: "Developed local applications, simulating systems like account registers and structured banking tracking databases using core data structures."
  },
  {
    year: "2024",
    icon: <FaGlobe />,
    title: "Learned Web Development",
    description: "Ventured into front-end design, mastering HTML5 semantic structures, responsive CSS layouts (Flexbox, Grid), and native ES6 JavaScript."
  },
  {
    year: "2025",
    icon: <FaReact />,
    title: "Started React Development",
    description: "Learned component design, hook lifecycles, and dynamic client routing, building platforms."
  },
  {
    year: "2025",
    icon: <FaServer />,
    title: "Full Stack MERN Applications",
    description: "Expanded to backend systems. Designed MongoDB schemas with Mongoose and built secure RESTful routes with Express/Node."
  },
  {
    year: "2026",
    icon: <FaBrain />,
    title: "Explored Machine Learning",
    description: "Dived into AI integrations, using Python, Pandas, and Natural Language Processing (NLP) libraries to build a predictive projects and recommendation system."
  },
  {
    year: "2026",
    icon: <FaRocket />,
    title: "Scalable Real-World Engineering",
    description: "Currently focusing on cloud servers, containers, production-grade security architectures, and automated testing (CI/CD)."
  }
];

const EngineeringJourney = () => {
  const containerRef = useRef(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  // Scroll timeline line animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  return (
    <section id="journey" className="journey-section">
      <div className="container" ref={ref}>
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          Engineering <span className="text-gradient">Journey</span>
        </motion.h2>

        <div className="journey-timeline" ref={containerRef} style={{ position: 'relative' }}>
          {/* Scroll-Spy drawing timeline line */}
          <motion.div 
            className="journey-line"
            style={{ 
              scaleY, 
              transformOrigin: 'top center',
              x: '-50%'
            }}
          />
          
          {journeySteps.map((step, idx) => {
            const isEven = idx % 2 === 0;
            const isLatest = idx === journeySteps.length - 1;
            
            return (
              <div 
                key={idx} 
                className={`journey-item ${isEven ? 'item-left' : 'item-right'}`}
              >
                {/* Timeline center node (glows on reveal, pulses if active/latest) */}
                <div className="journey-node-container" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
                  <motion.div 
                    className="journey-node text-gradient"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ type: 'spring', stiffness: 150, delay: idx * 0.05 }}
                    style={{
                      position: 'relative',
                      zIndex: 2,
                      boxShadow: isLatest ? '0 0 15px var(--accent-purple)' : '0 0 0px rgba(0,0,0,0)',
                      cursor: 'pointer'
                    }}
                  >
                    {step.icon}
                  </motion.div>
                  
                  {isLatest && (
                    <motion.div
                      style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        borderRadius: '50%',
                        border: '2px solid var(--accent-purple)',
                        zIndex: 1,
                        pointerEvents: 'none'
                      }}
                      animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                    />
                  )}
                </div>

                {/* Timeline content box (3D tilt, slide-in reveal) */}
                <div className="journey-card-wrapper" style={{ width: '45%', display: 'flex', justifyContent: isEven ? 'flex-end' : 'flex-start' }}>
                  <Tilt
                    tiltMaxAngleX={8}
                    tiltMaxAngleY={8}
                    scale={1.02}
                    transitionSpeed={800}
                    style={{ width: '100%', maxWidth: '480px' }}
                  >
                    <motion.div 
                      className="glass journey-content-card"
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', width: '100%' }}
                      whileHover="hover"
                    >
                      {/* Gradient border mask on Hover */}
                      <motion.div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '16px',
                          padding: '1.5px',
                          background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))',
                          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          WebkitMaskComposite: 'xor',
                          maskComposite: 'exclude',
                          pointerEvents: 'none',
                          opacity: 0,
                          transition: 'opacity 0.4s ease'
                        }}
                        variants={{
                          hover: { opacity: 1 }
                        }}
                      />

                      <div style={{ position: 'relative', zIndex: 2 }}>
                        <span className="journey-year text-gradient">{step.year}</span>
                        <h3 className="brand-font">{step.title}</h3>
                        <p>{step.description}</p>
                      </div>
                    </motion.div>
                  </Tilt>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EngineeringJourney;
