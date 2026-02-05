"use client";

import { useState, useTransition } from "react";
import { OrderRowActions } from "./order-row-actions";
import { CopyAddress } from "./copy-address";
import { getOrders, type OrderWithDetails } from "./actions/get-orders";

const statusMap: Record<string, string> = {
  pending: "Väntande",
  shipped: "Skickad",
  reminder1: "E-påminn",
  reminder2: "Påminnelse",
  inkasso: "Inkasso",
  debt: "Skuld",
  completed: "Färdig",
};

function formatDateTime(date: Date | null) {
  if (!date) return "";
  const d = new Date(date);
  const day = d.getDate();
  const months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "maj",
    "jun",
    "jul",
    "aug",
    "sep",
    "okt",
    "nov",
    "dec",
  ];
  const month = months[d.getMonth()];
  const hours = d.getHours().toString().padStart(2, "0");
  const minutes = d.getMinutes().toString().padStart(2, "0");
  return `${day} ${month} ${hours}:${minutes}`;
}

function formatDate(date: Date | null) {
  if (!date) return "";
  const d = new Date(date);
  return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
}

type OrderListProps = {
  initialOrders: OrderWithDetails[];
  totalCount: number;
};

export function OrderList({ initialOrders, totalCount }: OrderListProps) {
  const [orders, setOrders] = useState<OrderWithDetails[]>(initialOrders);
  const [isPending, startTransition] = useTransition();
  const [hasMore, setHasMore] = useState(initialOrders.length < totalCount);

  const loadMore = () => {
    startTransition(async () => {
      const moreOrders = await getOrders(orders.length, 50);
      if (moreOrders.length === 0) {
        setHasMore(false);
      } else {
        setOrders([...orders, ...moreOrders]);
        if (orders.length + moreOrders.length >= totalCount) {
          setHasMore(false);
        }
      }
    });
  };

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-zinc-200 text-center py-16 text-zinc-500">
        <p className="font-medium">Inga ordrar ännu</p>
        <p className="text-sm mt-1">Ordrar visas här när kunder handlar.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3" suppressHydrationWarning>
      {orders.map((order) => {
        const status = statusMap[order.status || "pending"];
        return (
          <div
            key={order.id}
            className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow"
            style={{ border: "1px solid #d4af37" }}
            suppressHydrationWarning
          >
            <div className="space-y-3 mb-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold text-stone-800">#{order.orderNumber}</span>
                  <span className="text-stone-400">{formatDate(order.createdAt)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold text-stone-800">
                    {Math.round(Number(order.total))} kr
                  </span>
                  <span
                    className="text-sm font-medium px-2.5 py-1 rounded-full border"
                    style={{
                      backgroundColor: "#fef9e7",
                      color: "#a38829",
                      borderColor: "#d4af37",
                    }}
                  >
                    {status}
                  </span>
                </div>
              </div>
              <div className="text-base">
                <span className="font-medium text-stone-700">
                  {order.shippingFirstName} {order.shippingLastName}
                </span>
                <span className="text-stone-300 mx-2">•</span>
                <span className="text-stone-500">{order.email}</span>
              </div>
              <CopyAddress
                name={`${order.shippingFirstName} ${order.shippingLastName}`}
                address={order.shippingAddress || ""}
                postalCode={order.shippingPostalCode || ""}
                city={order.shippingCity || ""}
              />
              <div
                className="text-base text-stone-600 pt-3"
                style={{ borderTop: "1px solid #d4af37" }}
              >
                {order.items.map((item, i) => (
                  <span key={item.id}>
                    {item.quantity}× {item.name}
                    {i < order.items.length - 1 && <span className="text-stone-300 mx-2">•</span>}
                  </span>
                ))}
              </div>
              {order.activities.length > 0 && (
                <div
                  className="text-sm text-stone-400 pt-3 space-y-1"
                  style={{ borderTop: "1px solid #d4af37" }}
                >
                  <p className="font-medium text-stone-500 mb-2">Historik:</p>
                  {order.activities.slice(0, 5).map((activity) => (
                    <div key={activity.id} className="flex items-center gap-2">
                      <span className="text-stone-400">{formatDateTime(activity.createdAt)}</span>
                      <span className="text-stone-300">•</span>
                      <span className="text-stone-500">{activity.details}</span>
                    </div>
                  ))}
                  {order.activities.length > 5 && (
                    <p className="text-zinc-400 italic">+{order.activities.length - 5} fler...</p>
                  )}
                </div>
              )}
            </div>
            <OrderRowActions orderId={order.id} currentStatus={order.status || "pending"} />
          </div>
        );
      })}

      {hasMore && (
        <div className="flex justify-center pt-4">
          <button
            onClick={loadMore}
            disabled={isPending}
            className="px-6 py-3 text-sm font-medium rounded-md border border-zinc-400 bg-white text-zinc-700 shadow hover:bg-zinc-50 hover:border-zinc-500 transition-colors disabled:opacity-50"
          >
            {isPending ? "Laddar..." : `Ladda fler ordrar (${totalCount - orders.length} kvar)`}
          </button>
        </div>
      )}
    </div>
  );
}
