import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  {
    to: '/admin', label: 'Dashboard', exact: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    )
  },
  {
    to: '/admin/products', label: 'Products', exact: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
    )
  },
  {
    to: '/admin/add-product', label: 'Add Product', exact: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
      </svg>
    )
  },
  {
    to: '/admin/orders', label: 'Orders', exact: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    )
  },
  {
    to: '/admin/customers', label: 'Customers', exact: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    )
  },
];

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="admin-layout" data-sidebar={sidebarOpen ? 'open' : 'closed'}>
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar__top">
          <Link to="/" className="admin-sidebar__logo">
            <div className="admin-sidebar__emblem">
              <svg viewBox="0 0 40 40" fill="none" width="32" height="32">
                <polygon points="20,2 38,11 38,29 20,38 2,29 2,11" stroke="#C9A84C" strokeWidth="1.5" fill="none"/>
                <circle cx="20" cy="20" r="4" fill="#C9A84C"/>
              </svg>
            </div>
            {sidebarOpen && (
              <div className="admin-sidebar__brand">
                <span className="admin-sidebar__brand-name">PAKIZA RUGS</span>
                <span className="admin-sidebar__brand-sub">Admin Panel</span>
              </div>
            )}
          </Link>
          <button className="admin-sidebar__toggle" onClick={() => setSidebarOpen(p => !p)} id="sidebar-toggle-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {sidebarOpen
                ? <><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></>
                : <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>
              }
            </svg>
          </button>
        </div>

        <nav className="admin-sidebar__nav">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              className={({ isActive }) => `admin-sidebar__item ${isActive ? 'admin-sidebar__item--active' : ''}`}
              id={`nav-${item.label.toLowerCase().replace(' ', '-')}`}
            >
              <span className="admin-sidebar__item-icon">{item.icon}</span>
              {sidebarOpen && <span className="admin-sidebar__item-label">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar__bottom">
          <div className="admin-sidebar__user">
            <div className="admin-sidebar__avatar">{user?.avatar || 'AD'}</div>
            {sidebarOpen && (
              <div className="admin-sidebar__user-info">
                <span className="admin-sidebar__user-name">{user?.name}</span>
                <span className="admin-sidebar__user-role">{user?.role}</span>
              </div>
            )}
          </div>
          <button className="admin-sidebar__logout" onClick={handleLogout} title="Logout" id="admin-logout-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="admin-main">
        <div className="admin-topbar">
          <div className="admin-topbar__left">
            <span className="admin-topbar__greeting">Good morning, {user?.name} 👋</span>
          </div>
          <div className="admin-topbar__right">
            <Link to="/" className="admin-topbar__visit" id="visit-site-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              Visit Site
            </Link>
          </div>
        </div>
        <div className="admin-content">
          {children}
        </div>
      </main>
    </div>
  );
}
