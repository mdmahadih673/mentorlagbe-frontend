"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { BadgeCheck, LoaderCircle, UploadCloud } from "lucide-react";
import { toast } from "@/components/ui/toast";

type TuitionBannerFieldProps = {
  imageUrl: string;
  onImageUrlChange: (url: string) => void;
  onUploadingChange?: (uploading: boolean) => void;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export function TuitionBannerField({
  imageUrl,
  onImageUrlChange,
  onUploadingChange,
}: TuitionBannerFieldProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const file = input.files?.[0];
    if (!file) return;

    setError("");
    if (!ALLOWED_TYPES.has(file.type)) {
      setError("Choose a JPG, PNG, WEBP, or GIF image.");
      input.value = "";
      return;
    }
    if (file.size === 0 || file.size > MAX_FILE_SIZE) {
      setError("The banner image must be smaller than 5 MB.");
      input.value = "";
      return;
    }

    setIsUploading(true);
    onUploadingChange?.(true);
    try {
      const body = new FormData();
      body.append("file", file);
      const response = await fetch("/api/upload/image", {
        method: "POST",
        body,
      });
      const result = (await response.json()) as {
        url?: string;
        message?: string;
      };
      if (!response.ok || !result.url) {
        throw new Error(
          result.message || "Banner upload failed. Please try again.",
        );
      }
      onImageUrlChange(result.url);
      toast.add({
        title: "Banner uploaded",
        description: "Your image is ready to use.",
        type: "success",
      });
    } catch (uploadError) {
      const message =
        uploadError instanceof Error
          ? uploadError.message
          : "Banner upload failed. Please try again.";
      setError(message);
      toast.add({
        title: "Upload failed",
        description: message,
        type: "error",
      });
    } finally {
      setIsUploading(false);
      onUploadingChange?.(false);
      input.value = "";
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        id="tuition-banner"
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleChange}
        disabled={isUploading}
        className="sr-only"
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={isUploading}
        className={`mt-5 flex min-h-44 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed text-center transition disabled:cursor-wait ${imageUrl ? "border-[#cfdbc3] bg-cover bg-center" : "border-[#ccd7c5] bg-[#fbfcf9] px-5 py-8 hover:border-[#9db28a] hover:bg-[#f7f9f3]"}`}
        style={
          imageUrl
            ? {
                backgroundImage: `url("${imageUrl}")`,
              }
            : undefined
        }
      >
        {imageUrl ? (
          <span className="rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-[#456450] shadow-sm">
            Change banner image
          </span>
        ) : (
          <>
            <span className="mb-3 flex size-11 items-center justify-center rounded-2xl bg-[#eaf0dc] text-[#6c8b43]">
              {isUploading ? (
                <LoaderCircle size={20} className="animate-spin" />
              ) : (
                <UploadCloud size={20} />
              )}
            </span>
            <span className="text-sm font-semibold text-[#354a40]">
              {isUploading
                ? "Uploading your image…"
                : "Click to upload a banner"}
            </span>
            <span className="mt-1 text-xs text-[#929c95]">
              JPG, PNG, WEBP, or GIF · up to 5 MB
            </span>
          </>
        )}
      </button>
      {error && (
        <p role="alert" className="mt-2 text-xs text-red-700">
          {error}
        </p>
      )}
      {imageUrl && (
        <p className="mt-2 flex items-center gap-1.5 text-xs text-[#66814d]">
          <BadgeCheck size={14} /> Banner uploaded to ImgBB
        </p>
      )}
    </div>
  );
}
