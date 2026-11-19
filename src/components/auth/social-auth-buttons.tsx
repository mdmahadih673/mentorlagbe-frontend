"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { signIn } from "@/lib/auth-client";

type SocialProvider = "google" | "github";
type AuthRole = "student" | "tutor";

export function SocialAuthButtons({ role }: { role?: AuthRole }) {
  const [pendingProvider, setPendingProvider] = useState<SocialProvider | null>(null);

  async function handleProviderClick(provider: SocialProvider) {
    setPendingProvider(provider);

    try {
      const { error } = await signIn.social({
        provider,
        callbackURL: "/",
        newUserCallbackURL: "/",
        ...(role ? { additionalData: { role } } : {}),
      });

      if (error) {
        toast.add({
          title: "Social sign-in failed",
          description: error.message || `Unable to continue with ${provider}.`,
          type: "error",
        });
      }
    } catch (error) {
      toast.add({
        title: "Social sign-in failed",
        description: error instanceof Error ? error.message : "Please try again.",
        type: "error",
      });
    } finally {
      setPendingProvider(null);
    }
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          disabled={pendingProvider !== null}
          onClick={() => handleProviderClick("google")}
          className="h-11 rounded-xl border-[#e0e5dc] bg-white text-[#354a40] hover:bg-[#f7f8f4]"
        >
          <svg aria-hidden="true" viewBox="0 0 48 48" className="size-4">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" transform="translate(0 4)" />
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.76 7.18l7.73 6C44.42 37.8 46.98 31.67 46.98 24.55Z" />
            <path fill="#FBBC05" d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a23.9 23.9 0 0 0 0 21.56l7.98-6.19Z" transform="translate(0 4)" />
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.14 1.44-4.89 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z" />
          </svg>
          {pendingProvider === "google" ? "Opening…" : "Google"}
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={pendingProvider !== null}
          onClick={() => handleProviderClick("github")}
          className="h-11 rounded-xl border-[#e0e5dc] bg-white text-[#354a40] hover:bg-[#f7f8f4]"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 fill-current">
            <path d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.77-.24.77-.54v-2.1c-3.14.68-3.8-1.34-3.8-1.34-.5-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.12.08 1.71 1.15 1.71 1.15 1 1.7 2.62 1.2 3.26.92.1-.72.39-1.2.71-1.48-2.5-.29-5.12-1.25-5.12-5.56 0-1.23.44-2.23 1.16-3.02-.12-.29-.5-1.43.11-2.98 0 0 .95-.3 3.08 1.15a10.7 10.7 0 0 1 5.6 0c2.14-1.45 3.08-1.15 3.08-1.15.62 1.55.23 2.69.12 2.98.72.79 1.15 1.79 1.15 3.02 0 4.32-2.62 5.27-5.13 5.55.4.35.76 1.03.76 2.08v3.08c0 .3.2.65.77.54A11.2 11.2 0 0 0 12 .8Z" />
          </svg>
          {pendingProvider === "github" ? "Opening…" : "GitHub"}
        </Button>
      </div>
      <div className="my-5 flex items-center gap-3 text-xs text-[#9aa39c]">
        <span className="h-px flex-1 bg-[#e8ebe4]" />
        or continue with email
        <span className="h-px flex-1 bg-[#e8ebe4]" />
      </div>
    </div>
  );
}
