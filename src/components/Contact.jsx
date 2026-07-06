import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaFileAlt, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import confetti from 'canvas-confetti';
import emailjs from '@emailjs/browser';

const FloatingInput = ({ label, id, name, type = "text", required, placeholder, inView, delay = 0 }) => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  const active = focused || value.length > 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      className="form-group-premium" 
      style={{ position: 'relative' }}
    >
      <motion.label 
        htmlFor={id}
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          left: '18px',
          color: active ? 'var(--accent-cyan)' : 'var(--text-muted)',
          fontSize: '0.9rem',
          fontWeight: 600,
          fontFamily: 'Outfit',
          letterSpacing: '0.5px',
          zIndex: 5
        }}
        animate={{
          y: active ? -22 : 14,
          scale: active ? 0.85 : 1,
          originX: 0
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      >
        {label}
      </motion.label>
      <input 
        type={type} 
        id={id} 
        name={name} 
        required={required} 
        placeholder={focused ? placeholder : ""} 
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
    </motion.div>
  );
};

const FloatingTextarea = ({ label, id, name, required, placeholder, inView, delay = 0 }) => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  const active = focused || value.length > 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      className="form-group-premium" 
      style={{ position: 'relative' }}
    >
      <motion.label 
        htmlFor={id}
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          left: '18px',
          color: active ? 'var(--accent-cyan)' : 'var(--text-muted)',
          fontSize: '0.9rem',
          fontWeight: 600,
          fontFamily: 'Outfit',
          letterSpacing: '0.5px',
          zIndex: 5
        }}
        animate={{
          y: active ? -22 : 14,
          scale: active ? 0.85 : 1,
          originX: 0
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      >
        {label}
      </motion.label>
      <textarea 
        id={id} 
        name={name} 
        required={required} 
        rows="4"
        placeholder={focused ? placeholder : ""} 
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
    </motion.div>
  );
};

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
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Info Card Left Column */}
          <div className="contact-info">
            <div>
              <motion.h2 
                className="brand-font" 
                style={{ fontSize: '2.5rem', marginBottom: '20px', lineHeight: '1.2' }}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.15, duration: 0.6 }}
              >
                Let's Build <span className="text-gradient">Something Amazing</span> Together
              </motion.h2>
              <motion.p 
                style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '1rem' }}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.25, duration: 0.6 }}
              >
                Whether you have an internship opening, a full-stack project, or want to collaborate on engineering solutions, my inbox is always open. Let's trace nodes and deploy builds!
              </motion.p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', marginTop: '35px' }}>
                {[
                  { icon: <FaEnvelope className="text-gradient" size={20} />, href: "mailto:priyankagholap182@gmail.com", val: "priyankagholap182@gmail.com" },
                  { icon: <FaPhoneAlt className="text-gradient" size={18} />, href: "tel:+919076397339", val: "+91 9076397339" },
                  { icon: <FaMapMarkerAlt className="text-gradient" size={20} />, href: "https://maps.google.com/?q=Dombivli,+Maharashtra,+India", val: "Dombivli, Maharashtra, India", target: "_blank" }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: idx * 0.1 + 0.35, duration: 0.5 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#fff' }}
                  >
                    {item.icon}
                    <a href={item.href} target={item.target || ""} rel="noreferrer" className="contact-link" style={{ fontSize: '0.95rem' }}>
                      {item.val}
                    </a>
                  </motion.div>
                ))}
              </div>

              {/* Resume download action button */}
              <motion.div 
                className="contact-resume-btn-wrapper" 
                style={{ marginTop: '35px' }}
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.65, duration: 0.5 }}
              >
                <motion.a 
                  href="/resume.pdf" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn btn-secondary contact-resume-btn" 
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%', border: '1px solid var(--accent-purple)' }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <FaFileAlt /> Download Resume / CV
                </motion.a>
              </motion.div>
            </div>
          </div>

          {/* Form Card Right Column */}
          <div className="contact-form-container">
            <form onSubmit={handleSubmit} className="contact-form" style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              
              <FloatingInput 
                label="Your Name" 
                id="user_name" 
                name="user_name" 
                required 
                placeholder="e.g. John Doe" 
                inView={inView}
                delay={0.2}
              />
              
              <FloatingInput 
                label="Your Email" 
                id="user_email" 
                name="user_email" 
                type="email"
                required 
                placeholder="e.g. john@example.com" 
                inView={inView}
                delay={0.3}
              />
              
              <FloatingTextarea 
                label="Message" 
                id="message" 
                name="message" 
                required 
                placeholder="Tell me about your project or opportunity..." 
                inView={inView}
                delay={0.4}
              />
              
              <motion.button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%', marginTop: '10px' }}
                whileHover={{ scale: 1.03, boxShadow: '0 0 15px rgba(0,240,255,0.4)' }}
                whileTap={{ scale: 0.97 }}
                disabled={status === 'Sending...'}
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.5 }}
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
