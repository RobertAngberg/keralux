"use server";

import { db } from "@/db";
import { orders, orderItems, orderActivities } from "@/db/schema";
import { eq } from "drizzle-orm";
import { sendReminderEmail, sendInkassoEmail } from "@/lib/email";
import { revalidatePath } from "next/cache";

const statusLabels: Record<string, string> = {
  pending: "Väntande",
  shipped: "Skickad",
  reminder1: "E-påminn",
  reminder2: "Påminnelse",
  inkasso: "Inkasso",
  debt: "Skuld",
  completed: "Färdig",
};

export type OrderStatus =
  | "pending"
  | "shipped"
  | "completed"
  | "debt"
  | "reminder1"
  | "reminder2"
  | "inkasso";

export async function updateOrderStatus(orderId: number, status: OrderStatus) {
  try {
    const [order] = await db.select().from(orders).where(eq(orders.id, orderId));
    const oldStatus = order?.status || "pending";

    await db.update(orders).set({ status, updatedAt: new Date() }).where(eq(orders.id, orderId));

    await db.insert(orderActivities).values({
      orderId,
      action: "status_change",
      details: `${statusLabels[oldStatus]} → ${statusLabels[status]}`,
    });

    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Update order error:", error);
    return { success: false, error: "Kunde inte uppdatera order" };
  }
}

export async function deleteOrder(orderId: number) {
  try {
    await db.delete(orderItems).where(eq(orderItems.orderId, orderId));
    await db.delete(orderActivities).where(eq(orderActivities.orderId, orderId));
    await db.delete(orders).where(eq(orders.id, orderId));

    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Delete order error:", error);
    return { success: false, error: "Kunde inte radera order" };
  }
}

export async function sendOrderEmail(orderId: number, type: "reminder" | "final") {
  try {
    const [order] = await db.select().from(orders).where(eq(orders.id, orderId));

    if (!order) {
      return { success: false, error: "Order hittades inte" };
    }

    const emailData = {
      orderNumber: order.orderNumber,
      email: order.email,
      firstName: order.shippingFirstName || "Kund",
      total: order.total,
    };

    let message: string;
    let details: string;

    if (type === "final") {
      await sendInkassoEmail(emailData);
      message = `Sista påminnelse skickad till ${order.email}`;
      details = `Sista påminnelse (inkassovarning) skickad till ${order.email}`;
    } else {
      await sendReminderEmail(emailData);
      message = `Påminnelse skickad till ${order.email}`;
      details = `Påminnelse skickad till ${order.email}`;
    }

    await db.insert(orderActivities).values({
      orderId,
      action: "email_sent",
      details,
    });

    revalidatePath("/admin");
    return { success: true, message };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, error: "Kunde inte skicka email" };
  }
}
