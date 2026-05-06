// ─── Official Google Business Profile ──────────────────────────────────────
// CID: 13480184401609593026
// Business: Sankalp Interior Solution
// Address: Office Unit GB02, Oishi Tower-II, Rabindra Pally, Jyangra,
//          VIP Rd, Raghunathpur, Kolkata, West Bengal 700059
// Phone:   +91 97482 97025
// ───────────────────────────────────────────────────────────────────────────

export const BUSINESS_CID = '13480184401609593026';

// This embed URL uses the CID — shows the exact verified Google Business pin
// Uses maps.google.com (not www.google.com) to avoid iframe blocking
export const OFFICE_MAP_EMBED =
  `https://maps.google.com/maps?cid=${BUSINESS_CID}&output=embed&hl=en&gl=IN`;

// Direct Google Maps link (opens the business listing)
export const OFFICE_MAP_LINK =
  `https://www.google.com/maps?cid=${BUSINESS_CID}&hl=en&gl=IN`;

// Business NAP (Name, Address, Phone) — keep consistent everywhere
export const BUSINESS_NAP = {
  name:    'Sankalp Interior Solution',
  address: 'Office Unit GB02, Oishi Tower-II, Rabindra Pally, Jyangra, VIP Rd, Raghunathpur, Kolkata, West Bengal 700059',
  phone:   '+91 97482 97025',
  email:   'info@sankalpinterior.com',
  lat:      22.6208,
  lng:      88.4260,
  website: 'https://www.sankalpinterior.com',
};
