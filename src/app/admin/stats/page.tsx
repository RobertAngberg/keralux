import { OrderChart } from "./order-chart";
import Link from "next/link";

export default function StatsPage() {
  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900">Statistik</h1>
          <p className="text-sm text-zinc-500 mt-1">Översikt över ordrar</p>
        </div>
        <Link
          href="/admin"
          className="px-4 py-2 text-sm font-medium rounded-md border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 transition-colors"
        >
          ← Tillbaka
        </Link>
      </div>

      <OrderChart />
    </div>
  );
}
