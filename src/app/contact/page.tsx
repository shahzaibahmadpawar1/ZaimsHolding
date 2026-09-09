import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Zaims Holding for partnership, investment, media, or general corporate inquiries.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch."
        description="Investors, partners, media, and institutional stakeholders — tell us how to route your inquiry. Project delivery questions are connected to the relevant operating company."
      />
      <ContactForm />
    </>
  );
}
