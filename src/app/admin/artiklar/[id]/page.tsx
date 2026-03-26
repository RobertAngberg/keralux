import { db } from "@/db";
import { articles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { ArticleForm } from "../article-form";

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (!session?.value) redirect("/admin/login");
}

export default async function EditArtikelPage({ params }: { params: Promise<{ id: string }> }) {
  await checkAuth();
  const { id } = await params;
  const articleId = parseInt(id, 10);

  if (isNaN(articleId)) notFound();

  const [article] = await db.select().from(articles).where(eq(articles.id, articleId));
  if (!article) notFound();

  return (
    <div className="container mx-auto px-6 py-8 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900">Redigera artikel</h1>
          <p className="text-sm text-zinc-500 mt-1">{article.title}</p>
        </div>
        <Link
          href="/admin/artiklar"
          className="px-4 py-2 text-sm font-medium rounded-md border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 transition-colors"
        >
          ← Tillbaka
        </Link>
      </div>

      <ArticleForm article={article} />
    </div>
  );
}
