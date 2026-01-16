import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Resources",
  description: "Resources used to build BottomLine.",
};

export default function ResourcesPage() {
  return (
    <main className="mx-auto w-full max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-3 text-3xl font-bold text-white">Resources</h1>
      <p className="mb-8 text-brandSlate">
        Helpful summaries and guides for evaluating BottomLine ERP. Explore
        implementation, support, roadmap highlights, and concise one-pagers for
        each area of the product.
      </p>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded bl-panel bg-surface-header p-6">
          <h2 className="text-xl font-semibold text-white">
            Implementation Guide
          </h2>
          <p className="mt-3 text-brandSlate">
            A practical rollout focused on clean data, clear roles, and quick
            time-to-value.
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-brandSlate">
            <li>
              <strong>QuickStart</strong> – essentials configured, data import,
              core training.
            </li>
            <li>
              <strong>Standard</strong> – adds purchasing/sales flows and basic
              reporting.
            </li>
            <li>
              <strong>Full</strong> – warehouse + planning (MRP/MPS) with
              hand-offs and SOPs.
            </li>
            <li>
              <strong>Enterprise</strong> – advanced controls, integrations, and
              exec dashboards.
            </li>
          </ul>
        </div>

        <div className="rounded bl-panel bg-surface-header p-6">
          <h2 className="text-xl font-semibold text-white">Support Packages</h2>
          <p className="mt-3 text-brandSlate">
            Choose the assistance level that fits your team—scale up as needs
            grow.
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-brandSlate">
            <li>
              <strong>Essentials</strong> – email support; a set number of help
              hours per month.
            </li>
            <li>
              <strong>Growth</strong> – email + chat; added advisory and admin
              tasks.
            </li>
            <li>
              <strong>Pro</strong> – response SLAs; monthly optimization and
              release reviews.
            </li>
          </ul>
          <p className="mt-3 text-brandSlate">
            Ask for the current support catalog:{" "}
            <a href="/contact" className="underline">
              Contact BL Team
            </a>
            .
          </p>
        </div>

        <div className="rounded bl-panel bg-surface-header p-6">
          <h2 className="text-xl font-semibold text-white">
            Feature Roadmap (6–12 months)
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-brandSlate">
            <li>Advanced capacity planning &amp; shop-floor scheduling.</li>
            <li>Multi-entity accounting &amp; consolidations.</li>
            <li>CPQ-lite enhancements for quoting.</li>
            <li>Deeper costing &amp; landed-cost allocations.</li>
            <li>Forecasting &amp; anomaly detection.</li>
            <li>AppExchange packaging &amp; installer.</li>
          </ul>
        </div>

        <div className="rounded bl-panel bg-surface-header p-6">
          <h2 className="text-xl font-semibold text-white">
            Product One-Pagers
          </h2>
          <ul className="mt-3 space-y-3 text-brandSlate">
            <li>
              <span className="font-semibold text-white">Accounting</span> – GL,
              AR/AP, invoicing, bank rec, close controls.
            </li>
            <li>
              <span className="font-semibold text-white">
                Inventory &amp; WMS
              </span>{" "}
              – locations/bins, lots/serials, mobile operations.
            </li>
            <li>
              <span className="font-semibold text-white">Procurement</span> –{" "}
              vendors, POs, receiving, approvals, spend visibility.
            </li>
            <li>
              <span className="font-semibold text-white">MRP/MPS</span> – BOMs,
              work orders, demand/supply planning, visual scheduling.
            </li>
            <li>
              <span className="font-semibold text-white">
                Trade Management
              </span>{" "}
              – programs, rebates/commissions, accruals to GL.
            </li>
            <li>
              <span className="font-semibold text-white">Reporting</span> –
              dashboards with drill-downs across finance and ops.
            </li>
          </ul>
        </div>
      </section>

    </main>
  );
}
