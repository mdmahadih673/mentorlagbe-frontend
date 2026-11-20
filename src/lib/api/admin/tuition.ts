export type AdminTuitionStatus = "pending" | "approved" | "rejected";

async function sendAdminTuitionMutation(
  id: string,
  options: { method: "PATCH"; status: AdminTuitionStatus } | { method: "DELETE" },
) {
  const response = await fetch(`/api/admin/tuitions/${encodeURIComponent(id)}`, {
    method: options.method,
    headers:
      options.method === "PATCH"
        ? { "Content-Type": "application/json" }
        : undefined,
    body:
      options.method === "PATCH"
        ? JSON.stringify({ status: options.status })
        : undefined,
  });
  const result = (await response.json().catch(() => null)) as {
    success?: boolean;
    message?: string;
  } | null;

  if (!response.ok || !result?.success) {
    throw new Error(result?.message || "Could not update this tuition.");
  }
}

export function updateAdminTuitionStatus(
  id: string,
  status: AdminTuitionStatus,
) {
  return sendAdminTuitionMutation(id, { method: "PATCH", status });
}

export function deleteAdminTuition(id: string) {
  return sendAdminTuitionMutation(id, { method: "DELETE" });
}
