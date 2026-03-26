import { db } from "@/db";
import { articles } from "@/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (!session?.value) redirect("/admin/login");
}

export default async function ArtiklarPage() {
  await checkAuth();

  const allArticles = await db
    .select()
    .from(articles)
    .orderBy(desc(articles.createdAt));

  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900">Artiklar</h1>
          <p className="text-sm text-zinc-500 mt-1">{allArticles.length} artiklar totalt</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/admin/artiklar/ny"
            className="px-4 py-2 text-sm font-medium rounded-md bg-stone-800 text-white hover:bg-stone-700 transition-colors"
          >
            + Ny artikel
          </Link>
          <Link
            href="/admin"
            className="px-4 py-2 text-sm font-medium rounded-md border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 transition-colors"
          >
            ← Tillbaka
          </Link>
        </div>
      </div>

      {allArticles.length === 0 ? (
        <div className="text-center py-16 text-zinc-400">
          <p className="text-lg">Inga artiklar ännu.</p>
          <Link
            href="/admin/artiklar/ny"
            className="mt-4 inline-block text-sm text-stone-600 underline underline-offset-2"
          >
            Skapa din första artikel
          </Link>
        </div>
      ) : (
        <div className="rounded-lg border border-zinc-200 bg-white overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 border-b border-zinc-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-zinc-600">Titel</th>
                <th className="text-left px-4 py-3 font-medium text-zinc-600">Status</th>
                <th className="text-left px-4 py-3 font-medium text-zinc-600">Datum</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {allArticles.map((article) => (
                <tr key={article.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-zinc-900">{article.title}</td>
                  <td className="px-4 py-3">
                    {article.published ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        Publicerad
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-500">
                        Utkast
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-zinc-500">
                    {article.createdAt
                      ? new Date(article.createdAt).toLocaleDateString("sv-SE")
                      : "—"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/artiklar/${article.id}`}
                      className="text-sm text-stone-600 hover:text-stone-800 font-medium"
                    >
                      Redigera →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
