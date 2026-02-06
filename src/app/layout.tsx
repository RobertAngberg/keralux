import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Nav } from "@/components/nav";
import { CartProvider } from "@/lib/cart-context";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://keralux.se"),
  title: {
    default: "KeraLux - Hårfibrer som döljer håravfall | Från 299 kr",
    template: "%s | KeraLux",
  },
  description:
    "KeraLux hårfibrer döljer håravfall och tunt hår på sekunder. Naturligt resultat med keratinfibrer. 10 färger. Fri frakt. 14 dagars öppet köp.",
  keywords: [
    "hårfibrer",
    "håravfall",
    "tunt hår",
    "KeraLux",
    "hårförtätning",
    "keratin hårfibrer",
    "dölj håravfall",
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://keralux.se",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-1046599495"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-1046599495');
            gtag('config', 'G-D99WQL446F');
          `}
        </Script>
      </head>
      <body className={`${montserrat.variable} font-sans antialiased flex flex-col min-h-screen`}>
        <CartProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <footer className="bg-black text-white text-center py-6 text-sm">
            Företaget innehar F-skattesedel och är momsregistrerat
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
