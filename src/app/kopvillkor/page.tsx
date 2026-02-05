import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Köpvillkor",
  description:
    "Läs om köpvillkor, leverans, ångerrätt och betalning hos KeraLux. 14 dagars öppet köp. Leverans inom 1-2 arbetsdagar.",
  alternates: {
    canonical: "https://keralux.se/kopvillkor",
  },
};

export default function KopvillkorPage() {
  return (
    <div className="container mx-auto px-6 py-6 md:py-10 max-w-3xl">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-zinc-600">Köpvillkor</h1>

      <div className="space-y-8 text-zinc-600 leading-relaxed">
        <p>
          Vid frågor, önskan om retur eller andra ärenden, maila oss på{" "}
          <a href="mailto:info@keralux.se" className="underline hover:text-zinc-900">
            info@keralux.se
          </a>
          .
        </p>

        <p>
          Priser på hemsidan inkluderar moms. Normal leveranstid är 1-2 arbetsdagar. Priserna är
          angivna i svenska kronor. Företaget heter KeraLux Sverige och är momsregistrerat och
          godkänt för F-skatt. Organisationsnumret är 8306186910.
        </p>

        <div>
          <h2 className="text-xl font-semibold text-zinc-800 mb-3">Allmänna villkor</h2>
          <p>
            Genom att beställa så godkänner du att dina person- och kontaktuppgifter registreras av
            företaget och används för kontakt och leverans. Kunden ansvarar för att se till att den
            angivna leveransadressen är korrekt.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-zinc-800 mb-3">Ångerrätt/returrätt</h2>
          <p>
            Enligt lag har du som kund 14 dagars full returrätt från att du mottagit varan. Oanvända
            varor kan alltid returneras inom denna tidsperiod och ingen returavgift tas ut. Vi
            ersätter fraktkostnaden.
          </p>
          <p className="mt-4">
            För att returnera, kontakta oss först via e-post på{" "}
            <a href="mailto:info@keralux.se" className="underline hover:text-zinc-900">
              info@keralux.se
            </a>
            . Efter detta skickar du tillbaka varan väl förpackad, exempelvis i ett vadderat kuvert,
            till vår adress:
          </p>
          <address className="mt-4 not-italic">
            KeraLux Sverige
            <br />
            Idrottsvägen 6
            <br />
            724 65 Västerås
          </address>
          <p className="mt-4">
            När försändelsen nått oss krediterar vi fakturan. Om du redan betalat din order sätter
            vi över köpessumman till ditt bankkonto och meddelar dig när detta är gjort.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-zinc-800 mb-3">Nöjd kund-garanti</h2>
          <p>
            Om du inte är nöjd med ditt köp så kan du kontakta oss för att få hela köpesumman
            tillbaka inom 14 dagar. Om du använt produkten kan du meddela oss varför produkten inte
            var till tillfredsställelse och du får då trots att du använt produkten tillbaka hela
            köpessumman.
          </p>
        </div>
      </div>
    </div>
  );
}
