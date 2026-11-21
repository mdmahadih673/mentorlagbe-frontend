import Link from "next/link";
import { connection } from "next/server";
import { ArrowRight, BookOpenCheck } from "lucide-react";
import { TuitionCard } from "@/components/sections/tuition-card";
import { getAllTuitions } from "@/lib/api/tuition";

export async function FeaturedTuitions() {
  // The listing comes from a no-store API fetch, so render it per request instead of
  // trying to prerender request-time data during the build.
  await connection();
  const tuitions = await getAllTuitions().catch(() => []);
  const featured = tuitions
    .filter(
      (tuition) =>
        tuition.approvalStatus?.toLowerCase() === "approved" &&
        tuition.isActive !== false,
    )
    .sort(
      (first, second) =>
        new Date(second.createdAt || 0).getTime() -
        new Date(first.createdAt || 0).getTime(),
    )
    .slice(0, 6);

  return (
    <section className="bg-[#f3f5ef] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 border-b border-[#dfe5d9] pb-6 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#648147]">
              <BookOpenCheck size={16} /> Approved tuition listings
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#19342c] text-balance sm:text-4xl">
              Find a tuition that fits
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#77827b] text-pretty sm:text-base">
              Browse active posts reviewed by MentorLagbe and compare the lesson details.
            </p>
          </div>
          <Link
            href="/tuitions"
            className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-[#315b45] transition-colors duration-300 hover:text-[#19342c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#648147] sm:self-auto"
          >
            See all listings <ArrowRight size={16} />
          </Link>
        </div>

        {featured.length ? (
          <div className="mt-8 grid items-start gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {featured.map((tuition, index) => (
              <TuitionCard
                key={tuition._id || tuition.id || tuition.tuitionId || index}
                tuition={tuition}
              />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-3xl border border-dashed border-[#d8e0d4] bg-white px-6 py-10 text-center">
            <p className="text-sm font-medium text-[#77827b]">
              No tuition listings are available yet.
            </p>
            <Link
              href="/tuitions"
              className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#456450] hover:underline"
            >
              Browse all tuitions <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
