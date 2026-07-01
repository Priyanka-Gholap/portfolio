import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
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
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="journey" className="journey-section">
      <div className="container" ref={ref}>
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Engineering <span className="text-gradient">Journey</span>
        </motion.h2>

        <div className="journey-timeline">
          <div className="journey-line"></div>
          {journeySteps.map((step, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div 
                key={idx} 
                className={`journey-item ${isEven ? 'item-left' : 'item-right'}`}
              >
                {/* Timeline center node */}
                <motion.div 
                  className="journey-node text-gradient"
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: idx * 0.15, type: 'spring', stiffness: 150 }}
                >
                  {step.icon}
                </motion.div>

                {/* Timeline content box */}
                <motion.div 
                  className="glass journey-content-card"
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: idx * 0.15, duration: 0.6, ease: 'easeOut' }}
                  whileHover={{ 
                    scale: 1.02,
                    borderColor: 'var(--accent-purple)',
                    boxShadow: '0 5px 20px rgba(157, 0, 255, 0.15)'
                  }}
                >
                  <span className="journey-year text-gradient">{step.year}</span>
                  <h3 className="brand-font">{step.title}</h3>
                  <p>{step.description}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EngineeringJourney;
