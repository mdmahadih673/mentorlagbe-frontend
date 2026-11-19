import type {
  TuitionApplication,
  TuitionApplicationStatus,
  TuitionFormValues,
} from "@/lib/types/tuition";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

type CreateTuitionResponse = {
  success?: boolean;
  message?: string;
  result?: unknown;
};

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

export async function getTutorApplications(
  teacherId: string,
): Promise<TuitionApplication[]> {
  const response = await fetch(
    `${API_BASE_URL}/tutor/applications/${encodeURIComponent(teacherId)}`,
    { cache: "no-store" },
  );
  const result = (await response.json().catch(() => null)) as unknown;

  if (!response.ok) throw new Error("Failed to fetch student requests.");
  if (!Array.isArray(result)) {
    throw new Error(
      "The tutor applications API returned an unexpected response.",
    );
  }

  return result as TuitionApplication[];
}

export async function getStudentApplications(
  studentId: string,
): Promise<TuitionApplication[]> {
  const response = await fetch(
    `${API_BASE_URL}/student/applications/${encodeURIComponent(studentId)}`,
    { cache: "no-store" },
  );
  const result = (await response.json().catch(() => null)) as unknown;

  if (!response.ok) throw new Error("Failed to fetch your applications.");
  if (!Array.isArray(result)) {
    throw new Error(
      "The student applications API returned an unexpected response.",
    );
  }

  return result as TuitionApplication[];
}

export async function getAllUsers(): Promise<{ role?: string }[]> {
  const response = await fetch(`${API_BASE_URL}/users`, { cache: "no-store" });
  const result = (await response.json().catch(() => null)) as unknown;
  if (!response.ok || !Array.isArray(result)) {
    throw new Error("Could not load platform users.");
  }
  return result as { role?: string }[];
}

async function sendApplicationRequest(
  url: string,
  method: "PATCH" | "DELETE",
  teacherId: string,
  status?: TuitionApplicationStatus,
) {
  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ teacherId, ...(status ? { status } : {}) }),
  });
  const result = (await response.json().catch(() => null)) as {
    success?: boolean;
    message?: string;
  } | null;

  if (!response.ok || !result?.success) {
    throw new Error(result?.message || "Could not update this request.");
  }
}

export function updateTutorApplicationStatus(
  applicationId: string,
  teacherId: string,
  status: TuitionApplicationStatus,
) {
  return sendApplicationRequest(
    `${API_BASE_URL}/tutor/applications/${encodeURIComponent(applicationId)}/status`,
    "PATCH",
    teacherId,
    status,
  );
}

export function deleteTutorApplication(
  applicationId: string,
  teacherId: string,
) {
  return sendApplicationRequest(
    `${API_BASE_URL}/tutor/applications/${encodeURIComponent(applicationId)}`,
    "DELETE",
    teacherId,
  );
}

export async function createTuitionApplication(application: {
  tuitionId: string;
  studentId: string;
  studentName: string;
  studentEmail?: string;
}) {
  const response = await fetch(`${API_BASE_URL}/applications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(application),
  });
  const result = (await response.json().catch(() => null)) as {
    success?: boolean;
    message?: string;
  } | null;

  if (!response.ok || !result?.success) {
    throw new Error(result?.message || "Could not send tuition request.");
  }
}
