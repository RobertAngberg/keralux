"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { useCart } from "@/lib/cart-context";

interface AddToCartButtonProps {
  product: {
    slug: string;
    name: string;
    price: number;
    image: string;
  };
  size?: "small" | "large";
}

export function AddToCartButton({ product, size = "small" }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (size === "large") {
    return (
      <button
        onClick={handleAddToCart}
        className={`mt-8 py-4 px-8 font-medium cursor-pointer transition-all duration-300 transform ${
          added ? "bg-green-600 text-white scale-105" : "bg-black text-white hover:bg-zinc-800"
        }`}
      >
        <span className="flex items-center justify-center gap-2">
          {added && <Check className="w-5 h-5 animate-[bounce_0.5s_ease-in-out]" />}
          {added ? "Tillagd!" : "Lägg i varukorg"}
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={handleAddToCart}
      className={`mt-3 mb-6 md:mb-4 border px-5 py-3 md:px-4 md:py-2 text-base md:text-sm font-medium font-[system-ui] cursor-pointer transition-all duration-300 transform ${
        added
          ? "bg-green-600 border-green-600 text-white scale-105"
          : "border-black bg-white text-black hover:bg-zinc-100"
      }`}
    >
      <span className="flex items-center justify-center gap-1.5">
        {added && <Check className="w-4 h-4 animate-[bounce_0.5s_ease-in-out]" />}
        {added ? "Tillagd!" : "Lägg i varukorg"}
      </span>
    </button>
  );
}
