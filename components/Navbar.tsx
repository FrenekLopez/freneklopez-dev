"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-8 md:bottom-auto md:top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-auto flex justify-center"
    >
      <nav className="flex items-center justify-center gap-4 md:gap-10 px-6 md:px-8 py-3 rounded-full bg-[#0a0f1a]/80 backdrop-blur-md border border-white/10 w-max shadow-lg shadow-black/50 md:shadow-none">
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
