// src/data/initialData.js

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
  phone: "+91 98765 43210",
  whatsapp: "919876543210",
  email: "contact@aurabeauty.in",
  address: "Plot 42, Executive Enclave, Jubilee Hills, Hyderabad, Telangana 500033",
  googleMapsUrl: "https://maps.google.com/?q=Jubilee+Hills+Hyderabad",
  instagram: "@aurabeauty_ananya",
  hours: "Monday - Sunday: 10:00 AM - 8:00 PM",
  homeServiceCharge: 500,
  advancePercent: 30, // 30% advance deposit
  fixedAdvanceAmount: 1000,
  usePercentageAdvance: true
};

export const INITIAL_WHY_CHOOSE = [
  {
    id: "why-1",
    title: "Professional Expertise",
    description: "Personalized makeup services tailored to your unique facial features, preferences, and special occasion."
  },
  {
    id: "why-2",
    title: "Premium Products",
    description: "Authentic, high-end global products (MAC, NARS, Charlotte Tilbury, Huda Beauty) selected for your skin type."
  },
  {
    id: "why-3",
    title: "Personalized Looks",
    description: "Every makeup look is customized according to your outfit, jewelry, lighting, and personal aesthetic style."
  },
  {
    id: "why-4",
    title: "HD & Airbrush Expertise",
    description: "Flawless, camera-ready finish that looks natural in person and stunning in 4K wedding photography."
  },
  {
    id: "why-5",
    title: "Hygiene First Protocol",
    description: "Hospital-grade UV brush sterilization, single-use disposable applicators, and sanitized kit application."
  },
  {
    id: "why-6",
    title: "Reliable Appointments",
    description: "Punctual, structured slot management guaranteeing on-time service at our salon or your event venue."
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
    description: "High Definition camera-ready bridal makeup for long-lasting perfection under studio lighting.",
    inclusions: ["HD Base & Contouring", "Eye Makeup & Lashes", "Blush & Highlight", "Lip Makeup", "Final Touch-up"],
    availableAt: "Salon | Home Service",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "srv-bridal-2",
    name: "Bridal Airbrush Makeup",
    category: "Bridal Makeup",
    price: 15000,
    isStartingFrom: false,
    duration: "3 - 3.5 Hours",
    description: "Ultra-lightweight, 16+ hour waterproof silicon airbrush finish for a flawless poreless look.",
    inclusions: ["TEMPTU Airbrush Base", "Hydrating prep", "Luxury lashes", "Contouring & Highlight", "Touch-up kit"],
    availableAt: "Salon | Home Service",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "srv-bridal-3",
    name: "Premium Bridal Makeup",
    category: "Bridal Makeup",
    price: 18000,
    isStartingFrom: false,
    duration: "3.5 - 4 Hours",
    description: "Luxury bridal transformation using high-end global cosmetics (Charlotte Tilbury, NARS, Huda Beauty).",
    inclusions: ["Airbrush/HD choice", "Pre-bridal skin prep", "Premium mink lashes", "Extension placement", "Jewelry setting"],
    availableAt: "Salon | Home Service",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "srv-bridal-4",
    name: "Bridal Makeup Trial",
    category: "Bridal Makeup",
    price: 2500,
    isStartingFrom: false,
    duration: "1.5 Hours",
    description: "Dedicated preview consultation & half-face trial to finalize your skin prep, shade match, and eye look.",
    inclusions: ["Consultation", "Skin & shade assessment", "Base testing", "Eye look discussion", "Hairstyle discussion", "Final look planning"],
    availableAt: "Salon",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80"
  },

  // 2. ENGAGEMENT MAKEUP
  {
    id: "srv-eng-1",
    name: "Engagement Makeup",
    category: "Engagement Makeup",
    price: 7000,
    isStartingFrom: false,
    duration: "2 Hours",
    description: "Soft glow makeup designed to complement engagement lehengas, gowns, and silk sarees.",
    inclusions: ["Radiant base", "Eye styling", "Lashes", "Lip perfection", "Setting spray"],
    availableAt: "Salon | Home Service",
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "srv-eng-2",
    name: "HD Engagement Makeup",
    category: "Engagement Makeup",
    price: 8500,
    isStartingFrom: false,
    duration: "2.5 Hours",
    description: "High Definition flawless finish created for high-res ring ceremony photography.",
    inclusions: ["HD base", "Smudge-proof eyes", "3D lashes", "Contour & glow", "Touch-up kit"],
    availableAt: "Salon | Home Service",
    image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "srv-eng-3",
    name: "Airbrush Engagement Makeup",
    category: "Engagement Makeup",
    price: 10000,
    isStartingFrom: false,
    duration: "2.5 Hours",
    description: "Silky airbrush application ensuring non-caky long-lasting radiance through evening celebrations.",
    inclusions: ["Airbrush application", "Custom lip shade", "Mink lashes", "Fixing mist"],
    availableAt: "Salon | Home Service",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80"
  },

  // 3. RECEPTION MAKEUP
  {
    id: "srv-rec-1",
    name: "Reception Makeup",
    category: "Reception Makeup",
    price: 8000,
    isStartingFrom: false,
    duration: "2 Hours",
    description: "Glamorous evening reception look with bold or elegant tones customized for stage lighting.",
    inclusions: ["Evening glam base", "Statement eye makeup", "Lashes", "Highlight & contour"],
    availableAt: "Salon | Home Service",
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "srv-rec-2",
    name: "HD Reception Makeup",
    category: "Reception Makeup",
    price: 9000,
    isStartingFrom: false,
    duration: "2.5 Hours",
    description: "High-definition camera-ready reception makeup with flawless sculpting and glow.",
    inclusions: ["HD formula", "Glitter/Shimmer eyes", "Volumizing lashes", "Setting mist"],
    availableAt: "Salon | Home Service",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "srv-rec-3",
    name: "Airbrush Reception Makeup",
    category: "Reception Makeup",
    price: 10000,
    isStartingFrom: false,
    duration: "2.5 Hours",
    description: "Long-wear airbrush finish tailored for grandeur night receptions and red-carpet photography.",
    inclusions: ["Airbrush base", "Luxury eye makeup", "3D lashes", "Contour & cheek tint"],
    availableAt: "Salon | Home Service",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80"
  },

  // 4. PARTY & EVENT MAKEUP
  {
    id: "srv-pty-1",
    name: "Party Makeup",
    category: "Party & Event Makeup",
    price: 2500,
    isStartingFrom: false,
    duration: "1 Hour",
    description: "Elegant, lightweight party makeover for sangeet, cocktail parties, and family celebrations.",
    inclusions: ["Light foundation", "Eye styling", "Basic lashes", "Lip tint"],
    availableAt: "Salon | Home Service",
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "srv-pty-2",
    name: "HD Party Makeup",
    category: "Party & Event Makeup",
    price: 3500,
    isStartingFrom: false,
    duration: "1.5 Hours",
    description: "Camera-perfect HD party makeup for bridesmaids, sisters of the bride/groom, and guests.",
    inclusions: ["HD base", "Smokey/Glam eyes", "Lashes", "Highlight & blush"],
    availableAt: "Salon | Home Service",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "srv-pty-3",
    name: "Airbrush Party Makeup",
    category: "Party & Event Makeup",
    price: 4500,
    isStartingFrom: false,
    duration: "1.5 Hours",
    description: "Flawless airbrush finish for high-profile events and night celebrations.",
    inclusions: ["Airbrush foundation", "Glam eye design", "Premium lashes", "Fixer"],
    availableAt: "Salon | Home Service",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "srv-pty-4",
    name: "Event Makeup",
    category: "Party & Event Makeup",
    price: 3000,
    isStartingFrom: true,
    duration: "1.5 Hours",
    description: "Custom makeup for photoshoots, stage events, baby showers, and anniversary galas.",
    inclusions: ["Custom base", "Eye design", "Lashes", "Setting mist"],
    availableAt: "Salon | Home Service",
    image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=600&q=80"
  },

  // 5. HAIRSTYLING
  {
    id: "srv-hair-1",
    name: "Basic Hairstyling",
    category: "Hairstyling",
    price: 1000,
    isStartingFrom: false,
    duration: "45 Mins",
    description: "Classic blow-dry, soft curls, straightening, or simple buns for party looks.",
    inclusions: ["Heat protection", "Curls/Blow-dry", "Setting spray"],
    availableAt: "Salon | Home Service",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "srv-hair-2",
    name: "Bridal Hairstyling",
    category: "Hairstyling",
    price: 2500,
    isStartingFrom: false,
    duration: "1.5 Hours",
    description: "Elaborate traditional bridal buns, South Indian braided flowers, or structured updos.",
    inclusions: ["Stuffing & padding", "Floral/Accessory placement", "Strong hold spray"],
    availableAt: "Salon | Home Service",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "srv-hair-3",
    name: "Premium Bridal Hairstyling",
    category: "Hairstyling",
    price: 3500,
    isStartingFrom: false,
    duration: "2 Hours",
    description: "Hollywood glam waves, textured messy boho braids, or intricate designer updos.",
    inclusions: ["Texture prep", "Extension integration", "Jewelry pins setting"],
    availableAt: "Salon | Home Service",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "srv-hair-4",
    name: "Hair Extension Styling",
    category: "Hairstyling",
    price: 1500,
    isStartingFrom: true,
    duration: "1 Hour",
    description: "Clip-in real hair extension styling, blending, and volumetric styling.",
    inclusions: ["Extension placement", "Heat blending", "Styling"],
    availableAt: "Salon | Home Service",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80"
  },

  // 6. DRAPING
  {
    id: "srv-drp-1",
    name: "Saree Draping",
    category: "Draping",
    price: 700,
    isStartingFrom: false,
    duration: "30 Mins",
    description: "Neat, crisp pleating for Kanjeevaram, Silk, Chiffon, or Georgette sarees.",
    inclusions: ["Ironing pleats", "Pinning", "Shape retention"],
    availableAt: "Salon | Home Service",
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "srv-drp-2",
    name: "Bridal Saree Draping",
    category: "Draping",
    price: 1200,
    isStartingFrom: false,
    duration: "45 Mins",
    description: "Heavy bridal saree draping with box pleats, waist belt placement, and security pinning.",
    inclusions: ["Heavy silk pleating", "Can-can adjustment", "Waistband setting"],
    availableAt: "Salon | Home Service",
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "srv-drp-3",
    name: "Dupatta Draping",
    category: "Draping",
    price: 500,
    isStartingFrom: false,
    duration: "20 Mins",
    description: "Single dupatta styling for lehengas, Anarkalis, and shararas.",
    inclusions: ["Pleating", "Shoulder pinning"],
    availableAt: "Salon | Home Service",
    image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "srv-drp-4",
    name: "Bridal Dupatta Draping",
    category: "Draping",
    price: 800,
    isStartingFrom: false,
    duration: "35 Mins",
    description: "Dual dupatta regal veil draping over head and shoulder for brides.",
    inclusions: ["Head veil pinning", "Chest drape", "Safety security"],
    availableAt: "Salon | Home Service",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80"
  },

  // 7. SALON BEAUTY SERVICES
  {
    id: "srv-sal-1",
    name: "Haircut",
    category: "Salon Beauty Services",
    price: 500,
    isStartingFrom: true,
    duration: "45 Mins",
    description: "Precision haircut, layer cut, feather cut, or bob cut including hair wash.",
    inclusions: ["Hair wash", "Custom cut", "Blow-dry styling"],
    availableAt: "Salon",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "srv-sal-2",
    name: "Hair Styling",
    category: "Salon Beauty Services",
    price: 800,
    isStartingFrom: true,
    duration: "45 Mins",
    description: "Professional wash, blow-dry setting, or tongs styling.",
    inclusions: ["Hair wash", "Conditioning", "Blow-dry"],
    availableAt: "Salon",
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "srv-sal-3",
    name: "Hair Spa",
    category: "Salon Beauty Services",
    price: 1200,
    isStartingFrom: true,
    duration: "1 Hour",
    description: "Deep nourishing L'Oreal / Matrix hair spa ritual with head massage and steam.",
    inclusions: ["Cream massage", "Steam treatment", "Nourishing wash"],
    availableAt: "Salon",
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "srv-sal-4",
    name: "Facial",
    category: "Salon Beauty Services",
    price: 1000,
    isStartingFrom: true,
    duration: "1 Hour",
    description: "Glowing skin facial (Fruit, Gold, Pearl, O3+ Brightening) customized for skin type.",
    inclusions: ["Cleansing", "Scrub", "Massage cream", "Pack"],
    availableAt: "Salon",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "srv-sal-5",
    name: "Cleanup",
    category: "Salon Beauty Services",
    price: 600,
    isStartingFrom: true,
    duration: "40 Mins",
    description: "Deep pore cleanup for removal of blackheads, dead skin, and instant radiance.",
    inclusions: ["Steam", "Blackhead extraction", "Soothing pack"],
    availableAt: "Salon",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "srv-sal-6",
    name: "Threading",
    category: "Salon Beauty Services",
    price: 100,
    isStartingFrom: true,
    duration: "15 Mins",
    description: "Precise eyebrow shaping and facial threading.",
    inclusions: ["Eyebrow shaping", "Cooling gel"],
    availableAt: "Salon",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "srv-sal-7",
    name: "Eyebrow Threading",
    category: "Salon Beauty Services",
    price: 50,
    isStartingFrom: false,
    duration: "10 Mins",
    description: "Eyebrow threading & arch definition.",
    inclusions: ["Eyebrow arching", "Astringent gel"],
    availableAt: "Salon",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "srv-sal-8",
    name: "Upper Lip Threading",
    category: "Salon Beauty Services",
    price: 50,
    isStartingFrom: false,
    duration: "5 Mins",
    description: "Gentle upper lip threading.",
    inclusions: ["Upper lip threading", "Aloe vera gel"],
    availableAt: "Salon",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "srv-sal-9",
    name: "Manicure",
    category: "Salon Beauty Services",
    price: 700,
    isStartingFrom: false,
    duration: "45 Mins",
    description: "Relaxing hand spa manicure with nail shaping, cuticle care, and massage.",
    inclusions: ["Hand soak", "Scrub", "Massage", "Nail polish"],
    availableAt: "Salon",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "srv-sal-10",
    name: "Pedicure",
    category: "Salon Beauty Services",
    price: 800,
    isStartingFrom: false,
    duration: "45 Mins",
    description: "Soothing foot spa pedicure with heel scrubbing, nail care, and hydrating massage.",
    inclusions: ["Foot soak", "Heel scrub", "Massage", "Nail paint"],
    availableAt: "Salon",
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "srv-sal-11",
    name: "Waxing",
    category: "Salon Beauty Services",
    price: 500,
    isStartingFrom: true,
    duration: "30 Mins",
    description: "Hygienic Rica / Honey waxing for smooth hairless skin.",
    inclusions: ["Pre-wax gel", "Waxing", "Post-wax oil"],
    availableAt: "Salon",
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80"
  }
];

export const INITIAL_PACKAGES = [
  {
    id: "pkg-1",
    name: "Bridal Essential",
    price: 15000,
    originalPrice: 18000,
    description: "Complete classic bridal makeover package for budget-conscious elegant brides.",
    inclusions: [
      "HD Bridal Makeup",
      "Bridal Hairstyling",
      "Saree Draping",
      "Basic Lashes"
    ],
    badge: "Popular Essential",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "pkg-2",
    name: "Bridal Premium",
    price: 22000,
    originalPrice: 26000,
    description: "Luxury HD/Airbrush bridal package with hair extensions, dual draping, and skin prep.",
    inclusions: [
      "HD or Airbrush Makeup",
      "Premium Bridal Hairstyling",
      "Saree & Dupatta Draping",
      "Premium Mink Lashes",
      "Hair Extensions Placement",
      "Skin Preparation Ritual"
    ],
    badge: "Most Booked",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "pkg-3",
    name: "Bridal Signature",
    price: 30000,
    originalPrice: 36000,
    description: "The ultimate VIP royal bridal experience with trial makeup and full touch-up assistance.",
    inclusions: [
      "TEMPTU Airbrush Makeup",
      "Premium Bridal Hairstyling",
      "Bridal Dupatta & Saree Draping",
      "Real Hair Extensions",
      "Premium Mink Lashes",
      "Bridal Makeup Trial Included",
      "Pre-Bridal Skin Prep Ritual",
      "Touch-up Assistance Support"
    ],
    badge: "Royal Luxury",
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
    price: "₹8,500",
    description: "Soft peach-pink monochromatic makeup with Hollywood glam waves for a pastel lehenga.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "port-3",
    title: "Starlight Airbrush Reception Look",
    category: "Reception",
    type: "Airbrush Reception Makeup",
    price: "₹10,000",
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

export const INITIAL_TESTIMONIALS = [
  {
    id: "t-1",
    name: "Aditi Rao",
    rating: 5,
    role: "Bridal Makeup Client",
    review: "Absolutely loved my bridal look! Ananya was punctual, professional, and understood exactly what I wanted. The airbrush base stayed flawless from 6 AM to midnight without touch-up.",
    serviceBooked: "Bridal Signature Package",
    date: "2026-01-18",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "t-2",
    name: "Sneha Reddy",
    rating: 5,
    role: "Engagement Client",
    review: "The HD engagement makeup felt so light on my skin! I received endless compliments on my photos. The doorstep home service was super convenient for my morning ceremony.",
    serviceBooked: "HD Engagement Makeup",
    date: "2026-02-04",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "t-3",
    name: "Pooja Verma",
    rating: 5,
    role: "Reception & Party Client",
    review: "Booked Ananya for my reception and sister's party makeup. Spotless hygiene, branded cosmetics, and very patient hairstyling. Highly recommended in Hyderabad!",
    serviceBooked: "Airbrush Reception Makeup",
    date: "2026-02-14",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80"
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
    answer: "Yes! Our lead artist brings a complete professional portable lighting vanity setup, sanitized kit, and high-end cosmetics directly to your home or wedding venue."
  },
  {
    id: "faq-3",
    question: "Do you provide bridal makeup trials?",
    answer: "Yes, we offer a dedicated Bridal Makeup Trial service (₹2,500) at our Jubilee Hills studio. It includes skin assessment, shade matching, and half-face look previews."
  },
  {
    id: "faq-4",
    question: "Are hairstyling and draping included in makeup packages?",
    answer: "All our bridal and engagement packages include complete hair styling, saree draping, and lashes. For individual makeup services, add-ons can be selected."
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
    question: "How early should I book for my wedding date?",
    answer: "We recommend booking 2 to 6 months in advance for peak wedding seasons as we operate with a single makeup artist and slots fill up fast."
  },
  {
    id: "faq-8",
    question: "Can I reschedule my appointment if my event date changes?",
    answer: "Rescheduling is permitted up to 7 days prior to your booked date, subject to slot availability on the new date."
  },
  {
    id: "faq-9",
    question: "What happens if I need to cancel my booking?",
    answer: "Advance deposits are non-refundable as the slot is reserved exclusively for you. However, you may transfer the deposit amount toward another service date."
  },
  {
    id: "faq-10",
    question: "Are home-service travel charges applicable?",
    answer: "Standard home service travel within Jubilee Hills/Banjara Hills is ₹500. Outstation or extended distance travel charges are configured transparently."
  },
  {
    id: "faq-11",
    question: "Can family members or bridesmaids also book makeup at the venue?",
    answer: "Yes! Family members can add party makeup or HD party makeover services when booking home service."
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
    description: "Book both Engagement and Reception makeup together and get complimentary trial consultation.",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80"
  }
];

export const INITIAL_POLICIES = {
  cancellationPolicy: "Advance deposits (30%) are non-refundable to hold calendar dates. Cancellations made at least 7 days prior can convert the deposit into store credit valid for 6 months.",
  advancePolicy: "A 30% advance deposit is mandatory to lock your date & time slot. Remaining 70% balance is payable at the time of appointment.",
  homeServicePolicy: "A travel & kit transportation charge of ₹500 is applied for doorstep home & venue services. Venue setup requires clean table space and power socket access.",
  hygienePolicy: "We enforce strict single-use disposables for mascara, lip color, and sponges. All brushes are sanitized using hospital-grade UV light and 99% alcohol cleansing after every client."
};

export const INITIAL_BOOKINGS = [
  {
    id: "GLOW-8492",
    createdDate: "2026-02-20",
    customerName: "Kavya Reddy",
    phone: "+91 98765 12345",
    type: "home",
    serviceName: "Bridal HD Makeup (Home Service)",
    date: "2026-03-15",
    timeSlot: "06:00 AM",
    guestsCount: 1,
    address: "Villa 14, Rainbow Vistas, Gachibowli, Hyderabad",
    totalPrice: 15500,
    advancePaid: 4650,
    remainingAmount: 10850,
    status: "Confirmed",
    paymentStatus: "Paid (Advance)"
  },
  {
    id: "GLOW-3104",
    createdDate: "2026-02-22",
    customerName: "Priyanka Sharma",
    phone: "+91 91234 56789",
    type: "salon",
    serviceName: "HD Engagement Makeup",
    date: "2026-03-20",
    timeSlot: "11:00 AM",
    guestsCount: 1,
    address: "Salon Studio",
    totalPrice: 8500,
    advancePaid: 2550,
    remainingAmount: 5950,
    status: "Confirmed",
    paymentStatus: "Paid (Advance)"
  }
];

export const INITIAL_ENQUIRIES = [
  {
    id: "enq-1",
    name: "Ritu Kapoor",
    phone: "+91 99887 76655",
    email: "ritu.k@gmail.com",
    service: "Bridal Signature Package",
    eventDate: "2026-04-12",
    location: "Banjara Hills, Hyderabad",
    message: "Hi Ananya! Looking to book bridal makeup for my wedding in April. Would like to know if trial is available before booking.",
    status: "Pending",
    dateSubmitted: "2026-02-26"
  }
];

export const INITIAL_BLOCKED_SLOTS = [
  {
    date: "2026-04-01",
    timeSlot: "All Day",
    reason: "Outstation Destination Wedding Project"
  }
];
