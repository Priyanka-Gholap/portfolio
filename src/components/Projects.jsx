import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Tilt from 'react-parallax-tilt';
import { FaGithub, FaGlobe, FaTimes, FaDatabase, FaLock, FaMobileAlt, FaCloudUploadAlt, FaBrain, FaExchangeAlt, FaNetworkWired } from 'react-icons/fa';

const featuredProjects = [
  {
    title: 'Smart Society Hub',
    description: 'An enterprise-grade multi-tenant SaaS application built to digitize residential society operations. Features strict tenant data isolation, role-based access control (RBAC) gating endpoints for Admins and Residents, and a centralized complaints ticket tracking workflow. The dashboard aggregates real-time metrics, helping society administrators manage maintenance billing, track service staff schedules, and streamline communication across 100+ apartment units.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'REST APIs'],
    github: 'https://github.com/Priyanka-Gholap/smart-society-hub.git',
    link: '#',
    categories: ['MERN', 'React', 'Backend', 'Frontend'],
    metrics: {
      responsive: true,
      restApis: true,
      auth: true,
      database: true,
      ai: false,
      roleBased: true,
      realTime: false,
      deployment: false
    },
    caseStudy: {
      overview: "Smart Society Hub is a multi-tenant Software-as-a-Service (SaaS) application designed to automate residential society management workflows, reducing administrative friction by 40%.",
      architecture: "Client (React) -> Express API Layer -> MongoDB Schema (Mongoose). Features strict tenant data isolation, role-based endpoint gating (Admin/Resident), and automated ticket lifecycles.",
      folderStructure: `
server/
├── config/             # DB & Config setups
├── controllers/        # Society, ticket, & user operations
├── middleware/         # JWT verify & RBAC gates
├── models/             # Mongoose schemas (Tenant-Isolated)
├── routes/             # REST endpoints
└── server.js           # App initialization
      `,
      databaseDesign: "Mongoose Multi-Tenant Schemas:\n- UserSchema (Name, Email, Password, Role, SocietyId)\n- SocietySchema (Name, Location, RegistrationNumber)\n- ComplaintSchema (Title, Details, Status, RaisedBy, AssignedTo, SocietyId)",
      apiFlow: "1. POST /api/auth/register -> Creates Society and Admin User\n2. POST /api/auth/login -> Sign JWT payload containing role and societyId\n3. GET /api/complaints -> Middleware verifies JWT, filters complaints matching req.user.societyId\n4. POST /api/complaints/create -> Residents post ticket, Admin sees update on Dashboard",
      challenges: "Enforcing strict data isolation in a single MongoDB database. Resolved by appending a unique 'societyId' to all document schemas and creating pre-find Mongoose query middlewares to filter results automatically.",
      lessons: "Gained structural understanding of multi-tenancy SaaS architectures, JWT payloads for role controls, and structural data validation middlewares.",
      future: "Add socket-based real-time push notifications for ticket updates, and integrate Stripe subscription plans for society admins."
    }
  },
  {
    title: 'ToggleNest',
    description: 'A collaborative task and project management dashboard featuring robust JWT-based user authentication, workspace segregation, and a live tracking panel. It enables team members to organize task lists, assign items, and toggle statuses in real time. The frontend communicates with a RESTful Express server, using optimized state updates to synchronize client views with MongoDB Atlas changes instantaneously.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
    github: 'https://github.com/ValayaDase/ToggleNest.git',
    link: 'https://togglenest123.netlify.app/',
    categories: ['MERN', 'React', 'Backend', 'Frontend'],
    metrics: {
      responsive: true,
      restApis: true,
      auth: true,
      database: true,
      ai: false,
      roleBased: false,
      realTime: true,
      deployment: true
    },
    caseStudy: {
      overview: "ToggleNest is a collaborative task and project workflow tracker, allowing users to create task lists, assign tasks, toggle completed states, and visualize progress metrics.",
      architecture: "React.js frontend state manager interacting with a RESTful Express.js node server, storing document data inside MongoDB Atlas cloud databases.",
      folderStructure: `
src/
├── components/         # Reusable TaskCards, Boards
├── context/            # TaskState context provider
├── hooks/              # Custom useTasks hooks
└── App.jsx             # State routes
      `,
      databaseDesign: "Collections:\n- User (username, email, passwordHash)\n- Task (title, desc, status, assignedUser, parentWorkspaceId)",
      apiFlow: "1. GET /api/tasks -> Pulls active tasks from User context\n2. PUT /api/tasks/:id/toggle -> Toggles status field from Todo to Done\n3. Front-end triggers UI state rerender on response, reflecting completion",
      challenges: "Keeping React state in sync with Express DB updates without full-page reloads. Solved by returning the modified document in API returns, and updating the state array using immutability mappings.",
      lessons: "Learned context APIs for shared dashboard states, custom react hooks, and Mongoose CRUD operations.",
      future: "Implement WebSockets for real-time task collaborative moves across boards."
    }
  },
  {
    title: 'CineMatch',
    description: 'A dynamic client-side movie discovery platform powered by the TMDb API. It features interactive category filtering, live debounced search queries, and custom local storage watchlists. Built using React context to manage global user states, the application includes a quiz-based recommendation module that suggests curated films by analyzing genre and release date preferences.',
    tech: ['React.js', 'TMDb API', 'CSS', 'JavaScript'],
    github: '#',
    link: 'https://cinematch-4bc6f.web.app',
    categories: ['React', 'Frontend'],
    metrics: {
      responsive: true,
      restApis: true,
      auth: false,
      database: false,
      ai: false,
      roleBased: false,
      realTime: false,
      deployment: true
    },
    caseStudy: {
      overview: "CineMatch is a movie exploration client utilizing public APIs to filter, search, and catalog 500,000+ film records.",
      architecture: "Single Page Application (React) fetching asynchronous data directly from TMDb REST endpoint servers.",
      folderStructure: `
src/
├── components/         # MovieCard, SearchBar, Filters
├── services/           # tmdbApi axios instance
└── App.jsx             # Router and hooks
      `,
      databaseDesign: "None (Client only, calls public TMDb database via HTTP). Local Storage is used to save users' custom watchlist arrays.",
      apiFlow: "1. User types in search bar -> React triggers debounced state handler\n2. API service calls GET tmdb.com/search/movie?query=text\n3. Results map to grid layout. Tooltips display details on hover.",
      challenges: "Handling rapid keystrokes triggering duplicate API calls, resulting in rate-limit throttling. Solved by implementing custom debounce timeout hooks, restricting calls to 400ms gaps.",
      lessons: "Learned debouncing techniques, API payload parsing, axios interceptors, and hosting setups.",
      future: "Build a Node Express wrapper server to handle server-side cache and session watchlists."
    }
  },
  {
    title: 'AI Resume Analyzer',
    description: 'A machine learning platform designed to streamline recruitment. It parses uploaded resume PDFs using custom regex and tokenizers, extracts key skill terms, and runs TF-IDF vector similarity models to compare resumes against job descriptions. The server returns detailed relevance score metrics, keyword match percentages, and automated suggestions for missing skills.',
    tech: ['Python', 'Machine Learning', 'Pandas', 'NLP'],
    github: 'https://github.com/Priyanka-Gholap/ai-resume-analyzer.git',
    link: 'https://ai-resume-analyzer-bxmz.onrender.com',
    categories: ['AI/ML', 'Backend'],
    metrics: {
      responsive: true,
      restApis: true,
      auth: false,
      database: false,
      ai: true,
      roleBased: false,
      realTime: false,
      deployment: true
    },
    caseStudy: {
      overview: "AI Resume Analyzer is a backend automation service using machine learning algorithms to compare candidate profiles against job postings.",
      architecture: "FastAPI / Flask server running Python NLP algorithms, parsing uploaded resume PDFs and matching them using vector similarities.",
      folderStructure: `
analyzer/
├── model/              # NLP TF-IDF vectorizers
├── parser/             # PDF text extractors
├── app.py              # Server routing endpoints
└── requirements.txt    # Python packages
      `,
      databaseDesign: "None. Custom vector data is loaded and processed in-memory for immediate matching outputs.",
      apiFlow: "1. Client uploads PDF -> POST /api/analyze\n2. Server extracts PDF text, performs NLP stopword cleans\n3. Computes cosine similarity between resume text vector and job description vector\n4. Returns percentage matching metrics to client dashboard",
      challenges: "Accurately parsing text formatting columns in multi-column PDF resumes. Resolved by using advanced PDF text extraction libraries and custom regex parsers to separate contact info from skills.",
      lessons: "Practiced data preprocessing, TF-IDF algorithms, vector models, and hosting Python apps on Render.",
      future: "Incorporate deep learning transformers (BERT) to perform semantic resume matching instead of simple keyword checks."
    }
  },
  {
    title: 'Virtual Banking System',
    description: 'A multi-threaded desktop banking simulation application developed in Java. It models core banking operations including secure user logins, account creation, deposits, withdrawals, and inter-account transfers. The system utilizes synchronized thread blocks to prevent transaction collisions, maintains local audit logs, and formats structured ledger receipts using Object-Oriented patterns.',
    tech: ['Java'],
    github: '#',
    link: '#',
    categories: ['Java', 'Backend'],
    metrics: {
      responsive: false,
      restApis: false,
      auth: true,
      database: true,
      ai: false,
      roleBased: false,
      realTime: false,
      deployment: false
    },
    caseStudy: {
      overview: "Virtual Banking System is a console and desktop-based Java application simulating standard bank ledger operations.",
      architecture: "Java application implementing modular service structures, file IO logging, and Object-Oriented principles.",
      folderStructure: `
src/
├── model/              # Account, Customer, Transaction records
├── service/            # BankManager, LedgerControllers
└── Main.java           # Main runner
      `,
      databaseDesign: "Relational database simulation. Data is persisted locally inside serialized CSV/JSON data files.",
      apiFlow: "1. User logins with account number and PIN\n2. Banking services execute actions: deposit, withdraw, or transfer\n3. Ledger updates records, prints receipts, and writes transaction logs to local file storage",
      challenges: "Ensuring thread safety when executing concurrent balance transfers. Resolved by implementing synchronized transaction blocks in Java to lock accounts during balance recalculations.",
      lessons: "Gained strong base in Java OOP structures, multi-threading, file inputs/outputs, and unit testing.",
      future: "Migrate the backend logic into a Spring Boot server and link it to a PostgreSQL database."
    }
  },
  {
    title: 'DSA Learning Platform',
    description: 'An educational web portal designed to visualize sorting and pathfinding algorithms in real-time. Built using React and Framer Motion, it translates array swaps and traversal states into interactive color-coded bar animations. It uses asynchronous generator yielding to control execution speed, allowing students to pause, step, and analyze runtime complexity traces.',
    tech: ['React.js', 'JavaScript', 'Framer Motion', 'CSS'],
    github: 'https://github.com/Priyanka-Gholap/DSA-Master.git',
    link: 'https://dsa-master-phi.vercel.app/',
    categories: ['React', 'Frontend'],
    metrics: {
      responsive: true,
      restApis: false,
      auth: false,
      database: false,
      ai: false,
      roleBased: false,
      realTime: false,
      deployment: false
    },
    caseStudy: {
      overview: "DSA Learning Platform is an educational visualization tool designed to help students trace and inspect execution lines of sorting and search algorithms.",
      architecture: "React frontend using state-based array hooks. Node positions and steps are animated using Framer Motion.",
      folderStructure: `
src/
├── components/         # VisualArray, Controls, AlgoritmList
├── algorithms/         # BubbleSort, BinarySearch, MergeSort traces
└── App.jsx             # Main state
      `,
      databaseDesign: "None. All sorting computations and state arrays are executed locally inside the browser thread.",
      apiFlow: "1. User selects Bubble Sort and clicks 'Visualize'\n2. Algorithm helper yields execution states (index, swapping, sorted)\n3. Component maps indices to height bars, animating colors and swaps with Framer Motion springs",
      challenges: "Rendering large sorting arrays smoothly without freezing the UI. Solved by executing steps using custom async sleep hooks, allowing the main rendering thread to process frames between swaps.",
      lessons: "Mastered async states in React, generator functions, and Framer Motion spring layouts.",
      future: "Add interactive quizzes and visual representations for tree and graph traversals."
    }
  },
  {
    title: 'RCB Verse',
    description: 'An immersive, sports-themed frontend fan portal designed for the Royal Challengers Bengaluru cricket franchise. It features high-fidelity CSS grid layouts, interactive player roster cards with 3D parallax hover perspectives, and dynamic team history timelines. Engineered with lazy-loading graphic configurations and responsive assets to ensure fast page load times and fluid mobile animations.',
    tech: ['React.js', 'JavaScript', 'CSS', 'Framer Motion'],
    github: 'https://github.com/Priyanka-Gholap/rcbverse.git',
    link: 'https://rcbverse.netlify.app/',
    categories: ['React', 'Frontend'],
    metrics: {
      responsive: true,
      restApis: false,
      auth: false,
      database: false,
      ai: false,
      roleBased: false,
      realTime: false,
      deployment: true
    },
    caseStudy: {
      overview: "RCB Verse is an immersive, styled fan portal commemorating Royal Challengers Bengaluru, featuring interactive cards and team profiles.",
      architecture: "Static Single Page Application (React) utilizing modular CSS modules and animation hooks.",
      folderStructure: `
src/
├── assets/             # Team graphics & brand colors
├── components/         # RosterCard, FanZone, StatsSection
└── App.jsx             # Grid routes
      `,
      databaseDesign: "None. Roster data is cataloged inside a local static JSON configuration file.",
      apiFlow: "1. User enters site -> Header triggers entry animations\n2. Hovering on player cards triggers 3D Tilt perspective\n3. Clicks reveal detailed historical cricketer performance stats",
      challenges: "Maintaining fluid, lag-free transitions on mobile when loading numerous graphics. Resolved by using responsive image tags, lazy-loading offscreen elements, and using CSS transforms.",
      lessons: "Polished brand styling skills, responsive grids, and perspective mouse transforms.",
      future: "Link to a Node scraper server that updates cricket matches live using web scrapers."
    }
  }
];

const SpotlightCard = ({ children, isActive, onClick }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <Tilt
      tiltMaxAngleX={8}
      tiltMaxAngleY={8}
      scale={1.01}
      transitionSpeed={800}
      style={{ height: '100%' }}
    >
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setOpacity(1)}
        onMouseLeave={() => setOpacity(0)}
        onClick={onClick}
        className="glass"
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '36px 40px',
          cursor: 'pointer',
          border: isActive ? '1px solid var(--accent-cyan)' : '1px solid rgba(255,255,255,0.06)',
          background: isActive ? 'rgba(0, 240, 255, 0.04)' : 'rgba(255, 255, 255, 0.015)',
          transition: 'border 0.3s ease, background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
          boxShadow: isActive ? '0 10px 25px rgba(0, 240, 255, 0.15)' : 'none',
          borderRadius: '20px',
          textAlign: 'left',
          height: '100%'
        }}
      >
        <div
          style={{
            pointerEvents: 'none',
            position: 'absolute',
            inset: 0,
            opacity,
            transition: 'opacity 0.3s ease',
            background: `radial-gradient(350px circle at ${position.x}px ${position.y}px, rgba(157, 0, 255, 0.2), transparent 45%)`,
            zIndex: 0
          }}
        />
        <div style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </div>
      </div>
    </Tilt>
  );
};

const Projects = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [activeProject, setActiveProject] = useState(featuredProjects[0]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768; // Mobile threshold

  const filters = ['All', 'React', 'MERN', 'AI/ML', 'Java', 'Frontend', 'Backend'];

  const filteredProjects = activeFilter === 'All' 
    ? featuredProjects 
    : featuredProjects.filter(p => p.categories.includes(activeFilter));

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    const matches = filter === 'All' ? featuredProjects : featuredProjects.filter(p => p.categories.includes(filter));
    if (matches.length > 0) {
      setActiveProject(matches[0]);
    }
  };

  const renderMetricBadge = (icon, text, active, delayIdx = 0) => {
    if (!active) return null;
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: delayIdx * 0.05 + 0.15, type: 'spring', stiffness: 150 }}
        style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '6px', 
          padding: '6px 12px', 
          background: 'rgba(255, 255, 255, 0.03)', 
          border: '1px solid rgba(255, 255, 255, 0.06)', 
          borderRadius: '20px', 
          fontSize: '0.8rem',
          color: '#fff' 
        }}
      >
        <span className="text-gradient" style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>
        <span>{text}</span>
      </motion.div>
    );
  };

  const renderMobileProjectCard = (proj) => {
    return (
      <div 
        key={proj.title}
        className="glass mobile-project-card"
        style={{
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          background: 'rgba(255, 255, 255, 0.015)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'left',
          marginBottom: '24px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          transition: 'all 0.3s ease'
        }}
      >
        {/* Visual Banner Placeholder */}
        <div style={{
          height: '140px',
          background: 'var(--gradient-neon)',
          opacity: 0.85,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            zIndex: 1
          }} />
          <div style={{ fontSize: '3.5rem', color: '#fff', zIndex: 2, filter: 'drop-shadow(0 0 15px rgba(0,240,255,0.6))' }}>
            {proj.title === 'Smart Society Hub' && <FaDatabase />}
            {proj.title === 'ToggleNest' && <FaLock />}
            {proj.title === 'CineMatch' && <FaGlobe />}
            {proj.title === 'AI Resume Analyzer' && <FaBrain />}
            {proj.title === 'Virtual Banking System' && <FaExchangeAlt />}
            {proj.title === 'DSA Learning Platform' && <FaNetworkWired />}
            {proj.title === 'RCB Verse' && <FaMobileAlt />}
          </div>
        </div>

        {/* Card Content */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <h3 className="brand-font" style={{ fontSize: '1.4rem', color: '#fff', margin: 0, fontWeight: 600 }}>
            {proj.title}
          </h3>
          
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0, lineHeight: '1.5' }}>
            {proj.description}
          </p>

          {/* Tech Badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {proj.tech.map((t, i) => (
              <span key={i} style={{ 
                fontSize: '0.75rem', 
                padding: '4px 10px', 
                background: 'rgba(157, 0, 255, 0.08)', 
                color: 'var(--accent-purple)', 
                border: '1px solid rgba(157, 0, 255, 0.2)',
                borderRadius: '6px',
                fontWeight: 600
              }}>
                {t}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '5px' }}>
            <button 
              onClick={() => setSelectedCaseStudy(proj)}
              className="btn btn-secondary" 
              style={{ flex: 1, padding: '10px', fontSize: '0.85rem', border: '1px solid var(--accent-purple)', background: 'rgba(157, 0, 255, 0.02)' }}
            >
              Case Study
            </button>
            
            {proj.github !== '#' && proj.github !== '' && (
              <a href={proj.github} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ padding: '10px 12px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.85rem', border: '1px solid var(--text-muted)' }}>
                <FaGithub /> Repo
              </a>
            )}
            
            {proj.link !== '#' && proj.link !== '' && (
              <a href={proj.link} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '10px 15px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.85rem' }}>
                <FaGlobe /> Preview
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Render responsive mobile view
  if (isMobile) {
    return (
      <section id="projects" className="projects">
        <div className="container" ref={ref}>
          {/* Title */}
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
          >
            Selected <span className="text-gradient">Projects</span>
          </motion.h2>

          {/* Filter Buttons */}
          <div className="projects-filter-bar" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '30px' }}>
            {filters.map((f, i) => (
              <button
                key={i}
                onClick={() => handleFilterClick(f)}
                className={`filter-btn ${activeFilter === f ? 'active' : ''}`}
                style={{
                  padding: '6px 14px',
                  borderRadius: '30px',
                  border: activeFilter === f ? '1px solid var(--accent-cyan)' : '1px solid rgba(255,255,255,0.08)',
                  background: activeFilter === f ? 'rgba(0, 240, 255, 0.1)' : 'rgba(255,255,255,0.02)',
                  color: activeFilter === f ? '#fff' : 'var(--text-muted)',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Mobile list of projects */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {filteredProjects.map((proj) => renderMobileProjectCard(proj))}
          </div>
        </div>

        {/* Case Study Modal (Shared) */}
        <AnimatePresence>
          {selectedCaseStudy && (
            <motion.div 
              className="case-study-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'rgba(5, 5, 8, 0.95)',
                backdropFilter: 'blur(15px)',
                WebkitBackdropFilter: 'blur(15px)',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px'
              }}
            >
              <motion.div 
                className="glass case-study-modal"
                initial={{ y: 50, scale: 0.95 }}
                animate={{ y: 0, scale: 1 }}
                exit={{ y: 50, scale: 0.95 }}
                transition={{ type: 'spring', damping: 25, stiffness: 180 }}
                style={{
                  width: '100%',
                  maxWidth: '900px',
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  padding: isMobile ? '24px' : '40px',
                  borderRadius: '20px',
                  border: '1px solid var(--accent-purple)',
                  boxShadow: '0 10px 40px rgba(157, 0, 255, 0.2)',
                  position: 'relative',
                  textAlign: 'left'
                }}
              >
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedCaseStudy(null)}
                  style={{
                    position: 'absolute',
                    top: '20px', right: '20px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#fff',
                    borderRadius: '50%',
                    width: '40px', height: '40px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 10,
                    transition: 'all 0.3s'
                  }}
                  className="close-modal-btn"
                >
                  <FaTimes size={18} />
                </button>

                {/* Case Study Content */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <span className="text-gradient" style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                    Project Case Study
                  </span>
                  <h2 className="brand-font" style={{ fontSize: isMobile ? '1.8rem' : '3rem', color: '#fff', marginTop: '5px', marginBottom: '20px' }}>
                    {selectedCaseStudy.title}
                  </h2>

                  <div className="case-study-content-grid" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    
                    <div>
                      <h3 className="brand-font text-gradient" style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Overview</h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>{selectedCaseStudy.caseStudy.overview}</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                      <div>
                        <h3 className="brand-font text-gradient" style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Architecture Flow</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>{selectedCaseStudy.caseStudy.architecture}</p>
                      </div>
                      <div>
                        <h3 className="brand-font text-gradient" style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Project Role</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>Sole Developer - Responsible for client-side routing, state architectures, backend controller logic, and database schemas integration.</p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                      <div>
                        <h3 className="brand-font text-gradient" style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Folder Structure</h3>
                        <pre style={{ 
                          background: 'rgba(0,0,0,0.3)', 
                          padding: '12px', 
                          borderRadius: '10px', 
                          color: 'var(--accent-cyan)', 
                          fontSize: '0.8rem',
                          fontFamily: 'monospace',
                          overflowX: 'auto',
                          border: '1px solid rgba(255,255,255,0.05)'
                        }}>{selectedCaseStudy.caseStudy.folderStructure}</pre>
                      </div>
                      <div>
                        <h3 className="brand-font text-gradient" style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Database Schema Design</h3>
                        <pre style={{ 
                          background: 'rgba(0,0,0,0.3)', 
                          padding: '12px', 
                          borderRadius: '10px', 
                          color: 'var(--accent-purple)', 
                          fontSize: '0.8rem',
                          fontFamily: 'monospace',
                          overflowX: 'auto',
                          border: '1px solid rgba(255,255,255,0.05)'
                        }}>{selectedCaseStudy.caseStudy.databaseDesign}</pre>
                      </div>
                    </div>

                    <div>
                      <h3 className="brand-font text-gradient" style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Core API Workflow</h3>
                      <pre style={{ 
                        background: 'rgba(0,0,0,0.3)', 
                        padding: '12px', 
                        borderRadius: '10px', 
                        color: 'var(--text-main)', 
                        fontSize: '0.8rem',
                        fontFamily: 'monospace',
                        overflowX: 'auto',
                        border: '1px solid rgba(255,255,255,0.05)',
                        whiteSpace: 'pre-wrap'
                      }}>{selectedCaseStudy.caseStudy.apiFlow}</pre>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                      <div>
                        <h3 className="brand-font text-gradient" style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Key Technical Challenge</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>{selectedCaseStudy.caseStudy.challenges}</p>
                      </div>
                      <div>
                        <h3 className="brand-font text-gradient" style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Lessons Learned</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>{selectedCaseStudy.caseStudy.lessons}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="brand-font text-gradient" style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Future Improvements</h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>{selectedCaseStudy.caseStudy.future}</p>
                    </div>

                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    );
  }

  // Desktop View (Unchanged)
  return (
    <section id="projects" className="projects">
      <div className="container" ref={ref}>
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          Selected <span className="text-gradient">Projects</span>
        </motion.h2>

        <div className="projects-filter-bar" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '40px' }}>
          {filters.map((f, i) => (
            <motion.button
              key={i}
              onClick={() => handleFilterClick(f)}
              className={`filter-btn ${activeFilter === f ? 'active' : ''}`}
              style={{
                padding: '8px 20px',
                borderRadius: '30px',
                border: activeFilter === f ? '1px solid var(--accent-cyan)' : '1px solid rgba(255,255,255,0.08)',
                background: activeFilter === f ? 'rgba(0, 240, 255, 0.1)' : 'rgba(255,255,255,0.02)',
                color: activeFilter === f ? '#fff' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {f}
            </motion.button>
          ))}
        </div>

        <div className="projects-grid-layout" style={{ 
          display: 'grid', 
          gridTemplateColumns: '1.35fr 1.65fr', 
          gap: '40px', 
          alignItems: 'stretch' 
        }}>
          
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '32px', 
            maxHeight: '780px', 
            overflowY: 'auto', 
            paddingRight: '15px' 
          }} className="custom-scroll-container">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((proj) => (
                <motion.div
                  key={proj.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <SpotlightCard 
                    isActive={activeProject.title === proj.title} 
                    onClick={() => setActiveProject(proj)}
                  >
                    <h3 className="brand-font" style={{ fontSize: '1.45rem', marginBottom: '20px', color: '#fff', fontWeight: 600 }}>
                      {proj.title}
                    </h3>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '20px' }}>
                      {proj.tech.slice(0, 3).map((t, i) => (
                        <span key={i} style={{ 
                          fontSize: '0.8rem', 
                          padding: '6px 14px', 
                          background: 'rgba(255,255,255,0.03)', 
                          borderRadius: '20px', 
                          color: 'var(--text-muted)',
                          border: '1px solid rgba(255,255,255,0.04)',
                          whiteSpace: 'nowrap'
                        }}>
                          {t}
                        </span>
                      ))}
                      {proj.tech.length > 3 && (
                        <span style={{ 
                          fontSize: '0.8rem', 
                          padding: '6px 14px', 
                          background: 'rgba(157, 0, 255, 0.08)', 
                          color: 'var(--accent-purple)',
                          border: '1px solid rgba(157, 0, 255, 0.2)',
                          borderRadius: '20px', 
                          fontWeight: 600 
                        }}>
                          +{proj.tech.length - 3}
                        </span>
                      )}
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.title}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3 }}
                style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <div className="glass project-detail-card" style={{
                  flexGrow: 1,
                  padding: '40px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3)',
                  position: 'relative',
                  overflow: 'hidden',
                  textAlign: 'left',
                  background: 'rgba(255, 255, 255, 0.015)'
                }}>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <h2 className="brand-font text-gradient" style={{ 
                      fontSize: '2.5rem', 
                      marginBottom: '12px',
                      paddingLeft: '4px',
                      marginLeft: '-4px'
                    }}>
                      {activeProject.title}
                    </h2>
                    
                    {/* Sentence-by-sentence details reveal */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '25px' }}>
                      {activeProject.description.split(". ").map((sentence, sIdx) => {
                        if (!sentence) return null;
                        const formattedText = sentence.endsWith('.') ? sentence : `${sentence}.`;
                        return (
                          <motion.p
                            key={sIdx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: sIdx * 0.1 + 0.1, duration: 0.5, ease: 'easeOut' }}
                            style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}
                          >
                            {formattedText}
                          </motion.p>
                        );
                      })}
                    </div>

                    <h4 style={{ color: '#fff', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem', fontWeight: 600 }}>Technical Scope</h4>
                    <div className="project-metrics-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '25px' }}>
                      {renderMetricBadge(<FaMobileAlt />, "Responsive", activeProject.metrics.responsive, 0)}
                      {renderMetricBadge(<FaExchangeAlt />, "REST APIs", activeProject.metrics.restApis, 1)}
                      {renderMetricBadge(<FaLock />, "Auth", activeProject.metrics.auth, 2)}
                      {renderMetricBadge(<FaDatabase />, "Database", activeProject.metrics.database, 3)}
                      {renderMetricBadge(<FaBrain />, "AI Integration", activeProject.metrics.ai, 4)}
                      {renderMetricBadge(<FaNetworkWired />, "RBAC", activeProject.metrics.roleBased, 5)}
                      {renderMetricBadge(<FaGlobe />, "Real-time", activeProject.metrics.realTime, 6)}
                      {renderMetricBadge(<FaCloudUploadAlt />, "Deployed", activeProject.metrics.deployment, 7)}
                    </div>
                    
                    <h4 style={{ color: '#fff', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem', fontWeight: 600 }}>Core Technologies</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {activeProject.tech.map((t, i) => (
                        <motion.span 
                          key={i} 
                          initial={{ opacity: 0, scale: 0.8, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ delay: i * 0.05 + 0.25, type: 'spring', stiffness: 150 }}
                          whileHover={{ scale: 1.1, y: -2 }}
                          style={{ 
                            padding: '6px 12px', 
                            background: 'rgba(157, 0, 255, 0.08)', 
                            color: 'var(--accent-purple)', 
                            borderRadius: '6px', 
                            border: '1px solid rgba(157, 0, 255, 0.25)', 
                            fontWeight: '600',
                            fontSize: '0.85rem',
                            cursor: 'default',
                            display: 'inline-block'
                          }}
                        >
                          {t}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.5 }}
                    style={{ display: 'flex', gap: '15px', position: 'relative', zIndex: 1, flexWrap: 'wrap', marginTop: '30px' }}
                  >
                    <motion.button 
                      onClick={() => setSelectedCaseStudy(activeProject)}
                      className="btn btn-secondary" 
                      style={{ flex: 1, border: '1px solid var(--accent-purple)', background: 'rgba(157, 0, 255, 0.02)' }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Deep Case Study
                    </motion.button>
                    
                    {activeProject.github !== '#' && activeProject.github !== '' && (
                      <motion.a 
                        href={activeProject.github} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="btn btn-secondary" 
                        style={{ border: '1px solid var(--text-muted)', display: 'inline-flex', padding: '10px 15px' }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaGithub /> Repo
                      </motion.a>
                    )}
                    
                    {activeProject.link !== '#' && activeProject.link !== '' && (
                      <motion.a 
                        href={activeProject.link} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="btn btn-primary" 
                        style={{ display: 'inline-flex', padding: '10px 20px' }}
                        whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(0,240,255,0.4)' }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaGlobe /> Preview
                      </motion.a>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      <AnimatePresence>
        {selectedCaseStudy && (
          <motion.div 
            className="case-study-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(5, 5, 8, 0.95)',
              backdropFilter: 'blur(15px)',
              WebkitBackdropFilter: 'blur(15px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px'
            }}
          >
            <motion.div 
              className="glass case-study-modal"
              initial={{ y: 50, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 50, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              style={{
                width: '100%',
                maxWidth: '900px',
                maxHeight: '90vh',
                overflowY: 'auto',
                padding: '40px',
                borderRadius: '20px',
                border: '1px solid var(--accent-purple)',
                boxShadow: '0 10px 40px rgba(157, 0, 255, 0.2)',
                position: 'relative',
                textAlign: 'left'
              }}
            >
              <button 
                onClick={() => setSelectedCaseStudy(null)}
                style={{
                  position: 'absolute',
                  top: '20px', right: '20px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '40px', height: '40px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10,
                  transition: 'all 0.3s'
                }}
                className="close-modal-btn"
              >
                <FaTimes size={18} />
              </button>

              <div style={{ position: 'relative', zIndex: 1 }}>
                <span className="text-gradient" style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                  Project Case Study
                </span>
                <h2 className="brand-font" style={{ fontSize: '3rem', color: '#fff', marginTop: '5px', marginBottom: '30px' }}>
                  {selectedCaseStudy.title}
                </h2>

                <div className="case-study-content-grid" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                  
                  <div>
                    <h3 className="brand-font text-gradient" style={{ fontSize: '1.4rem', marginBottom: '10px' }}>Overview</h3>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{selectedCaseStudy.caseStudy.overview}</p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px', flexWrap: 'wrap' }}>
                    <div>
                      <h3 className="brand-font text-gradient" style={{ fontSize: '1.4rem', marginBottom: '10px' }}>Architecture Flow</h3>
                      <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{selectedCaseStudy.caseStudy.architecture}</p>
                    </div>
                    <div>
                      <h3 className="brand-font text-gradient" style={{ fontSize: '1.4rem', marginBottom: '10px' }}>Project Role</h3>
                      <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>Sole Developer - Responsible for client-side routing, state architectures, backend controller logic, and database schemas integration.</p>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', flexWrap: 'wrap' }}>
                    <div>
                      <h3 className="brand-font text-gradient" style={{ fontSize: '1.4rem', marginBottom: '10px' }}>Folder Structure</h3>
                      <pre style={{ 
                        background: 'rgba(0,0,0,0.3)', 
                        padding: '15px', 
                        borderRadius: '10px', 
                        color: 'var(--accent-cyan)', 
                        fontSize: '0.85rem',
                        fontFamily: 'monospace',
                        overflowX: 'auto',
                        border: '1px solid rgba(255,255,255,0.05)'
                      }}>{selectedCaseStudy.caseStudy.folderStructure}</pre>
                    </div>
                    <div>
                      <h3 className="brand-font text-gradient" style={{ fontSize: '1.4rem', marginBottom: '10px' }}>Database Schema Design</h3>
                      <pre style={{ 
                        background: 'rgba(0,0,0,0.3)', 
                        padding: '15px', 
                        borderRadius: '10px', 
                        color: 'var(--accent-purple)', 
                        fontSize: '0.85rem',
                        fontFamily: 'monospace',
                        overflowX: 'auto',
                        border: '1px solid rgba(255,255,255,0.05)'
                      }}>{selectedCaseStudy.caseStudy.databaseDesign}</pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="brand-font text-gradient" style={{ fontSize: '1.4rem', marginBottom: '10px' }}>Core API Workflow</h3>
                    <pre style={{ 
                      background: 'rgba(0,0,0,0.3)', 
                      padding: '15px', 
                      borderRadius: '10px', 
                      color: 'var(--text-main)', 
                      fontSize: '0.85rem',
                      fontFamily: 'monospace',
                      overflowX: 'auto',
                      border: '1px solid rgba(255,255,255,0.05)',
                      whiteSpace: 'pre-wrap'
                    }}>{selectedCaseStudy.caseStudy.apiFlow}</pre>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', flexWrap: 'wrap' }}>
                    <div>
                      <h3 className="brand-font text-gradient" style={{ fontSize: '1.4rem', marginBottom: '10px' }}>Key Technical Challenge</h3>
                      <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{selectedCaseStudy.caseStudy.challenges}</p>
                    </div>
                    <div>
                      <h3 className="brand-font text-gradient" style={{ fontSize: '1.4rem', marginBottom: '10px' }}>Lessons Learned</h3>
                      <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{selectedCaseStudy.caseStudy.lessons}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="brand-font text-gradient" style={{ fontSize: '1.4rem', marginBottom: '10px' }}>Future Improvements</h3>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{selectedCaseStudy.caseStudy.future}</p>
                  </div>

                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
