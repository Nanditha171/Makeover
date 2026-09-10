// src/components/dashboard/AdminDashboard.jsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminLoginPage } from '../admin/AdminLoginPage';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopNav } from './AdminTopNav';
import { AdminOverviewTab } from './AdminOverviewTab';
import { AdminCustomersTab } from './AdminCustomersTab';
import { AdminArtistsTab } from './AdminArtistsTab';
import { AdminServicesTab } from './AdminServicesTab';
import { AdminAppointmentsTab } from './AdminAppointmentsTab';
import { AdminPaymentsTab } from './AdminPaymentsTab';
import { AdminPackagesTab } from './AdminPackagesTab';
import { AdminProductsTab } from './AdminProductsTab';
import { AdminOffersTab } from './AdminOffersTab';
import { AdminReviewsTab } from './AdminReviewsTab';
import { AdminReportsTab } from './AdminReportsTab';
import { AdminUsersTab } from './AdminUsersTab';
import { AdminSettingsTab } from './AdminSettingsTab';
import { AdminSlotLockerTab } from './AdminSlotLockerTab';
import './AdminDashboard.css';

export const AdminDashboard = () => {
  const { isAdminAuthenticated } = useApp();
  const [activeAdminSubTab, setActiveAdminSubTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  if (!isAdminAuthenticated) {
    return <AdminLoginPage />;
  }

  const renderSubTab = () => {
    switch (activeAdminSubTab) {
      case 'overview':
        return (
          <AdminOverviewTab
            onNavigateTab={(tab) => {
              setActiveAdminSubTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        );
      case 'customers':
        return <AdminCustomersTab searchQuery={searchQuery} />;
      case 'artists':
        return <AdminArtistsTab searchQuery={searchQuery} />;
      case 'services':
        return <AdminServicesTab searchQuery={searchQuery} />;
      case 'appointments':
        return <AdminAppointmentsTab searchQuery={searchQuery} />;
      case 'payments':
      case 'bookings-payments':
        return <AdminPaymentsTab />;
      case 'packages':
        return <AdminPackagesTab />;
      case 'products':
        return <AdminProductsTab searchQuery={searchQuery} />;
      case 'offers':
        return <AdminOffersTab />;
      case 'reviews':
        return <AdminReviewsTab searchQuery={searchQuery} />;
      case 'reports':
        return <AdminReportsTab />;
      case 'users':
        return <AdminUsersTab />;
      case 'settings':
        return <AdminSettingsTab />;
      case 'slot-locker':
        return <AdminSlotLockerTab />;
      default:
        return (
          <AdminOverviewTab
            onNavigateTab={(tab) => {
              setActiveAdminSubTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        );
    }
  };

  return (
    <div className="admin-layout-root">
      {/* 1. Left Sidebar Navigation */}
      <AdminSidebar
        activeTab={activeAdminSubTab}
        setActiveTab={setActiveAdminSubTab}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />

      {/* 2. Main Container (Top Navigation + Dynamic Subview) */}
      <div className="admin-main-wrapper">
        <AdminTopNav
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onToggleDrawer={() => setIsDrawerOpen(!isDrawerOpen)}
        />

        <main className="admin-content-canvas">
          {renderSubTab()}
        </main>
      </div>
    </div>
  );
};
