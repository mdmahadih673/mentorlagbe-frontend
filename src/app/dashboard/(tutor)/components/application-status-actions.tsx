"use client";

import { useState } from "react";
import { Check, Clock3, LoaderCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { updateTutorApplicationStatus } from "@/lib/api/tutor/applications";
import type { TuitionApplicationStatus } from "@/lib/types/tuition";

const choices: {
  value: TuitionApplicationStatus;
  label: string;
  icon: typeof Check;
  className: string;
}[] = [
  { value: "pending", label: "Keep pending", icon: Clock3, className: "" },
  {
    value: "accepted",
    label: "Approve request",
    icon: Check,
    className: "bg-[#1d3b31] text-white hover:bg-[#315b45]",
  },
  {
    value: "rejected",
    label: "Reject request",
    icon: X,
    className: "border-red-200 text-red-700 hover:bg-red-50",
  },
];

export function ApplicationStatusActions({
  applicationId,
  teacherId,
  initialStatus,
}: {
  applicationId: string;
  teacherId: string;
  initialStatus: TuitionApplicationStatus;
}) {
  const [status, setStatus] = useState(initialStatus);
  const [isSaving, setIsSaving] = useState(false);

  async function changeStatus(nextStatus: TuitionApplicationStatus) {
    if (nextStatus === status) return;
    setIsSaving(true);
    try {
      await updateTutorApplicationStatus(applicationId, teacherId, nextStatus);
      setStatus(nextStatus);
      toast.add({ title: "Request status updated", type: "success" });
    } catch (error) {
      toast.add({
        title: "Could not update request",
        description:
          error instanceof Error ? error.message : "Please try again.",
        type: "error",
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {choices.map(({ value, label, icon: Icon, className }) => (
          <Button
            key={value}
            type="button"
            variant="outline"
            disabled={isSaving}
            aria-pressed={status === value}
            onClick={() => void changeStatus(value)}
            className={`h-10 rounded-xl px-3 text-xs font-semibold ${className} ${status === value ? "ring-2 ring-[#9ab275]/50" : ""}`}
          >
            {isSaving && status !== value ? (
              <LoaderCircle size={15} className="animate-spin" />
            ) : (
              <Icon size={15} />
            )}
            {label}
          </Button>
        ))}
      </div>
      <p className="mt-3 text-xs text-[#89928b]">
        Current status:{" "}
        <span className="font-semibold capitalize text-[#354a40]">
          {status}
        </span>
      </p>
    </div>
  );
}
