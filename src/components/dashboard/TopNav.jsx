"use client";

import { usePathname } from "next/navigation";
import { ShieldCheck, Bell, Search, Menu } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function TopNav({ user }) {
  const pathname = usePathname();
  
  const generateBreadcrumbs = () => {
    if (pathname === "/work-space") return "Overview";
    if (pathname.includes("/notes/")) return "Editing Note";
    if (pathname.includes("/favorites")) return "Favorites";
    if (pathname.includes("/settings")) return "Settings";
    return "Workspace";
  };

  return (
    <header className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-[#0D1117]/50 backdrop-blur-xl flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3 md:gap-4">
        <button 
          onClick={() => window.dispatchEvent(new Event("toggle-mobile-menu"))}
          className="md:hidden p-2 -ml-2 text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 capitalize">
          {generateBreadcrumbs()}
        </h2>
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50">
          <ShieldCheck className="w-3.5 h-3.5 text-green-600 dark:text-green-500" />
          <span className="text-[10px] font-black text-green-700 dark:text-green-400 uppercase tracking-widest">E2E Encrypted</span>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="hidden md:flex relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Quick search (Cmd+K)" 
            className="w-64 pl-9 pr-4 py-1.5 bg-gray-100 dark:bg-gray-900 border border-transparent dark:border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white dark:focus:bg-[#0D1117] transition-all"
          />
        </div>

        <button className="relative p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-white dark:border-[#0D1117]"></span>
        </button>

        <div className="hidden md:block w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1"></div>
        
        <ThemeToggle />
      </div>
    </header>
  );
}