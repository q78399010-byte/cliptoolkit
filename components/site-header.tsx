import Link from "next/link";

const navItems = [
  { href: "/tiktok-downloader", label: "TikTok" },
  { href: "/instagram-reels-downloader", label: "Instagram" },
  { href: "/blog", label: "Blog" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-[#080a0f]/82 backdrop-blur-xl">
      <div className="shell flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-white text-sm font-black text-ink">
            CT
          </span>
          <span>Creator Toolkit</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-white/70 sm:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
