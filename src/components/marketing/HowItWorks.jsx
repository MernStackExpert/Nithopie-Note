"use client";

import { motion } from "framer-motion";
import { UserPlus, Terminal, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HowItWorks() {
  const steps = [
    {
      id: "01",
      title: "Initialize Your Vault",
      description: "Create your secure account in seconds. The moment you sign up, we instantly generate your unique cryptographic keys. Your master password never leaves your device.",
      icon: <UserPlus className="w-8 h-8 text-blue-500" />,
      color: "from-blue-500 to-cyan-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20"
    },
    {
      id: "02",
      title: "Craft Your Ideas",
      description: "Experience a distraction-free, rich-text editor. Use markdown for rapid formatting, embed code blocks with syntax highlighting, or simply drag-and-drop your media files.",
      icon: <Terminal className="w-8 h-8 text-purple-500" />,
      color: "from-purple-500 to-pink-500",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20"
    },
    {
      id: "03",
      title: "Lock & Share Safely",
      description: "Your notes are private by default. When you are ready to collaborate, generate a public link secured with a custom password and an automatic expiration date.",
      icon: <Lock className="w-8 h-8 text-green-500" />,
      color: "from-green-500 to-emerald-500",
      bg: "bg-green-500/10",
      border: "border-green-500/20"
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-gray-950 relative overflow-hidden px-6 min-h-[80vh] flex flex-col justify-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent"></div>
      
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-500/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tight text-gray-900 dark:text-white mb-6"
          >
            Three steps to <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">total control</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium max-w-3xl mx-auto"
          >
            We have stripped away the complexity so you can focus on what truly matters: your ideas. Here is how Nithopie Note protects your workflow.
          </motion.p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="hidden lg:block absolute top-16 left-0 w-full h-1 bg-gray-100 dark:bg-gray-800/50 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            ></motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 relative z-10">
            {steps.map((step, index) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative flex flex-col items-center lg:items-start text-center lg:text-left group"
              >
                <div className={`w-32 h-32 rounded-[2rem] bg-white dark:bg-gray-900 border-2 ${step.border} shadow-2xl flex items-center justify-center mb-10 relative group-hover:-translate-y-3 transition-transform duration-500`}>
                  <div className={`absolute inset-0 bg-gradient-to-tr ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-[2rem]`}></div>
                  <div className={`w-16 h-16 rounded-2xl ${step.bg} flex items-center justify-center`}>
                    {step.icon}
                  </div>
                  
                  <div className="absolute -top-4 -right-4 w-10 h-10 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center text-sm font-black shadow-lg">
                    {step.id}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed text-lg">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-24 text-center"
        >
          <Link
            href="/register"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-bold text-white bg-gray-900 dark:bg-white dark:text-gray-900 rounded-full shadow-xl hover:scale-105 transition-transform duration-300"
          >
            Create Your Free Account <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}