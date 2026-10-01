import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from './AdminLayout';

function StatCard({ icon, label, value, change, color }) {
  return (
    <div className="admin-stat-card" style={{ '--stat-color': color }}>
      <div className="admin-stat-card__icon">{icon}</div>
      <div className="admin-stat-card__body">
        <div className="admin-stat-card__value">{value}</div>
        <div className="admin-stat-card__label">{label}</div>
        {change && <div className={`admin-stat-card__change ${change > 0 ? 'up' : 'down'}`}>
          {change > 0 ? '↑' : '↓'} {Math.abs(change)}% this month
        </div>}
      </div>
    </div>
  );
}

function MiniBarChart({ data, color }) {
  const max = Math.max(...data);
  return (
    <div className="mini-bar-chart">
      {data.map((v, i) => (
        <div key={i} className="mini-bar-chart__bar-wrap">
          <div className="mini-bar-chart__bar" style={{ height: `${(v / max) * 100}%`, background: color }} />
        </div>
      ))}
    </div>
  );
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
const REVENUE = [12000, 19000, 15000, 22000, 18000, 28000, 24000, 31000, 27000, 35000];
const ORDERS  = [8, 14, 11, 17, 13, 22, 19, 24, 21, 28];

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem('pakiza_products') || '[]'));
    setCustomers(JSON.parse(localStorage.getItem('pakiza_users') || '[]'));
  }, []);

  const totalRevenue = REVENUE.reduce((a, b) => a + b, 0);

  const recentProducts = [...products].reverse().slice(0, 5);

  return (
    <AdminLayout>
      <div className="admin-dashboard">
        <div className="admin-page-header">
          <div>
            <h2 className="admin-page-title">Dashboard</h2>
            <p className="admin-page-sub">Welcome to your command center</p>
          </div>
          <Link to="/admin/add-product" className="admin-btn-primary" id="dash-add-product-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add Product
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="admin-stats-grid">
          <StatCard
            color="#C9A84C"
            value={`$${(totalRevenue / 1000).toFixed(0)}K`}
            label="Total Revenue"
            change={12}
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>}
          />
          <StatCard
            color="#7B61FF"
            value={products.length}
            label="Total Products"
            change={products.length > 0 ? 8 : 0}
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>}
          />
          <StatCard
            color="#00C9A7"
            value={ORDERS.reduce((a, b) => a + b, 0)}
            label="Total Orders"
            change={15}
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>}
          />
          <StatCard
            color="#FF6B6B"
            value={customers.length}
            label="Customers"
            change={customers.length > 0 ? 6 : 0}
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
            </svg>}
          />
        </div>

        {/* Charts Row */}
        <div className="admin-charts-row">
          {/* Revenue Chart */}
          <div className="admin-chart-card">
            <div className="admin-chart-card__header">
              <div>
                <h3 className="admin-chart-card__title">Revenue Overview</h3>
                <p className="admin-chart-card__sub">Last 10 months</p>
              </div>
              <div className="admin-chart-card__badge" style={{ color: '#C9A84C' }}>+12% ↑</div>
            </div>
            <div className="admin-revenue-chart">
              {REVENUE.map((v, i) => {
                const max = Math.max(...REVENUE);
                const pct = (v / max) * 100;
                return (
                  <div key={i} className="admin-revenue-chart__col">
                    <div className="admin-revenue-chart__tooltip">${(v/1000).toFixed(0)}K</div>
                    <div className="admin-revenue-chart__bar-wrap">
                      <div
                        className="admin-revenue-chart__bar"
                        style={{ height: `${pct}%` }}
                      />
                    </div>
                    <span className="admin-revenue-chart__label">{MONTHS[i]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Orders Chart */}
          <div className="admin-chart-card admin-chart-card--sm">
            <div className="admin-chart-card__header">
              <div>
                <h3 className="admin-chart-card__title">Orders</h3>
                <p className="admin-chart-card__sub">Monthly trend</p>
              </div>
              <div className="admin-chart-card__badge" style={{ color: '#00C9A7' }}>+15% ↑</div>
            </div>
            <div className="admin-mini-chart">
              <MiniBarChart data={ORDERS} color="#00C9A7" />
            </div>
            <div className="admin-chart-labels">
              {MONTHS.map(m => <span key={m}>{m}</span>)}
            </div>

            {/* Quick stats */}
            <div className="admin-quick-stats">
              <div className="admin-quick-stat">
                <span className="admin-quick-stat__val">28</span>
                <span className="admin-quick-stat__label">This Month</span>
              </div>
              <div className="admin-quick-stat">
                <span className="admin-quick-stat__val">177</span>
                <span className="admin-quick-stat__label">Total</span>
              </div>
              <div className="admin-quick-stat">
                <span className="admin-quick-stat__val">$1.9K</span>
                <span className="admin-quick-stat__label">Avg. Value</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="admin-bottom-row">
          {/* Recent Products */}
          <div className="admin-table-card">
            <div className="admin-table-card__header">
              <h3 className="admin-chart-card__title">Recent Products</h3>
              <Link to="/admin/products" className="admin-table-card__link" id="view-all-products-link">View All →</Link>
            </div>
            {recentProducts.length === 0 ? (
              <div className="admin-empty-state">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="1.5">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                </svg>
                <p>No products yet. <Link to="/admin/add-product" id="empty-add-product-link">Add your first product →</Link></p>
              </div>
            ) : (
              <div className="admin-product-list">
                {recentProducts.map((p, i) => (
                  <div key={p.id || i} className="admin-product-row">
                    <div className="admin-product-row__thumb">
                      {p.images?.[0]
                        ? <img src={p.images[0]} alt={p.name} />
                        : <div className="admin-product-row__placeholder">🏺</div>
                      }
                    </div>
                    <div className="admin-product-row__info">
                      <span className="admin-product-row__name">{p.name}</span>
                      <span className="admin-product-row__cat">{p.category}</span>
                    </div>
                    <div className="admin-product-row__price">${p.price}</div>
                    <div className={`admin-product-row__status ${p.inStock ? 'in' : 'out'}`}>
                      {p.inStock ? 'In Stock' : 'Out of Stock'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Top Categories */}
          <div className="admin-chart-card admin-chart-card--sm">
            <div className="admin-chart-card__header">
              <h3 className="admin-chart-card__title">Top Categories</h3>
            </div>
            <div className="admin-category-list">
              {[
                { name: 'Persian', pct: 38, color: '#C9A84C' },
                { name: 'Contemporary', pct: 28, color: '#7B61FF' },
                { name: 'Kilim', pct: 20, color: '#00C9A7' },
                { name: 'Moroccan', pct: 14, color: '#FF6B6B' },
              ].map(cat => (
                <div key={cat.name} className="admin-category-row">
                  <div className="admin-category-row__top">
                    <span className="admin-category-row__name">{cat.name}</span>
                    <span className="admin-category-row__pct">{cat.pct}%</span>
                  </div>
                  <div className="admin-category-row__track">
                    <div className="admin-category-row__fill"
                      style={{ width: `${cat.pct}%`, background: cat.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
