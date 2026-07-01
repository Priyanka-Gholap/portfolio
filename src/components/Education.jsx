import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
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
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="education" className="education">
      <div className="container" ref={ref}>
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          My <span className="text-gradient">Education</span>
        </motion.h2>

        <div className="timeline">
          {educationData.map((edu, idx) => (
            <motion.div 
              key={idx}
              className="timeline-item glass"
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: idx * 0.2, duration: 0.5 }}
            >
              <div className="timeline-icon">
                <FaGraduationCap size={20} />
              </div>
              <div className="timeline-content">
                <span className="timeline-period">{edu.period}</span>
                <h3 className="timeline-title brand-font">{edu.institution}</h3>
                <h4 className="timeline-subtitle">{edu.title}</h4>
                {edu.details && <p className="timeline-details">{edu.details}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
