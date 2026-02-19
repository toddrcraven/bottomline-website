"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";

const navLinks = [
  { label: "Product", href: "/product" },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "App Security", href: "/securities" },
  { label: "Resources", href: "/resources" },
  { label: "About BL", href: "/about-bl" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname?.startsWith(href));

  return (
    <header className="site-header sticky top-0 z-50 border-b border-borderSoft/80 bg-gradient-to-r from-[color:var(--slate-500)]/85 to-[color:var(--slate-700)]/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Wider max width + responsive padding for laptop-friendly, readable layout. */}
        <Link
          href="/"
          className="flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brandBlue"
          aria-label="BottomLine ERP home"
        >
          <Logo className="h-12 w-auto sm:h-14 lg:h-16" priority />
        </Link>
        <nav className="hidden items-center gap-2 sm:gap-3 md:flex">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={[
                  "group relative z-10 inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition",
                  "bg-white/10 hover:bg-white/15",
                  "text-brandBlue/90 hover:text-white",
                  "outline-none focus-visible:ring-2 focus-visible:ring-brandGreen/50 focus-visible:ring-offset-0",
                  active
                    ? [
                        "text-white",
                        "after:pointer-events-none after:absolute after:left-1/2 after:bottom-[-4px] after:h-[6px] after:w-[85%] after:-translate-x-1/2 after:rounded-full after:z-0",
                        "after:bg-brandGreen/70 after:blur-md after:opacity-100",
                        "shadow-[0_8px_24px_-12px_rgba(34,197,94,0.58)]",
                      ].join(" ")
                    : "after:content-[''] after:absolute after:left-1/2 after:bottom-[-8px] after:h-[0px] after:w-[0px] after:opacity-0",
                ].join(" ")}
              >
                <span className="relative">{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="border-t border-borderSoft/80 bg-[color:var(--slate-600)]/85 px-4 py-3 md:hidden">
        <div className="mx-auto flex w-full max-w-screen-2xl items-center gap-2 overflow-x-auto text-sm font-semibold text-white">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={[
                  "group relative z-10 inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition whitespace-nowrap",
                  "bg-white/10 hover:bg-white/15",
                  "text-brandBlue/90 hover:text-white",
                  "outline-none focus-visible:ring-2 focus-visible:ring-brandGreen/50 focus-visible:ring-offset-0",
                  active
                    ? [
                        "text-white",
                        "after:pointer-events-none after:absolute after:left-1/2 after:bottom-[-4px] after:h-[6px] after:w-[85%] after:-translate-x-1/2 after:rounded-full after:z-0",
                        "after:bg-brandGreen/70 after:blur-md after:opacity-100",
                        "shadow-[0_8px_24px_-12px_rgba(34,197,94,0.58)]",
                      ].join(" ")
                    : "after:content-[''] after:absolute after:left-1/2 after:bottom-[-8px] after:h-[0px] after:w-[0px] after:opacity-0",
                ].join(" ")}
              >
                <span className="relative">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
