"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PostTuitionForm } from "./post-tuition-form";
import { toast } from "@/components/ui/toast";
import { updateTuition } from "@/lib/api/tutor/tuition";
import type { TuitionFormValues } from "@/lib/types/tuition";

export function EditTuitionForm({
  tuition,
  teacherId,
  tuitionId,
}: {
  tuition: TuitionFormValues;
  teacherId: string;
  tuitionId: string;
}) {
  const router = useRouter();
  const [values, setValues] = useState<TuitionFormValues>({
    ...tuition,
    teacherId,
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  function updateValue<Key extends keyof TuitionFormValues>(
    key: Key,
    value: TuitionFormValues[Key],
  ) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (
      !values.title.trim() ||
      !values.subject ||
      !values.classLevel ||
      !values.daysPerWeek ||
      Number(values.monthlyFee) <= 0 ||
      values.description.trim().length < 30
    ) {
      setError(
        "Complete the title, subject, class, schedule, fee, and description fields before saving.",
      );
      return;
    }
    if (values.mode === "Online") {
      try {
        const meetingUrl = new URL(values.meetingLink);
        if (!meetingUrl.hostname) throw new Error();
      } catch {
        setError("Enter a valid online lesson URL.");
        return;
      }
    } else if (!values.location.trim()) {
      setError("Enter the tuition location.");
      return;
    }
    if (isUploading) {
      setError("Wait for the banner image upload to finish.");
      return;
    }

    setIsSaving(true);
    try {
      await updateTuition(tuitionId, teacherId, values);
      toast.add({
        title: "Tuition updated",
        description: "Your edited post is waiting for review.",
        type: "success",
      });
      router.replace(`/dashboard/my-tuitions?refresh=${Date.now()}`);
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : "Could not update this tuition.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <PostTuitionForm
      values={values}
      onChange={updateValue}
      onSubmit={handleSubmit}
      isUploading={isUploading}
      isPublishing={isSaving}
      publishError={error}
      onBannerUploadingChange={setIsUploading}
      formTitle="Edit tuition post"
      formDescription="Update your tuition details. Edited posts are reviewed again before appearing publicly."
      submitLabel="Save changes"
      backHref="/dashboard/my-tuitions"
    />
  );
}
