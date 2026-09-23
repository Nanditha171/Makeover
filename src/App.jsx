// src/App.jsx
import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { BookingConfirmationModal } from './components/common/BookingConfirmationModal';
import { PaymentModal } from './components/common/PaymentModal';
import { LightboxModal } from './components/common/LightboxModal';
import { CustomerAuthModal } from './components/common/CustomerAuthModal';
import { ClientAuthGate } from './components/auth/ClientAuthGate';

import { HomePage } from './components/home/HomePage';
import { AboutPage } from './components/about/AboutPage';
import { ServicesPage } from './components/services/ServicesPage';
import { PackagesPage } from './components/packages/PackagesPage';
import { CustomPackageBuilder } from './components/packages/CustomPackageBuilder';
import { PortfolioPage } from './components/portfolio/PortfolioPage';
import { OffersPage } from './components/offers/OffersPage';
import { ContactPage } from './components/contact/ContactPage';
import { SalonBookingWizard } from './components/booking/SalonBookingWizard';
import { HomeServiceWizard } from './components/booking/HomeServiceWizard';
import { CustomerDashboard } from './components/dashboard/CustomerDashboard';
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { AdminLoginPage } from './components/admin/AdminLoginPage';

/**
 * Protected Route Guard for Admin views
 * Intercepts unauthenticated requests and displays the AdminLoginPage
 */
const AdminProtectedRoute = ({ children }) => {
  const { isAdminAuthenticated } = useApp();

  if (!isAdminAuthenticated) {
    return <AdminLoginPage />;
  }

  return children;
};

const MainContent = () => {
  const { activeTab, toastMessage, isClientAuthenticated } = useApp();

  const isAdminRoute = activeTab === 'admin' || activeTab === 'admin-login';

  // Strict Access Gate: If not admin route and client is not verified & logged in, show Auth Gate
  if (!isAdminRoute && !isClientAuthenticated) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-main)' }}>
        <ClientAuthGate />
        {toastMessage && (
          <div className="toast-floating glass-card">
            ✨ {toastMessage}
          </div>
        )}
      </div>
    );
  }

  const renderTab = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'services':
        return <ServicesPage />;
      case 'packages':
        return <PackagesPage />;
      case 'custom-package':
        return <CustomPackageBuilder />;
      case 'portfolio':
      case 'before-after':
        return <PortfolioPage />;
      case 'offers':
        return <OffersPage />;
      case 'contact':
        return <ContactPage />;
      case 'booking-salon':
        return <SalonBookingWizard />;
      case 'booking-home':
        return <HomeServiceWizard />;
      case 'my-account':
        return <CustomerDashboard />;
      case 'admin-login':
        return <AdminLoginPage />;
      case 'admin':
        return (
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        );
      default:
        return <HomePage />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-main)' }}>
      {!isAdminRoute && <Header />}

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {renderTab()}
      </main>

      {!isAdminRoute && <Footer />}

      {/* Floating Success Toast */}
      {toastMessage && (
        <div className="toast-floating glass-card">
          ✨ {toastMessage}
        </div>
      )}

      {/* Global Modals */}
      <BookingConfirmationModal />
      <PaymentModal />
      <LightboxModal />
      <CustomerAuthModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
