import type {
  TuitionApplication,
  TuitionApplicationStatus,
} from "@/lib/types/tuition";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

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
