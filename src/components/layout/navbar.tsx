"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, BookOpenCheck, ChevronDown, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { signOut, useSession } from "@/lib/auth-client";
import { getUserType } from "@/lib/user-role";
import { cn } from "@/lib/utils";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Find a tutor", href: "/tuitions" },
  { label: "How it works", href: "/how-it-works" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const user = session?.user;
  const initials =
    user?.name
      ?.trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "U";

  async function handleSignOut() {
    setIsSigningOut(true);
    try {
      const { error } = await signOut();
      if (error) {
        toast.add({
          title: "Sign-out failed",
          description: error.message || "Please try again.",
          type: "error",
        });
        return;
      }
      router.replace("/");
      router.refresh();
    } catch (error) {
      toast.add({
        title: "Sign-out failed",
        description:
          error instanceof Error ? error.message : "Please try again.",
        type: "error",
      });
    } finally {
      setIsSigningOut(false);
    }
  }

  return (
    <header className="relative z-10 border-b border-[#e8e8df]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <Link
          href="/"
          aria-label="MentorLagbe home"
          className="flex items-center gap-2.5"
        >
          <span className="flex size-10 items-center justify-center rounded-xl bg-[#d9f36a] text-[#18372e]">
            <BookOpenCheck size={22} strokeWidth={2.2} />
          </span>
          <span className="text-xl font-extrabold tracking-tight">
            Mentor<span className="text-[#4b7c59]">Lagbe</span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-7 md:flex"
          aria-label="Main navigation"
        >
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
          {isPending ? (
            <span
              aria-label="Loading account"
              className="size-10 animate-pulse rounded-full bg-[#e8ece3]"
            />
          ) : user ? (
            <>
              <details className="group relative">
                <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-[#e6e9e1] bg-white py-1 pl-1 pr-2 transition hover:border-[#cbd7bd] [&::-webkit-details-marker]:hidden">
                  <span
                    className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#eaf0dc] bg-cover bg-center text-xs font-bold text-[#496844]"
                    style={
                      user.image
                        ? { backgroundImage: `url("${user.image}")` }
                        : undefined
                    }
                    aria-hidden="true"
                  >
                    {!user.image && initials}
                  </span>
                  <span className="hidden max-w-32 sm:block">
                    <span className="block truncate text-left text-xs font-semibold text-[#284239]">
                      {user.name || "My account"}
                    </span>
                    <span className="block text-left text-[10px] capitalize text-[#87928b]">
                      {getUserType(user)}
                    </span>
                  </span>
                  <ChevronDown
                    size={15}
                    className="text-[#7f8c83] transition group-open:rotate-180"
                  />
                </summary>
                <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-2xl border border-[#e6e9e1] bg-white p-2 shadow-[0_18px_50px_-24px_rgba(29,59,49,.35)]">
                  <div className="border-b border-[#edf0e9] px-3 py-2.5">
                    <p className="truncate text-sm font-semibold text-[#284239]">
                      {user.name || "My account"}
                    </p>
                    <p className="truncate text-xs text-[#89928b]">
                      {user.email}
                    </p>
                  </div>
                  <Link
                    href="/dashboard"
                    className="mt-1 block rounded-xl px-3 py-2.5 text-sm font-medium text-[#526159] transition hover:bg-[#f3f6ed] hover:text-[#315b45]"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/profile"
                    className="block rounded-xl px-3 py-2.5 text-sm font-medium text-[#526159] transition hover:bg-[#f3f6ed] hover:text-[#315b45]"
                  >
                    Profile
                  </Link>
                </div>
              </details>
              <Button
                type="button"
                variant="ghost"
                disabled={isSigningOut}
                onClick={handleSignOut}
                className="rounded-full px-3 text-sm text-[#526159] hover:bg-[#f1f4ed]"
              >
                <LogOut size={16} />{" "}
                <span className="hidden sm:inline">
                  {isSigningOut ? "Signing out…" : "Sign out"}
                </span>
              </Button>
            </>
          ) : (
            <>
              <Button
                nativeButton={false}
                variant="ghost"
                className="hidden rounded-full px-4 text-[#284239] sm:inline-flex"
                render={<Link href="/sign-in" />}
              >
                Sign in
              </Button>
              <Button
                nativeButton={false}
                className="h-10 rounded-full bg-[#1d3b31] px-4 text-white hover:bg-[#315b45] sm:px-5"
                render={<Link href="/sign-up" />}
              >
                Get started <ArrowUpRight />
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
