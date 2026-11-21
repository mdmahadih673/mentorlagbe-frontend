import Link from "next/link";
import { ShieldX } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fbfaf7] px-5 text-[#19342c]">
      <section className="w-full max-w-lg rounded-2xl border border-[#e2e7de] bg-white p-8 text-center sm:p-10">
        <span className="mx-auto flex size-12 items-center justify-center rounded-xl bg-[#fbeceb] text-[#a35e55]">
          <ShieldX size={22} />
        </span>
        <h1 className="mt-5 text-2xl font-semibold tracking-tight">
          You can’t access this page
        </h1>
        <p className="mt-2 text-sm leading-6 text-[#77827b]">
          Your account does not have permission to open this page.
        </p>
        <Link
          href="/dashboard"
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#1d3b31] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#315b45]"
        >
          Back to dashboard
        </Link>
      </section>
    </main>
  );
}
