// api/index.js - Vercel Serverless Function Handler for Express Backend API
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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
} from '../src/data/initialData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const JWT_SECRET = 'aura_beauty_secure_jwt_secret_key_2026_x893';

// BCRYPT HASH FOR USERNAME "Makeup" AND PASSWORD "Nanduj2803"
const ADMIN_USERNAME = 'Makeup';
const ADMIN_PASSWORD_HASH = '$2b$10$KTFAvFgBtnRlyGewQc.w0.T3THfxCQzzCOAYGthUq0uHgqewTl3Eq';

app.use(cors());
app.use(express.json());

// In-Memory fallback data store for Vercel Serverless runtime
let db = {
  stats: INITIAL_STATS,
  salonInfo: INITIAL_SALON_INFO,
  services: INITIAL_SERVICES,
  packages: INITIAL_PACKAGES,
  portfolio: INITIAL_PORTFOLIO,
  offers: INITIAL_OFFERS,
  testimonials: INITIAL_TESTIMONIALS,
  policies: INITIAL_POLICIES,
  bookings: INITIAL_BOOKINGS,
  blockedSlots: INITIAL_BLOCKED_SLOTS
};

// Try reading db.json if exists in root or /tmp
const DB_PATH = path.join(__dirname, '../db.json');
try {
  if (fs.existsSync(DB_PATH)) {
    db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  }
} catch (e) {}

const saveDB = () => {
  try {
    const TMP_DB = path.join('/tmp', 'db.json');
    fs.writeFileSync(TMP_DB, JSON.stringify(db, null, 2));
  } catch (e) {}
};

// Middleware: Authenticate Admin JWT Token
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.username !== ADMIN_USERNAME) {
      return res.status(403).json({ error: 'Forbidden: Invalid admin token' });
    }
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized: Token expired or invalid' });
  }
};

// ---------------- API ENDPOINTS ---------------- //

// 1. Admin Login API
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Please enter both username and password' });
  }

  if (username !== ADMIN_USERNAME) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const isPasswordValid = bcrypt.compareSync(password, ADMIN_PASSWORD_HASH);
  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const token = jwt.sign({ username: ADMIN_USERNAME, role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
  res.json({
    success: true,
    message: 'Admin authentication successful',
    token,
    user: { username: ADMIN_USERNAME, role: 'admin' }
  });
});

// 2. Verify Session API
app.get('/api/admin/verify', authenticateAdmin, (req, res) => {
  res.json({ authenticated: true, username: req.admin.username });
});

// 3. Admin Logout API
app.post('/api/admin/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
});

// 4. Public Database Data Fetch API
app.get('/api/data', (req, res) => {
  res.json(db);
});

// 5. Public Booking API
app.post('/api/bookings', (req, res) => {
  const bookingData = req.body;
  const newId = `GLOW-${Math.floor(1000 + Math.random() * 9000)}`;

  const newBooking = {
    id: newId,
    createdDate: new Date().toISOString().split('T')[0],
    status: 'Confirmed',
    paymentStatus: 'Paid (Advance)',
    ...bookingData
  };

  db.bookings = [newBooking, ...db.bookings];
  saveDB();

  res.status(201).json({ success: true, booking: newBooking });
});

// 6. Admin Content Management Updates API
app.post('/api/admin/update-content', authenticateAdmin, (req, res) => {
  const { key, data } = req.body;
  if (!key || data === undefined) {
    return res.status(400).json({ error: 'Missing key or data' });
  }

  db[key] = data;
  saveDB();
  res.json({ success: true, message: 'Changes saved successfully.', updatedData: db[key] });
});

// 7. Services CRUD API
app.post('/api/admin/services', authenticateAdmin, (req, res) => {
  const newSrv = { ...req.body, id: `srv-${Date.now()}` };
  db.services = [...db.services, newSrv];
  saveDB();
  res.json({ success: true, message: 'Service added successfully.', services: db.services });
});

app.put('/api/admin/services/:id', authenticateAdmin, (req, res) => {
  const { id } = req.params;
  db.services = db.services.map(s => s.id === id ? { ...s, ...req.body } : s);
  saveDB();
  res.json({ success: true, message: 'Service updated successfully.', services: db.services });
});

app.delete('/api/admin/services/:id', authenticateAdmin, (req, res) => {
  const { id } = req.params;
  db.services = db.services.filter(s => s.id !== id);
  saveDB();
  res.json({ success: true, message: 'Service deleted successfully.', services: db.services });
});

// 8. Packages CRUD API
app.post('/api/admin/packages', authenticateAdmin, (req, res) => {
  const newPkg = { ...req.body, id: `pkg-${Date.now()}` };
  db.packages = [...db.packages, newPkg];
  saveDB();
  res.json({ success: true, message: 'Package added successfully.', packages: db.packages });
});

app.delete('/api/admin/packages/:id', authenticateAdmin, (req, res) => {
  const { id } = req.params;
  db.packages = db.packages.filter(p => p.id !== id);
  saveDB();
  res.json({ success: true, message: 'Package deleted successfully.', packages: db.packages });
});

// 9. Offers CRUD API
app.post('/api/admin/offers', authenticateAdmin, (req, res) => {
  const newOff = { ...req.body, id: `off-${Date.now()}` };
  db.offers = [...db.offers, newOff];
  saveDB();
  res.json({ success: true, message: 'Offer added successfully.', offers: db.offers });
});

app.delete('/api/admin/offers/:id', authenticateAdmin, (req, res) => {
  const { id } = req.params;
  db.offers = db.offers.filter(o => o.id !== id);
  saveDB();
  res.json({ success: true, message: 'Offer deleted successfully.', offers: db.offers });
});

// 10. Portfolio CRUD API
app.post('/api/admin/portfolio', authenticateAdmin, (req, res) => {
  const newItem = { ...req.body, id: `port-${Date.now()}` };
  db.portfolio = [...db.portfolio, newItem];
  saveDB();
  res.json({ success: true, message: 'Portfolio item added successfully.', portfolio: db.portfolio });
});

app.delete('/api/admin/portfolio/:id', authenticateAdmin, (req, res) => {
  const { id } = req.params;
  db.portfolio = db.portfolio.filter(p => p.id !== id);
  saveDB();
  res.json({ success: true, message: 'Portfolio item deleted successfully.', portfolio: db.portfolio });
});

// 11. Slot Locker API
app.post('/api/admin/blocked-slots', authenticateAdmin, (req, res) => {
  db.blockedSlots = [...db.blockedSlots, req.body];
  saveDB();
  res.json({ success: true, message: 'Slot blocked successfully.', blockedSlots: db.blockedSlots });
});

app.delete('/api/admin/blocked-slots', authenticateAdmin, (req, res) => {
  const { date, timeSlot } = req.body;
  db.blockedSlots = db.blockedSlots.filter(b => !(b.date === date && b.timeSlot === timeSlot));
  saveDB();
  res.json({ success: true, message: 'Slot unblocked successfully.', blockedSlots: db.blockedSlots });
});

// 12. Update Booking Status API
app.put('/api/admin/bookings/:id/status', authenticateAdmin, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  db.bookings = db.bookings.map(b => b.id === id ? { ...b, status } : b);
  saveDB();
  res.json({ success: true, message: 'Booking status updated.', bookings: db.bookings });
});

export default app;
