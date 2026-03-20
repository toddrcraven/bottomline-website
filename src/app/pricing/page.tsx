import Link from "next/link";

const pricingTiers = [
  { name: "Up to 5 users", price: "$24,000 / year" },
  { name: "Up to 15 users", price: "$36,000 / year" },
  { name: "Up to 30 users", price: "$54,000 / year" },
  { name: "Up to 60 users", price: "$72,000 / year" },
  { name: "61+ users", price: "$90,000+ / year" },
];

const implementationOptions = [
  {
    name: "QuickStart",
    description:
      "Uses BottomLine defaults for accounting and warehouse setups, limited import and training, 1 sandbox deployment.",
    estimate: "Estimated implementation: $____ to $____",
  },
  {
    name: "Standard Launch",
    description:
      "Review/update configurations, 2 sandbox deployments, online training.",
    estimate: "Estimated implementation: $____ to $____",
  },
  {
    name: "Full Suite Setup",
    description:
      "Advanced setup/config, full governance, 2 sandbox deployments.",
    estimate: "Estimated implementation: $____ to $____",
  },
];

export default function PricingPage() {
  return (
    <main className="mx-auto w-full max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold text-white">Pricing</h1>
        <p className="mt-3 max-w-3xl text-brandSlate">
          One package. One price. Simple. BottomLine delivers the full suite so
          you can configure what you need without tier hopping.
        </p>
      </header>
      <p className="mb-6 text-sm text-brandSlate">
        BottomLine Suite includes finance, warehouse, planning, and core
        manufacturing operations.
      </p>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {pricingTiers.map((tier) => (
          <div
            key={tier.name}
            className="flex h-full flex-col rounded-2xl bl-panel bg-surface p-4 shadow-sm"
            aria-label={`${tier.name} pricing`}
          >
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-white">{tier.name}</h3>
              <p className="mt-2 text-xl font-semibold text-white">
                {tier.price}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-start">
        <Link
          href="/contact"
          className="inline-flex items-center justify-center whitespace-nowrap rounded bg-brandBlue px-4 py-2 text-sm font-semibold text-[color:var(--header-banner-bg)] transition-transform duration-100 hover:shadow-sm active:scale-[1.04] relative isolate z-10"
        >
          <span className="relative z-10 text-[color:var(--header-banner-bg)]">
            Contact Our Team
          </span>
        </Link>
      </div>
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-white">Implementation</h2>
        <p className="mt-2 max-w-3xl text-brandSlate">
          Choose the deployment level that matches your timeline and internal
          resources.
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {implementationOptions.map((option) => (
            <div
              key={option.name}
              className="rounded-2xl bl-panel bg-surface p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-white">
                {option.name}
              </h3>
              <p className="mt-2 text-sm text-brandSlate">
                {option.description}
              </p>
              <p className="mt-4 text-sm font-semibold text-white">
                {option.estimate}
              </p>
            </div>
          ))}
        </div>
      </section>
      <p className="mt-8 text-xs text-brandSlate">
        Prices shown are annual per org. Final configuration and implementation
        are scoped during discovery.
      </p>
    </main>
  );
}
