import { Navbar } from "@/components/layout/navbar";
import { PricingSection } from "@/components/sections/pricing-section";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#fbfaf7] text-[#19342c]">
      <Navbar />
      <PricingSection />
    </main>
  );
}
