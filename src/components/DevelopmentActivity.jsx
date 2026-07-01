import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaCodeBranch, FaBook, FaCode } from 'react-icons/fa';

const Counter = ({ value, suffix = "", duration = 1.5 }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = parseInt(value);
    if (start === end) {
      setTimeout(() => setCount(end), 0);
      return;
    }
    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.abs(Math.floor(totalMiliseconds / end)) || 20;
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);
    return () => clearInterval(timer);
  }, [value, duration, inView]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const languages = [
  { name: 'JavaScript / React', percentage: 55, color: '#f7df1e' },
  { name: 'Java', percentage: 20, color: '#007396' },
  { name: 'Python / ML', percentage: 15, color: '#3776ab' },
  { name: 'HTML5 / CSS3', percentage: 10, color: '#e34f26' }
];

// Generate consistent mock contribution calendar cells
const columns = 28;
const rows = 7;
const cellLevels = Array.from({ length: columns * rows }).map((_, idx) => {
  const pattern = (idx % 3 === 0 ? 1 : 0) + (idx % 7 === 0 ? 2 : 0) + (idx % 11 === 0 ? 1 : 0);
  return Math.min(pattern, 3);
});

const DevelopmentActivity = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  return (
    <section id="activity" className="activity-section">
      <div className="container" ref={ref}>
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Development <span className="text-gradient">Activity</span>
        </motion.h2>

        {/* Counter Stats */}
        <div className="activity-stats-grid">
          <div className="glass activity-stat-card">
            <FaGithub size={28} className="text-gradient" />
            <h3 className="brand-font"><Counter value="7" suffix="+" /></h3>
            <p>Projects Built</p>
          </div>
          <div className="glass activity-stat-card">
            <FaCode size={28} className="text-gradient" />
            <h3 className="brand-font"><Counter value="15" suffix="+" /></h3>
            <p>Technologies Used</p>
          </div>
          <div className="glass activity-stat-card">
            <FaCodeBranch size={28} className="text-gradient" />
            <h3 className="brand-font"><Counter value="30" suffix="+" /></h3>
            <p>Repositories</p>
          </div>
          <div className="glass activity-stat-card">
            <FaBook size={28} className="text-gradient" />
            <h3 className="brand-font"><Counter value="840" suffix="+" /></h3>
            <p>GitHub Commits</p>
          </div>
        </div>

        <div className="activity-details-layout" style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : '1.3fr 1fr', 
          gap: '30px', 
          marginTop: '40px' 
        }}>
          
          {/* Left Column: Contribution Grid (Desktop/Laptop only) */}
          {!isMobile && (
            <motion.div 
              className="glass activity-card-main"
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              style={{ padding: '30px', borderRadius: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
            >
              <h3 className="brand-font" style={{ marginBottom: '15px', color: '#fff', fontSize: '1.3rem', textAlign: 'left' }}>Contributions in the Past 6 Months</h3>
              
              {/* Mock GitHub Calendar Grid */}
              <div className="github-calendar-grid" style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gap: '4px',
                width: '100%',
                overflowX: 'auto',
                paddingBottom: '10px'
              }}>
                {cellLevels.map((level, idx) => (
                  <div 
                    key={idx} 
                    className={`calendar-cell level-${level}`} 
                    style={{
                      aspectRatio: '1',
                      borderRadius: '2px',
                      backgroundColor: level === 3 ? '#00f0ff' : 
                                      level === 2 ? '#9d00ff' : 
                                      level === 1 ? 'rgba(0, 240, 255, 0.25)' : 
                                      'rgba(255, 255, 255, 0.05)',
                      boxShadow: level === 3 ? '0 0 5px #00f0ff' : 
                                 level === 2 ? '0 0 5px #9d00ff' : 'none'
                    }}
                  />
                ))}
              </div>
              <div className="calendar-legend" style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                <span>Less</span>
                <div style={{ width: '10px', height: '10px', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '2px' }}></div>
                <div style={{ width: '10px', height: '10px', backgroundColor: 'rgba(0, 240, 255, 0.25)', borderRadius: '2px' }}></div>
                <div style={{ width: '10px', height: '10px', backgroundColor: '#9d00ff', borderRadius: '2px' }}></div>
                <div style={{ width: '10px', height: '10px', backgroundColor: '#00f0ff', borderRadius: '2px' }}></div>
                <span>More</span>
              </div>
            </motion.div>
          )}

          {/* Right Column: Programming Languages Chart */}
          <motion.div 
            className="glass activity-card-main"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ padding: '30px', borderRadius: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
          >
            <h3 className="brand-font" style={{ marginBottom: '25px', color: '#fff', fontSize: '1.3rem', textAlign: 'left' }}>Languages Distribution</h3>
            <div className="languages-chart-list" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {languages.map((l, idx) => (
                <div key={idx} className="lang-bar-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.95rem' }}>
                    <span style={{ color: '#fff', fontWeight: 500 }}>{l.name}</span>
                    <span style={{ color: 'var(--text-muted)' }}>{l.percentage}%</span>
                  </div>
                  <div className="progress-track" style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                    <motion.div 
                      className="progress-fill"
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${l.percentage}%` } : {}}
                      transition={{ delay: idx * 0.1, duration: 1, ease: 'easeOut' }}
                      style={{
                        height: '100%',
                        background: l.color,
                        boxShadow: `0 0 10px ${l.color}`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DevelopmentActivity;
