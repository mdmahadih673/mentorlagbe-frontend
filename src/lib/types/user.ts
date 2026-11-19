export type AccountRole = "student" | "tutor" | "admin";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AccountRole;
  image?: string;
  createdAt?: string;
  emailVerified: boolean;
}
