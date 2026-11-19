import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { HowItWorksPreview } from "@/components/sections/how-it-works-preview";

export default function Home() {
  return (
    <main>
      <div className="bg-[#fbfaf7]">
        <Navbar />
        <Hero />
      </div>
      <HowItWorksPreview />
    </main>
  );
}
