"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

export default function Hero({ isLoggedIn }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4 md:px-6 py-20 bg-white dark:bg-gray-950">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/15 dark:bg-blue-600/15 blur-[150px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/15 dark:bg-purple-600/15 blur-[150px] rounded-full animate-pulse delay-700"></div>

      <motion.div
        className="container mx-auto relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex flex-col items-center text-center space-y-8 max-w-5xl mx-auto">
          
          <motion.div 
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 shadow-sm"
            variants={itemVariants}
          >
            <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-xs md:text-sm font-bold text-blue-700 dark:text-blue-300 tracking-wide uppercase">
              The Next-Gen Secure Notebook is here
            </span>
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-8xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.05]"
            variants={itemVariants}
          >
            Elevate Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600">Thoughts</span> <br className="hidden md:block" /> with Total Security
          </motion.h1>

          <motion.p 
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl font-medium leading-relaxed"
            variants={itemVariants}
          >
            A high-level secure workspace designed for developers, designers, and creative minds. Capture ideas, secure your code, and share with confidence.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto pt-4"
            variants={itemVariants}
          >
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="group relative flex items-center justify-center gap-3 px-10 py-5 text-lg font-bold text-white bg-gray-950 dark:bg-white dark:text-gray-950 rounded-2xl shadow-2xl hover:scale-105 transition-all duration-300 w-full sm:w-auto overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <LayoutDashboard className="w-6 h-6 relative z-10" />
                <span className="relative z-10">Go to Dashboard</span>
              </Link>
            ) : (
              <>
                <Link
                  href="/register"
                  className="group flex items-center justify-center gap-3 px-10 py-5 text-lg font-bold text-white bg-blue-600 rounded-2xl shadow-xl shadow-blue-500/30 hover:bg-blue-700 hover:shadow-blue-500/50 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
                >
                  Get Started for Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/how-it-works"
                  className="flex items-center justify-center gap-2 px-10 py-5 text-lg font-bold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 w-full sm:w-auto"
                >
                  See how it works
                </Link>
              </>
            )}
          </motion.div>
        </div>

        <motion.div 
          className="mt-20 relative max-w-6xl mx-auto group"
          variants={itemVariants}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.8 } }}
        >
           <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
           <div className="relative bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
              <div className="h-12 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center gap-2 px-6">
                <div className="flex gap-1.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-red-500"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-yellow-500"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-green-500"></div>
                </div>
                <div className="ml-4 h-6 flex-1 bg-gray-200 dark:bg-gray-800 rounded-lg text-xs flex items-center px-4 text-gray-500 dark:text-gray-500 font-medium">
                    ~/nithopie-note/api-implementation.js
                </div>
              </div>
              <div className="p-5 md:p-8 font-mono text-sm md:text-base leading-relaxed overflow-x-auto min-h-[350px]">
                <TypeAnimation
                    sequence={[
                        '// Initializing Nithopie Note Secure Context...', 1000,
                        'import vault from \'@nithopie/vault\';', 500,
                        'const note = await vault.createNote({', 300,
                        '  title: \'API Docs confidential\',', 300,
                        '  type: \'developer\',', 300,
                        '  encrypt: true, // Total security', 1000,
                        '});', 500,
                        'note.addSnippet(\'console.log("Secret key");\');', 500,
                        '// Encrypted successfully. Check hash below:', 800,
                        'note.getHash(); // xF3tY7zB1qP9Rk... ', 2000,
                        '', 500,
                    ]}
                    wrapper="div"
                    cursor={true}
                    repeat={Infinity}
                    className="whitespace-pre text-blue-600 dark:text-blue-400"
                />
              </div>
           </div>
        </motion.div>
      </motion.div>
    </section>
  );
}