"use server";

import { redirect } from "next/navigation";
import { setAdminSession, verifyAdminCredentials } from "@/lib/auth/admin";

export async function loginAction(_previousState: { error?: string } | undefined, formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  if (!verifyAdminCredentials(email, password)) {
    return { error: "Invalid admin credentials." };
  }

  await setAdminSession(email);
  redirect("/admin");
}
