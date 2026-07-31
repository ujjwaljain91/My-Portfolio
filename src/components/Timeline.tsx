"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { portfolioConfig, Experience } from "@/portfolio-config";

export default function Timeline() {
  return (
    <section id="experience" className="py-20 md:py-28 bg-gray-50/50 section-divider relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 pb-6 border-b border-gray-200"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-900" />
            Career History
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            Work Experience Timeline
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Chronological summary of product design roles across SaaS analytics, construction ERP apps, and institutional innovation cells.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-8">
          {/* Animated Timeline Line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-900 via-gray-300 to-gray-200 origin-top"
          />

          <div className="space-y-10">
            {portfolioConfig.experience.map((exp: Experience, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="relative group"
              >
                {/* Timeline Left Node Indicator */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + idx * 0.12, type: "spring", stiffness: 500, damping: 20 }}
                  className="absolute -left-[31px] sm:-left-[39px] top-2 w-4 h-4 rounded-full bg-white border-2 border-gray-900 group-hover:bg-gray-900 transition-all duration-300 shadow-sm group-hover:shadow-md flex items-center justify-center"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-900 group-hover:bg-white transition-colors duration-300" />
                </motion.div>

                {/* Experience Card */}
                <motion.div
                  whileHover={{ scale: 1.01, y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="card-surface rounded-2xl p-6 sm:p-8"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        {exp.company}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-black transition-colors duration-300">
                        {exp.role}
                      </h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 font-medium">
                      <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1 rounded-md border border-gray-200 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        {exp.period}
                      </span>
                      <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1 rounded-md border border-gray-200 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Bullets List */}
                  <div className="space-y-3 pt-2">
                    {exp.bullets.map((bullet, bIdx) => (
                      <motion.div
                        key={bIdx}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + bIdx * 0.06, duration: 0.4 }}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-600 leading-relaxed"
                      >
                        <CheckCircle2 className="w-4 h-4 text-gray-900 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
