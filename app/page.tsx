import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { SocialProof } from "@/components/social-proof";
import { SoftCTA } from "@/components/soft-cta";
import { Framework } from "@/components/framework";
import { PrimaryCTA } from "@/components/primary-cta";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <SocialProof />
      <SoftCTA />
      <Framework />
      <PrimaryCTA />
      <Footer />
    </main>
  );
}