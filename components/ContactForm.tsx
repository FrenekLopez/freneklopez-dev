"use client";

import React, { RefObject } from "react";
import { motion } from "framer-motion";
import { fadeUpVariant } from "../constants/animations";

interface ContactFormProps {
  formRef: RefObject<HTMLFormElement | null>;
  onSubmit: (formData: FormData) => void;
  isSubmitting: boolean;
}

export default function ContactForm({ formRef, onSubmit, isSubmitting }: ContactFormProps) {
   const handleSubmit = (e: React.BaseSyntheticEvent) => {
    e.preventDefault(); // Prevents browser hard-reload keeping user inputs intact on error
    const data = new FormData(e.currentTarget);
    onSubmit(data); // Safely dispatches the plain FormData upstream to your page.tsx
  };

  return (
    <motion.section 
      id="contact" 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeUpVariant}
      className="pt-16"
    >
      <div className="flex flex-col md:flex-row gap-16 items-start">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <span className="h-[2px] w-12 bg-blue-500 inline-block"></span>
            <h3 className="text-slate-400 font-semibold uppercase tracking-wider">Contacts</h3>
          </div>
          <h2 className="text-5xl font-bold text-white mb-8 leading-tight">Have a project?<br/>Let's talk!</h2>
        </div>
        <div className="flex-1 w-full">
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-8">
            <input type="text" name="name" required disabled={isSubmitting} placeholder="Name" className="w-full bg-transparent border-b border-slate-700 pb-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all" />
            <input type="email" name="email" required disabled={isSubmitting} placeholder="Email" className="w-full bg-transparent border-b border-slate-700 pb-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all" />
            <div className="relative">
              <select name="target_channel" defaultValue="telegram" disabled={isSubmitting} className="w-full bg-transparent border-b border-slate-700 pb-3 text-white focus:outline-none focus:border-blue-500 focus:ring-0 appearance-none disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                <option value="telegram" className="bg-[#0f1624] text-white">Route to: Telegram</option>
                <option value="email" className="bg-[#0f1624] text-white">Route to: Email</option>
              </select>
              <div className="pointer-events-none absolute right-0 top-0 bottom-3 flex items-center px-2 text-slate-500">
                <svg className="fill-current h-4 w-4" xmlns="http://w3.org" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
              </div>
            </div>
            <textarea name="message" required rows={4} disabled={isSubmitting} placeholder="Message" className="w-full bg-transparent border-b border-slate-700 pb-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-0 resize-y disabled:opacity-50 disabled:cursor-not-allowed transition-all"></textarea>
            <div className="pt-4">
              <button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-10 rounded transition-all disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center justify-center min-w-[160px] shadow-lg shadow-blue-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1624]">
                {isSubmitting ? "Processing..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.section>
  );
}
