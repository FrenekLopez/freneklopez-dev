"use client";

import React, { useState, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";
import { z } from "zod";

// Data Layers & Configuration Imports
import { ContactPayload } from "../types";
import { fadeUpVariant } from "../constants/animations";

// Decoupled Structural & Feature Components
import SocialSidebar from "../components/SocialSidebar";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import TimelineSection from "../components/TimelineSection";
import SkillsSection from "../components/SkillsSection";
import ProjectsCarousel from "../components/ProjectsCarousel";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";

// FORM SANITIZATION SCHEMA DEFINITION
// Strict input validation rules preventing script injections, buffer overflows, and malformed emails
const contactValidationSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50, { message: "Name cannot exceed 50 characters." })
    .regex(/^[a-zA-Z\sñÑáéíóúÁÉÍÓÚüÜ]*$/, { message: "Name can only contain letters and spaces." }), // Strict sanitization against XSS scripts
  email: z
    .email({ message: "Please enter a valid email address." }), // Modern Zod v4 syntax
  target_channel: z
    .enum(["telegram", "slack", "email", "discord"], { message: "Invalid target channel." }), // Ensures value matches backend routing expected parameters
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long." })
    .max(1000, { message: "Message cannot exceed 1000 characters." })
});

// RESOURCE INTERACTIVE APPLICATION CORE LAYOUT
// Orchestration root component handling application layout, runtime global states,
// interface triggers, and external transactional API pipelines.
export default function Home() {
  // RUNTIME STATE LIFECYCLE MANAGEMENT
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" >("idle");
  const [activeTab, setActiveTab] = useState<"experience" | "education">("experience");
  
  // DOM Elements Node References
  const formRef = useRef<HTMLFormElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isSubmitting = status === "loading";

  // USER INTERACTION INTERFACE HANDLERS
  
  /**
   * Triggers manual dynamic view scrolling inside viewport container elements
   * @param direction Lateral displacement direction target matrix
   */
  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  /**
   * Evaluates native payload parameters, sanitizes inputs through Zod schema, and dispatches data upstream
   * @param formData Native browser form submission data snapshot layer
   */
  const handleFormSubmit = async (formData: FormData) => {
    setStatus("loading");
    const loadingToastId = toast.loading("Processing your message...");
    const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;

    if (!apiUrl) {
      setStatus("error");
      toast.error("Configuration Error: API Gateway URL is missing.", { id: loadingToastId });
      return;
    }

    // 1. Extract and map raw input data fields into a temporary object
    const rawPayload = {
      name: (formData.get("name")?.toString() || "").trim(),
      email: (formData.get("email")?.toString() || "").trim(),
      target_channel: (formData.get("target_channel")?.toString() || "telegram"),
      message: (formData.get("message")?.toString() || "").trim(),
    };

    // 2. Perform validation and input sanitization layer checks using Zod (Ticket FL-6)
    const validationResult = contactValidationSchema.safeParse(rawPayload);

    if (!validationResult.success) {
      // Extract the exact validation error message declared in your Zod schema using official .issues array
      const firstErrorMessage = validationResult.error.issues[0]?.message || "Invalid input data.";
      setStatus("error");
      toast.error(`Validation Error: ${firstErrorMessage}`, { id: loadingToastId });
      setTimeout(() => setStatus("idle"), 3000);
      return; // CRITICAL: Absolute block to stop execution before making upstream fetch network calls
    }

    // 3. Process secure and sanitized payload to API Endpoint
    try {
      // validationResult.data contains the fully typed and verified data layers safely parsed
      const payload: ContactPayload = validationResult.data;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`API Request Failed. Status: ${response.status}`);
      
      setStatus("success");
      toast.success("Message transmitted successfully! I'll get back to you soon.", { id: loadingToastId });
      formRef.current?.reset(); 
      setTimeout(() => setStatus("idle"), 3000);
      
    } catch (error) {
      console.error("Form dispatch failed:", error);
      setStatus("error");
      toast.error("Failed to transmit message. Please try again later.", { id: loadingToastId });
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  // CORE LAYOUT ORCHESTRATION VIEW
  return (
    <main className="min-h-screen bg-[#0f1624] text-slate-300 font-sans selection:bg-blue-500/30 relative overflow-hidden">
      
      {/* Global Framework Notifications Provider Layer */}
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: { background: '#1a2332', color: '#fff', border: '1px solid #334155' },
          success: { iconTheme: { primary: '#3b82f6', secondary: '#fff' } }
        }} 
      />

      {/* Global Interface Sticky Background Shell Elements */}
      <SocialSidebar />
      <Navbar />

      {/* Synchronized Content View Sections Staging Row */}
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-32 pb-16 md:pl-28">
        
        <HeroSection />
        
        <TimelineSection activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <SkillsSection />
        
        <ProjectsCarousel carouselRef={carouselRef} scrollCarousel={scrollCarousel} />
        
        <ContactForm formRef={formRef} onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
        
        <Footer />
        
      </div>

    </main>
  );
}
