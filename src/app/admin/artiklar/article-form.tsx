"use client";

import { useActionState, useState, useEffect } from "react";
import { createArticle, updateArticle, deleteArticle } from "./actions";

type Article = {
  id: number;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  published: boolean | null;
  createdAt: Date | null;
  updatedAt: Date | null;
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[åä]/g, "a")
    .replace(/[ö]/g, "o")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function ArticleForm({ article }: { article?: Article }) {
  const isEditing = !!article;

  const [title, setTitle] = useState(article?.title ?? "");
  const [slug, setSlug] = useState(article?.slug ?? "");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(isEditing);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const updateWithId = updateArticle.bind(null, article?.id ?? 0);

  const [createState, createAction, createPending] = useActionState(
    async (_: unknown, formData: FormData) => {
      return await createArticle(formData);
    },
    null,
  );

  const [updateState, updateAction, updatePending] = useActionState(
    async (_: unknown, formData: FormData) => {
      const result = await updateWithId(formData);
      if (result?.success) setSaveSuccess(true);
      return result;
    },
    null,
  );

  useEffect(() => {
    if (!slugManuallyEdited) {
      setSlug(slugify(title));
    }
  }, [title, slugManuallyEdited]);

  const isPending = createPending || updatePending;
  const state = isEditing ? updateState : createState;
  const action = isEditing ? updateAction : createAction;

  async function handleDelete() {
    if (!article) return;
    if (confirm(`Vill du verkligen radera "${article.title}"? Detta går inte att ångra.`)) {
      await deleteArticle(article.id);
    }
  }

  return (
    <form action={action} className="space-y-6">
      {state?.error && (
        <div className="px-4 py-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm">
          {state.error}
        </div>
      )}
      {saveSuccess && (
        <div className="px-4 py-3 rounded-md bg-green-50 border border-green-200 text-green-700 text-sm">
          Artikeln sparades.
        </div>
      )}

      <div className="bg-white rounded-lg border border-zinc-200 shadow-sm p-6 space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1.5" htmlFor="title">
            Titel
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-md border border-zinc-300 bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent transition"
            placeholder="Artikelns titel"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1.5" htmlFor="slug">
            Slug
          </label>
          <input
            id="slug"
            name="slug"
            type="text"
            required
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setSlugManuallyEdited(true);
            }}
            className="w-full px-3 py-2 text-sm rounded-md border border-zinc-300 bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent transition font-mono"
            placeholder="artikel-slug"
          />
          <p className="mt-1 text-xs text-zinc-400">/blogg/{slug || "artikel-slug"}</p>
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1.5" htmlFor="excerpt">
            Utdrag
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            rows={2}
            defaultValue={article?.excerpt ?? ""}
            className="w-full px-3 py-2 text-sm rounded-md border border-zinc-300 bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent transition resize-none"
            placeholder="Kort sammanfattning av artikeln (används för SEO och listvy)"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1.5" htmlFor="content">
            Innehåll{" "}
            <span className="text-xs font-normal text-zinc-400">(Markdown stöds)</span>
          </label>
          <textarea
            id="content"
            name="content"
            rows={16}
            defaultValue={article?.content ?? ""}
            className="w-full px-3 py-2 text-sm rounded-md border border-zinc-300 bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent transition resize-y font-mono"
            placeholder="# Rubrik&#10;&#10;Skriv artikelinnehåll här i Markdown-format..."
          />
        </div>

        {/* Published toggle */}
        <div className="flex items-center gap-3 pt-1">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="published"
              defaultChecked={article?.published ?? false}
              className="sr-only peer"
            />
            <div className="w-10 h-5 bg-zinc-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-stone-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-stone-700"></div>
          </label>
          <span className="text-sm font-medium text-zinc-700">Publicerad</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button
          type="submit"
          disabled={isPending}
          className="px-5 py-2 text-sm font-medium rounded-md bg-stone-800 text-white hover:bg-stone-700 disabled:opacity-50 transition-colors"
        >
          {isPending ? "Sparar..." : isEditing ? "Spara ändringar" : "Skapa artikel"}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 text-sm font-medium rounded-md border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
          >
            Radera artikel
          </button>
        )}
      </div>
    </form>
  );
}
