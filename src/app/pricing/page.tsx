import PlanCard from "@/components/PlanCard";

const plans = [
  {
    name: "Starter",
    price: "$495 / mo",
    tagline:
      "Core SMB value: inventory, document management, basic accounting, sales, and contracts.",
    features: [
      "Inventory & Document Management",
      "Basic Accounting (GL, AR/AP)",
      "Basic Sales",
      "Contract Management",
      "Support: Email only",
      "Implementation: Guided Setup",
    ],
  },
  {
    name: "Growth",
    price: "$995 / mo",
    tagline:
      "Adds procurement and planning to scale operations without extra complexity.",
    features: [
      "Everything in Starter",
      "Procurement & Purchasing",
      "Advanced Sales (incl. Trade basics)",
      "Basic MRP/MPS",
      "Support: Email + Chat",
    ],
    recommended: true,
  },
  {
    name: "Pro",
    price: "$1,995 / mo",
    tagline:
      "Full suite for manufacturers with advanced finance, warehouse, and planning.",
    features: [
      "Everything in Growth",
      "Warehouse Management (WMS)",
      "Full MRP/MPS",
      "Loan Management",
      "Advanced Accounting & Compliance tools",
      "Support: Chat + SLA",
      "Implementation: Guided + Workshop",
    ],
  },
];

export default function PricingPage() {
  return (
    <main className="mx-auto w-full max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold text-white">Pricing</h1>
        <p className="mt-3 max-w-3xl text-brandSlate">
          Transparent, modular pricing designed for SMBs. Choose a plan and
          contact our team to tailor the modules you need.
        </p>
      </header>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <PlanCard key={plan.name} {...plan} />
        ))}
      </div>
      <p className="mt-8 text-xs text-brandSlate">
        Prices shown are monthly per org. Final configuration and implementation
        are scoped during discovery.
      </p>
    </main>
  );
}
