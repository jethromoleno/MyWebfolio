import React, { useState, useEffect } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ExternalLink,
  Code2,
  Palette,
  Terminal,
  Cpu,
  Globe,
  MessageSquare,
  Play,
  X,
  Menu,
  Monitor,
  Database,
  Layout,
  Home as HomeIcon, // Renaming for clarity
  User,
  Zap,
  Briefcase,
  Layers,
  FileText,
  // Added ArrowUp for the GoToTop button
  ArrowUp,
  Calculator,
  Braces,
  Brain,
  Sparkles,
  Eye,
  Code,
  CheckCircle
} from 'lucide-react';

// --- Helper Hook for Intersection Observation ---

const useActiveSection = (sectionIds) => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null, // relative to the viewport
        rootMargin: '-30% 0px -30% 0px', // Center of viewport defines the active section
        threshold: 0.5 // Section must be 50% visible
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [sectionIds]);

  return activeSection;
};

// --- Global Utility Function for Smooth Scrolling (used by Hero) ---
const handleSmoothScroll = (e, href) => {
  e.preventDefault();
  const targetId = href.substring(1);
  const targetElement = document.getElementById(targetId);

  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth' });
  }
};


// --- Go To Top Widget Component --- 
const GoToTopButton = ({ isVisible }) => {
  const scrollToTop = () => {
    // Use window.scrollTo for smooth scroll to the top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      // Fixed position, bottom-right, styled with Tailwind for appearance and transitions
      className={`
        fixed bottom-6 right-6 p-3 bg-blue-600 text-white rounded-full shadow-xl transition-all duration-300 z-50
        hover:bg-blue-700 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
      `}
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
};

// --- Components ---

const Navigation = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Link setup with associated icons
  const links = [
    { name: 'Home', href: '#home', icon: HomeIcon },
    // MODIFIED: Changed 'About & Video' to 'About & Contact'
    { name: 'About Me', href: '#about', icon: User },
    { name: 'Skills', href: '#skills', icon: Zap },
    { name: 'Services', href: '#services', icon: Briefcase },
    { name: 'Projects', href: '#projects', icon: Layers },
    // MODIFIED: Changed 'Resume' to 'Contact Me'
    { name: 'Contact', href: '#resume', icon: FileText },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false); // Close mobile menu after click
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md z-50 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              myPortfolio.
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {links.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`text-sm font-medium transition-colors relative group ${isActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                >
                  {link.name}
                  {/* Active indicator bar */}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 transform transition-transform duration-300 ${isActive ? 'bg-blue-600 scale-x-100' : 'bg-blue-600 scale-x-0 group-hover:scale-x-75'}`}></span>
                </a>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 dark:text-slate-300 p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive
                    ? 'text-white bg-blue-600'
                    : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                >
                  <Icon size={20} /> {link.name}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

// All Section Components (Hero, VideoCV, Skills, Services, Projects, Resume) now have min-h-screen added

const Hero = () => {
  // CORRECTED: Replaced placeholder URL with the user-provided direct Imgur link.
  // The link below is a direct image URL (ends in .jpeg).
  const profileImageUrl = "https://i.imgur.com/pGqJuhQ.jpeg";

  const [imageError, setImageError] = useState(false);

  return (
    <section id="home" className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">
      <div className="flex-1 space-y-6 text-center lg:text-left">
        {/* 1. INCREASE FONT SIZE (text-sm -> text-lg) */}
        <h2 className="text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase text-lg">
          Computer Engineering Graduate
        </h2>
        {/* UPDATED SLOGAN HERE */}
        <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          From logic to intelligence: <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Engineering</span> the digital future.
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0">
          I apply my Computer Engineering foundation to architect full-stack, data-driven software, specializing in robust web applications and emerging AI/ML solutions.
        </p>

        <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
          {/* 2. "View My Work" links to #projects (smooth scrolling is applied via parent div class) */}
          <a
            href="#projects"
            onClick={(e) => handleSmoothScroll(e, '#projects')}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-all transform hover:scale-105 shadow-lg shadow-blue-500/25"
          >
            View My Work
          </a>
          {/* 3. "Contact Me" links to #resume */}
          <a
            href="#resume"
            onClick={(e) => handleSmoothScroll(e, '#resume')}
            className="px-8 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-full font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
          >
            Contact Me
          </a>
        </div>

        {/* 4. INCREASE ICON SIZE (size={24} -> size={28}) */}
        <div className="flex justify-center lg:justify-start gap-6 pt-6 text-slate-500 dark:text-slate-400">
          <a
            href="https://github.com/jethromoleno"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            <Github size={28} />
          </a>
          <a
            href="https://www.linkedin.com/in/jethromoleno"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            <Linkedin size={28} />
          </a>
          <a
            href="mailto:jethromoleno@gmail.com"
            className="hover:text-blue-600 transition-colors"
          >
            <Mail size={28} />
          </a>
        </div>
        {/* --- END UPDATED SOCIAL LINKS --- */}
      </div>

      <div className="flex-1 relative">
        {/*
          INCREASED IMAGE SIZE:
          - Mobile (default): w-80 h-80 (was w-72 h-72)
          - Large Screens: lg:w-[28rem] lg:h-[28rem] (28rem = 448px, a substantial increase)
        */}
        {/* --- 1. WHISPER SPEECH BUBBLE (MODIFIED) --- */}
        <div
          // Positioned centered horizontally, and slightly above the circle's top edge
          className="absolute top-0 left-1/2 -translate-x-1/2 z-30 
                      // Styling (Increased Size)
                      // MODIFIED TEXT COLOR: Set text to slate-950 (near black) for both modes
                      bg-white text-slate-950 dark:text-slate-950 
                      py-3 px-6 rounded-2xl shadow-2xl font-bold text-lg sm:text-xl
                      // Animation: Popup on load
                      animate-pop-in border border-slate-300 dark:border-slate-400"
          style={{
            top: '-1rem', // Shift up slightly
          }}
        >
          Hi! I'm Jethro.
          {/* Speech Bubble Pointer (Triangle Tail - Increased Size) */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full 
                        w-0 h-0 border-x-10 border-x-transparent border-t-10 
                        border-t-white dark:border-t-slate-700"
          ></div>
        </div>
        {/* --- END WHISPER SPEECH BUBBLE --- */}
        <div className="w-80 h-80 sm:w-96 sm:h-96 lg:w-[28rem] lg:h-[28rem] rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 p-1 mx-auto relative z-10">
          <div className="w-full h-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden relative">
            <img
              src={profileImageUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        {/* Decorative blur blobs size increased for MD screens and up 
          to match the larger profile image effect.
        */}
        <div className="absolute top-0 right-0 w-72 h-72 md:w-96 md:h-96 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 md:w-96 md:h-96 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>
    </section>
  );
};

// MODIFIED: Updated VideoCV to include Resume content, making it 'About & Contact'
const VideoCV = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    // ID remains #about
    <section id="about" className="min-h-screen flex items-center py-20 bg-slate-50 dark:bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">

        {/* Video Section */}
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Video Introduction</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-12">Get to know me in 60 seconds.</p>

        <div className="relative aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 max-w-4xl mx-auto mb-16">
          {!isPlaying ? (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40 hover:bg-slate-900/30 transition-colors cursor-pointer group" onClick={() => setIsPlaying(true)}>
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center pl-1 shadow-lg">
                  <Play size={32} className="text-white" fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-6 left-6 text-left">
                <p className="text-white font-bold text-lg">My Journey in Tech</p>
                <p className="text-slate-300 text-sm">1:45 • Video CV</p>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white bg-slate-800">
              <p className="animate-pulse">Video Player Placeholder (Embed YouTube/Vimeo here)</p>
            </div>
          )}
        </div>

        {/* Resume/Contact Details Section (MOVED FROM Resume component) */}
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 mt-16">Resume</h2>
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl max-w-4xl mx-auto shadow-2xl border border-slate-200 dark:border-slate-700 text-left">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-left space-y-4">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Jethro P. Moleño</h3>
              <p className="text-slate-600 dark:text-slate-400">Computer Engineer</p>
              <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-300">
                <span>• Fresh Graduate</span>
                <span>• BS in Computer Engineering specializing in Embedded Systems</span>
                <span>• 5+ Completed Projects</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full md:w-auto">
              <a
                href="https://raw.githubusercontent.com/jethromoleno/MyWebfolio/main/profile-assets/Moleno_Resume.pdf"
                target="_blank" // Opens the file in a new tab for download/view
                rel="noopener noreferrer"
                download // Suggests the browser download the file directly
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <Download size={20} /> Download
              </a>
              <a
                href="https://docs.google.com/viewer?url=https://raw.githubusercontent.com/jethromoleno/MyWebfolio/main/profile-assets/Moleno_Resume.pdf&embedded=true"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <ExternalLink size={20} /> Preview
              </a>
            </div>
          </div>
        </div>
        {/* End of Moved Resume Content */}
      </div>

    </section>
  );
};

const Skills = () => {
  const categorySkills = [
    { name: "Machine Learning", icon: <Cpu size={20} /> },      // Data processing/AI
    { name: "Deep Learning", icon: <Brain size={20} /> },        // AI/Neural Networks
    { name: "AI", icon: <Sparkles size={20} /> },                // Core AI
    { name: "Automation", icon: <Zap size={20} /> },             // Process focus
    { name: "Computer Vision", icon: <Eye size={20} /> },         // Image/Video Processing
    { name: "Software Development", icon: <Code size={20} /> }, // Core development
    { name: "Embedded Systems", icon: <Terminal size={20} /> },  // Hardware/IoT
    { name: "Quality Assurance", icon: <CheckCircle size={20} /> }, // Testing/Validation
  ];

  const techSkills = [
    { name: "Python", level: 90, icon: <Code2 size={20} /> },
    { name: "C++", level: 70, icon: <Code2 size={20} /> },
    { name: "C#", level: 60, icon: <Code2 size={20} /> },
    { name: "C++", level: 60, icon: <Terminal size={20} /> },
  ];

  const softSkills = [
    { name: "Analytical", level: 95 },
    { name: "Problem Solving", level: 95 },
    { name: "Team Leadership", level: 95 },
    { name: "Communication", level: 80 },
    { name: "Project Management", level: 70 },
  ];

  const devTools = [
    { name: "VS Code", icon: <Code2 size={20} /> },
    { name: "PyCharm", icon: <Code2 size={20} /> },
    { name: "MATLAB", icon: <Calculator size={20} /> }, 
    { name: "Arduino", icon: <Zap size={20} /> },      
    { name: "TensorFlow", icon: <Braces size={20} /> },
    { name: "PyTorch", icon: <Braces size={20} /> },
  ];

  return (
    <section id="skills" className="min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 w-full">
        <div className="md:col-span-2 mb-10">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3 justify-center md:justify-start">
            <Layers className="text-orange-600" /> Key Focus Areas
          </h2>
          {/* Key Focus Areas */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-8">
            {categorySkills.map((skill) => {
              return (
                <span key={skill.name} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-white rounded-full font-medium text-sm border border-slate-200 dark:border-slate-700 shadow-md">
                  {skill.icon} {skill.name}
                </span>
              );
            })}
          </div>
        </div>
        {/* Technical Skills */}
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <Cpu className="text-blue-600" /> Technical Skills
          </h2>
          <div className="space-y-6">
            {techSkills.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-slate-700 dark:text-slate-200 flex items-center gap-2">
                    {skill.icon} {skill.name}
                  </span>
                  <span className="text-blue-600 font-bold">{skill.level}%</span>
                </div>
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Soft Skills */}
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <MessageSquare className="text-purple-600" /> Soft Skills
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {softSkills.map((skill) => (
              <div key={skill.name} className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-2">{skill.name}</h3>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 flex-1 rounded-full ${i < Math.floor(skill.level / 20)
                        ? 'bg-purple-500'
                        : 'bg-slate-200 dark:bg-slate-700'
                        }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Development Tools */}
        <div className="w-full mt-16 pt-10 border-t border-slate-200 dark:border-slate-700 md:col-span-2">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3 justify-center md:justify-start">
            <Code2 className="text-blue-600" /> Development Tools and Technologies
          </h2>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            {devTools.map((tool) => {
              return (
                <span key={tool.name} className="flex items-center gap-2 px-4 py-2 border border-slate-400 dark:border-slate-600 text-slate-700 dark:text-slate-400 rounded-lg text-sm font-medium">
                  {tool.icon} {tool.name}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: "Web Development",
      desc: "Full-stack web applications built with modern technologies like React, Node, and Postgres.",
      icon: <Globe size={32} className="text-blue-500" />
    },
    {
      title: "Application Development",
      desc: "Building robust and scalable applications for desktop and web platforms, focusing on performance and user experience.",
      icon: <Code size={32} className="text-orange-500" />
    },
    {
      title: "UI/UX Design",
      desc: "Creating beautiful, intuitive interfaces that drive user engagement and accessibility.",
      icon: <Palette size={32} className="text-purple-500" />
    },
    {
      title: "Technical Consulting",
      desc: "Advising on tech stack choices, code architecture, and optimization strategies.",
      icon: <Monitor size={32} className="text-emerald-500" />
    },
  ];

  return (
    <section id="services" className="min-h-screen flex items-center py-20 bg-slate-50 dark:bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Services</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            High-quality services tailored to your specific needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div key={service.title} className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="mb-6 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg w-fit">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{service.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "E-Commerce Dashboard",
      desc: "A comprehensive analytics dashboard for online retailers featuring real-time data visualization.",
      tags: ["React", "Chart.js", "Firebase"],
      color: "bg-blue-500"
    },
    {
      title: "AI Task Manager",
      desc: "Smart to-do list application that uses NLP to categorize and prioritize tasks automatically.",
      tags: ["TypeScript", "OpenAI API", "Node.js"],
      color: "bg-purple-500"
    },
    {
      title: "Social Media App",
      desc: "A lightweight social platform focused on photography communities with image processing features.",
      tags: ["React Native", "AWS S3", "GraphQL"],
      color: "bg-pink-500"
    }
  ];

  return (
    <section id="projects" className="min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Featured Projects</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A selection of my recent work and personal projects.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div key={idx} className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all">
              {/* Mock Project Image */}
              <div className={`h-48 ${project.color} opacity-80 group-hover:opacity-100 transition-opacity flex items-center justify-center`}>
                <Code2 className="text-white/50 w-20 h-20" />
              </div>

              <div className="p-8">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{project.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-2">
                  {project.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a href="#" className="flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-white hover:text-blue-600">
                    <Github size={16} /> View Code
                  </a>
                  <a href="#" className="flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-white hover:text-blue-600">
                    <ExternalLink size={16} /> Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// MODIFIED: Renamed Resume to Contact Me and removed its original content.
const Resume = () => {
  return (
    // ID remains #resume to avoid breaking the Hero component link, but the content is now Contact Me
    <section id="resume" className="min-h-screen flex items-center py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
        <h2 className="text-3xl font-bold mb-8">Contact Me</h2>

        <div className="bg-slate-800 p-8 rounded-2xl max-w-2xl mx-auto shadow-2xl border border-slate-700">
          <p className="text-xl mb-6 text-slate-300">
            I'm currently seeking new opportunities and open to discussing potential projects.
          </p>
          <a
            href="mailto:jethromoleno@gmail.com"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors transform hover:scale-105"
          >
            <Mail size={24} /> Send an Email
          </a>
          <div className="mt-8 pt-4 border-t border-slate-700 flex flex-wrap justify-center gap-6 text-slate-400">
            <a href="https://github.com/jethromoleno" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/jethromoleno" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              <Linkedin size={24} />
            </a>
          </div>
        </div>

        <div className="h-20"></div> {/* Extra space at bottom */}
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <p className="font-bold text-xl text-slate-900 dark:text-white mb-2">Portfolio.</p>
          <p className="text-slate-500 text-sm">© 2025 Jethro P. Moleño. All rights reserved.</p>
        </div>
        <div className="flex gap-6">
          <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors"><Github size={20} /></a>
          <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors"><Linkedin size={20} /></a>
          <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors"><Mail size={20} /></a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const sectionIds = ['home', 'about', 'skills', 'services', 'projects', 'resume'];
  const activeSection = useActiveSection(sectionIds);

  // State to manage GoToTop button visibility
  const [showGoToTop, setShowGoToTop] = useState(false);
  const SCROLL_THRESHOLD = 300; // Pixels to scroll down before button appears

  // Effect to handle the scroll listener for the GoToTop button
  useEffect(() => {
    const handleScroll = () => {
      // Check if the vertical scroll position is greater than the threshold
      setShowGoToTop(window.scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // The main container includes 'scroll-smooth'
    <div className="scroll-smooth min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-100 dark:selection:bg-blue-900">
      <Navigation activeSection={activeSection} />
      <main className="pt-16"> {/* Added pt-16 to adjust for fixed header */}
        <Hero />
        <VideoCV />
        <Skills />
        <Services />
        <Projects />
        <Resume />
      </main>
      <Footer />

      {/* GoToTop widget integrated here */}
      <GoToTopButton isVisible={showGoToTop} />
    </div>
  );
}