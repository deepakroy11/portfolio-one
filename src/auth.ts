import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || "dummy";
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || "dummy";
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "dummy";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "dummy";
const AUTH_SECRET = process.env.AUTH_SECRET || "dummy-secret-for-build";

// Only validate at runtime when actually needed, not during build
if (typeof window === "undefined" && process.env.NODE_ENV === "production" && process.env.SKIP_BUILD_VALIDATION !== "true") {
  // Skip validation during build process
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  basePath: "/api/auth",
  providers: [
    GitHub({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "read:user user:email",
        },
      },
    }),
    Google({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "openid email profile",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt", // Changed from database to JWT for better compatibility with remote databases
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Always redirect to dashboard after successful sign in
      if (url === baseUrl) return `${baseUrl}/admin/dashboard`;
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return `${baseUrl}/admin/dashboard`;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  debug: true,
  trustHost: true,
});
