"use client";

import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Zap, 
  Code2, 
  Image as ImageIcon, 
  Search, 
  Infinity 
} from "lucide-react";

export default function Features() {
  const features = [
    {
      title: "Ironclad Security",
      description: "Privacy is not a feature, it's a right. Encrypt your thoughts with zero-knowledge architecture.",
      icon: <ShieldCheck className="w-8 h-8 text-blue-500" />,
      bg: "bg-blue-500/10",
      border: "hover:border-blue-500/50"
    },
    {
      title: "Instant Sync",
      description: "Write on your laptop, review on your phone. Your ideas follow you everywhere, instantly.",
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      bg: "bg-yellow-500/10",
      border: "hover:border-yellow-500/50"
    },
    {
      title: "Rich Media & Files",
      description: "Drag and drop high-quality images, videos, or PDFs. A perfect moodboard for designers and editors.",
      icon: <ImageIcon className="w-8 h-8 text-purple-500" />,
      bg: "bg-purple-500/10",
      border: "hover:border-purple-500/50"
    },
    {
      title: "Developer Ready",
      description: "Full Markdown support with syntax highlighting for over 100+ languages. Built for code lovers.",
      icon: <Code2 className="w-8 h-8 text-green-500" />,
      bg: "bg-green-500/10",
      border: "hover:border-green-500/50"
    },
    {
      title: "AI Smart Search",
      description: "Find that one note from months ago in milliseconds. Our smart indexing understands your context.",
      icon: <Search className="w-8 h-8 text-red-500" />,
      bg: "bg-red-500/10",
      border: "hover:border-red-500/50"
    },
    {
      title: "Limitless Workspace",
      description: "No limits on notes or storage. Organize your life, projects, and dreams without boundaries.",
      icon: <Infinity className="w-8 h-8 text-indigo-500" />,
      bg: "bg-indigo-500/10",
      border: "hover:border-indigo-500/50"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section className="py-24 bg-white dark:bg-gray-950 px-6 relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-gray-900 dark:text-white"
          >
            Built for the way <span className="text-blue-600">you work</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium"
          >
            Whether you are drafting a novel, architecting a cloud system, or organizing your grocery list—Nithopie adapts to your flow.
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className={`p-10 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl transition-all duration-300 group shadow-sm ${feature.border}`}
            >
              <div className={`w-16 h-16 rounded-2xl ${feature.bg} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-blue-500/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-purple-500/5 blur-[120px] rounded-full"></div>
      </div>
    </section>
  );
}