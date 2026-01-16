import Link from "next/link";
import { ctaPrimary, outlineButton } from "./buttonStyles";

type StickyCtaBarProps = {
  primaryLabel: string;
  secondaryLabel: string;
  href: string;
};

export function StickyCtaBar({
  primaryLabel,
  secondaryLabel,
  href,
}: StickyCtaBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-borderSoft/80 bg-brandCharcoal/95 px-4 py-3 shadow-[0_-8px_20px_var(--shadow-cta)] backdrop-blur sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Wider max width + responsive padding for laptop-friendly, readable layout. */}
        <p className="text-sm font-semibold text-white">
          See BottomLine ERP in action
        </p>
        <div className="flex gap-3">
          <Link href={href} className={`${outlineButton} px-4 py-2`}>
            {secondaryLabel}
          </Link>
          <Link
            href={href}
            className={`${ctaPrimary} px-4 py-2`}
          >
            {primaryLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
