import Link from "next/link";
import { logoutAction } from "@/app/admin/(protected)/actions";
import { requireAdminSession } from "@/lib/auth/admin";

const navItems = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/downloads", label: "Downloads" },
  { href: "/admin/seo-pages", label: "SEO Pages" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/settings", label: "Settings" }
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdminSession();

  return (
    <main className="min-h-screen bg-[#080a0f] text-white">
      <aside className="border-b border-white/8 bg-[#0d1017]">
        <div className="shell flex min-h-16 flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link href="/admin" className="font-semibold">
              Creator Toolkit Admin
            </Link>
            <p className="mt-1 text-xs text-white/48">{session.email}</p>
          </div>
          <nav className="flex flex-wrap gap-2 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md border border-white/10 px-3 py-2 text-white/70 transition hover:border-mint/40 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <form action={logoutAction}>
              <button className="rounded-md border border-white/10 px-3 py-2 text-white/70 transition hover:border-ember/40 hover:text-white">
                Logout
              </button>
            </form>
          </nav>
        </div>
      </aside>
      <div className="shell py-8">{children}</div>
    </main>
  );
}
