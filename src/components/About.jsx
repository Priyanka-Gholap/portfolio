import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Tilt from 'react-parallax-tilt';
import { FaUser, FaLaptopCode, FaWrench, FaBullseye } from 'react-icons/fa';

const aboutCards = [
  {
    icon: <FaUser size={24} className="text-gradient" />,
    title: "Who I Am",
    content: "I am Priyanka S. Gholap, a Computer Engineering student (Expected 2027) at Bharat College of Engineering. Strong base in algorithms, database design, and object-oriented principles."
  },
  {
    icon: <FaLaptopCode size={24} className="text-gradient" />,
    title: "What I Build",
    content: "Full stack MERN web applications, role-based multi-tenant SaaS dashboards, secure RESTful APIs, and responsive, interactive frontend layouts with smooth micro-animations."
  },
  {
    icon: <FaWrench size={24} className="text-gradient" />,
    title: "Technologies I Love",
    content: "React, Node.js, Express.js, MongoDB, Java, JavaScript, Python, SQL, Git, and Tailwind CSS. Always exploring containerization and cloud infrastructure."
  },
  {
    icon: <FaBullseye size={24} className="text-gradient" />,
    title: "Current Goal",
    content: "Actively seeking a Full Stack Developer or MERN Stack Developer internship to ship production-ready solutions and collaborate on engineering problems."
  }
];

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" className="about-section">
      <div className="container" ref={ref}>
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          About <span className="text-gradient">Me</span>
        </motion.h2>

        <div className="about-grid">
          {aboutCards.map((card, idx) => (
            <Tilt
              key={idx}
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              scale={1.02}
              transitionSpeed={800}
              style={{ height: '100%' }}
            >
              <motion.div
                className="glass about-card"
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.1, duration: 0.6, ease: 'easeOut' }}
                style={{ height: '100%', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
                whileHover="hover"
              >
                {/* GPU-Accelerated Gradient Border shine on Hover */}
                <motion.div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '16px',
                    padding: '1.5px',
                    background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
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
                  <div className="card-header" style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                    <motion.div 
                      className="card-icon" 
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      variants={{
                        hover: { rotate: 12, scale: 1.15 }
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 12 }}
                    >
                      {card.icon}
                    </motion.div>
                    <h3 className="brand-font" style={{ fontSize: '1.4rem', color: '#fff', fontWeight: 600 }}>{card.title}</h3>
                  </div>
                  
                  {/* Sentence-by-sentence text reveal */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {card.content.split(". ").map((sentence, sIdx) => {
                      if (!sentence) return null;
                      const formattedText = sentence.endsWith('.') ? sentence : `${sentence}.`;
                      return (
                        <motion.p
                          key={sIdx}
                          initial={{ opacity: 0, y: 12 }}
                          animate={inView ? { opacity: 1, y: 0 } : {}}
                          transition={{ delay: idx * 0.1 + sIdx * 0.15 + 0.3, duration: 0.5, ease: 'easeOut' }}
                          style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6', margin: 0 }}
                        >
                          {formattedText}
                        </motion.p>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
