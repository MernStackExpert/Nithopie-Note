import { getSession } from "@/lib/session";
import Navbar from "@/components/marketing/Navbar";
import Hero from "@/components/marketing/Hero";

export default async function MarketingPage() {
  const session = await getSession();
  const isLoggedIn = !!session?.user;

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Navbar isLoggedIn={isLoggedIn} />
      
      <main className="flex-1">
        <Hero/>
      </main>
    </div>
  );
}