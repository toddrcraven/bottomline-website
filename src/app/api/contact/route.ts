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

  try {
    console.info("Contact form submission received", {
      name: fullName,
      company: company || "N/A",
      email,
      phone: phone || "N/A",
      topic,
      message,
      timestamp: new Date().toISOString(),
      source: "/contact",
    });
  } catch (error) {
    console.error("Contact form: failed to log submission.", error);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
