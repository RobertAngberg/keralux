import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frågor & Svar om Hårfibrer",
  description:
    "Vanliga frågor om KeraLux hårfibrer. Lär dig hur hårfibrer fungerar, hur länge de håller, och hur du använder dem för bästa resultat.",
  alternates: {
    canonical: "https://keralux.se/faq",
  },
};

const faqs = [
  {
    question: "Vad består KeraLux hårfibrer av?",
    answer:
      "Fibrerna består av keratin, även kallat hornämne, vilket är ämnet som riktigt hår och även naglar består av.",
  },
  {
    question: "Stannar KeraLux kvar i håret i vind och regn?",
    answer: "Ja, det gör det.",
  },
  {
    question: "Påverkar KeraLux min hårväxt?",
    answer:
      "KeraLux påverkar inte hårväxten, varken positivt eller negativt. Porer och hårsäckar täpps inte för eller liknande av hårfibrerna.",
  },
  {
    question: "Hur länge stannar KeraLux hårfibrer kvar i håret?",
    answer:
      "De allra flesta fibrerna stannar i håret tills du tvättar det. De kan flytta sig i håret exempelvis när man sover men det är enkelt att korrigera.",
  },
  {
    question: "Kan jag använda KeraLux med stylingprodukter?",
    answer:
      "Det går utmärkt, men det är rekommenderat att applicera KeraLux efter att man haft i t.ex. gelé eller vax eller användning av plattång, locktång eller hårfön. Just hårspray kan eventuellt appliceras efter KeraLux hårfibrer snarare än före.",
  },
  {
    question: "Hur länge räcker en burk?",
    answer: "En burk på 28g räcker i ungefär 60 dagar.",
  },
  {
    question: "Kan man blanda färger?",
    answer:
      "Det går utmärkt och kan vara ett bra sätt att få fram en passande färg om ingen av grundfärgerna passar din hårfärg i grundutförande.",
  },
];

export default function FaqPage() {
  return (
    <div className="container mx-auto px-6 py-6 md:py-10 max-w-3xl">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-zinc-600">
        Frågor & svar
      </h1>

      <div className="space-y-8">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-zinc-200 pb-6">
            <h2 className="text-lg font-semibold text-zinc-800">{faq.question}</h2>
            <p className="mt-2 text-zinc-600 leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
