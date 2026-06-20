"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";

// ==========================================
// 1. TYPE DEFINITIONS (Strict TypeScript)
// ==========================================
interface ContactPayload {
  name: string;
  email: string;
  target_channel: string;
  message: string;
}

interface TimelineItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

interface ProjectItem {
  id: string;
  number: string;
  title: string;
  description: string;
  tech: string[];
  githubUrl: string;
}

// ==========================================
// 2. DYNAMIC DATA (Data Mapping / Mocking)
// ==========================================
const experienceData: TimelineItem[] = [
  {
    id: "exp-1",
    role: "Backend Web Developer",
    company: "Freelance / Self-Employed",
    period: "Oct 2023 - Present",
    description: "Architected and deployed serverless microservices using Go and AWS API Gateway. Designed secure, high-performance REST APIs and integrated custom notification routing systems.",
  },
  {
    id: "exp-2",
    role: "Fullstack Developer",
    company: "Personal Projects",
    period: "Jan 2023 - Oct 2023",
    description: "Developed modern web applications leveraging Next.js and Tailwind CSS. Implemented responsive designs and integrated robust backend services to ensure seamless user experiences.",
  }
];

const educationData: TimelineItem[] = [
  {
    id: "edu-1",
    role: "Software Engineering",
    company: "Universidad Nacional",
    period: "2020 - 2024",
    description: "Focused on software architecture, cloud computing, and advanced algorithms. Completed multiple capstone projects utilizing Go, Node.js, and modern frontend frameworks.",
  },
  {
    id: "edu-2",
    role: "Cloud Computing Certification",
    company: "AWS Training",
    period: "2023",
    description: "Gained in-depth knowledge of serverless architectures, Lambda functions, API Gateway, and secure cloud deployments.",
  }
];

const developmentSkills = [
  "Go", "AWS", "Node.js", "React", "Next.js", "TypeScript", 
  "Tailwind CSS", "Docker", "REST APIs", "Microservices", "Git"
];

const developmentTools = [
  "VS Code", "Postman", "AWS Console", "GitHub", "Vercel", 
  "Linux / Terminal", "Figma", "Docker Desktop"
];

const projectsData: ProjectItem[] = [
  {
    id: "proj-1",
    number: "01",
    title: "Forms Nexus Service",
    description: "Core serverless notification router microservice built with Go. Designed to securely process and dispatch multi-channel payloads across the AWS ecosystem.",
    tech: ["Go", "AWS API", "Microservice"],
    githubUrl: "https://github.com/FrenekLopez/forms-nexus-svc"
  },
  {
    id: "proj-2",
    number: "02",
    title: "Umami Cloud Go",
    description: "A robust cloud-native backend service built in Go. Implements high-performance data handling, clean architecture, and scalable RESTful API endpoints.",
    tech: ["Go", "Cloud", "REST API"],
    githubUrl: "https://github.com/IlmarLopez/umami-cloud-go"
  },
  {
    id: "proj-3",
    number: "03",
    title: "Movie API Service",
    description: "A high-performance backend service designed to fetch, process, and serve movie data. Focuses on clean architecture and efficient data handling.",
    tech: ["Node.js", "REST API"],
    githubUrl: "https://github.com/FrenekLopez"
  }
];

export default function Home() {
  // ==========================================
  // 3. STATE AND REFERENCES (Hooks)
  // ==========================================
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const isSubmitting = status === "loading";

  const [activeTab, setActiveTab] = useState<"experience" | "education">("experience");
  const currentTimelineData = activeTab === "experience" ? experienceData : educationData;

  // Reference to manually control the horizontal projects carousel
  const carouselRef = useRef<HTMLDivElement>(null);

  // ==========================================
  // 4. BUSINESS LOGIC AND EVENT HANDLERS
  // ==========================================
  
  // Carousel Controller (Programmatic Scroll)
  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Contact Form Controller (AWS API Gateway Integration)
  const handleFormSubmit = async (formData: FormData) => {
    setStatus("loading");
    const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;

    if (!apiUrl) {
      setStatus("error");
      throw new Error("Configuration Error: NEXT_PUBLIC_API_URL environment variable is missing.");
    }

    try {
      const payload: ContactPayload = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        target_channel: formData.get("target_channel") as string,
        message: formData.get("message") as string,
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`API Request Failed. Status: ${response.status}`);
      
      setStatus("success");
      formRef.current?.reset(); 
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("Form dispatch failed. Check network tab for potential CORS or connectivity issues:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <main className="min-h-screen bg-[#0f1624] text-slate-300 font-sans selection:bg-orange-500/30 relative">
      
      {/* --- VERTICAL SOCIAL SIDEBAR --- */}
      <aside className="hidden md:flex flex-col gap-6 fixed left-8 top-1/2 -translate-y-1/2 z-50">
        <a href="https://www.linkedin.com/in/eric-lopez-650196348/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-orange-500 hover:-translate-y-1 transition-all duration-300" aria-label="LinkedIn">
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </a>
        <a href="https://github.com/FrenekLopez" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-orange-500 hover:-translate-y-1 transition-all duration-300" aria-label="GitHub">
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
        </a>
        <a href="https://x.com/LrFrenek" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-orange-500 hover:-translate-y-1 transition-all duration-300" aria-label="X">
           <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.96H5.078z"/></svg>
        </a>
      </aside>

      {/* --- NAVIGATION BAR --- */}
      <nav className="max-w-6xl mx-auto px-6 py-8 flex justify-between items-center md:pl-28 relative z-20">
        <div className="text-xl font-bold text-white tracking-widest">
          ERIC OMEGA <span className="text-orange-500">.</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
          <a href="#" className="hover:text-white transition-colors">Home</a>
          <a href="#experience" className="hover:text-white transition-colors">Experience</a>
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
      </nav>

      {/* --- MAIN CONTAINER (Padded to compensate for sidebar) --- */}
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-32 pb-16 md:pl-28">
        
        {/* --- HERO SECTION --- */}
        <section className="flex flex-col md:flex-row gap-16 items-center justify-between pt-12">
          <div className="flex-1 w-full flex justify-center md:justify-start relative">
            <div className="absolute top-1/2 left-1/2 md:left-[40%] -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange-500/15 blur-[100px] -z-10 rounded-full pointer-events-none"></div>
            <div className="relative w-full max-w-[320px] aspect-[3/4] md:max-w-[400px] rounded-3xl bg-[#1a2332] z-10 overflow-hidden shadow-2xl border border-slate-800/80 group">
              <Image 
                src="/desarrollador-eric.jpg" 
                alt="Eric Lopez Profile"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1624]/80 to-transparent pointer-events-none"></div>
            </div>
          </div>

          <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start relative z-20">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
              Creativity <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600">
                Is My Passion
              </span>
            </h1>
            <p className="text-slate-400 mb-10 text-lg leading-relaxed max-w-lg">
              I'm a Software Developer passionate about experimenting with new skills and cloud architectures. Driven by learning and curiosity, I'm always looking to explore and learn new development technologies.
            </p>
            <a href="/cv-eric.pdf" target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center gap-3 bg-[#1a2332] border border-orange-500/50 text-orange-400 hover:bg-orange-500 hover:text-white px-8 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(249,115,22,0.15)] hover:shadow-[0_0_30px_rgba(249,115,22,0.4)]">
              Resume
              <svg className="w-5 h-5 fill-current group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v6h6v10H6z"/></svg>
            </a>
          </div>
        </section>

        {/* --- EXPERIENCE / EDUCATION TIMELINE --- */}
        <section id="experience" className="pt-16 flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
            My Work <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Experience</span>
          </h2>
          
          {/* Tab Navigation Buttons */}
          <div className="flex gap-4 mb-16 bg-[#131b2c] p-2 rounded-full border border-slate-800/50">
            <button onClick={() => setActiveTab("experience")} className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${activeTab === "experience" ? "bg-[#1a2332] text-orange-400 border border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.2)]" : "text-slate-500 hover:text-slate-300 transparent border border-transparent"}`}>
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg> Experience
            </button>
            <button onClick={() => setActiveTab("education")} className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${activeTab === "education" ? "bg-[#1a2332] text-orange-400 border border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.2)]" : "text-slate-500 hover:text-slate-300 transparent border border-transparent"}`}>
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2.12-1.15V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72l5 2.73 5-2.73v3.72z"/></svg> Education
            </button>
          </div>
          
          {/* Dynamic Timeline List */}
          <div className="w-full max-w-4xl flex flex-col gap-10">
            {currentTimelineData.map((item) => (
              <div key={item.id} className="flex flex-col md:flex-row gap-4 md:gap-8 items-start border-b border-slate-800/50 pb-10 last:border-0 hover:bg-slate-800/10 p-4 rounded-xl transition-colors">
                
                {/* Left Column: Role and Company */}
                <div className="w-full md:w-1/3">
                  <h4 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">{item.role}</h4>
                  <p className="text-orange-500 font-bold text-sm tracking-wide uppercase">{item.company}</p>
                </div>
                
                {/* Center Column: Period */}
                <div className="w-full md:w-1/4">
                  <span className="text-slate-400 font-semibold bg-slate-800/50 px-3 py-1 rounded-full text-sm">{item.period}</span>
                </div>
                
                {/* Right Column: Description */}
                <div className="w-full md:w-5/12">
                  <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- WHAT I OFFER (Skills & Tools) --- */}
        <section className="pt-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center">
            What I <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Offer</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Skills Card */}
            <div className="relative group bg-[#131b2c] rounded-[2rem] p-8 md:p-10 border border-slate-800/60 hover:border-orange-500/30 transition-all duration-500 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/10 blur-[60px] group-hover:bg-orange-500/20 transition-all duration-500 pointer-events-none"></div>
              <h3 className="text-3xl font-bold text-white mb-4">Development <br/> <span className="text-orange-400">Skills</span></h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">Website creation with React.js, Tailwind CSS, and Next.js. Strong backend integration using Go and AWS Serverless architecture.</p>
              <div className="flex flex-wrap gap-2.5">
                {developmentSkills.map((skill) => (
                  <span key={skill} className="px-4 py-1.5 rounded-full border border-slate-700/80 bg-[#1a2332] text-slate-300 text-xs font-semibold tracking-wide hover:border-orange-500/50 hover:text-orange-400 transition-colors cursor-default">{skill}</span>
                ))}
              </div>
            </div>
            
            {/* Tools Card */}
            <div className="relative group bg-[#131b2c] rounded-[2rem] p-8 md:p-10 border border-slate-800/60 hover:border-orange-500/30 transition-all duration-500 overflow-hidden">
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-500/10 blur-[60px] group-hover:bg-orange-500/20 transition-all duration-500 pointer-events-none"></div>
              <h3 className="text-3xl font-bold text-white mb-4">Development <br/> <span className="text-orange-400">Tools</span></h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">Leverage powerful tools to streamline my workflow, improve productivity, and deliver high-quality projects. From code editors to cloud consoles.</p>
              <div className="flex flex-wrap gap-2.5">
                {developmentTools.map((tool) => (
                  <span key={tool} className="px-4 py-1.5 rounded-full border border-slate-700/80 bg-[#1a2332] text-slate-300 text-xs font-semibold tracking-wide hover:border-orange-500/50 hover:text-orange-400 transition-colors cursor-default">{tool}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- PROJECTS CAROUSEL (Interactive UI) --- */}
        <section id="projects" className="pt-16">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div className="text-center md:text-left w-full md:w-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                I Make Incredible <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Projects</span>
              </h2>
            </div>
            
            {/* Carousel Navigation Buttons (Desktop only) */}
            <div className="hidden md:flex gap-4">
              <button 
                onClick={() => scrollCarousel("left")}
                className="w-12 h-12 rounded-full border border-slate-700 bg-[#1a2332] flex items-center justify-center text-white hover:bg-orange-500 hover:border-orange-500 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                aria-label="Scroll left"
              >
                <svg className="w-5 h-5 fill-current group-hover:-translate-x-1 transition-transform" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/></svg>
              </button>
              <button 
                onClick={() => scrollCarousel("right")}
                className="w-12 h-12 rounded-full border border-slate-700 bg-[#1a2332] flex items-center justify-center text-white hover:bg-orange-500 hover:border-orange-500 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                aria-label="Scroll right"
              >
                <svg className="w-5 h-5 fill-current group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
              </button>
            </div>
          </div>
          
          {/* Scrollable Horizontal Container */}
          {/* Hidden scrollbar using inline CSS utilities while keeping functionality */}
          <div 
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth"
          >
            {projectsData.map((project) => (
              <div 
                key={project.id} 
                className="min-w-[85vw] md:min-w-[450px] snap-center group relative bg-[#131b2c] rounded-[2rem] p-8 md:p-10 border border-slate-800/60 hover:border-orange-500/40 transition-all duration-500 overflow-hidden shrink-0 flex flex-col justify-between"
              >
                {/* Internal Neon Glow Effect */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-[50px] group-hover:bg-orange-500/20 transition-all duration-500 pointer-events-none"></div>
                
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-5xl font-black text-slate-800/50 group-hover:text-orange-500/20 transition-colors">
                      {project.number}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Web</span>
                  </div>
                  
                  <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed mb-8 line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div>
                  <div className="mb-6">
                    <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Technologies Used</p>
                    <div className="flex flex-wrap gap-2 text-sm text-slate-300 font-medium">
                      {project.tech.join(", ")}
                    </div>
                  </div>
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-800/50 text-white text-sm font-bold hover:bg-orange-500 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 group/btn"
                  >
                    View Project 
                    <svg className="w-4 h-4 fill-current group-hover/btn:translate-x-1 transition-transform" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- CONTACT FORM --- */}
        <section id="contact" className="pt-16">
          <div className="flex flex-col md:flex-row gap-16 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <span className="h-[2px] w-12 bg-orange-500 inline-block"></span>
                <h3 className="text-slate-400 font-semibold uppercase tracking-wider">Contacts</h3>
              </div>
              <h2 className="text-5xl font-bold text-white mb-8 leading-tight">Have a project?<br/>Let's talk!</h2>
            </div>
            <div className="flex-1 w-full">
              <form ref={formRef} action={handleFormSubmit} className="flex flex-col gap-8">
                <input type="text" name="name" required disabled={isSubmitting} placeholder="Name" className="w-full bg-transparent border-b border-slate-700 pb-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all" />
                <input type="email" name="email" required disabled={isSubmitting} placeholder="Email" className="w-full bg-transparent border-b border-slate-700 pb-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all" />
                <div className="relative">
                  <select name="target_channel" defaultValue="telegram" disabled={isSubmitting} className="w-full bg-transparent border-b border-slate-700 pb-3 text-white focus:outline-none focus:border-orange-500 focus:ring-0 appearance-none disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                    <option value="telegram" className="bg-[#0f1624] text-white">Route to: Telegram</option>
                    <option value="email" className="bg-[#0f1624] text-white">Route to: Email</option>
                  </select>
                  <div className="pointer-events-none absolute right-0 top-0 bottom-3 flex items-center px-2 text-slate-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                  </div>
                </div>
                <textarea name="message" required rows={1} disabled={isSubmitting} placeholder="Message" className="w-full bg-transparent border-b border-slate-700 pb-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-0 resize-none overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed transition-all"></textarea>
                <div className="pt-4">
                  <button type="submit" disabled={isSubmitting} className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-10 rounded transition-all disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center justify-center min-w-[160px] shadow-lg shadow-orange-500/20">
                    {isSubmitting ? "Processing..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="border-t border-slate-800/50 mt-16 pt-8 pb-4">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6">
            <div className="text-slate-500 text-sm font-medium">© {new Date().getFullYear()} Eric Lopez. All rights reserved.</div>
            <div className="flex items-center gap-5">
              <a href="https://github.com/FrenekLopez" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-orange-500 hover:-translate-y-1 transition-all duration-300" aria-label="GitHub"><svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>
              <a href="https://www.linkedin.com/in/eric-lopez-650196348/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-orange-500 hover:-translate-y-1 transition-all duration-300" aria-label="LinkedIn"><svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}