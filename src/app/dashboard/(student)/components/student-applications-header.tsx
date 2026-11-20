import { BookOpenCheck } from "lucide-react";

export function StudentApplicationsHeader() {
  return (
    <section className="rounded-3xl bg-[#1d3b31] p-6 text-white sm:p-8">
      <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-[#d9f36a]">
        <BookOpenCheck size={15} /> Student workspace
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">
        My applications
      </h1>
      <p className="mt-2 text-sm text-white/70">
        Track the tuition requests you have sent and see each tutor’s response.
      </p>
    </section>
  );
}
