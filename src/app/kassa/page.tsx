"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createOrder } from "@/app/checkout/actions/orders";

export default function KassaPage() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    try {
      const result = await createOrder({
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        email: formData.get("email") as string,
        address: formData.get("address") as string,
        postalCode: formData.get("postalCode") as string,
        city: formData.get("city") as string,
        items: items,
        total: totalPrice,
      });

      if (result.success) {
        clearCart();
        router.push("/kassa/tack");
      } else {
        alert("Något gick fel. Försök igen.");
        setIsSubmitting(false);
      }
    } catch {
      alert("Något gick fel. Försök igen.");
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-6 py-6 md:py-10 text-center">
        <h1 className="text-3xl font-bold mb-4">Kassan</h1>
        <p className="text-zinc-600 mb-8">Din varukorg är tom.</p>
        <Link
          href="/butik"
          className="inline-block bg-black text-white px-8 py-3 font-medium hover:bg-zinc-800 transition-colors"
        >
          Till butiken
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-6 md:py-10 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-zinc-600">Kassa</h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Formulär */}
        <div>
          <h2 className="text-xl font-semibold mb-6">Leveransuppgifter</h2>

          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="on">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-zinc-700 mb-1">
                  Förnamn
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  autoComplete="given-name"
                  required
                  className="w-full border border-zinc-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-zinc-700 mb-1">
                  Efternamn
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  autoComplete="family-name"
                  required
                  className="w-full border border-zinc-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-1">
                E-post
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                required
                className="w-full border border-zinc-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-zinc-700 mb-1">
                Adress
              </label>
              <input
                type="text"
                id="address"
                name="address"
                autoComplete="street-address"
                required
                className="w-full border border-zinc-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="postalCode"
                  className="block text-sm font-medium text-zinc-700 mb-1"
                >
                  Postnummer
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  autoComplete="postal-code"
                  required
                  className="w-full border border-zinc-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-zinc-700 mb-1">
                  Ort
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  autoComplete="address-level2"
                  required
                  className="w-full border border-zinc-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white py-4 font-medium hover:bg-zinc-800 transition-colors disabled:bg-zinc-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Behandlar...
                  </span>
                ) : (
                  `Slutför köp – ${totalPrice} kr`
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Orderöversikt */}
        <div>
          <h2 className="text-xl font-semibold mb-6">Din beställning</h2>

          <div className="bg-zinc-50 p-6 space-y-4">
            {items.map((item) => (
              <div key={item.slug} className="flex items-center gap-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={60}
                  height={60}
                  className="bg-white"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-zinc-500">Antal: {item.quantity}</p>
                </div>
                <p className="font-medium">{item.price * item.quantity} kr</p>
              </div>
            ))}

            <div className="border-t border-zinc-200 pt-4 mt-4">
              <div className="flex justify-between text-sm text-zinc-600">
                <span>Frakt</span>
                <span>Gratis</span>
              </div>
              <div className="flex justify-between text-lg font-bold mt-2">
                <span>Totalt</span>
                <span>{totalPrice} kr</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
