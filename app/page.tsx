"use client";

import React, { useState, useRef } from "react";
import { Toaster } from "react-hot-toast";

// Data Layers & Configuration Imports
import { fadeUpVariant } from "../constants/animations";
import { executeFormSubmission } from "../services/contactService"; // Correct relative path mapping

// Decoupled Structural & Feature Components
import SocialSidebar from "../components/SocialSidebar";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import TimelineSection from "../components/TimelineSection";
import SkillsSection from "../components/SkillsSection";
import ProjectsCarousel from "../components/ProjectsCarousel";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";

export default function Home() {
  // RUNTIME STATE LIFECYCLE MANAGEMENT
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" >("idle");
  const [activeTab, setActiveTab] = useState<"experience" | "education">("experience");
  
  // DOM Elements Node References
  const formRef = useRef<HTMLFormElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isSubmitting = status === "loading";

  // USER INTERACTION INTERFACE HANDLERS
  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // CORE LAYOUT ORCHESTRATION VIEW
  return (
    <main className="min-h-screen bg-[#0f1624] text-slate-300 font-sans selection:bg-blue-500/30 relative overflow-hidden">
      
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: { background: '#1a2332', color: '#fff', border: '1px solid #334155' },
          success: { iconTheme: { primary: '#3b82f6', secondary: '#fff' } }
        }} 
      />

      <SocialSidebar />
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-32 pb-16 md:pl-28">
        <HeroSection />
        <TimelineSection activeTab={activeTab} setActiveTab={setActiveTab} />
        <SkillsSection />
        <ProjectsCarousel carouselRef={carouselRef} scrollCarousel={scrollCarousel} />
        
        <ContactForm 
          formRef={formRef} 
          onSubmit={(formData) => executeFormSubmission({ formData, setStatus, formRef })} 
          isSubmitting={isSubmitting} 
        />
        
        <Footer />
      </div>

    </main>
  );
}
