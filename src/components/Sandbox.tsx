"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Rocket } from "lucide-react";
import { portfolioConfig, Prototype } from "@/portfolio-config";

export default function Sandbox() {
  return (
    <section id="sandbox" className="py-20 md:py-28 bg-white section-divider relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-gray-200"
        >
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-900" />
              Live Prototypes
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
              Web Sandbox & Functional Apps
            </h2>
          </div>
          <p className="text-sm text-gray-500 mt-2 md:mt-0 max-w-md">
            Interactive web applications and functional prototypes. Click any card to launch the live application directly.
          </p>
        </motion.div>

        {/* 4 Card Prototype Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolioConfig.prototypes.map((proto: Prototype, idx: number) => (
            <motion.a
              key={proto.id}
              href={proto.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="card-surface rounded-2xl p-6 flex flex-col justify-between cursor-pointer group transition-all duration-400"
            >
              <div>
                {/* Header Category Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold bg-gray-100 text-gray-800 border border-gray-200/80">
                    {proto.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 group-hover:text-black mb-2 flex items-center gap-1.5 transition-colors duration-300">
                  <span>{proto.title}</span>
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed mb-6">
                  {proto.description}
                </p>
              </div>

              {/* Direct Launch Button */}
              <div>
                <div className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold text-white bg-gray-900 group-hover:bg-black transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm group-hover:shadow-md cta-glow">
                  <motion.span
                    className="inline-flex"
                    animate={{ rotate: 0 }}
                    whileHover={{ rotate: [0, -10, 10, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Rocket className="w-3.5 h-3.5 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                  </motion.span>
                  <span>Launch Prototype</span>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
