export default function SecurityControlsPage() {
  return (
    <main className="mx-auto w-full max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold text-white">App Security</h1>
        <p className="mt-3 max-w-3xl text-brandSlate">
          BottomLine builds on Salesforce security with purpose-built roles,
          approvals, and accounting discipline so every transaction stays
          traceable end to end.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl bl-panel bg-surface-header p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-white">
            Roles &amp; Permissions
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-brandSlate">
            <li>
              Predefined roles for accounting, procurement, sales, warehouse,
              and leadership teams.
            </li>
            <li>
              Least-privilege access aligned to objects, fields, and sensitive
              actions.
            </li>
            <li>
              Easy extensions to match org structure without complex rewrites.
            </li>
          </ul>
        </div>

        <div className="rounded-2xl bl-panel bg-surface-header p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-white">
            Auditability &amp; Approvals
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-brandSlate">
            <li>Every material change leaves a traceable audit trail.</li>
            <li>
              Adjustments preserve history through reversals, not overwrites.
            </li>
            <li>
              Approval workflows for purchasing, pricing, and period-close
              steps.
            </li>
          </ul>
        </div>

        <div className="rounded-2xl bl-panel bg-surface-header p-6 shadow-sm lg:col-span-3">
          <h2 className="text-xl font-semibold text-white">
            Financial Traceability (GL Linkage)
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-brandSlate">
            <li>
              Operational events post directly to the correct GL accounts.
            </li>
            <li>Drill through balances to journals and source documents.</li>
            <li>
              Month-end controls with bank recs, inventory valuation, and
              accruals.
            </li>
          </ul>
        </div>
      </section>

      <p className="mt-10 text-brandSlate">
        Have security or compliance questions?{" "}
        <a
          href="/contact"
          className="underline underline-offset-4 hover:text-white"
        >
          Contact our team
        </a>
        .
      </p>
    </main>
  );
}
