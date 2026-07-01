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
  { name: 'React.js', icon: <FaReact color="#61DAFB" />, desc: "State-driven client-side views & modular components.", projects: ["Smart Society Hub", "ToggleNest", "CineMatch", "DSA Master", "RCB Verse"] },
  { name: 'JavaScript', icon: <FaJsSquare color="#F7DF1E" />, desc: "Dynamic client scripting & interactive DOM actions.", projects: ["CineMatch", "RCB Verse", "DSA Master"] },
  { name: 'HTML5', icon: <FaHtml5 color="#E34F26" />, desc: "Semantic page structures & SEO optimizations.", projects: ["CineMatch", "RCB Verse"] },
  { name: 'CSS3', icon: <FaCss3Alt color="#1572B6" />, desc: "High-fidelity layouts, grids, & animations.", projects: ["CineMatch", "RCB Verse", "DSA Master"] }
];

const backendSkills = [
  { name: 'Node.js', icon: <FaNodeJs color="#339933" />, desc: "Asynchronous runtime environments.", projects: ["Smart Society Hub", "ToggleNest"] },
  { name: 'Express.js', icon: <SiExpress color="#fff" />, desc: "RESTful server endpoint routing.", projects: ["Smart Society Hub", "ToggleNest"] },
  { name: 'Java', icon: <FaJava color="#007396" />, desc: "Multi-threaded object-oriented services.", projects: ["Virtual Banking System"] },
  { name: 'REST APIs', icon: <FaTools color="#a0aab2" />, desc: "Robust data exchange standard patterns.", projects: ["Smart Society Hub", "ToggleNest", "CineMatch"] }
];

const databaseAndTools = [
  { name: 'MongoDB', icon: <SiMongodb color="#47A248" />, desc: "Document-oriented schemas & aggregation pipelines.", projects: ["Smart Society Hub", "ToggleNest"] },
  { name: 'MySQL', icon: <SiMysql color="#4479A1" />, desc: "Relational queries & structured data storage.", projects: ["Academic Projects"] },
  { name: 'Git', icon: <FaGitAlt color="#F05032" />, desc: "Distributed code branches & version tracks.", projects: ["All Repos"] },
  { name: 'GitHub', icon: <FaGithub color="#fff" />, desc: "Remote repositories & collaboration control.", projects: ["All Repos"] },
  { name: 'Postman', icon: <SiPostman color="#FF6C37" />, desc: "API endpoint collections & request traces.", projects: ["Smart Society Hub", "ToggleNest"] }
];

const currentlyExploring = [
  { name: 'TypeScript', icon: <SiTypescript color="#3178C6" />, desc: "Typed superset of JavaScript." },
  { name: 'Docker', icon: <SiDocker color="#2496ED" />, desc: "Containerized deployment configurations." },
  { name: 'AWS', icon: <FaAws color="#FF9900" />, desc: "Cloud hosting & serverless computing." },
  { name: 'GraphQL', icon: <SiGraphql color="#E10098" />, desc: "Flexible data query schemas." },
  { name: 'Redis', icon: <SiRedis color="#D82C20" />, desc: "High-performance cached memory." },
  { name: 'CI/CD', icon: <SiGithubactions color="#2088FF" />, desc: "Automated pipelines & tests." }
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

  // Dynamically adjust orbit radii and dimensions based on screen width (Desktop only)
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

  const renderMobileSkillCard = (skill, index) => {
    return (
      <div 
        key={index}
        className="glass mobile-skill-card"
        style={{
          padding: '16px 20px',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          background: 'rgba(255, 255, 255, 0.015)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          textAlign: 'left',
          position: 'relative',
          transition: 'all 0.3s ease'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '1.8rem', display: 'flex', alignItems: 'center' }}>
            {skill.icon}
          </span>
          <span style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 600, fontFamily: 'Outfit' }}>
            {skill.name}
          </span>
        </div>
        
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0, lineHeight: '1.5' }}>
          {skill.desc}
        </p>

        {skill.projects && skill.projects.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', fontWeight: 600, textTransform: 'uppercase', marginRight: '4px' }}>Used in:</span>
            {skill.projects.map((p, i) => (
              <span key={i} style={{ 
                fontSize: '0.7rem', 
                padding: '2px 8px', 
                background: 'rgba(0, 240, 255, 0.05)', 
                border: '1px solid rgba(0, 240, 255, 0.15)',
                color: 'var(--accent-cyan)',
                borderRadius: '10px'
              }}>
                {p}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Render responsive mobile view
  if (isMobile) {
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

          <div className="mobile-skills-container" style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginTop: '20px' }}>
            
            {/* Category: Frontend */}
            <div>
              <h3 className="brand-font" style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px', borderLeft: '3px solid var(--accent-cyan)', paddingLeft: '10px' }}>Frontend</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {frontendSkills.map((skill, index) => renderMobileSkillCard(skill, index))}
              </div>
            </div>

            {/* Category: Backend */}
            <div>
              <h3 className="brand-font" style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px', borderLeft: '3px solid var(--accent-purple)', paddingLeft: '10px' }}>Backend</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {backendSkills.map((skill, index) => renderMobileSkillCard(skill, index))}
              </div>
            </div>

            {/* Category: Database & Tools */}
            <div>
              <h3 className="brand-font" style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px', borderLeft: '3px solid var(--accent-cyan)', paddingLeft: '10px' }}>Databases & Tools</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {databaseAndTools.map((skill, index) => renderMobileSkillCard(skill, index))}
              </div>
            </div>

          </div>

          {/* Currently Exploring Grid for Mobile */}
          <div style={{ marginTop: '50px', paddingTop: '30px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <motion.h3 
              className="brand-font" 
              style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '20px', textAlign: 'center' }}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
            >
              Currently <span className="text-gradient">Exploring</span>
            </motion.h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {currentlyExploring.map((tech, idx) => (
                <div key={idx} className="glass" style={{ padding: '12px 15px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '5px', textAlign: 'left' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '1.2rem', display: 'flex' }}>{tech.icon}</span>
                    <span style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 600 }}>{tech.name}</span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', margin: 0 }}>{tech.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Desktop Orbit View (Unchanged)
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

            {renderOrbit(frontendSkills, r1, 24, false)}
            {renderOrbit(backendSkills, r2, 36, true)}
            {renderOrbit(databaseAndTools, r3, 48, false)}
          </motion.div>
        </div>

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
