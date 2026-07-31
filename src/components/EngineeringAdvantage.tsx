"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Compass, BookOpen } from "lucide-react";
import { portfolioConfig } from "@/portfolio-config";

export default function EngineeringAdvantage() {
  return (
    <section id="about" className="py-20 md:py-24 bg-gray-50/50 section-divider relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* About Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className="card-surface rounded-3xl p-8 flex flex-col justify-between group transition-all duration-400"
          >
            <div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-[0_1px_2px_rgba(0,0,0,0.03)] text-xs font-bold uppercase tracking-wider text-gray-700 mb-6 cursor-default"
              >
                <motion.span
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="inline-flex"
                >
                  <Compass className="w-3.5 h-3.5 text-gray-900" />
                </motion.span>
                Design Philosophy
              </motion.div>

              <h3 className="text-2xl font-bold tracking-tight text-gray-900 mb-4 leading-snug group-hover:text-black transition-colors duration-300">
                {portfolioConfig.about.headline}
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                {portfolioConfig.about.body}
              </p>
            </div>

            <div className="pt-4 border-t border-gray-200/80 text-xs font-medium text-gray-500">
              Low Cognitive Load • Accessibility First • Behavioral Design
            </div>
          </motion.div>

          {/* Engineering Advantage Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className="card-surface rounded-3xl p-8 flex flex-col justify-between bg-gradient-to-b from-white to-gray-50 group transition-all duration-400"
          >
            <div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-[0_1px_2px_rgba(0,0,0,0.03)] text-xs font-bold uppercase tracking-wider text-gray-700 mb-6 cursor-default"
              >
                <motion.span
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="inline-flex"
                >
                  <Cpu className="w-3.5 h-3.5 text-gray-900" />
                </motion.span>
                {portfolioConfig.engineeringAdvantage.title}
              </motion.div>

              <h3 className="text-2xl font-bold tracking-tight text-gray-900 mb-4 leading-snug group-hover:text-black transition-colors duration-300">
                &quot;{portfolioConfig.engineeringAdvantage.headline}&quot;
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                {portfolioConfig.engineeringAdvantage.statement}
              </p>
            </div>

            <div className="pt-4 border-t border-gray-200/80 flex items-center gap-2 text-xs font-medium text-gray-600">
              <BookOpen className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span>
                {portfolioConfig.engineeringAdvantage.degree} — {portfolioConfig.engineeringAdvantage.institution}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
