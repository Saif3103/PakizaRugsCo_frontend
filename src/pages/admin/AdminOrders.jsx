import AdminLayout from './AdminLayout';

export default function AdminOrders() {
  const orders = [
    { id: '#ORD-2401', customer: 'Sarah Al-Rashid', product: 'Isfahan Garden Heritage', amount: 4800, status: 'Delivered', date: '2026-09-28' },
    { id: '#ORD-2400', customer: 'James Whitmore', product: 'Emerald Imperial Medallion', amount: 3200, status: 'Shipped', date: '2026-09-27' },
    { id: '#ORD-2399', customer: 'Fatima Al-Hassan', product: 'Ocean Swirl Lagoon', amount: 2800, status: 'Processing', date: '2026-09-26' },
    { id: '#ORD-2398', customer: 'Ahmed Khan', product: 'Persian Grand Royale', amount: 5600, status: 'Delivered', date: '2026-09-24' },
    { id: '#ORD-2397', customer: 'Mei Lin', product: 'Petal Bloom Statement', amount: 3800, status: 'Cancelled', date: '2026-09-22' },
  ];

  const statusColor = { Delivered: '#00C9A7', Shipped: '#7B61FF', Processing: '#C9A84C', Cancelled: '#FF6B6B' };

  return (
    <AdminLayout>
      <div className="admin-orders-page">
        <div className="admin-page-header">
          <div>
            <h2 className="admin-page-title">Orders</h2>
            <p className="admin-page-sub">Manage customer orders</p>
          </div>
        </div>
        <div className="admin-orders-table-wrap">
          <table className="admin-orders-table">
            <thead>
              <tr>
                <th>Order ID</th><th>Customer</th><th>Product</th>
                <th>Amount</th><th>Status</th><th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id}>
                  <td><span className="admin-order-id">{o.id}</span></td>
                  <td>{o.customer}</td>
                  <td className="admin-order-product">{o.product}</td>
                  <td><strong>${o.amount.toLocaleString()}</strong></td>
                  <td>
                    <span className="admin-status-badge" style={{ color: statusColor[o.status], borderColor: statusColor[o.status] }}>
                      {o.status}
                    </span>
                  </td>
                  <td style={{ color: 'rgba(255,255,255,0.5)' }}>{o.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
