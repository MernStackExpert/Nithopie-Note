"use client";

import { motion } from "framer-motion";
import { Cpu, Globe, Layers, ShieldCheck, Zap, Anchor } from "lucide-react";

export default function SocialProof() {
  const brands = [
    { name: "DevFlow", icon: <Cpu className="w-6 h-6" /> },
    { name: "SecureNet", icon: <ShieldCheck className="w-6 h-6" /> },
    { name: "GlobalStack", icon: <Globe className="w-6 h-6" /> },
    { name: "LayersUI", icon: <Layers className="w-6 h-6" /> },
    { name: "BoltCode", icon: <Zap className="w-6 h-6" /> },
    { name: "AnchorSystems", icon: <Anchor className="w-6 h-6" /> },
  ];

  const marqueeVariants = {
    animate: {
      x: [0, -1035],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        },
      },
    },
  };

  return (
    <section className="py-12 bg-white dark:bg-gray-950 border-y border-gray-100 dark:border-gray-900 overflow-hidden">
      <div className="container mx-auto px-6 mb-8 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
          Trusted by the next generation of innovators
        </p>
      </div>

      <div className="relative flex overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap gap-12 md:gap-24 items-center py-4"
          variants={marqueeVariants}
          animate="animate"
        >
          {[...brands, ...brands, ...brands].map((brand, index) => (
            <div
              key={index}
              className="flex items-center gap-3 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default group"
            >
              <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-900 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors">
                {brand.icon}
              </div>
              <span className="text-xl md:text-2xl font-black tracking-tighter text-gray-900 dark:text-white">
                {brand.name}
              </span>
            </div>
          ))}
        </motion.div>

        <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-white dark:from-gray-950 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-white dark:from-gray-950 to-transparent z-10 pointer-events-none"></div>
      </div>
    </section>
  );
}