import Hero from "@/components/marketing/Hero";
import SocialProof from "@/components/marketing/SocialProof";
import Features from "@/components/marketing/Features";
import Security from "@/components/marketing/Security";
import Testimonials from "@/components/marketing/Testimonials";
import ProTools from "@/components/marketing/ProTools";
import { getSession } from "@/lib/session";
import UseCases from "@/components/marketing/UseCases";

export default async function MarketingPage() {
  const session = await getSession();
  const isLoggedIn = !!session?.user;

  return (
    <>
      <Hero isLoggedIn={isLoggedIn} />
      <SocialProof />
      <Features />
      <UseCases/>
      <Security />
      <ProTools />
      <Testimonials />
    </>
  );
}