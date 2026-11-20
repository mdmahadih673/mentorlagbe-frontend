"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { createAdminUser } from "@/lib/api/admin/users";
import type { AccountRole } from "@/lib/types/user";

export function AdminCreateUserForm() {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isCreating) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    setIsCreating(true);

    try {
      await createAdminUser({
        name: String(formData.get("name") || "").trim(),
        email: String(formData.get("email") || "").trim(),
        password: String(formData.get("password") || ""),
        role: String(formData.get("role") || "student") as AccountRole,
      });
      form.reset();
      toast.add({
        title: "User created",
        description: "The new account can now sign in with its email and password.",
        type: "success",
      });
      router.refresh();
    } catch (error) {
      toast.add({
        title: "User creation failed",
        description: error instanceof Error ? error.message : "Please try again.",
        type: "error",
      });
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <section className="rounded-3xl border border-[#e6e9e1] bg-white p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-[#eaf0dc] text-[#648147]">
          <UserPlus size={19} />
        </span>
        <div>
          <h2 className="font-semibold text-[#203b31]">Create user</h2>
          <p className="mt-0.5 text-xs text-[#89928b]">Add a student, tutor, or admin account.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1.2fr_1fr_150px_auto]">
        <Input name="name" required maxLength={100} placeholder="Full name" aria-label="Full name" />
        <Input name="email" type="email" required placeholder="Email address" aria-label="Email address" />
        <Input name="password" type="password" minLength={8} required placeholder="Temporary password" aria-label="Temporary password" />
        <select
          name="role"
          defaultValue="student"
          aria-label="Account role"
          className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="student">Student</option>
          <option value="tutor">Tutor</option>
          <option value="admin">Admin</option>
        </select>
        <Button type="submit" disabled={isCreating} className="bg-[#1d3b31] text-white hover:bg-[#315b45]">
          <UserPlus size={15} /> {isCreating ? "Creating…" : "Create user"}
        </Button>
      </form>
    </section>
  );
}
