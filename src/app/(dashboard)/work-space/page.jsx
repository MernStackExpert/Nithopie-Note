"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FileText, Lock, Star, Hash, ArrowUpRight, ArrowDownRight, Clock, Loader2 
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';

export default function WorkspaceOverview() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/workspace/stats");
        const result = await res.json();
        if (res.ok) {
          setData(result);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="h-[70vh] w-full flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  const StatCard = ({ title, value, icon: Icon, isUp, sparklineData, delay }) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="p-6 bg-white dark:bg-[#0D1117]/80 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-3xl flex flex-col justify-between relative overflow-hidden group hover:border-blue-500/50 transition-colors shadow-sm"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-1">{title}</p>
          <h3 className="text-3xl font-black text-gray-900 dark:text-white">{value}</h3>
        </div>
        <div className={`p-3 rounded-2xl ${isUp ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400' : 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-1 text-sm font-bold">
          {isUp ? <ArrowUpRight className="w-4 h-4 text-green-500" /> : <ArrowUpRight className="w-4 h-4 text-blue-500" />}
          <span className={isUp ? "text-green-500" : "text-blue-500"}>Live</span>
          <span className="text-gray-400 font-medium ml-1">Data syncing</span>
        </div>
        
        <div className="w-20 h-10 opacity-70 group-hover:opacity-100 transition-opacity">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparklineData}>
              <Line type="monotone" dataKey="notes" stroke={isUp ? "#10b981" : "#3b82f6"} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Workspace Overview
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium mt-1 flex items-center gap-2">
            <Clock className="w-4 h-4" /> Real-time vault statistics
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Notes" value={data?.stats.totalNotes || 0} icon={FileText} isUp={true} sparklineData={data?.activityData} delay={0.1} />
        <StatCard title="Encrypted Vaults" value={data?.stats.encryptedVaults || 0} icon={Lock} isUp={true} sparklineData={data?.activityData} delay={0.2} />
        <StatCard title="Favorites" value={data?.stats.favorites || 0} icon={Star} isUp={false} sparklineData={data?.activityData} delay={0.3} />
        <StatCard title="Active Tags" value={data?.stats.activeTags || 0} icon={Hash} isUp={true} sparklineData={data?.activityData} delay={0.4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 p-6 bg-white dark:bg-[#0D1117]/80 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Productivity Overview</h3>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Activity from the last 7 days</p>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data?.activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorNotes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.1} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', borderRadius: '16px', border: '1px solid #374151', color: '#fff' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="views" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
                <Area type="monotone" dataKey="notes" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorNotes)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-6 bg-white dark:bg-[#0D1117]/80 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm flex flex-col"
        >
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Note Categories</h3>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Top tags distribution</p>
          </div>
          
          <div className="flex-1 h-[200px] relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data?.categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {data?.categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', borderRadius: '16px', border: '1px solid #374151', color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-black text-gray-900 dark:text-white">{data?.stats.totalNotes || 0}</span>
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Notes</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {data?.categoryData.map((category, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: category.color }}></div>
                  <span className="font-bold text-gray-600 dark:text-gray-400">{category.name}</span>
                </div>
                <span className="font-bold text-gray-900 dark:text-white">{category.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}