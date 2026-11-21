import type { ReactNode } from "react";
import { requireRole } from "@/lib/api/core/server";

export const instant = false;

export default async function TutorLayout({ children }: { children: ReactNode }) {
  await requireRole("tutor");
  return children;
}
