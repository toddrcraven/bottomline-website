const lastUpdated = "March 31, 2026";

const sections = [
  {
    title: "Scope",
    paragraphs: [
      "This Privacy Policy applies to the BottomLine ERP marketing website, including our public pages, contact forms, and demo request workflows.",
      "It describes how AvachaTech, LLC collects, uses, and discloses personal information submitted through this website. It does not govern customer data processed within a separately provisioned BottomLine ERP environment under a customer agreement.",
    ],
  },
  {
    title: "Information we collect",
    paragraphs: ["We collect information in two main ways:"],
    bullets: [
      "Information you provide directly, such as your name, company name, work email address, phone number, topic selection, and message when you contact us or request a demo.",
      "Basic technical information that is typically generated when you visit a website, such as IP address, browser type, device type, referring page, and request timing.",
      "Limited browser-based storage data used to support site functionality, such as temporary session state while you navigate the site.",
    ],
  },
  {
    title: "How we use information",
    paragraphs: ["We use the information we collect to:"],
    bullets: [
      "Respond to inquiries, schedule demos, and communicate with you about your request.",
      "Operate, secure, maintain, and improve the website.",
      "Understand general website usage patterns and troubleshoot performance or reliability issues.",
      "Send product and company updates by email where you ask to receive them or where otherwise permitted by law.",
      "Comply with legal obligations and protect our rights, users, and business.",
    ],
  },
  {
    title: "How we use your contact details",
    paragraphs: [
      "If you submit a form on this website, we may use your email address to respond to your inquiry and, if you opt in, to send product or company updates.",
      "If you provide a phone number, we may use it to follow up about your inquiry, demo request, implementation discussion, or other business communication you requested.",
      "We do not use phone numbers collected through this website for marketing text campaigns or telemarketing.",
    ],
  },
  {
    title: "Cookies and similar technologies",
    paragraphs: [
      "This marketing site is not currently configured to use third-party advertising cookies or third-party analytics scripts for cross-site tracking.",
      "The site may rely on browser session storage or similar technical mechanisms for basic functionality, such as preserving navigation state while you move between pages.",
      "Our hosting and infrastructure providers may also generate standard server logs and technical records needed to operate and secure the site.",
    ],
  },
  {
    title: "When we share information",
    paragraphs: [
      "We do not sell personal information collected through this website. We may share information in the following limited situations:",
    ],
    bullets: [
      "With service providers who help us host, operate, secure, or support the website and related communications.",
      "If required by law, subpoena, court order, or other legal process.",
      "To protect the rights, safety, or property of AvachaTech, our users, or others.",
      "As part of a merger, acquisition, financing, reorganization, or sale of all or part of our business.",
    ],
  },
  {
    title: "Retention",
    paragraphs: [
      "We retain personal information for as long as reasonably necessary for the purposes described in this policy, including responding to inquiries, maintaining business records, meeting legal obligations, resolving disputes, and enforcing agreements.",
    ],
  },
  {
    title: "Your choices",
    paragraphs: [
      "You may contact us to request access to, correction of, or deletion of personal information we hold about you, subject to applicable law and legitimate business requirements.",
      "You may opt out of marketing emails at any time by using the unsubscribe link in the message or by contacting us directly.",
    ],
  },
  {
    title: "Children's privacy",
    paragraphs: [
      "This website is intended for business users and is not directed to children under 13. We do not knowingly collect personal information from children through this website.",
    ],
  },
  {
    title: "Changes to this policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time. When we do, we will revise the Last Updated date on this page.",
    ],
  },
  {
    title: "Contact us",
    paragraphs: [
      "If you have questions about this Privacy Policy or our website data practices, contact us at info@bottomlineerp.com or 425-941-5164.",
    ],
    contact: ["AvachaTech, LLC", "Seattle, WA, United States"],
  },
] as const;

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold text-white">Privacy Policy</h1>
        <p className="mt-3 text-brandSlate">Last updated: {lastUpdated}</p>
      </header>

      <div className="space-y-6">
        {sections.map((section) => (
          <section
            key={section.title}
            className="rounded bl-panel bg-surface-header p-6"
          >
            <h2 className="text-xl font-semibold text-white">{section.title}</h2>

            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-3 text-brandSlate">
                {paragraph}
              </p>
            ))}

            {"bullets" in section ? (
              <ul className="mt-3 list-disc space-y-2 pl-5 text-brandSlate">
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}

            {"contact" in section ? (
              <div className="mt-3 space-y-1 text-brandSlate">
                {section.contact.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            ) : null}
          </section>
        ))}
      </div>
    </main>
  );
}
