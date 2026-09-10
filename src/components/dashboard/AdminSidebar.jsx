// src/components/dashboard/AdminSidebar.jsx
import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Users,
  Sparkles,
  Layers,
  CalendarCheck,
  CreditCard,
  Package,
  ShoppingBag,
  Tag,
  Star,
  BarChart3,
  ShieldCheck,
  Settings,
  Lock,
  Sparkle
} from 'lucide-react';

export const AdminSidebar = ({ activeTab, setActiveTab, isDrawerOpen, setIsDrawerOpen }) => {
  const {
    adminLogout,
    bookings,
    enquiries,
    services,
    packages,
    products,
    offers,
    reviews,
    artists,
    adminUsers
  } = useApp();

  const navItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'customers', label: 'Customers / Clients', icon: Users },
    { id: 'artists', label: 'Makeup Artists', icon: Sparkles, count: artists?.length },
    { id: 'services', label: 'Services', icon: Layers, count: services?.length },
    { id: 'appointments', label: 'Appointments', icon: CalendarCheck, count: bookings?.length },
    { id: 'payments', label: 'Bookings & Payments', icon: CreditCard },
    { id: 'packages', label: 'Makeup Packages', icon: Package, count: packages?.length },
    { id: 'products', label: 'Products / Inventory', icon: ShoppingBag, count: products?.length },
    { id: 'offers', label: 'Offers & Coupons', icon: Tag, count: offers?.length },
    { id: 'reviews', label: 'Reviews & Ratings', icon: Star, count: reviews?.length },
    { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
    { id: 'users', label: 'User Management', icon: ShieldCheck, count: adminUsers?.length },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    if (setIsDrawerOpen) setIsDrawerOpen(false);
  };

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isDrawerOpen && (
        <div
          className="admin-sidebar-overlay"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      <aside className={`admin-sidebar ${isDrawerOpen ? 'drawer-open' : ''}`}>
        {/* Brand Header */}
        <div className="admin-sidebar-header">
          <div className="admin-sidebar-logo">
            <Sparkle size={24} />
          </div>
          <div className="admin-sidebar-title-group">
            <h2>Website Admin</h2>
            <span>MAKEOVER CONTROL</span>
          </div>
        </div>

        {/* Navigation List */}
        <div className="admin-sidebar-nav-section">
          <span className="admin-sidebar-section-label">WEBSITE ADMIN PORTAL</span>

          <nav>
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  className={`admin-nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                  {item.count !== undefined && item.count > 0 && (
                    <span className="badge-count">{item.count}</span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="admin-sidebar-footer">
          <div className="admin-sync-status">
            <span>Website Sync</span>
            <span className="admin-sync-pill">
              <span className="pulse-dot" style={{ width: '6px', height: '6px' }} />
              ONLINE
            </span>
          </div>

          <button onClick={adminLogout} className="admin-lock-btn">
            <Lock size={15} />
            <span>Lock Admin Portal</span>
          </button>
        </div>
      </aside>
    </>
  );
};
