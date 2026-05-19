"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FileText, Search, Plus, Star, Settings, LogOut, PanelLeftClose, PanelLeft, Loader2, Lock, X, Archive, Trash2
} from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function Sidebar({ user }) {
  const pathname = usePathname();
  const router = useRouter();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const mainNavigation = [
    { name: "All Notes", href: "/work-space", icon: FileText },
    { name: "Favorites", href: "/work-space/favorites", icon: Star },
    { name: "Manage Notes", href: "/work-space/manage", icon: Archive },
    { name: "Trash", href: "/work-space/trash", icon: Trash2 },
  ];

  const fetchNotes = async () => {
    try {
      const res = await fetch("/api/notes");
      const data = await res.json();
      if (res.ok) {
        setNotes(data.notes);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
    const handleNotesChanged = () => fetchNotes();
    const handleToggleMobileMenu = () => setIsMobileOpen(prev => !prev);
    window.addEventListener("notes-changed", handleNotesChanged);
    window.addEventListener("toggle-mobile-menu", handleToggleMobileMenu);
    return () => {
      window.removeEventListener("notes-changed", handleNotesChanged);
      window.removeEventListener("toggle-mobile-menu", handleToggleMobileMenu);
    };
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const handleCreateNote = async () => {
    setIsCreating(true);
    const createPromise = fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Untitled Note",
        content: "",
        isPrivate: false,
      }),
    }).then(async (res) => {
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      return data;
    });

    toast.promise(createPromise, {
      loading: "Creating new note...",
      success: "Note created!",
      error: "Failed to create note.",
    });

    try {
      const data = await createPromise;
      await fetchNotes();
      setIsMobileOpen(false);
      window.dispatchEvent(new Event("notes-changed"));
      router.push(`/work-space/notes/${data.noteId}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  };

  const filteredNotes = notes
    .filter((note) => note.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .slice(0, 8);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
        <Link href="/work-space" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-black tracking-tight text-gray-900 dark:text-white">
            Nithopie
          </span>
        </Link>
        <button
          onClick={() => setIsCollapsed(true)}
          className="hidden md:block p-1.5 text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
        >
          <PanelLeftClose className="w-4 h-4" />
        </button>
        <button
          onClick={() => setIsMobileOpen(false)}
          className="md:hidden p-1.5 text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes..."
            className="w-full pl-9 pr-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:text-white transition-all"
          />
        </div>
        <button
          onClick={handleCreateNote}
          disabled={isCreating}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] disabled:opacity-70"
        >
          {isCreating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          {isCreating ? "Creating..." : "New Note"}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-6 custom-scrollbar">
        <div className="space-y-1">
          {mainNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === item.href ? "bg-gray-200 dark:bg-gray-800/80 text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white"}`}
            >
              <item.icon className="w-4 h-4" /> {item.name}
            </Link>
          ))}
        </div>

        <div>
          <p className="px-3 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
            Recent Vault
          </p>
          <div className="space-y-0.5">
            {isLoading ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
              </div>
            ) : filteredNotes.length > 0 ? (
              filteredNotes.map((note) => (
                <Link
                  key={note._id}
                  href={`/work-space/notes/${note._id}`}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors group ${
                    pathname.includes(note._id)
                      ? "bg-gray-200 dark:bg-gray-800/80 text-gray-900 dark:text-white"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <FileText
                      className={`w-4 h-4 flex-shrink-0 ${pathname.includes(note._id) ? "text-blue-500" : "text-gray-400 group-hover:text-blue-500 transition-colors"}`}
                    />
                    <span className="truncate">{note.title}</span>
                  </div>
                  {note.isPrivate && (
                    <Lock className="w-3 h-3 text-gray-400 flex-shrink-0 ml-2" />
                  )}
                </Link>
              ))
            ) : (
              <p className="px-3 text-xs text-gray-500 py-2">No recent notes.</p>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/30">
        <div className="flex items-center gap-3 mb-4">
          <img
            src={user?.img || "https://github.com/shadcn.png"}
            alt="User"
            className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700"
          />
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
              {user?.name}
            </p>
            <p className="text-[10px] font-medium text-gray-500 dark:text-gray-400 truncate">
              {user?.email}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            href="/work-space/settings"
            className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-bold transition-colors"
          >
            <Settings className="w-4 h-4" /> Settings
          </Link>
          <button
            onClick={handleLogout}
            className="p-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 rounded-lg transition-colors"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div 
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity md:hidden ${isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsMobileOpen(false)}
      >
        <aside 
          className={`absolute left-0 top-0 h-full w-72 bg-gray-50 dark:bg-[#0D1117] transition-transform duration-300 ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <SidebarContent />
        </aside>
      </div>

      {isCollapsed ? (
        <div className="hidden md:flex flex-col items-center w-16 h-screen bg-gray-50 dark:bg-[#0D1117] border-r border-gray-200 dark:border-gray-800 py-4 transition-all duration-300 z-20 relative">
          <button
            onClick={() => setIsCollapsed(false)}
            className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors mb-8"
          >
            <PanelLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleCreateNote}
            disabled={isCreating}
            className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isCreating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-5 h-5" />}
          </button>
        </div>
      ) : (
        <aside className="hidden md:flex flex-col w-72 h-screen bg-gray-50/80 dark:bg-[#0D1117]/80 backdrop-blur-xl border-r border-gray-200 dark:border-gray-800 transition-all duration-300 z-20 relative">
          <SidebarContent />
        </aside>
      )}
    </>
  );
}