export default function AboutBLPage() {
  return (
    <main className="mx-auto w-full max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-3 text-3xl font-bold text-white">About BottomLine</h1>
      <p className="mb-8 text-brandSlate">
        <strong>BottomLine ERP</strong> is a Salesforce-native ERP crafted to
        give small and mid-sized manufacturers the right balance between
        control and flexibility.
      </p>

      <section className="mb-6 rounded bl-panel bg-surface-header p-6">
        <h2 className="text-xl font-semibold text-white">Our vision</h2>
        <p className="mt-3 text-brandSlate">
          BottomLine is built on the belief that ERPs don&apos;t need to be
          complex to be powerful. It aims to replace fragmented systems and
          manual workarounds with a single source of truth that is both
          intuitive for users and precise in execution. In doing so, it enables
          businesses to operate with discipline, transparency, and confidence
          at every stage of growth.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded bl-panel bg-surface-header p-6">
          <h2 className="text-xl font-semibold text-white">How we work</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-brandSlate">
            <li>
              <strong>Opinionated defaults</strong> to shorten time-to-value.
            </li>
            <li>
              <strong>Transparent pricing</strong> and implementation paths.
            </li>
            <li>
              <strong>Customer-led roadmap</strong>, we prioritize what removes
              real work for operators.
            </li>
          </ul>
        </div>

        <div className="rounded bl-panel bg-surface-header p-6">
          <h2 className="text-xl font-semibold text-white">
            Why Salesforce-native
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-brandSlate">
            <li>
              <strong>One platform. Zero fragmentation.</strong> CRM and ERP
              operate on the same data model, eliminating brittle integrations,
              sync failures, and reconciliation headaches.
            </li>
            <li>
              <strong>Enterprise-grade security and scale.</strong> Leverage
              Salesforce&apos;s proven infrastructure for roles, permissions,
              auditability, and compliance without rebuilding it yourself.
            </li>
            <li>
              <strong>Adapt at the speed of your business.</strong> Configure
              workflows, fields, and approvals with clicks, not code, so your
              system evolves as fast as your operations do.
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-6 rounded bl-panel bg-surface-header p-6">
        <h2 className="text-xl font-semibold text-white">
          <strong>Who’s Behind BottomLine</strong>
        </h2>
        <div className="mt-3 space-y-4 text-brandSlate">
          <p>
            BottomLine was founded by an operator with firsthand experience
            navigating the limitations of traditional ERP systems as a small
            business.
          </p>
          <p>
            Early in his career, he served as a supply chain manager for a
            medical equipment manufacturing startup, where he led the
            implementation of the company&apos;s first MRP system. Operating
            under tight budget constraints, the organization selected a
            low-cost solution that required extensive customization. The result
            was a system that was technically functional but operationally
            inefficient, with users relying heavily on custom add-ons rather
            than the system itself. This experience established a lasting
            perspective on ERP: systems must be both robust and genuinely
            usable to deliver value.
          </p>
          <p>
            He later transitioned to the public sector, where he worked on the
            design and implementation of complex systems supporting affordable
            housing programs, tax credit finance, and property management
            operations. In 2019, he founded a consulting firm focused on these
            domains, helping organizations manage regulatory and operational
            complexity through better systems and process design.
          </p>
          <p>
            Upon returning to the manufacturing sector, he observed that many
            of the same challenges persisted, particularly for small and
            mid-sized businesses. Companies were often forced to choose between
            costly, overly complex enterprise platforms and simpler tools that
            lacked the depth required to support real operational and financial
            workflows.
          </p>
          <p>
            BottomLine was created in response to these gaps. It is built on
            the principle that business software should align with how
            organizations actually operate, combining ease of use with rigorous
            accounting, operational integrity, and the flexibility to scale as
            the business grows.
          </p>
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
          Contact Our Team
        </a>
        .
      </p>
    </main>
  );
}
