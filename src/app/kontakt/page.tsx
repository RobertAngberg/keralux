import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Kontakta oss",
  description:
    "Kontakta KeraLux kundtjänst. Har du frågor om hårfibrer, beställningar eller returer? Vi hjälper dig gärna.",
  alternates: {
    canonical: "https://keralux.se/kontakt",
  },
};

export default function KontaktPage() {
  return (
    <div className="container mx-auto px-6 py-6 md:py-10 max-w-xl">
      <h1 className="text-3xl font-bold mb-2">Kontakta oss</h1>
      <p className="text-zinc-600 mb-8">
        Har du frågor om våra produkter eller din beställning? Fyll i formuläret så återkommer vi.
      </p>

      <ContactForm />
    </div>
  );
}
