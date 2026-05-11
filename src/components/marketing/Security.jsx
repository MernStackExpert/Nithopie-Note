"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Key, CheckCircle2 } from "lucide-react";

export default function Security() {
  const securityFeatures = [
    {
      title: "Zero-Knowledge Architecture",
      description: "Your notes are encrypted on your device before they ever reach our servers. We cannot read your data, even if we wanted to."
    },
    {
      title: "Military-Grade AES-256",
      description: "We utilize the same encryption standards trusted by governments and top-tier financial institutions worldwide."
    },
    {
      title: "Password-Protected Sharing",
      description: "Share your notes safely. Set custom passwords and expiration dates for your public links."
    }
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-200/50 dark:border-gray-800/50 relative overflow-hidden px-6">
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-96 h-96 bg-green-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <motion.div 
            className="flex-1 space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 font-bold text-sm tracking-wide">
              <Shield className="w-4 h-4" />
              Absolute Privacy
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white leading-tight">
              Your thoughts, locked in a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">digital fortress.</span>
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
              We believe your ideas belong exclusively to you. Nithopie Note is built from the ground up with a privacy-first mindset, ensuring maximum security without compromising on speed or design.
            </p>

            <div className="space-y-6 pt-4">
              {securityFeatures.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="mt-1">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{feature.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="flex-1 w-full max-w-lg lg:max-w-none relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative rounded-3xl bg-gray-900 p-2 shadow-2xl border border-gray-800 group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="bg-black rounded-2xl p-6 relative z-10">
                <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
                    <Lock className="w-3 h-3" />
                    secure-channel-active
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-4 rounded-xl border border-gray-800 bg-gray-900/50 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-white font-medium">
                      <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center border border-blue-500/30">
                        <Key className="w-5 h-5 text-blue-400" />
                      </div>
                      Encryption Key
                    </div>
                    <span className="font-mono text-xs text-blue-400 bg-blue-900/30 px-2 py-1 rounded">Generated</span>
                  </div>

                  <div className="space-y-2 font-mono text-sm">
                    <motion.p 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      className="text-gray-400"
                    >
                      {`> Requesting secure workspace...`}
                    </motion.p>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                      className="text-gray-400"
                    >
                      {`> Establishing E2E connection...`}
                    </motion.p>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1 }}
                      className="text-gray-400"
                    >
                      {`> Encrypting active session...`}
                    </motion.p>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.5 }}
                      className="text-green-400"
                    >
                      {`[SUCCESS] Payload hashed: 0x9f8b...4c21`}
                    </motion.p>
                  </div>

                  <div className="pt-4 border-t border-gray-800">
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-blue-500 to-green-500"
                        initial={{ width: "0%" }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                      ></motion.div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs font-mono text-gray-500">
                      <span>Status</span>
                      <span className="text-green-400">Protected</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}