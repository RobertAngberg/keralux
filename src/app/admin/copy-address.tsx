"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyAddressProps {
  name: string;
  address: string;
  postalCode: string;
  city: string;
}

export function CopyAddress({ name, address, postalCode, city }: CopyAddressProps) {
  const [copied, setCopied] = useState(false);

  const fullAddress = `${name}\n${address}\n${postalCode} ${city}`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(fullAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Kunde inte kopiera:", err);
    }
  }

  return (
    <div className="space-y-2">
      <div className="text-base text-stone-800">
        {address}, {postalCode} {city}
      </div>
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md border border-zinc-400 bg-white text-zinc-700 hover:bg-zinc-50 hover:border-zinc-500 transition-colors"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-green-500" />
            Kopierad!
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            Kopiera adress
          </>
        )}
      </button>
    </div>
  );
}
