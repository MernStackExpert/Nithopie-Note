"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { 
  Mail, Lock, User, ArrowLeft, ArrowRight, Loader2, 
  Zap, KeyRound, Image as ImageIcon, Link as LinkIcon, UploadCloud 
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  
  // State for all fields
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    password: "",
    scCode: "",
    img: ""
  });
  
  const [imageTab, setImageTab] = useState("upload"); // 'upload' or 'url'
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

 const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.log("No file selected or user cancelled");
      return;
    }

    console.log("Starting upload process for:", file.name);
    setIsUploading(true);

    const formPayload = new FormData();
    formPayload.append("file", file);

    const uploadPromise = fetch("/api/upload", {
      method: "POST",
      body: formPayload,
    }).then(async (res) => {
      const data = await res.json();
      console.log("Response from Server:", data); 
      
      if (!res.ok) throw new Error(data.error || "Upload failed");
      
      setFormData((prev) => ({ ...prev, img: data.url }));
      return data;
    });

    // Toast Promise
    toast.promise(uploadPromise, {
      loading: "Uploading image securely...",
      success: "Image uploaded successfully!",
      error: (err) => err.message || "Could not upload image.",
    });

    try {
      await uploadPromise;
    } catch (error) {
      console.error("Frontend Upload Error:", error);
    } finally {
      setIsUploading(false);
      // ইনপুট ফিল্ড ক্লিয়ার করে দেওয়া যাতে একই ছবি আবার সিলেক্ট করা যায়
      e.target.value = null; 
    }
  };

  // Handle Form Registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const registerPromise = fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then(async (res) => {
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      return data;
    });

    toast.promise(registerPromise, {
      loading: "Initializing your secure vault...",
      success: "Registration successful! Redirecting...",
      error: (err) => err.message || "Failed to create account.",
    });

    try {
      await registerPromise;
      // সফল হলে একটু সময় দিয়ে লগইন পেজে পাঠিয়ে দেওয়া
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col-reverse lg:flex-row w-full">
      
      {/* Left Side - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 bg-white dark:bg-gray-950 relative min-h-screen lg:min-h-0 overflow-y-auto">
        <Link href="/" className="lg:hidden absolute top-6 left-6 inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 font-bold text-sm hover:text-blue-600 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Home
        </Link>

        <div className="w-full max-w-md py-10 lg:py-0">
          <div className="mb-8 text-center lg:text-left mt-8 lg:mt-0">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Create Account</h2>
            <p className="text-gray-500 dark:text-gray-400 font-medium">Start securing your thoughts today, for free.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="John Doe" 
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm text-gray-900 dark:text-white font-medium transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="name@mail.com" 
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm text-gray-900 dark:text-white font-medium transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Secret Code & Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">Secret Code (scCode)</label>
                <div className="relative">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" required value={formData.scCode} onChange={(e) => setFormData({...formData, scCode: e.target.value})}
                    placeholder="E.g. 1908" 
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm text-gray-900 dark:text-white font-medium transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="password" required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="••••••••" 
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm text-gray-900 dark:text-white font-medium transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Profile Image Section */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">Profile Image</label>
                
                {/* Tabs */}
                <div className="flex bg-gray-100 dark:bg-gray-900 rounded-lg p-1 border border-gray-200 dark:border-gray-800">
                  <button 
                    type="button" 
                    onClick={() => setImageTab("upload")} 
                    className={`flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold rounded-md transition-all ${imageTab === 'upload' ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                  >
                    <UploadCloud className="w-3 h-3" /> Upload
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setImageTab("url")} 
                    className={`flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold rounded-md transition-all ${imageTab === 'url' ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                  >
                    <LinkIcon className="w-3 h-3" /> URL
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                <motion.div key={imageTab} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.2 }}>
                  {imageTab === "upload" ? (
                    <div className="relative">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden" 
                        id="file-upload"
                      />
                      <label 
                        htmlFor="file-upload" 
                        className={`flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-xl cursor-pointer transition-all ${formData.img && imageTab === 'upload' ? 'border-green-500/50 bg-green-50 dark:bg-green-900/10' : 'border-gray-300 dark:border-gray-700 hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-900/50'}`}
                      >
                        {isUploading ? (
                          <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
                        ) : (
                          <>
                            <UploadCloud className={`w-6 h-6 mb-2 ${formData.img ? 'text-green-500' : 'text-gray-400'}`} />
                            <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
                              {formData.img && imageTab === 'upload' ? 'Image Ready!' : 'Click to upload image'}
                            </span>
                          </>
                        )}
                      </label>
                    </div>
                  ) : (
                    <div className="relative">
                      <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type="url" 
                        value={formData.img}
                        onChange={(e) => setFormData({...formData, img: e.target.value})}
                        placeholder="https://example.com/avatar.jpg" 
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm text-gray-900 dark:text-white font-medium transition-all"
                      />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Image Preview */}
              {formData.img && (
                <div className="flex items-center gap-3 mt-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 w-fit">
                  <img src={formData.img} alt="Profile Preview" className="w-8 h-8 rounded-md object-cover border border-gray-300 dark:border-gray-700" />
                  <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 pr-2 truncate max-w-[150px]">
                    {imageTab === 'upload' ? 'Upload successful' : 'URL linked'}
                  </span>
                </div>
              )}
            </div>

            <button 
              type="submit" 
              disabled={isLoading || isUploading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Creating Vault...</>
              ) : (
                <>Initialize Vault <ArrowRight className="w-5 h-5" /></>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm font-medium text-gray-600 dark:text-gray-400 pb-8 lg:pb-0">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 dark:text-blue-400 font-black hover:underline">Sign In here</Link>
          </p>
        </div>
      </div>

      {/* Right Side - Content (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 bg-[#0D1117] border-l border-gray-800 relative items-center justify-center overflow-hidden">
        <div className="absolute top-0 right-0 p-8 z-20">
          <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm transition-all backdrop-blur-md">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-[#0D1117] to-blue-900/20"></div>
        
        <div className="relative z-10 p-12 max-w-xl">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-bold text-sm tracking-wide mb-8">
              <Zap className="w-4 h-4" /> Powering 10k+ Developers
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
              Join the next generation of <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">secure thinkers.</span>
            </h1>
            
            <div className="space-y-6 mt-10">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mt-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Zero-Knowledge Protocol</h3>
                  <p className="text-gray-400 font-medium text-sm mt-1">We can never see, read, or sell your data.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mt-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Instant Multi-Device Sync</h3>
                  <p className="text-gray-400 font-medium text-sm mt-1">Write on your Mac, review on your phone. Real-time.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

    </div>
  );
}