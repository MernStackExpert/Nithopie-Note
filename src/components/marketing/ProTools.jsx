"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Code2, Webhook, Command, CheckCircle2 } from "lucide-react";

export default function ProTools() {
  const [activeTab, setActiveTab] = useState("api");

  const tabs = [
    { id: "api", name: "REST API", icon: <Webhook className="w-4 h-4" /> },
    { id: "cli", name: "CLI Tool", icon: <Terminal className="w-4 h-4" /> },
    { id: "sdk", name: "React SDK", icon: <Code2 className="w-4 h-4" /> }
  ];

  const codeSnippets = {
    api: `const response = await fetch('https://api.nithopie.com/v1/notes', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${API_KEY}\`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: "Database Architecture",
    content: "# Schema Design\\n...",
    encrypt: true
  })
});

const data = await response.json();
console.log("Secure Note ID:", data.id);`,
    
    cli: `$ npm i -g @nithopie/cli

$ nithopie login --token=$NITHOPIE_TOKEN
> Authenticating... [SUCCESS]

$ nithopie push ./docs --secure
> Encrypting files [==================] 100%
> Uploaded 14 files to your secure vault.
> Access Link: https://nithopie.com/v/x7b9q2`,

    sdk: `import { NithopieProvider, useVault } from '@nithopie/react';

function App() {
  return (
    <NithopieProvider apiKey={process.env.NITHOPIE_KEY}>
      <SecureNoteEditor />
    </NithopieProvider>
  );
}

function SecureNoteEditor() {
  const { saveNote, isEncrypting } = useVault();
  // Your editor implementation...
}`
  };

  const features = [
    "Programmatic access to your secure vault",
    "Automated backups via Webhooks",
    "Headless CMS capabilities for your blog",
    "Custom encryption key management (KMS)"
  ];

  return (
    <section className="py-24 bg-white dark:bg-gray-950 relative overflow-hidden px-6 border-y border-gray-100 dark:border-gray-800/50">
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50/50 dark:from-blue-900/20 via-transparent dark:via-gray-950 to-transparent pointer-events-none"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 font-bold text-sm tracking-wide">
              <Command className="w-4 h-4" />
              Developer First
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white leading-tight">
              Build upon a foundation of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400">absolute security.</span>
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
              Integrate Nithopie Note directly into your CI/CD pipeline, use it as a headless CMS, or automate your documentation process with our robust APIs and SDKs.
            </p>

            <div className="space-y-4 pt-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <a href="/docs" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold text-gray-900 dark:text-white bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/20 rounded-xl hover:bg-gray-200 dark:hover:bg-white/20 transition-all duration-300">
                Explore Documentation
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 w-full"
          >
            <div className="bg-gray-50 dark:bg-[#0D1117] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/10 dark:shadow-blue-900/20">
              
              <div className="flex items-center justify-between px-4 py-3 bg-gray-100/80 dark:bg-[#161B22] border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                </div>
                <div className="flex bg-gray-200/50 dark:bg-[#0D1117] rounded-lg p-1 border border-gray-200 dark:border-gray-800">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
                        activeTab === tab.id 
                          ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-white shadow-sm" 
                          : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                      }`}
                    >
                      {tab.icon}
                      {tab.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6 overflow-x-auto min-h-[300px] flex items-center">
                <AnimatePresence mode="wait">
                  <motion.pre
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="font-mono text-sm leading-relaxed text-blue-700 dark:text-blue-300"
                  >
                    <code>
                      {codeSnippets[activeTab].split('\n').map((line, i) => (
                        <div key={i} className="table-row">
                          <span className="table-cell pr-6 text-gray-400 dark:text-gray-700 select-none text-right">{i + 1}</span>
                          <span className="table-cell">{line}</span>
                        </div>
                      ))}
                    </code>
                  </motion.pre>
                </AnimatePresence>
              </div>
              
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}