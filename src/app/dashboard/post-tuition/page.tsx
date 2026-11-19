"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PostTuitionForm } from "@/components/tuition/post-tuition-form";
import { toast } from "@/components/ui/toast";
import { useSession } from "@/lib/auth-client";
import { createTuition } from "@/lib/api/tuition";
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

export default function PostTuitionPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [values, setValues] = useState<TuitionFormValues>(initialValues);
  const [isUploading, setIsUploading] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishError, setPublishError] = useState("");

  function updateValue<Key extends keyof TuitionFormValues>(
    key: Key,
    value: TuitionFormValues[Key],
  ) {
    setValues((current) => ({ ...current, [key]: value }));
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
    if (session.user.role?.toLowerCase() !== "tutor") {
      setPublishError("শুধু tutor account থেকে tuition post করা যাবে।");
      return;
    }

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
    <PostTuitionForm
      values={{ ...values, teacherId: session?.user.id ?? "" }}
      onChange={updateValue}
      onSubmit={handleSubmit}
      isUploading={isUploading}
      isPublishing={isPublishing || isPending}
      publishError={publishError}
      onBannerUploadingChange={setIsUploading}
    />
  );
}
