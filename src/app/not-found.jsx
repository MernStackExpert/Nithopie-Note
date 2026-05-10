"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-gray-950 px-4">
      {/* Background Glow Effects (আপনার হিরো সেকশনের সাথে মিল রেখে) */}
      <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] bg-blue-500/10 dark:bg-blue-600/10 blur-[120px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-[10%] right-[20%] w-[40%] h-[40%] bg-purple-500/10 dark:bg-purple-600/10 blur-[120px] rounded-full animate-pulse delay-700"></div>

      <motion.div
        className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Animated Icon */}
        <motion.div 
          variants={itemVariants}
          className="relative flex items-center justify-center w-24 h-24 mb-8 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 shadow-xl"
        >
          <motion.div
            animate={{ 
              rotate: [0, -10, 10, -10, 10, 0],
              y: [0, -10, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <FileQuestion className="w-12 h-12 text-blue-600 dark:text-blue-400" />
          </motion.div>
        </motion.div>

        {/* 404 Text */}
        <motion.h1 
          variants={itemVariants}
          className="text-7xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-500 dark:from-white dark:to-gray-500 drop-shadow-sm mb-4"
        >
          404
        </motion.h1>

        {/* Title */}
        <motion.h2 
          variants={itemVariants}
          className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4"
        >
          Note Not Found
        </motion.h2>

        {/* Description */}
        <motion.p 
          variants={itemVariants}
          className="text-gray-600 dark:text-gray-400 text-lg md:text-xl mb-10 max-w-lg"
        >
          The page or note you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </motion.p>

        {/* Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button 
            onClick={() => window.history.back()}
            className="group flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 w-full sm:w-auto"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>
          
          <Link
            href="/"
            className="group relative flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Home className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Back to Home</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}