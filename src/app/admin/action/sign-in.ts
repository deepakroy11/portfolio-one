"use server";
import { signIn as authSignIn } from "@/auth";

export async function signIn(provider: string) {
  try {
    await authSignIn(provider, { redirectTo: "/dashboard" });
  } catch (error) {
    console.error("Sign in error:", error);
    throw error;
  }
}
