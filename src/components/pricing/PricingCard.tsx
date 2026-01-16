import Link from "next/link";
import { ctaPrimary, outlineButton } from "../common/buttonStyles";

type PricingCardProps = {
  name: string;
  price: string;
  tagline: string;
  features: Array<{ label: string; value: string }>;
  cta: string;
  highlight?: boolean;
};

export function PricingCard({
  name,
  price,
  tagline,
  features,
  cta,
  highlight,
}: PricingCardProps) {
  return (
    <div
      className={`flex flex-col rounded-2xl bl-panel bg-surface p-6 shadow-sm transition ${
        highlight ? "shadow-md ring-1 ring-brandPrimary/40" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-brandSlate">
            {name}
          </p>
          <p className="mt-2 text-3xl font-bold text-white">{price}</p>
          <p className="mt-1 text-sm text-brandSlate">{tagline}</p>
        </div>
        {highlight ? (
          <span className="rounded-full bg-brandBlue/20 px-3 py-1 text-xs font-semibold text-white">
            Most popular
          </span>
        ) : null}
      </div>

      <ul className="mt-6 space-y-3 text-sm text-brandSlate">
        {features.map((feature) => (
          <li key={feature.label} className="flex items-start gap-3">
            <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-brandSlate/25 text-xs font-bold text-white">
              ✓
            </span>
            <div>
              <p className="font-semibold text-white">{feature.label}</p>
              <p className="text-xs text-brandSlate">{feature.value}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex gap-3">
        <Link
          href="/contact"
          className={`${ctaPrimary} px-4 py-2`}
        >
          {cta}
        </Link>
        <Link
          href="/contact"
          className={`${outlineButton} px-4 py-2`}
        >
          Learn more
        </Link>
      </div>
    </div>
  );
}
