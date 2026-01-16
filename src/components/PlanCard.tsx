import Link from "next/link";

type PlanCardProps = {
  name: string;
  price: string;
  tagline: string;
  features: string[];
  recommended?: boolean;
};

export default function PlanCard({
  name,
  price,
  tagline,
  features,
  recommended,
}: PlanCardProps) {
  return (
    <div
      className={`flex h-full flex-col rounded-2xl bl-panel bg-surface p-6 shadow-sm ${
        recommended ? "ring-1 ring-brandBlue/40" : ""
      }`}
      aria-label={`${name} plan`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-xl font-semibold text-white">{name}</h3>
        <span className="text-lg font-semibold text-white">{price}</span>
      </div>
      {recommended ? (
        <span className="mb-3 inline-flex self-start rounded-full bg-brandBlue/20 px-3 py-1 text-xs font-semibold text-white">
          Recommended
        </span>
      ) : null}
      <p className="mb-4 text-sm text-brandSlate">{tagline}</p>
      <ul className="mb-6 space-y-2 text-sm text-brandSlate">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <span aria-hidden="true" className="text-white">
              ✓
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Link
        href="/contact"
        className="mt-auto inline-flex w-full items-center justify-center rounded border border-brandGreen px-4 py-2 text-sm font-semibold text-brandGreen transition-transform duration-100 hover:bg-[rgba(34,197,94,0.18)] active:scale-[1.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brandBlue"
        aria-label={`Contact BL about the ${name} plan`}
      >
        {`Contact BL about ${name}`}
      </Link>
    </div>
  );
}
