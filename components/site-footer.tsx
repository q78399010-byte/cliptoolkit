import Link from "next/link";

const footerLinks = [
  { href: "/faq", label: "FAQ" },
  { href: "/privacy-policy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/dmca", label: "DMCA" }
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/8 py-10 text-sm text-white/56">
      <div className="shell flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p>Creator Toolkit helps creators save public videos for permitted personal use.</p>
        <nav className="flex flex-wrap gap-4">
          {footerLinks.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
