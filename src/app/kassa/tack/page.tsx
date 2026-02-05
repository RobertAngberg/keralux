import Link from "next/link";
import { Check } from "lucide-react";

export default function TackPage() {
  return (
    <div className="container mx-auto px-6 py-6 md:py-10 text-center max-w-2xl">
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <Check className="w-10 h-10 text-green-600" />
        </div>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-zinc-800 mb-4">
        Tack för din beställning!
      </h1>

      <p className="text-lg text-zinc-600 mb-2">
        Vi har tagit emot din order och skickar en bekräftelse till din e-post.
      </p>

      <p className="text-zinc-500 mb-8">
        Din beställning behandlas och skickas inom 1-2 arbetsdagar.
      </p>

      <Link
        href="/butik"
        className="inline-block bg-black text-white px-8 py-3 font-medium hover:bg-zinc-800 transition-colors"
      >
        Fortsätt handla
      </Link>
    </div>
  );
}
