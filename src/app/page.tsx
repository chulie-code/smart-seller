import Hero from "@/components/Hero";
import PainPoints from "@/components/PainPoints";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import BeforeAfter from "@/components/BeforeAfter";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <PainPoints />
      <HowItWorks />
      <Features />
      <BeforeAfter />
      <Pricing />
      <Faq />
      <FinalCTA />
    </>
  );
}
