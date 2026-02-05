"use client";

import { useState, useTransition } from "react";
import { updateOrderStatus, deleteOrder, sendOrderEmail, type OrderStatus } from "./actions/orders";

type OrderRowActionsProps = {
  orderId: number;
  currentStatus: string;
};

const statusButtons: { status: OrderStatus; label: string }[] = [
  { status: "shipped", label: "Skickad" },
  { status: "debt", label: "Skuld" },
  { status: "completed", label: "Färdig" },
];

export function OrderRowActions({ orderId, currentStatus }: OrderRowActionsProps) {
  const [isPending, startTransition] = useTransition();
  const [activeAction, setActiveAction] = useState<string | null>(null);

  const handleUpdateStatus = (status: OrderStatus) => {
    setActiveAction(status);
    startTransition(async () => {
      await updateOrderStatus(orderId, status);
      setActiveAction(null);
    });
  };

  const handleDelete = () => {
    if (!confirm("Är du säker på att du vill radera denna order?")) return;

    setActiveAction("delete");
    startTransition(async () => {
      await deleteOrder(orderId);
      setActiveAction(null);
    });
  };

  const handleSendEmail = (type: "reminder" | "final") => {
    const confirmMsg =
      type === "reminder"
        ? "Skicka påminnelsemail till kunden?"
        : "Skicka SISTA påminnelse (inkassovarning) till kunden?";

    if (!confirm(confirmMsg)) return;

    setActiveAction(type === "reminder" ? "email" : "email-final");
    startTransition(async () => {
      const result = await sendOrderEmail(orderId, type);
      if (result.message) {
        alert(result.message);
      } else if (result.error) {
        alert(result.error);
      }
      setActiveAction(null);
    });
  };

  const isLoading = isPending || activeAction !== null;

  return (
    <div
      className="flex flex-wrap items-center gap-2 pt-4"
      style={{ borderTop: "1px solid #d4af37" }}
    >
      {statusButtons.map((btn) => (
        <button
          key={btn.status}
          onClick={() => handleUpdateStatus(btn.status)}
          disabled={isLoading || currentStatus === btn.status}
          className={`px-4 py-2 text-sm font-medium rounded-md border shadow transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
            currentStatus === btn.status
              ? "bg-zinc-900 text-white border-zinc-900"
              : "bg-white text-zinc-700 border-zinc-400 hover:bg-zinc-50 hover:border-zinc-500"
          }`}
        >
          {activeAction === btn.status ? "..." : btn.label}
        </button>
      ))}

      <div className="ml-auto flex gap-2">
        <button
          onClick={() => handleSendEmail("reminder")}
          disabled={isLoading}
          className="px-4 py-2 text-sm font-medium rounded-md border border-zinc-400 bg-white text-zinc-700 shadow hover:bg-zinc-50 hover:border-zinc-500 transition-colors disabled:opacity-30"
        >
          {activeAction === "email" ? "..." : "Maila påminnelse"}
        </button>
        <button
          onClick={() => handleSendEmail("final")}
          disabled={isLoading}
          className="px-4 py-2 text-sm font-medium rounded-md border border-zinc-400 bg-white text-zinc-700 shadow hover:bg-zinc-50 hover:border-zinc-500 transition-colors disabled:opacity-30"
        >
          {activeAction === "email-final" ? "..." : "Maila sista påminnelse"}
        </button>
        <button
          onClick={handleDelete}
          disabled={isLoading}
          className="px-4 py-2 text-sm font-medium rounded-md border border-zinc-400 bg-white text-zinc-700 shadow hover:bg-zinc-50 hover:border-zinc-500 transition-colors disabled:opacity-30"
        >
          {activeAction === "delete" ? "..." : "Radera"}
        </button>
      </div>
    </div>
  );
}
