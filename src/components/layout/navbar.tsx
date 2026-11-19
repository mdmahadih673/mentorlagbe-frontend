import Link from "next/link";
import { ArrowUpRight, BookOpenCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Find a tutor", href: "/tuitions" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
];

export function Navbar() {
  return (
    <header className="relative z-10 border-b border-[#e8e8df]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <Link href="/" aria-label="MentorLagbe home" className="flex items-center gap-2.5">
          <span className="flex size-10 items-center justify-center rounded-xl bg-[#d9f36a] text-[#18372e]">
            <BookOpenCheck size={22} strokeWidth={2.2} />
          </span>
          <span className="text-xl font-extrabold tracking-tight">
            Mentor<span className="text-[#4b7c59]">Lagbe</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {navigation.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-[#315b45]",
                index === 0 ? "text-[#19342c]" : "text-[#69756d]",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            nativeButton={false}
            variant="ghost"
            className="hidden rounded-full px-4 text-[#284239] sm:inline-flex"
            render={<Link href="sign-in" />}
          >
            Sign in
          </Button>
          <Button
            nativeButton={false}
            className="h-10 rounded-full bg-[#1d3b31] px-4 text-white hover:bg-[#315b45] sm:px-5"
            render={<Link href="sign-up" />}
          >
            Get started <ArrowUpRight />
          </Button>
        </div>
      </div>
    </header>
  );
}
