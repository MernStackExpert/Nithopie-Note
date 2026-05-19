import { motion } from "framer-motion";
import { Info, Image as ImageIcon, Lock, Save } from "lucide-react";

export default function InfoModal({ setIsInfoOpen }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg bg-white dark:bg-[#161B22] rounded-[2.5rem] shadow-2xl border border-gray-200 dark:border-gray-800 p-8 relative"
      >
        <button
          onClick={() => setIsInfoOpen(false)}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          ✕
        </button>
        <h2 className="text-xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Info className="w-6 h-6 text-blue-500" /> কীভাবে ব্যবহার করবেন?
        </h2>

        <div className="space-y-4 text-gray-600 dark:text-gray-300 font-medium">
          <div className="p-4 bg-gray-50 dark:bg-[#0D1117] rounded-2xl border border-gray-100 dark:border-gray-800">
            <h3 className="font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-purple-500" /> ছবি আপলোড
            </h3>
            <p className="text-sm">
              টুলবার থেকে ইমেজের আইকনে ক্লিক করুন।{" "}
              <code>![Alt Text](Image Link)</code> এর জায়গায় আপনার ছবির লিংকটি
              বসিয়ে দিন।
            </p>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-[#0D1117] rounded-2xl border border-gray-100 dark:border-gray-800">
            <h3 className="font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
              <Lock className="w-4 h-4 text-green-500" /> নোট প্রাইভেট করা
            </h3>
            <p className="text-sm">
              উপরের সেটিং (Settings) আইকনে ক্লিক করুন। 'Private Vault' অন করে
              একটি পাসওয়ার্ড দিন। এরপর থেকে এই নোটটি পাসওয়ার্ড ছাড়া কেউ খুলতে
              পারবে না।
            </p>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-[#0D1117] rounded-2xl border border-gray-100 dark:border-gray-800">
            <h3 className="font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
              <Save className="w-4 h-4 text-blue-500" /> অটো-সেভ
            </h3>
            <p className="text-sm">
              আপনাকে বারবার সেভ বাটনে চাপতে হবে না। আপনি টাইপ করা থামানোর ২
              সেকেন্ডের মধ্যেই এটি নিজে নিজে ব্যাকগ্রাউন্ডে সেভ হয়ে যাবে!
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
