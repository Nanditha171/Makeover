// src/data/initialData.js - Real Initial Seed Data Configuration

export const INITIAL_STATS = {
  yearsExperience: "5+",
  happyClients: "500+",
  bridalMakeovers: "200+",
  eventsCovered: "100+"
};

export const INITIAL_SALON_INFO = {
  name: "Aura Beauty Studio & Makeup Artistry",
  artistName: "Ananya Sharma",
  title: "Celebrity & Bridal Makeup Specialist",
  tagline: "Your Beauty. Your Occasion. Your Signature Look.",
  heroTitle: "Your Beauty. Your Occasion. Your Signature Look.",
  heroDescription: "Hyderabad’s premier luxury makeup studio & doorstep vanity service. Specializing in Bridal HD, Airbrush, Engagement glam, and customized salon rituals.",
  phone: "",
  whatsapp: "",
  email: "",
  address: "Plot 42, Executive Enclave, Jubilee Hills, Hyderabad, Telangana 500033",
  googleMapsUrl: "https://maps.google.com/?q=Jubilee+Hills+Hyderabad",
  instagram: "aurabeauty_ananya",
  hours: "Monday - Sunday: 10:00 AM - 8:00 PM",
  homeServiceCharge: 500,
  advancePercent: 30, // 30% advance deposit to lock slot
  fixedAdvanceAmount: 1000,
  usePercentageAdvance: true
};

export const INITIAL_WHY_CHOOSE = [
  {
    id: "why-1",
    title: "Certified Professional Artistry",
    description: "Personalized makeup tailored to your unique facial features, bone structure, and occasion."
  },
  {
    id: "why-2",
    title: "100% Authentic Luxury Cosmetics",
    description: "Exclusive use of Charlotte Tilbury, NARS, MAC, Huda Beauty, and TEMPTU Airbrush products."
  },
  {
    id: "why-3",
    title: "Camera-Ready HD & Airbrush",
    description: "Flawless, sweat-proof, 16+ hour finish designed for 4K wedding photography and stage lighting."
  },
  {
    id: "why-4",
    title: "Hospital-Grade Hygiene Protocol",
    description: "UV brush sterilization, disposable applicators, and sanitized kit application for every client."
  },
  {
    id: "why-5",
    title: "Studio & Doorstep Home Vanity",
    description: "Visit our Jubilee Hills studio or receive portable lighting vanity service directly at your venue."
  },
  {
    id: "why-6",
    title: "Transparent Pricing & Guaranteed Slots",
    description: "Clear package pricing with no hidden charges, punctuality guarantee, and structured slot booking."
  }
];

export const INITIAL_SERVICES = [
  // 1. BRIDAL MAKEUP
  {
    id: "srv-bridal-1",
    name: "Bridal HD Makeup",
    category: "Bridal Makeup",
    price: 12000,
    isStartingFrom: false,
    duration: "2.5 - 3 Hours",
    description: "High Definition camera-ready bridal makeup for long-lasting perfection under studio and venue lighting.",
    inclusions: ["HD Base & Contouring", "Eye Makeup & 3D Lashes", "Blush & Highlight", "Lip Artistry", "Setting Spray & Touch-up Kit"],
    availableAt: "Salon & Home Service",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "srv-bridal-2",
    name: "Bridal Airbrush Makeup",
    category: "Bridal Makeup",
    price: 15000,
    isStartingFrom: false,
    duration: "3 - 3.5 Hours",
    description: "Ultra-lightweight, 16+ hour waterproof silicon airbrush finish for a poreless, radiant bridal complexion.",
    inclusions: ["TEMPTU Airbrush Base", "Hydrating Pre-Prep", "Luxury Mink Lashes", "Precision Contouring", "Touch-up Mini Kit"],
    availableAt: "Salon & Home Service",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "srv-bridal-3",
    name: "Signature Royal Bridal Makeover",
    category: "Bridal Makeup",
    price: 18000,
    isStartingFrom: false,
    duration: "3.5 - 4 Hours",
    description: "Ultra-luxury bridal transformation utilizing Charlotte Tilbury and NARS with advanced hair sculpting and jewelry pinning.",
    inclusions: ["Airbrush or HD Formula", "Pre-bridal Skin Ritual", "Premium Mink Lashes", "Real Hair Extensions Integration", "Jewelry & Veil Setting"],
    availableAt: "Salon & Home Service",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "srv-bridal-4",
    name: "Bridal Consultation & Trial",
    category: "Bridal Makeup",
    price: 2500,
    isStartingFrom: false,
    duration: "1.5 Hours",
    description: "Dedicated preview consultation & half-face trial at studio to finalize your skin prep, shade match, and eye look.",
    inclusions: ["Skin & Tone Assessment", "Base Testing", "Eye Look Preview", "Hairstyle Discussion", "Look Planning"],
    availableAt: "Salon Studio",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80"
  },

  // 2. ENGAGEMENT & RECEPTION
  {
    id: "srv-eng-1",
    name: "Engagement HD Makeup",
    category: "Engagement & Reception",
    price: 7500,
    isStartingFrom: false,
    duration: "2 Hours",
    description: "Soft glow HD makeup designed to complement engagement lehengas, gowns, and silk sarees.",
    inclusions: ["Radiant HD Base", "Eye Styling & Lashes", "Cheek Sculpting", "Lip Perfection", "Fixing Mist"],
    availableAt: "Salon & Home Service",
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "srv-eng-2",
    name: "Airbrush Engagement Makeup",
    category: "Engagement & Reception",
    price: 9500,
    isStartingFrom: false,
    duration: "2.5 Hours",
    description: "Silky airbrush application ensuring non-cakey, long-lasting glow through evening ceremony celebrations.",
    inclusions: ["TEMPTU Airbrush Foundation", "Custom Lip Shade", "Mink Lashes", "Highlight Glow", "Fixing Mist"],
    availableAt: "Salon & Home Service",
    image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "srv-rec-1",
    name: "Reception Glam Makeup",
    category: "Engagement & Reception",
    price: 8500,
    isStartingFrom: false,
    duration: "2 Hours",
    description: "Glamorous evening reception look with bold or elegant tones customized for stage photography.",
    inclusions: ["Evening Glam Base", "Statement Eye Artistry", "Volumizing Lashes", "Contour & Highlight"],
    availableAt: "Salon & Home Service",
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=600&q=80"
  },

  // 3. PARTY & EVENT MAKEUP
  {
    id: "srv-pty-1",
    name: "Party Makeup",
    category: "Party & Event Makeup",
    price: 2500,
    isStartingFrom: false,
    duration: "1 Hour",
    description: "Elegant, lightweight party makeover for sangeet, cocktail parties, and family gatherings.",
    inclusions: ["Radiant Base", "Eye Styling", "Basic Lashes", "Lip Tint"],
    availableAt: "Salon & Home Service",
    image: "https://images.unsplash.com/photo-1500840216050-6ffa99d75160?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "srv-pty-2",
    name: "HD Party Makeup",
    category: "Party & Event Makeup",
    price: 3500,
    isStartingFrom: false,
    duration: "1.5 Hours",
    description: "Camera-perfect HD party makeup for bridesmaids, sisters of the bride/groom, and event guests.",
    inclusions: ["HD Base", "Smokey/Glam Eyes", "3D Lashes", "Highlight & Blush"],
    availableAt: "Salon & Home Service",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80"
  },

  // 4. HAIRSTYLING
  {
    id: "srv-hair-1",
    name: "Basic Hairstyling",
    category: "Hairstyling",
    price: 1000,
    isStartingFrom: false,
    duration: "45 Mins",
    description: "Classic blow-dry, soft curls, straightening, or simple buns for party looks.",
    inclusions: ["Heat Protection", "Styling with Heat Tools", "Holding Mist"],
    availableAt: "Salon & Home Service",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "srv-hair-2",
    name: "Bridal Hairstyling",
    category: "Hairstyling",
    price: 2500,
    isStartingFrom: false,
    duration: "1.5 Hours",
    description: "Traditional South Indian braided hair with fresh jasmine floral placement or structured regal updos.",
    inclusions: ["Stuffing & Padding", "Floral / Accessory Placement", "Strong Hold Setting"],
    availableAt: "Salon & Home Service",
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "srv-hair-3",
    name: "Premium Hollywood Waves & 3D Updos",
    category: "Hairstyling",
    price: 3500,
    isStartingFrom: false,
    duration: "2 Hours",
    description: "Hollywood glam waves, textured messy boho braids, or intricate modern bridal updos.",
    inclusions: ["Texture Preparation", "Extension Integration", "Jewelry Pinning"],
    availableAt: "Salon & Home Service",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80"
  },

  // 5. DRAPING
  {
    id: "srv-drp-1",
    name: "Saree Draping",
    category: "Draping",
    price: 700,
    isStartingFrom: false,
    duration: "30 Mins",
    description: "Crisp pleating and secure pinup for Kanjeevaram, Silk, Georgette, or Chiffon sarees.",
    inclusions: ["Pleating", "Safety Pinning", "Shape Adjustment"],
    availableAt: "Salon & Home Service",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "srv-drp-2",
    name: "Bridal Saree & Dupatta Draping",
    category: "Draping",
    price: 1200,
    isStartingFrom: false,
    duration: "45 Mins",
    description: "Heavy bridal saree draping with box pleats, waist belt securing, and dual dupatta veil setup.",
    inclusions: ["Box Pleating", "Waist Belt Fixing", "Head Veil Pinning"],
    availableAt: "Salon & Home Service",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80"
  },

  // 6. SALON BEAUTY SERVICES
  {
    id: "srv-sal-1",
    name: "Precision Haircut & Blowdry",
    category: "Salon Beauty Services",
    price: 500,
    isStartingFrom: true,
    duration: "45 Mins",
    description: "Precision haircut tailored to face shape followed by signature blowout styling.",
    inclusions: ["Shampoo Wash", "Conditioning", "Cut & Blowdry"],
    availableAt: "Salon Studio",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "srv-sal-2",
    name: "Nourishing Hair Spa Ritual",
    category: "Salon Beauty Services",
    price: 1200,
    isStartingFrom: true,
    duration: "1 Hour",
    description: "Deep conditioning and relaxing scalp massage treatment with steam infusion.",
    inclusions: ["Scalp Massage", "Steam Treatment", "Nourishing Hair Mask"],
    availableAt: "Salon Studio",
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "srv-sal-3",
    name: "Radiance Skin Facial",
    category: "Salon Beauty Services",
    price: 1000,
    isStartingFrom: true,
    duration: "1 Hour",
    description: "Deep pore cleansing, exfoliation, and glow-boosting botanical facial customized for skin type.",
    inclusions: ["Cleansing", "Scrub", "Face Massage", "Brightening Pack"],
    availableAt: "Salon Studio",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "srv-sal-4",
    name: "Manicure & Pedicure Spa",
    category: "Salon Beauty Services",
    price: 1400,
    isStartingFrom: false,
    duration: "1.5 Hours",
    description: "Relaxing hand & foot spa with exfoliating scrub, cuticle care, deep massage, and polish.",
    inclusions: ["Aromatic Soak", "Callus Scrub", "Hydrating Massage", "Nail Paint"],
    availableAt: "Salon Studio",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "srv-sal-5",
    name: "Threading & Waxing Services",
    category: "Salon Beauty Services",
    price: 300,
    isStartingFrom: true,
    duration: "30 Mins",
    description: "Hygienic eyebrow shaping, facial threading, and gentle Rica waxing rituals.",
    inclusions: ["Eyebrow Arching", "Cooling Gel", "Post-treatment Care"],
    availableAt: "Salon Studio",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80"
  }
];

export const INITIAL_PACKAGES = [
  {
    id: "pkg-1",
    name: "Bridal Essential Package",
    price: 15000,
    originalPrice: 18000,
    badge: "Popular Choice",
    description: "Complete classic HD bridal makeover package designed for timeless elegance and lasting beauty.",
    inclusions: [
      "Bridal HD Makeup",
      "Bridal Hairstyling",
      "Saree / Dupatta Draping",
      "3D Eyelashes",
      "Pre-Bridal Consultation"
    ],
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "pkg-2",
    name: "Bridal Premium Package",
    price: 22000,
    originalPrice: 26000,
    badge: "Most Booked",
    description: "Complete luxury HD or Airbrush bridal makeover with hair extensions, dual veil draping, and skin prep ritual.",
    inclusions: [
      "HD or TEMPTU Airbrush Makeup",
      "Premium Bridal Hairstyling",
      "Saree & Dual Dupatta Draping",
      "Premium Mink Lashes",
      "Hair Extensions Placement",
      "Pre-Bridal Skin Preparation Ritual",
      "Complimentary Studio Trial"
    ],
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "pkg-3",
    name: "Bridal Signature Royal VIP",
    price: 30000,
    originalPrice: 36000,
    badge: "Royal Luxury",
    description: "The ultimate celebrity treatment featuring full airbrushing, trial makeup, luxury extensions, and touch-up support.",
    inclusions: [
      "TEMPTU Airbrush Bridal Makeup",
      "Hollywood Waves / Regal Updo",
      "Bridal Dupatta & Saree Draping",
      "Real Human Hair Extensions",
      "Luxury 3D Mink Lashes",
      "Full Bridal Makeup Trial Included",
      "Deep Hydration Skin Prep",
      "Touch-up Kit & On-site Attendant"
    ],
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80"
  }
];

export const INITIAL_PORTFOLIO = [
  {
    id: "port-1",
    title: "Royal Crimson Velvet Bridal Look",
    category: "Bridal",
    type: "Bridal HD Makeup",
    price: "₹15,000",
    description: "Traditional Telugu bride with glowing golden base, cut-crease eye makeup, and matte crimson lipstick.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "port-2",
    title: "Pastel Elegance Engagement Glam",
    category: "Engagement",
    type: "HD Engagement Makeup",
    price: "₹7,500",
    description: "Soft peach-pink monochromatic makeup with Hollywood glam waves for a pastel lehenga.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "port-3",
    title: "Starlight Airbrush Reception Look",
    category: "Reception",
    type: "Airbrush Reception Makeup",
    price: "₹9,500",
    description: "High-shimmer evening glam with smokey champagne eyes and glossy nude lip perfection.",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "port-4",
    title: "Sangeet Cocktail Party Glam",
    category: "Party",
    type: "HD Party Makeup",
    price: "₹3,500",
    description: "Bold winged eyeliner with sculpted cheeks and voluminous textured messy braid.",
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "port-5",
    title: "Heritage South Indian Silk Saree Look",
    category: "Traditional",
    type: "Bridal HD Makeup",
    price: "₹12,000",
    description: "Classic temple jewelry look with Kohl-rimmed lotus eyes and fresh gajra braid.",
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "port-6",
    title: "Boho Textured Bridal Braids",
    category: "Hairstyling",
    type: "Bridal Hairstyling",
    price: "₹2,500",
    description: "Textured messy boho braid woven with gypsophila baby's breath flowers.",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80"
  }
];

export const INITIAL_OFFERS = [
  {
    id: "off-1",
    title: "Bridal Season Glow Offer",
    category: "Bridal Special",
    regularPrice: 22000,
    offerPrice: 18999,
    savings: 3001,
    code: "BRIDALGLOW",
    validTill: "2026-12-31",
    description: "Get HD Bridal Makeup + Hair Extensions + Skin Preparation Ritual at a special promotional rate.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "off-2",
    title: "Engagement & Reception Combo",
    category: "Combo Offer",
    regularPrice: 17000,
    offerPrice: 14999,
    savings: 2001,
    code: "DUALGLAM",
    validTill: "2026-12-31",
    description: "Book both Engagement and Reception makeup together and receive a complimentary bridal trial consultation.",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80"
  }
];

export const INITIAL_TESTIMONIALS = [
  {
    id: "t-1",
    name: "Sneha Reddy",
    rating: 5,
    role: "Bride",
    review: "Ananya did my bridal makeup for my Muhurtham and Reception. The airbrush finish stayed untouched for 14 hours despite the heat. Flawless photography results!",
    serviceBooked: "Bridal Signature Package",
    date: "2026-02-18",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "t-2",
    name: "Meghna Kapoor",
    rating: 5,
    role: "Engagement Client",
    review: "Loved how light and natural the makeup felt! The home service team arrived right on time with full portable vanity lighting. Highly recommended in Hyderabad.",
    serviceBooked: "HD Engagement Makeup",
    date: "2026-02-24",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80"
  }
];

export const INITIAL_FAQS = [
  {
    id: "faq-1",
    question: "How much advance payment is required to confirm a booking?",
    answer: "A 30% advance deposit is required to lock your appointment slot on our calendar. The remaining 70% balance is payable on the day of the service."
  },
  {
    id: "faq-2",
    question: "Do you provide home service / venue makeup?",
    answer: "Yes! Our artist brings a complete professional portable lighting vanity setup, sanitized kit, and luxury cosmetics directly to your home or wedding venue."
  },
  {
    id: "faq-3",
    question: "Do you provide bridal makeup trials?",
    answer: "Yes, we offer a dedicated Bridal Makeup Trial service (₹2,500) at our Jubilee Hills studio. It includes skin assessment, shade matching, and half-face look previews."
  },
  {
    id: "faq-4",
    question: "Are hairstyling and draping included in makeup packages?",
    answer: "All our bridal and engagement packages include complete hair styling, saree draping, and lashes. For individual makeup services, add-ons can be easily selected."
  },
  {
    id: "faq-5",
    question: "Which makeup products and brands do you use?",
    answer: "We exclusively use authentic global luxury cosmetics including Charlotte Tilbury, NARS, MAC Cosmetics, Huda Beauty, Bobbi Brown, TEMPTU Airbrush, and Kryolan."
  },
  {
    id: "faq-6",
    question: "How long does bridal makeup take?",
    answer: "Bridal HD or Airbrush makeup along with hairstyling and draping typically takes between 2.5 to 3.5 hours."
  },
  {
    id: "faq-7",
    question: "Can I reschedule my appointment if my event date changes?",
    answer: "Rescheduling is permitted up to 7 days prior to your booked date, subject to slot availability on the new date."
  }
];

export const INITIAL_POLICIES = {
  cancellationPolicy: "Advance deposits (30%) lock your calendar date. Cancellations made at least 7 days prior can convert the deposit into credit valid for 6 months.",
  advancePolicy: "A 30% advance deposit is mandatory to lock your date & time slot. The remaining balance is payable at the time of appointment.",
  homeServicePolicy: "A travel & kit transportation charge of ₹500 is applied for doorstep home & venue services within city limits.",
  hygienePolicy: "We enforce single-use disposables for mascara, lip color, and sponges. All brushes undergo hospital-grade UV sterilization and alcohol cleansing after every client."
};

// REAL DATA INITIALIZATION: Bookings, Enquiries, and Blocked Slots start empty without dummy records
export const INITIAL_BOOKINGS = [];
export const INITIAL_ENQUIRIES = [];
export const INITIAL_BLOCKED_SLOTS = [];

export const INITIAL_ARTISTS = [
  {
    id: "art-1",
    name: "Ananya Sharma",
    role: "Lead Celebrity & Bridal Specialist",
    experience: "8+ Years",
    rating: 4.9,
    reviewsCount: 142,
    status: "Active",
    phone: "+91 98765 43210",
    email: "ananya@aurabeauty.in",
    specialties: ["Bridal HD", "TEMPTU Airbrush", "Celebrity Red Carpet"],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "art-2",
    name: "Priya Sen",
    role: "Senior Airbrush & Glam Specialist",
    experience: "6 Years",
    rating: 4.8,
    reviewsCount: 98,
    status: "Active",
    phone: "+91 98765 43211",
    email: "priya@aurabeauty.in",
    specialties: ["Airbrush Base", "Cocktail Glam", "Editorial Eye Art"],
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "art-3",
    name: "Meera Nair",
    role: "Master Hairstylist & Draping Artist",
    experience: "7 Years",
    rating: 4.9,
    reviewsCount: 115,
    status: "Active",
    phone: "+91 98765 43212",
    email: "meera@aurabeauty.in",
    specialties: ["Hollywood Waves", "Traditional Saree Draping", "Floral Hair Sculpting"],
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "art-4",
    name: "Ritu Kapoor",
    role: "Skin Aesthetician & HD Party Artist",
    experience: "4 Years",
    rating: 4.7,
    reviewsCount: 64,
    status: "Active",
    phone: "+91 98765 43213",
    email: "ritu@aurabeauty.in",
    specialties: ["Skin Pre-prep", "HD Party Looks", "Natural Glow Makeovers"],
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"
  }
];

export const INITIAL_PRODUCTS = [
  {
    id: "prod-1",
    name: "TEMPTU 24-Hour Silicon Airbrush Pods",
    brand: "TEMPTU Pro",
    category: "Airbrush Cosmetics",
    sku: "TMP-AIR-24",
    stock: 28,
    minStock: 10,
    unitPrice: 3200,
    status: "In Stock",
    supplier: "TEMPTU Direct India",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "prod-2",
    name: "Charlotte Tilbury Airbrush Flawless Finish Powder",
    brand: "Charlotte Tilbury",
    category: "Base & Powders",
    sku: "CT-AIR-POW",
    stock: 14,
    minStock: 5,
    unitPrice: 4600,
    status: "In Stock",
    supplier: "Nykaa Luxury Pro",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "prod-3",
    name: "NARS Natural Radiant Longwear Foundation",
    brand: "NARS Cosmetics",
    category: "Foundation & Concealer",
    sku: "NARS-RAD-FND",
    stock: 19,
    minStock: 8,
    unitPrice: 4200,
    status: "In Stock",
    supplier: "Sephora Pro Supply",
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "prod-4",
    name: "Huda Beauty Rose Quartz Eyeshadow Palette",
    brand: "Huda Beauty",
    category: "Eye Artistry",
    sku: "HB-ROSE-QTZ",
    stock: 8,
    minStock: 5,
    unitPrice: 5400,
    status: "In Stock",
    supplier: "Nykaa Luxury Pro",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "prod-5",
    name: "Luxury 3D Real Mink Eyelashes (Box of 20)",
    brand: "LashArtisan Pro",
    category: "Lashes & Adhesives",
    sku: "LSH-MINK-3D",
    stock: 45,
    minStock: 15,
    unitPrice: 1800,
    status: "In Stock",
    supplier: "LashArtisan India",
    image: "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "prod-6",
    name: "Hospital-Grade UV Cosmetic Sanitizer Station",
    brand: "SterilPro Med",
    category: "Hygiene & Equipment",
    sku: "UV-SAN-BOX",
    stock: 4,
    minStock: 2,
    unitPrice: 8500,
    status: "In Stock",
    supplier: "MediTech Hygenics",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80"
  }
];

export const INITIAL_REVIEWS = [
  {
    id: "rev-1",
    clientName: "Sneha Reddy",
    rating: 5,
    service: "Bridal Signature Package",
    artist: "Ananya Sharma",
    date: "2026-02-18",
    comment: "Ananya did my bridal makeup for my Muhurtham and Reception. The airbrush finish stayed untouched for 14 hours despite the heat. Flawless photography results!",
    status: "Approved",
    featured: true
  },
  {
    id: "rev-2",
    clientName: "Meghna Kapoor",
    rating: 5,
    service: "HD Engagement Makeup",
    artist: "Priya Sen",
    date: "2026-02-24",
    comment: "Loved how light and natural the makeup felt! The home service team arrived right on time with full portable vanity lighting. Highly recommended in Hyderabad.",
    status: "Approved",
    featured: true
  },
  {
    id: "rev-3",
    clientName: "Pooja Hegde",
    rating: 5,
    service: "Reception Glam Makeup",
    artist: "Ananya Sharma",
    date: "2026-03-02",
    comment: "The precision eye makeup and Hollywood waves were breathtaking. Received so many compliments on stage!",
    status: "Approved",
    featured: false
  }
];

export const INITIAL_ADMIN_USERS = [
  {
    id: "usr-1",
    name: "Nanditha J",
    email: "nandithaj2005@gmail.com",
    role: "Super Admin",
    status: "Active",
    lastLogin: "Just Now",
    avatar: "N"
  },
  {
    id: "usr-2",
    name: "Ananya Sharma",
    email: "ananya@aurabeauty.in",
    role: "Studio Director",
    status: "Active",
    lastLogin: "2 hours ago",
    avatar: "A"
  },
  {
    id: "usr-3",
    name: "Kavya Rao",
    email: "reception@aurabeauty.in",
    role: "Salon Manager",
    status: "Active",
    lastLogin: "Yesterday",
    avatar: "K"
  }
];

export const INITIAL_MAINTENANCE_MODE = false;
