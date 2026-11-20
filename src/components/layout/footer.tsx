import Link from "next/link";
import { BookOpenCheck } from "lucide-react";

const footerLinks = [
  { label: "Find a tutor", href: "/tuitions" },
  { label: "How it works", href: "/how-it-works" },
  { label: "About", href: "/about" },
];

export function Footer() {
  return (
    <footer className="border-t border-[#e8e9e1] bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-[#19342c]">
          <BookOpenCheck size={18} className="text-[#78934c]" />
          MentorLagbe
        </Link>

        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-2">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[#77827b] transition hover:text-[#315b45]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="text-xs text-[#89928b]">© MentorLagbe. All rights reserved.</p>
      </div>
    </footer>
  );
}
