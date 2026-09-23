// src/context/AppContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_STATS,
  INITIAL_SALON_INFO,
  INITIAL_WHY_CHOOSE,
  INITIAL_SERVICES,
  INITIAL_PACKAGES,
  INITIAL_PORTFOLIO,
  INITIAL_OFFERS,
  INITIAL_TESTIMONIALS,
  INITIAL_FAQS,
  INITIAL_POLICIES,
  INITIAL_BOOKINGS,
  INITIAL_ENQUIRIES,
  INITIAL_BLOCKED_SLOTS,
  INITIAL_ARTISTS,
  INITIAL_PRODUCTS,
  INITIAL_REVIEWS,
  INITIAL_ADMIN_USERS,
  INITIAL_MAINTENANCE_MODE
} from '../data/initialData';
import {
  subscribeToAuthChanges,
  loginWithEmail,
  registerWithEmail,
  loginWithGoogle,
  logoutUser,
  resetPassword,
  isFirebaseConfigured
} from '../firebase/authService';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const validTabs = [
    'home', 'about', 'services', 'packages', 'custom-package',
    'portfolio', 'before-after', 'offers', 'contact',
    'booking-salon', 'booking-home', 'my-account', 'admin', 'admin-login'
  ];

  const getInitialTab = () => {
    try {
      const hash = window.location.hash.replace('#', '').trim();
      if (hash && validTabs.includes(hash)) {
        return hash;
      }
    } catch {}
    return 'home';
  };

  // Navigation & Role State
  const [activeTab, setActiveTabState] = useState(getInitialTab);
  const [userRole, setUserRole] = useState('customer'); // 'customer' | 'admin'

  // Admin Auth Session (Starts locked; requires explicit credential authentication)
  const [adminToken, setAdminToken] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  // Firebase Customer Authentication State
  const [customerUser, setCustomerUser] = useState(null);
  const [customerAuthModalOpen, setCustomerAuthModalOpen] = useState(false);

  // Subscribe to Firebase Auth changes on Mount
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      setCustomerUser(user);
    });
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  const openCustomerAuthModal = () => setCustomerAuthModalOpen(true);
  const closeCustomerAuthModal = () => setCustomerAuthModalOpen(false);

  const loginCustomer = async (email, password) => {
    const res = await loginWithEmail(email, password);
    if (res.success && res.user) setCustomerUser(res.user);
    return res;
  };

  const registerCustomer = async (email, password, displayName) => {
    const res = await registerWithEmail(email, password, displayName);
    if (res.success && res.user) setCustomerUser(res.user);
    return res;
  };

  const loginCustomerWithGoogle = async () => {
    const res = await loginWithGoogle();
    if (res.success && res.user) setCustomerUser(res.user);
    return res;
  };

  const logoutCustomer = async () => {
    await logoutUser();
    setCustomerUser(null);
    showToast('You have been signed out.');
  };

  const resetCustomerPassword = async (email) => {
    return await resetPassword(email);
  };

  // Lock Admin Portal on Exit / Purge Session
  const lockAdminSession = () => {
    setAdminToken('');
    setIsAdminAuthenticated(false);
    setUserRole('customer');
    setAuthError('');
    try {
      localStorage.removeItem('aura_admin_token');
      sessionStorage.removeItem('aura_admin_token');
    } catch {}
  };

  const setActiveTab = (tab) => {
    // Automatically lock admin portal if navigating away from admin to any other page
    if ((activeTab === 'admin' || activeTab === 'admin-login') && tab !== 'admin' && tab !== 'admin-login') {
      lockAdminSession();
    }
    setActiveTabState(tab);
    try {
      if (window.location.hash !== `#${tab}`) {
        window.location.hash = tab;
      }
    } catch {}
  };

  // URL Hash Navigation Listener (supports direct URLs like #admin, #services, and back/forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      try {
        const hash = window.location.hash.replace('#', '').trim();
        if (hash && validTabs.includes(hash)) {
          setActiveTabState(prevTab => {
            // Automatically lock admin portal if navigating away from admin route via URL / back / forward
            if ((prevTab === 'admin' || prevTab === 'admin-login') && hash !== 'admin' && hash !== 'admin-login') {
              lockAdminSession();
            }
            return hash;
          });
        }
      } catch {}
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState('');

  // App Data States (synced from API / DB or local storage)
  const [stats, setStats] = useState(INITIAL_STATS);
  const [salonInfo, setSalonInfo] = useState(INITIAL_SALON_INFO);
  const [whyChoose, setWhyChoose] = useState(INITIAL_WHY_CHOOSE);
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [packages, setPackages] = useState(INITIAL_PACKAGES);
  const [portfolio, setPortfolio] = useState(INITIAL_PORTFOLIO);
  const [offers, setOffers] = useState(INITIAL_OFFERS);
  const [testimonials, setTestimonials] = useState(INITIAL_TESTIMONIALS);
  const [faqs, setFaqs] = useState(INITIAL_FAQS);
  const [policies, setPolicies] = useState(INITIAL_POLICIES);

  // Beauty Platform Entities
  const [artists, setArtists] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_local_artists');
      return saved ? JSON.parse(saved) : INITIAL_ARTISTS;
    } catch {
      return INITIAL_ARTISTS;
    }
  });

  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_local_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_local_reviews');
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  const [adminUsers, setAdminUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_local_admin_users');
      return saved ? JSON.parse(saved) : INITIAL_ADMIN_USERS;
    } catch {
      return INITIAL_ADMIN_USERS;
    }
  });

  const [maintenanceMode, setMaintenanceMode] = useState(INITIAL_MAINTENANCE_MODE);

  // Real Data: Bookings, Enquiries, Blocked Slots
  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_local_bookings');
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  const [enquiries, setEnquiries] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_local_enquiries');
      return saved ? JSON.parse(saved) : INITIAL_ENQUIRIES;
    } catch {
      return INITIAL_ENQUIRIES;
    }
  });

  const [blockedSlots, setBlockedSlots] = useState(INITIAL_BLOCKED_SLOTS);

  // Customer device booking IDs (to filter My Bookings on customer dashboard)
  const [myBookingIds, setMyBookingIds] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_customer_booking_ids');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal State
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null, // 'confirmation' | 'payment' | 'lightbox'
    data: null
  });

  const [selectedBookingItem, setSelectedBookingItem] = useState(null);
  const [bookingType, setBookingType] = useState('salon'); // 'salon' | 'home'

  // Show Toast Notification
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  // Sync state with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('aura_local_bookings', JSON.stringify(bookings));
    } catch {}
  }, [bookings]);

  useEffect(() => {
    try {
      localStorage.setItem('aura_local_artists', JSON.stringify(artists));
    } catch {}
  }, [artists]);

  useEffect(() => {
    try {
      localStorage.setItem('aura_local_products', JSON.stringify(products));
    } catch {}
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('aura_local_reviews', JSON.stringify(reviews));
    } catch {}
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem('aura_local_admin_users', JSON.stringify(adminUsers));
    } catch {}
  }, [adminUsers]);

  useEffect(() => {
    try {
      localStorage.setItem('aura_local_enquiries', JSON.stringify(enquiries));
    } catch {}
  }, [enquiries]);

  useEffect(() => {
    try {
      localStorage.setItem('aura_customer_booking_ids', JSON.stringify(myBookingIds));
    } catch {}
  }, [myBookingIds]);

  // Fetch Public Data from Backend Database on Mount
  const fetchAppData = async () => {
    try {
      const res = await fetch('/api/data');
      if (res.ok) {
        const data = await res.json();
        if (data.stats) setStats(data.stats);
        if (data.salonInfo) setSalonInfo(data.salonInfo);
        if (data.whyChoose) setWhyChoose(data.whyChoose);
        if (data.services && data.services.length > 0) setServices(data.services);
        if (data.packages && data.packages.length > 0) setPackages(data.packages);
        if (data.portfolio && data.portfolio.length > 0) setPortfolio(data.portfolio);
        if (data.offers) setOffers(data.offers);
        if (data.testimonials) setTestimonials(data.testimonials);
        if (data.faqs) setFaqs(data.faqs);
        if (data.policies) setPolicies(data.policies);
        if (Array.isArray(data.artists) && data.artists.length > 0) setArtists(data.artists);
        if (Array.isArray(data.products) && data.products.length > 0) setProducts(data.products);
        if (Array.isArray(data.reviews) && data.reviews.length > 0) setReviews(data.reviews);
        if (Array.isArray(data.adminUsers) && data.adminUsers.length > 0) setAdminUsers(data.adminUsers);
        if (data.maintenanceMode !== undefined) setMaintenanceMode(data.maintenanceMode);
        if (Array.isArray(data.bookings)) setBookings(data.bookings);
        if (Array.isArray(data.enquiries)) setEnquiries(data.enquiries);
        if (Array.isArray(data.blockedSlots)) setBlockedSlots(data.blockedSlots);
      }
    } catch (err) {
      console.log('Using local client state (API offline/local mode):', err.message);
    }
  };

  useEffect(() => {
    fetchAppData();
  }, []);

  // Verify Admin Authentication Session on Mount / Token change
  useEffect(() => {
    if (adminToken) {
      fetch('/api/admin/verify', {
        headers: { Authorization: `Bearer ${adminToken}` }
      })
        .then(res => {
          if (!res.ok) {
            // Invalid/expired token - clear session
            setAdminToken('');
            localStorage.removeItem('aura_admin_token');
            setIsAdminAuthenticated(false);
            setUserRole('customer');
          } else {
            setIsAdminAuthenticated(true);
            setUserRole('admin');
          }
        })
        .catch(() => {
          // If offline and token is local fallback token, keep session
          if (adminToken === 'local_admin_session_token') {
            setIsAdminAuthenticated(true);
            setUserRole('admin');
          }
        });
    } else {
      setIsAdminAuthenticated(false);
    }
  }, [adminToken]);

  // Admin Login Action - Strict Credential Validation
  const adminLogin = async (username, password) => {
    setAuthError('');
    if (!username || !password) {
      const errorMsg = 'Please enter both username and password.';
      setAuthError(errorMsg);
      return { success: false, error: errorMsg };
    }

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (!res.ok) {
        const errorMsg = data.error || 'Invalid username or password. Please verify credentials.';
        setAuthError(errorMsg);
        return { success: false, error: errorMsg };
      }

      setAdminToken(data.token);
      try {
        localStorage.setItem('aura_admin_token', data.token);
      } catch {}
      setIsAdminAuthenticated(true);
      setUserRole('admin');
      setActiveTabState('admin');
      try {
        if (window.location.hash !== '#admin') {
          window.location.hash = 'admin';
        }
      } catch {}
      showToast('Admin login successful! Welcome back.');
      return { success: true };
    } catch (err) {
      // Local verification fallback when API is running purely client-side
      if (username === 'Makeup' && password === 'Nanduj2803') {
        const dummyToken = 'local_admin_session_token';
        setAdminToken(dummyToken);
        try {
          localStorage.setItem('aura_admin_token', dummyToken);
        } catch {}
        setIsAdminAuthenticated(true);
        setUserRole('admin');
        setActiveTabState('admin');
        try {
          if (window.location.hash !== '#admin') {
            window.location.hash = 'admin';
          }
        } catch {}
        showToast('Admin authentication verified.');
        return { success: true };
      }
      const invalidMsg = 'Invalid username or password. Access denied.';
      setAuthError(invalidMsg);
      return { success: false, error: invalidMsg };
    }
  };

  // Admin Logout Action - Complete Session Purge & Redirect
  const adminLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch (e) {}

    lockAdminSession();
    setActiveTabState('home');
    try {
      if (window.location.hash !== '#home') {
        window.location.hash = 'home';
      }
    } catch {}
    showToast('Admin portal locked & logged out.');
  };

  // Price Formatter Helper
  const formatPrice = (price, isStartingFrom = false) => {
    if (price === undefined || price === null) return '₹0';
    const num = Number(price);
    const formatted = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(isNaN(num) ? 0 : num);
    return isStartingFrom ? `${formatted} onwards` : formatted;
  };

  // Single Slot Availability Checker (checks both booked bookings & blocked slots)
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

  // Create Booking
  const createBooking = async (bookingData) => {
    const newId = `GLOW-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking = {
      id: newId,
      createdDate: new Date().toISOString().split('T')[0],
      status: 'Confirmed',
      paymentStatus: 'Paid (Advance)',
      userId: customerUser?.uid || null,
      userEmail: customerUser?.email || bookingData.email || null,
      ...bookingData
    };

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBooking)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.booking) {
          setBookings(prev => [data.booking, ...prev]);
          setMyBookingIds(prev => [data.booking.id, ...prev]);
          return data.booking;
        }
      }
    } catch (err) {}

    // Local fallback
    setBookings(prev => [newBooking, ...prev]);
    setMyBookingIds(prev => [newBooking.id, ...prev]);
    return newBooking;
  };

  // Create Customer Enquiry
  const createEnquiry = async (enquiryData) => {
    const newEnq = {
      id: `enq-${Date.now()}`,
      status: 'Pending',
      dateSubmitted: new Date().toISOString().split('T')[0],
      ...enquiryData
    };

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEnq)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.enquiry) {
          setEnquiries(prev => [data.enquiry, ...(prev || [])]);
          showToast('Your inquiry has been submitted! We will contact you shortly.');
          return data.enquiry;
        }
      }
    } catch (err) {}

    setEnquiries(prev => [newEnq, ...(prev || [])]);
    showToast('Your inquiry has been submitted! We will contact you shortly.');
    return newEnq;
  };

  // Update Backend Content Helper
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

  // Artists CRUD
  const addArtist = async (newArt) => {
    const art = { ...newArt, id: `art-${Date.now()}`, rating: 5.0, reviewsCount: 0, status: 'Active' };
    setArtists(prev => {
      const updated = [...prev, art];
      updateContentSection('artists', updated);
      return updated;
    });
    showToast(`Artist ${art.name} added to team.`);
  };

  const updateArtist = async (updatedArt) => {
    setArtists(prev => {
      const updated = prev.map(a => a.id === updatedArt.id ? updatedArt : a);
      updateContentSection('artists', updated);
      return updated;
    });
    showToast('Artist profile updated.');
  };

  const deleteArtist = async (id) => {
    setArtists(prev => {
      const updated = prev.filter(a => a.id !== id);
      updateContentSection('artists', updated);
      return updated;
    });
    showToast('Artist removed from team.');
  };

  // Products CRUD
  const addProduct = async (newProd) => {
    const prod = { ...newProd, id: `prod-${Date.now()}`, status: 'In Stock' };
    setProducts(prev => {
      const updated = [...prev, prod];
      updateContentSection('products', updated);
      return updated;
    });
    showToast(`Product ${prod.name} added to inventory.`);
  };

  const updateProduct = async (updatedProd) => {
    setProducts(prev => {
      const updated = prev.map(p => p.id === updatedProd.id ? updatedProd : p);
      updateContentSection('products', updated);
      return updated;
    });
    showToast('Product inventory updated.');
  };

  const deleteProduct = async (id) => {
    setProducts(prev => {
      const updated = prev.filter(p => p.id !== id);
      updateContentSection('products', updated);
      return updated;
    });
    showToast('Product removed from catalog.');
  };

  // Reviews Moderation CRUD
  const addReview = async (newRev) => {
    const rev = { ...newRev, id: `rev-${Date.now()}`, date: new Date().toISOString().split('T')[0], status: 'Approved' };
    setReviews(prev => {
      const updated = [rev, ...prev];
      updateContentSection('reviews', updated);
      return updated;
    });
  };

  const updateReviewStatus = async (id, status) => {
    setReviews(prev => {
      const updated = prev.map(r => r.id === id ? { ...r, status } : r);
      updateContentSection('reviews', updated);
      return updated;
    });
    showToast(`Review status updated to ${status}.`);
  };

  const toggleReviewFeatured = async (id) => {
    setReviews(prev => {
      const updated = prev.map(r => r.id === id ? { ...r, featured: !r.featured } : r);
      updateContentSection('reviews', updated);
      return updated;
    });
    showToast('Featured review status updated.');
  };

  const deleteReview = async (id) => {
    setReviews(prev => {
      const updated = prev.filter(r => r.id !== id);
      updateContentSection('reviews', updated);
      return updated;
    });
    showToast('Review removed.');
  };

  // Admin Users Management
  const addAdminUser = async (newUser) => {
    const usr = { ...newUser, id: `usr-${Date.now()}`, status: 'Active', lastLogin: 'Never', avatar: (newUser.name || 'U')[0].toUpperCase() };
    setAdminUsers(prev => {
      const updated = [...prev, usr];
      updateContentSection('adminUsers', updated);
      return updated;
    });
    showToast(`User ${usr.name} added to admin portal.`);
  };

  const deleteAdminUser = async (id) => {
    setAdminUsers(prev => {
      const updated = prev.filter(u => u.id !== id);
      updateContentSection('adminUsers', updated);
      return updated;
    });
    showToast('Admin user access revoked.');
  };

  // Maintenance Mode Toggle
  const toggleMaintenanceMode = async () => {
    const nextState = !maintenanceMode;
    setMaintenanceMode(nextState);
    updateContentSection('maintenanceMode', nextState);
    showToast(nextState ? 'Maintenance mode enabled.' : 'Platform online and live for clients.');
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
    showToast(`Booking #${id} marked as ${status}.`);
  };

  // Update Enquiry Status / Delete
  const updateEnquiryStatus = async (id, status) => {
    setEnquiries(prev => {
      const updated = prev.map(e => e.id === id ? { ...e, status } : e);
      updateContentSection('enquiries', updated);
      return updated;
    });
  };

  const deleteEnquiry = async (id) => {
    setEnquiries(prev => {
      const updated = prev.filter(e => e.id !== id);
      updateContentSection('enquiries', updated);
      return updated;
    });
  };

  // Content Setters
  const saveSalonInfo = (newInfo) => {
    setSalonInfo(newInfo);
    updateContentSection('salonInfo', newInfo);
  };

  const saveStats = (newStats) => {
    setStats(newStats);
    updateContentSection('stats', newStats);
  };

  const savePolicies = (newPolicies) => {
    setPolicies(newPolicies);
    updateContentSection('policies', newPolicies);
  };

  const saveFaqs = (newFaqs) => {
    setFaqs(newFaqs);
    updateContentSection('faqs', newFaqs);
  };

  const saveWhyChoose = (newWhy) => {
    setWhyChoose(newWhy);
    updateContentSection('whyChoose', newWhy);
  };

  const saveTestimonials = (newTestimonials) => {
    setTestimonials(newTestimonials);
    updateContentSection('testimonials', newTestimonials);
  };

  // Modal Controls
  const openModal = (type, data = null) => {
    setModalState({ isOpen: true, type, data });
  };
  const closeModal = () => {
    setModalState({ isOpen: false, type: null, data: null });
  };

  // Unified Booking Starter
  const startBooking = (item = null, type = 'salon') => {
    setSelectedBookingItem(item);
    setBookingType(type);
    setActiveTab(type === 'home' ? 'booking-home' : 'booking-salon');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppContext.Provider value={{
      activeTab,
      setActiveTab,
      userRole,
      setUserRole,
      customerUser,
      customerAuthModalOpen,
      openCustomerAuthModal,
      closeCustomerAuthModal,
      loginCustomer,
      registerCustomer,
      loginCustomerWithGoogle,
      logoutCustomer,
      resetCustomerPassword,
      isFirebaseConfigured,
      adminToken,
      isAdminAuthenticated,
      authError,
      setAuthError,
      toastMessage,
      adminLogin,
      adminLogout,
      lockAdminSession,
      lockAdminPortal: lockAdminSession,
      stats,
      setStats: saveStats,
      salonInfo,
      setSalonInfo: saveSalonInfo,
      whyChoose,
      setWhyChoose: saveWhyChoose,
      services,
      packages,
      portfolio,
      offers,
      testimonials,
      setTestimonials: saveTestimonials,
      faqs,
      setFaqs: saveFaqs,
      policies,
      setPolicies: savePolicies,
      artists,
      addArtist,
      updateArtist,
      deleteArtist,
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      reviews,
      addReview,
      updateReviewStatus,
      toggleReviewFeatured,
      deleteReview,
      adminUsers,
      addAdminUser,
      deleteAdminUser,
      maintenanceMode,
      toggleMaintenanceMode,
      bookings,
      myBookingIds,
      enquiries,
      updateEnquiryStatus,
      deleteEnquiry,
      createEnquiry,
      blockedSlots,
      modalState,
      openModal,
      closeModal,
      selectedBookingItem,
      setSelectedBookingItem,
      bookingType,
      setBookingType,
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

