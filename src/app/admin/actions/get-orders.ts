"use server";

import { db } from "@/db";
import { orders, orderItems, orderActivities } from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";

export type OrderWithDetails = {
  id: number;
  orderNumber: string | null;
  email: string;
  status: string | null;
  total: string | null;
  shippingFirstName: string | null;
  shippingLastName: string | null;
  shippingAddress: string | null;
  shippingPostalCode: string | null;
  shippingCity: string | null;
  createdAt: Date | null;
  items: {
    id: number;
    name: string;
    quantity: number;
    price: string;
  }[];
  activities: {
    id: number;
    action: string;
    details: string | null;
    createdAt: Date | null;
  }[];
};

export async function getOrders(offset: number = 0, limit: number = 50) {
  const allOrders = await db
    .select()
    .from(orders)
    .orderBy(desc(orders.createdAt))
    .limit(limit)
    .offset(offset);

  const ordersWithItems: OrderWithDetails[] = await Promise.all(
    allOrders.map(async (order) => {
      const items = await db.select().from(orderItems).where(eq(orderItems.orderId, order.id));
      const activities = await db
        .select()
        .from(orderActivities)
        .where(eq(orderActivities.orderId, order.id))
        .orderBy(desc(orderActivities.createdAt));
      return {
        id: order.id,
        orderNumber: order.orderNumber,
        email: order.email,
        status: order.status,
        total: order.total,
        shippingFirstName: order.shippingFirstName,
        shippingLastName: order.shippingLastName,
        shippingAddress: order.shippingAddress,
        shippingPostalCode: order.shippingPostalCode,
        shippingCity: order.shippingCity,
        createdAt: order.createdAt,
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        activities: activities.map((activity) => ({
          id: activity.id,
          action: activity.action,
          details: activity.details,
          createdAt: activity.createdAt,
        })),
      };
    }),
  );

  return ordersWithItems;
}

export async function getTotalOrderCount() {
  const result = await db.select({ count: sql<number>`count(*)` }).from(orders);
  return Number(result[0].count);
}
