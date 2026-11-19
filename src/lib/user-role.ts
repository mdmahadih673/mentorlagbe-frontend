export type AccountRole = "student" | "tutor" | "admin";

type UserWithRole = { role?: string | null };

export function getAccountRole(user: UserWithRole): AccountRole {
  if (user.role === "admin" || user.role === "tutor" || user.role === "student") {
    return user.role;
  }
  return "student";
}
