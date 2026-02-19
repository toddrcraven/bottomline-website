import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer border-t border-borderSoft/80 bg-brandCharcoal shadow-[0_-1px_0_rgba(255,255,255,0.05)_inset] backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6 px-4 py-12 text-sm sm:px-6 lg:px-8">
        {/* Wider max width + responsive padding for laptop-friendly, readable layout. */}
        <div className="space-y-1 opacity-100">
          <p className="text-base font-semibold text-brandBlue opacity-100">
            BottomLine ERP
          </p>
          <p className="text-sm text-brandBlue opacity-100 tracking-wide md:text-base">
            BottomLine ERP — Salesforce-native ERP for manufacturing companies who
            need disciplined ops and finance.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-brandSlate md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded bg-brandBlue px-4 py-2 text-sm font-semibold !text-white transition-transform duration-100 hover:shadow-sm active:scale-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue focus-visible:ring-offset-2 focus-visible:ring-offset-backgroundBase"
            >
              Request Demo
            </Link>
            <Link
              href="/features"
              className="inline-flex items-center justify-center rounded bg-brandBlue px-4 py-2 text-sm font-semibold !text-white transition-transform duration-100 hover:shadow-sm active:scale-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue focus-visible:ring-offset-2 focus-visible:ring-offset-backgroundBase"
            >
              Explore Features
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded bg-brandBlue px-4 py-2 text-sm font-semibold !text-white transition-transform duration-100 hover:shadow-sm active:scale-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue focus-visible:ring-offset-2 focus-visible:ring-offset-backgroundBase"
            >
              View Pricing
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-4 md:justify-end">
            <Link
              href="/privacy"
              className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue focus-visible:ring-offset-2 focus-visible:ring-offset-backgroundBase"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue focus-visible:ring-offset-2 focus-visible:ring-offset-backgroundBase"
            >
              Terms
            </Link>
            <Link
              href="/contact"
              className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue focus-visible:ring-offset-2 focus-visible:ring-offset-backgroundBase"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
