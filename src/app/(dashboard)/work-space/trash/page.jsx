"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import Swal from 'sweetalert2';
import { 
  Search, FileText, Loader2, Trash2, RefreshCcw, 
  LayoutGrid, List as ListIcon, Calendar, AlertTriangle 
} from "lucide-react";

export default function TrashNotes() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  const fetchTrashedNotes = async () => {
    try {
      const res = await fetch("/api/notes?trash=true");
      const data = await res.json();
      if (res.ok) {
        setNotes(data.notes);
      }
    } catch (error) {
      toast.error("Failed to load trash");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrashedNotes();
  }, []);

  const handleRestore = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isTrashed: false }),
      });

      if (res.ok) {
        setNotes(notes.filter(note => note._id !== id));
        window.dispatchEvent(new Event("notes-changed"));
        toast.success("Note restored successfully");
      }
    } catch (error) {
      toast.error("Failed to restore note");
    }
  };

  const handlePermanentDelete = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();

    const result = await Swal.fire({
      title: 'Permanently delete?',
      text: "This action cannot be undone!",
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#3b82f6',
      confirmButtonText: 'Yes, delete forever!',
      background: '#0D1117',
      color: '#fff'
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`/api/notes/${id}?permanent=true`, { method: "DELETE" });
        if (res.ok) {
          setNotes(notes.filter(note => note._id !== id));
          toast.success("Note permanently deleted");
        }
      } catch (error) {
        toast.error("Failed to delete note");
      }
    }
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesDate = true;
    const noteDate = new Date(note.trashedAt || note.updatedAt);
    const now = new Date();
    
    if (dateFilter === "today") {
      matchesDate = noteDate.toDateString() === now.toDateString();
    } else if (dateFilter === "week") {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      matchesDate = noteDate >= weekAgo;
    } else if (dateFilter === "month") {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      matchesDate = noteDate >= monthAgo;
    }

    return matchesSearch && matchesDate;
  });

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-red-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
            <Trash2 className="w-8 h-8 text-red-500" /> Trash
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-yellow-500" /> Notes in trash can be restored or deleted forever.
          </p>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-4 bg-white dark:bg-[#0D1117] p-4 rounded-[2rem] border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search trash..." 
            className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-red-500/50 dark:text-white transition-all"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-2 overflow-x-auto custom-scrollbar pb-1 xl:pb-0">
          <select 
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="cursor-pointer px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-transparent dark:border-gray-800 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-red-500/50 dark:text-gray-400 transition-all appearance-none"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">Past 7 Days</option>
            <option value="month">Past 30 Days</option>
          </select>

          <div className="w-px h-8 bg-gray-200 dark:bg-gray-800 mx-1 hidden md:block"></div>
          
          <div className="flex bg-gray-50 dark:bg-gray-900 p-1 rounded-xl">
            <button onClick={() => setViewMode("grid")} className={`cursor-pointer p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-white dark:bg-[#161B22] shadow-sm text-red-600 dark:text-red-400" : "text-gray-400"}`}>
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button onClick={() => setViewMode("list")} className={`cursor-pointer p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-white dark:bg-[#161B22] shadow-sm text-red-600 dark:text-red-400" : "text-gray-400"}`}>
              <ListIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        {filteredNotes.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center mb-6">
              <Trash2 className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Trash is empty</h3>
            <p className="text-gray-500">No deleted notes found.</p>
          </motion.div>
        ) : (
          <motion.div 
            layout 
            className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch" : "flex flex-col gap-4"}
          >
            {filteredNotes.map((note) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={note._id}
                className="h-full"
              >
                <div className={`group flex ${viewMode === "list" ? "flex-col md:flex-row md:items-center justify-between" : "flex-col"} p-5 bg-white dark:bg-[#0D1117] border border-gray-200 dark:border-gray-800 rounded-[2rem] hover:border-red-500/50 hover:shadow-xl hover:shadow-red-500/5 transition-all duration-300 relative overflow-hidden h-full`}>
                  
                  <div className={`flex flex-col flex-1 ${viewMode === "list" ? "md:flex-row md:items-center gap-4 md:gap-6 w-full" : ""}`}>
                    <div className={`flex items-start justify-between ${viewMode === "grid" ? "mb-4" : "w-full md:w-auto flex-1"}`}>
                      <h3 className="text-lg font-black text-gray-400 dark:text-gray-600 line-clamp-1 pr-8 line-through">
                        {note.title}
                      </h3>
                    </div>
                    
                    {viewMode === "grid" && (
                      <p className="text-sm font-medium text-gray-400 dark:text-gray-600 line-clamp-3 mb-6 flex-1">
                        {note.content ? note.content.replace(/<[^>]*>?/gm, '') : "No content yet..."}
                      </p>
                    )}
                    
                    <div className={`flex items-center gap-4 text-xs font-bold text-gray-400 ${viewMode === "list" ? "w-full md:w-48 mt-2 md:mt-0" : "mt-auto"}`}>
                      <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Deleted: {new Date(note.trashedAt || note.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className={`flex items-center gap-2 ${viewMode === "list" ? "mt-4 md:mt-0 w-full md:w-auto justify-end border-t border-gray-100 dark:border-gray-800 pt-4 md:border-0 md:pt-0" : "pt-4 mt-4 border-t border-gray-100 dark:border-gray-800 w-full"}`}>
                    <button 
                      onClick={(e) => handleRestore(note._id, e)}
                      className="cursor-pointer p-2 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-xl transition-all hover:bg-green-100 dark:hover:bg-green-900/40 opacity-100 md:opacity-0 md:group-hover:opacity-100"
                      title="Restore Note"
                    >
                      <RefreshCcw className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={(e) => handlePermanentDelete(note._id, e)}
                      className="cursor-pointer p-2 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-xl transition-all hover:bg-red-100 dark:hover:bg-red-900/40 opacity-100 md:opacity-0 md:group-hover:opacity-100"
                      title="Delete Permanently"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}