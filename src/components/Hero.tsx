"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { ArrowDown, ArrowUpRight, Sparkles, Cpu, Layers, ShieldCheck, Compass } from "lucide-react";
import { portfolioConfig } from "@/portfolio-config";

import InteractiveGridCanvas from "./InteractiveGridCanvas";

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const capabilities = [
    { icon: Layers, text: "Mobile & Web UX" },
    { icon: ShieldCheck, text: "Design Systems" },
    { icon: Cpu, text: "Behavioral Psychology" },
    { icon: Compass, text: "Accessibility (WCAG)" },
  ];

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-white relative overflow-hidden">
      {/* Interactive 3D Fisheye Canvas Grid Accent */}
      <InteractiveGridCanvas />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start"
        >
          {/* Status Pill Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold text-gray-700 tracking-wide">
                Available for Product Design Roles • {portfolioConfig.personal.location}
              </span>
            </div>
          </motion.div>

          {/* Main H1 Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.12] mb-6"
          >
            <span className="inline-block">Product Designer crafting intuitive{" "}</span>
            <span className="bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 bg-clip-text text-transparent">
              mobile & web applications
            </span>
            <span className="inline-block"> from 0→1.</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-gray-500 font-normal leading-relaxed max-w-3xl mb-8"
          >
            {portfolioConfig.hero.subheadline}
          </motion.p>

          {/* Capabilities Pill Badges */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-2.5 mb-10"
          >
            {capabilities.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + idx * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.04, y: -1 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/80 backdrop-blur-sm border border-gray-200/90 text-xs font-medium text-gray-700 hover:border-gray-300 hover:shadow-sm transition-all duration-300 cursor-default"
                >
                  <IconComp className="w-3.5 h-3.5 text-gray-500" />
                  <span>{item.text}</span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
          >
            <motion.a
              href="#selected-work"
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-semibold text-white bg-gray-900 hover:bg-black rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group w-full sm:w-auto cta-glow"
            >
              <span>{portfolioConfig.hero.primaryCta}</span>
              <ArrowDown className="w-4 h-4 text-gray-300 group-hover:translate-y-0.5 transition-transform duration-300" />
            </motion.a>

            <motion.a
              href={portfolioConfig.personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-gray-800 bg-white/90 backdrop-blur-sm hover:bg-white border border-gray-200 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-gray-300 transition-all duration-300 group w-full sm:w-auto"
            >
              <span>{portfolioConfig.hero.secondaryCta}</span>
              <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-gray-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
