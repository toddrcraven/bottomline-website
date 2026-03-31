import Link from "next/link";

const lastUpdated = "March 31, 2026";

export default function AccessibilityPage() {
  return (
    <main className="mx-auto w-full max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold text-white">Accessibility Statement</h1>
        <p className="mt-3 text-brandSlate">Last updated: {lastUpdated}</p>
      </header>

      <div className="space-y-6">
        <section className="rounded bl-panel bg-surface-header p-6">
          <h2 className="text-xl font-semibold text-white">Our commitment</h2>
          <p className="mt-3 text-brandSlate">
            BottomLine ERP is committed to making this website accessible to as many
            people as possible, including people using assistive technology.
          </p>
          <p className="mt-3 text-brandSlate">
            We aim to support a usable experience across current browsers,
            screen readers, keyboard navigation, and mobile devices, and we
            continue to improve the site over time.
          </p>
        </section>

        <section className="rounded bl-panel bg-surface-header p-6">
          <h2 className="text-xl font-semibold text-white">What we are doing</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-brandSlate">
            <li>Using semantic HTML structure and descriptive page headings.</li>
            <li>Providing visible keyboard focus styles for interactive controls.</li>
            <li>Labeling form fields so assistive technologies can interpret them.</li>
            <li>Reviewing content and interface changes as the site evolves.</li>
          </ul>
        </section>

        <section className="rounded bl-panel bg-surface-header p-6">
          <h2 className="text-xl font-semibold text-white">Need help?</h2>
          <p className="mt-3 text-brandSlate">
            If you have difficulty using this website, notice an accessibility
            issue, or need information in an alternative format, contact us and
            we will work to provide assistance.
          </p>
          <div className="mt-3 space-y-1 text-brandSlate">
            <p>Email: info@bottomlineerp.com</p>
            <p>Phone: 425-941-5164</p>
            <p>
              You can also use our{" "}
              <Link href="/contact" className="underline">
                contact form
              </Link>
              .
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
