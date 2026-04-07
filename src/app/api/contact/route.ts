import { NextRequest, NextResponse } from "next/server";

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const rateLimitStore = new Map<string, number[]>();

const TOPICS = new Set([
  "Demo Request",
  "Pricing Question",
  "Implementation",
  "Security/Compliance",
  "Partnership",
  "Other",
]);

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RESEND_API_URL = "https://api.resend.com/emails";

const getClientIp = (request: NextRequest) => {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") || "unknown";
};

const isRateLimited = (ip: string) => {
  const now = Date.now();
  const existing = rateLimitStore.get(ip) || [];
  const recent = existing.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  rateLimitStore.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
};

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const formatField = (label: string, value: string) => `${label}: ${value || "N/A"}`;

const buildTextEmail = ({
  fullName,
  company,
  email,
  phone,
  topic,
  message,
}: {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
}) =>
  [
    "New contact form submission",
    "",
    formatField("Name", fullName),
    formatField("Company", company),
    formatField("Email", email),
    formatField("Phone", phone),
    formatField("Topic", topic),
    "",
    "Message:",
    message,
  ].join("\n");

const buildHtmlEmail = ({
  fullName,
  company,
  email,
  phone,
  topic,
  message,
}: {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
}) => {
  const fields = [
    ["Name", fullName],
    ["Company", company || "N/A"],
    ["Email", email],
    ["Phone", phone || "N/A"],
    ["Topic", topic],
  ];

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
      <h2 style="margin-bottom: 16px;">New contact form submission</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 640px;">
        <tbody>
          ${fields
            .map(
              ([label, value]) => `
                <tr>
                  <td style="padding: 8px 12px; border: 1px solid #cbd5e1; font-weight: 600; width: 140px;">${escapeHtml(
                    label
                  )}</td>
                  <td style="padding: 8px 12px; border: 1px solid #cbd5e1;">${escapeHtml(
                    value
                  )}</td>
                </tr>
              `
            )
            .join("")}
        </tbody>
      </table>
      <h3 style="margin: 24px 0 8px;">Message</h3>
      <p style="white-space: pre-wrap; margin: 0;">${escapeHtml(message)}</p>
    </div>
  `;
};

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let payload: {
    fullName?: string;
    company?: string;
    email?: string;
    phone?: string;
    topic?: string;
    message?: string;
  };

  try {
    payload = await request.json();
  } catch (error) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
  }

  const fullName = (payload.fullName || "").trim();
  const company = (payload.company || "").trim();
  const email = (payload.email || "").trim();
  const phone = (payload.phone || "").trim();
  const topic = (payload.topic || "").trim();
  const message = (payload.message || "").trim();

  if (
    !fullName ||
    !email ||
    !emailPattern.test(email) ||
    !topic ||
    !TOPICS.has(topic) ||
    !message ||
    message.length < 10
  ) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const contactToEmail = process.env.CONTACT_TO_EMAIL || "info@bottomlineerp.com";
  const contactFromEmail =
    process.env.CONTACT_FROM_EMAIL || "BottomLine ERP <contact@bottomlineerp.com>";

  if (!resendApiKey) {
    console.error("Contact form: RESEND_API_KEY is not configured.");
    return NextResponse.json({ ok: false, error: "email_not_configured" }, { status: 500 });
  }

  try {
    const resendResponse = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: contactFromEmail,
        to: [contactToEmail],
        subject: `Website contact: ${topic} from ${fullName}`,
        reply_to: email,
        text: buildTextEmail({ fullName, company, email, phone, topic, message }),
        html: buildHtmlEmail({ fullName, company, email, phone, topic, message }),
      }),
    });

    if (!resendResponse.ok) {
      const resendError = await resendResponse.text();
      console.error("Contact form: Resend request failed.", {
        status: resendResponse.status,
        body: resendError,
      });
      return NextResponse.json({ ok: false, error: "email_send_failed" }, { status: 502 });
    }
  } catch (error) {
    console.error("Contact form: failed to send email.", error);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
