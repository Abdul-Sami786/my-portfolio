"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import Image from "next/image";
import Particles from "react-tsparticles";
import { loadStarsPreset } from "tsparticles-preset-stars";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "./portfolio.css";

export default function Home() {
  const [cursorParticles, setCursorParticles] = useState([]);
  const particleId = useRef(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Soft pastel color palette
  const particleColors = [
    "#A2D2FF", // Light blue
    "#BDE0FE", // Lighter blue
    "#CDB4DB", // Lavender
    "#FFC8DD", // Pink
    "#FFAFCC", // Coral
    "#B5EAD7", // Mint
    "#C7CEEA", // Periwinkle
    "#E2F0CB", // Pale green
    "#FFDAC1", // Peach
    "#F8B195"  // Salmon
  ];

  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    });

    // Cursor position tracking
    const handleMouseMove = (e) => {
      // Create 2-3 new particles on each movement
      const particleCount = Math.floor(Math.random() * 2) + 1;
      const newParticles = [];
      
      for (let i = 0; i < particleCount; i++) {
        const shapes = ['circle', 'triangle', 'square'];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        
        newParticles.push({
          id: particleId.current++,
          x: e.clientX + (Math.random() - 0.5) * 20,
          y: e.clientY + (Math.random() - 0.5) * 20,
          size: Math.random() * 10 + 5,
          color: particleColors[Math.floor(Math.random() * particleColors.length)],
          shape,
          rotation: Math.random() * 360,
          life: 100
        });
      }
      
      setCursorParticles(prev => [...prev.slice(-30), ...newParticles]);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Particle animation frame
    let animationFrame;
    const animateParticles = () => {
      setCursorParticles(prev => 
        prev.map(p => ({
          ...p,
          y: p.y - (1 + Math.random()),
          x: p.x + (Math.random() - 0.5) * 1.5,
          rotation: p.rotation + (Math.random() - 0.5) * 5,
          life: p.life - 1.5
        })).filter(p => p.life > 0)
      );
      animationFrame = requestAnimationFrame(animateParticles);
    };
    
    animateParticles();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const particlesInit = async (engine) => {
    await loadStarsPreset(engine);
  };

  // Shape components
  const Shape = ({ shape, size, color, rotation }) => {
    switch (shape) {
      case 'triangle':
        return (
          <div 
            style={{
              width: 0,
              height: 0,
              borderLeft: `${size/2}px solid transparent`,
              borderRight: `${size/2}px solid transparent`,
              borderBottom: `${size}px solid ${color}`,
              transform: `rotate(${rotation}deg)`
            }}
          />
        );
      case 'square':
        return (
          <div 
            style={{
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              transform: `rotate(${rotation}deg)`
            }}
          />
        );
      default: // circle
        return (
          <div 
            style={{
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              borderRadius: '50%'
            }}
          />
        );
    }
  };

  return (
    <div className="portfolio-container">
      {/* Custom Cursor Particles */}
      <div className="cursor-particles-container">
        {cursorParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="cursor-particle"
            initial={{
              x: particle.x,
              y: particle.y,
              opacity: 0.8,
              scale: 0.5
            }}
            animate={{
              x: particle.x,
              y: particle.y,
              opacity: particle.life / 100,
              scale: particle.life / 100
            }}
            style={{
              position: 'fixed',
              pointerEvents: 'none',
              zIndex: 9998,
              filter: 'blur(0.5px)'
            }}
            transition={{ 
              type: 'spring', 
              damping: 20,
              opacity: { duration: 0.3 }
            }}
          >
            <Shape 
              shape={particle.shape}
              size={particle.size}
              color={particle.color}
              rotation={particle.rotation}
            />
          </motion.div>
        ))}
      </div>

      {/* Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          preset: "stars",
          background: { color: "transparent" },
          particles: {
            color: { value: "#3b82f6" },
            number: { value: 80 },
            size: { value: 3 },
            move: { speed: 1 },
            opacity: { value: 0.7 }
          }
        }}
        className="particles-background"
      />

      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-content">
          <motion.h1 
            className="brand-name"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Abdul Sami
          </motion.h1>
          
          <ul className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            {['Home', 'About', 'Education', 'Projects', 'Contact'].map((item) => (
              <motion.li 
                key={item}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <a 
                  href={`#${item.toLowerCase()}`} 
                  className="nav-link"
                >
                  {item}
                </a>
              </motion.li>
            ))}
          </ul>
          
          <button 
            className="mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        id="home"
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="profile-image-container"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
        >
          <motion.div
            className="floating-image-wrapper"
            animate={{
              borderRadius: [
                "30% 70% 70% 30% / 30% 30% 70% 70%",
                "60% 40% 30% 70% / 60% 30% 70% 40%",
                "50% 50% 50% 50% / 50% 50% 50% 50%",
                "30% 70% 70% 30% / 30% 30% 70% 70%"
              ],
              y: [0, -10, 0, 5, 0],
              x: [0, 5, 0, -5, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            <Image
              src="/Profile7.png"
              alt="Abdul Sami"
              width={300}
              height={300}
              className="profile-image"
            />
          </motion.div>
        </motion.div>

        <motion.h1 
          className="hero-title"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Hi, I'm <span className="highlight-text">Abdul Sami</span>
        </motion.h1>

        <motion.div 
          className="typewriter-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <Typewriter
            options={{
              strings: [
                "Software Engineer",
                "Front End Developer",
                "Unity Lover",
                "Tech Enthusiast",
                "Team Player"
              ],
              autoStart: true,
              loop: true,
              delay: 50,
              deleteSpeed: 30,
              pauseFor: 1500,
            }}
          />
        </motion.div>

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.a
            href="/resume.pdf"
            download
            className="primary-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Download Resume
          </motion.a>
          <motion.a
            href="#contact"
            className="secondary-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Me
          </motion.a>
        </motion.div>
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        className="about-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="section-container">
          <h2 className="section-title">
            About <span className="highlight-text">Me</span>
          </h2>
          
          <div className="about-content">
            <motion.div 
              className="about-bio"
              initial={{ x: -100 }}
              whileInView={{ x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="subsection-title">Who am I?</h3>
              <p className="section-text">
                I'm a passionate Software Engineer with expertise in building modern web applications 
                and immersive experiences. My journey in tech has taken me through various domains 
                from web development to game design.
              </p>
              <p className="section-text">
                I thrive on solving complex problems and creating elegant solutions that deliver 
                exceptional user experiences. Continuous learning is at the core of my professional 
                philosophy.
              </p>
              
              <div className="skills-grid">
                {[
                  { name: "Web Development", icon: "💻" },
                  { name: "Unity 3D", icon: "🎮" },
                  { name: "Mobile Apps", icon: "📱" },
                  { name: "Responsive Design", icon: "🎨" }
                ].map((skill, index) => (
                  <motion.div 
                    key={index}
                    className="skill-card"
                    whileHover={{ y: -5 }}
                  >
                    <span className="skill-icon">{skill.icon}</span>
                    <span className="skill-name">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="skills-list"
              initial={{ x: 100 }}
              whileInView={{ x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="subsection-title">My Skills</h3>
              <div className="skills-progress">
                {[
                  { name: "Unity/Flutter", level: 60 },
                  { name: "Tailwind", level: 70 },
                  { name: "React/Next", level: 80 },
                  { name: "JavaScript", level: 80 },
                  { name: "Express.js", level: 70 },
                  { name: "MySQL", level: 60 }
                ].map((skill, index) => (
                  <div className="skill-item" key={index}>
                    <div className="skill-info">
                      <span className="skill-label">{skill.name}</span>
                      <span className="skill-percent">{skill.level}%</span>
                    </div>
                    <div className="progress-bar">
                      <motion.div 
                        className="progress-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Education Section */}
      <motion.section
        id="education"
        className="education-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="section-container">
          <h2 className="section-title">
            My <span className="highlight-text">Education</span>
          </h2>
          
          <div className="education-timeline">
            <div className="education-item">
              <div className="education-header">
                <h3 className="education-institution">PAF - KIET</h3>
                <span className="education-duration">2020 – 2025</span>
              </div>
              <p className="education-degree">BE Software Engineering (GPA 3.04)</p>
            </div>
            
            <div className="education-item">
              <div className="education-header">
                <h3 className="education-institution">Superior Boys College</h3>
                <span className="education-duration">2018 – 2020</span>
              </div>
              <p className="education-degree">Intermediate</p>
            </div>
            
            <div className="education-item">
              <div className="education-header">
                <h3 className="education-institution">Pakistan Steel Cadet College</h3>
                <span className="education-duration">2015 – 2018</span>
              </div>
              <p className="education-degree">Matriculation</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        className="projects-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="section-container">
          <h2 className="section-title">
            My <span className="highlight-text">Projects</span>
          </h2>
          
          <div className="projects-grid">
            {[
              {
                icon: "🌐",
                title: "Portfolio Website",
                desc: "Personal website built with Next.js and styled using custom CSS & Framer Motion.",
                tags: ["Next.js", "React", "Framer Motion"]
              },
              {
                icon: "💊",
                title: "VR Doctor-Patient Interaction",
                desc: "VR app for doctor education using Unity 3D with interactive environment.",
                tags: ["Unity", "C#", "VR"]
              },
              {
                icon: "🛍️",
                title: "SK Fashions",
                desc: "E-commerce store for clothing & shoes built with modern web technologies.",
                tags: ["HTML", "JavaScript", "Bootstrap"]
              },
              {
                icon: "🏥",
                title: "Hospital Management System",
                desc: "Comprehensive management system for patient, doctor, and appointment tracking.",
                tags: ["PHP", "MySQL", "Full-stack"]
              },
              {
                icon: "🧴",
                title: "Skin Disease Detector",
                desc: "Mobile app using machine learning to detect various skin conditions.",
                tags: ["Flutter", "Firebase", "ML"]
              },
              {
                icon: "🧟",
                title: "FPP Survival Game",
                desc: "Immersive first-person survival game with crafting and exploration mechanics.",
                tags: ["Unity", "3D Modeling", "C#"]
              },
              {
                icon: "🛡️",
                title: "Autonomous Reliability System",
                desc: "Reliability analytics dashboard providing real-time system metrics, alerts, and automated health checks.",
                tags: ["React", "Python", "JWT", "APIs", "RBAC"]
              },
              {
                icon: "📝",
                title: "Advanced MERN Todo App",
                desc: "Full-stack task management app with authentication, dark mode, and performance optimization.",
                tags: ["MERN", "JWT", "Tailwind", "Vercel", "Railway"]
              }
            ].map((project, index) => (
              <motion.div 
                key={index}
                className="project-card"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="project-content">
                  <div className="project-icon">{project.icon}</div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.desc}</p>
                  <div className="project-tags">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="project-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="projects-button-container">
            <motion.a
              href="https://github.com/Abdul-Sami786"
              className="primary-button"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Projects on GitHub
            </motion.a>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        className="contact-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="section-container">
          <h2 className="section-title">
            Get In <span className="highlight-text">Touch</span>
          </h2>
          
          <div className="contact-container">
            <div className="contact-grid">
              <div className="contact-info">
                <h3 className="subsection-title">Contact Information</h3>
                <p className="section-text">
                  Feel free to reach out to me for collaborations or just to say hi!
                </p>
                
                <div className="contact-details">
                  <div className="contact-item">
                    <div className="contact-icon">
                      ✉️
                    </div>
                    <div>
                      <h4 className="contact-label">Email</h4>
                      <a 
                        href="mailto:abdulsami.se786@gmail.com" 
                        className="contact-link"
                      >
                        abdulsami.se786@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="contact-item">
                    <div className="contact-icon">
                      🔗
                    </div>
                    <div>
                      <h4 className="contact-label">LinkedIn</h4>
                      <a 
                        href="https://www.linkedin.com/in/engr-abdul-sami-48663a378/" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-link"
                      >
                        linkedin-engr-abdul-sami-48663a378
                      </a>
                    </div>
                  </div>
                  
                  <div className="contact-item">
                    <div className="contact-icon">
                      💻
                    </div>
                    <div>
                      <h4 className="contact-label">GitHub</h4>
                      <a 
                        href="https://github.com/Abdul-Sami786" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-link"
                      >
                        github.com/Abdul-Sami786
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <form className="contact-form">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Your Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message" className="form-label">Your Message</label>
                  <textarea 
                    id="message" 
                    rows="4"
                    className="form-textarea"
                    required
                  ></textarea>
                </div>
                
                <motion.button
                  type="submit"
                  className="primary-button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
<footer className="footer">
  <div className="footer-content">
    <motion.div 
      className="social-links"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <motion.a
        href="https://github.com/Abdul-Sami786"
        target="_blank"
        rel="noopener noreferrer"
        className="social-link"
        whileHover={{ y: -5, scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="GitHub"
      >
        <FaGithub className="social-icon" />
      </motion.a>
      
      <motion.a
        href="https://www.linkedin.com/in/engr-abdul-sami-48663a378/"
        target="_blank"
        rel="noopener noreferrer"
        className="social-link"
        whileHover={{ y: -5, scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="LinkedIn"
      >
        <FaLinkedin className="social-icon" />
      </motion.a>
    </motion.div>
    
    <p className="copyright">
      &copy; {new Date().getFullYear()} Abdul Sami. All rights reserved.
    </p>
  </div>
</footer>
    </div>
  );
}