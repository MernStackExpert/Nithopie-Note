"use client";

import { motion } from "framer-motion";
import { 
  FileText, Lock, Star, Hash, TrendingUp, ArrowUpRight, ArrowDownRight, Clock
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line
} from 'recharts';

// ডামি ডেটা (পরে তুমি API থেকে এগুলো ডায়নামিক করে নিতে পারবে)
const activityData = [
  { name: 'Mon', notes: 4, views: 12 },
  { name: 'Tue', notes: 7, views: 18 },
  { name: 'Wed', notes: 5, views: 15 },
  { name: 'Thu', notes: 12, views: 30 },
  { name: 'Fri', notes: 8, views: 22 },
  { name: 'Sat', notes: 15, views: 45 },
  { name: 'Sun', notes: 10, views: 28 },
];

const categoryData = [
  { name: 'Development', value: 45, color: '#3b82f6' }, // blue-500
  { name: 'Personal', value: 25, color: '#8b5cf6' },   // purple-500
  { name: 'Ideas', value: 20, color: '#10b981' },      // green-500
  { name: 'Work', value: 10, color: '#f59e0b' },       // amber-500
];

const sparklineData1 = [{v: 5}, {v: 10}, {v: 8}, {v: 15}, {v: 12}, {v: 20}, {v: 18}];
const sparklineData2 = [{v: 10}, {v: 15}, {v: 20}, {v: 18}, {v: 25}, {v: 22}, {v: 30}];
const sparklineData3 = [{v: 30}, {v: 25}, {v: 28}, {v: 20}, {v: 22}, {v: 15}, {v: 18}];

export default function WorkspaceOverview() {
  
  const StatCard = ({ title, value, icon: Icon, trend, isUp, sparklineData, colorKey, delay }) => (
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
        <div className={`p-3 rounded-2xl ${isUp ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-1 text-sm font-bold">
          {isUp ? <ArrowUpRight className="w-4 h-4 text-green-500" /> : <ArrowDownRight className="w-4 h-4 text-red-500" />}
          <span className={isUp ? "text-green-500" : "text-red-500"}>{trend}</span>
          <span className="text-gray-400 font-medium ml-1">vs last week</span>
        </div>
        
        {/* Tiny Chart (Sparkline) inside the card */}
        <div className="w-20 h-10 opacity-70 group-hover:opacity-100 transition-opacity">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparklineData}>
              <Line type="monotone" dataKey="v" stroke={isUp ? "#10b981" : "#ef4444"} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-8 pb-10">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Workspace Overview
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium mt-1 flex items-center gap-2">
            <Clock className="w-4 h-4" /> Last updated just now
          </p>
        </motion.div>
      </div>

      {/* 4 Small Stat Cards with Sparklines */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Notes" value="128" icon={FileText} trend="+12.5%" isUp={true} sparklineData={sparklineData2} delay={0.1} />
        <StatCard title="Encrypted Vaults" value="45" icon={Lock} trend="+5.2%" isUp={true} sparklineData={sparklineData1} delay={0.2} />
        <StatCard title="Favorites" value="12" icon={Star} trend="-2.4%" isUp={false} sparklineData={sparklineData3} delay={0.3} />
        <StatCard title="Active Tags" value="24" icon={Hash} trend="+8.1%" isUp={true} sparklineData={sparklineData2} delay={0.4} />
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Big Area Chart (Takes 2 columns) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 p-6 bg-white dark:bg-[#0D1117]/80 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Productivity Overview</h3>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Notes created vs Viewed in the last 7 days</p>
            </div>
            <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              This Week
            </button>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', borderRadius: '12px', border: 'none', color: '#fff' }}
                  itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="views" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
                <Area type="monotone" dataKey="notes" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorNotes)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Donut Chart (Takes 1 column) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-6 bg-white dark:bg-[#0D1117]/80 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm flex flex-col"
        >
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Note Categories</h3>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Distribution by tags</p>
          </div>
          
          <div className="flex-1 h-[200px] relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', borderRadius: '12px', border: 'none', color: '#fff' }}
                  itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text inside Donut */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-black text-gray-900 dark:text-white">128</span>
              <span className="text-xs font-bold text-gray-500">Total</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {categoryData.map((category, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                  <span className="font-bold text-gray-700 dark:text-gray-300">{category.name}</span>
                </div>
                <span className="font-bold text-gray-900 dark:text-white">{category.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}