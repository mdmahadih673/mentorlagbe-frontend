import { createAuthClient } from "better-auth/react";
import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "@/lib/auth";

// The auth API is served by this Next.js app, so the client can use the current origin.
export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>(), adminClient()],
});

export const { signIn, signUp, signOut, useSession } = authClient;
