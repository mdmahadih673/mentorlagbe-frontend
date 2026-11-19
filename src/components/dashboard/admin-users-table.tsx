"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ShieldCheck, Trash2, UserRound, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import type { AccountRole, AdminUser } from "@/lib/types/user";

const roleOptions: AccountRole[] = ["student", "tutor", "admin"];

function initials(name: string) {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "U"
  );
}

function formatDate(value?: string) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "—"
    : new Intl.DateTimeFormat("en-BD", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(date);
}

export function AdminUsersTable({
  users,
  currentUserId,
}: {
  users: AdminUser[];
  currentUserId: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [roleDrafts, setRoleDrafts] = useState<Record<string, AccountRole>>({});
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);

  const filteredUsers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return users;

    return users.filter((user) =>
      [user.name, user.email, user.role].some((value) =>
        value.toLowerCase().includes(normalizedQuery),
      ),
    );
  }, [query, users]);

  function handleRoleChange(user: AdminUser) {
    const nextRole = roleDrafts[user.id] || user.role;
    toast.add({
      title: "Role update is not connected",
      description: `Selected role: ${nextRole}. Add the update API here when it is ready.`,
    });
  }

  async function handleDeleteUser(user: AdminUser) {
    if (user.id === currentUserId) return;
    if (!window.confirm(`Delete ${user.name}'s account? This cannot be undone.`)) {
      return;
    }

    setDeletingUserId(user.id);
    try {
      const response = await fetch(
        `/api/admin/users/${encodeURIComponent(user.id)}`,
        { method: "DELETE" },
      );
      const result = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!response.ok) {
        throw new Error(result?.message || "Could not delete this user.");
      }

      toast.add({
        title: "User deleted",
        description: `${user.name}'s account was removed.`,
        type: "success",
      });
      router.refresh();
    } catch (error) {
      toast.add({
        title: "Delete failed",
        description:
          error instanceof Error ? error.message : "Please try again.",
        type: "error",
      });
    } finally {
      setDeletingUserId(null);
    }
  }

  return (
    <section className="overflow-hidden rounded-3xl border border-[#e6e9e1] bg-white">
      <div className="flex flex-col justify-between gap-4 border-b border-[#edf0e9] p-5 sm:flex-row sm:items-center sm:px-6">
        <div>
          <h2 className="font-semibold text-[#203b31]">All users</h2>
          <p className="mt-1 text-xs text-[#89928b]">
            Showing {filteredUsers.length} of {users.length} accounts
          </p>
        </div>
        <label className="flex h-10 w-full items-center gap-2 rounded-xl border border-[#e1e6de] bg-[#fdfdfb] px-3 sm:max-w-xs">
          <Search size={16} className="shrink-0 text-[#91a087]" />
          <Input
            type="search"
            aria-label="Search users"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search name, email, or role"
            className="h-8 border-0 bg-transparent p-0 text-sm shadow-none focus-visible:ring-0"
          />
        </label>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="px-6 py-14 text-center">
          <UsersRound className="mx-auto text-[#9aaa8c]" size={28} />
          <h3 className="mt-3 font-semibold text-[#354a40]">
            {users.length ? "No users match your search" : "No users found"}
          </h3>
          <p className="mt-1 text-sm text-[#89928b]">
            {users.length
              ? "Try another name, email, or role."
              : "User accounts will appear here."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] border-collapse text-left">
            <thead className="bg-[#f7f8f4] text-[11px] uppercase tracking-[.12em] text-[#78847c]">
              <tr>
                <th className="px-5 py-3.5 font-semibold sm:px-6">User</th>
                <th className="px-5 py-3.5 font-semibold">Joined</th>
                <th className="px-5 py-3.5 font-semibold">Email status</th>
                <th className="px-5 py-3.5 font-semibold">Role</th>
            <th className="px-5 py-3.5 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#edf0e9]">
              {filteredUsers.map((user) => {
                const selectedRole = roleDrafts[user.id] || user.role;
                const hasRoleChange = selectedRole !== user.role;

                return (
                  <tr key={user.id} className="text-sm text-[#526159]">
                    <td className="px-5 py-4 sm:px-6">
                      <div className="flex min-w-0 items-center gap-3">
                        <span
                          className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#eaf0dc] bg-cover bg-center text-xs font-bold text-[#496844]"
                          style={
                            user.image
                              ? { backgroundImage: `url("${user.image}")` }
                              : undefined
                          }
                          aria-hidden="true"
                        >
                          {!user.image && initials(user.name)}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-[#203b31]">
                            {user.name}
                          </p>
                          <p className="mt-0.5 truncate text-xs text-[#89928b]">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-xs text-[#68766e]">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${user.emailVerified ? "bg-emerald-50 text-emerald-800" : "bg-[#f3f4f1] text-[#77827b]"}`}
                      >
                        {user.emailVerified ? (
                          <ShieldCheck size={13} />
                        ) : (
                          <UserRound size={13} />
                        )}
                        {user.emailVerified ? "Verified" : "Unverified"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <label
                        className="sr-only"
                        htmlFor={`user-role-${user.id}`}
                      >
                        Role for {user.name}
                      </label>
                      <select
                        id={`user-role-${user.id}`}
                        value={selectedRole}
                        onChange={(event) =>
                          setRoleDrafts((current) => ({
                            ...current,
                            [user.id]: event.target.value as AccountRole,
                          }))
                        }
                        className="h-9 min-w-28 rounded-lg border border-[#dfe5dc] bg-white px-2.5 text-xs font-semibold capitalize text-[#354a40] outline-none focus:border-[#91aa78] focus:ring-2 focus:ring-[#91aa78]/15"
                      >
                        {roleOptions.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant={hasRoleChange ? "default" : "outline"}
                          disabled={!hasRoleChange}
                          onClick={() => handleRoleChange(user)}
                          className={`h-9 rounded-lg px-3 text-xs font-semibold ${hasRoleChange ? "bg-[#1d3b31] text-white hover:bg-[#315b45]" : ""}`}
                        >
                          {hasRoleChange ? "Apply role" : "No changes"}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          aria-label={`Delete ${user.name}`}
                          title={
                            user.id === currentUserId
                              ? "You cannot delete your own account here"
                              : "Delete user"
                          }
                          disabled={
                            user.id === currentUserId ||
                            deletingUserId !== null
                          }
                          onClick={() => void handleDeleteUser(user)}
                          className="h-9 gap-1.5 rounded-lg border-red-200 px-3 text-xs font-semibold text-red-700 hover:bg-red-50 hover:text-red-800"
                        >
                          <Trash2 size={14} />
                          {deletingUserId === user.id ? "Deleting…" : "Delete"}
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <p className="border-t border-[#edf0e9] px-5 py-3 text-xs text-[#89928b] sm:px-6">
        Role selection is a UI preview only; changes are not saved yet.
      </p>
    </section>
  );
}
