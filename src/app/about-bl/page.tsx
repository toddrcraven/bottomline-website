export default function AboutBLPage() {
  return (
    <main className="mx-auto w-full max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-3 text-3xl font-bold text-white">About BottomLine</h1>
      <p className="mb-8 text-brandSlate">
        <strong>BottomLine ERP</strong> is a Salesforce-native ERP crafted by{" "}
        <strong>Avachatech</strong> to give small and mid-sized product
        businesses disciplined operations and finance on a platform they
        already trust.
      </p>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded bl-panel bg-surface-header p-6">
          <h2 className="text-xl font-semibold text-white">Our mission</h2>
          <p className="mt-3 text-brandSlate">
            Bring the essential parts of ERP—accounting, inventory, purchasing,
            production planning, and reporting—together in a modular,
            approachable product that grows with your team.
          </p>
        </div>

        <div className="rounded bl-panel bg-surface-header p-6">
          <h2 className="text-xl font-semibold text-white">
            Why Salesforce-native
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-brandSlate">
            <li>
              <strong>One platform, fewer integrations.</strong> CRM and ERP
              data live together—no brittle syncs.
            </li>
            <li>
              <strong>Security &amp; scale you know.</strong> Roles, permissions,
              and compliance ride on Salesforce.
            </li>
            <li>
              <strong>Faster change.</strong> Clicks over code for workflows,
              fields, and approvals.
            </li>
          </ul>
        </div>

        <div className="rounded bl-panel bg-surface-header p-6">
          <h2 className="text-xl font-semibold text-white">
            The team behind BottomLine
          </h2>
          <p className="mt-3 text-brandSlate">
            <strong>Avachatech</strong> is a Salesforce consulting and product
            studio founded by <strong>Todd Craven</strong>. Todd has spent years
            building on Salesforce—implementing complex orgs, shipping packaged
            apps, and helping operators connect day-to-day work to clean
            financials. BottomLine is the product of that experience: simple
            where it should be, rigorous where it must be.
          </p>
        </div>

        <div className="rounded bl-panel bg-surface-header p-6">
          <h2 className="text-xl font-semibold text-white">
            What we’ve built
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-brandSlate">
            <li>
              <strong>Modular ERP</strong>: start with core, add procurement,
              MRP/MPS, warehouse, loans, and trade as you grow.
            </li>
            <li>
              <strong>Native accounting</strong>: GL, AR/AP, invoicing, and close
              controls without third-party accounting syncs.
            </li>
            <li>
              <strong>Quote-to-cash</strong>: sales, inventory, production, and
              finance in one flow.
            </li>
            <li>
              <strong>Operational clarity</strong>: dashboards and drill-downs
              across finance and ops.
            </li>
          </ul>
        </div>

        <div className="rounded bl-panel bg-surface-header p-6 md:col-span-2">
          <h2 className="text-xl font-semibold text-white">How we work</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-brandSlate">
            <li>
              <strong>Opinionated defaults</strong> to shorten time-to-value.
            </li>
            <li>
              <strong>Transparent pricing</strong> and implementation paths.
            </li>
            <li>
              <strong>Customer-led roadmap</strong>—we prioritize what removes
              real work for operators.
            </li>
          </ul>
        </div>
      </section>

      <p className="mt-8 text-brandSlate">
        Curious how BottomLine could fit your workflow?{" "}
        <a href="/features" className="underline">
          Explore Features
        </a>
        ,{" "}
        <a href="/pricing" className="underline">
          see Pricing
        </a>
        , or{" "}
        <a href="/contact" className="underline">
          Contact BL Team
        </a>
        .
      </p>
    </main>
  );
}
