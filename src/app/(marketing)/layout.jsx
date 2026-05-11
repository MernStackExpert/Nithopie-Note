import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import { getSession } from "@/lib/session";

export default async function MarketingLayout({ children }) {
  const session = await getSession();
  const isLoggedIn = !!session?.user;

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Navbar isLoggedIn={isLoggedIn} user={session?.user} />
      
      <main className="flex-1">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}