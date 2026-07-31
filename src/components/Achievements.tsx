"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Trophy, Star, Sparkles } from "lucide-react";
import { portfolioConfig, Achievement } from "@/portfolio-config";

export default function Achievements() {
  return (
    <section id="achievements" className="py-20 md:py-28 bg-gray-50/50 section-divider relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 pb-6 border-b border-gray-200"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-900" />
            Honors & Milestones
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            Achievements & Awards
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Hackathon victories, Google Student Ambassador (GSA) selection, and design competition honors.
          </p>
        </motion.div>

        {/* Achievements List Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {portfolioConfig.achievements.map((item: Achievement, idx: number) => {
            let badgeText = "🏆 Achievement";
            let IconComponent = Trophy;

            if (item.title.toLowerCase().includes("winner")) {
              badgeText = "🥇 1st Place Winner";
              IconComponent = Trophy;
            } else if (item.title.toLowerCase().includes("google")) {
              badgeText = "🌟 Google Ambassador";
              IconComponent = Star;
            } else if (item.title.toLowerCase().includes("special mention")) {
              badgeText = "🎨 Special Mention";
              IconComponent = Award;
            } else if (item.title.toLowerCase().includes("2nd position")) {
              badgeText = "🥈 2nd Position";
              IconComponent = Trophy;
            }

            // Alternating entrance: even from left, odd from right
            const slideX = idx % 2 === 0 ? -20 : 20;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: slideX, y: 8 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="card-surface rounded-2xl p-6 flex flex-col justify-between group transition-all duration-400"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-white text-gray-900 border border-gray-200 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                      {badgeText}
                    </span>
                    <motion.span
                      whileHover={{ rotate: [0, -15, 15, -10, 10, 0], scale: 1.15 }}
                      transition={{ duration: 0.5 }}
                      className="inline-flex"
                    >
                      <IconComponent className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-300" />
                    </motion.span>
                  </div>

                  <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug group-hover:text-black transition-colors duration-300">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed">
                    {item.detail}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-200/60 flex items-center gap-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider golden-shimmer-hover cursor-default">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Verified Recognition
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
