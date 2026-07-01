import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
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
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          About <span className="text-gradient">Me</span>
        </motion.h2>

        <div className="about-grid">
          {aboutCards.map((card, idx) => (
            <motion.div
              key={idx}
              className="glass about-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              whileHover={{ 
                y: -5,
                borderColor: 'var(--accent-cyan)',
                boxShadow: '0 10px 25px rgba(0, 240, 255, 0.15)'
              }}
            >
              <div className="card-header" style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                <div className="card-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {card.icon}
                </div>
                <h3 className="brand-font" style={{ fontSize: '1.4rem', color: '#fff', fontWeight: 600 }}>{card.title}</h3>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6' }}>{card.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
