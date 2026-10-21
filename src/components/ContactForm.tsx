"use client";

import { useState, FormEvent } from "react";
import { Reveal } from "@/components/Motion";
import SendInquiryButton, { type SendState } from "@/components/SendInquiryButton";
import { companies, COMPANY_PROFILE_PDF } from "@/lib/content";
import { Mail, Building2, FileDown } from "lucide-react";

const inquiryTypes = ["Partnership", "Investment", "Media", "General"] as const;

export default function ContactForm() {
  const [sendState, setSendState] = useState<SendState>("idle");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sendState === "pending") return;

    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      organization: String(fd.get("organization") ?? "").trim(),
      role: String(fd.get("role") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      inquiryType: String(fd.get("inquiryType") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
      // Honeypot — leave empty; bots often fill it
      website: String(fd.get("website") ?? "").trim(),
    };

    setSendState("pending");
    setStatusMessage(null);

    try {
      const res = await fetch("/api/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!res.ok || !data?.ok) {
        setSendState("error");
        setStatusMessage(data?.error || "Something went wrong. Please try again.");
        window.setTimeout(() => {
          setSendState("idle");
          setStatusMessage(null);
        }, 3200);
        return;
      }

      form.reset();
      setSendState("success");
      setStatusMessage("Message sent — we will get back to you soon.");
      window.setTimeout(() => {
        setSendState("idle");
        setStatusMessage(null);
      }, 2800);
    } catch {
      setSendState("error");
      setStatusMessage("Could not reach the server. Please try again.");
      window.setTimeout(() => {
        setSendState("idle");
        setStatusMessage(null);
      }, 3200);
    }
  }

  return (
    <section id="form" className="bg-surface py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-12">
        <Reveal direction="right" className="space-y-8 lg:col-span-5">
          <div>
            <h2 className="font-display text-2xl font-bold text-mono-90">Holding office</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-mono-70">
              Corporate inquiries for Zaims Holding. For project delivery, use the operating-company
              contacts published on each company website (listed below).
            </p>
            <a
              href="mailto:info@zaimsholding.com"
              className="mt-4 inline-flex cursor-pointer items-center gap-2 font-medium text-brand-primary hover:text-brand-yellow"
            >
              <Mail className="h-4 w-4" />
              info@zaimsholding.com
            </a>
            <a
              href={COMPANY_PROFILE_PDF}
              download
              className="mt-5 inline-flex w-full max-w-sm cursor-pointer items-center justify-center gap-2 rounded-full bg-brand-yellow px-5 py-3 text-sm font-semibold text-brand-primary shadow-sm transition-opacity hover:opacity-90"
            >
              <FileDown className="h-4 w-4" aria-hidden />
              Download company profile
            </a>
          </div>
          <div>
            <h3 className="flex items-center gap-2 font-display text-lg font-bold text-mono-90">
              <Building2 className="h-5 w-5 text-brand-accent" />
              Operating companies
            </h3>
            <ul className="mt-4 space-y-4">
              {companies.map((c) => (
                <li key={c.slug} className="text-[15px] text-mono-70">
                  <span className="font-medium text-brand-yellow">{c.name}</span>
                  <span className="text-mono-45"> — {c.location}</span>
                  {c.email ? (
                    <a
                      href={`mailto:${c.email}`}
                      className="mt-1 block text-sm text-brand-primary hover:text-brand-yellow"
                    >
                      {c.email}
                    </a>
                  ) : null}
                  {c.phone ? (
                    <a
                      href={`tel:${c.phone.replace(/\s+/g, "")}`}
                      className="mt-0.5 block text-sm text-mono-55 hover:text-brand-yellow"
                    >
                      {c.phone}
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1} direction="left" className="lg:col-span-7">
          <form
            onSubmit={onSubmit}
            className="relative space-y-5 rounded-2xl border border-mono-20 bg-paper p-6 md:p-8"
          >
            {/* Honeypot — hidden from users */}
            <div className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
              <label>
                Website
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-mono-90">Name</span>
                <input
                  name="name"
                  required
                  maxLength={120}
                  className="mt-1.5 w-full rounded-xl border border-mono-20 bg-surface px-4 py-2.5 text-[15px] outline-none focus:border-brand-primary"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-mono-90">Organization</span>
                <input
                  name="organization"
                  required
                  maxLength={160}
                  className="mt-1.5 w-full rounded-xl border border-mono-20 bg-surface px-4 py-2.5 text-[15px] outline-none focus:border-brand-primary"
                />
              </label>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-mono-90">Role</span>
                <input
                  name="role"
                  maxLength={120}
                  className="mt-1.5 w-full rounded-xl border border-mono-20 bg-surface px-4 py-2.5 text-[15px] outline-none focus:border-brand-primary"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-mono-90">Email</span>
                <input
                  name="email"
                  type="email"
                  required
                  maxLength={160}
                  className="mt-1.5 w-full rounded-xl border border-mono-20 bg-surface px-4 py-2.5 text-[15px] outline-none focus:border-brand-primary"
                />
              </label>
            </div>
            <label className="block">
              <span className="text-sm font-medium text-mono-90">Inquiry type</span>
              <select
                name="inquiryType"
                required
                className="mt-1.5 w-full cursor-pointer rounded-xl border border-mono-20 bg-surface px-4 py-2.5 text-[15px] outline-none focus:border-brand-primary"
                defaultValue="General"
              >
                {inquiryTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-medium text-mono-90">Message</span>
              <textarea
                name="message"
                required
                rows={5}
                maxLength={5000}
                className="mt-1.5 w-full resize-y rounded-xl border border-mono-20 bg-surface px-4 py-2.5 text-[15px] outline-none focus:border-brand-primary"
              />
            </label>

            <div className="flex flex-wrap items-center gap-4">
              <SendInquiryButton state={sendState} disabled={sendState === "pending"} />
              {statusMessage && (
                <p
                  className={`text-sm ${
                    sendState === "error" ? "text-red-600" : "text-mono-55"
                  }`}
                >
                  {statusMessage}
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
