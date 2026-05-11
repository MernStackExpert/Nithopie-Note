"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, ArrowRight } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaFacebookF, FaRegEnvelope, FaCode, FaGlobe, FaTwitter, FaDiscord } from "react-icons/fa";
import { MdClose } from "react-icons/md";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isDevModalOpen, setIsDevModalOpen] = useState(false);

  const skills = [
    { name: "MongoDB", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "Express", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
    { name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Node.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Next.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "Tailwind", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" }
  ];

  return (
    <>
      <footer className="bg-white dark:bg-gray-950 border-t border-gray-200/50 dark:border-gray-800/50 pt-20 pb-8 px-6 overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 mb-20 bg-gray-50 dark:bg-gray-900/50 p-10 rounded-[2.5rem] border border-gray-100 dark:border-gray-800">
            <div className="max-w-xl text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Join our newsletter
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                Get the latest updates on security, new features, and productivity tips. No spam, ever.
              </p>
            </div>
            <div className="w-full max-w-md flex relative">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full pl-6 pr-32 py-4 rounded-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
              <button className="absolute right-2 top-2 bottom-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-colors flex items-center gap-2">
                Subscribe <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
            <div className="lg:col-span-2 space-y-6">
              <Link href="/" className="flex items-center gap-2.5 group w-fit">
                <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                  Nithopie Note
                </span>
              </Link>
              <p className="text-gray-600 dark:text-gray-400 max-w-sm leading-relaxed font-medium">
                The ultimate secure workspace for developers, designers, and creators. Protect your ideas with zero-knowledge architecture.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-all duration-300">
                  <FaTwitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white transition-all duration-300">
                  <FaGithub className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/30 dark:hover:text-blue-500 transition-all duration-300">
                  <FaLinkedinIn className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-900/30 dark:hover:text-indigo-400 transition-all duration-300">
                  <FaDiscord className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-6">Product</h3>
              <ul className="space-y-4">
                <li><Link href="/features" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Features</Link></li>
                <li><Link href="/security" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Security</Link></li>
                <li><Link href="/pricing" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Pricing</Link></li>
                <li><Link href="/changelog" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Changelog</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-6">Resources</h3>
              <ul className="space-y-4">
                <li><Link href="/help" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Help Center</Link></li>
                <li><Link href="/docs" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">API Documentation</Link></li>
                <li><Link href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Blog</Link></li>
                <li><Link href="/community" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Community</Link></li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h3 className="font-bold text-gray-900 dark:text-white mb-6">Legal</h3>
              <ul className="space-y-4">
                <li><Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Terms of Service</Link></li>
                <li><Link href="/cookies" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200/50 dark:border-gray-800/50 flex flex-col lg:flex-row items-center justify-between gap-6">
            <p className="text-sm text-gray-500 dark:text-gray-500 font-medium text-center lg:text-left">
              © {currentYear} Nithopie. All rights reserved. Built with <span className="text-red-500 animate-pulse">❤️</span> for creators.
            </p>
            
            <button 
              onClick={() => setIsDevModalOpen(true)}
              className="group relative inline-flex items-center gap-2 px-6 py-2 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <FaCode className="w-4 h-4 text-gray-500 group-hover:text-blue-500 transition-colors relative z-10" />
              <span className="text-sm font-bold text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors relative z-10">
                Created by <span className="text-blue-600 dark:text-blue-400">MD NIROB SARKAR</span>
              </span>
            </button>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {isDevModalOpen && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDevModalOpen(false)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#111827] border border-white/10 w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10"
            >
              <div className="h-32 bg-gradient-to-r from-[#FF6000] to-[#111827] relative">
                <button
                  onClick={() => setIsDevModalOpen(false)}
                  className="absolute top-4 right-4 bg-white/10 p-2 text-white rounded-full hover:bg-red-500 transition-colors cursor-pointer"
                >
                  <MdClose size={20} />
                </button>
              </div>

              <div className="px-8 pb-10 text-center">
                <div className="relative -mt-16 mb-4 flex justify-center">
                  <div className="w-32 h-32 rounded-3xl bg-[#111827] border-4 border-[#111827] shadow-xl overflow-hidden">
                    <img
                      src="https://github.com/MernStackExpert.png"
                      alt="Md Nirob Sarkar"
                      className="w-full h-full object-cover bg-white"
                    />
                  </div>
                </div>

                <h3 className="text-2xl font-black text-white uppercase tracking-tighter">
                  Md Nirob Sarkar
                </h3>
                <p className="text-[#FF6000] font-black uppercase text-[10px] tracking-[0.3em] mb-4">
                  Full Stack Developer & SEO Expert
                </p>

                <p className="text-gray-400 text-sm mb-6 leading-relaxed italic">
                  "Building high-performance web applications with a focus on modern user experience and search engine dominance."
                </p>

                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  {skills.map((skill) => (
                    <div key={skill.name} className="group relative">
                      <img
                        src={skill.img}
                        alt={skill.name}
                        className="w-8 h-8 grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
                        title={skill.name}
                      />
                      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-bold opacity-0 group-hover:opacity-100 text-[#FF6000] transition-opacity uppercase whitespace-nowrap">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <Link
                    href="https://github.com/MernStackExpert"
                    target="_blank"
                    className="flex flex-col items-center gap-2 p-3 bg-white/5 text-gray-300 rounded-2xl hover:bg-[#FF6000] hover:text-white transition-all group"
                  >
                    <FaGithub size={20} />
                    <span className="text-[8px] font-bold uppercase tracking-widest">Github</span>
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/mdnirobsarkar/"
                    target="_blank"
                    className="flex flex-col items-center gap-2 p-3 bg-white/5 text-gray-300 rounded-2xl hover:bg-[#FF6000] hover:text-white transition-all group"
                  >
                    <FaLinkedinIn size={20} />
                    <span className="text-[8px] font-bold uppercase tracking-widest">LinkedIn</span>
                  </Link>
                  <Link
                    href="https://www.facebook.com/MernStackExpert"
                    target="_blank"
                    className="flex flex-col items-center gap-2 p-3 bg-white/5 text-gray-300 rounded-2xl hover:bg-[#FF6000] hover:text-white transition-all group"
                  >
                    <FaFacebookF size={20} />
                    <span className="text-[8px] font-bold uppercase tracking-widest">Facebook</span>
                  </Link>
                  <Link
                    href="mailto:mdnirob30k@gmail.com"
                    className="flex flex-col items-center gap-2 p-3 bg-white/5 text-gray-300 rounded-2xl hover:bg-[#FF6000] hover:text-white transition-all group border border-white/5"
                  >
                    <FaRegEnvelope size={20} />
                    <span className="text-[8px] font-bold uppercase tracking-widest">Email</span>
                  </Link>
                </div>
              </div>

              <div className="bg-white/5 py-4 flex justify-center gap-6 border-t border-white/5">
                <div className="flex items-center gap-2 text-[9px] font-bold text-gray-400 uppercase">
                  <FaCode className="text-[#FF6000]" /> MERN STACK
                </div>
                <div className="flex items-center gap-2 text-[9px] font-bold text-gray-400 uppercase">
                  <FaGlobe className="text-[#FF6000]" /> SEO EXPERT
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}