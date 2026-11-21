import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  GraduationCap,
  Search,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";

const values = [
  {
    icon: Search,
    title: "Find a suitable tutor",
    description:
      "Explore tuition posts by subject, class level, learning mode, location, and monthly budget.",
  },
  {
    icon: UsersRound,
    title: "Make a clear request",
    description:
      "Read the lesson details, choose a tuition that fits, and send a request to its tutor.",
  },
  {
    icon: CheckCircle2,
    title: "Track every response",
    description:
      "Students can see their sent requests and current status. Tutors can review requests and respond from their dashboard.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fbfaf7] text-[#19342c]">
      <Navbar />

      <section className="bg-[#eaf0dc] text-[#19342c]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#648147]">
            <BookOpenCheck size={15} /> About MentorLagbe
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-balance sm:text-5xl lg:text-6xl">
            A better connection between{" "}
            <span className="text-[#648147]">
              students and tutors.
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#526159] text-pretty sm:text-lg">
            MentorLagbe helps students discover tuition opportunities and gives
            tutors a simple way to share their teaching offers and manage
            incoming requests.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/tuitions"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#1d3b31] px-5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#315b45] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#648147]"
            >
              Find a tutor <ArrowRight size={16} />
            </Link>
            <Link
              href="/sign-up"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#cad7bd] bg-white/70 px-5 text-sm font-semibold text-[#284239] transition-colors duration-300 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#648147]"
            >
              Join as a tutor
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[.8fr_1.2fr] lg:px-10">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#78934c]">
            Our purpose
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-.04em] text-[#19342c]">
            Make finding the right learning support simpler.
          </h2>
        </div>
        <div className="space-y-4 text-sm leading-7 text-[#69756d] sm:text-base">
          <p>
            Finding tuition can take time. Students need to compare subjects,
            class levels, schedules, fees, and lesson formats. Tutors need a
            clear place to describe what they teach and review the requests they
            receive.
          </p>
          <p>
            MentorLagbe brings those steps together. Students can browse
            listings and follow their applications. Tutors can post tuition
            details, manage their own posts, and review student requests from
            one dashboard.
          </p>
        </div>
      </section>

      <section className="border-y border-[#e8e9e1] bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-[#78934c]">
              How MentorLagbe helps
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-.04em] text-[#19342c] sm:text-4xl">
              A clear process for both sides.
            </h2>
          </div>
          <div className="mt-9 grid items-start gap-4 md:grid-cols-2">
            {values.map(({ icon: Icon, title, description }, index) => (
              <article
                key={title}
                className={`rounded-2xl border border-[#e6e9e1] bg-[#fbfaf7] p-6 sm:p-7 ${index === values.length - 1 ? "md:col-span-2 md:grid md:grid-cols-[auto_1fr] md:items-center md:gap-x-6" : ""}`}
              >
                <span className="flex size-11 items-center justify-center rounded-2xl bg-[#eaf0dc] text-[#648147]">
                  <Icon size={20} />
                </span>
                <p className={`mt-6 text-xs font-semibold text-[#92a17e] ${index === values.length - 1 ? "md:mt-0" : ""}`}>
                  0{index + 1}
                </p>
                <h3 className={`mt-2 text-lg font-semibold text-[#203b31] ${index === values.length - 1 ? "md:col-start-2" : ""}`}>
                  {title}
                </h3>
                <p className={`mt-2 text-sm leading-6 text-[#77827b] ${index === values.length - 1 ? "md:col-start-2" : ""}`}>
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-5 py-16 sm:grid-cols-2 sm:px-8 sm:py-20 lg:px-10">
        <article className="rounded-3xl bg-[#eaf0dc] p-7 sm:p-8">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-white text-[#648147]">
            <GraduationCap size={22} />
          </span>
          <h2 className="mt-5 text-2xl font-semibold text-[#203b31]">
            For students
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#68766e]">
            Browse tuition listings, compare lesson details, request a tutor,
            and check whether each request is pending, accepted, or rejected.
          </p>
          <Link
            href="/tuitions"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#456450] hover:underline"
          >
            Explore tuition listings <ArrowRight size={15} />
          </Link>
        </article>
        <article className="rounded-3xl bg-[#f1eee5] p-7 sm:p-8">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-white text-[#648147]">
            <ShieldCheck size={21} />
          </span>
          <h2 className="mt-5 text-2xl font-semibold text-[#203b31]">
            For tutors
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#68766e]">
            Create tuition posts with your subject, schedule, mode, fee, and
            lesson details. Manage your posts and respond to student requests
            from your dashboard.
          </p>
          <Link
            href="/sign-up"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#456450] hover:underline"
          >
            Create a tutor account <ArrowRight size={15} />
          </Link>
        </article>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 sm:pb-20 lg:px-10">
        <div className="flex flex-col justify-between gap-5 rounded-3xl bg-[#1d3b31] p-7 text-white sm:flex-row sm:items-center sm:p-9">
          <div>
            <h2 className="text-2xl font-semibold">Ready to get started?</h2>
            <p className="mt-2 text-sm text-white/70">
              Find a tutor or share your teaching opportunity with learners.
            </p>
          </div>
          <Link
            href="/how-it-works"
            className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-full bg-white px-4 text-sm font-semibold text-[#203b31] transition hover:bg-[#f1f5e7] sm:self-auto"
          >
            See how it works <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </main>
  );
}
