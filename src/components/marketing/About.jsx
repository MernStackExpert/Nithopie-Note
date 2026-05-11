"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Heart, Code2, Globe, Lock } from "lucide-react";
import Link from "next/link";

export default function About() {
  const values = [
    {
      title: "Privacy First",
      description: "We believe privacy is a fundamental human right. Your data is yours alone.",
      icon: <Lock className="w-6 h-6 text-blue-500" />,
      bg: "bg-blue-500/10",
    },
    {
      title: "Built for Speed",
      description: "Performance is a feature. We optimized every millisecond for a seamless experience.",
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      bg: "bg-yellow-500/10",
    },
    {
      title: "Craftsmanship",
      description: "Every pixel, every line of code is written with absolute passion and precision.",
      icon: <Heart className="w-6 h-6 text-red-500" />,
      bg: "bg-red-500/10",
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-gray-950 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-purple-500/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-sm font-bold tracking-wide text-gray-700 dark:text-gray-300 mb-6"
          >
            <Globe className="w-4 h-4 text-blue-500" />
            Our Mission
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white leading-tight mb-8"
          >
            Redefining the way you <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">secure your ideas.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium leading-relaxed"
          >
            Nithopie Note started with a simple question: Why do we have to compromise between beautiful design and absolute security? We built the answer.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              The Story Behind Nithopie
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed font-medium">
              As developers and creators, we were frustrated by the existing note-taking tools. Some had great UIs but sold user data. Others were secure but felt like they were built in the 90s.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed font-medium">
              We wanted a workspace that felt like a premium IDE for our thoughts—where markdown was first-class, code blocks looked beautiful, and everything was wrapped in zero-knowledge encryption. Thus, Nithopie Note was born.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-[2.5rem] blur-2xl opacity-20"></div>
            <div className="relative bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-500/30">
                <Code2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Built by Creators, for Creators</h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                Led by <span className="font-bold text-blue-600 dark:text-blue-400">MD Nirob Sarkar</span>, our team is dedicated to pushing the boundaries of web technologies to deliver an uncompromised experience.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Our Core Values
          </motion.h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="p-8 rounded-[2rem] bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 hover:-translate-y-2 transition-transform duration-300"
            >
              <div className={`w-14 h-14 rounded-2xl ${value.bg} flex items-center justify-center mb-6`}>
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[3rem] bg-gray-900 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
          <div className="relative px-6 py-20 text-center">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Be part of the revolution</h2>
            <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
              Join thousands of developers, writers, and designers who have already made Nithopie Note their daily driver.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 text-lg font-bold text-gray-900 bg-white rounded-full shadow-xl hover:scale-105 transition-transform duration-300"
            >
              <Shield className="w-5 h-5 text-blue-600" />
              Secure Your First Note
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}