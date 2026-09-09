"use client";

import { useState, FormEvent } from "react";
import { Reveal } from "@/components/Motion";
import SendInquiryButton, { type SendState } from "@/components/SendInquiryButton";
import { companies } from "@/lib/content";
import { Mail, Building2 } from "lucide-react";

const inquiryTypes = ["Partnership", "Investment", "Media", "General"] as const;

export default function ContactForm() {
  const [sendState, setSendState] = useState<SendState>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sendState === "pending") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const subject = encodeURIComponent(
      `[Zaims] ${data.get("inquiryType")} inquiry from ${data.get("name")}`,
    );
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nOrganization: ${data.get("organization")}\nRole: ${data.get("role")}\nEmail: ${data.get("email")}\nInquiry type: ${data.get("inquiryType")}\n\n${data.get("message")}`,
    );

    setSendState("pending");

    // Let the paper-plane flight play, then open mail client
    await new Promise((r) => setTimeout(r, 1500));

    try {
      window.location.href = `mailto:contact@zaimsholding.com?subject=${subject}&body=${body}`;
      setSendState("success");
      window.setTimeout(() => setSendState("idle"), 3200);
    } catch {
      setSendState("error");
      window.setTimeout(() => setSendState("idle"), 2800);
    }
  }

  return (
    <section id="form" className="bg-white py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-12">
        <Reveal direction="right" className="space-y-8 lg:col-span-5">
          <div>
            <h2 className="font-display text-2xl font-bold text-mono-90">Holding office</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-mono-70">
              Corporate inquiries for Zaims Holding. Addresses and direct lines will be published here
              once finalized.
            </p>
            <a
              href="mailto:contact@zaimsholding.com"
              className="mt-4 inline-flex cursor-pointer items-center gap-2 font-medium text-brand-primary hover:text-brand-accent"
            >
              <Mail className="h-4 w-4" />
              contact@zaimsholding.com
            </a>
          </div>
          <div>
            <h3 className="flex items-center gap-2 font-display text-lg font-bold text-mono-90">
              <Building2 className="h-5 w-5 text-brand-accent" />
              Operating companies
            </h3>
            <ul className="mt-4 space-y-3">
              {companies.map((c) => (
                <li key={c.slug} className="text-[15px] text-mono-70">
                  <span className="font-medium text-mono-90">{c.name}</span>
                  <span className="text-mono-45"> — {c.location}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1} direction="left" className="lg:col-span-7">
          <form
            onSubmit={onSubmit}
            className="space-y-5 rounded-2xl border border-mono-20 bg-paper p-6 md:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-mono-90">Name</span>
                <input
                  name="name"
                  required
                  className="mt-1.5 w-full rounded-xl border border-mono-20 bg-white px-4 py-2.5 text-[15px] outline-none focus:border-brand-primary"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-mono-90">Organization</span>
                <input
                  name="organization"
                  required
                  className="mt-1.5 w-full rounded-xl border border-mono-20 bg-white px-4 py-2.5 text-[15px] outline-none focus:border-brand-primary"
                />
              </label>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-mono-90">Role</span>
                <input
                  name="role"
                  className="mt-1.5 w-full rounded-xl border border-mono-20 bg-white px-4 py-2.5 text-[15px] outline-none focus:border-brand-primary"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-mono-90">Email</span>
                <input
                  name="email"
                  type="email"
                  required
                  className="mt-1.5 w-full rounded-xl border border-mono-20 bg-white px-4 py-2.5 text-[15px] outline-none focus:border-brand-primary"
                />
              </label>
            </div>
            <label className="block">
              <span className="text-sm font-medium text-mono-90">Inquiry type</span>
              <select
                name="inquiryType"
                required
                className="mt-1.5 w-full cursor-pointer rounded-xl border border-mono-20 bg-white px-4 py-2.5 text-[15px] outline-none focus:border-brand-primary"
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
                className="mt-1.5 w-full resize-y rounded-xl border border-mono-20 bg-white px-4 py-2.5 text-[15px] outline-none focus:border-brand-primary"
              />
            </label>

            <div className="flex flex-wrap items-center gap-4">
              <SendInquiryButton state={sendState} />
              {sendState === "success" && (
                <p className="text-sm text-mono-55">
                  Your email client should open with a drafted message. If it doesn&apos;t, write to{" "}
                  <a
                    href="mailto:contact@zaimsholding.com"
                    className="cursor-pointer text-brand-primary underline"
                  >
                    contact@zaimsholding.com
                  </a>
                  .
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
