import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Trash2,
  Info,
  Settings,
  Loader2,
  CheckCircle2,
} from "lucide-react";

export default function EditorNavbar({
  syncStatus,
  isSaving,
  handleSave,
  handleDelete,
  setIsInfoOpen,
  setIsSettingsOpen,
}) {
  return (
    <div className="px-4 md:px-8 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-[#161B22]/30 backdrop-blur-md">
      <div className="flex items-center gap-2 md:gap-4">
        <Link
          href="/work-space"
          className="p-2 md:p-2.5 text-gray-500 hover:text-blue-600 dark:hover:text-white hover:bg-white dark:hover:bg-gray-800 rounded-2xl transition-all shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          {syncStatus === "Saved" ? (
            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
          ) : (
            <Loader2 className="w-3.5 h-3.5 text-blue-500 animate-spin" />
          )}
          <span className="text-xs font-bold text-gray-600 dark:text-gray-400">
            {syncStatus}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsInfoOpen(true)}
          className="p-2.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-2xl transition-all hidden sm:block"
        >
          <Info className="w-5 h-5" />
        </button>
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="p-2.5 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl transition-all"
        >
          <Settings className="w-5 h-5" />
        </button>
        <button
          onClick={handleDelete}
          className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-2xl transition-all"
        >
          <Trash2 className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleSave(false)}
          disabled={isSaving}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6 py-2.5 rounded-2xl text-sm font-black shadow-lg shadow-blue-500/20 transition-all active:scale-95 disabled:opacity-70"
        >
          {isSaving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span className="hidden sm:inline">
            {isSaving ? "Saving..." : "Save"}
          </span>
        </button>
      </div>
    </div>
  );
}
