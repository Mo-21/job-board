import { User } from "@prisma/client";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string | null;
      accountComplete: boolean;
      role: "RECRUITER" | "JOB_SEEKER";
    };
  }
}

declare module "next-auth/jwt" {
  type JWT = Session.user;
}
