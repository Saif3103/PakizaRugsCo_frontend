import { useState, useMemo, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { toast } from '../../utils/toast';

const DEFAULT_ORDERS = [
  {
    orderId: 'PAK-WA-849201',
    date: new Date(Date.now() - 3600000 * 2).toISOString(),
    source: 'WhatsApp Order',
    customer: {
      name: 'Dr. Sameer Kapoor',
      phone: '9820145678',
      contact: 'sameer.k@outlook.com',
      address: 'Villa 12, Golf Course Road, DLF Phase 5, Gurgaon, Haryana - 122002'
    },
    items: [
      {
        id: 'prod-leopard-mirage',
        name: 'Leopard Mirage Irregular Hand-Tufted Wool Rug (6 x 9 ft)',
        title: 'Leopard Mirage Irregular Hand-Tufted Wool Rug',
        price: 24999,
        size: '6 x 9 ft',
        color: 'Royal Ivory & Amber',
        shape: 'Irregular',
        qty: 1,
        image: '/product/il_fullxfull.8467535162_lhvi.jpg'
      }
    ],
    subtotal: 24999,
    discountAmount: 0,
    total: 24999,
    paymentMethod: 'WhatsApp Direct (COD Advance)',
    status: 'In Loom / Weaving',
    notes: 'Please share loom progress video before dispatch.'
  },
  {
    orderId: 'PAK-WA-712845',
    date: new Date(Date.now() - 3600000 * 24).toISOString(),
    source: 'WhatsApp Order',
    customer: {
      name: 'Ananya Singhania',
      phone: '9811234567',
      contact: 'ananya.s@gmail.com',
      address: 'Penthouse 4B, Silver Oak, Altamount Road, Mumbai, Maharashtra - 400026'
    },
    items: [
      {
        id: 'prod-midnight-sapphire',
        name: 'Midnight Sapphire & Gold Art Deco Hand-Tufted Wool Rug (8 x 10 ft)',
        title: 'Midnight Sapphire & Gold Art Deco Hand-Tufted Wool Rug',
        price: 38500,
        size: '8 x 10 ft',
        color: 'Deep Sapphire & Gold',
        shape: 'Rectangle',
        qty: 1,
        image: '/product/il_fullxfull.8513069892_g1if.jpg'
      }
    ],
    subtotal: 38500,
    discountAmount: 0,
    total: 38500,
    paymentMethod: 'WhatsApp Direct (UPI)',
    status: 'Confirmed',
    notes: 'Living room centerpiece, urgent delivery requested.'
  },
  {
    orderId: 'PAK-552910',
    date: new Date(Date.now() - 3600000 * 48).toISOString(),
    source: 'Web Checkout',
    customer: {
      name: 'Rajesh & Kavita Mehta',
      phone: '9988776655',
      contact: 'kavita.mehta@yahoo.com',
      address: 'Plot 45, Jubilee Hills, Hyderabad, Telangana - 500033'
    },
    items: [
      {
        id: 'prod-scalloped-aztec',
        name: 'Scalloped Aztec Diamond Geometric Hand-Tufted Wool Rug (5 x 8 ft)',
        title: 'Scalloped Aztec Diamond Geometric Hand-Tufted Wool Rug',
        price: 16499,
        size: '5 x 8 ft',
        color: 'Terracotta Oatmeal',
        shape: 'Scalloped',
        qty: 1,
        image: '/product/il_fullxfull.8470429044_bexe.jpg'
      }
    ],
    subtotal: 16499,
    discountAmount: 1650,
    total: 14849,
    paymentMethod: 'Cash on Delivery (COD)',
    status: 'Shipped',
    notes: 'Call before delivery.'
  }
];

export default function AdminOrders() {
  const [orders, setOrders] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('pakiza_orders') || 'null');
      if (saved && Array.isArray(saved) && saved.length > 0) {
        return saved;
      }
    } catch (e) {
      // fallback
    }
    return DEFAULT_ORDERS;
  });

  const [activeTab, setActiveTab] = useState('all'); // 'all', 'whatsapp', 'weaving', 'shipped', 'delivered'
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Sync back to localStorage whenever orders update
  const saveOrders = (newOrders) => {
    setOrders(newOrders);
    try {
      localStorage.setItem('pakiza_orders', JSON.stringify(newOrders));
    } catch (e) {
      console.warn('Could not save orders', e);
    }
  };

  // Status Colors & Badges
  const STATUS_CONFIG = {
    'Confirmed': { bg: '#e0f2fe', color: '#0369a1', border: '#bae6fd' },
    'In Loom / Weaving': { bg: '#fef3c7', color: '#b45309', border: '#fde68a' },
    'Quality Inspection': { bg: '#f3e8ff', color: '#7e22ce', border: '#e9d5ff' },
    'Shipped': { bg: '#ede9fe', color: '#6d28d9', border: '#ddd6fe' },
    'Delivered': { bg: '#dcfce7', color: '#15803d', border: '#bbf7d0' },
    'Cancelled': { bg: '#fee2e2', color: '#b91c1c', border: '#fecaca' }
  };

  const handleStatusChange = (orderId, newStatus) => {
    const updated = orders.map((o) => {
      if (o.orderId === orderId) {
        return { ...o, status: newStatus };
      }
      return o;
    });
    saveOrders(updated);
    toast(`Order ${orderId} updated to "${newStatus}"`, 'success');
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm(`Are you sure you want to remove order ${orderId}?`)) {
      const updated = orders.filter((o) => o.orderId !== orderId);
      saveOrders(updated);
      toast(`Order ${orderId} removed.`, 'info');
      if (selectedOrder?.orderId === orderId) {
        setSelectedOrder(null);
      }
    }
  };

  const handleWhatsAppCustomer = (order) => {
    const phone = order.customer?.phone || order.customer?.contact || '';
    const cleanPhone = phone.replace(/\D/g, '');
    const phoneWithCountry = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    const name = order.customer?.name || 'Valued Customer';
    const msg = `Hello ${name}! 🌟\n\nThis is Saif Ali from Pakiza Rugs Co. Bhadohi regarding your order #${order.orderId}.\n\nWe are currently preparing your handcrafted rug (${order.items?.[0]?.name || 'Luxury Carpet'}). We wanted to share the current loom progress with you. Please let us know if you have any questions!`;
    window.open(`https://wa.me/${phoneWithCountry}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // Filtered orders list
  const filteredOrders = useMemo(() => {
    let list = [...orders];

    if (activeTab === 'whatsapp') {
      list = list.filter(o =>
        o.source?.toLowerCase().includes('whatsapp') ||
        o.paymentMethod?.toLowerCase().includes('whatsapp') ||
        o.orderId?.includes('PAK-WA')
      );
    } else if (activeTab === 'weaving') {
      list = list.filter(o => o.status === 'In Loom / Weaving');
    } else if (activeTab === 'shipped') {
      list = list.filter(o => o.status === 'Shipped');
    } else if (activeTab === 'delivered') {
      list = list.filter(o => o.status === 'Delivered');
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(o =>
        (o.orderId || '').toLowerCase().includes(q) ||
        (o.customer?.name || '').toLowerCase().includes(q) ||
        (o.customer?.phone || '').includes(q) ||
        (o.customer?.address || '').toLowerCase().includes(q) ||
        (o.items || []).some(i => (i.name || i.title || '').toLowerCase().includes(q))
      );
    }

    return list;
  }, [orders, activeTab, search]);

  // Overall Stats
  const stats = useMemo(() => {
    const totalRevenue = orders.reduce((acc, o) => acc + (Number(o.total) || 0), 0);
    const waCount = orders.filter(o =>
      o.source?.toLowerCase().includes('whatsapp') ||
      o.paymentMethod?.toLowerCase().includes('whatsapp') ||
      o.orderId?.includes('PAK-WA')
    ).length;
    const weavingCount = orders.filter(o => o.status === 'In Loom / Weaving').length;
    return {
      totalOrders: orders.length,
      waCount,
      weavingCount,
      totalRevenue
    };
  }, [orders]);

  return (
    <AdminLayout>
      <div className="admin-orders-page" style={{ padding: '24px 32px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ background: '#25d366', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '100px' }}>
                LIVE ORDERS
              </span>
              <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '26px', margin: 0, color: '#2b0b14', fontWeight: 700 }}>
                Orders &amp; WhatsApp Concierge
              </h1>
            </div>
            <p style={{ color: '#786e64', fontSize: '13.5px', margin: 0 }}>
              Track all customer orders received via WhatsApp Concierge, Website Checkout, and Custom Loom Requests.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={() => {
                const sampleWa = {
                  orderId: `PAK-WA-${Math.floor(100000 + Math.random() * 900000)}`,
                  date: new Date().toISOString(),
                  source: 'WhatsApp Order',
                  customer: {
                    name: 'Karan Mehra',
                    phone: '9876543210',
                    contact: '9876543210',
                    address: 'Flat 302, Palm Springs, Indiranagar, Bengaluru - 560038'
                  },
                  items: [
                    {
                      id: 'prod-leopard-mirage',
                      name: 'Leopard Mirage Irregular Hand-Tufted Wool Rug (5 x 8 ft)',
                      price: 19999,
                      size: '5 x 8 ft',
                      color: 'Ivory Amber',
                      shape: 'Irregular',
                      qty: 1,
                      image: '/product/il_fullxfull.8467535162_lhvi.jpg'
                    }
                  ],
                  subtotal: 19999,
                  discountAmount: 0,
                  total: 19999,
                  paymentMethod: 'WhatsApp Direct (COD)',
                  status: 'Confirmed',
                  notes: 'Urgent weekend delivery'
                };
                saveOrders([sampleWa, ...orders]);
                toast('✦ Test WhatsApp order generated!', 'success');
              }}
              style={{
                background: '#ffffff',
                border: '1px solid #d9d2c5',
                color: '#2b0b14',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              + Create Test Order
            </button>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <div style={{ background: '#ffffff', border: '1px solid #ede7df', borderRadius: '12px', padding: '16px 20px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: '12px', color: '#786e64', textTransform: 'uppercase', fontWeight: 600 }}>Total Orders</div>
            <div style={{ fontSize: '26px', fontWeight: 700, color: '#2b0b14', marginTop: '4px' }}>{stats.totalOrders}</div>
            <div style={{ fontSize: '11.5px', color: '#16a34a', marginTop: '2px' }}>All-time bookings</div>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '16px 20px', boxShadow: '0 2px 8px rgba(37,211,102,0.08)' }}>
            <div style={{ fontSize: '12px', color: '#15803d', textTransform: 'uppercase', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>💬 WhatsApp Orders</span>
            </div>
            <div style={{ fontSize: '26px', fontWeight: 700, color: '#15803d', marginTop: '4px' }}>{stats.waCount}</div>
            <div style={{ fontSize: '11.5px', color: '#16a34a', marginTop: '2px' }}>Direct to atelier phone</div>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #fde68a', borderRadius: '12px', padding: '16px 20px', boxShadow: '0 2px 8px rgba(245,158,11,0.06)' }}>
            <div style={{ fontSize: '12px', color: '#b45309', textTransform: 'uppercase', fontWeight: 600 }}>In Loom / Weaving</div>
            <div style={{ fontSize: '26px', fontWeight: 700, color: '#b45309', marginTop: '4px' }}>{stats.weavingCount}</div>
            <div style={{ fontSize: '11.5px', color: '#b45309', marginTop: '2px' }}>Active artisan work</div>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #ede7df', borderRadius: '12px', padding: '16px 20px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: '12px', color: '#786e64', textTransform: 'uppercase', fontWeight: 600 }}>Order Valuation</div>
            <div style={{ fontSize: '26px', fontWeight: 700, color: '#9d6e3f', marginTop: '4px' }}>
              ₹{stats.totalRevenue.toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '11.5px', color: '#786e64', marginTop: '2px' }}>Total booked value</div>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div style={{ background: '#ffffff', border: '1px solid #ede7df', borderRadius: '12px', padding: '14px 20px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: `All (${orders.length})` },
              { id: 'whatsapp', label: `💬 WhatsApp (${stats.waCount})` },
              { id: 'weaving', label: `In Loom (${stats.weavingCount})` },
              { id: 'shipped', label: 'Shipped' },
              { id: 'delivered', label: 'Delivered' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '7px 14px',
                  borderRadius: '20px',
                  border: activeTab === tab.id ? '1px solid #2b0b14' : '1px solid #e5e0d8',
                  background: activeTab === tab.id ? '#2b0b14' : '#faf8f5',
                  color: activeTab === tab.id ? '#ffffff' : '#4a443d',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', width: '280px' }}>
            <input
              type="text"
              placeholder="Search by ID, customer, city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 14px',
                borderRadius: '8px',
                border: '1px solid #d9d2c5',
                fontSize: '13px',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>

        {/* Orders Table */}
        <div style={{ background: '#ffffff', border: '1px solid #ede7df', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
          {filteredOrders.length === 0 ? (
            <div style={{ padding: '60px 20px', textAlign: 'center', color: '#786e64' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>📦</div>
              <h3 style={{ margin: '0 0 6px', color: '#2b0b14' }}>No orders found</h3>
              <p style={{ margin: 0, fontSize: '13.5px' }}>There are currently no orders matching your selected filter.</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
                <thead>
                  <tr style={{ background: '#faf8f5', borderBottom: '1px solid #ede7df', color: '#786e64', fontSize: '12px', textTransform: 'uppercase' }}>
                    <th style={{ padding: '14px 18px' }}>Order ID</th>
                    <th style={{ padding: '14px 18px' }}>Customer</th>
                    <th style={{ padding: '14px 18px' }}>Rugs &amp; Dimensions</th>
                    <th style={{ padding: '14px 18px' }}>Total Amount</th>
                    <th style={{ padding: '14px 18px' }}>Status</th>
                    <th style={{ padding: '14px 18px' }}>Date</th>
                    <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((o) => {
                    const st = STATUS_CONFIG[o.status] || STATUS_CONFIG['Confirmed'];
                    const isWa = o.source?.toLowerCase().includes('whatsapp') || o.paymentMethod?.toLowerCase().includes('whatsapp') || o.orderId?.includes('PAK-WA');
                    const firstItem = o.items?.[0];

                    return (
                      <tr key={o.orderId} style={{ borderBottom: '1px solid #f3efe8', verticalAlign: 'middle' }}>
                        {/* Order ID & Source Badge */}
                        <td style={{ padding: '14px 18px' }}>
                          <div style={{ fontWeight: 700, color: '#2b0b14' }}>#{o.orderId}</div>
                          {isWa ? (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#dcfce7', color: '#15803d', fontSize: '10.5px', fontWeight: 700, padding: '2px 7px', borderRadius: '4px', marginTop: '4px' }}>
                              💬 WhatsApp Order
                            </span>
                          ) : (
                            <span style={{ display: 'inline-flex', background: '#f1f5f9', color: '#475569', fontSize: '10.5px', fontWeight: 600, padding: '2px 7px', borderRadius: '4px', marginTop: '4px' }}>
                              {o.source || 'Online Order'}
                            </span>
                          )}
                        </td>

                        {/* Customer */}
                        <td style={{ padding: '14px 18px' }}>
                          <div style={{ fontWeight: 600, color: '#1b1816' }}>{o.customer?.name || 'Customer'}</div>
                          <div style={{ fontSize: '12px', color: '#786e64', marginTop: '2px' }}>
                            📞 {o.customer?.phone || o.customer?.contact || 'N/A'}
                          </div>
                          <div style={{ fontSize: '11.5px', color: '#9d9489', marginTop: '2px', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={o.customer?.address}>
                            📍 {o.customer?.address || 'Bhadohi, India'}
                          </div>
                        </td>

                        {/* Rugs */}
                        <td style={{ padding: '14px 18px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            {firstItem?.image && (
                              <img
                                src={firstItem.image}
                                alt=""
                                style={{ width: '42px', height: '42px', borderRadius: '6px', objectFit: 'cover', border: '1px solid #e0d8cc' }}
                              />
                            )}
                            <div>
                              <div style={{ fontWeight: 600, color: '#2b0b14', maxWidth: '240px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {firstItem?.name || firstItem?.title || 'Handcrafted Luxury Rug'}
                              </div>
                              <div style={{ fontSize: '12px', color: '#786e64' }}>
                                {firstItem?.size ? `${firstItem.size} • ` : ''}
                                {firstItem?.color ? `${firstItem.color} • ` : ''}
                                Qty: {firstItem?.qty || 1}
                              </div>
                              {o.items?.length > 1 && (
                                <div style={{ fontSize: '11px', color: '#9d6e3f', fontWeight: 600 }}>
                                  +{o.items.length - 1} more rug(s)
                                </div>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Amount */}
                        <td style={{ padding: '14px 18px' }}>
                          <div style={{ fontWeight: 700, color: '#0c3b2e', fontSize: '14.5px' }}>
                            ₹{Number(o.total || 0).toLocaleString('en-IN')}.00
                          </div>
                          <div style={{ fontSize: '11px', color: '#786e64' }}>
                            {o.paymentMethod || 'Online'}
                          </div>
                        </td>

                        {/* Status Dropdown */}
                        <td style={{ padding: '14px 18px' }}>
                          <select
                            value={o.status || 'Confirmed'}
                            onChange={(e) => handleStatusChange(o.orderId, e.target.value)}
                            style={{
                              background: st.bg,
                              color: st.color,
                              border: `1px solid ${st.border}`,
                              borderRadius: '20px',
                              padding: '4px 10px',
                              fontSize: '12px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              outline: 'none'
                            }}
                          >
                            <option value="Confirmed">Confirmed</option>
                            <option value="In Loom / Weaving">In Loom / Weaving</option>
                            <option value="Quality Inspection">Quality Inspection</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>

                        {/* Date */}
                        <td style={{ padding: '14px 18px', color: '#786e64', fontSize: '12px' }}>
                          {new Date(o.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </td>

                        {/* Actions */}
                        <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                            {/* WhatsApp Customer Button */}
                            <button
                              type="button"
                              onClick={() => handleWhatsAppCustomer(o)}
                              title="Chat with customer on WhatsApp"
                              style={{
                                background: '#25d366',
                                border: 'none',
                                color: '#ffffff',
                                borderRadius: '6px',
                                padding: '6px 10px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                fontSize: '12px',
                                fontWeight: 700,
                                cursor: 'pointer'
                              }}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.77 14.16c-.24.68-1.2 1.25-1.68 1.3-.47.05-1.07.07-3.46-.92-2.88-1.19-4.73-4.14-4.87-4.33-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.09.99-2.37.26-.28.57-.35.76-.35.19 0 .38 0 .55.01.18.01.42-.07.66.5.24.58.82 2.01.9 2.16.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.18-.32.4-.46.54-.15.15-.31.31-.13.62.18.31.79 1.3 1.7 2.11 1.17 1.04 2.15 1.36 2.46 1.51.31.15.49.13.67-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.71-.15.29.11 1.84.87 2.16 1.03.32.16.53.24.61.37.08.13.08.77-.16 1.45z" />
                              </svg>
                              <span>WA Chat</span>
                            </button>

                            {/* View Modal */}
                            <button
                              type="button"
                              onClick={() => setSelectedOrder(o)}
                              title="View full order details"
                              style={{
                                background: '#f5f0ea',
                                border: '1px solid #d9cbbe',
                                color: '#2b0b14',
                                borderRadius: '6px',
                                padding: '6px 10px',
                                fontSize: '12px',
                                fontWeight: 600,
                                cursor: 'pointer'
                              }}
                            >
                              View
                            </button>

                            {/* Delete */}
                            <button
                              type="button"
                              onClick={() => handleDeleteOrder(o.orderId)}
                              title="Delete order"
                              style={{
                                background: '#fef2f2',
                                border: '1px solid #fecaca',
                                color: '#dc2626',
                                borderRadius: '6px',
                                padding: '6px 8px',
                                fontSize: '12px',
                                cursor: 'pointer'
                              }}
                            >
                              ✕
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ── Detailed Order Inspection Modal ── */}
        {selectedOrder && (
          <div
            className="wa-modal-overlay"
            onClick={() => setSelectedOrder(null)}
            style={{ zIndex: 999999 }}
          >
            <div
              className="wa-modal-box"
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: '620px' }}
            >
              <div className="wa-modal-header">
                <div>
                  <span className="wa-modal-badge">
                    ORDER #{selectedOrder.orderId}
                  </span>
                  <h3 className="wa-modal-title">Order Particulars</h3>
                  <p className="wa-modal-sub">
                    Received: {new Date(selectedOrder.date).toLocaleString('en-IN')} &bull; Status: {selectedOrder.status}
                  </p>
                </div>
                <button
                  type="button"
                  className="wa-modal-close-btn"
                  onClick={() => setSelectedOrder(null)}
                >
                  ✕
                </button>
              </div>

              <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Customer Details Box */}
                <div style={{ background: '#faf8f5', border: '1px solid #ede7df', borderRadius: '10px', padding: '14px 18px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#9d6e3f', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Customer &amp; Delivery Destination
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#1b1816' }}>
                    {selectedOrder.customer?.name}
                  </div>
                  <div style={{ fontSize: '13px', color: '#4b5563', marginTop: '4px' }}>
                    📞 Phone: <strong>{selectedOrder.customer?.phone || selectedOrder.customer?.contact}</strong>
                  </div>
                  <div style={{ fontSize: '13px', color: '#4b5563', marginTop: '4px', lineHeight: '1.4' }}>
                    📍 Address: {selectedOrder.customer?.address}
                  </div>
                  {selectedOrder.notes && (
                    <div style={{ fontSize: '12.5px', background: '#fef3c7', padding: '6px 10px', borderRadius: '6px', color: '#b45309', marginTop: '10px' }}>
                      📝 <strong>Note:</strong> {selectedOrder.notes}
                    </div>
                  )}
                </div>

                {/* Items Box */}
                <div style={{ border: '1px solid #ede7df', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ background: '#f5f0ea', padding: '10px 16px', fontSize: '12px', fontWeight: 700, color: '#2b0b14', textTransform: 'uppercase' }}>
                    Ordered Carpets
                  </div>
                  <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {selectedOrder.items?.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: idx < selectedOrder.items.length - 1 ? '1px dashed #e5e0d8' : 'none', paddingBottom: idx < selectedOrder.items.length - 1 ? '10px' : 0 }}>
                        <img
                          src={item.image || '/rugs/cat-irregular.jpg'}
                          alt=""
                          style={{ width: '48px', height: '48px', borderRadius: '6px', objectFit: 'cover' }}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 600, color: '#1b1816', fontSize: '13.5px' }}>{item.name || item.title}</div>
                          <div style={{ fontSize: '12px', color: '#786e64' }}>
                            {item.size ? `Size: ${item.size} • ` : ''}
                            {item.color ? `Color: ${item.color} • ` : ''}
                            Qty: {item.qty || 1}
                          </div>
                        </div>
                        <div style={{ fontWeight: 700, color: '#0c3b2e', fontSize: '14px' }}>
                          ₹{(Number(item.price || 0) * (item.qty || 1)).toLocaleString('en-IN')}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: '#faf8f5', padding: '12px 16px', borderTop: '1px solid #ede7df', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#555' }}>Grand Total Amount:</span>
                    <strong style={{ fontSize: '17px', color: '#0c3b2e' }}>₹{Number(selectedOrder.total || 0).toLocaleString('en-IN')}.00</strong>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                  <button
                    type="button"
                    onClick={() => handleWhatsAppCustomer(selectedOrder)}
                    style={{
                      flex: 1,
                      background: '#25d366',
                      color: '#fff',
                      border: 'none',
                      padding: '12px',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    💬 Message Customer on WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedOrder(null)}
                    style={{
                      padding: '12px 20px',
                      background: '#f1f5f9',
                      color: '#334155',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
