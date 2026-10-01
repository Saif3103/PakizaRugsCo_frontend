import { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    setCustomers(JSON.parse(localStorage.getItem('pakiza_users') || '[]'));
  }, []);

  const sample = [
    { name: 'Sarah Al-Rashid', email: 'sarah@example.com', orders: 4, spent: 14200, joined: '2026-03-12' },
    { name: 'James Whitmore', email: 'james@example.com', orders: 2, spent: 8800, joined: '2026-05-08' },
    { name: 'Fatima Al-Hassan', email: 'fatima@example.com', orders: 3, spent: 9600, joined: '2026-06-20' },
    { name: 'Ahmed Khan', email: 'ahmed@example.com', orders: 1, spent: 5600, joined: '2026-08-15' },
  ];

  const allCustomers = [
    ...sample,
    ...customers.map(c => ({
      name: c.name, email: c.email, orders: 0, spent: 0,
      joined: c.createdAt ? new Date(c.createdAt).toISOString().split('T')[0] : 'N/A'
    }))
  ];

  return (
    <AdminLayout>
      <div className="admin-orders-page">
        <div className="admin-page-header">
          <div>
            <h2 className="admin-page-title">Customers</h2>
            <p className="admin-page-sub">{allCustomers.length} registered customers</p>
          </div>
        </div>
        <div className="admin-orders-table-wrap">
          <table className="admin-orders-table">
            <thead>
              <tr><th>Customer</th><th>Email</th><th>Orders</th><th>Total Spent</th><th>Joined</th></tr>
            </thead>
            <tbody>
              {allCustomers.map((c, i) => (
                <tr key={i}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div className="admin-sidebar__avatar" style={{ width: 32, height: 32, fontSize: 12 }}>
                        {c.name.slice(0,2).toUpperCase()}
                      </div>
                      {c.name}
                    </div>
                  </td>
                  <td style={{ color: 'rgba(255,255,255,0.6)' }}>{c.email}</td>
                  <td>{c.orders}</td>
                  <td><strong>${c.spent.toLocaleString()}</strong></td>
                  <td style={{ color: 'rgba(255,255,255,0.5)' }}>{c.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
