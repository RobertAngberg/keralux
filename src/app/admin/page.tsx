import { LogoutButton } from "./logout-button";
import { OrderList } from "./order-list";
import { getOrders, getTotalOrderCount } from "./actions/get-orders";
import Link from "next/link";

export default async function AdminPage() {
  const [initialOrders, totalCount] = await Promise.all([
    getOrders(0, 50),
    getTotalOrderCount(),
  ]);

  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-stone-800">Ordrar</h1>
          <p className="text-base text-stone-500 mt-1">{totalCount} ordrar totalt</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/admin/stats"
            className="px-4 py-2 text-sm font-medium rounded-md border border-zinc-400 bg-white text-zinc-700 shadow hover:bg-zinc-50 hover:border-zinc-500 transition-colors"
          >
            Statistik
          </Link>
          <LogoutButton />
        </div>
      </div>

      <OrderList initialOrders={initialOrders} totalCount={totalCount} />
    </div>
  );
}
