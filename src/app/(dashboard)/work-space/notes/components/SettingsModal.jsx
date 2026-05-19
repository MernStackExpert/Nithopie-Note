import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Hash, Lock, Unlock, Eye, EyeOff, Share2 } from "lucide-react";

export default function SettingsModal({
  setIsSettingsOpen,
  tags,
  setTags,
  isPrivate,
  setIsPrivate,
  password,
  setPassword,
  id,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-md bg-white dark:bg-[#161B22] rounded-[2.5rem] shadow-2xl border border-gray-200 dark:border-gray-800 p-8 overflow-hidden relative"
      >
        <button
          onClick={() => setIsSettingsOpen(false)}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          ✕
        </button>
        <h2 className="text-xl font-black text-gray-900 dark:text-white mb-6">
          Note Settings
        </h2>

        <div className="space-y-6">
          <div>
            <label className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2 block">
              Categories (Tags)
            </label>
            <div className="relative">
              <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="React, Ideas, Personal"
                className="w-full pl-11 pr-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:text-white"
              />
            </div>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                {isPrivate ? (
                  <Lock className="w-4 h-4 text-green-500" />
                ) : (
                  <Unlock className="w-4 h-4 text-gray-400" />
                )}{" "}
                Private Vault
              </h3>
              <label className="relative inline-flex items-center cursor-pointer scale-90">
                <input
                  type="checkbox"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>
            {isPrivate && (
              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Set Vault Password"
                  className="w-full px-4 py-3 bg-white dark:bg-[#0D1117] border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-green-500/50 dark:text-white pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              const shareUrl = `${window.location.origin}/share/${id}`;
              navigator.clipboard.writeText(shareUrl);
              toast.success("Share link copied!");
            }}
            className="w-full flex items-center justify-center gap-2 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-black text-sm transition-all active:scale-95"
          >
            <Share2 className="w-4 h-4" /> Copy Share Link
          </button>
        </div>
      </motion.div>
    </div>
  );
}
