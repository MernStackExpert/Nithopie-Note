"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code2, 
  Palette, 
  Video, 
  Megaphone, 
  CheckCircle2, 
  Lock,
  FileText
} from "lucide-react";

export default function UseCases() {
  const [activeTab, setActiveTab] = useState("developer");

  const personas = [
    {
      id: "developer",
      name: "Developers",
      icon: <Code2 className="w-5 h-5" />,
      title: "The Vault for Your Code & Logic",
      description: "Store confidential API keys, server configurations, and reusable code snippets with zero-knowledge encryption.",
      points: ["Full Markdown Support", "Syntax Highlighting", "E2E Encrypted Snippets"],
      color: "blue",
      preview: {
        title: "Database Sync Logic",
        content: "```javascript\n// Secure connection\nconst db = await vault.connect();\nexport const sync = () => {\n  console.log('Encrypted sync active');\n};\n```",
        tag: "High Security"
      }
    },
    {
      id: "designer",
      name: "UX Designers",
      icon: <Palette className="w-5 h-5" />,
      title: "Design Systems & Research",
      description: "Keep your user research, design tokens, and mood board links private until you're ready to share.",
      points: ["Drag-and-Drop Assets", "Color Palette Storage", "User Interview Notes"],
      color: "purple",
      preview: {
        title: "Project: Phoenix UI",
        content: "• Brand Colors: #6366f1, #a855f7\n• Border Radius: 24px (Premium)\n• Typography: Urbanist / Inter\n• Icons: Lucide-React",
        tag: "Design Vault"
      }
    },
    {
      id: "editor",
      name: "Video Editors",
      icon: <Video className="w-5 h-5" />,
      title: "Scripts & Storyboards",
      description: "Draft your scripts and organize your scene timestamps in a distraction-free environment.",
      points: ["Scene Timestamps", "Script Drafts", "Export to PDF/Markdown"],
      color: "red",
      preview: {
        title: "Scene 01: The Intro",
        content: "[00:15] B-Roll: Close up of keyboard\n[00:45] Voiceover: 'Security isn't an option, it's a right.'\n[01:20] Transition: Smooth Fade Out",
        tag: "Production"
      }
    },
    {
      id: "marketer",
      name: "Marketers",
      icon: <Megaphone className="w-5 h-5" />,
      title: "Campaign Strategy Vault",
      description: "Plan your next big launch. Keep your ad copies and keyword lists secure from prying eyes.",
      points: ["Content Calendar Drafts", "Keyword Lists", "Campaign KPI Tracking"],
      color: "green",
      preview: {
        title: "Q4 Launch Strategy",
        content: "1. Social Push (Twitter/LinkedIn)\n2. Newsletter Blast (10k Users)\n3. Influencer Outreach\n4. Analytics Tracking Active",
        tag: "Strategy"
      }
    }
  ];

  const current = personas.find(p => p.id === activeTab);

  return (
    <section className="py-24 bg-white dark:bg-gray-950 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-6"
          >
            One vault, <span className="text-blue-600">infinite possibilities.</span>
          </motion.h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
            Whether you're coding the next big thing or planning a marketing campaign, Nithopie Note gives you the freedom to create securely.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {personas.map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveTab(p.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-full font-bold transition-all duration-300 ${
                activeTab === p.id 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105" 
                : "bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800"
              }`}
            >
              {p.icon}
              {p.name}
            </button>
          ))}
        </div>

        <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col lg:flex-row items-center gap-16"
            >
              <div className="flex-1 space-y-8">
                <h3 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white leading-tight">
                  {current.title}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                  {current.description}
                </p>
                <div className="space-y-4">
                  {current.points.map((point, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-500" />
                      <span className="text-gray-700 dark:text-gray-300 font-bold">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 w-full max-w-lg">
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-20"></div>
                  <div className="relative bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl overflow-hidden">
                    <div className="h-10 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6">
                      <div className="flex gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        <Lock className="w-3 h-3" />
                        Encrypted
                      </div>
                    </div>
                    <div className="p-8 space-y-6">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                          <FileText className="w-5 h-5 text-blue-500" />
                          {current.preview.title}
                        </h4>
                        <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-tighter">
                          {current.preview.tag}
                        </span>
                      </div>
                      <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900 font-mono text-sm leading-relaxed text-gray-600 dark:text-gray-400 whitespace-pre">
                        {current.preview.content}
                      </div>
                      <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase">
                        <span>Last modified: Just now</span>
                        <span>Syncing...</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}