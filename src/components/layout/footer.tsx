import Link from "next/link";
import { ArrowUpRight, BookOpenCheck } from "lucide-react";

const footerLinks = [
  { label: "Find a tutor", href: "/tuitions" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "About MentorLagbe", href: "/about" },
];

export function Footer() {
  return (
    <footer className="bg-[#19342c] text-white">
      <div className="mx-auto max-w-7xl px-5 pb-6 pt-12 sm:px-8 sm:pt-14 lg:px-10">
        <div className="grid gap-10 border-b border-white/15 pb-10 md:grid-cols-[1fr_auto] md:items-start">
          <div className="max-w-lg">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d9f36a]"
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-[#d9f36a] text-[#19342c]">
                <BookOpenCheck size={20} />
              </span>
              <span className="text-lg font-semibold tracking-tight">
                MentorLagbe
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/65">
              Find a tutor who fits your subject, schedule, and learning mode.
            </p>
          </div>

          <nav aria-label="Footer navigation" className="grid gap-2 sm:grid-cols-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex min-h-10 items-center justify-between gap-5 rounded-lg px-3 text-sm text-white/75 transition-colors duration-300 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9f36a]"
              >
                {link.label}
                <ArrowUpRight size={14} className="text-[#d9f36a]" />
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-2 pt-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© MentorLagbe. All rights reserved.</p>
          <p>Learning starts with the right connection.</p>
        </div>
      </div>
    </footer>
  );
}
