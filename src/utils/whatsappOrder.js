// Storage keys
const WHATSAPP_KEY = 'pakiza_whatsapp_number';
const ORDERS_KEY = 'pakiza_orders';
export const DEFAULT_WHATSAPP_NUMBER = '917007626680';

export function getWhatsAppNumber() {
  try {
    const custom = localStorage.getItem(WHATSAPP_KEY);
    if (custom && custom.trim()) {
      return custom.replace(/[^0-9]/g, '');
    }
  } catch (e) {
    // fallback
  }
  return DEFAULT_WHATSAPP_NUMBER;
}

export function setWhatsAppNumber(number) {
  try {
    const clean = String(number).replace(/[^0-9]/g, '');
    localStorage.setItem(WHATSAPP_KEY, clean);
    return clean;
  } catch (e) {
    return DEFAULT_WHATSAPP_NUMBER;
  }
}

export function generateOrderId(prefix = 'PAK-WA') {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}-${randomNum}`;
}

export function saveOrderToStorage(orderData) {
  try {
    const existing = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
    const newOrder = {
      orderId: orderData.orderId || generateOrderId(),
      date: orderData.date || new Date().toISOString(),
      source: orderData.source || 'WhatsApp Order',
      customer: orderData.customer || {
        name: 'Guest Customer',
        phone: '',
        contact: '',
        address: ''
      },
      items: orderData.items || [],
      subtotal: orderData.subtotal || orderData.total || 0,
      discountAmount: orderData.discountAmount || 0,
      total: orderData.total || 0,
      paymentMethod: orderData.paymentMethod || 'WhatsApp Direct Order',
      status: orderData.status || 'Confirmed',
      notes: orderData.notes || ''
    };
    existing.unshift(newOrder);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(existing));
    return newOrder;
  } catch (err) {
    console.error('Error saving order to storage', err);
    return null;
  }
}

export function formatWhatsAppOrderMessage({
  orderId,
  customer,
  items = [],
  total = 0,
  paymentMethod = 'WhatsApp Direct Order',
  notes = ''
}) {
  const dateStr = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const itemsList = items.map((i, index) => {
    const name = i.title || i.name || 'Handcrafted Luxury Rug';
    const size = i.size ? `\n   • Size: ${i.size}` : '';
    const color = i.color ? `\n   • Color: ${i.color}` : '';
    const shape = i.shape ? `\n   • Shape: ${i.shape}` : '';
    const qty = i.qty || 1;
    const price = Number(i.price || 0) * qty;
    return `${index + 1}. *${name}*${size}${color}${shape}\n   • Quantity: ${qty} | Price: ₹${price.toLocaleString('en-IN')}`;
  }).join('\n\n');

  const customerName = customer?.name || 'Customer';
  const customerPhone = customer?.phone || customer?.contact || 'N/A';
  const customerAddress = customer?.address || 'To be confirmed on chat';

  let msg = `🌟 *PAKIZA RUGS CO. — NEW ATELIER ORDER* 🌟\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `🏷️ *Order ID:* ${orderId}\n`;
  msg += `📅 *Date:* ${dateStr}\n\n`;

  msg += `👤 *CUSTOMER DETAILS:*\n`;
  msg += `• *Name:* ${customerName}\n`;
  msg += `• *Phone / WhatsApp:* ${customerPhone}\n`;
  msg += `• *Delivery Address:* ${customerAddress}\n\n`;

  msg += `🧶 *ORDERED RUG(S):*\n`;
  msg += `${itemsList}\n\n`;

  msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `💰 *Grand Total:* ₹${Number(total).toLocaleString('en-IN')}.00\n`;
  msg += `🚚 *Shipping:* Complimentary Insured Doorstep Delivery\n`;
  msg += `💳 *Payment Mode:* ${paymentMethod}\n`;

  if (notes && notes.trim()) {
    msg += `📝 *Customer Note:* ${notes.trim()}\n`;
  }

  msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `Please confirm loom weaving schedule, invoice, and tracking details. Thank you!`;

  return msg;
}

export function openWhatsAppOrder({
  orderId,
  customer,
  items,
  total,
  paymentMethod = 'WhatsApp Direct Order',
  notes = ''
}) {
  const finalOrderId = orderId || generateOrderId();

  // Save order to localStorage so admin gets it
  const savedOrder = saveOrderToStorage({
    orderId: finalOrderId,
    customer,
    items,
    total,
    paymentMethod,
    notes,
    source: 'WhatsApp Order',
    status: 'Confirmed'
  });

  const msg = formatWhatsAppOrderMessage({
    orderId: finalOrderId,
    customer,
    items,
    total,
    paymentMethod,
    notes
  });

  const targetNumber = getWhatsAppNumber();
  const url = `https://wa.me/${targetNumber}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');

  return savedOrder;
}

