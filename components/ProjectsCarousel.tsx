"use client";

import React, { RefObject } from "react";
import { motion } from "framer-motion";
import { projectsData } from "../data/resumeData";
import { fadeUpVariant } from "../constants/animations";

interface ProjectsCarouselProps {
  carouselRef: RefObject<HTMLDivElement | null>;
  scrollCarousel: (direction: "left" | "right") => void;
}

export default function ProjectsCarousel({
  carouselRef,
  scrollCarousel,
}: ProjectsCarouselProps) {
  return (
    <motion.section
      id="projects"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeUpVariant}
      className="pt-16"
    >
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
        <div className="text-center md:text-left w-full md:w-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
            I Make Incredible <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              Projects
            </span>
          </h2>
        </div>
        <div className="hidden md:flex gap-4">
          <button
            onClick={() => scrollCarousel("left")}
            className="w-12 h-12 rounded-full border border-slate-700 bg-[#1a2332] flex items-center justify-center text-white hover:bg-blue-600 hover:border-blue-600 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Scroll left viewport frame"
          >
            <svg
              className="w-5 h-5 fill-current group-hover:-translate-x-1 transition-transform"
              viewBox="0 0 24 24"
              xmlns="http://w3.org"
            >
              <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
            </svg>
          </button>
          <button
            onClick={() => scrollCarousel("right")}
            className="w-12 h-12 rounded-full border border-slate-700 bg-[#1a2332] flex items-center justify-center text-white hover:bg-blue-600 hover:border-blue-600 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Scroll right viewport frame"
          >
            <svg
              className="w-5 h-5 fill-current group-hover:translate-x-1 transition-transform"
              viewBox="0 0 24 24"
              xmlns="http://w3.org"
            >
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={carouselRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth"
      >
        {projectsData.map((project) => (
          <div
            key={project.id}
            className="w-[85vw] md:w-[450px] snap-center group relative bg-[#131b2c] rounded-[2rem] p-8 md:p-10 border border-slate-800/60 hover:border-blue-500/40 transition-all duration-500 overflow-hidden shrink-0 flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[50px] group-hover:bg-blue-500/20 transition-all duration-500 pointer-events-none"></div>
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="text-5xl font-black text-slate-800/50 group-hover:text-blue-500/20 transition-colors">
                  {project.number}
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  {project.category}
                </span>
              </div>
              <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                {project.title}
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                {project.description}
              </p>
            </div>
            <div>
              <div className="mb-6">
                <p className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wider">
                  Technologies Used
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 text-xs md:text-sm font-medium text-slate-300 bg-transparent border border-slate-700 rounded-full hover:border-blue-500 hover:text-blue-400 transition-colors cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-800/50 text-white text-sm font-bold hover:bg-blue-600 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 group/btn"
              >
                View Project
                <svg
                  className="w-4 h-4 fill-current group-hover/btn:translate-x-1 transition-transform"
                  viewBox="0 0 24 24"
                  xmlns="http://w3.org"
                >
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
