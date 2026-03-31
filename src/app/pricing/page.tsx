import Link from "next/link";

const pricingTiers = [
  { name: "Up to 5 users", price: "$18,000 / year" },
  { name: "Up to 15 users", price: "$24,000 / year" },
  { name: "Up to 30 users", price: "$32,000 / year" },
  { name: "Up to 60 users", price: "$50,000 / year" },
  { name: "61+ users", price: "$70,000 / year" },
];

const implementationOptions = [
  {
    name: "QuickStart",
    description:
      "Uses BottomLine defaults for accounting and warehouse setups, limited import and training, 2 sandbox deployments.",
    estimate: "Estimated* implementation: $20,000 to $40,000",
  },
  {
    name: "Standard Launch",
    description:
      "Review/update configurations, 3+ sandbox deployments, online training.",
    estimate: "Estimated* implementation: $30,000 to $50,000",
  },
  {
    name: "Full Suite Setup",
    description:
      "Advanced setup/config, full governance, 3+ sandbox deployments.",
    estimate: "Estimated* implementation: $60,000+",
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
      <section>
        <h2 className="text-2xl font-semibold text-white">Licensing</h2>
        <p className="mt-2 max-w-3xl text-brandSlate">
          Every installation of the BottomLine app includes all of the modules
          described on the Features page.
        </p>
        <p className="mt-2 max-w-3xl text-brandSlate">
          Annual licensing is based on the number of licensed users in your
          organization.
        </p>
      </section>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
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
      <section className="mt-12">
        <p className="text-xs text-brandSlate">
          * Prices shown are annual per org. Final configuration and implementation
          are scoped during discovery.
        </p>
      </section>
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-white">Support</h2>
        <p className="mt-2 max-w-3xl text-brandSlate">
          Each organization using BottomLine ERP will have different needs when
          it comes to ongoing support, from regular training and troubleshooting
          to customizations and workflow optimization. During implementation, we
          will work with you to determine the optimal number of support hours
          you will need to ensure your team is set up for success.
        </p>
      </section>
    </main>
  );
}
