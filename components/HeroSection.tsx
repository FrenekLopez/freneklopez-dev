"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUpVariant } from "../constants/animations";

export default function HeroSection() {
  return (
    <motion.section 
      initial="hidden" 
      animate="visible" 
      variants={fadeUpVariant}
      className="flex flex-col md:flex-row gap-16 items-center justify-between pt-36"
    >
      <div className="flex-1 w-full flex justify-center md:justify-start relative">
        <div className="absolute top-1/2 left-1/2 md:left-[40%] -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/15 blur-[100px] -z-10 rounded-full pointer-events-none"></div>
        <div className="relative w-full max-w-[320px] aspect-[3/4] md:max-w-[400px] rounded-3xl bg-[#1a2332] z-10 overflow-hidden shadow-2xl border border-slate-800/80 group">
          <Image 
            src="/desarrollador-eric.jpg" 
            alt="Resource Profile Identification Layer"
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
          Cloud <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-600">
            Architecture
          </span>
        </h1>
        <p className="text-slate-400 mb-10 text-lg leading-relaxed max-w-lg">
          Highly motivated Software Engineer specializing in backend software development leveraging Go (Golang). Demonstrated logical thinking, strong problem-solving capabilities, and a collaborative team mindset.
        </p>
        <a 
          href="/cv-eric.pdf" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="group relative inline-flex items-center gap-3 bg-[#1a2332] border border-blue-500/50 text-blue-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 px-8 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1624]"
        >
          Resume
          <svg className="w-5 h-5 fill-current group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" xmlns="http://w3.org">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v6h6v10H6z"/>
          </svg>
        </a>
      </div>
    </motion.section>
  );
}
