"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, FileText, ArrowUp, Copy, Check } from "lucide-react";
import LinkedinIcon from "@/components/icons/LinkedinIcon";
import { portfolioConfig } from "@/portfolio-config";

export default function Footer() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(portfolioConfig.personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white section-divider relative pt-16 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Footer Navigation & Social Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-gray-200">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-gray-900 text-white rounded flex items-center justify-center font-bold text-xs">
                UJ
              </div>
              <span className="font-bold text-sm text-gray-900 tracking-wider">
                {portfolioConfig.personal.name}
              </span>
            </div>
            <p className="text-xs text-gray-500 max-w-sm leading-relaxed mb-4">
              {portfolioConfig.personal.metaDescription}
            </p>
            <div className="text-xs font-medium text-gray-600">
              {portfolioConfig.personal.navRole} • {portfolioConfig.personal.location}
            </div>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
              Quick Links
            </div>
            <ul className="space-y-2 text-xs font-medium text-gray-600">
              <li>
                <a href="#selected-work" className="hover:text-gray-900 transition-colors duration-200">
                  Selected Work
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-gray-900 transition-colors duration-200">
                  Experience History
                </a>
              </li>
              <li>
                <a href="#sandbox" className="hover:text-gray-900 transition-colors duration-200">
                  Web Sandbox
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-gray-900 transition-colors duration-200">
                  Engineering Advantage
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
              Connect & Outreach
            </div>
            <ul className="space-y-2 text-xs font-medium text-gray-600">
              <li className="flex items-center gap-1.5">
                <a
                  href={`mailto:${portfolioConfig.personal.email}`}
                  className="inline-flex items-center gap-1.5 hover:text-gray-900 transition-colors duration-200"
                >
                  <Mail className="w-3.5 h-3.5 text-gray-400" />
                  <span>{portfolioConfig.personal.email}</span>
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="p-0.5 rounded text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all group inline-flex items-center justify-center align-middle"
                  title={copiedEmail ? "Copied!" : "Copy email address"}
                  aria-label="Copy email address"
                >
                  {copiedEmail ? (
                    <Check className="w-3 h-3 text-emerald-500" />
                  ) : (
                    <Copy className="w-3 h-3 group-hover:scale-105 transition-transform" />
                  )}
                </button>
              </li>
              <li>
                <motion.a
                  href={portfolioConfig.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 2 }}
                  className="inline-flex items-center gap-1.5 hover:text-gray-900 transition-colors duration-200"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 text-gray-400" />
                  <span>LinkedIn Profile</span>
                  <ArrowUpRight className="w-3 h-3 text-gray-400" />
                </motion.a>
              </li>
              <li>
                <motion.a
                  href={portfolioConfig.personal.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 2 }}
                  className="inline-flex items-center gap-1.5 hover:text-gray-900 transition-colors duration-200"
                >
                  <FileText className="w-3.5 h-3.5 text-gray-400" />
                  <span>PDF Resume</span>
                  <ArrowUpRight className="w-3 h-3 text-gray-400" />
                </motion.a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-medium">
          <div>
            © 2026 UJJWAL JAIN. Let's build something meaningful together
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 transition-all duration-300 hover:shadow-sm group"
          >
            <span>Back to top</span>
            <motion.span
              className="inline-flex"
              animate={{ y: [0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </motion.span>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
