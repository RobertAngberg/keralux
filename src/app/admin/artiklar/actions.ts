"use server";

import { db } from "@/db";
import { articles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createArticle(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const content = formData.get("content") as string;
  const excerpt = formData.get("excerpt") as string;
  const published = formData.get("published") === "on";

  if (!title || !slug) {
    return { error: "Titel och slug krävs" };
  }

  const [article] = await db
    .insert(articles)
    .values({ title, slug, content, excerpt, published })
    .returning({ id: articles.id });

  revalidatePath("/admin/artiklar");
  revalidatePath("/blogg");
  redirect(`/admin/artiklar/${article.id}`);
}

export async function updateArticle(id: number, formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const content = formData.get("content") as string;
  const excerpt = formData.get("excerpt") as string;
  const published = formData.get("published") === "on";

  if (!title || !slug) {
    return { error: "Titel och slug krävs" };
  }

  await db
    .update(articles)
    .set({ title, slug, content, excerpt, published, updatedAt: new Date() })
    .where(eq(articles.id, id));

  revalidatePath("/admin/artiklar");
  revalidatePath(`/admin/artiklar/${id}`);
  revalidatePath("/blogg");
  revalidatePath(`/blogg/${slug}`);

  return { success: true };
}

export async function deleteArticle(id: number) {
  await db.delete(articles).where(eq(articles.id, id));
  revalidatePath("/admin/artiklar");
  revalidatePath("/blogg");
  redirect("/admin/artiklar");
}
