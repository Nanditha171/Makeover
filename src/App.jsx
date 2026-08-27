// src/App.jsx
import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { BookingConfirmationModal } from './components/common/BookingConfirmationModal';
import { PaymentModal } from './components/common/PaymentModal';
import { LightboxModal } from './components/common/LightboxModal';

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
import { MessageCircle } from 'lucide-react';

const MainContent = () => {
  const { activeTab, salonInfo, toastMessage } = useApp();

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
      case 'before-after': // Redirect legacy before-after tab to Portfolio
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
      case 'admin':
        return <AdminDashboard />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />

      <main style={{ flex: 1 }}>
        {renderTab()}
      </main>

      <Footer />

      {/* Floating Success Toast */}
      {toastMessage && (
        <div className="glass-card badge-gold" style={{
          position: 'fixed',
          top: '80px',
          right: '20px',
          zIndex: 2000,
          padding: '0.85rem 1.4rem',
          fontSize: '0.95rem',
          boxShadow: 'var(--shadow-glow)',
          border: '1px solid var(--primary-gold)',
          color: 'var(--text-primary)',
          background: 'var(--bg-card)',
          animation: 'fadeIn 0.3s ease-out'
        }}>
          ✨ {toastMessage}
        </div>
      )}

      {/* Global Modals */}
      <BookingConfirmationModal />
      <PaymentModal />
      <LightboxModal />

      {/* Floating WhatsApp Action Button */}
      <a
        href={`https://wa.me/${salonInfo.whatsapp}`}
        target="_blank"
        rel="noreferrer"
        className="floating-whatsapp"
        title="Chat with Salon on WhatsApp"
      >
        <MessageCircle size={30} />
      </a>
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
