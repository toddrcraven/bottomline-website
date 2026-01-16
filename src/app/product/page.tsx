"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { VideoModal } from "@/components/VideoModal";

const INLINE_SRC =
  "https://www.youtube.com/embed/zoOP5s9ONjg?rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=http://localhost:3000";

export default function ProductPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasEmbedError, setHasEmbedError] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);
  const restRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove(
              "opacity-0",
              "translate-y-8",
              "scale-90",
              "blur-[2px]"
            );
            entry.target.classList.add(
              "opacity-100",
              "translate-y-0",
              "scale-100",
              "blur-0"
            );
          } else {
            entry.target.classList.add(
              "opacity-0",
              "translate-y-8",
              "scale-90",
              "blur-[2px]"
            );
            entry.target.classList.remove(
              "opacity-100",
              "translate-y-0",
              "scale-100",
              "blur-0"
            );
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
    );

    elements.forEach((element) => {
      element.classList.add(
        "opacity-0",
        "translate-y-8",
        "scale-90",
        "blur-[2px]",
        "transition-all",
        "duration-900",
        "ease-[cubic-bezier(0.22,1,0.36,1)]",
        "will-change-transform"
      );
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return;
    }

    const heroEl = heroRef.current;
    const restEl = restRef.current;

    if (!heroEl || !restEl) {
      return;
    }

    const getHeaderOffset = () => {
      const header = document.querySelector("header");
      const height = header instanceof HTMLElement ? header.offsetHeight : 0;
      return height || 64;
    };

    let touchStartY = 0;
    let isAnimating = false;
    const snapDurationMs = 600;

    const smoothTo = (top: number) => {
      if (isAnimating) {
        return;
      }
      isAnimating = true;
      window.scrollTo({ top, behavior: "smooth" });
      window.setTimeout(() => {
        isAnimating = false;
      }, snapDurationMs);
    };

    const heroBottom = () =>
      heroEl.getBoundingClientRect().bottom + window.scrollY;
    const restTop = () =>
      restEl.getBoundingClientRect().top + window.scrollY;

    const onWheel = (event: WheelEvent) => {
      if (isAnimating) {
        return;
      }

      const y = window.scrollY;
      const headerOffset = getHeaderOffset();
      const heroEnd = heroBottom();
      const restStart = restTop();
      const inHero = y + 2 < heroEnd;
      const nearRestTop = y <= restStart + 120 && y >= restStart - 120;

      if (event.deltaY > 0 && inHero) {
        event.preventDefault();
        smoothTo(restStart - headerOffset);
      } else if (event.deltaY < 0 && nearRestTop && y > 0) {
        event.preventDefault();
        smoothTo(0);
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? 0;
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (isAnimating) {
        return;
      }

      const touchEndY = event.changedTouches[0]?.clientY ?? 0;
      const deltaY = touchStartY - touchEndY;
      const y = window.scrollY;
      const headerOffset = getHeaderOffset();
      const heroEnd = heroBottom();
      const restStart = restTop();
      const inHero = y + 2 < heroEnd;
      const nearRestTop = y <= restStart + 120 && y >= restStart - 120;

      if (deltaY > 10 && inHero) {
        smoothTo(restStart - headerOffset);
      } else if (deltaY < -10 && nearRestTop) {
        smoothTo(0);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (isAnimating) {
        return;
      }

      const y = window.scrollY;
      const headerOffset = getHeaderOffset();
      const heroEnd = heroBottom();
      const restStart = restTop();
      const inHero = y + 2 < heroEnd;
      const nearRestTop = y <= restStart + 120 && y >= restStart - 120;
      const downKeys = [" ", "PageDown", "ArrowDown"];
      const upKeys = ["PageUp", "ArrowUp"];

      if (downKeys.includes(event.key) && inHero) {
        event.preventDefault();
        smoothTo(restStart - headerOffset);
      } else if (upKeys.includes(event.key) && nearRestTop) {
        event.preventDefault();
        smoothTo(0);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const moduleCards = [
    {
      title: "Accounting",
      blurb:
        "GL, AR/AP, invoicing, bank reconciliation, and audit-friendly controls.",
    },
    {
      title: "Sales & Order Management",
      blurb:
        "Opportunity to quote to order with pricing rules and fulfillment visibility.",
    },
    {
      title: "Procurement & Purchasing",
      blurb: "Vendors, POs, receipts, approvals, and smart reordering.",
    },
    {
      title: "Inventory & WMS",
      blurb:
        "Multi-location/bin, lots/serials, barcode workflows, and real-time COGS.",
    },
    {
      title: "MRP/MPS",
      blurb:
        "BOMs, work orders, demand/supply planning, and visual scheduling.",
    },
    {
      title: "Contract Management",
      blurb:
        "Approvals, obligations, renewals, and milestones tied to delivery.",
    },
    {
      title: "Loan Management",
      blurb: "Amortization schedules, repayments, interest recognition, alerts.",
    },
    {
      title: "Trade Management",
      blurb: "Programs, rebates, chargebacks, and accruals tied to the GL.",
    },
    {
      title: "Reporting & Dashboards",
      blurb: "Operational and financial KPIs with drill-downs and export.",
    },
  ];

  const flowSteps = [
    { step: "Opportunity", sub: "Price and margin insight" },
    { step: "Quote", sub: "Terms and discounts" },
    { step: "Order", sub: "Reserve stock and plan" },
    { step: "Pick/Ship", sub: "Barcode and WMS" },
    { step: "Invoice", sub: "AR and trade accruals" },
    { step: "GL Close", sub: "Clean month-end" },
  ];

  const screenshotSlots = [
    "Accounting dashboard",
    "Inventory with bins & lots",
    "MRP work orders",
    "Procurement approvals",
    "Loan schedules",
    "Trade programs & accruals",
  ];

  return (
    <main className="mx-auto w-full max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
      <section
        ref={heroRef}
        className="relative grid min-h-[calc(100vh-6rem)] items-center gap-6 lg:grid-cols-8 lg:items-stretch"
      >
        <div className="lg:col-span-4 lg:flex lg:flex-col lg:h-full lg:pb-[2px]">
          <h2 className="text-2xl font-semibold text-white">
            BottomLine ERP is positioned as
          </h2>
          <p className="mt-3 text-brandSlate">
            A modular, cloud-native ERP built natively on Salesforce — designed
            specifically for small to medium sized businesses who need
            integrated business tools but do not want an overly complex
            enterprise system.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/features"
              className="rounded border border-brandGreen px-4 py-2 text-sm font-semibold text-brandGreen transition-transform duration-100 hover:bg-[rgba(34,197,94,0.18)] active:scale-[1.04]"
            >
              Learn More
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center whitespace-nowrap rounded bg-brandBlue px-4 py-2 text-sm font-semibold text-white transition-transform duration-100 hover:shadow-sm active:scale-[1.04] relative isolate z-10"
            >
              <span className="relative z-10 text-white">Contact BL Team</span>
            </Link>
          </div>
          <div className="mt-10 sm:mt-12 lg:mt-12">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded border border-brandGreen px-6 py-3 text-sm font-semibold text-brandGreen transition-transform duration-100 hover:bg-[rgba(34,197,94,0.18)] active:scale-[1.04]"
            >
              <span>View our Pricing</span>
              <svg
                aria-hidden="true"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
        <div className="lg:col-span-4">
          <div className="relative">
            <div className="aspect-video w-full overflow-hidden rounded">
              <iframe
                title="BottomLine ERP Overview"
                src={INLINE_SRC}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                referrerPolicy="origin-when-cross-origin"
                className="h-full w-full"
                onError={() => setHasEmbedError(true)}
              />
            </div>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="absolute bottom-3 right-3 rounded bg-black/70 px-3 py-1 text-xs font-semibold text-white"
            >
              Play video
            </button>
          </div>
          {hasEmbedError ? (
            <p className="mt-2 text-xs text-brandSlate">
              Having trouble?{" "}
              <a
                className="underline"
                href="https://www.youtube.com/watch?v=zoOP5s9ONjg"
                target="_blank"
                rel="noreferrer"
              >
                Watch on YouTube
              </a>
            </p>
          ) : null}
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-24 left-1/2 -translate-x-1/2 text-center"
        >
          <div className="mb-3 text-sm font-medium text-white/90 md:text-base">
            Scroll for more information
          </div>
          <div className="mx-auto h-12 w-12 animate-bounce">
            <svg viewBox="0 0 48 48" className="h-12 w-12">
              <circle
                cx="24"
                cy="24"
                r="22"
                className="stroke-white/90"
                strokeWidth="2.5"
                fill="none"
              />
              <path
                d="M16 22l8 8 8-8"
                className="stroke-white"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </section>
      <div ref={restRef} aria-hidden="true" />

      <section className="mt-16 space-y-10">
        <div data-reveal className="rounded bl-panel bg-surface-header p-6">
          <h2 className="text-xl font-semibold text-white">
            Key modules at a glance
          </h2>
          <p className="mt-2 text-brandSlate">
            Start with core, then add what you need across finance, operations,
            and planning.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {moduleCards.map((module) => (
              <div
                key={module.title}
                className="rounded bl-panel bg-surface-header/50 p-4"
              >
                <h3 className="text-lg font-semibold text-white">
                  {module.title}
                </h3>
                <p className="mt-2 text-brandSlate">{module.blurb}</p>
                <div className="mt-3">
                  <Link
                    href="/features"
                    className="text-sm text-brandSlate underline underline-offset-4 hover:text-white"
                  >
                    View details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div data-reveal className="rounded bl-panel bg-surface-header p-6">
          <h2 className="text-xl font-semibold text-white">Why BottomLine</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-brandSlate">
            <li>
              <strong>Salesforce-native</strong> with modular add-as-you-grow
              flexibility.
            </li>
            <li>
              <strong>Native accounting</strong> that eliminates fragile
              third-party syncs.
            </li>
            <li>
              <strong>True quote-to-cash</strong> across sales, inventory, and
              finance.
            </li>
            <li>
              <strong>SMB-friendly UX</strong> with lighter MRP and streamlined
              workflows.
            </li>
            <li>
              <strong>Mobile warehouse &amp; barcoding</strong> built for floor
              ops.
            </li>
            <li>
              <strong>Tight GL linkage</strong> for inventory, production, and
              trade postings.
            </li>
            <li>
              <strong>Low-friction deployment</strong> with opinionated defaults
              that still configure.
            </li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/features"
              aria-label="Explore Features"
              className="inline-flex items-center justify-center rounded bg-brandBlue px-4 py-2 text-sm font-semibold !text-white transition-transform duration-100 hover:shadow-sm active:scale-[1.04] pointer-events-auto relative z-10"
            >
              Explore Features
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded border border-brandGreen px-4 py-2 text-sm font-semibold text-brandGreen transition-transform duration-100 hover:bg-[rgba(34,197,94,0.18)] active:scale-[1.04]"
            >
              View Pricing
            </Link>
          </div>
        </div>

        <div data-reveal className="rounded bl-panel bg-surface-header p-6">
          <h2 className="text-xl font-semibold text-white">
            Flow: Quote to cash
          </h2>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {flowSteps.map((step, index) => (
              <div key={step.step} className="flex items-center gap-3">
                <div className="rounded bl-panel px-4 py-3 text-center">
                  <div className="text-sm font-semibold text-white">
                    {step.step}
                  </div>
                  <div className="mt-1 text-xs text-brandSlate">{step.sub}</div>
                </div>
                {index < flowSteps.length - 1 ? (
                  <span className="text-brandSlate">→</span>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div data-reveal className="rounded bl-panel bg-surface-header p-6">
          <h2 className="text-xl font-semibold text-white">
            Screenshots (placeholders)
          </h2>
          <p className="mt-2 text-brandSlate">
            We&apos;ll drop in product screens here. For now, these mark the key
            views.
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {screenshotSlots.map((slot) => (
              <div
                key={slot}
                className="aspect-video rounded border-2 border-dashed border-border/60 bg-surface-header/40 p-3"
              >
                <div className="flex h-full w-full items-center justify-center text-sm text-brandSlate">
                  {slot}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div data-reveal className="rounded bl-panel bg-surface-header p-6">
          <h2 className="text-xl font-semibold text-white">
            Implementation &amp; support
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-brandSlate">
            <li>
              <strong>QuickStart</strong> — focused launch for core modules and
              data import.
            </li>
            <li>
              <strong>Standard Launch</strong> — broader module set with
              workflows and training.
            </li>
            <li>
              <strong>Full Suite Setup</strong> — advanced planning, WMS, and
              governance.
            </li>
          </ul>
          <div className="mt-4">
            <Link
              href="/contact"
              aria-label="Contact BL Team"
              className="inline-flex items-center justify-center rounded bg-brandBlue px-4 py-2 text-sm font-semibold !text-white transition-transform duration-100 hover:shadow-sm active:scale-[1.04] pointer-events-auto relative z-10"
            >
              Contact BL Team
            </Link>
          </div>
        </div>

        <div data-reveal className="rounded bl-panel bg-surface-header p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-brandSlate">
              Transparent tiers fit SMB budgets and scale as you add modules.
            </p>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded border border-brandGreen px-4 py-2 text-sm font-semibold text-brandGreen transition-transform duration-100 hover:bg-[rgba(34,197,94,0.18)] active:scale-[1.04]"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
      <VideoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
