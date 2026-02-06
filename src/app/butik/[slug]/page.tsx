import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug, getAllSlugs } from "@/db/products";
import { AddToCartButton } from "@/components/add-to-cart-button";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Produkt hittades inte - KeraLux",
    };
  }

  return {
    title: `${product.name} - Hårfibrer | KeraLux`,
    description: `Köp ${product.name} för ${product.price} kr. Dölj håravfall och tunt hår på sekunder med KeraLux premium hårfibrer.`,
    keywords: ["hårfibrer", product.name, "KeraLux", "håravfall", "tunt hår"],
    openGraph: {
      title: `${product.name} - KeraLux Hårfibrer`,
      description: `Köp ${product.name} för ${product.price} kr. Dölj håravfall på sekunder.`,
      url: `https://keralux.se/butik/${slug}`,
      siteName: "KeraLux",
      images: [
        {
          url: product.image || "",
          width: 500,
          height: 500,
          alt: product.name,
        },
      ],
      locale: "sv_SE",
      type: "website",
    },
  };
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-6 py-12 md:py-16 max-w-4xl">
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <Image
            src={product.image || ""}
            alt={product.name}
            width={500}
            height={500}
            className="w-full h-auto"
          />
        </div>

        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-zinc-900">{product.name}</h1>
          <p className="mt-2 text-2xl text-zinc-900">{Number(product.price)} kr</p>
          <p className="mt-6 text-zinc-600 leading-relaxed">{product.description}</p>

          <AddToCartButton product={{ ...product, price: Number(product.price) }} size="large" />
        </div>
      </div>
    </div>
  );
}
