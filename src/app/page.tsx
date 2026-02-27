import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import ClientLogos from "@/components/ClientLogos";
import TheShift from "@/components/TheShift";
import Work from "@/components/Work";
import Services from "@/components/Services";
import Systems from "@/components/Systems";
import HowItWorks from "@/components/HowItWorks";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <ClientLogos />
      <TheShift />
      <Work />
      <Services />
      <Systems />
      <HowItWorks />
      <CTA />
    </>
  );
}
