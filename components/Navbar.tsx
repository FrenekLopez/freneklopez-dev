"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-8 md:bottom-auto md:top-0 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 z-50 w-[90%] md:w-full flex md:justify-between items-center md:px-12 md:py-4 md:bg-[#0a0f1a]/80 md:backdrop-blur-md md:border-b md:border-white/10 transition-all"
    >
      <div className="hidden md:block font-bold text-white tracking-widest text-lg">
        FULLSTACK<span className="text-blue-600">.</span>
      </div>
      <nav className="flex items-center justify-center gap-4 md:gap-10 px-6 md:px-0 py-3 md:py-0 rounded-full md:rounded-none bg-[#0a0f1a]/80 md:bg-transparent backdrop-blur-md md:backdrop-blur-none border border-white/10 md:border-none">
        <a
          href="#home"
          className="text-xs md:text-sm font-medium text-slate-300 hover:text-white hover:-translate-y-0.5 transition-all"
        >
          Home
        </a>
        <a
          href="#experience"
          className="text-xs md:text-sm font-medium text-slate-300 hover:text-white hover:-translate-y-0.5 transition-all"
        >
          Experience
        </a>
        <a
          href="#projects"
          className="text-xs md:text-sm font-medium text-slate-300 hover:text-white hover:-translate-y-0.5 transition-all"
        >
          Projects
        </a>
        <a
          href="#contact"
          className="text-xs md:text-sm font-medium text-slate-300 hover:text-white hover:-translate-y-0.5 transition-all"
        >
          Contact
        </a>
      </nav>
    </motion.header>
  );
}
