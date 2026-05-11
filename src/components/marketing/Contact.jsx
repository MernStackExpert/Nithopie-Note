"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaWhatsapp, FaEnvelope, FaLinkedinIn, FaGithub, FaFacebookF } from "react-icons/fa";
import { MessageSquare } from "lucide-react"; // শুধু হেডারের আইকনের জন্য

export default function Contact() {
  const contactMethods = [
    {
      name: "WhatsApp",
      value: "+880 1908 716502",
      link: "https://wa.me/8801908716502",
      icon: <FaWhatsapp className="w-8 h-8" />,
      color: "text-green-500 dark:text-green-400",
      bg: "bg-green-100 dark:bg-green-900/30",
      border: "hover:border-green-500/50",
      hoverBg: "group-hover:bg-green-500"
    },
    {
      name: "Email",
      value: "mdnirob30k@gmail.com",
      link: "mailto:mdnirob30k@gmail.com",
      icon: <FaEnvelope className="w-8 h-8" />,
      color: "text-blue-500 dark:text-blue-400",
      bg: "bg-blue-100 dark:bg-blue-900/30",
      border: "hover:border-blue-500/50",
      hoverBg: "group-hover:bg-blue-500"
    },
    {
      name: "LinkedIn",
      value: "MD Nirob Sarkar",
      link: "https://www.linkedin.com/in/mdnirobsarkar/",
      icon: <FaLinkedinIn className="w-8 h-8" />,
      color: "text-blue-700 dark:text-blue-500",
      bg: "bg-blue-100 dark:bg-blue-900/30",
      border: "hover:border-blue-600/50",
      hoverBg: "group-hover:bg-blue-600"
    },
    {
      name: "GitHub",
      value: "@MernStackExpert",
      link: "https://github.com/MernStackExpert",
      icon: <FaGithub className="w-8 h-8" />,
      color: "text-gray-800 dark:text-gray-200",
      bg: "bg-gray-200 dark:bg-gray-800",
      border: "hover:border-gray-500/50",
      hoverBg: "group-hover:bg-gray-800 dark:group-hover:bg-gray-200"
    },
    {
      name: "Facebook",
      value: "MD Nirob Sarkar",
      link: "https://www.facebook.com/MernStackExpert",
      icon: <FaFacebookF className="w-8 h-8" />,
      color: "text-blue-600 dark:text-blue-500",
      bg: "bg-blue-100 dark:bg-blue-900/30",
      border: "hover:border-blue-500/50",
      hoverBg: "group-hover:bg-blue-600"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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
    <section className="py-24 bg-white dark:bg-gray-950 relative overflow-hidden min-h-[80vh] flex flex-col justify-center">
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-purple-500/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-sm font-bold tracking-wide text-gray-700 dark:text-gray-300 mb-6"
          >
            <MessageSquare className="w-4 h-4 text-blue-500" />
            Direct Contact
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white leading-tight mb-6"
          >
            Let's build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">extraordinary.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-400 font-medium leading-relaxed"
          >
            Skip the forms. Reach out directly through any of the platforms below. I am always open to discussing new projects, creative ideas, or opportunities.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {contactMethods.map((method, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Link 
                href={method.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center justify-center p-8 rounded-[2rem] bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 transition-all duration-300 group shadow-sm hover:shadow-xl ${method.border}`}
              >
                <div className={`w-20 h-20 rounded-2xl ${method.bg} flex items-center justify-center mb-6 transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-110 relative overflow-hidden`}>
                  <div className={`absolute inset-0 ${method.hoverBg} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                  <span className={`${method.color} transition-colors group-hover:text-current`}>
                    {method.icon}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {method.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">
                  {method.value}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            You can also view my full profile by clicking <span className="font-bold text-blue-500">"Created by MD NIROB SARKAR"</span> in the footer.
          </p>
        </motion.div>
      </div>
    </section>
  );
}