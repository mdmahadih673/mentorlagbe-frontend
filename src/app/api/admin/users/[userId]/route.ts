import { MongoClient, ObjectId } from "mongodb";
import { NextResponse, type NextRequest } from "next/server";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { getUserType } from "@/lib/user-role";

const mongoUrl = process.env.MONGODB_URL;
if (!mongoUrl) throw new Error("Missing required environment variable: MONGODB_URL");

const client = new MongoClient(mongoUrl);
const database = client.db("mentorlagbe");

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ message: "Sign in required." }, { status: 401 });
  }
  if (getUserType(session.user) !== "admin") {
    return NextResponse.json({ message: "Admin access required." }, { status: 403 });
  }

  const { userId } = await params;
  if (!ObjectId.isValid(userId)) {
    return NextResponse.json({ message: "Invalid user ID." }, { status: 400 });
  }
  if (userId === session.user.id) {
    return NextResponse.json(
      { message: "You cannot delete your own account here." },
      { status: 400 },
    );
  }

  try {
    const objectId = new ObjectId(userId);
    const user = await database.collection("user").findOne({ _id: objectId });

    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    const tuitions = database.collection("tuitions");
    const ownedTuitions = await tuitions
      .find({ teacherId: userId }, { projection: { _id: 1 } })
      .toArray();
    const tuitionIds = ownedTuitions.map((tuition) => String(tuition._id));

    await Promise.all([
      database.collection("session").deleteMany({ userId: objectId }),
      database.collection("account").deleteMany({ userId: objectId }),
      database.collection("applications").deleteMany({
        $or: [
          { studentId: userId },
          { teacherId: userId },
          ...(tuitionIds.length ? [{ tuitionId: { $in: tuitionIds } }] : []),
        ],
      }),
      tuitions.deleteMany({ teacherId: userId }),
      database.collection("user").deleteOne({ _id: user._id }),
    ]);

    return NextResponse.json({ success: true, message: "User deleted." });
  } catch (error) {
    console.error("Failed to delete admin-managed user", error);
    return NextResponse.json(
      { message: "Could not delete this user." },
      { status: 500 },
    );
  }
}
