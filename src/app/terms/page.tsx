const sections = [
  {
    title: "Acceptance of Terms",
    paragraphs: [
      "By accessing or using this website, you agree to be bound by these Terms of Use and by our Privacy Policy. If you do not agree to these terms, do not use this website.",
      "These Terms of Use apply to your use of the BottomLine ERP and AvachaTech website, including information, materials, forms, and other content made available through the site.",
    ],
  },
  {
    title: "Website Purpose",
    paragraphs: [
      "This website is provided for general informational, marketing, and business inquiry purposes. Content on this site is intended to describe BottomLine ERP, related services, implementation approaches, and company information.",
      "Nothing on this site constitutes legal, accounting, tax, or other professional advice, and your use of this site does not create a client relationship unless and until a separate written agreement is executed.",
    ],
  },
  {
    title: "Permitted Use",
    paragraphs: ["You may use this website only for lawful purposes."],
    bullets: [
      "You may view, download, and print website content for your internal informational use.",
      "You may submit contact forms or inquiries in connection with legitimate interest in our products or services.",
      "You may not use the website in any way that could damage, disable, overburden, or impair the site or interfere with any other person's use of it.",
      "You may not attempt to gain unauthorized access to any portion of the site, its servers, or related systems.",
      "You may not use this website to transmit unlawful, infringing, harmful, fraudulent, or misleading content.",
    ],
  },
  {
    title: "Intellectual Property",
    paragraphs: [
      "All content on this website, including text, graphics, logos, layouts, branding, software, and other materials, is owned by or licensed to AvachaTech, LLC unless otherwise noted, and is protected by applicable intellectual property laws.",
      "No content from this website may be copied, reproduced, republished, uploaded, posted, transmitted, distributed, or modified without prior written permission, except for limited personal or internal business reference use consistent with these Terms of Use.",
    ],
  },
  {
    title: "No Warranty",
    paragraphs: [
      'This website and all content made available through it are provided "as is" and "as available" without warranties of any kind, whether express or implied.',
      "We do not warrant that the website will be uninterrupted, error-free, secure, or free of harmful components, or that any content on the website is complete, current, or suitable for your particular needs.",
    ],
  },
  {
    title: "Limitation of Liability",
    paragraphs: [
      "To the fullest extent permitted by law, AvachaTech, LLC and its affiliates, officers, employees, contractors, and representatives will not be liable for any indirect, incidental, consequential, special, exemplary, or punitive damages arising out of or related to your use of, or inability to use, this website.",
      "To the fullest extent permitted by law, our total liability for any claim arising out of or relating to this website will be limited to one hundred U.S. dollars ($100).",
    ],
  },
  {
    title: "Third-Party Links",
    paragraphs: [
      "This website may contain links to third-party websites or services for convenience or reference. We do not control and are not responsible for the content, policies, or practices of any third-party sites.",
      "Your use of third-party websites is at your own risk and subject to the terms and policies of those websites.",
    ],
  },
  {
    title: "Submissions and Communications",
    paragraphs: [
      "If you submit information through our contact forms or otherwise communicate with us through the website, you represent that the information you provide is accurate and that you have the right to provide it.",
      "Unless we agree otherwise in writing, information you submit through this website will not be treated as confidential or proprietary for contractual purposes. Please do not submit sensitive personal information or confidential business information through the website unless specifically requested and protected by an appropriate agreement.",
    ],
  },
  {
    title: "Changes to the Website or Terms",
    paragraphs: [
      "We may modify, suspend, or discontinue any part of the website at any time without notice.",
      "We may update these Terms of Use from time to time. Updated terms will become effective when posted on this page. Your continued use of the website after changes are posted constitutes your acceptance of the revised terms.",
    ],
  },
  {
    title: "Governing Law",
    paragraphs: [
      "These Terms of Use are governed by the laws of the State of Washington, without regard to its conflict of laws principles.",
      "Any dispute arising out of or relating to these Terms of Use or your use of the website will be brought exclusively in the state or federal courts located in Washington, and you consent to the jurisdiction of those courts.",
    ],
  },
  {
    title: "Contact Information",
    paragraphs: [
      "If you have questions about these Terms of Use, please contact us at:",
      "AvachaTech, LLC",
      "info@bottomlineerp.com",
      "425-941-5164",
      "Seattle, WA, United States",
    ],
  },
] as const;

export default function TermsPage() {
  return (
    <main className="mx-auto w-full max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold text-white">Terms of Use</h1>
        <p className="mt-3 max-w-4xl text-brandSlate">
          These terms govern use of this website and related online materials.
        </p>
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
          </section>
        ))}
      </div>
    </main>
  );
}
