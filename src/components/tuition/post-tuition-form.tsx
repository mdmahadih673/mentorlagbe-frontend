"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  Check,
  Clock3,
  MapPin,
  Monitor,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { TuitionBannerField } from "@/components/dashboard/tuition-banner-field";
import type { TuitionFormValues } from "@/lib/types/tuition";

type Props = {
  values: TuitionFormValues;
  onChange: <Key extends keyof TuitionFormValues>(
    key: Key,
    value: TuitionFormValues[Key],
  ) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isUploading: boolean;
  isPublishing: boolean;
  publishError: string;
  onBannerUploadingChange: (uploading: boolean) => void;
  formTitle?: string;
  formDescription?: string;
  submitLabel?: string;
  backHref?: string;
};

const inputClass =
  "h-12 rounded-xl border-[#e1e6de] bg-[#fdfdfb] px-3.5 text-sm placeholder:text-[#a0aaa3] focus-visible:border-[#91aa78] focus-visible:ring-[#91aa78]/10";
const selectClass =
  "h-12 w-full rounded-xl border-[#e1e6de] bg-[#fdfdfb] px-3.5 text-sm";
const labelClass = "mb-2 text-xs font-semibold text-[#526159]";

function SectionHeading({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <CardHeader className="grid-cols-[auto_1fr] items-center gap-3 border-b border-[#edf0e9] px-0 pb-5">
      <span className="flex size-10 items-center justify-center rounded-xl bg-[#f1f5e7] text-[#6c8b43]">
        {number}
      </span>
      <div>
        <h2 className="font-semibold text-[#203b31]">{title}</h2>
        <p className="mt-0.5 text-xs text-[#929c95]">{description}</p>
      </div>
    </CardHeader>
  );
}

export function PostTuitionForm({
  values,
  onChange,
  onSubmit,
  isUploading,
  isPublishing,
  publishError,
  onBannerUploadingChange,
  formTitle = "Post a tuition",
  formDescription = "Add the details students need to find a learning opportunity that fits.",
  submitLabel = "Submit for review",
  backHref = "/dashboard",
}: Props) {
  return (
    <div className="mx-auto max-w-6xl space-y-7">
      <div>
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#849087] transition hover:text-[#456450]"
        >
          <ArrowLeft size={15} /> Back to dashboard
        </Link>
        <div className="mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-[#78934c]">
              Share your expertise
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-.04em] text-[#19342c] sm:text-4xl">
              {formTitle}
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#77827b]">
              {formDescription}
            </p>
          </div>
          <div className="flex items-center gap-2 self-start rounded-full border border-[#e3e8dc] bg-white px-3 py-2 text-xs font-semibold text-[#61784d] sm:self-auto">
            <ShieldCheck size={15} /> Reviewed before publishing
          </div>
        </div>
      </div>

      <div className="grid items-start gap-6 xl:grid-cols-[1fr_310px]">
        <form className="space-y-6" onSubmit={onSubmit}>
          <input type="hidden" name="teacherId" value={values.teacherId} />
          <Card className="rounded-3xl border-[#e6e9e1] bg-white p-5 shadow-none ring-0 sm:p-7">
            <SectionHeading
              number="01"
              title="Tuition details"
              description="Start with the basics of your lessons"
            />
            <CardContent className="mt-5 grid gap-5 px-0 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="tuition-title" className={labelClass}>
                  Tuition title <span className="text-[#b96e56]">*</span>
                </Label>
                <Input
                  id="tuition-title"
                  required
                  maxLength={100}
                  value={values.title}
                  onChange={(event) => onChange("title", event.target.value)}
                  placeholder="e.g. Build strong foundations in Higher Math"
                  className={inputClass}
                />
                <p className="mt-1.5 text-xs text-[#9aa39c]">
                  Use a clear title that explains what students will learn.
                </p>
              </div>
              <div>
                <Label htmlFor="tuition-subject" className={labelClass}>
                  Subject <span className="text-[#b96e56]">*</span>
                </Label>
                <Select
                  value={values.subject}
                  onValueChange={(value) =>
                    onChange("subject", value as TuitionFormValues["subject"])
                  }
                >
                  <SelectTrigger id="tuition-subject" className={selectClass}>
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Mathematics",
                      "English",
                      "Physics",
                      "Chemistry",
                      "Biology",
                      "ICT",
                      "Other",
                    ].map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="tuition-class" className={labelClass}>
                  Class level <span className="text-[#b96e56">*</span>
                </Label>
                <Select
                  value={values.classLevel}
                  onValueChange={(value) =>
                    onChange(
                      "classLevel",
                      value as TuitionFormValues["classLevel"],
                    )
                  }
                >
                  <SelectTrigger id="tuition-class" className={selectClass}>
                    <SelectValue placeholder="Select a class level" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Class 6",
                      "Class 7",
                      "Class 8",
                      "Class 9",
                      "Class 10",
                      "HSC",
                      "Admission",
                      "Other",
                    ].map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-[#e6e9e1] bg-white p-5 shadow-none ring-0 sm:p-7">
            <SectionHeading
              number="02"
              title="Schedule & location"
              description="Help students understand how lessons work"
            />
            <CardContent className="mt-5 px-0">
              <p className="text-xs font-semibold text-[#526159]">
                Learning mode <span className="text-[#b96e56]">*</span>
              </p>
              <div className="mt-2 grid grid-cols-2 gap-3">
                {(["Online", "Offline"] as const).map((mode) => (
                  <Button
                    key={mode}
                    type="button"
                    variant={values.mode === mode ? "secondary" : "outline"}
                    onClick={() => onChange("mode", mode)}
                    className="h-12 w-full rounded-xl"
                  >
                    {mode === "Online" ? (
                      <Monitor size={16} />
                    ) : (
                      <Building2 size={16} />
                    )}
                    {mode}
                    {values.mode === mode && <Check size={14} />}
                  </Button>
                ))}
              </div>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                {values.mode === "Online" ? (
                  <>
                    <div className="sm:col-span-2">
                      <Label htmlFor="meeting-link" className={labelClass}>
                        Online URL <span className="text-[#b96e56]">*</span>
                      </Label>
                      <Input
                        id="meeting-link"
                        type="url"
                        required
                        value={values.meetingLink}
                        onChange={(event) =>
                          onChange("meetingLink", event.target.value)
                        }
                        placeholder="Paste any online lesson URL"
                        className={inputClass}
                      />
                    </div>
                  </>
                ) : (
                  <div>
                    <Label htmlFor="tuition-location" className={labelClass}>
                      Location <span className="text-[#b96e56">*</span>
                    </Label>
                    <span className="relative block">
                      <MapPin
                        size={16}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#99a39b]"
                      />
                      <Input
                        id="tuition-location"
                        required
                        value={values.location}
                        onChange={(event) =>
                          onChange("location", event.target.value)
                        }
                        placeholder="Area, city"
                        className={`${inputClass} pl-10`}
                      />
                    </span>
                  </div>
                )}
                <div>
                  <Label htmlFor="days-per-week" className={labelClass}>
                    Days per week <span className="text-[#b96e56">*</span>
                  </Label>
                  <Select
                    value={
                      values.daysPerWeek === ""
                        ? ""
                        : String(values.daysPerWeek)
                    }
                    onValueChange={(value) =>
                      onChange(
                        "daysPerWeek",
                        Number(value) as 1 | 2 | 3 | 4 | 5 | 6,
                      )
                    }
                  >
                    <SelectTrigger id="days-per-week" className={selectClass}>
                      <SelectValue placeholder="Select days" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6].map((days) => (
                        <SelectItem key={days} value={String(days)}>
                          {days} {days === 1 ? "day" : "days"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="preferred-time" className={labelClass}>
                    Preferred time{" "}
                    <span className="font-normal text-[#9aa39c]">
                      (optional)
                    </span>
                  </Label>
                  <span className="relative block">
                    <Clock3
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#99a39b]"
                    />
                    <Input
                      id="preferred-time"
                      value={values.preferredTime}
                      onChange={(event) =>
                        onChange("preferredTime", event.target.value)
                      }
                      placeholder="e.g. Evenings, 6:00–8:00 PM"
                      className={`${inputClass} pl-10`}
                    />
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-[#e6e9e1] bg-white p-5 shadow-none ring-0 sm:p-7">
            <SectionHeading
              number="03"
              title="Fee & description"
              description="Set expectations for your students"
            />
            <CardContent className="mt-5 space-y-5 px-0">
              <div className="max-w-sm">
                <Label htmlFor="monthly-fee" className={labelClass}>
                  Monthly fee (৳) <span className="text-[#b96e56">*</span>
                </Label>
                <Input
                  id="monthly-fee"
                  required
                  min={1}
                  type="number"
                  inputMode="numeric"
                  value={values.monthlyFee}
                  onChange={(event) =>
                    onChange(
                      "monthlyFee",
                      event.target.value === ""
                        ? ""
                        : Number(event.target.value),
                    )
                  }
                  placeholder="e.g. 5000"
                  className={inputClass}
                />
              </div>
              <div>
                <Label htmlFor="tuition-description" className={labelClass}>
                  Description <span className="text-[#b96e56">*</span>
                </Label>
                <Textarea
                  id="tuition-description"
                  required
                  minLength={30}
                  maxLength={1500}
                  rows={6}
                  value={values.description}
                  onChange={(event) =>
                    onChange("description", event.target.value)
                  }
                  placeholder="Describe your teaching approach, lesson plan, and what students can expect…"
                  className="resize-y rounded-xl border-[#e1e6de] bg-[#fdfdfb] px-3.5 py-3 text-sm leading-6 placeholder:text-[#a0aaa3] focus-visible:border-[#91aa78] focus-visible:ring-[#91aa78]/10"
                />
                <p className="mt-1.5 text-xs text-[#9aa39c]">
                  At least 30 characters. Be specific about your lessons.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-[#e6e9e1] bg-white p-5 shadow-none ring-0 sm:p-7">
            <SectionHeading
              number="04"
              title="Banner image"
              description="A clear image helps your listing stand out"
            />
            <CardContent className="px-0">
              <TuitionBannerField
                imageUrl={values.bannerUrl}
                onImageUrlChange={(url) => onChange("bannerUrl", url)}
                onUploadingChange={onBannerUploadingChange}
              />
            </CardContent>
          </Card>

          <Card className="flex flex-col-reverse justify-between gap-3 rounded-3xl border-[#e6e9e1] bg-white p-4 shadow-none ring-0 sm:flex-row sm:items-center sm:px-6">
            <p className="flex items-center gap-2 text-xs text-[#89928b]">
              <ShieldCheck size={15} className="text-[#78934c]" /> Your tuition
              will be reviewed before it appears publicly.
            </p>
            <div className="flex items-center gap-2 sm:justify-end">
              <Button
                type="submit"
                disabled={isPublishing || isUploading}
                className="h-10 rounded-xl bg-[#1d3b31] px-4 text-xs font-semibold text-white hover:bg-[#315b45]"
              >
                {isPublishing ? "Saving…" : submitLabel}
              </Button>
            </div>
          </Card>
          {publishError && (
            <p
              role="alert"
              className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {publishError}
            </p>
          )}
        </form>

        <aside className="space-y-5 xl:sticky xl:top-24">
          <Card className="rounded-3xl border-[#e6e9e1] bg-white p-5 shadow-none ring-0 sm:p-6">
            <div className="flex items-center gap-2">
              <BadgeCheck size={17} className="text-[#78934c]" />
              <h2 className="text-sm font-semibold text-[#354a40]">
                A helpful listing includes
              </h2>
            </div>
            <ul className="mt-4 space-y-3 text-xs leading-5 text-[#77827b]">
              <li className="flex items-start gap-2">
                <Check size={14} className="mt-0.5 shrink-0 text-[#78934c]" />A
                clear title and accurate class level
              </li>
              <li className="flex items-start gap-2">
                <Check size={14} className="mt-0.5 shrink-0 text-[#78934c]" />A
                realistic monthly fee and schedule
              </li>
              <li className="flex items-start gap-2">
                <Check size={14} className="mt-0.5 shrink-0 text-[#78934c]" />
                Details about your teaching approach
              </li>
              <li className="flex items-start gap-2">
                <Check size={14} className="mt-0.5 shrink-0 text-[#78934c]" />A
                relevant, high-quality banner image
              </li>
            </ul>
          </Card>
          <Card className="rounded-3xl border-0 bg-[#eaf0dc] p-5 shadow-none ring-0 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[.15em] text-[#78934c]">
              Tutor plan
            </p>
            <p className="mt-3 text-lg font-semibold text-[#203b31]">
              Create your tuition post
            </p>
            <p className="mt-2 text-xs leading-5 text-[#6f7d70]">
              Your listing will be reviewed before it appears to students.
            </p>
          </Card>
        </aside>
      </div>
    </div>
  );
}
