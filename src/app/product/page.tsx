"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { VideoModal } from "@/components/VideoModal";

const INLINE_SRC =
  "https://www.youtube.com/embed/zoOP5s9ONjg?rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=http://localhost:3000";

export default function ProductPage() {
  const router = useRouter();
  const returnKey = "moduleDetailReturn";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasEmbedError, setHasEmbedError] = useState(false);
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const restRef = useRef<HTMLDivElement | null>(null);
  const navTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (navTimeoutRef.current !== null) {
        window.clearTimeout(navTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const raw =
      typeof window !== "undefined"
        ? window.sessionStorage.getItem(returnKey)
        : null;
    if (!raw) {
      return;
    }
    try {
      const data = JSON.parse(raw) as {
        path?: string;
        search?: string;
        scrollY?: number;
      };
      if (
        data.path === window.location.pathname &&
        data.search === window.location.search &&
        typeof data.scrollY === "number"
      ) {
        window.requestAnimationFrame(() => {
          window.scrollTo({ top: data.scrollY, behavior: "auto" });
        });
        window.sessionStorage.removeItem(returnKey);
      }
    } catch {
      window.sessionStorage.removeItem(returnKey);
    }
  }, []);

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
      id: "accounting",
      title: "Accounting",
      blurb: "Bank reconciliation, journal entries, chart of accounts, and budgeting.",
      image: "/brand/App%20Images/1.a.jpg",
    },
    {
      id: "fixed-assets",
      title: "Fixed Assets",
      blurb: "Fixed asset management, acquisition, depreciation, and disposition.",
      image: "/brand/App%20Images/2.a.jpg",
    },
    {
      id: "sales-trade-management",
      title: "Sales & Trade Management",
      blurb: "Sales orders, order fulfillment, and trade management.",
      image: "/brand/App%20Images/3.a.jpg",
    },
    {
      id: "procurement",
      title: "Procurement",
      blurb: "Purchase orders, receipts, and returns.",
      image: "/brand/App%20Images/4.a.jpg",
    },
    {
      id: "warehouse",
      title: "Warehouse",
      blurb:
        "Warehouse management, lot tracking, transfers, picks, put-aways, inventory counts, and adjustments.",
      image: "/brand/App%20Images/5.a.jpg",
    },
    {
      id: "planning-production",
      title: "Planning & Production",
      blurb:
        "Forecasts, production plans, master production schedules, MRP, order generation, and work orders.",
      image: "/brand/App%20Images/6.a.jpg",
    },
    {
      id: "financial-hub",
      title: "Financial Hub",
      blurb: "Financial statements, check printing, and period closing.",
      image: "/brand/App%20Images/7.a.jpg",
    },
    {
      id: "bottomline-administration",
      title: "BottomLine Administration",
      blurb:
        "Accounting setups, warehouse setups, document templates, implementation support, and administrative settings across accounting, purchasing, sales, inventory, and planning.",
      image: "/brand/App%20Images/8.a.jpg",
    },
  ];

  const handleModuleNavigate = (
    event: MouseEvent<HTMLAnchorElement>,
    moduleId: string
  ) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    setActiveModuleId(moduleId);
    const href = `/features?module=${moduleId}`;
    try {
      window.sessionStorage.setItem(
        returnKey,
        JSON.stringify({
          path: window.location.pathname,
          search: window.location.search,
          scrollY: window.scrollY,
        })
      );
    } catch {}

    if (navTimeoutRef.current !== null) {
      window.clearTimeout(navTimeoutRef.current);
    }

    navTimeoutRef.current = window.setTimeout(() => {
      router.push(href);
    }, 350);
  };

  return (
    <main className="mx-auto w-full max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
      <section
        ref={heroRef}
        className="relative grid min-h-[calc(100vh-6rem)] items-center gap-6 lg:grid-cols-8 lg:items-stretch"
      >
        <div className="lg:col-span-4 lg:flex lg:flex-col lg:h-full lg:pb-[2px]">
          <h2 className="text-center text-2xl font-semibold text-white">
            BottomLine ERP
          </h2>
          <p className="mt-3 text-center text-brandSlate">
            A modular, cloud-native ERP built natively in Salesforce that is
            designed specifically for small- to medium-sized businesses needing
            a fully-integrated system that is simple to use, yet able to handle
            all of the complexity of a growing manufacturing business.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/features"
              className="inline-flex items-center justify-center whitespace-nowrap rounded bg-brandBlue px-4 py-2 text-sm font-semibold text-[color:var(--header-banner-bg)] transition-transform duration-100 hover:shadow-sm active:scale-[1.04] relative isolate z-10"
            >
              <span className="relative z-10 text-[color:var(--header-banner-bg)]">
                Learn More
              </span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center whitespace-nowrap rounded bg-brandBlue px-4 py-2 text-sm font-semibold text-[color:var(--header-banner-bg)] transition-transform duration-100 hover:shadow-sm active:scale-[1.04] relative isolate z-10"
            >
              <span className="relative z-10 text-[color:var(--header-banner-bg)]">
                Contact Our Team
              </span>
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded bg-brandBlue px-4 py-2 text-sm font-semibold text-[color:var(--header-banner-bg)] transition-transform duration-100 hover:shadow-sm active:scale-[1.04] relative isolate z-10"
            >
              <span className="relative z-10 text-[color:var(--header-banner-bg)]">
                View Our Pricing
              </span>
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
              className="absolute bottom-3 right-3 rounded bg-black/70 px-3 py-1 text-xs font-semibold text-[color:var(--header-banner-bg)]"
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
            BottomLine includes all of the modules you need to set up and run
            your manufacturing business, from accounting and inventory to
            planning and operations. Reporting and dashboards are available
            within each module and are not a standalone module.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
            {moduleCards.map((module, index) => (
              <div
                key={module.id}
                className={[
                  "flex h-full flex-col rounded bl-panel bg-surface-header/50 p-4",
                  "lg:col-span-2",
                  index === moduleCards.length - 2 ? "lg:col-start-2" : "",
                  index === moduleCards.length - 1 ? "lg:col-start-4" : "",
                ].join(" ")}
              >
                <Link
                  href={`/features?module=${module.id}`}
                  onClick={(event) => handleModuleNavigate(event, module.id)}
                  className="block rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brandBlue"
                  aria-label={`View details for ${module.title}`}
                >
                  <div className="flex aspect-[16/10] items-center justify-center overflow-hidden rounded-md border border-white/10 bg-linear-to-b from-white/12 to-surface-header/35 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_8px_18px_rgba(15,23,42,0.2)]">
                    <img
                      src={module.image}
                      alt={`${module.title} module screenshot`}
                      className="h-full w-full rounded-sm object-contain object-center"
                      loading="lazy"
                    />
                  </div>
                </Link>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  {module.title}
                </h3>
                <p className="mt-2 text-brandSlate">{module.blurb}</p>
                <div className="mt-3">
                  <Link
                    href={`/features?module=${module.id}`}
                    onClick={(event) => handleModuleNavigate(event, module.id)}
                    className={[
                      "text-sm text-brandSlate underline underline-offset-4 hover:text-white transition-opacity duration-300",
                      activeModuleId === module.id ? "opacity-70" : "opacity-100",
                    ].join(" ")}
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
              <strong>Salesforce-native</strong> with modules to support most
              major functions in your company
            </li>
            <li>
              <strong>Native accounting</strong> that eliminates fragile
              third-party syncs or double-entry
            </li>
            <li>
              <strong>SMB-friendly user experience</strong> with fully functional automated
              MRP and workflows built to streamline your process
            </li>
            <li>
              <strong>Mobile warehouse &amp; barcoding</strong> right inside the
              native Salesforce mobile app
            </li>
            <li>
              <strong>Tight GL linkage</strong> for procurement, inventory,
              production, order fulfillment, and trade programs
            </li>
            <li>
              <strong>Low-friction deployment</strong> with configurable
              defaults and custom chart of accounts
            </li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/features"
              aria-label="Explore Features"
              className="inline-flex items-center justify-center rounded bg-brandBlue px-4 py-2 text-sm font-semibold !text-[color:var(--header-banner-bg)] transition-transform duration-100 hover:shadow-sm active:scale-[1.04] pointer-events-auto relative z-10"
            >
              Explore Features
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded bg-brandBlue px-4 py-2 text-sm font-semibold !text-[color:var(--header-banner-bg)] transition-transform duration-100 hover:shadow-sm active:scale-[1.04] pointer-events-auto relative z-10"
            >
              View Pricing
            </Link>
          </div>
        </div>

        <div data-reveal className="rounded bl-panel bg-surface-header p-6">
          <h2 className="text-xl font-semibold text-white">
            Implementation &amp; support
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-brandSlate">
            <li>
              <strong>QuickStart</strong> — use BottomLine defaults for
              accounting and warehouse setups, limited data import and
              training, 2 sandbox deployments
            </li>
            <li>
              <strong>Standard launch</strong> — review and update all setups
              and configurations, 3+ sandbox deployments, online training for
              all functions
            </li>
            <li>
              <strong>Full suite setup</strong> — advance setup and
              configuration, full project governance, 3+ sandbox deployments
            </li>
          </ul>
          <div className="mt-4">
            <Link
              href="/contact"
              aria-label="Contact Our Team"
              className="inline-flex items-center justify-center rounded bg-brandBlue px-4 py-2 text-sm font-semibold !text-[color:var(--header-banner-bg)] transition-transform duration-100 hover:shadow-sm active:scale-[1.04] pointer-events-auto relative z-10"
            >
              Contact Our Team
            </Link>
          </div>
        </div>

      </section>
      <VideoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
