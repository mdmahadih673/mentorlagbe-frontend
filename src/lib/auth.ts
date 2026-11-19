import { betterAuth } from "better-auth";
import { getOAuthState } from "better-auth/api";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";
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
  plugins:[admin()],
  user: {
    additionalFields: {
      userType: {
        type: "string",
        required: false,
        defaultValue: "student",
        input: true,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const oauthState = await getOAuthState<{ userType?: unknown }>();
          const selectedRole = oauthState?.userType;
          const submittedType = (user as typeof user & { userType?: unknown }).userType;
          const userType =
            selectedRole === "tutor" || selectedRole === "student"
              ? selectedRole
              : submittedType === "tutor"
                ? "tutor"
                : "student";

          return { data: { ...user, userType } };
        },
      },
    },
  },
});
