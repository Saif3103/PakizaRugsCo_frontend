import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from './AdminLayout';

// Rug thumbnails
import rug1 from '../../assets/celestial-arc-1.jpg';
import rug2 from '../../assets/celestial-arc-2.jpg';
import rug3 from '../../assets/emerald-bloom.jpg';
import rug4 from '../../assets/octopus-rug-1.jpg';
import rug5 from '../../assets/octopus-rug-2.jpg';

const RECENT_ORDERS = [
  {
    id: '#1001',
    customer: 'Ali Khan',
    email: 'ali@example.com',
    product: 'Hand Tufted Rug',
    spec: '8x10 ft',
    image: rug1,
    amount: '$1,299',
    status: 'Processing',
    statusClass: 'adm-status-badge--processing',
    date: '01 Oct 2026'
  },
  {
    id: '#1002',
    customer: 'Sarah M.',
    email: 'sarah@example.com',
    product: 'Oushak Rug',
    spec: '6x9 ft',
    image: rug2,
    amount: '$950',
    status: 'Shipped',
    statusClass: 'adm-status-badge--shipped',
    date: '01 Oct 2026'
  },
  {
    id: '#1003',
    customer: 'Rohit Sharma',
    email: 'rohit@example.com',
    product: 'Custom Rug',
    spec: 'Custom Size',
    image: rug3,
    amount: '$1,750',
    status: 'Pending',
    statusClass: 'adm-status-badge--pending',
    date: '30 Sep 2026'
  },
  {
    id: '#1004',
    customer: 'Ayesha Ansari',
    email: 'ayesha@example.com',
    product: 'Hand Knotted Rug',
    spec: '9x12 ft',
    image: rug4,
    amount: '$2,200',
    status: 'Delivered',
    statusClass: 'adm-status-badge--delivered',
    date: '30 Sep 2026'
  },
  {
    id: '#1005',
    customer: 'David Lee',
    email: 'david@example.com',
    product: 'Modern Rug',
    spec: '5x8 ft',
    image: rug5,
    amount: '$780',
    status: 'Processing',
    statusClass: 'adm-status-badge--processing',
    date: '29 Sep 2026'
  }
];

const TOP_PRODUCTS = [
  {
    rank: 1,
    title: 'Hand Tufted Rug',
    spec: '8x10 ft',
    image: rug1,
    sales: 45,
    revenue: '$58,500'
  },
  {
    rank: 2,
    title: 'Oushak Collection',
    spec: '6x9 ft',
    image: rug2,
    sales: 38,
    revenue: '$36,100'
  },
  {
    rank: 3,
    title: 'Custom Rugs',
    spec: 'Custom Size',
    image: rug3,
    sales: 28,
    revenue: '$42,000'
  },
  {
    rank: 4,
    title: 'Hand Knotted Rug',
    spec: '9x12 ft',
    image: rug4,
    sales: 22,
    revenue: '$48,400'
  },
  {
    rank: 5,
    title: 'Modern Rug',
    spec: '5x8 ft',
    image: rug5,
    sales: 18,
    revenue: '$14,040'
  }
];

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('This Month');

  // Donut chart circumferences and offsets
  // C = 2 * PI * 58 ≈ 364.42
  const C = 364.42;
  const pPending = 0.136 * C;     // 49.56
  const pProc    = 0.237 * C;     // 86.37
  const pShip    = 0.492 * C;     // 179.30
  const pDeliv   = 0.113 * C;     // 41.18
  const pCanc    = 0.022 * C;     // 8.01

  const offPending = 0;
  const offProc    = -pPending;
  const offShip    = -(pPending + pProc);
  const offDeliv   = -(pPending + pProc + pShip);
  const offCanc    = -(pPending + pProc + pShip + pDeliv);

  return (
    <AdminLayout>
      <div className="adm-dashboard-page">
        {/* Header */}
        <div className="adm-dash-header">
          <div>
            <h1 className="adm-dash-title">
              Dashboard <span>👋</span>
            </h1>
            <p className="adm-dash-subtitle">
              Welcome back, Admin! Here&apos;s what&apos;s happening with your store.
            </p>
          </div>

          <button className="adm-date-pill" id="adm-date-range-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <span>Oct 1, 2026 - Oct 31, 2026</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
        </div>

        {/* 4 Stat Cards */}
        <div className="adm-stats-grid">
          {/* Card 1: Total Orders */}
          <div className="adm-stat-card adm-stat-card--orders" id="stat-orders">
            <div className="adm-stat-card__left">
              <div className="adm-stat-card__icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1"/>
                  <circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
              </div>
              <div className="adm-stat-card__info">
                <span className="adm-stat-card__label">Total Orders</span>
                <span className="adm-stat-card__value">177</span>
                <span className="adm-stat-card__trend adm-stat-card__trend--up">
                  ↗ 12% this month
                </span>
              </div>
            </div>
            <div className="adm-stat-card__sparkline">
              <div className="adm-spark-bar" style={{ height: '35%' }}/>
              <div className="adm-spark-bar" style={{ height: '60%' }}/>
              <div className="adm-spark-bar" style={{ height: '45%' }}/>
              <div className="adm-spark-bar" style={{ height: '85%' }}/>
            </div>
          </div>

          {/* Card 2: Total Revenue */}
          <div className="adm-stat-card adm-stat-card--revenue" id="stat-revenue">
            <div className="adm-stat-card__left">
              <div className="adm-stat-card__icon-box">
                <span style={{ fontSize: '20px', fontWeight: '700' }}>₹</span>
              </div>
              <div className="adm-stat-card__info">
                <span className="adm-stat-card__label">Total Revenue</span>
                <span className="adm-stat-card__value">$231K</span>
                <span className="adm-stat-card__trend adm-stat-card__trend--up">
                  ↑ 12% this month
                </span>
              </div>
            </div>
            <div className="adm-stat-card__sparkline">
              <div className="adm-spark-bar" style={{ height: '40%' }}/>
              <div className="adm-spark-bar" style={{ height: '55%' }}/>
              <div className="adm-spark-bar" style={{ height: '70%' }}/>
              <div className="adm-spark-bar" style={{ height: '95%' }}/>
            </div>
          </div>

          {/* Card 3: Total Products */}
          <div className="adm-stat-card adm-stat-card--products" id="stat-products">
            <div className="adm-stat-card__left">
              <div className="adm-stat-card__icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
              </div>
              <div className="adm-stat-card__info">
                <span className="adm-stat-card__label">Total Products</span>
                <span className="adm-stat-card__value">177</span>
                <span className="adm-stat-card__trend adm-stat-card__trend--neutral">
                  → 0% this month
                </span>
              </div>
            </div>
            <div className="adm-stat-card__sparkline">
              <div className="adm-spark-bar" style={{ height: '65%' }}/>
              <div className="adm-spark-bar" style={{ height: '65%' }}/>
              <div className="adm-spark-bar" style={{ height: '65%' }}/>
              <div className="adm-spark-bar" style={{ height: '65%' }}/>
            </div>
          </div>

          {/* Card 4: Total Customers */}
          <div className="adm-stat-card adm-stat-card--customers" id="stat-customers">
            <div className="adm-stat-card__left">
              <div className="adm-stat-card__icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <div className="adm-stat-card__info">
                <span className="adm-stat-card__label">Total Customers</span>
                <span className="adm-stat-card__value">283</span>
                <span className="adm-stat-card__trend adm-stat-card__trend--up">
                  ↗ 18% this month
                </span>
              </div>
            </div>
            <div className="adm-stat-card__sparkline">
              <div className="adm-spark-bar" style={{ height: '30%' }}/>
              <div className="adm-spark-bar" style={{ height: '50%' }}/>
              <div className="adm-spark-bar" style={{ height: '75%' }}/>
              <div className="adm-spark-bar" style={{ height: '90%' }}/>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="adm-charts-grid">
          {/* Sales Overview */}
          <div className="adm-card" id="chart-sales-overview">
            <div className="adm-card__header">
              <h2 className="adm-card__title">Sales Overview</h2>
              <div className="adm-card__actions">
                <div className="adm-legend">
                  <div className="adm-legend__item">
                    <span className="adm-legend__dot" style={{ background: '#541525' }}/>
                    <span>Orders</span>
                  </div>
                  <div className="adm-legend__item">
                    <span className="adm-legend__dot" style={{ background: '#c9933e' }}/>
                    <span>Revenue</span>
                  </div>
                </div>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="adm-select-pill"
                >
                  <option value="This Month">This Month</option>
                  <option value="Last Month">Last Month</option>
                  <option value="This Year">This Year</option>
                </select>
              </div>
            </div>

            <div className="adm-spline-wrap">
              <svg viewBox="0 0 700 240" className="adm-spline-svg">
                <defs>
                  <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c9933e" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#c9933e" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Y Axis Grid Lines & Labels */}
                {[
                  { val: '250K', y: 30 },
                  { val: '200K', y: 68 },
                  { val: '150K', y: 106 },
                  { val: '100K', y: 144 },
                  { val: '50K',  y: 182 },
                  { val: '0',    y: 220 }
                ].map((item) => (
                  <g key={item.val}>
                    <line x1="55" y1={item.y} x2="680" y2={item.y} stroke="#f0ece4" strokeWidth="1" />
                    <text x="45" y={item.y + 4} textAnchor="end" fontSize="11" fill="#999" fontFamily="Inter, sans-serif">
                      {item.val}
                    </text>
                  </g>
                ))}

                {/* Revenue Area Fill */}
                <path
                  d="M 60 196
                     C 100 196, 120 185, 160 185
                     C 200 185, 220 148, 260 148
                     C 300 148, 320 162, 360 162
                     C 400 162, 420 120, 460 120
                     C 500 120, 520 72, 560 72
                     C 600 72, 620 98, 660 68
                     L 660 220 L 60 220 Z"
                  fill="url(#goldGradient)"
                />

                {/* Revenue Curve */}
                <path
                  d="M 60 196
                     C 100 196, 120 185, 160 185
                     C 200 185, 220 148, 260 148
                     C 300 148, 320 162, 360 162
                     C 400 162, 420 120, 460 120
                     C 500 120, 520 72, 560 72
                     C 600 72, 620 98, 660 68"
                  fill="none"
                  stroke="#c9933e"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Orders Curve */}
                <path
                  d="M 60 208
                     C 100 208, 120 200, 160 200
                     C 200 200, 220 180, 260 180
                     C 300 180, 320 192, 360 192
                     C 400 192, 420 164, 460 164
                     C 500 164, 520 182, 560 182
                     C 600 182, 620 140, 660 140"
                  fill="none"
                  stroke="#541525"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Revenue Dots */}
                {[
                  { cx: 60, cy: 196 },
                  { cx: 160, cy: 185 },
                  { cx: 260, cy: 148 },
                  { cx: 360, cy: 162 },
                  { cx: 460, cy: 120 },
                  { cx: 560, cy: 72 },
                  { cx: 660, cy: 68 }
                ].map((pt, i) => (
                  <circle key={`r-${i}`} cx={pt.cx} cy={pt.cy} r="4.5" fill="#c9933e" stroke="#ffffff" strokeWidth="2" />
                ))}

                {/* Orders Dots */}
                {[
                  { cx: 60, cy: 208 },
                  { cx: 160, cy: 200 },
                  { cx: 260, cy: 180 },
                  { cx: 360, cy: 192 },
                  { cx: 460, cy: 164 },
                  { cx: 560, cy: 182 },
                  { cx: 660, cy: 140 }
                ].map((pt, i) => (
                  <circle key={`o-${i}`} cx={pt.cx} cy={pt.cy} r="4" fill="#541525" stroke="#ffffff" strokeWidth="1.5" />
                ))}

                {/* X Axis Labels */}
                {[
                  { label: '1 Oct', x: 60 },
                  { label: '5 Oct', x: 160 },
                  { label: '10 Oct', x: 260 },
                  { label: '15 Oct', x: 360 },
                  { label: '20 Oct', x: 460 },
                  { label: '25 Oct', x: 560 },
                  { label: '31 Oct', x: 660 }
                ].map((item) => (
                  <text key={item.label} x={item.x} y="238" textAnchor="middle" fontSize="11" fill="#888" fontFamily="Inter, sans-serif">
                    {item.label}
                  </text>
                ))}
              </svg>
            </div>
          </div>

          {/* Orders Status */}
          <div className="adm-card" id="chart-orders-status">
            <div className="adm-card__header">
              <h2 className="adm-card__title">Orders Status</h2>
              <select className="adm-select-pill">
                <option>This Month</option>
                <option>Last Month</option>
              </select>
            </div>

            <div className="adm-donut-body">
              <div className="adm-donut-chart-wrap">
                <svg viewBox="0 0 160 160" className="adm-donut-svg">
                  {/* Background Track */}
                  <circle cx="80" cy="80" r="58" fill="none" stroke="#f4efe6" strokeWidth="18" />

                  {/* Yellow: Pending (13.6%) */}
                  <circle
                    cx="80" cy="80" r="58" fill="none" stroke="#f59e0b" strokeWidth="18"
                    strokeDasharray={`${pPending} ${C}`}
                    strokeDashoffset={offPending}
                  />

                  {/* Blue: Processing (23.7%) */}
                  <circle
                    cx="80" cy="80" r="58" fill="none" stroke="#3b82f6" strokeWidth="18"
                    strokeDasharray={`${pProc} ${C}`}
                    strokeDashoffset={offProc}
                  />

                  {/* Green: Shipped (49.2%) */}
                  <circle
                    cx="80" cy="80" r="58" fill="none" stroke="#10b981" strokeWidth="18"
                    strokeDasharray={`${pShip} ${C}`}
                    strokeDashoffset={offShip}
                  />

                  {/* Teal: Delivered (11.3%) */}
                  <circle
                    cx="80" cy="80" r="58" fill="none" stroke="#14b8a6" strokeWidth="18"
                    strokeDasharray={`${pDeliv} ${C}`}
                    strokeDashoffset={offDeliv}
                  />

                  {/* Red: Cancelled (2.2%) */}
                  <circle
                    cx="80" cy="80" r="58" fill="none" stroke="#ef4444" strokeWidth="18"
                    strokeDasharray={`${pCanc} ${C}`}
                    strokeDashoffset={offCanc}
                  />
                </svg>

                <div className="adm-donut-center">
                  <span className="adm-donut-center__val">177</span>
                  <span className="adm-donut-center__label">Total Orders</span>
                </div>
              </div>

              {/* Status Breakdown Legend */}
              <div className="adm-status-legend">
                <div className="adm-status-item">
                  <span className="adm-status-item__label">
                    <span className="adm-legend__dot" style={{ background: '#f59e0b' }}/>
                    Pending
                  </span>
                  <span className="adm-status-item__val">24 (13.6%)</span>
                </div>
                <div className="adm-status-item">
                  <span className="adm-status-item__label">
                    <span className="adm-legend__dot" style={{ background: '#3b82f6' }}/>
                    Processing
                  </span>
                  <span className="adm-status-item__val">42 (23.7%)</span>
                </div>
                <div className="adm-status-item">
                  <span className="adm-status-item__label">
                    <span className="adm-legend__dot" style={{ background: '#10b981' }}/>
                    Shipped
                  </span>
                  <span className="adm-status-item__val">87 (49.2%)</span>
                </div>
                <div className="adm-status-item">
                  <span className="adm-status-item__label">
                    <span className="adm-legend__dot" style={{ background: '#14b8a6' }}/>
                    Delivered
                  </span>
                  <span className="adm-status-item__val">20 (11.3%)</span>
                </div>
                <div className="adm-status-item">
                  <span className="adm-status-item__label">
                    <span className="adm-legend__dot" style={{ background: '#ef4444' }}/>
                    Cancelled
                  </span>
                  <span className="adm-status-item__val">4 (2.2%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row Tables */}
        <div className="adm-tables-grid">
          {/* Recent Orders */}
          <div className="adm-card" id="table-recent-orders">
            <div className="adm-card__header">
              <h2 className="adm-card__title">Recent Orders</h2>
              <Link to="/admin/orders" className="adm-card__link">View All</Link>
            </div>

            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Customer</th>
                    <th>Product</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT_ORDERS.map((order) => (
                    <tr key={order.id}>
                      <td className="adm-order-num">{order.id}</td>
                      <td>
                        <div className="adm-customer-cell">
                          <span className="adm-customer-name">{order.customer}</span>
                          <span className="adm-customer-email">{order.email}</span>
                        </div>
                      </td>
                      <td>
                        <div className="adm-product-cell">
                          <img src={order.image} alt={order.product} className="adm-product-thumb" />
                          <div className="adm-product-meta">
                            <span className="adm-product-title">{order.product}</span>
                            <span className="adm-product-spec">{order.spec}</span>
                          </div>
                        </div>
                      </td>
                      <td className="adm-amount">{order.amount}</td>
                      <td>
                        <span className={`adm-status-badge ${order.statusClass}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="adm-date">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Selling Products */}
          <div className="adm-card" id="table-top-selling">
            <div className="adm-card__header">
              <h2 className="adm-card__title">Top Selling Products</h2>
              <Link to="/admin/products" className="adm-card__link">View All</Link>
            </div>

            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Sales</th>
                    <th>Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {TOP_PRODUCTS.map((prod) => (
                    <tr key={prod.rank}>
                      <td className="adm-rank">{prod.rank}</td>
                      <td>
                        <div className="adm-product-cell">
                          <img src={prod.image} alt={prod.title} className="adm-product-thumb" />
                          <div className="adm-product-meta">
                            <span className="adm-product-title">{prod.title}</span>
                            <span className="adm-product-spec">{prod.spec}</span>
                          </div>
                        </div>
                      </td>
                      <td className="adm-amount">{prod.sales}</td>
                      <td className="adm-amount" style={{ fontWeight: 600 }}>{prod.revenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
