import { useState, useRef } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Upload, Link as LinkIcon, Loader2, Image as ImageIcon } from "lucide-react";

export default function ImageModal({ isOpen, onClose, onInsertImage }) {
  const [activeTab, setActiveTab] = useState("upload"); // 'upload' or 'url'
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  // URL দিয়ে ইমেজ অ্যাড করা
  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (!imageUrl) return toast.error("Please enter an image URL");
    onInsertImage(imageUrl);
    setImageUrl("");
    onClose();
  };

  // পিসি থেকে ছবি আপলোড করা (তোমার API কল করে)
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      return toast.error("File size must be less than 5MB");
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Upload failed");

      toast.success("Image uploaded!");
      onInsertImage(data.url); // TipTap এডিটরে ছবি পাঠিয়ে দেওয়া
      onClose();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        exit={{ opacity: 0, scale: 0.95 }} 
        className="w-full max-w-md bg-white dark:bg-[#161B22] rounded-[2rem] shadow-2xl border border-gray-200 dark:border-gray-800 p-6 relative"
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 dark:hover:text-white">✕</button>
        <h2 className="text-xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <ImageIcon className="w-6 h-6 text-purple-500" /> Insert Image
        </h2>

        {/* Tabs */}
        <div className="flex p-1 bg-gray-100 dark:bg-gray-900 rounded-xl mb-6">
          <button 
            onClick={() => setActiveTab("upload")} 
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === "upload" ? "bg-white dark:bg-[#161B22] text-gray-900 dark:text-white shadow-sm" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}
          >
            <Upload className="w-4 h-4" /> Upload
          </button>
          <button 
            onClick={() => setActiveTab("url")} 
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === "url" ? "bg-white dark:bg-[#161B22] text-gray-900 dark:text-white shadow-sm" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}
          >
            <LinkIcon className="w-4 h-4" /> Web URL
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "upload" ? (
          <div className="space-y-4">
            <div 
              onClick={() => !isUploading && fileInputRef.current?.click()}
              className={`w-full h-40 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-3 transition-colors cursor-pointer ${isUploading ? "border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50" : "border-purple-200 dark:border-purple-900/50 hover:border-purple-400 dark:hover:border-purple-500 bg-purple-50/50 dark:bg-purple-900/10"}`}
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
                  <p className="text-sm font-bold text-gray-500 dark:text-gray-400">Uploading securely...</p>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/40 rounded-full flex items-center justify-center">
                    <Upload className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">Click to browse</p>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">PNG, JPG, GIF up to 5MB</p>
                  </div>
                </>
              )}
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              accept="image/*" 
              className="hidden" 
            />
          </div>
        ) : (
          <form onSubmit={handleUrlSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2 block">Image URL</label>
              <input 
                type="url" 
                value={imageUrl} 
                onChange={(e) => setImageUrl(e.target.value)} 
                placeholder="https://example.com/image.jpg" 
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-purple-500/50 dark:text-white" 
              />
            </div>
            <button type="submit" className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-black shadow-lg shadow-purple-500/20 transition-all active:scale-95">
              Embed Image
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}