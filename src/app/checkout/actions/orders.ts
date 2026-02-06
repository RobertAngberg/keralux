"use server";

import { db } from "@/db";
import { orders, orderItems } from "@/db/schema";
import { sendOrderConfirmation } from "@/lib/email";

type CheckoutData = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  items: Array<{ name: string; price: number; quantity: number }>;
  total: number;
};

export async function createOrder(data: CheckoutData) {
  try {
    const orderNumber = Math.floor(10000 + Math.random() * 90000).toString();

    const [order] = await db
      .insert(orders)
      .values({
        orderNumber,
        email: data.email,
        status: "pending",
        subtotal: data.total.toString(),
        total: data.total.toString(),
        shippingFirstName: data.firstName,
        shippingLastName: data.lastName,
        shippingAddress: data.address,
        shippingCity: data.city,
        shippingPostalCode: data.postalCode,
        shippingCountry: "Sverige",
      })
      .returning();

    const items = [];
    for (const item of data.items) {
      await db.insert(orderItems).values({
        orderId: order.id,
        name: item.name,
        price: item.price.toString(),
        quantity: item.quantity,
      });
      items.push({
        name: item.name,
        price: item.price.toString(),
        quantity: item.quantity,
      });
    }

    try {
      await sendOrderConfirmation({
        orderNumber,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        city: data.city,
        postalCode: data.postalCode,
        items,
        total: data.total.toString(),
      });
    } catch (emailError) {
      console.error("Email error:", emailError);
    }

    return { success: true, orderNumber, orderId: order.id };
  } catch (error) {
    console.error("Create order error:", error);
    return { success: false, error: "Kunde inte skapa order" };
  }
}
