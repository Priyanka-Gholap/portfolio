import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaBolt, FaPuzzlePiece, FaLayerGroup, FaFileCode, FaMobileAlt, FaServer, FaDatabase, FaGraduationCap } from 'react-icons/fa';

const whyHireCards = [
  {
    icon: <FaBolt />,
    title: "Quick Learner",
    description: "Can pick up libraries and development setups rapidly. Actively exploring dev containerization (Docker) and type-safety (TypeScript)."
  },
  {
    icon: <FaPuzzlePiece />,
    title: "Problem Solver",
    description: "Solid theoretical base in Data Structures and Algorithms with a current B.E. Computer Engineering CGPA of 8.06/10."
  },
  {
    icon: <FaLayerGroup />,
    title: "Full Stack Developer",
    description: "MERN developer who designs interactive React clients and links them to database-backed Node/Express server architectures."
  },
  {
    icon: <FaFileCode />,
    title: "Clean Code Advocate",
    description: "Follows modular styling paradigms, structures projects using DRY principles, and organizes servers following clean MVC designs."
  },
  {
    icon: <FaMobileAlt />,
    title: "Responsive UI Architect",
    description: "Builds responsive views designed for any screen width (mobile, tablet, desktop) using modern flexbox, CSS Grid, and media queries."
  },
  {
    icon: <FaServer />,
    title: "RESTful API Builder",
    description: "Architects secure backend routes with structured controller code, database validations, and status-appropriate returns."
  },
  {
    icon: <FaDatabase />,
    title: "Database Architect",
    description: "Experienced in structuring MongoDB database tables using Mongoose schema validation, and writing relational MySQL queries."
  },
  {
    icon: <FaGraduationCap />,
    title: "Continuous Exploration",
    description: "Curious and constantly scanning for newer infrastructure paradigms, automated test pipelines, and cloud instances."
  }
];

const WhyHireMe = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="why-hire" className="why-hire-section">
      <div className="container" ref={ref}>
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Why <span className="text-gradient">Hire Me</span>
        </motion.h2>

        <div className="why-hire-grid">
          {whyHireCards.map((card, idx) => (
            <motion.div
              key={idx}
              className="glass why-hire-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              whileHover={{ 
                y: -5,
                borderColor: 'var(--accent-cyan)',
                boxShadow: '0 8px 25px rgba(0, 240, 255, 0.12)'
              }}
            >
              <div className="why-hire-icon text-gradient">
                {card.icon}
              </div>
              <h3 className="brand-font">{card.title}</h3>
              <p>{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyHireMe;
