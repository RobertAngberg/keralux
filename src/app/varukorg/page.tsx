"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function VarukorgPage() {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-6 py-6 md:py-10 text-center">
        <h1 className="text-3xl font-bold mb-4">Varukorg</h1>
        <p className="text-zinc-600 mb-8">Din varukorg är tom.</p>
        <Link
          href="/butik"
          className="inline-block bg-black text-white px-6 py-3 font-medium hover:bg-zinc-800 transition-colors"
        >
          Till butiken
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-6 md:py-10 max-w-4xl">
      <h1 className="text-3xl font-bold mb-10">Varukorg</h1>

      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.slug} className="flex items-center gap-4 border-b border-zinc-200 pb-6">
            <Image
              src={item.image}
              alt={item.name}
              width={100}
              height={100}
              className="w-24 h-auto"
            />

            <div className="flex-1">
              <h2 className="font-medium text-zinc-900">{item.name}</h2>
              <p className="text-zinc-600">{item.price} kr</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                className="p-2 hover:bg-zinc-100 rounded"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                className="p-2 hover:bg-zinc-100 rounded"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <p className="w-24 text-right font-medium">{item.price * item.quantity} kr</p>

            <button
              onClick={() => removeItem(item.slug)}
              className="p-2 text-zinc-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 border-t border-zinc-200 pt-6">
        <div className="flex justify-between text-xl font-bold">
          <span>Totalt</span>
          <span>{totalPrice} kr</span>
        </div>

        <Link
          href="/kassa"
          className="mt-6 block w-full bg-black text-white text-center py-4 font-medium hover:bg-zinc-800 transition-colors"
        >
          Gå till kassan
        </Link>
      </div>
    </div>
  );
}
