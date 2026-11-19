export type UserType = "student" | "tutor" | "admin";

type UserWithType = { role?: string | null; userType?: string | null };

export function getUserType(user: UserWithType): UserType {
  if (user.role === "admin") return "admin";
  if (user.userType === "admin") return "admin";
  if (user.userType === "tutor" || user.userType === "student") return user.userType;
  // Keep existing accounts working after moving the app role out of Better Auth's reserved field.
  if (user.role === "tutor" || user.role === "student") return user.role;
  return "student";
}
