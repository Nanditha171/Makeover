// src/context/AppContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_STATS,
  INITIAL_SALON_INFO,
  INITIAL_SERVICES,
  INITIAL_PACKAGES,
  INITIAL_PORTFOLIO,
  INITIAL_OFFERS,
  INITIAL_TESTIMONIALS,
  INITIAL_POLICIES,
  INITIAL_BOOKINGS,
  INITIAL_BLOCKED_SLOTS
} from '../data/initialData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Navigation & Role State
  const [activeTab, setActiveTab] = useState('home');
  const [userRole, setUserRole] = useState('customer'); // 'customer' | 'admin'

  // Admin Auth Session
  const [adminToken, setAdminToken] = useState(() => localStorage.getItem('aura_admin_token') || '');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(!!localStorage.getItem('aura_admin_token'));
  const [authError, setAuthError] = useState('');

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState('');

  // App Data States (synced from API / DB)
  const [stats, setStats] = useState(INITIAL_STATS);
  const [salonInfo, setSalonInfo] = useState(INITIAL_SALON_INFO);
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [packages, setPackages] = useState(INITIAL_PACKAGES);
  const [portfolio, setPortfolio] = useState(INITIAL_PORTFOLIO);
  const [offers, setOffers] = useState(INITIAL_OFFERS);
  const [testimonials, setTestimonials] = useState(INITIAL_TESTIMONIALS);
  const [policies, setPolicies] = useState(INITIAL_POLICIES);
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [blockedSlots, setBlockedSlots] = useState(INITIAL_BLOCKED_SLOTS);

  // Modal State
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null, // 'confirmation' | 'payment' | 'lightbox' | 'login'
    data: null
  });

  const [selectedBookingItem, setSelectedBookingItem] = useState(null);

  // Show Success Toast Notification
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  // Fetch Public Data from Backend Database on Mount
  const fetchAppData = async () => {
    try {
      const res = await fetch('/api/data');
      if (res.ok) {
        const data = await res.json();
        if (data.stats) setStats(data.stats);
        if (data.salonInfo) setSalonInfo(data.salonInfo);
        if (data.services) setServices(data.services);
        if (data.packages) setPackages(data.packages);
        if (data.portfolio) setPortfolio(data.portfolio);
        if (data.offers) setOffers(data.offers);
        if (data.testimonials) setTestimonials(data.testimonials);
        if (data.policies) setPolicies(data.policies);
        if (data.bookings) setBookings(data.bookings);
        if (data.blockedSlots) setBlockedSlots(data.blockedSlots);
      }
    } catch (err) {
      console.warn('API unavailable, falling back to local seed state:', err);
    }
  };

  useEffect(() => {
    fetchAppData();
  }, []);

  // Verify Admin Authentication Session
  useEffect(() => {
    if (adminToken) {
      fetch('/api/admin/verify', {
        headers: { Authorization: `Bearer ${adminToken}` }
      })
        .then(res => {
          if (!res.ok) {
            adminLogout();
          } else {
            setIsAdminAuthenticated(true);
          }
        })
        .catch(() => {
          // If server offline, maintain token state
        });
    }
  }, [adminToken]);

  // Admin Login Action (Validated against backend bcrypt hash)
  const adminLogin = async (username, password) => {
    setAuthError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setAuthError(data.error || 'Invalid credentials');
        return { success: false, error: data.error || 'Invalid credentials' };
      }

      setAdminToken(data.token);
      localStorage.setItem('aura_admin_token', data.token);
      setIsAdminAuthenticated(true);
      setUserRole('admin');
      setActiveTab('admin');
      showToast('Admin authentication successful! Welcome back.');
      return { success: true };
    } catch (err) {
      setAuthError('Connection error to security authentication server.');
      return { success: false, error: 'Authentication server error.' };
    }
  };

  // Admin Logout Action
  const adminLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch (e) {}

    setAdminToken('');
    localStorage.removeItem('aura_admin_token');
    setIsAdminAuthenticated(false);
    setUserRole('customer');
    setActiveTab('home');
    showToast('Logged out of Admin session.');
  };

  // Price Formatter Helper
  const formatPrice = (price, isStartingFrom = false) => {
    if (price === undefined || price === null) return '₹0';
    const formatted = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
    return isStartingFrom ? `${formatted} onwards` : formatted;
  };

  // Single Makeup Artist Slot Availability Checker
  const checkSlotStatus = (date, timeSlot) => {
    if (!date || !timeSlot) return 'available';

    const isBlocked = blockedSlots.some(
      b => b.date === date && (b.timeSlot === 'All Day' || b.timeSlot === timeSlot)
    );
    if (isBlocked) return 'blocked';

    const existingBooking = bookings.find(
      b => b.date === date && b.timeSlot === timeSlot && b.status !== 'Cancelled'
    );

    return existingBooking ? 'booked' : 'available';
  };

  // Create Booking API call
  const createBooking = async (bookingData) => {
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });
      const data = await res.json();
      if (data.booking) {
        setBookings(prev => [data.booking, ...prev]);
        return data.booking;
      }
    } catch (err) {}

    // Local fallback
    const newId = `GLOW-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking = {
      id: newId,
      createdDate: new Date().toISOString().split('T')[0],
      status: 'Confirmed',
      paymentStatus: 'Paid (Advance)',
      ...bookingData
    };
    setBookings(prev => [newBooking, ...prev]);
    return newBooking;
  };

  // Generic Backend Content Update Helper
  const updateContentSection = async (key, data) => {
    try {
      const res = await fetch('/api/admin/update-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify({ key, data })
      });
      const result = await res.json();
      if (res.ok) {
        showToast('Changes saved successfully.');
      }
    } catch (err) {
      showToast('Saved locally.');
    }
  };

  // Services CRUD
  const addService = async (newSrv) => {
    const srv = { ...newSrv, id: `srv-${Date.now()}` };
    setServices(prev => {
      const updated = [...prev, srv];
      updateContentSection('services', updated);
      return updated;
    });
  };

  const updateService = async (updatedSrv) => {
    setServices(prev => {
      const updated = prev.map(s => s.id === updatedSrv.id ? updatedSrv : s);
      updateContentSection('services', updated);
      return updated;
    });
  };

  const deleteService = async (id) => {
    setServices(prev => {
      const updated = prev.filter(s => s.id !== id);
      updateContentSection('services', updated);
      return updated;
    });
  };

  // Packages CRUD
  const addPackage = async (newPkg) => {
    const pkg = { ...newPkg, id: `pkg-${Date.now()}` };
    setPackages(prev => {
      const updated = [...prev, pkg];
      updateContentSection('packages', updated);
      return updated;
    });
  };

  const deletePackage = async (id) => {
    setPackages(prev => {
      const updated = prev.filter(p => p.id !== id);
      updateContentSection('packages', updated);
      return updated;
    });
  };

  // Offers CRUD
  const addOffer = async (newOff) => {
    const off = { ...newOff, id: `off-${Date.now()}` };
    setOffers(prev => {
      const updated = [...prev, off];
      updateContentSection('offers', updated);
      return updated;
    });
  };

  const deleteOffer = async (id) => {
    setOffers(prev => {
      const updated = prev.filter(o => o.id !== id);
      updateContentSection('offers', updated);
      return updated;
    });
  };

  // Portfolio CRUD
  const addPortfolioItem = async (newItem) => {
    const item = { ...newItem, id: `port-${Date.now()}` };
    setPortfolio(prev => {
      const updated = [...prev, item];
      updateContentSection('portfolio', updated);
      return updated;
    });
  };

  const deletePortfolioItem = async (id) => {
    setPortfolio(prev => {
      const updated = prev.filter(p => p.id !== id);
      updateContentSection('portfolio', updated);
      return updated;
    });
  };

  // Slot Locker CRUD
  const addBlockedSlot = async (blockData) => {
    setBlockedSlots(prev => {
      const updated = [...prev, blockData];
      updateContentSection('blockedSlots', updated);
      return updated;
    });
  };

  const removeBlockedSlot = async (date, timeSlot) => {
    setBlockedSlots(prev => {
      const updated = prev.filter(b => !(b.date === date && b.timeSlot === timeSlot));
      updateContentSection('blockedSlots', updated);
      return updated;
    });
  };

  // Update Booking Status
  const updateBookingStatus = async (id, status) => {
    setBookings(prev => {
      const updated = prev.map(b => b.id === id ? { ...b, status } : b);
      updateContentSection('bookings', updated);
      return updated;
    });
  };

  // Salon Info / Business Settings Update
  const saveSalonInfo = (newInfo) => {
    setSalonInfo(newInfo);
    updateContentSection('salonInfo', newInfo);
  };

  // About Stats Update
  const saveStats = (newStats) => {
    setStats(newStats);
    updateContentSection('stats', newStats);
  };

  // Policies Update
  const savePolicies = (newPolicies) => {
    setPolicies(newPolicies);
    updateContentSection('policies', newPolicies);
  };

  // Modal Controls
  const openModal = (type, data = null) => {
    setModalState({ isOpen: true, type, data });
  };
  const closeModal = () => {
    setModalState({ isOpen: false, type: null, data: null });
  };

  const startBooking = (item, type = 'salon') => {
    setSelectedBookingItem(item);
    setActiveTab(type === 'home' ? 'booking-home' : 'booking-salon');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppContext.Provider value={{
      activeTab,
      setActiveTab,
      userRole,
      setUserRole,
      adminToken,
      isAdminAuthenticated,
      authError,
      toastMessage,
      adminLogin,
      adminLogout,
      stats,
      setStats: saveStats,
      salonInfo,
      setSalonInfo: saveSalonInfo,
      services,
      packages,
      portfolio,
      offers,
      testimonials,
      policies,
      setPolicies: savePolicies,
      bookings,
      blockedSlots,
      modalState,
      openModal,
      closeModal,
      selectedBookingItem,
      setSelectedBookingItem,
      formatPrice,
      checkSlotStatus,
      createBooking,
      updateBookingStatus,
      addService,
      updateService,
      deleteService,
      addPackage,
      deletePackage,
      addOffer,
      deleteOffer,
      addPortfolioItem,
      deletePortfolioItem,
      addBlockedSlot,
      removeBlockedSlot,
      startBooking,
      showToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
