"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  FileText,
  Home,
  Info,
  Mail,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  User,
  Zap,
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar({ isLoggedIn, user }) {
  const pathname = usePathname();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/", icon: <Home className="w-4 h-4" /> },
    {
      name: "How it Works",
      href: "/how-it-works",
      icon: <HelpCircle className="w-4 h-4" />,
    },
    { name: "About", href: "/about", icon: <Info className="w-4 h-4" /> },
    { name: "Contact", href: "/contact", icon: <Mail className="w-4 h-4" /> },
  ];

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        setDropdownOpen(false);
        window.location.href = "/login";
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-gray-200/50 dark:border-gray-800/50 bg-white/70 dark:bg-gray-950/70 backdrop-blur-xl">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
              Nithopie Note
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1 bg-gray-100/50 dark:bg-gray-900/50 p-1.5 rounded-full border border-gray-200/50 dark:border-gray-800/50">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-gray-800/50"
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              );
            })}
            {isLoggedIn && (
              <Link
                href="/work-space"
                className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                  pathname.startsWith("/work-space")
                    ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-gray-800/50"
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
            )}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-10 h-10 rounded-full ring-2 ring-gray-200 dark:ring-gray-800 hover:ring-blue-500 dark:hover:ring-blue-500 transition-all duration-300 overflow-hidden flex items-center justify-center focus:outline-none cursor-pointer"
                >
                  {user?.img ? (
                    <img
                      src={user.img}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                </button>

                {dropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setDropdownOpen(false)}
                    ></div>
                    <div className="absolute right-0 mt-3 w-56 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl py-2 z-50 transform origin-top-right transition-all">
                      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 mb-1">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                          {user?.name || "User"}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {user?.email || "user@example.com"}
                        </p>
                      </div>
                      <Link
                        href="/work-space"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-blue-500" />
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors text-left cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-3">
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-all duration-300"
                >
                  <User className="w-4 h-4" />
                  Login
                </Link>
                <Link
                  href="/register"
                  className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Zap className="w-4 h-4" />
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="md:hidden fixed bottom-4 left-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl shadow-2xl z-50">
        <div className="flex items-center justify-between px-2 py-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative flex flex-col items-center justify-center w-full py-2 space-y-1 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {link.icon}
                <span className="text-[10px] font-semibold">{link.name}</span>
              </Link>
            );
          })}
          {!isLoggedIn && (
            <Link
              href="/login"
              className={`relative flex flex-col items-center justify-center w-full py-2 space-y-1 rounded-xl transition-all duration-300 ${
                pathname === "/login"
                  ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <User className="w-4 h-4" />
              <span className="text-[10px] font-semibold">Login</span>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
