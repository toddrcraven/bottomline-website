import PlanCard from "@/components/PlanCard";

const plans = [
  {
    name: "BottomLine Suite",
    price: "$1,995 / mo",
    tagline:
      "Full suite for manufacturers with advanced finance, warehouse, and planning.",
    features: [
      "Warehouse Management (WMS)",
      "Full MRP/MPS",
      "Loan Management",
      "Advanced Accounting & Compliance tools",
      "Support: Chat + SLA",
      "Implementation: Guided + Workshop",
    ],
  },
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
      <div className="grid gap-6 sm:grid-cols-1">
        {plans.map((plan) => (
          <PlanCard key={plan.name} {...plan} />
        ))}
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
        Prices shown are monthly per org. Final configuration and implementation
        are scoped during discovery.
      </p>
    </main>
  );
}
