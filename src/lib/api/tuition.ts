import type { TuitionFormValues } from "@/lib/types/tuition";
import { API_BASE_URL } from "@/lib/api/config";

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

