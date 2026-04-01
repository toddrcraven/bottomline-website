"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";

const navLinks = [
  { label: "Product", href: "/product" },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "About Us", href: "/about-bl" },
  { label: "Contact", href: "/contact" },
];

const bannerMessages = [
  "***  BottomLine ERP Coming Soon!!!  ***",
  "***  Stay Tuned for Updates on Availability!  ***",
];

export function SiteHeader() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname?.startsWith(href));

  return (
    <header className="site-header sticky top-0 z-50 border-b border-borderSoft/80 bg-[#F1F5F9] backdrop-blur">
      <div className="header-marquee border-b border-borderSoft/80">
        <div className="header-marquee__track" aria-label="Announcement banner">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="header-marquee__content"
              aria-hidden={copy === 1}
            >
              {bannerMessages.map((message) => (
                <span key={`${copy}-${message}`} className="header-marquee__item">
                  {message}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
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
                  "group relative isolate z-10 inline-flex items-center justify-center whitespace-nowrap rounded bg-brandBlue px-4 py-2 text-sm font-semibold text-[color:var(--header-banner-bg)] transition-transform duration-100 hover:shadow-sm active:scale-[1.04]",
                  "outline-none focus-visible:ring-2 focus-visible:ring-brandGreen/50 focus-visible:ring-offset-0",
                  active
                    ? [
                        "text-[color:var(--header-banner-bg)]",
                        "after:pointer-events-none after:absolute after:left-1/2 after:bottom-[-4px] after:h-[6px] after:w-[85%] after:-translate-x-1/2 after:rounded-full after:z-0",
                        "after:bg-brandGreen/70 after:blur-md after:opacity-100",
                        "shadow-[0_8px_24px_-12px_rgba(34,197,94,0.58)]",
                      ].join(" ")
                    : "after:content-[''] after:absolute after:left-1/2 after:bottom-[-8px] after:h-[0px] after:w-[0px] after:opacity-0",
                ].join(" ")}
              >
                <span className="relative z-10 text-[color:var(--header-banner-bg)]">
                  {link.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="border-t border-borderSoft/80 bg-[#F1F5F9] px-4 py-3 md:hidden">
        <div className="mx-auto flex w-full max-w-screen-2xl items-center gap-2 overflow-x-auto text-sm font-semibold text-[color:var(--header-banner-bg)]">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={[
                  "group relative isolate z-10 inline-flex items-center justify-center whitespace-nowrap rounded bg-brandBlue px-4 py-2 text-sm font-semibold text-[color:var(--header-banner-bg)] transition-transform duration-100 hover:shadow-sm active:scale-[1.04]",
                  "outline-none focus-visible:ring-2 focus-visible:ring-brandGreen/50 focus-visible:ring-offset-0",
                  active
                    ? [
                        "text-[color:var(--header-banner-bg)]",
                        "after:pointer-events-none after:absolute after:left-1/2 after:bottom-[-4px] after:h-[6px] after:w-[85%] after:-translate-x-1/2 after:rounded-full after:z-0",
                        "after:bg-brandGreen/70 after:blur-md after:opacity-100",
                        "shadow-[0_8px_24px_-12px_rgba(34,197,94,0.58)]",
                      ].join(" ")
                    : "after:content-[''] after:absolute after:left-1/2 after:bottom-[-8px] after:h-[0px] after:w-[0px] after:opacity-0",
                ].join(" ")}
              >
                <span className="relative z-10 text-[color:var(--header-banner-bg)]">
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
