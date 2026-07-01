import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaFileAlt, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import confetti from 'canvas-confetti';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [status, setStatus] = useState('');

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#00f0ff', '#9d00ff', '#ffffff']
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Sending...");

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.warn("EmailJS credentials not configured in environment variables. Falling back to simulation.");
      setTimeout(() => {
        setStatus("Sent!");
        triggerConfetti();
        e.target.reset();
        setTimeout(() => setStatus(""), 3000);
      }, 1500);
      return;
    }

    emailjs.sendForm(serviceId, templateId, e.target, publicKey)
      .then(() => {
        setStatus("Sent!");
        triggerConfetti();
        e.target.reset();
        setTimeout(() => setStatus(""), 3000);
      }, (error) => {
        console.error("EmailJS Error:", error);
        setStatus("Error!");
        setTimeout(() => setStatus(""), 3000);
      });
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container" ref={ref}>
        <motion.div 
          className="glass contact-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Info Card Left Column */}
          <div className="contact-info">
            <div>
              <h2 className="brand-font" style={{ fontSize: '2.5rem', marginBottom: '20px', lineHeight: '1.2' }}>
                Let's Build <span className="text-gradient">Something Amazing</span> Together
              </h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '1rem' }}>
                Whether you have an internship opening, a full-stack project, or want to collaborate on engineering solutions, my inbox is always open. Let's trace nodes and deploy builds!
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', marginTop: '35px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#fff' }}>
                  <FaEnvelope className="text-gradient" size={20} />
                  <a href="mailto:priyankagholap182@gmail.com" className="contact-link" style={{ fontSize: '0.95rem' }}>priyankagholap182@gmail.com</a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#fff' }}>
                  <FaPhoneAlt className="text-gradient" size={18} />
                  <a href="tel:+919076397339" className="contact-link" style={{ fontSize: '0.95rem' }}>+91 9076397339</a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#fff' }}>
                  <FaMapMarkerAlt className="text-gradient" size={20} />
                  <a href="https://maps.google.com/?q=Dombivli,+Maharashtra,+India" target="_blank" rel="noreferrer" className="contact-link" style={{ fontSize: '0.95rem' }}>Dombivli, Maharashtra, India</a>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card Right Column */}
          <div className="contact-form-container">
            <form onSubmit={handleSubmit} className="contact-form" style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              
              {/* Premium Input Groups */}
              <div className="form-group-premium">
                <label htmlFor="user_name">Your Name</label>
                <input 
                  type="text" 
                  id="user_name" 
                  name="user_name" 
                  required 
                  placeholder="e.g. John Doe" 
                />
              </div>
              
              <div className="form-group-premium">
                <label htmlFor="user_email">Your Email</label>
                <input 
                  type="email" 
                  id="user_email" 
                  name="user_email" 
                  required 
                  placeholder="e.g. john@example.com" 
                />
              </div>
              
              <div className="form-group-premium">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  required 
                  rows="4" 
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>
              
              <motion.button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%', marginTop: '10px' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={status === 'Sending...'}
              >
                {status === "Sent!" ? <><FaCheckCircle /> Transmission Sent 🚀</> : 
                 status === "Error!" ? <><FaExclamationCircle /> Transmission Failed</> :
                 status === "Sending..." ? "Transmitting..." : "Send Message"}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
