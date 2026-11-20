import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient, ObjectId } from "mongodb";
import { admin } from "better-auth/plugins";

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const client = new MongoClient(requiredEnv("MONGODB_URL"));
const db = client.db("mentorlagbe");

export const auth = betterAuth({
  secret: requiredEnv("BETTER_AUTH_SECRET"),
  baseURL: requiredEnv("BETTER_AUTH_URL").split("#")[0].trim(),
  database: mongodbAdapter(db, { client }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: requiredEnv("GOOGLE_CLIENT_ID"),
      clientSecret: requiredEnv("GOOGLE_CLIENT_SECRET"),
    },
    github: {
      clientId: requiredEnv("GITHUB_CLIENT_ID"),
      clientSecret: requiredEnv("GITHUB_CLIENT_SECRET"),
    },
  },
  plugins: [admin({ defaultRole: "student", adminRoles: ["admin"] })],
});

export async function setAppUserRole(
  userId: string,
  role: "student" | "tutor",
) {
  if (!ObjectId.isValid(userId)) return false;
  const id = new ObjectId(userId);
  const result = await db
    .collection("user")
    .updateOne(
      { _id: id },
      { $set: { role }, $unset: { userType: "" } },
    );
  return result.matchedCount > 0;
}

export async function isTutorPro(userId: string) {
  if (!ObjectId.isValid(userId)) return false;

  await client.connect();
  const id = new ObjectId(userId);
  const user = await db.collection("user").findOne(
    { _id: id, role: "tutor" },
    { projection: { plan: 1, email: 1 } },
  );
  if (!user) return false;
  if (user.plan === "pro") return true;

  const paidPayment = await db.collection("payments").findOne({
    userRole: { $regex: /^tutor$/i },
    paymentStatus: "paid",
    $or: [
      { userId },
      ...(user.email
        ? [{ userEmail: user.email.trim() }]
        : []),
    ],
  }, { collation: { locale: "en", strength: 2 } });
  if (!paidPayment) return false;

  await db.collection("user").updateOne(
    { _id: id, role: "tutor" },
    { $set: { plan: "pro", updatedAt: paidPayment.paidAt || new Date() } },
  );

  return true;
}


