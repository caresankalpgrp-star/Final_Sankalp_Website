import { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AccordionItem {
  title: string;
  content: string;
}

const SEO_SECTIONS: AccordionItem[] = [
  {
    title: 'Interior Designer in Kolkata — Why Choose Sankalp?',
    content: `Sankalp Interior Solution is Kolkata's most trusted interior design company, with over 500 completed projects across the city and West Bengal. Founded in 2016, we have built our reputation on three pillars: transparent pricing, premium quality, and on-time delivery.

Whether you live in Salt Lake, New Town, Behala, Tollygunge, Dum Dum, Alipore, or any other part of Kolkata — our team of expert designers brings Livspace-level quality at honest, local prices. We specialize in complete home interior design, modular kitchen installation, wardrobe design, false ceiling with LED lighting, and commercial interior projects.

Our process is simple: free home visit → 3D design → execution → handover. No hidden costs, no substandard materials, no delays. Every project comes with a warranty.

Keywords: interior designer Kolkata, best interior designer in Kolkata, home interior design Kolkata, interior design company Kolkata, interior decorator Kolkata.`,
  },
  {
    title: '2BHK Interior Cost in Kolkata — Complete Price Guide',
    content: `Planning your 2BHK interior in Kolkata? Here's the honest pricing guide for 2025:

Essential Package (₹800–₹1,000/sq ft): Basic modular furniture, laminate wardrobes, POP false ceiling, standard kitchen, ceramic flooring, emulsion painting. For a 650 sq ft 2BHK: approximately ₹4–5 Lakhs.

Premium Package (₹1,200–₹1,600/sq ft): Acrylic/membrane finish furniture, premium modular kitchen with soft-close, gypsum false ceiling with LED cove lighting, engineered wood flooring, designer lighting. For a 650 sq ft 2BHK: approximately ₹5.5–7.5 Lakhs.

Luxury Package (₹1,800–₹2,500+/sq ft): Imported materials, Italian lacquer finish, chef-grade kitchen, marble/hardwood flooring, smart home integration. For a 650 sq ft 2BHK: ₹8–15 Lakhs.

All packages include free 3D design, project management, and warranty. Contact us for a detailed, itemized quote for your specific flat.`,
  },
  {
    title: 'Modular Kitchen Design in Kolkata — Costs & Styles',
    content: `A modular kitchen is one of the best investments for any Kolkata home. Sankalp Interior Solution designs and installs premium modular kitchens across all areas of Kolkata and West Bengal.

Modular Kitchen Cost in Kolkata 2025:
• Basic laminate finish (L-shaped, 10×8 ft): ₹80,000–₹1.2 Lakhs
• Premium acrylic finish with soft-close: ₹1.5–₹2.5 Lakhs
• Luxury lacquer/membrane finish: ₹3–₹5 Lakhs

All our kitchens use BWR (Boiling Water Resistant) plywood — essential for Kolkata's humid climate. Hardware comes with a 10-year warranty. We handle chimney installation, countertop fitting, backsplash tiling, and all electrical/plumbing connections.

We serve: Salt Lake, New Town, Rajarhat, Behala, Tollygunge, Alipore, Dum Dum, Baranagar, and all areas of Kolkata.

Keywords: modular kitchen Kolkata, modular kitchen cost Kolkata, kitchen interior design Kolkata, modular kitchen designer Kolkata.`,
  },
  {
    title: 'Interior Design for 3BHK Flats in Kolkata',
    content: `3BHK interior design in Kolkata requires careful planning to balance aesthetics, functionality, and budget. With 900–1,200 sq ft to work with, the design possibilities are exciting.

Our 3BHK interior design services in Kolkata include:
• Master bedroom with walk-in wardrobe and en-suite bathroom design
• Two additional bedrooms with space-optimized wardrobes and study areas
• Open-plan living and dining room with feature wall and TV unit
• Premium modular kitchen with breakfast counter
• 2–3 bathroom renovations
• False ceiling throughout with zone-specific lighting design
• Foyer/entrance design

3BHK Interior Cost in Kolkata:
• Essential: ₹6–8 Lakhs
• Premium: ₹8–12 Lakhs
• Luxury: ₹12–20 Lakhs

We have completed 200+ 3BHK projects across Kolkata — in New Town, Salt Lake, Rajarhat, Behala, Garia, and beyond.`,
  },
  {
    title: 'Interior Design Services Across West Bengal',
    content: `Sankalp Interior Solution is not just a Kolkata interior designer — we serve the entire state of West Bengal. Our team covers:

North Bengal: Siliguri, Darjeeling, Jalpaiguri, Alipurduar, Cooch Behar — with moisture-resistant materials suited to the hills and Dooars climate.

Industrial Belt: Durgapur, Asansol, Bardhaman, Raniganj — serving SAIL, DVC, and private sector employees with colony-specific expertise.

South Bengal: Kharagpur, Haldia, Midnapore — including IIT faculty residences, petrochemical township homes, and coastal properties.

Central Bengal: Hooghly, Nadia, Krishnanagar, Murshidabad — heritage homes, government quarters, and modern apartments.

24 Parganas: Barasat, Basirhat, Garia, Narendrapur — Kolkata's growing suburbs with strong demand for quality interiors.

Jungle Mahal: Purulia, Bankura, Bolpur/Shantiniketan — nature-inspired designs with local material integration.

Keywords: interior designer West Bengal, interior design company West Bengal, home interior West Bengal, best interior designer West Bengal.`,
  },
];

export default function SeoContentBlock() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="section-padding px-4 bg-white" aria-label="Interior Design Information">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <span className="section-tag">Know More</span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Interior Design Guide —{' '}
            <span className="gradient-text">Kolkata & West Bengal</span>
          </h2>
          <p className="text-gray-500 text-sm mt-3 max-w-xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Everything you need to know about home interior design costs, services, and trends in Kolkata and West Bengal.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {SEO_SECTIONS.map((section, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(240,124,30,0.12)', background: openIndex === i ? '#faf8f4' : 'white' }}
            >
              <button
                className={`seo-accordion-btn w-full flex items-center justify-between px-6 py-5 text-left transition-all ${openIndex === i ? 'open' : ''}`}
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: openIndex === i ? 'rgba(240,124,30,0.15)' : 'rgba(240,124,30,0.08)' }}
                  >
                    <Search size={15} className="text-orange-500" />
                  </div>
                  <span
                    className="font-semibold text-gray-900 text-sm md:text-base"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {section.title}
                  </span>
                </div>
                <ChevronDown size={18} className="text-orange-500 flex-shrink-0 ml-3" />
              </button>

              <div className={`seo-accordion-panel ${openIndex === i ? 'open' : ''}`}>
                <div className="px-6 pb-6">
                  <div
                    className="text-gray-600 text-sm leading-relaxed whitespace-pre-line"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {section.content}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-3">
                    <Link to="/contact" className="btn-primary text-sm py-2.5 px-5">
                      Get Free Quote
                    </Link>
                    <Link to="/pricing" className="btn-navy text-sm py-2.5 px-5">
                      View Pricing
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-gray-400 text-xs mt-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
          * All prices are indicative for 2025. Final quote provided after free home visit. No hidden charges.
        </p>
      </div>
    </section>
  );
}
