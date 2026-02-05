import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";
import { AddToCartButton } from "@/components/add-to-cart-button";

export const metadata: Metadata = {
  title: "Butik - Köp KeraLux Hårfibrer | Från 299 kr",
  description:
    "Köp KeraLux hårfibrer online. Dölj håravfall och tunt hår på sekunder. 10 naturliga färger. Fri frakt. 14 dagars öppet köp.",
  keywords: ["hårfibrer", "köp hårfibrer", "KeraLux", "håravfall", "tunt hår", "hårförtätning"],
  openGraph: {
    title: "Butik - KeraLux Hårfibrer",
    description: "Köp KeraLux hårfibrer online. Dölj håravfall på sekunder.",
    url: "https://keralux.se/butik",
    siteName: "KeraLux",
    locale: "sv_SE",
    type: "website",
  },
};

export default function ButikPage() {
  return (
    <div className="container mx-auto px-6 py-6 md:py-10 max-w-5xl">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-zinc-600">Butik</h1>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {products.map((product) => (
          <div key={product.slug} className="flex flex-col items-center">
            <Link href={`/butik/${product.slug}`} className="group">
              <Image
                src={product.image}
                alt={product.name}
                width={230}
                height={150}
                className="h-auto transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <div className="mt-4 text-center">
              <h2 className="text-lg font-medium text-zinc-600">{product.name}</h2>
              <p className="mt-1 text-zinc-500">{product.price} kr</p>
              <AddToCartButton product={product} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
