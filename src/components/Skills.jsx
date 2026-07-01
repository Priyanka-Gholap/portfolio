import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Tilt from 'react-parallax-tilt';
import { 
  FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs, FaJava, FaGitAlt, FaGithub, FaTools, FaAws
} from 'react-icons/fa';
import { 
  SiExpress, SiMongodb, SiMysql, SiPostman, SiDocker, SiTypescript, SiGraphql, SiRedis, SiGithubactions
} from 'react-icons/si';

const frontendSkills = [
  { name: 'HTML5', icon: <FaHtml5 color="#E34F26" /> },
  { name: 'CSS3', icon: <FaCss3Alt color="#1572B6" /> },
  { name: 'JavaScript', icon: <FaJsSquare color="#F7DF1E" /> },
  { name: 'React.js', icon: <FaReact color="#61DAFB" /> },
];

const backendSkills = [
  { name: 'Node.js', icon: <FaNodeJs color="#339933" /> },
  { name: 'Express.js', icon: <SiExpress color="#fff" /> },
  { name: 'Java', icon: <FaJava color="#007396" /> },
  { name: 'REST APIs', icon: <FaTools color="#a0aab2" /> },
];

const databaseAndTools = [
  { name: 'MongoDB', icon: <SiMongodb color="#47A248" /> },
  { name: 'MySQL', icon: <SiMysql color="#4479A1" /> },
  { name: 'Git', icon: <FaGitAlt color="#F05032" /> },
  { name: 'GitHub', icon: <FaGithub color="#fff" /> },
  { name: 'Postman', icon: <SiPostman color="#FF6C37" /> },
];

const currentlyExploring = [
  { name: 'TypeScript', icon: <SiTypescript color="#3178C6" /> },
  { name: 'Docker', icon: <SiDocker color="#2496ED" /> },
  { name: 'AWS', icon: <FaAws color="#FF9900" /> },
  { name: 'GraphQL', icon: <SiGraphql color="#E10098" /> },
  { name: 'Redis', icon: <SiRedis color="#D82C20" /> },
  { name: 'CI/CD', icon: <SiGithubactions color="#2088FF" /> }
];

const Skills = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isSmallMobile = windowWidth < 480;

  // Dynamically adjust orbit radii and dimensions based on screen width
  const r1 = isSmallMobile ? 65 : (isMobile ? 100 : 150);
  const r2 = isSmallMobile ? 115 : (isMobile ? 160 : 240);
  const r3 = isSmallMobile ? 165 : (isMobile ? 220 : 330);
  const solarSystemHeight = isSmallMobile ? '380px' : (isMobile ? '500px' : '750px');
  const sunSize = isSmallMobile ? 60 : (isMobile ? 80 : 120);
  const planetSize = isSmallMobile ? 35 : (isMobile ? 40 : 55);

  const renderOrbit = (skills, radius, duration, reverse = false) => {
    return (
      <div
        className={`orbit-ring-css ${reverse ? 'orbit-spin-reverse' : 'orbit-spin-forward'}`}
        style={{
          width: radius * 2,
          height: radius * 2,
          top: `calc(50% - ${radius}px)`,
          left: `calc(50% - ${radius}px)`,
          '--duration': `${duration}s`,
        }}
      >
        {skills.map((skill, index) => {
          const angle = (index / skills.length) * 360;
          const radian = (angle * Math.PI) / 180;
          const x = radius * Math.cos(radian);
          const y = radius * Math.sin(radian);

          return (
            <div
              key={index}
              style={{
                position: 'absolute',
                top: '50%', left: '50%',
                transform: `translate(${x}px, ${y}px)`,
                pointerEvents: 'none'
              }}
            >
              <motion.div
                className="planet glass"
                title={skill.name}
                style={{
                  width: planetSize, height: planetSize,
                  marginLeft: -planetSize / 2, marginTop: -planetSize / 2,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '50%',
                  fontSize: isMobile ? '1.1rem' : '1.5rem',
                  cursor: 'pointer',
                  boxShadow: '0 0 15px rgba(0,0,0,0.5)',
                  pointerEvents: 'auto',
                  zIndex: 10
                }}
                whileHover={{ 
                  scale: 1.25, 
                  borderColor: 'var(--accent-cyan)',
                  boxShadow: '0 0 20px rgba(0, 240, 255, 0.4)'
                }}
              >
                <div 
                  className="planet-icon-wrapper" 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    '--duration': `${duration}s`
                  }}
                >
                  <div className="planet-tooltip">
                    {skill.name}
                  </div>
                  {skill.icon}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <section id="skills" className="skills">
      <div className="container" ref={ref}>
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          Technical <span className="text-gradient">Galaxy</span>
        </motion.h2>

        {/* Centered Galaxy Orbits Only */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
          <motion.div 
            className="solar-system-container"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            style={{
              position: 'relative',
              width: '100%',
              height: solarSystemHeight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'visible',
              borderRadius: '20px',
              background: 'rgba(255,255,255,0.01)',
              border: '1px solid rgba(255,255,255,0.02)'
            }}
          >
            {/* The "Sun" / Core */}
            <div 
              className="sun glass text-gradient brand-font"
              style={{
                width: sunSize, height: sunSize,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: isMobile ? '0.9rem' : '1.2rem',
                fontWeight: 'bold',
                zIndex: 2,
                boxShadow: '0 0 40px rgba(157,0,255,0.4)',
                border: '2px solid rgba(157,0,255,0.6)'
              }}
            >
              ME
            </div>

            {/* Render Orbits */}
            {renderOrbit(frontendSkills, r1, 24, false)}
            {renderOrbit(backendSkills, r2, 36, true)}
            {renderOrbit(databaseAndTools, r3, 48, false)}
          </motion.div>
        </div>

        {/* Simplified Currently Exploring capsule tags */}
        <div style={{ marginTop: '80px', paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <motion.h3 
            className="section-title" 
            style={{ fontSize: '2rem', marginBottom: '30px', textAlign: 'center' }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Currently <span className="text-gradient">Exploring</span>
          </motion.h3>

          <div className="exploring-cards-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
            gap: '15px',
            marginTop: '25px'
          }}>
            {currentlyExploring.map((tech, idx) => (
              <Tilt 
                key={idx}
                tiltMaxAngleX={12} 
                tiltMaxAngleY={12} 
                scale={1.03}
              >
                <motion.div 
                  className="glass exploring-card"
                  style={{
                    padding: '15px 25px',
                    borderRadius: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    border: '1px solid rgba(255,255,255,0.06)',
                    background: 'rgba(255, 255, 255, 0.015)',
                    cursor: 'pointer'
                  }}
                  whileHover={{
                    borderColor: 'var(--accent-purple)',
                    boxShadow: '0 5px 15px rgba(157, 0, 255, 0.15)'
                  }}
                >
                  <span style={{ fontSize: '1.6rem', display: 'flex', alignItems: 'center' }}>
                    {tech.icon}
                  </span>
                  <span style={{ color: '#fff', fontSize: '1rem', fontWeight: 600 }}>
                    {tech.name}
                  </span>
                </motion.div>
              </Tilt>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;
