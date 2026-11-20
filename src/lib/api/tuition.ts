import type { TuitionFormValues } from "@/lib/types/tuition";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

type CreateTuitionResponse = {
  success?: boolean;
  message?: string;
  result?: unknown;
};

export type TuitionSearchParams = {
  q?: string;
  subject?: string[];
  mode?: string[];
  class?: string[];
  location?: string;
  sort?: "newest" | "fee-low" | "fee-high";
  page?: number;
  pageSize?: number;
};

export type TuitionSearchResult = {
  success: boolean;
  data: TuitionFormValues[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export async function searchTuitions(filters: TuitionSearchParams = {},): Promise<TuitionSearchResult> {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value)) value.forEach((item) => params.append(key, item));
    else if (value !== undefined && value !== "") params.set(key, String(value));
  });

  const query = params.toString();
  const response = await fetch(
    `${API_BASE_URL}/tuitions/search${query ? `?${query}` : ""}`,
    { cache: "no-store" },
  );
  const result = (await response.json().catch(() => null)) as
    | (TuitionSearchResult & { message?: string })
    | null;

  if (!response.ok || !result?.success) {
    throw new Error(result?.message || "Could not search tuition listings.");
  }

  return result;
}

export async function createTuition(tuitionData: TuitionFormValues) {
  const response = await fetch(`${API_BASE_URL}/tuition`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tuitionData),
  });
  const result = (await response
    .json()
    .catch(() => null)) as CreateTuitionResponse | null;

  if (!response.ok || !result?.success) {
    throw new Error(
      result?.message || "Failed to post tuition. Please try again.",
    );
  }

  return result;
}

export async function getAllTuitions(): Promise<TuitionFormValues[]> {
  const response = await fetch(`${API_BASE_URL}/tuitions`, {
    cache: "no-store",
  });
  const result = (await response.json().catch(() => null)) as unknown;
  if (!response.ok) throw new Error("Could not load tuition listings.");
  if (!Array.isArray(result))
    throw new Error("The tuition API returned an unexpected response.");
  return result as TuitionFormValues[];
}

export async function getTuitionById(id: string): Promise<TuitionFormValues> {
  const response = await fetch(
    `${API_BASE_URL}/tuitions/${encodeURIComponent(id)}`,
    { cache: "no-store" },
  );
  const result = (await response.json().catch(() => null)) as
    (TuitionFormValues & { message?: string }) | null;

  if (!response.ok || !result) {
    throw new Error(result?.message || "Could not load this tuition.");
  }

  return result;
}

export async function getMyTuitions(
  teacherId: string,
): Promise<TuitionFormValues[]> {
  const response = await fetch(
    `${API_BASE_URL}/my-tuitions/${encodeURIComponent(teacherId)}`,
    { cache: "no-store" },
  );
  const result = (await response.json().catch(() => null)) as unknown;

  if (!response.ok) throw new Error("Failed to fetch your tuitions.");
  if (!Array.isArray(result)) {
    throw new Error("The my-tuitions API returned an unexpected response.");
  }

  return result as TuitionFormValues[];
}

async function sendTuitionMutation(
  id: string,
  teacherId: string,
  method: "PATCH" | "DELETE",
  tuition?: TuitionFormValues,
) {
  const response = await fetch(
    `${API_BASE_URL}/tuitions/${encodeURIComponent(id)}`,
    {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...tuition, teacherId }),
    },
  );
  const result = (await response.json().catch(() => null)) as {
    success?: boolean;
    message?: string;
  } | null;

  if (!response.ok || !result?.success) {
    throw new Error(result?.message || "Could not update this tuition.");
  }
}

export function updateTuition(
  id: string,
  teacherId: string,
  tuition: TuitionFormValues,
) {
  return sendTuitionMutation(id, teacherId, "PATCH", tuition);
}

export function deleteTuition(id: string, teacherId: string) {
  return sendTuitionMutation(id, teacherId, "DELETE");
}

export type AdminTuitionStatus = "pending" | "approved" | "rejected";

async function sendAdminTuitionMutation(
  id: string,
  options: { method: "PATCH"; status: AdminTuitionStatus } | { method: "DELETE" },
) {
  const response = await fetch(
    `/api/admin/tuitions/${encodeURIComponent(id)}`,
    {
      method: options.method,
      headers: options.method === "PATCH" ? { "Content-Type": "application/json" } : undefined,
      body: options.method === "PATCH" ? JSON.stringify({ status: options.status }) : undefined,
    },
  );
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
