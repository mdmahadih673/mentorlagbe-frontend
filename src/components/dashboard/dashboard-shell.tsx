"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  BookOpenCheck,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  CreditCard,
  FilePlus2,
  LayoutDashboard,
  LogOut,
  Menu,
  UsersRound,
  X,
} from "lucide-react";

import { toast } from "@/components/ui/toast";
import { signOut, useSession } from "@/lib/auth-client";
import { getUserType } from "@/lib/user-role";
import { cn } from "@/lib/utils";

type DashboardRole = "student" | "tutor" | "admin";
type NavigationItem = {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
};

const roleNavigation: Record<DashboardRole, NavigationItem[]> = {
  student: [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    {
      label: "My applications",
      href: "/dashboard/my-applications",
      icon: ClipboardList,
    },
    { label: "Browse tuitions", href: "/tuitions", icon: BookOpenCheck },
  ],
  tutor: [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    {
      label: "My tuitions",
      href: "/dashboard/my-tuitions",
      icon: BookOpenCheck,
    },
    {
      label: "Post a tuition",
      href: "/dashboard/post-tuition",
      icon: FilePlus2,
    },
    { label: "Applicants", href: "/dashboard/applicants", icon: UsersRound },
  ],
  admin: [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "Users", href: "/dashboard/admin/users", icon: UsersRound },
    { label: "Tuitions", href: "/dashboard/tuitions", icon: BookOpenCheck },
    {
      label: "Transactions",
      href: "/dashboard/transactions",
      icon: CreditCard,
    },
  ],
};

function getInitials(name?: string | null) {
  return (
    name
      ?.trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "U"
  );
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const user = session?.user;
  const role = (user ? getUserType(user) : "student") as DashboardRole;
  const navigation = roleNavigation[role] || roleNavigation.student;
  const pageTitle =
    pathname === "/dashboard/profile"
      ? "Profile"
      : navigation.find((item) => item.href === pathname)?.label || "Overview";

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
    <div className="min-h-screen bg-[#f5f6f1] text-[#19342c] lg:flex">
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-[#10231c]/40 lg:hidden"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-[276px] flex-col border-r border-[#e8eae3] bg-white px-4 py-5 transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-2">
          <Link
            href="/"
            className="flex items-center gap-2.5"
            onClick={() => setMobileOpen(false)}
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-[#d9f36a] text-[#18372e]">
              <BookOpenCheck size={20} />
            </span>
            <span className="text-lg font-extrabold tracking-tight">
              Mentor<span className="text-[#4b7c59]">Lagbe</span>
            </span>
          </Link>
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setMobileOpen(false)}
            className="flex size-9 items-center justify-center rounded-lg text-[#77827b] hover:bg-[#f3f5ef] lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <Link
          href="/dashboard/profile"
          onClick={() => setMobileOpen(false)}
          className={cn(
            "mt-8 flex items-center gap-3 rounded-2xl border p-3 transition",
            pathname === "/dashboard/profile"
              ? "border-[#cbd7bd] bg-[#f3f6ed]"
              : "border-[#edf0e9] bg-[#fbfcf9] hover:border-[#d5dfcb]",
          )}
        >
          <span
            className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#eaf0dc] bg-cover bg-center text-sm font-bold text-[#496844]"
            style={
              user?.image
                ? { backgroundImage: `url("${user.image}")` }
                : undefined
            }
            aria-hidden="true"
          >
            {!user?.image && (isPending ? "…" : getInitials(user?.name))}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold text-[#284239]">
              {isPending ? "Loading profile…" : user?.name || "Your profile"}
            </span>
            <span
              className="mt-0.5 block truncate text-xs text-[#89928b]"
              title={user?.email || undefined}
            >
              {isPending ? "" : user?.email || "Email unavailable"}
            </span>
          </span>
          <ChevronRight size={16} className="shrink-0 text-[#9aa39c]" />
        </Link>

        <div className="mt-8 px-3 text-[10px] font-bold uppercase tracking-[.17em] text-[#a0aaa3]">
          Workspace
        </div>
        <nav
          className="mt-2 flex-1 space-y-1"
          aria-label="Dashboard navigation"
        >
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                  active
                    ? "bg-[#eaf0dc] text-[#315b45]"
                    : "text-[#68766e] hover:bg-[#f4f6f0] hover:text-[#315b45]",
                )}
              >
                <Icon size={18} strokeWidth={1.8} />
                {item.label}
                {active && (
                  <span className="ml-auto size-1.5 rounded-full bg-[#87a452]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-1 border-t border-[#edf0e9] pt-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#68766e] transition hover:bg-[#f4f6f0] hover:text-[#315b45]"
          >
            <ArrowLeft size={17} /> Back to website
          </Link>
          <Link
            href="/how-it-works"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#68766e] transition hover:bg-[#f4f6f0] hover:text-[#315b45]"
          >
            <CircleHelp size={17} /> Help & getting started
          </Link>
          <button
            type="button"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-[#9b5d4b] transition hover:bg-[#fcf1ed] disabled:opacity-60"
          >
            <LogOut size={17} />
            {isSigningOut ? "Signing out…" : "Sign out"}
          </button>
        </div>
        <p className="px-3 pt-4 text-[10px] text-[#a0aaa3]">
          MentorLagbe · Learning together
        </p>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 flex h-[68px] items-center justify-between border-b border-[#e8eae3] bg-[#f8f9f5]/90 px-5 backdrop-blur sm:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Open navigation"
              onClick={() => setMobileOpen(true)}
              className="flex size-9 items-center justify-center rounded-lg border border-[#e5e9e0] bg-white text-[#536159] lg:hidden"
            >
              <Menu size={18} />
            </button>
            <div className="flex items-center gap-2 text-sm text-[#99a29b]">
              <span className="hidden sm:inline">Workspace</span>
              <ChevronRight size={14} className="hidden sm:inline" />
              <span className="font-semibold text-[#354a40]">{pageTitle}</span>
            </div>
          </div>
          <Link
            href="/dashboard/profile"
            className="flex size-9 items-center justify-center overflow-hidden rounded-full border border-[#e2e7de] bg-white text-xs font-bold text-[#496844]"
            aria-label="Open profile"
            style={
              user?.image
                ? {
                    backgroundImage: `url("${user.image}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : undefined
            }
          >
            {!user?.image && getInitials(user?.name)}
          </Link>
        </header>
        <main className="mx-auto w-full max-w-[1440px] px-5 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
