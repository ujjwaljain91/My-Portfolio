export interface Project {
  id: string;
  title: string;
  category: string;
  badge?: string;
  period?: string;
  tagline: string;
  description: string;
  tags: string[];
  behanceUrl: string;
  featured?: boolean;
}

export interface Prototype {
  id: string;
  title: string;
  category: string;
  description: string;
  techStack: string[];
  liveUrl: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
}

export interface Achievement {
  title: string;
  detail: string;
}

export const portfolioConfig = {
  personal: {
    name: "UJJWAL JAIN",
    navRole: "Product Designer",
    location: "Noida, UP, India",
    email: "ujjwaljain.creates@gmail.com",
    phone: "+91 9389864804",
    linkedin: "https://www.linkedin.com/in/ujjwalux/",
    behance: "https://www.behance.net/ujjwaljain",
    resumeUrl: "https://drive.google.com/drive/folders/1NHtGD1onqJ4arSc70F5sUszw0RtG445D?usp=sharing",
    metaDescription: "Product Designer crafting intuitive mobile & web applications from 0→1. Translating complex operational friction and multi-step user journeys into clean, accessible, and high-conversion digital experiences.",
  },

  hero: {
    headline: "Product Designer crafting intuitive mobile & web applications from 0→1.",
    subheadline: "Translating complex operational friction and multi-step user journeys into clean, accessible, and high-conversion digital experiences.",
    primaryCta: "View Selected Work",
    secondaryCta: "View Resume",
  },

  about: {
    headline: "Crafting human-centered interfaces for complex, high-stakes user journeys.",
    body: "I specialize in reducing cognitive load across dense product ecosystems. Whether designing intentional behavioral friction to curb impulse spending or shaping accessible, low-literacy UX conventions for rural healthcare users, I bridge product strategy, human psychology, and clean visual execution.",
  },

  projects: [
    {
      id: "finguide-ai",
      title: "FinGuide AI",
      category: "Fintech & Behavioral UX",
      badge: "E-Cell IIT Guwahati Summer Project",
      period: "June – July",
      tagline: "Behavioral UX & Smart Financial Guidance Architecture",
      description:
        "Gen Z personal finance platform engineering 'intentional friction' overlays and biometric speedbumps to curb impulse UPI spending on rapid-delivery apps.",
      tags: [
        "E-Cell IIT Guwahati",
        "Behavioral UX",
        "0→1 Strategy",
        "Mobile App",
      ],
      behanceUrl:
        "https://www.behance.net/gallery/253480353/FinGuide-AI-Behavioral-UX-Case-Study",
      featured: true,
    },
    {
      id: "kinetic",
      title: "Kinetic",
      category: "AI-Powered Fitness Platform",
      tagline: "Gamified Health & Fitness Interaction Engine",
      description:
        "Designed an AI-first fitness productivity app that combines workouts, habits, nutrition, and coaching into a unified mobile ecosystem.",
      tags: ["AI Product", "Design Systems", "Mobile Workflow"],
      behanceUrl:
        "https://www.behance.net/gallery/252958735/Kinetic-A-Gamified-Fitness-Platform",
      featured: false,
    },
    {
      id: "pashulens",
      title: "PashuLens",
      category: "AI Cattle Health Monitoring",
      tagline: "AI-Driven Animal Health Diagnostics & Rural UX",
      description:
        "Low-complexity mobile application tailored for Animal typers to track real-time livestock health, strictly prioritizing low-literacy accessibility conventions.",
      tags: ["AI Healthcare", "Accessibility (WCAG)", "Rural UX"],
      behanceUrl:
        "https://www.behance.net/gallery/243741279/PashuLens-AI-for-Smarter-Animal-Health-Decisions",
      featured: false,
    },
  ] as Project[],

  prototypes: [
    {
      id: "settlr-ai",
      title: "Settlr AI",
      category: "Fintech / LegalTech SaaS",
      description: "Automated financial settlement & dispute workflow engine using AI agents to streamline B2B claims and reconciliation.",
      techStack: ["React", "Tailwind CSS", "AI Agents"],
      liveUrl: "https://settlrai.netlify.app/",
    },
    {
      id: "saathi-scheme",
      title: "Saathi Scheme Aggregator",
      category: "GovTech & Civic Infrastructure",
      description: "Public welfare scheme discovery portal leveraging conversational AI search to help citizens access government aid.",
      techStack: ["Dynamic Search", "Tailwind CSS", "Conversational UI"],
      liveUrl: "https://saathi-scheme-aggregator.netlify.app/",
    },
    {
      id: "ripple-give",
      title: "Ripple Give",
      category: "Social Impact & Crowdfunding",
      description: "Transparent web donation platform featuring real-time impact tracking visuals and interactive micro-donations.",
      techStack: ["Micro-Interactions", "Data Visualization", "Netlify"],
      liveUrl: "https://ripplegivedonationwebsite.netlify.app/",
    },
    {
      id: "prompt-pro",
      title: "Prompt Pro",
      category: "Developer Tools & GenAI",
      description: "Generative AI prompt engineering workbench allowing creators to test, structure, and optimize complex AI prompts.",
      techStack: ["Prompt Structuring", "Variable Selectors", "Web Storage"],
      liveUrl: "https://promptprobyujjwal.netlify.app/",
    },
  ] as Prototype[],

  experience: [
    {
      company: "Spar Tech Labs",
      role: "UI/UX Design Intern",
      period: "July 2026 – July 2026",
      location: "Remote",
      bullets: [
        "Architected a single-page authentication flow with capsule segmented controls, reducing login friction.",
        "Designed a dark-mode SaaS analytics dashboard with intuitive zero-data states to accelerate user onboarding.",
        "Optimized enterprise workflows by replacing legacy full-page forms with modular, reusable modal components.",
      ],
    },
    {
      company: "Navicon Infraprojects",
      role: "Product Design Intern",
      period: "June 2025 – Nov 2025",
      location: "Remote",
      bullets: [
        "Designed a 0→1 mobile Construction ERP application from scratch, standardizing field-worker operations across 8 core modules.",
        "Streamlined complex operational data into clean, mobile-first dashboards, significantly reducing data-entry friction.",
        "Built a foundational Figma design system using auto-layout tokens, minimizing engineering handoff friction.",
      ],
    },
    {
      company: "IIC-JSSATEN",
      role: "UI/UX Designer (Part-time)",
      period: "June 2024 – June 2025",
      location: "Remote",
      bullets: [
        "Spearheaded UI/UX and visual design for institutional innovation initiatives, increasing cross-platform engagement.",
        "Designed modular UI concepts and promotional branding systems for entrepreneurship events.",
        "Collaborated cross-functionally with institutional teams to translate project milestones into high-impact campaigns.",
      ],
    },
  ] as Experience[],

  achievements: [
    {
      title: "Winner: UX Hackathon, IIT Patna",
      detail: "Designed a user-centered solution under time constraints among competing teams.",
    },
    {
      title: "Google Student Ambassador (GSA)",
      detail: "Selected for the nationwide program recognizing top student leaders in technology.",
    },
    {
      title: "2nd Position: IIT Guwahati E-Cell",
      detail: "Recognized among 200+ campus ambassadors across India.",
    },
    {
      title: "Special Mention: UX Hackathon, Teamify",
      detail: "Awarded for outstanding design thinking, interaction craft, and execution velocity.",
    },
  ] as Achievement[],

  engineeringAdvantage: {
    title: "The Design & Tech Bridge",
    headline: "Designing with technical feasibility and developer harmony built in.",
    degree: "B.Tech in Electronics & Communication Engineering",
    institution: "JSS Academy of Technical Education, Noida (Sep 2023 – May 2027)",
    statement:
      "My background in Electronics & Communication Engineering gives me a distinct advantage in product teams. I design with technical empathy anticipating component logic, edge cases, and design system scalability right in Figma. This eliminates friction during design-to-dev handoffs and ensures complex interfaces scale seamlessly into production.",
  },

  footer: {
    headline: "Let's build something intuitive together.",
    subheadline: "Available for full-time Product Design roles, contract design systems, and 0→1 product development.",
  },
};

export default portfolioConfig;
