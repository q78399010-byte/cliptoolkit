"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction } from "@/app/admin/login/actions";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, undefined);

  return (
    <main className="min-h-screen bg-[#080a0f] px-4 py-10 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-md flex-col justify-center">
        <Link href="/" className="mb-8 text-sm text-white/56 transition hover:text-white">
          Creator Toolkit
        </Link>
        <section className="surface rounded-lg p-6">
          <p className="text-sm font-semibold uppercase text-mint">Admin Login</p>
          <h1 className="mt-3 text-3xl font-semibold">Operations console</h1>
          <form action={formAction} className="mt-8 grid gap-4">
            <label className="grid gap-2 text-sm font-medium">
              Email
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                className="focus-ring min-h-12 rounded-md border border-white/10 bg-white px-3 text-ink"
                placeholder="admin email"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              Password
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="focus-ring min-h-12 rounded-md border border-white/10 bg-white px-3 text-ink"
                placeholder="admin password"
              />
            </label>
            {state?.error ? <p className="text-sm text-ember">{state.error}</p> : null}
            <button
              type="submit"
              disabled={pending}
              className="focus-ring min-h-12 rounded-md bg-mint px-4 font-bold text-ink transition hover:bg-[#75f4c6] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? "Signing in..." : "Login"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
