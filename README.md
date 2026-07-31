# ✦ Ujjwal Jain — Product Designer Portfolio

> **Product Designer specializing in 0→1 mobile & web architectures, behavioral UX, and scalable design systems.**

[![Next.js](https://img.shields.io/badge/Next.js-14%2B-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0-black?style=flat-square&logo=framer)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-MIT-emerald?style=flat-square)](LICENSE)

---

## 🎨 Overview & Design Philosophy

This repository contains the source code for my personal Product Design portfolio. Designed with an **ultra-clean light-mode design system**, editorial typography, and hardware-accelerated fluid micro-interactions, the site serves as a live showcase of my case studies, technical edge, and web experiments.

### 🌟 Key Highlights

- **Fisheye Radial Canvas Distortion:** Interactive HTML5 Canvas grid background that smoothly warps and bends around mouse coordinates with zero main-thread lag.
- **Single-Source Data Architecture:** Powered by a clean, typed configuration engine (`src/portfolio-config.ts`), making content updates completely decoupled from UI components.
- **Hardware-Accelerated Motion:** Built with Framer Motion spring physics (`stiffness: 100, damping: 25`) bypassing React re-renders for buttery-smooth 120fps interactions.
- **Domain-Agnostic Product Strategy:** Highlights core design capabilities across fintech, AI workflows, healthtech, and civic tools.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animation & Physics:** [Framer Motion](https://www.framer.com/motion/) & HTML5 Canvas Context
- **Icons:** [Lucide React](https://lucide.dev/)
- **Deployment:** [Vercel](https://vercel.com/) / [Netlify](https://www.netlify.com/)

---

## 📁 Repository Structure

```text
├── public/
│   ├── ujjwal_jain_resume.pdf   # 1-Page PDF Resume
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Global Metadata & Font Providers
│   │   ├── page.tsx             # Main Portfolio Page Architecture
│   │   └── globals.css          # Tailwind Directives & Base Canvas Styles
│   ├── components/
│   │   ├── Header.tsx           # Fixed Sticky Navigation Bar
│   │   ├── Hero.tsx             # Editorial Grid Hero with Interactive Canvas
│   │   ├── SelectedWork.tsx     # Deep Case Study Showcase
│   │   ├── Timeline.tsx         # Professional Internship Experience
│   │   ├── Sandbox.tsx          # Agentic Web Prototypes Sandbox
│   │   ├── Achievements.tsx     # Hackathons & Honors
│   │   └── Footer.tsx           # Design & Tech Statement + CTAs
│   └── portfolio-config.ts      # Master Portfolio Data & Content Config
├── .gitignore                   # Safe Git Ignored Files (.env, node_modules)
├── package.json
├── tailwind.config.ts
└── tsconfig.json
