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
    .filter((tuition) => tuition.isActive !== false)
    .slice(0, 4);

  return (
    <section className="bg-[#f5f6f1] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-[#78934c]">
              <BookOpenCheck size={15} /> Find your match
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#19342c] sm:text-4xl">
              Tuition opportunities
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#77827b] sm:text-base">
              Explore a few of the latest listings from tutors in the community.
            </p>
          </div>
          <Link
            href="/tuitions"
            className="inline-flex h-11 items-center justify-center gap-2 self-start rounded-full border border-[#d8ded4] bg-white px-5 text-sm font-semibold text-[#315b45] transition hover:bg-[#edf2e5] sm:self-auto"
          >
            See all tuitions <ArrowRight size={16} />
          </Link>
        </div>

        {featured.length ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {featured.map((tuition, index) => (
              <TuitionCard
                key={tuition._id || tuition.id || tuition.tuitionId || index}
                tuition={tuition}
                index={index}
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
