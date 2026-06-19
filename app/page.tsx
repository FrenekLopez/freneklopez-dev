"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";

// Defines the exact data contract expected by the external API endpoint.
interface ContactPayload {
  name: string;
  email: string;
  target_channel: string;
  message: string;
}

export default function Home() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const isSubmitting = status === "loading";

  /**
   * Processes the form submission, maps data to the defined payload contract,
   * and dispatches the request to the configured API Gateway endpoint.
   */
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API Request Failed. HTTP Status: ${response.status}`);
      }
      
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
    <main className="min-h-screen bg-[#0f1624] text-slate-300 font-sans selection:bg-orange-500/30">
      
      {/* Navigation */}
      <nav className="max-w-6xl mx-auto px-6 py-8 flex justify-between items-center">
        <div className="text-xl font-bold text-white tracking-widest">
          ERIC OMEGA <span className="text-orange-500">.</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
          <a href="#" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:text-orange-500">Home</a>
          <a href="#projects" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:text-orange-500">Projects</a>
          <a href="#contact" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:text-orange-500">Contact</a>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-32 pb-16">
        
        {/* Hero Section */}
        <section className="flex flex-col-reverse md:flex-row gap-16 items-center justify-between pt-12">
          <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start">
            <div className="flex items-center gap-4 mb-4">
              <span className="h-[2px] w-12 bg-orange-500 inline-block"></span>
              <h2 className="text-2xl font-semibold text-white tracking-wide">
                Hello <span className="text-orange-500">.</span>
              </h2>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              I'm Eric Lopez
            </h1>
            
            <h2 className="text-3xl md:text-5xl font-bold text-slate-400 mb-10">
              Software Developer
            </h2>
            
            <div className="flex gap-4">
              <a href="#contact" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded text-sm font-semibold transition-all shadow-lg shadow-orange-500/20 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500 focus-visible:ring-offset-[#0f1624]">
                Let's talk
              </a>
              <a href="/cv-eric.pdf" target="_blank" rel="noopener noreferrer" className="border border-slate-600 hover:border-slate-400 text-white px-8 py-3 rounded text-sm font-semibold transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-400 focus-visible:ring-offset-[#0f1624]">
                My resume
              </a>
            </div>
          </div>

          <div className="flex-1 flex justify-center md:justify-end relative">
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full border-[12px] border-orange-500/10 flex items-center justify-center">
              <div className="absolute inset-6 rounded-full border border-orange-500/30"></div>
              <div className="w-56 h-56 md:w-72 md:h-72 rounded-full bg-[#1a2332] z-10 overflow-hidden shadow-2xl flex items-center justify-center text-slate-600 relative">
                <Image 
                  src="/desarrollador-eric.jpg" 
                  alt="Eric Lopez Profile"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Technologies Ribbon */}
        <section className="border-y border-slate-800/50 py-8">
          <div className="flex flex-wrap justify-center md:justify-between gap-6 md:gap-12 text-slate-500 text-sm font-semibold tracking-wider uppercase">
            <span>Go</span>
            <span>AWS</span>
            <span>Node.js</span>
            <span>React</span>
            <span>Docker</span>
            <span>GitHub</span>
          </div>
        </section>

        {/* Featured Projects */}
        <section id="projects" className="pt-16">
          <div className="flex items-center gap-4 mb-12">
            <span className="h-[2px] w-12 bg-orange-500 inline-block"></span>
            <h3 className="text-slate-400 font-semibold uppercase tracking-wider">Featured Projects</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group bg-[#1a2332] rounded-lg p-8 border border-slate-800/50 hover:border-orange-500/30 transition-all hover:-translate-y-1">
              <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">Forms Nexus Service</h4>
              <p className="text-slate-400 mb-6 line-clamp-3">
                Core serverless notification router microservice built with Go. Designed to securely process and dispatch multi-channel payloads across the AWS ecosystem.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="text-xs font-medium px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full">Go</span>
                <span className="text-xs font-medium px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full">AWS API Gateway</span>
                <span className="text-xs font-medium px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full">Microservice</span>
              </div>
              <a href="https://github.com/FrenekLopez/forms-nexus-svc" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-orange-500 transition-colors focus-visible:outline-none focus-visible:text-orange-500">
                View on GitHub <span className="text-orange-500 group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>

            <div className="group bg-[#1a2332] rounded-lg p-8 border border-slate-800/50 hover:border-orange-500/30 transition-all hover:-translate-y-1">
              <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">Umami Cloud Go</h4>
              <p className="text-slate-400 mb-6 line-clamp-3">
                A robust cloud-native backend service built in Go. Implements high-performance data handling, clean architecture, and scalable RESTful API endpoints.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="text-xs font-medium px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full">Go</span>
                <span className="text-xs font-medium px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full">Cloud</span>
                <span className="text-xs font-medium px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full">REST API</span>
              </div>
              <a href="https://github.com/IlmarLopez/umami-cloud-go" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-orange-500 transition-colors focus-visible:outline-none focus-visible:text-orange-500">
                View on GitHub <span className="text-orange-500 group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section id="contact" className="pt-16">
          <div className="flex flex-col md:flex-row gap-16 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <span className="h-[2px] w-12 bg-orange-500 inline-block"></span>
                <h3 className="text-slate-400 font-semibold uppercase tracking-wider">Contacts</h3>
              </div>
              <h2 className="text-5xl font-bold text-white mb-8 leading-tight">
                Have a project?<br/>Let's talk!
              </h2>
            </div>

            <div className="flex-1 w-full">
              <form ref={formRef} action={handleFormSubmit} className="flex flex-col gap-8">
                <div>
                  <input
                    type="text"
                    name="name"
                    required
                    disabled={isSubmitting}
                    placeholder="Name"
                    className="w-full bg-transparent border-b border-slate-700 pb-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  />
                </div>
                
                <div>
                  <input
                    type="email"
                    name="email"
                    required
                    disabled={isSubmitting}
                    placeholder="Email"
                    className="w-full bg-transparent border-b border-slate-700 pb-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  />
                </div>

                <div className="relative">
                  <select
                    name="target_channel"
                    defaultValue="telegram"
                    disabled={isSubmitting}
                    className="w-full bg-transparent border-b border-slate-700 pb-3 text-white focus:outline-none focus:border-orange-500 focus:ring-0 appearance-none disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <option value="telegram" className="bg-[#0f1624] text-white">Route to: Telegram</option>
                    <option value="email" className="bg-[#0f1624] text-white">Route to: Email</option>
                  </select>
                  <div className="pointer-events-none absolute right-0 top-0 bottom-3 flex items-center px-2 text-slate-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>

                <div>
                  <textarea
                    name="message"
                    required
                    rows={1}
                    disabled={isSubmitting}
                    placeholder="Message"
                    className="w-full bg-transparent border-b border-slate-700 pb-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-0 resize-none overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-10 rounded transition-all disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center justify-center min-w-[160px] shadow-lg shadow-orange-500/20 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500 focus-visible:ring-offset-[#0f1624]"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>

                {status === "success" && <p className="text-orange-400 text-sm mt-2 animate-pulse">Message transmitted successfully.</p>}
                {status === "error" && <p className="text-red-500 text-sm mt-2">Failed to process request. Please check CORS policy or AWS logs.</p>}
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-800/50 mt-16 pt-8 pb-4">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6">
            <div className="text-slate-500 text-sm font-medium">
              © {new Date().getFullYear()} Eric Lopez. All rights reserved.
            </div>
            
            <div className="flex items-center gap-5">
              <a href="https://github.com/FrenekLopez" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-orange-500 hover:-translate-y-1 transition-all duration-300 focus-visible:outline-none focus-visible:text-orange-500" aria-label="GitHub Profile">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </a>

              <a href="https://www.linkedin.com/in/eric-lopez-650196348/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-orange-500 hover:-translate-y-1 transition-all duration-300 focus-visible:outline-none focus-visible:text-orange-500" aria-label="LinkedIn Profile">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>

              <a href="https://x.com/LrFrenek" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-orange-500 hover:-translate-y-1 transition-all duration-300 focus-visible:outline-none focus-visible:text-orange-500" aria-label="X Profile">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.96H5.078z"/>
                </svg>
              </a>

              <a href="https://www.facebook.com/share/1Cqt7KDhEh/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-orange-500 hover:-translate-y-1 transition-all duration-300 focus-visible:outline-none focus-visible:text-orange-500" aria-label="Facebook Profile">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </footer>

      </div>
    </main>
  );
}