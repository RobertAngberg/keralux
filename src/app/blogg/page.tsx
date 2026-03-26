import type { Metadata } from "next";
import { db } from "@/db";
import { articles } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blogg",
  description: "Artiklar och tips om hårfibrer, håravfall och hårskötsel från KeraLux.",
  alternates: {
    canonical: "https://keralux.se/blogg",
  },
};

export default async function BloggPage() {
  const publishedArticles = await db
    .select()
    .from(articles)
    .where(eq(articles.published, true))
    .orderBy(desc(articles.createdAt));

  return (
    <div className="container mx-auto px-6 py-8 md:py-12 max-w-3xl">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-zinc-700">Blogg</h1>
      <p className="text-center text-zinc-500 mb-10">Tips och råd om hår och hårskötsel</p>

      {publishedArticles.length === 0 ? (
        <p className="text-center text-zinc-400 py-16">Inga artiklar publicerade ännu.</p>
      ) : (
        <div className="space-y-10">
          {publishedArticles.map((article) => (
            <article
              key={article.id}
              className="border-b border-zinc-200 pb-10 last:border-0"
            >
              {article.image && (
                <Link href={`/blogg/${article.slug}`}>
                  <div className="relative w-full h-52 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
              )}
              <time className="text-xs text-zinc-400 uppercase tracking-wide">
                {article.createdAt
                  ? new Date(article.createdAt).toLocaleDateString("sv-SE", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : ""}
              </time>
              <h2 className="mt-1 text-xl font-semibold text-zinc-800 hover:text-zinc-600 transition-colors">
                <Link href={`/blogg/${article.slug}`}>{article.title}</Link>
              </h2>
              {article.excerpt && (
                <p className="mt-2 text-zinc-600 leading-relaxed">{article.excerpt}</p>
              )}
              <Link
                href={`/blogg/${article.slug}`}
                className="mt-3 inline-block text-sm font-medium text-stone-700 hover:text-stone-900 underline underline-offset-2"
              >
                Läs mer →
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
