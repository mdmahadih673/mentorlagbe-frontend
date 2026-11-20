"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TriangleAlert } from "lucide-react";
import { PostTuitionForm } from "./post-tuition-form";
import { toast } from "@/components/ui/toast";
import { useSession } from "@/lib/auth-client";
import { createTuition } from "@/lib/api/tutor/tuition";
import { getTutorTuitionUsage } from "@/lib/api/payment-api/tutor-usage";
import { getAccountRole } from "@/lib/user-role";
import type { TuitionFormValues } from "@/lib/types/tuition";

const initialValues: TuitionFormValues = {
  teacherId: "",
  title: "",
  subject: "",
  classLevel: "",
  mode: "Online",
  meetingLink: "",
  location: "",
  daysPerWeek: "",
  preferredTime: "",
  monthlyFee: "",
  description: "",
  bannerUrl: "",
};

export function PostTuitionPageClient() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [values, setValues] = useState<TuitionFormValues>(initialValues);
  const [isUploading, setIsUploading] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishError, setPublishError] = useState("");
  const [showLimitToast, setShowLimitToast] = useState(false);

  function updateValue<Key extends keyof TuitionFormValues>(key: Key, value: TuitionFormValues[Key],) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function notifyFreeLimitAndRedirect() {
    setShowLimitToast(true);
    window.setTimeout(() => router.replace("/dashboard/payment"), 1600);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPublishError("");

    if (isPending) return;
    if (!session?.user) {
      router.push(
        `/sign-in?callbackURL=${encodeURIComponent("/dashboard/post-tuition")}`,
      );
      return;
    }
    if (getAccountRole(session.user) !== "tutor") {
      setPublishError("শুধু tutor account থেকে tuition post করা যাবে।");
      return;
    }

    setIsPublishing(true);
    const usage = await getTutorTuitionUsage(session.user.id).catch(() => null);
    if (usage && !usage.canPost) {
      notifyFreeLimitAndRedirect();
      return;
    }
    setIsPublishing(false);

    const tuitionData: TuitionFormValues = {
      ...values,
      teacherId: session.user.id,
    };
    const requiredFields: Array<[string, string]> = [
      ["Tuition title", tuitionData.title.trim()],
      ["Subject", tuitionData.subject],
      ["Class level", tuitionData.classLevel],
      ["Days per week", String(tuitionData.daysPerWeek)],
      ["Monthly fee", String(tuitionData.monthlyFee)],
    ];
    if (tuitionData.mode === "Online") {
      requiredFields.push(["URL", tuitionData.meetingLink.trim()]);
    } else {
      requiredFields.push(["Location", tuitionData.location.trim()]);
    }
    const missing = requiredFields.find(([, value]) => !value || value === "");
    if (missing) {
      setPublishError(`${missing[0]} পূরণ করুন।`);
      return;
    }
    if (Number(tuitionData.monthlyFee) <= 0) {
      setPublishError("Monthly fee অবশ্যই শূন্যের বেশি হতে হবে।");
      return;
    }
    if (tuitionData.description.trim().length < 30) {
      setPublishError("Description অন্তত ৩০ অক্ষরের হতে হবে।");
      return;
    }
    if (tuitionData.mode === "Online") {
      try {
        const meetingUrl = new URL(tuitionData.meetingLink);
        if (!meetingUrl.protocol || !meetingUrl.hostname) throw new Error();
      } catch {
        setPublishError("একটি সঠিক URL দিন।");
        return;
      }
    }
    if (isUploading) {
      setPublishError("Banner image upload শেষ হওয়া পর্যন্ত অপেক্ষা করুন।");
      return;
    }

    setIsPublishing(true);
    try {
      await createTuition(tuitionData);
      toast.add({
        title: "Tuition submitted",
        description: "Your post is waiting for review.",
        type: "success",
      });
      router.push("/dashboard");
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes("Free plan allows up to 2 tuition posts")
      ) {
        notifyFreeLimitAndRedirect();
        return;
      }
      setPublishError(
        error instanceof Error
          ? error.message
          : "Could not post tuition. Please try again.",
      );
    } finally {
      setIsPublishing(false);
    }
  }

  return (
    <>
      {showLimitToast && (
        <div
          role="alert"
          className="fixed bottom-5 right-5 z-[100] flex w-[min(24rem,calc(100vw-2.5rem))] items-start gap-3 rounded-2xl border border-red-200 bg-white p-4 text-[#19342c] shadow-[0_18px_50px_-20px_rgba(29,59,49,.4)]"
        >
          <TriangleAlert className="mt-0.5 size-5 shrink-0 text-red-600" />
          <span className="min-w-0">
            <span className="block text-sm font-semibold">Free post limit reached</span>
            <span className="mt-1 block text-sm leading-5 text-[#68766e]">
              You&apos;ve reached your free limit of 2 tuition posts. Upgrade to Pro to post more.
            </span>
          </span>
        </div>
      )}
      <PostTuitionForm
        values={{ ...values, teacherId: session?.user.id ?? "" }}
        onChange={updateValue}
        onSubmit={handleSubmit}
        isUploading={isUploading}
        isPublishing={isPublishing || isPending}
        publishError={publishError}
        onBannerUploadingChange={setIsUploading}
      />
    </>
  );
}
