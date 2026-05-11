import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import Sidebar from "@/components/dashboard/Sidebar";
import TopNav from "@/components/dashboard/TopNav";

export const metadata = {
  title: "Workspace | Nithopie Note",
};

export default async function DashboardLayout({ children }) {
  const session = await getSession();
  
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-[#06090E] overflow-hidden">
      <Sidebar user={session.user} />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <TopNav user={session.user} />
        
        <main className="flex-1 overflow-y-auto relative w-full h-full">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 dark:from-blue-900/10 via-transparent dark:via-transparent to-transparent pointer-events-none z-0"></div>
          
          <div className="relative z-10 w-full h-full p-4 md:p-6 lg:p-8">
            <div className="max-w-6xl mx-auto h-full">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}