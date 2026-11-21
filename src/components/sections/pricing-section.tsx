"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Check,
  GraduationCap,
  Sparkles,
  UsersRound,
} from "lucide-react";

type Audience = "tutor" | "student";

const plans = {
  tutor: {
    audienceLabel: "Tutors",
    freeDescription:
      "Post your first tuition listings and manage student requests.",
    proDescription: "Post more tuition listings with a single payment.",
    freeFeatures: [
      "Up to 2 tuition posts",
      "Manage student requests",
      "Standard tutor profile",
    ],
    proFeatures: [
      "Unlimited tuition posts",
      "Manage all applicants",
      "One time payment",
    ],
    amount: "$15",
    freeLimit: "Up to 2 posts",
    proLimit: "Unlimited posts",
    freeRequests: "Manage requests",
    proRequests: "Manage requests",
    paymentLabel: "$15 one time",
    paymentHref: "/dashboard/payment",
  },
  student: {
    audienceLabel: "Students",
    freeDescription: "Browse tuition listings and track the requests you send.",
    proDescription: "Send more tuition requests with a single payment.",
    freeFeatures: [
      "Up to 2 active requests",
      "Track request status",
      "Browse tuition listings",
    ],
    proFeatures: [
      "Unlimited active requests",
      "Track every response",
      "One time payment",
    ],
    amount: "$10",
    freeLimit: "Up to 2 active requests",
    proLimit: "Unlimited active requests",
    freeRequests: "Track request status",
    proRequests: "Track request status",
    paymentLabel: "$10 one time",
    paymentHref: "/dashboard/student-payment",
  },
} satisfies Record<
  Audience,
  {
    audienceLabel: string;
    freeDescription: string;
    proDescription: string;
    freeFeatures: string[];
    proFeatures: string[];
    amount: string;
    freeLimit: string;
    proLimit: string;
    freeRequests: string;
    proRequests: string;
    paymentLabel: string;
    paymentHref: string;
  }
>;

function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm text-[#526159]">
          <Check size={17} className="mt-0.5 shrink-0 text-[#648147]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function PricingSection() {
  const [audience, setAudience] = useState<Audience>("tutor");
  const plan = plans[audience];
  const AudienceIcon = audience === "tutor" ? GraduationCap : UsersRound;

  return (
    <section
      id="pricing"
      className="scroll-mt-28 bg-[#fbfaf7] px-5 py-16 sm:px-8 sm:py-20 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#648147]">
              <Sparkles size={16} /> Plans and pricing
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#19342c] text-balance sm:text-4xl">
              Choose the plan that fits
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#77827b] text-pretty sm:text-base">
              Start for free. Upgrade once when you need more room to post or
              apply.
            </p>
          </div>

          <div
            aria-label="Choose pricing audience"
            className="inline-flex w-fit rounded-xl border border-[#dfe5d9] bg-white p-1"
          >
            {(["tutor", "student"] as const).map((role) => {
              const Icon = role === "tutor" ? GraduationCap : UsersRound;
              const selected = audience === role;

              return (
                <button
                  key={role}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setAudience(role)}
                  className={`inline-flex min-h-10 items-center gap-2 rounded-lg px-4 text-sm font-semibold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#648147] ${
                    selected
                      ? "bg-[#1d3b31] text-white"
                      : "text-[#69756d] hover:bg-[#f3f6ed] hover:text-[#203b31]"
                  }`}
                >
                  <Icon size={16} /> {plans[role].audienceLabel}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-9 grid items-start gap-5 lg:grid-cols-2">
          <article className="flex h-full flex-col rounded-2xl border border-[#e2e7de] bg-white p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[#648147]">Free plan</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-[#203b31]">
                  Start at no cost
                </h3>
              </div>
              <span className="flex size-11 items-center justify-center rounded-xl bg-[#eaf0dc] text-[#648147]">
                <AudienceIcon size={20} />
              </span>
            </div>
            <p className="mt-3 min-h-12 max-w-md text-sm leading-6 text-[#77827b]">
              {plan.freeDescription}
            </p>
            <p className="mt-5 text-4xl font-semibold tracking-tight text-[#203b31]">
              $0 <span className="text-sm font-medium text-[#89928b]">forever</span>
            </p>
            <div className="mt-6 flex-1">
              <FeatureList items={plan.freeFeatures} />
            </div>
            <Link
              href="/sign-up"
              className="mt-8 inline-flex min-h-11 items-center justify-center rounded-xl border border-[#dfe5d9] px-5 text-sm font-semibold text-[#315b45] transition-colors duration-300 hover:bg-[#f3f6ed] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#648147]"
            >
              Create a free account
            </Link>
          </article>

          <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#1d3b31] bg-[#1d3b31] p-6 text-white sm:p-8">
            <div className="absolute right-0 top-0 h-1 w-full bg-[#d9f36a]" />
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[#d9f36a]">Pro plan</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                  More room to grow
                </h3>
              </div>
              <span className="flex size-11 items-center justify-center rounded-xl bg-white/10 text-[#d9f36a]">
                <Sparkles size={20} />
              </span>
            </div>
            <p className="mt-3 min-h-12 max-w-md text-sm leading-6 text-white/70">
              {plan.proDescription}
            </p>
            <p className="mt-5 text-4xl font-semibold tracking-tight">
              {plan.amount}{" "}
              <span className="text-sm font-medium text-white/65">one time</span>
            </p>
            <ul className="mt-6 flex-1 space-y-3">
              {plan.proFeatures.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/85">
                  <Check size={17} className="mt-0.5 shrink-0 text-[#d9f36a]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href={plan.paymentHref}
              className="mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#d9f36a] px-5 text-sm font-semibold text-[#19342c] transition-colors duration-300 hover:bg-[#e6fb94] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9f36a]"
            >
              Upgrade to Pro <ArrowRight size={16} />
            </Link>
            <p className="mt-3 text-center text-xs text-white/55">
              Secure one time payment with Stripe
            </p>
          </article>
        </div>

        <div className="mt-12">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h3 className="text-xl font-semibold tracking-tight text-[#203b31]">
                Compare {plan.audienceLabel.toLowerCase()} plans
              </h3>
              <p className="mt-1 text-sm text-[#77827b]">
                See what changes when you upgrade.
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-[#e2e7de] bg-white">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="bg-[#f3f5ef] text-xs font-semibold text-[#69756d]">
                  <tr>
                    <th scope="col" className="px-5 py-4">Feature</th>
                    <th scope="col" className="px-5 py-4">Free</th>
                    <th scope="col" className="px-5 py-4 text-[#648147]">Pro</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#edf0e9] text-[#526159]">
                  <tr>
                    <th scope="row" className="px-5 py-4 font-medium">{audience === "tutor" ? "Tuition posts" : "Active requests"}</th>
                    <td className="px-5 py-4">{plan.freeLimit}</td>
                    <td className="px-5 py-4 font-semibold text-[#648147]">{plan.proLimit}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-5 py-4 font-medium">Request management</th>
                    <td className="px-5 py-4">{plan.freeRequests}</td>
                    <td className="px-5 py-4 font-semibold text-[#648147]">{plan.proRequests}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-5 py-4 font-medium">Payment</th>
                    <td className="px-5 py-4">Free</td>
                    <td className="px-5 py-4 font-semibold text-[#648147]">{plan.paymentLabel}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
