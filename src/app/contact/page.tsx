"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";

type FormState = {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
};

const TOPICS = [
  "Demo Request",
  "Pricing Question",
  "Implementation",
  "Security/Compliance",
  "Partnership",
  "Other",
];

const initialState: FormState = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  topic: "",
  message: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactPage() {
  const [formState, setFormState] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  const canSubmit = status !== "sending";

  const updateField =
    (field: keyof FormState) =>
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setFormState((prev) => ({ ...prev, [field]: event.target.value }));
      if (status !== "sending" && status !== "idle") {
        setStatus("idle");
        setErrorMessage("");
      }
    };

  const validate = (state: FormState) => {
    if (!state.fullName.trim()) {
      return "Please provide your full name.";
    }
    if (!state.email.trim() || !emailPattern.test(state.email.trim())) {
      return "Please provide a valid work email.";
    }
    if (!state.topic) {
      return "Please select a topic.";
    }
    if (!state.message.trim() || state.message.trim().length < 10) {
      return "Please add a message (at least 10 characters).";
    }
    return "";
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") {
      return;
    }

    const validationError = validate(formState);
    if (validationError) {
      setStatus("error");
      setErrorMessage(validationError);
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formState.fullName.trim(),
          company: formState.company.trim(),
          email: formState.email.trim(),
          phone: formState.phone.trim(),
          topic: formState.topic,
          message: formState.message.trim(),
        }),
      });

      if (!response.ok) {
        setStatus("error");
        setErrorMessage("Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setFormState(initialState);
    } catch (error) {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="mx-auto w-full max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          Contact BottomLine
        </h1>
        <p className="mt-3 text-brandSlate">
          Tell us what you&apos;re building. We&apos;ll respond quickly.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <section className="bl-card-pretty rounded-xl border border-brandGreen/30 bg-surface p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-white">Start the conversation</h2>
          <p className="mt-2 text-sm text-brandSlate">
            Send us the details and we&apos;ll get back within one business day.
          </p>

          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-brandSlate">
                Full Name *
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formState.fullName}
                  onChange={updateField("fullName")}
                  className="mt-2 w-full rounded-lg border border-brandGreen/20 bg-surfaceMuted/70 px-3 py-2 text-sm text-white placeholder:text-brandSlate/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brandBlue"
                  placeholder="Jordan Lee"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-brandSlate">
                Company
                <input
                  type="text"
                  name="company"
                  value={formState.company}
                  onChange={updateField("company")}
                  className="mt-2 w-full rounded-lg border border-brandGreen/20 bg-surfaceMuted/70 px-3 py-2 text-sm text-white placeholder:text-brandSlate/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brandBlue"
                  placeholder="BottomLine Labs"
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-brandSlate">
                Work Email *
                <input
                  type="email"
                  name="email"
                  required
                  value={formState.email}
                  onChange={updateField("email")}
                  className="mt-2 w-full rounded-lg border border-brandGreen/20 bg-surfaceMuted/70 px-3 py-2 text-sm text-white placeholder:text-brandSlate/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brandBlue"
                  placeholder="you@company.com"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-brandSlate">
                Phone
                <input
                  type="tel"
                  name="phone"
                  value={formState.phone}
                  onChange={updateField("phone")}
                  className="mt-2 w-full rounded-lg border border-brandGreen/20 bg-surfaceMuted/70 px-3 py-2 text-sm text-white placeholder:text-brandSlate/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brandBlue"
                  placeholder="(555) 123-9876"
                />
              </label>
            </div>

            <label className="space-y-2 text-sm font-medium text-brandSlate">
              Topic *
              <select
                name="topic"
                required
                value={formState.topic}
                onChange={updateField("topic")}
                className="mt-2 w-full rounded-lg border border-brandGreen/20 bg-surfaceMuted/70 px-3 py-2 text-sm text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brandBlue"
              >
                <option value="" disabled>
                  Select a topic
                </option>
                {TOPICS.map((topic) => (
                  <option key={topic} value={topic} className="text-slate-900">
                    {topic}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2 text-sm font-medium text-brandSlate">
              Message *
              <textarea
                name="message"
                required
                minLength={10}
                value={formState.message}
                onChange={updateField("message")}
                className="mt-2 min-h-[140px] w-full rounded-lg border border-brandGreen/20 bg-surfaceMuted/70 px-3 py-2 text-sm text-white placeholder:text-brandSlate/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brandBlue"
                placeholder="Share a quick overview of your goals, timeline, and team size."
              />
            </label>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={!canSubmit}
                className="inline-flex items-center justify-center rounded bg-brandBlue px-4 py-2 text-sm font-semibold text-white transition-transform duration-100 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
              {status === "success" && (
                <span className="text-sm font-medium text-brandGreen">
                  Thanks - we&apos;ll be in touch shortly.
                </span>
              )}
              {status === "error" && (
                <span className="text-sm font-medium text-red-300">
                  {errorMessage || "Something went wrong. Please try again."}
                </span>
              )}
            </div>
          </form>
        </section>

        <aside className="bl-card-pretty rounded-xl border border-brandGreen/30 bg-surface p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-white">What happens next</h2>
          <ul className="mt-4 space-y-3 text-sm text-brandSlate">
            <li>We&apos;ll respond within 1 business day.</li>
            <li>We can share a demo and sample workflows.</li>
            <li>We&apos;ll recommend the right rollout (QuickStart / Standard / Full Suite).</li>
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/features"
              className="inline-flex items-center justify-center rounded border border-brandGreen px-4 py-2 text-sm font-semibold text-brandGreen transition-transform duration-100 hover:bg-[rgba(34,197,94,0.18)] active:scale-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandGreen focus-visible:ring-offset-2 focus-visible:ring-offset-backgroundBase"
            >
              Explore Features
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded border border-brandGreen px-4 py-2 text-sm font-semibold text-brandGreen transition-transform duration-100 hover:bg-[rgba(34,197,94,0.18)] active:scale-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandGreen focus-visible:ring-offset-2 focus-visible:ring-offset-backgroundBase"
            >
              View Pricing
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
