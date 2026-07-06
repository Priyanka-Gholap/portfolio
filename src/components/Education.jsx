import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Tilt from 'react-parallax-tilt';
import { FaGraduationCap } from 'react-icons/fa';

const educationData = [
  {
    institution: "Bharat College of Engineering",
    period: "2023 - 2027 (pursuing)",
    title: "Bachelor of Engineering",
    details: "Current CGPA (till sem 6): 8.06"
  },
  {
    institution: "Jana Gana Mana Jr.College - HSC",
    period: "2021 - 2023",
    title: "Higher Secondary Certificate",
    details: ""
  },
  {
    institution: "Jana Gana Mana Vidyamandir - SSC",
    period: "2011 - 2021",
    title: "Secondary School Certificate",
    details: ""
  }
];

const Education = () => {
  const containerRef = useRef(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Scroll drawing timeline line
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
    <section id="education" className="education">
      <div className="container" ref={ref}>
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          My <span className="text-gradient">Education</span>
        </motion.h2>

        <div className="timeline" ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
          
          {/* Scroll-Spy Timeline Line */}
          <motion.div
            style={{
              position: 'absolute',
              left: '24px',
              top: 0,
              bottom: 0,
              width: '2px',
              background: 'linear-gradient(to bottom, var(--accent-purple), var(--accent-cyan))',
              scaleY,
              transformOrigin: 'top center',
              zIndex: 1
            }}
          />

          {educationData.map((edu, idx) => (
            <Tilt 
              key={idx}
              tiltMaxAngleX={6}
              tiltMaxAngleY={6}
              scale={1.01}
              transitionSpeed={800}
            >
              <motion.div 
                className="timeline-item glass"
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.15, duration: 0.6, ease: 'easeOut' }}
                style={{ cursor: 'pointer', width: '100%', position: 'relative', zIndex: 2 }}
                whileHover="hover"
              >
                {/* Soft border glow on Hover */}
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

                <div className="timeline-icon" style={{ position: 'relative', zIndex: 3 }}>
                  {/* Icon rotates slightly while appearing */}
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={inView ? { rotate: [0, -15, 15, 0] } : {}}
                    transition={{ delay: idx * 0.15 + 0.3, duration: 0.8, ease: 'easeInOut' }}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <FaGraduationCap size={20} />
                  </motion.div>
                </div>
                <div className="timeline-content" style={{ position: 'relative', zIndex: 3 }}>
                  <span className="timeline-period">{edu.period}</span>
                  <h3 className="timeline-title brand-font">{edu.institution}</h3>
                  <h4 className="timeline-subtitle">{edu.title}</h4>
                  {edu.details && <p className="timeline-details">{edu.details}</p>}
                </div>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
