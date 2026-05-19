import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldAlert } from "lucide-react";

export default function LockScreen({ handleUnlock }) {
  const [unlockPassword, setUnlockPassword] = useState("");

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-[#06090E] p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white dark:bg-[#0D1117] p-8 rounded-[2.5rem] shadow-2xl border border-gray-200 dark:border-gray-800 text-center"
      >
        <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldAlert className="w-10 h-10 text-blue-600 dark:text-blue-500" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
          Private Vault
        </h2>
        <p className="text-gray-500 dark:text-gray-400 font-medium mb-8">
          This note is secured. Enter your password to access.
        </p>
        <form
          onSubmit={(e) => handleUnlock(unlockPassword, e)}
          className="space-y-4"
        >
          <input
            type="password"
            value={unlockPassword}
            onChange={(e) => setUnlockPassword(e.target.value)}
            placeholder="Enter Password"
            className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl text-center text-lg font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:text-white transition-all"
          />
          <button
            type="submit"
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black shadow-lg shadow-blue-500/20 transition-all active:scale-95"
          >
            Unlock Note
          </button>
        </form>
      </motion.div>
    </div>
  );
}
