"use client";

import React from "react";
import { motion } from "framer-motion";

// COMPONENT: MAIN NAVIGATION BAR HEADER
// Application header orchestration handling routing nodes and anchor references

export default function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-auto"
    >
      <nav className="flex items-center justify-center gap-6 md:gap-10 px-8 py-3 rounded-full bg-[#0a0f1a]/80 backdrop-blur-md border border-white/10 shadow-lg shadow-blue-900/20">
        <a
          href="#home"
          className="text-sm font-medium text-slate-300 hover:text-white hover:-translate-y-0.5 transition-all"
        >
          Home
        </a>
        <a
          href="#experience"
          className="text-sm font-medium text-slate-300 hover:text-white hover:-translate-y-0.5 transition-all"
        >
          Experience
        </a>
        <a
          href="#projects"
          className="text-sm font-medium text-slate-300 hover:text-white hover:-translate-y-0.5 transition-all"
        >
          Projects
        </a>
        <a
          href="#contact"
          className="text-sm font-medium text-slate-300 hover:text-white hover:-translate-y-0.5 transition-all"
        >
          Contact
        </a>
      </nav>
    </motion.header>
  );
}
