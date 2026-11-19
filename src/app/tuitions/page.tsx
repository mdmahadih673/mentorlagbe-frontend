import Link from "next/link";
import { ArrowDownUp, ArrowRight, BookOpenCheck, Check, ChevronDown, MapPin, Search, SlidersHorizontal } from "lucide-react";

import { Navbar } from "@/components/layout/navbar";
import { TuitionCard, type TuitionCardData } from "@/components/sections/tuition-card";

const tuitions: TuitionCardData[] = [
  { id: "math-01", subject: "Mathematics", title: "Build strong math foundations", classLevel: "Class 9 · Higher Math", mode: "Online", tutor: "Nusrat Jahan", initials: "NJ", rating: "4.9", location: "Anywhere", fee: "৳ 5,000", schedule: "3 days / week", accent: "bg-[#dbe9c9]" },
  { id: "english-02", subject: "English", title: "English fluency & writing", classLevel: "Class 6–8 · English", mode: "Offline", tutor: "Rafi Ahmed", initials: "RA", rating: "4.8", location: "Dhanmondi", fee: "৳ 4,500", schedule: "3 days / week", accent: "bg-[#f2dfcb]" },
  { id: "physics-03", subject: "Physics", title: "Physics made clear and simple", classLevel: "HSC · Physics", mode: "Online", tutor: "Tahmid Hasan", initials: "TH", rating: "5.0", location: "Anywhere", fee: "৳ 6,500", schedule: "4 days / week", accent: "bg-[#d9e3ec]" },
  { id: "chemistry-04", subject: "Chemistry", title: "Chemistry with concept clarity", classLevel: "Class 9–10 · Chemistry", mode: "Offline", tutor: "Maliha Chowdhury", initials: "MC", rating: "4.9", location: "Uttara", fee: "৳ 5,500", schedule: "3 days / week", accent: "bg-[#eaddef]" },
  { id: "ict-05", subject: "ICT", title: "Practical ICT for confident learners", classLevel: "HSC · ICT", mode: "Online", tutor: "Sabbir Hossain", initials: "SH", rating: "4.7", location: "Anywhere", fee: "৳ 3,500", schedule: "2 days / week", accent: "bg-[#d9ece6]" },
  { id: "biology-06", subject: "Biology", title: "Explore biology, chapter by chapter", classLevel: "Class 9–10 · Biology", mode: "Offline", tutor: "Farhana Akter", initials: "FA", rating: "4.9", location: "Mirpur", fee: "৳ 5,000", schedule: "3 days / week", accent: "bg-[#f0e8c8]" },
];

const subjects = ["Mathematics", "English", "Physics", "Chemistry", "Biology", "ICT"];
const classLevels = ["Class 6–8", "Class 9–10", "HSC", "Admission"];

function FilterCheckbox({ label, count }: { label: string; count?: number }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-[#68766e]">
      <input type="checkbox" className="size-4 rounded border-[#d7dfd4] accent-[#315b45]" />
      <span className="flex-1">{label}</span>
      {count !== undefined && <span className="text-xs text-[#a0aaa3]">{count}</span>}
    </label>
  );
}

export default function TuitionsPage() {
  return (
    <main className="min-h-screen bg-[#fbfaf7] text-[#19342c]">
      <Navbar />

      <section className="border-b border-[#e8e9e1] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-[#78934c]"><BookOpenCheck size={15} /> Find your learning match</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-.05em] sm:text-5xl">Browse tuitions</h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[#77827b] sm:text-base">Explore tutor-led classes and one-to-one mentorships that fit your subjects, schedule, and goals.</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#77827b]"><span className="font-semibold text-[#203b31]">120+</span> learning opportunities to explore</div>
          </div>

          <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-[#e6e9e1] bg-[#fbfaf7] p-3 sm:flex-row sm:items-center sm:p-2.5">
            <div className="flex min-w-0 flex-1 items-center gap-3 px-2 sm:px-3">
              <Search size={19} className="shrink-0 text-[#78934c]" />
              <input type="search" aria-label="Search tuitions" placeholder="Search by subject or tuition title" className="h-11 min-w-0 flex-1 bg-transparent text-sm text-[#203b31] outline-none placeholder:text-[#9ba59e]" />
            </div>
            <span className="hidden h-8 w-px bg-[#e3e7df] sm:block" />
            <label className="flex items-center gap-2 px-2 text-sm text-[#89928b] sm:px-3">
              <MapPin size={16} className="text-[#78934c]" />
              <select aria-label="Location" defaultValue="" className="h-11 min-w-0 flex-1 bg-transparent text-sm text-[#68766e] outline-none sm:w-36">
                <option value="" disabled>Any location</option><option>Dhaka</option><option>Chattogram</option><option>Online</option>
              </select>
              <ChevronDown size={15} />
            </label>
            <button type="button" className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#1d3b31] px-5 text-sm font-semibold text-white transition hover:bg-[#315b45]">
              Search tuitions <ArrowRight size={16} />
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="mr-1 font-semibold text-[#89928b]">Popular:</span>
            {subjects.slice(0, 4).map((subject) => <span key={subject} className="rounded-full border border-[#e4e8df] bg-white px-3 py-1.5 text-[#68766e]">{subject}</span>)}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-7 px-5 py-8 sm:px-8 lg:grid-cols-[245px_1fr] lg:px-10 lg:py-10">
        <aside className="h-fit rounded-3xl border border-[#e6e9e1] bg-white p-5 sm:p-6">
          <div className="flex items-center justify-between border-b border-[#edf0e9] pb-4">
            <h2 className="flex items-center gap-2 font-semibold text-[#203b31]"><SlidersHorizontal size={17} /> Filters</h2>
            <button type="button" className="text-xs font-semibold text-[#6d8c43]">Reset</button>
          </div>

          <fieldset className="border-b border-[#edf0e9] py-5">
            <legend className="mb-4 text-sm font-semibold text-[#354a40]">Subject</legend>
            <div className="space-y-3">{subjects.map((subject, i) => <FilterCheckbox key={subject} label={subject} count={[28, 21, 18, 15, 12, 9][i]} />)}</div>
          </fieldset>

          <fieldset className="border-b border-[#edf0e9] py-5">
            <legend className="mb-4 text-sm font-semibold text-[#354a40]">Class level</legend>
            <div className="space-y-3">{classLevels.map((level) => <FilterCheckbox key={level} label={level} />)}</div>
          </fieldset>

          <fieldset className="border-b border-[#edf0e9] py-5">
            <legend className="mb-4 text-sm font-semibold text-[#354a40]">Learning mode</legend>
            <div className="space-y-3"><FilterCheckbox label="Online" count={64} /><FilterCheckbox label="Offline" count={56} /></div>
          </fieldset>

          <fieldset className="pt-5">
            <legend className="mb-4 text-sm font-semibold text-[#354a40]">Monthly budget</legend>
            <div className="grid grid-cols-2 gap-2">
              <label className="rounded-xl border border-[#e1e6de] px-3 py-2"><span className="block text-[10px] uppercase tracking-wide text-[#9aa39c]">Min fee</span><input type="text" placeholder="৳ 0" className="mt-1 w-full bg-transparent text-sm text-[#526159] outline-none placeholder:text-[#a0aaa3]" /></label>
              <label className="rounded-xl border border-[#e1e6de] px-3 py-2"><span className="block text-[10px] uppercase tracking-wide text-[#9aa39c]">Max fee</span><input type="text" placeholder="৳ 10,000" className="mt-1 w-full bg-transparent text-sm text-[#526159] outline-none placeholder:text-[#a0aaa3]" /></label>
            </div>
          </fieldset>

          <button type="button" className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#f1f5e7] text-sm font-semibold text-[#456450] transition hover:bg-[#e8efda]"><Check size={16} /> Apply filters</button>
        </aside>

        <div>
          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div><h2 className="text-xl font-semibold tracking-tight text-[#203b31]">Tutoring opportunities</h2><p className="mt-1 text-sm text-[#89928b]">Showing 6 of 120+ approved listings</p></div>
            <label className="flex items-center gap-2 self-start rounded-xl border border-[#e3e7df] bg-white px-3 text-xs text-[#89928b] sm:self-auto"><ArrowDownUp size={14} /><span>Sort by</span><select aria-label="Sort by" defaultValue="recommended" className="h-10 bg-transparent font-semibold text-[#526159] outline-none"><option value="recommended">Recommended</option><option>Newest</option><option>Fee: low to high</option></select></label>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {tuitions.map((tuition) => <TuitionCard key={tuition.id} tuition={tuition} />)}
          </div>

          <div className="mt-9 flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#e6e9e1] bg-white p-4 sm:flex-row">
            <p className="text-sm text-[#89928b]">Showing <span className="font-semibold text-[#354a40]">1–6</span> of <span className="font-semibold text-[#354a40]">120</span> opportunities</p>
            <div className="flex items-center gap-2">
              <button type="button" className="h-9 rounded-lg border border-[#e4e8df] px-3 text-sm text-[#a1aaa3]">Previous</button>
              <button type="button" className="size-9 rounded-lg bg-[#1d3b31] text-sm font-semibold text-white">1</button>
              <button type="button" className="size-9 rounded-lg border border-[#e4e8df] text-sm text-[#68766e]">2</button>
              <button type="button" className="size-9 rounded-lg border border-[#e4e8df] text-sm text-[#68766e]">3</button>
              <button type="button" className="h-9 rounded-lg border border-[#e4e8df] px-3 text-sm text-[#68766e]">Next</button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#e7e8df] bg-white/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-7 text-sm text-[#77827b] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <Link href="/" className="font-extrabold tracking-tight text-[#19342c]">MentorLagbe</Link>
          <p>Find guidance. Build confidence. Keep growing.</p>
          <p>© 2026 MentorLagbe</p>
        </div>
      </footer>
    </main>
  );
}
