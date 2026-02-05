import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = "KeraLux <send@keralux.se>";

type OrderItem = {
  name: string;
  price: string;
  quantity: number;
};

type OrderData = {
  orderNumber: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  items: OrderItem[];
  total: string;
};

export async function sendOrderConfirmation(order: OrderData) {
  const itemsHtml = order.items
    .map(
      (item) =>
        `<tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">${item.price} kr</td>
        </tr>`,
    )
    .join("");

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #000; color: #fff; padding: 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">KeraLux</h1>
      </div>
      
      <div style="padding: 30px; background: #fff;">
        <h2 style="color: #333; margin-top: 0;">Tack för din beställning!</h2>
        
        <p style="color: #666;">Hej ${order.firstName},</p>
        
        <p style="color: #666;">Vi har mottagit din beställning och kommer att skicka den så snart betalningen är registrerad.</p>
        
        <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <strong>Ordernummer:</strong> ${order.orderNumber}
        </div>
        
        <h3 style="color: #333; border-bottom: 2px solid #000; padding-bottom: 10px;">Din beställning</h3>
        
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th style="padding: 8px; text-align: left; border-bottom: 2px solid #000;">Produkt</th>
              <th style="padding: 8px; text-align: center; border-bottom: 2px solid #000;">Antal</th>
              <th style="padding: 8px; text-align: right; border-bottom: 2px solid #000;">Pris</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" style="padding: 12px 8px; text-align: right; font-weight: bold;">Totalt:</td>
              <td style="padding: 12px 8px; text-align: right; font-weight: bold;">${order.total} kr</td>
            </tr>
          </tfoot>
        </table>
        
        <div style="background: #fffbeb; border: 1px solid #fbbf24; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h4 style="margin: 0 0 10px 0; color: #92400e;">Betalningsinformation</h4>
          <p style="margin: 0; color: #92400e;">
            <strong>Bankgiro:</strong> 291-3242<br>
            <strong>Belopp:</strong> ${order.total} kr<br>
            <strong>Meddelande:</strong> ${order.orderNumber}<br>
            <strong>Betalningsvillkor:</strong> 14 dagar från beställning
          </p>
        </div>
        
        <h3 style="color: #333; border-bottom: 2px solid #000; padding-bottom: 10px; margin-top: 30px;">Leveransadress</h3>
        
        <p style="color: #666; line-height: 1.6;">
          ${order.firstName} ${order.lastName}<br>
          ${order.address}<br>
          ${order.postalCode} ${order.city}
        </p>
        
        <p style="color: #666; margin-top: 30px;">
          Har du frågor? Svara på detta mail så hjälper vi dig!
        </p>
      </div>
      
      <div style="background: #f5f5f5; padding: 20px; text-align: center; color: #999; font-size: 12px;">
        <p>© 2026 KeraLux. Alla rättigheter förbehållna.</p>
      </div>
    </div>
  `;

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: order.email,
    subject: `Orderbekräftelse - ${order.orderNumber}`,
    html,
  });

  if (error) {
    console.error("Email error:", error);
    throw error;
  }

  return data;
}

export async function sendReminderEmail(order: {
  orderNumber: string;
  email: string;
  firstName: string;
  total: string;
}) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #000; color: #fff; padding: 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">KeraLux</h1>
      </div>
      
      <div style="padding: 30px; background: #fff;">
        <h2 style="color: #333; margin-top: 0;">Påminnelse om betalning</h2>
        
        <p style="color: #666;">Hej ${order.firstName},</p>
        
        <p style="color: #666;">
          Vi vill påminna dig om din beställning som ännu inte är betald.
        </p>
        
        <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <strong>Ordernummer:</strong> ${order.orderNumber}<br>
          <strong>Belopp:</strong> ${order.total} kr
        </div>
        
        <div style="background: #fffbeb; border: 1px solid #fbbf24; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h4 style="margin: 0 0 10px 0; color: #92400e;">Betalningsinformation</h4>
          <p style="margin: 0; color: #92400e;">
            <strong>Bankgiro:</strong> 291-3242<br>
            <strong>Belopp:</strong> ${order.total} kr<br>
            <strong>Meddelande:</strong> ${order.orderNumber}<br>
            <strong>Betalningsvillkor:</strong> 14 dagar från beställning
          </p>
        </div>
        
        <p style="color: #666;">
          Vänligen slutför din betalning så snart som möjligt.
        </p>
        
        <p style="color: #666; margin-top: 30px;">
          Har du redan betalat? Ignorera då detta mail. Har du frågor? Svara på detta mail så hjälper vi dig!
        </p>
      </div>
      
      <div style="background: #f5f5f5; padding: 20px; text-align: center; color: #999; font-size: 12px;">
        <p>© 2026 KeraLux. Alla rättigheter förbehållna.</p>
      </div>
    </div>
  `;

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: order.email,
    subject: `Betalningspåminnelse - ${order.orderNumber}`,
    html,
  });

  if (error) {
    console.error("Email error:", error);
    throw error;
  }

  return data;
}

export async function sendInkassoEmail(order: {
  orderNumber: string;
  email: string;
  firstName: string;
  total: string;
}) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #000; color: #fff; padding: 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">KeraLux</h1>
      </div>
      
      <div style="padding: 30px; background: #fff;">
        <h2 style="color: #333; margin-top: 0;">Sista påminnelsen</h2>
        
        <p style="color: #666;">Hej ${order.firstName},</p>
        
        <p style="color: #666;">
          Trots tidigare påminnelser har vi ännu inte mottagit betalning för din beställning. 
          Om betalning inte inkommer inom 7 dagar kommer ärendet att överlämnas till inkasso.
        </p>
        
        <div style="background: #fffbeb; border: 1px solid #fbbf24; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h4 style="margin: 0 0 10px 0; color: #92400e;">Betalningsinformation</h4>
          <p style="margin: 0; color: #92400e;">
            <strong>Bankgiro:</strong> 291-3242<br>
            <strong>Belopp:</strong> ${order.total} kr<br>
            <strong>Meddelande:</strong> ${order.orderNumber}
          </p>
        </div>
        
        <p style="color: #666;">
          Vänligen betala omgående för att undvika inkassokostnader.
        </p>
        
        <p style="color: #666; margin-top: 30px;">
          Har du redan betalat? Du kan då bortse från denna påminnelse. Har du frågor? Svara på detta mail.
        </p>
      </div>
      
      <div style="background: #f5f5f5; padding: 20px; text-align: center; color: #999; font-size: 12px;">
        <p>© 2026 KeraLux. Alla rättigheter förbehållna.</p>
      </div>
    </div>
  `;

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: order.email,
    subject: `Sista påminnelse - ${order.orderNumber}`,
    html,
  });

  if (error) {
    console.error("Email error:", error);
    throw error;
  }

  return data;
}
