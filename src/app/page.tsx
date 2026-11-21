import { Suspense } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { FeaturedTuitions } from "@/components/sections/featured-tuitions";
import { HowItWorksPreview } from "@/components/sections/how-it-works-preview";
import { PricingSection } from "@/components/sections/pricing-section";

export default function Home() {
  return (
    <main>
      <div className="bg-[#fbfaf7]">
        <Navbar />
        <Hero />
      </div>
      <Suspense fallback={<FeaturedTuitionsLoading />}>
        <FeaturedTuitions />
      </Suspense>
      <HowItWorksPreview />
      <PricingSection />
    </main>
  );
}

function FeaturedTuitionsLoading() {
  return (
    <section className="bg-[#f3f5ef] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="h-16 w-80 animate-pulse rounded-xl bg-[#e6e9e1]" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className="h-96 animate-pulse rounded-2xl border border-[#e2e7de] bg-white"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
