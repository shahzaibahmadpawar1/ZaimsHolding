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

    // Demo only — no email backend yet. Plays Folding… → flight → Sent.
    setSendState("pending");
    await new Promise((r) => setTimeout(r, 2100));
    setSendState("success");
    window.setTimeout(() => setSendState("idle"), 2800);
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
              href="mailto:contact@zaimsholding.com"
              className="mt-4 inline-flex cursor-pointer items-center gap-2 font-medium text-brand-primary hover:text-brand-yellow"
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
            className="space-y-5 rounded-2xl border border-mono-20 bg-paper p-6 md:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-mono-90">Name</span>
                <input
                  name="name"
                  required
                  className="mt-1.5 w-full rounded-xl border border-mono-20 bg-surface px-4 py-2.5 text-[15px] outline-none focus:border-brand-primary"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-mono-90">Organization</span>
                <input
                  name="organization"
                  required
                  className="mt-1.5 w-full rounded-xl border border-mono-20 bg-surface px-4 py-2.5 text-[15px] outline-none focus:border-brand-primary"
                />
              </label>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-mono-90">Role</span>
                <input
                  name="role"
                  className="mt-1.5 w-full rounded-xl border border-mono-20 bg-surface px-4 py-2.5 text-[15px] outline-none focus:border-brand-primary"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-mono-90">Email</span>
                <input
                  name="email"
                  type="email"
                  required
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
                className="mt-1.5 w-full resize-y rounded-xl border border-mono-20 bg-surface px-4 py-2.5 text-[15px] outline-none focus:border-brand-primary"
              />
            </label>

            <div className="flex flex-wrap items-center gap-4">
              <SendInquiryButton state={sendState} />
              {sendState === "success" && (
                <p className="text-sm text-mono-55">
                  Animation preview complete — email delivery will be wired up later.
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
