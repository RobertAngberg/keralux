import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "KeraLux - Hårfibrer som döljer håravfall | Från 299 kr",
  description:
    "KeraLux hårfibrer hjälper dig som lider av håravfall eller tunt hår att få ett tjockare och tätare hår på sekunder. Keratin-baserade fibrer för naturligt resultat.",
  alternates: {
    canonical: "https://keralux.se",
  },
};

export default function Home() {
  return (
    <>
      {/* Hero - Mobile */}
      <Image
        src="/hero-mobile.jpg"
        alt="Keralux hero"
        width={768}
        height={1024}
        className="w-full h-auto md:hidden"
        priority
      />
      {/* Hero - Desktop */}
      <Image
        src="/hero-desktop.jpg"
        alt="Keralux hero"
        width={1920}
        height={1080}
        className="w-full h-auto hidden md:block"
        priority
      />

      {/* Intro text */}
      <section className="container mx-auto px-6 py-12 md:py-16">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg md:text-xl leading-relaxed text-zinc-600">
            KeraLux hårfibrer hjälper den som lider av håravfall eller allmänt tunt hår att få ett
            tjockare och tätare hår på ett snabbt och enkelt sätt.
          </p>
          <p className="mt-6 text-lg md:text-xl leading-relaxed text-zinc-600">
            De mikroskopiska fibrerna fäster sig på dina hårstrån, även mycket tunna hårstrån, och
            får omedelbart håret att se tjockare och fylligare ut på ett naturtroget sätt. Ämnet som
            fibrerna består av är keratin, samma ämne som riktigt hår består av.
          </p>
        </div>
      </section>

      {/* Hårfiber images - 1x4 mobile, 2x2 desktop */}
      <section className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Image
          src="/hårfiber-front-1.jpg"
          alt="KeraLux hårfibrer"
          width={960}
          height={960}
          className="w-full h-auto rounded-2xl"
        />
        <Image
          src="/hårfiber-front-2.jpg"
          alt="KeraLux hårfibrer"
          width={960}
          height={960}
          className="w-full h-auto rounded-2xl"
        />
        <Image
          src="/hårfiber-front-3.jpg"
          alt="KeraLux hårfibrer"
          width={960}
          height={960}
          className="w-full h-auto rounded-2xl"
        />
        <Image
          src="/hårfiber-front-4.jpg"
          alt="KeraLux hårfibrer"
          width={960}
          height={960}
          className="w-full h-auto rounded-2xl"
        />
      </section>

      {/* More info text */}
      <section className="container mx-auto px-6 py-12 md:py-16">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg md:text-xl leading-relaxed text-zinc-600">
            Det är billigt och enkelt att dölja tunt hår och håravfall. En burk på 28g täcker två
            månaders dagligt användande, och ofta så räcker en burk betydligt längre än så.
          </p>
          <p className="mt-6 text-lg md:text-xl leading-relaxed text-zinc-600">
            Om du mot förmodan inte skulle vara nöjd med produkten så kan du kontakta oss för att
            begära dina pengar tillbaka. KeraLux är hårfibrer av allra högsta kvalitét och vi är
            säkra på att du kommer att bli nöjd med ditt köp.
          </p>
        </div>
      </section>

      {/* Se produkter - link to store */}
      <div className="container mx-auto px-6 pb-12 md:pb-16 flex justify-center">
        <Link href="/butik" className="block">
          <Image
            src="/se-produkter.jpg"
            alt="Se produkter"
            width={300}
            height={150}
            className="h-auto hover:opacity-90 transition-opacity"
          />
        </Link>
      </div>
    </>
  );
}
