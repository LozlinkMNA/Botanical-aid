import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const ses = new SESClient({
  region: process.env.AWS_SES_REGION ?? 'ap-southeast-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
  },
});

const fromEmail = process.env.SES_FROM_EMAIL ?? 'orders@botanicalaid.com.au';
const businessEmail = process.env.BUSINESS_EMAIL ?? 'info@botanicalaid.com.au';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderDetails {
  orderId: string;
  items: OrderItem[];
  total: number;
  customerName: string;
}

export async function sendOrderConfirmationEmail(
  to: string,
  orderDetails: OrderDetails
): Promise<void> {
  const itemRows = orderDetails.items
    .map(
      (item) =>
        `<tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
        </tr>`
    )
    .join('');

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #7c3aed, #14b8a6); padding: 24px; text-align: center;">
        <h1 style="color: white; margin: 0;">Botanical Aid</h1>
      </div>
      <div style="padding: 24px;">
        <h2>Thank you for your order, ${orderDetails.customerName}!</h2>
        <p>Your order <strong>#${orderDetails.orderId}</strong> has been confirmed.</p>
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
          <thead>
            <tr style="background: #f9fafb;">
              <th style="padding: 8px; text-align: left;">Item</th>
              <th style="padding: 8px; text-align: center;">Qty</th>
              <th style="padding: 8px; text-align: right;">Subtotal</th>
            </tr>
          </thead>
          <tbody>${itemRows}</tbody>
          <tfoot>
            <tr>
              <td colspan="2" style="padding: 12px 8px; font-weight: bold;">Total</td>
              <td style="padding: 12px 8px; text-align: right; font-weight: bold;">$${orderDetails.total.toFixed(2)} AUD</td>
            </tr>
          </tfoot>
        </table>
        <p style="color: #6b7280; font-size: 14px;">
          If you have any questions about your order, please contact us at ${businessEmail}.
        </p>
      </div>
    </div>
  `;

  const command = new SendEmailCommand({
    Source: fromEmail,
    Destination: { ToAddresses: [to] },
    Message: {
      Subject: { Data: `Order Confirmation #${orderDetails.orderId} - Botanical Aid` },
      Body: {
        Html: { Data: html },
        Text: {
          Data: `Thank you for your order, ${orderDetails.customerName}! Order #${orderDetails.orderId}. Total: $${orderDetails.total.toFixed(2)} AUD.`,
        },
      },
    },
  });

  await ses.send(command);
}

export async function sendContactFormEmail(
  name: string,
  email: string,
  subject: string,
  message: string
): Promise<void> {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #7c3aed, #14b8a6); padding: 24px; text-align: center;">
        <h1 style="color: white; margin: 0;">Contact Form Submission</h1>
      </div>
      <div style="padding: 24px;">
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
        <p>${message.replace(/\n/g, '<br />')}</p>
      </div>
    </div>
  `;

  const command = new SendEmailCommand({
    Source: fromEmail,
    Destination: { ToAddresses: [businessEmail] },
    ReplyToAddresses: [email],
    Message: {
      Subject: { Data: `[Contact Form] ${subject}` },
      Body: {
        Html: { Data: html },
        Text: { Data: `From: ${name} (${email})\nSubject: ${subject}\n\n${message}` },
      },
    },
  });

  await ses.send(command);
}
