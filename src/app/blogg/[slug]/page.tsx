import type { Metadata } from "next";
import { db } from "@/db";
import { articles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { marked } from "marked";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const [article] = await db
    .select()
    .from(articles)
    .where(eq(articles.slug, slug));

  if (!article || !article.published) {
    return { title: "Artikel hittades inte" };
  }

  return {
    title: article.title,
    description: article.excerpt ?? undefined,
    alternates: {
      canonical: `https://keralux.se/blogg/${article.slug}`,
    },
  };
}

export default async function ArtikelPage({ params }: Props) {
  const { slug } = await params;

  const [article] = await db
    .select()
    .from(articles)
    .where(eq(articles.slug, slug));

  if (!article || !article.published) notFound();

  const htmlContent = article.content ? await marked(article.content) : "";

  return (
    <div className="container mx-auto px-6 py-8 md:py-12 max-w-3xl">
      <Link
        href="/blogg"
        className="text-sm text-zinc-500 hover:text-zinc-700 mb-6 inline-block"
      >
        ← Tillbaka till bloggen
      </Link>

      <article>
        {article.image && (
          <div className="relative w-full h-64 md:h-80 mb-8 rounded-xl overflow-hidden">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        <header className="mb-8">
          <time className="text-xs text-zinc-400 uppercase tracking-wide">
            {article.createdAt
              ? new Date(article.createdAt).toLocaleDateString("sv-SE", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : ""}
          </time>
          <h1 className="mt-1 text-3xl md:text-4xl font-bold text-zinc-800 leading-tight">
            {article.title}
          </h1>
          {article.excerpt && (
            <p className="mt-3 text-lg text-zinc-500 leading-relaxed">{article.excerpt}</p>
          )}
        </header>

        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </article>
    </div>
  );
}
