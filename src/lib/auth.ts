import { betterAuth } from "better-auth";
import { getOAuthState } from "better-auth/api";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";

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
  user: {
    additionalFields: {
      role: {
        type: ["student", "tutor"],
        required: false,
        defaultValue: "student",
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const oauthState = await getOAuthState<{ role?: unknown }>();
          const selectedRole = oauthState?.role;

          if (selectedRole === "student" || selectedRole === "tutor") {
            return { data: { ...user, role: selectedRole } };
          }
        },
      },
    },
  },
});
