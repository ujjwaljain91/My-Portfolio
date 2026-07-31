"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X, FileText } from "lucide-react";
import LinkedinIcon from "@/components/icons/LinkedinIcon";
import { portfolioConfig } from "@/portfolio-config";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Work", href: "#selected-work" },
    { name: "Experience", href: "#experience" },
    { name: "Sandbox", href: "#sandbox" },
    { name: "Achievements", href: "#achievements" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        scrolled
          ? "bg-white/60 backdrop-blur-2xl backdrop-saturate-[1.8] border-b border-gray-200/50 shadow-[0_1px_3px_rgba(0,0,0,0.04)] py-3"
          : "bg-white/95 backdrop-blur-sm py-5 border-b border-gray-100/80"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Left Branding */}
        <a
          href="#"
          className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 rounded-md p-1 -ml-1 transition-transform active:scale-[0.98]"
          aria-label="Ujjwal Jain Home"
        >
          <motion.div
            whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="w-7 h-7 bg-gray-900 text-white rounded-md flex items-center justify-center font-bold text-xs shadow-sm group-hover:shadow-md transition-shadow"
          >
            UJ
          </motion.div>
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-sm tracking-wider text-gray-900 group-hover:text-black uppercase">
              {portfolioConfig.personal.name}
            </span>
            <span className="text-gray-400 text-xs hidden sm:inline">•</span>
            <span className="text-xs text-gray-500 font-medium hidden sm:inline">
              {portfolioConfig.personal.navRole}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors duration-300 tracking-wide relative group py-1"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gray-900 transition-all duration-300 ease-out group-hover:w-full rounded-full" />
            </a>
          ))}

          <div className="h-4 w-px bg-gray-200/80" />

          {/* Social & Resume CTAs */}
          <a
            href={portfolioConfig.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors duration-300 group"
          >
            <span>LinkedIn</span>
            <ArrowUpRight className="w-3 h-3 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </a>

          <motion.a
            href={portfolioConfig.personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-gray-900 hover:bg-black rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cta-glow"
          >
            <FileText className="w-3.5 h-3.5 text-gray-300" />
            <span>Resume</span>
            <ArrowUpRight className="w-3 h-3 text-gray-300" />
          </motion.a>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <motion.button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
          className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 focus:outline-none transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </motion.button>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-b border-gray-200/60 px-6 py-5 shadow-lg overflow-hidden"
          >
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider pb-1">
              Navigation
            </div>
            {navLinks.map((link, idx) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
                className="block text-sm font-medium text-gray-800 hover:text-black py-2"
              >
                {link.name}
              </motion.a>
            ))}
            <div className="h-px bg-gray-100 my-2" />
            <div className="flex flex-col gap-3">
              <a
                href={portfolioConfig.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-sm font-medium text-gray-700 py-1"
              >
                <span className="flex items-center gap-2">
                  <LinkedinIcon className="w-4 h-4 text-gray-500" /> LinkedIn
                </span>
                <ArrowUpRight className="w-4 h-4 text-gray-400" />
              </a>

              <a
                href={portfolioConfig.personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-gray-900 rounded-lg shadow-sm cta-glow"
              >
                <FileText className="w-4 h-4" />
                <span>View Resume (PDF)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
