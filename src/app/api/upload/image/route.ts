import { NextResponse } from "next/server";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

type ImgBBResponse = {
  success?: boolean;
  data?: { url?: string };
  error?: { message?: string };
};

export async function POST(request: Request) {
  const apiKey = process.env.IMAGEBB_API;
  if (!apiKey) {
    return NextResponse.json({ message: "Image upload is not configured." }, { status: 500 });
  }

  let file: FormDataEntryValue | null;
  try {
    const formData = await request.formData();
    file = formData.get("file");
  } catch {
    return NextResponse.json({ message: "Invalid upload request." }, { status: 400 });
  }

  if (!(file instanceof File)) {
    return NextResponse.json({ message: "Choose an image to upload." }, { status: 400 });
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ message: "Use a JPG, PNG, WEBP, or GIF image." }, { status: 415 });
  }
  if (file.size === 0 || file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ message: "The image must be smaller than 5 MB." }, { status: 413 });
  }

  try {
    const body = new FormData();
    body.append("image", file, file.name);
    const endpoint = new URL("https://api.imgbb.com/1/upload");
    endpoint.searchParams.set("key", apiKey);

    const uploadResponse = await fetch(endpoint, {
      method: "POST",
      body,
      signal: AbortSignal.timeout(20_000),
    });
    const result = (await uploadResponse.json().catch(() => null)) as ImgBBResponse | null;

    if (!uploadResponse.ok || !result?.success || !result.data?.url) {
      return NextResponse.json(
        { message: result?.error?.message || "Image upload failed. Please try another image." },
        { status: 502 },
      );
    }

    return NextResponse.json({ url: result.data.url });
  } catch {
    return NextResponse.json({ message: "Could not reach the image service. Please try again." }, { status: 502 });
  }
}
