import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";

export type Product = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  price: string;
  compareAtPrice: string | null;
  image: string | null;
};

export async function getProducts(): Promise<Product[]> {
  return await db.select().from(products).orderBy(products.id);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const result = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
  return result[0] || null;
}

export async function getAllSlugs(): Promise<string[]> {
  const result = await db.select({ slug: products.slug }).from(products);
  return result.map((p) => p.slug);
}
