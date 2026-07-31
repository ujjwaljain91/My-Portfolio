"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Sparkles } from "lucide-react";
import { portfolioConfig, Project } from "@/portfolio-config";

export default function SelectedWork() {
  return (
    <section id="selected-work" className="py-20 md:py-28 bg-white section-divider relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Title & Header */}
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
              Case Studies
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
              Selected Work & Architectures
            </h2>
          </div>
          <p className="text-sm text-gray-500 mt-2 md:mt-0 max-w-md">
            Deep dive into multi-step web & mobile products, AI interaction engines, and behavioral UX architectures.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolioConfig.projects.map((project: Project, idx: number) => {
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                className={`group card-surface rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-400 ${
                  project.featured ? "col-span-1 md:col-span-2 shimmer-on-hover" : "col-span-1"
                }`}
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + idx * 0.05, duration: 0.4 }}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 border border-gray-200/80"
                      >
                        <Sparkles className="w-3 h-3 text-gray-900" />
                        {project.category}
                      </motion.span>

                      {project.badge && (
                        <span className="inline-flex items-center px-2.5 py-1 bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-medium rounded-md">
                          {project.badge}
                        </span>
                      )}
                    </div>

                    {project.period ? (
                      <span className="text-xs text-gray-400 font-mono">
                        {project.period}
                      </span>
                    ) : project.featured ? (
                      <span className="text-xs text-gray-400 font-mono">
                        Featured 0→1 Case Study
                      </span>
                    ) : null}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight group-hover:text-black mb-1 transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-sm font-semibold text-gray-700 mb-3">
                    {project.tagline}
                  </p>

                  <p className="text-sm text-gray-600 leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Card Footer: Tags & Behance Action Button */}
                <div className="pt-6 border-t border-gray-200/80 flex flex-wrap items-center justify-between gap-4 mt-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIdx) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, y: 6 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + tagIdx * 0.04, duration: 0.3 }}
                        className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:text-gray-800 transition-all duration-200"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  <motion.a
                    href={project.behanceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-gray-900 hover:bg-black transition-all duration-300 shadow-sm hover:shadow-md group/btn cta-glow"
                  >
                    <span>View Case Study on Behance</span>
                    <ExternalLink className="w-3.5 h-3.5 text-gray-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                  </motion.a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
