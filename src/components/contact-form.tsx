"use client";

import { useState, useTransition } from "react";
import { sendContactEmail } from "@/app/kontakt/actions/contact";

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    startTransition(async () => {
      const result = await sendContactEmail(data);
      if (result.success) {
        setSent(true);
      } else {
        setError(result.error || "Något gick fel");
      }
    });
  };

  if (sent) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-green-800 mb-2">Tack för ditt meddelande!</h2>
        <p className="text-green-700">Vi återkommer så snart vi kan.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-zinc-700 mb-1">
          Namn
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full border border-zinc-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full border border-zinc-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-zinc-700 mb-1">
          Meddelande
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full border border-zinc-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent resize-none"
        />
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-black text-white py-3 font-medium hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Skickar..." : "Skicka meddelande"}
      </button>
    </form>
  );
}
