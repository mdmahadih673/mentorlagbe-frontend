"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Camera, Check, ImagePlus, LoaderCircle, UserRound } from "lucide-react";

import { toast } from "@/components/ui/toast";
import { authClient, useSession } from "@/lib/auth-client";

function getInitials(name?: string | null) {
  return name?.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "U";
}

export default function ProfilePage() {
  const { data: session, isPending, refetch } = useSession();
  const user = session?.user;
  const [editedName, setEditedName] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [imageError, setImageError] = useState("");
  const name = editedName ?? user?.name ?? "";
  const imageUrl = uploadedImageUrl ?? user?.image ?? "";

  async function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const file = input.files?.[0];
    if (!file) return;

    setImageError("");
    if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type)) {
      setImageError("Choose a JPG, PNG, WEBP, or GIF image.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setImageError("The image must be smaller than 5 MB.");
      return;
    }

    setIsUploading(true);
    const uploadData = new FormData();
    uploadData.append("file", file);

    try {
      const response = await fetch("/api/upload/image", { method: "POST", body: uploadData });
      const result = (await response.json()) as { url?: string; message?: string };
      if (!response.ok || !result.url) {
        throw new Error(result.message || "Could not upload this photo. Please try again.");
      }
      setUploadedImageUrl(result.url);
      toast.add({ title: "Photo uploaded", description: "Save your changes to update your profile photo.", type: "success" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not upload this photo. Please try again.";
      setImageError(message);
      toast.add({ title: "Photo upload failed", description: message, type: "error" });
    } finally {
      setIsUploading(false);
      input.value = "";
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextName = name.trim();
    if (!nextName) {
      toast.add({ title: "Name is required", description: "Enter the name you want shown on your profile.", type: "error" });
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await authClient.updateUser({
        name: nextName,
        image: imageUrl || undefined,
      });

      if (error) {
        toast.add({ title: "Profile update failed", description: error.message || "Please try again.", type: "error" });
        return;
      }

      await refetch();
      toast.add({ title: "Profile updated", description: "Your name and photo have been saved.", type: "success" });
    } catch (error) {
      toast.add({
        title: "Profile update failed",
        description: error instanceof Error ? error.message : "Please try again.",
        type: "error",
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-7">
      <div>
        <p className="text-xs font-bold uppercase tracking-[.18em] text-[#78934c]">Account settings</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-.04em] text-[#19342c] sm:text-4xl">Your profile</h1>
        <p className="mt-2 text-sm text-[#77827b]">Update the name and photo shown across MentorLagbe.</p>
      </div>

      <form onSubmit={handleSubmit} className="overflow-hidden rounded-[1.8rem] border border-[#e6e9e1] bg-white">
        <div className="h-28 bg-[#1d3b31] sm:h-36">
          <div className="h-full bg-[radial-gradient(circle_at_80%_10%,rgba(217,243,106,.22),transparent_35%)]" />
        </div>

        <div className="px-5 pb-7 sm:px-8 sm:pb-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="-mt-12 flex items-end gap-4 sm:-mt-14">
              <span
                className="flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-[1.6rem] border-4 border-white bg-[#eaf0dc] bg-cover bg-center text-2xl font-bold text-[#496844] shadow-sm sm:size-28"
                style={imageUrl ? { backgroundImage: `url("${imageUrl}")` } : undefined}
                aria-hidden="true"
              >
                {!imageUrl && getInitials(name)}
              </span>
              <div className="pb-1">
                <h2 className="text-xl font-semibold tracking-tight text-[#203b31]">{name || (isPending ? "Loading profile…" : "Your name")}</h2>
                <p className="mt-1 text-xs text-[#89928b]">Profile photo</p>
              </div>
            </div>

            <label htmlFor="profile-photo" className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 self-start rounded-xl border border-[#e0e5dc] bg-white px-4 text-xs font-semibold text-[#526159] transition hover:bg-[#f7f8f4] sm:self-auto">
              {isUploading ? <LoaderCircle size={15} className="animate-spin" /> : <Camera size={15} />}
              {isUploading ? "Uploading photo…" : "Change photo"}
              <input id="profile-photo" type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={handlePhotoChange} disabled={isUploading || isSaving} className="sr-only" />
            </label>
          </div>

          <div className="mt-8 max-w-xl border-t border-[#edf0e9] pt-6">
            <label htmlFor="profile-name" className="block text-sm font-semibold text-[#354a40]">Name</label>
            <div className="relative mt-2">
              <UserRound size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#99a39b]" />
              <input
                id="profile-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                maxLength={100}
                value={name}
          onChange={(event) => setEditedName(event.target.value)}
                placeholder="Enter your name"
                className="h-12 w-full rounded-xl border border-[#e1e6de] bg-[#fdfdfb] pl-10 pr-4 text-sm text-[#354a40] outline-none transition placeholder:text-[#a0aaa3] focus:border-[#91aa78] focus:ring-4 focus:ring-[#91aa78]/10"
              />
            </div>
            {imageError && <p role="alert" className="mt-3 text-xs text-red-700">{imageError}</p>}
            <p className="mt-3 flex items-center gap-1.5 text-xs text-[#929c95]"><ImagePlus size={14} /> JPG, PNG, WEBP, or GIF · up to 5 MB</p>
          </div>

          <div className="mt-7 flex flex-col-reverse justify-between gap-3 border-t border-[#edf0e9] pt-5 sm:flex-row sm:items-center">
            <p className="text-xs text-[#929c95]">Only your name and profile photo can be changed here.</p>
            <button type="submit" disabled={isSaving || isUploading || isPending} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#1d3b31] px-5 text-sm font-semibold text-white transition hover:bg-[#315b45] disabled:cursor-not-allowed disabled:opacity-60">
              <Check size={16} />{isSaving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
