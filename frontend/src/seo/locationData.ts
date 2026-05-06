export interface LocationData {
  slug: string;
  name: string;
  state: string;
  type: 'city' | 'district' | 'area';
  metaTitle: string;
  metaDesc: string;
  h1: string;
  intro: string;
  body: string;
  areas: string[];
  housingTypes: string[];
  nearbyLocations: string[];
  priceRange: string;
  lat: number;
  lng: number;
  mapEmbed: string;
  faqs: { q: string; a: string }[];
  relatedSlugs: string[];
}

export const LOCATIONS: LocationData[] = [
  {
    slug: 'interior-designer-kolkata',
    name: 'Kolkata',
    state: 'West Bengal',
    type: 'city',
    metaTitle: 'Interior Designer in Kolkata | Best Home Interior Design | Sankalp Interior',
    metaDesc: 'Looking for the best interior designer in Kolkata? Sankalp Interior Solution offers premium 2BHK/3BHK interior design, modular kitchens & false ceiling at transparent prices. 500+ projects completed. Free consultation!',
    h1: 'Best Interior Designer in Kolkata',
    intro: 'Transform your Kolkata home with Sankalp Interior Solution — the city\'s most trusted interior design company with 500+ completed projects across all neighbourhoods.',
    body: `<p>Kolkata, the cultural capital of India, is a city of contrasts — where heritage bungalows stand beside modern high-rises, and compact 2BHK flats exist alongside sprawling penthouses. At <strong>Sankalp Interior Solution</strong>, we understand Kolkata\'s unique design sensibility and create interiors that blend modern aesthetics with the warmth of Bengali culture.</p>

<h2>Interior Design Services in Kolkata</h2>
<p>We serve every corner of Kolkata — from <strong>Salt Lake and New Town</strong> in the east, to <strong>Behala and Tollygunge</strong> in the south, <strong>Dum Dum and Baranagar</strong> in the north, and <strong>Alipore and Ballygunge</strong> in the central areas. Our team of expert designers understands the specific requirements of Kolkata\'s diverse housing stock — from DDA flats to luxury apartments.</p>

<h2>Why Kolkata Homeowners Choose Sankalp</h2>
<ul>
<li><strong>Local expertise:</strong> We know Kolkata\'s suppliers, contractors, and material markets intimately</li>
<li><strong>Climate-aware design:</strong> Our interiors are designed for Kolkata\'s humid climate — moisture-resistant materials, proper ventilation planning</li>
<li><strong>Budget transparency:</strong> Complete cost breakdown before work begins — no hidden charges</li>
<li><strong>Fast execution:</strong> Most 2BHK projects completed in 45–55 days</li>
<li><strong>500+ happy families:</strong> Across Salt Lake, New Town, Rajarhat, Behala, Tollygunge, Dum Dum and more</li>
</ul>

<h2>Interior Design Cost in Kolkata</h2>
<p>Interior design costs in Kolkata typically range from <strong>₹800 to ₹2,200 per sq ft</strong> depending on the quality of materials and scope of work. For a standard 650 sq ft 2BHK flat in Kolkata, expect to invest between <strong>₹4.5 to ₹7 Lakhs</strong> for a complete interior transformation.</p>

<h2>Popular Areas We Serve in Kolkata</h2>
<p>Our projects span the entire city — Salt Lake (Sector I, II, III, IV, V), New Town (Action Area I, II, III), Rajarhat, Dum Dum, Baranagar, Belgharia, Behala, Tollygunge, Alipore, Ballygunge, Park Street, Gariahat, Jadavpur, Santoshpur, Garia, Narendrapur, Baruipur and beyond.</p>`,
    areas: ['Salt Lake', 'New Town', 'Rajarhat', 'Behala', 'Tollygunge', 'Dum Dum', 'Alipore', 'Ballygunge', 'Jadavpur', 'Garia', 'Baranagar', 'Park Street'],
    housingTypes: ['2BHK Flat', '3BHK Apartment', 'Duplex', 'Studio Apartment', 'Penthouse', 'Villa'],
    nearbyLocations: ['Howrah', 'Salt Lake', 'New Town', 'Barrackpore'],
    priceRange: '₹800 – ₹2,200/sq ft',
    lat: 22.5726,
    lng: 88.3639,
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117895.6!2d88.2636!3d22.5354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f882db4908f667%3A0x43e330e68f6c2cbc!2sKolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1234567890',
    faqs: [
      { q: 'How much does interior design cost in Kolkata?', a: 'Interior design in Kolkata costs ₹800–₹2,200 per sq ft. A complete 2BHK (650 sq ft) costs ₹4.5–7 Lakhs with Sankalp Interior Solution.' },
      { q: 'Which is the best interior designer in Kolkata?', a: 'Sankalp Interior Solution is rated 4.9★ with 500+ completed projects across Kolkata, making us one of the most trusted interior designers in the city.' },
      { q: 'How long does home interior take in Kolkata?', a: 'A 2BHK interior typically takes 45–55 days. 3BHK takes 60–75 days. We always deliver on time.' },
      { q: 'Do you provide modular kitchen in Kolkata?', a: 'Yes! We design and install premium modular kitchens across all areas of Kolkata starting from ₹1.2 Lakhs.' },
    ],
    relatedSlugs: ['interior-designer-salt-lake', 'interior-designer-new-town', 'interior-designer-howrah'],
  },
  {
    slug: 'interior-designer-howrah',
    name: 'Howrah',
    state: 'West Bengal',
    type: 'city',
    metaTitle: 'Interior Designer in Howrah | Home Interior Design | Sankalp Interior Solution',
    metaDesc: 'Best interior designer in Howrah, West Bengal. Sankalp Interior Solution offers affordable home interior, modular kitchen & wardrobe design in Howrah. Free consultation. Call now!',
    h1: 'Interior Designer in Howrah',
    intro: 'Premium interior design services in Howrah — from Shibpur and Santragachi to Liluah and Bally. Sankalp Interior Solution brings Kolkata-quality design to your doorstep.',
    body: `<p>Howrah, Kolkata\'s twin city across the Hooghly, is one of West Bengal\'s fastest-growing residential markets. With new housing projects in <strong>Shibpur, Santragachi, Domjur, Bally, and Liluah</strong>, thousands of families are investing in quality home interiors every year.</p>

<h2>Interior Design Services in Howrah</h2>
<p>Sankalp Interior Solution brings premium interior design expertise to Howrah. Whether you have a new flat in <strong>Santragachi</strong>, a resale apartment in <strong>Shibpur</strong>, or an independent house in <strong>Bally</strong>, our team creates beautiful, functional spaces tailored to your lifestyle and budget.</p>

<h2>Howrah Housing Landscape</h2>
<p>Howrah\'s residential market is diverse — from affordable 2BHK flats near the station to premium apartments in Shibpur. The city has seen significant development along the <strong>NH16 corridor</strong> and around <strong>Santragachi</strong>, creating demand for quality interior design services.</p>

<h2>Popular Areas We Serve in Howrah</h2>
<p>Shibpur, Santragachi, Liluah, Bally, Domjur, Andul, Jagacha, Dasnagar, Bamunari, Ghusuri, Belur, Ramrajatala and all surrounding areas.</p>

<h2>Interior Design Cost in Howrah</h2>
<p>Our interior design packages for Howrah start from <strong>₹750 per sq ft</strong> for essential packages. A complete 2BHK interior in Howrah costs approximately <strong>₹4–6 Lakhs</strong> depending on materials and scope.</p>`,
    areas: ['Shibpur', 'Santragachi', 'Liluah', 'Bally', 'Domjur', 'Belur', 'Ghusuri', 'Dasnagar'],
    housingTypes: ['2BHK Flat', '3BHK Apartment', 'Independent House', 'Row House'],
    nearbyLocations: ['Kolkata', 'Hooghly', 'Uluberia'],
    priceRange: '₹750 – ₹2,000/sq ft',
    lat: 22.5958,
    lng: 88.2636,
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58989.2!2d88.2636!3d22.5958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277e8b5b5b5b5%3A0x3a0277e8b5b5b5b5!2sHowrah%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1234567890',
    faqs: [
      { q: 'Do you provide interior design services in Howrah?', a: 'Yes! Sankalp Interior Solution serves all areas of Howrah including Shibpur, Santragachi, Bally, Liluah, and Domjur.' },
      { q: 'What is the cost of interior design in Howrah?', a: 'Interior design in Howrah costs ₹750–₹2,000 per sq ft. A 2BHK complete interior costs ₹4–6 Lakhs.' },
      { q: 'How far is your office from Howrah?', a: 'Our office is in Raghunathpur, Kolkata — just 15–20 minutes from Howrah. We offer free home visits across Howrah.' },
    ],
    relatedSlugs: ['interior-designer-kolkata', 'interior-designer-hooghly', 'interior-designer-salt-lake'],
  },
  {
    slug: 'interior-designer-salt-lake',
    name: 'Salt Lake',
    state: 'West Bengal',
    type: 'area',
    metaTitle: 'Interior Designer in Salt Lake Kolkata | Premium Home Interior | Sankalp',
    metaDesc: 'Top interior designer in Salt Lake (Bidhannagar), Kolkata. Sankalp Interior Solution specializes in premium 2BHK/3BHK interiors, modular kitchens in Salt Lake Sector I–V. Free consultation!',
    h1: 'Interior Designer in Salt Lake, Kolkata',
    intro: 'Salt Lake\'s most trusted interior design partner — creating stunning homes across Sector I, II, III, IV & V with transparent pricing and on-time delivery.',
    body: `<p><strong>Salt Lake (Bidhannagar)</strong> is one of Kolkata\'s most prestigious planned townships, home to IT professionals, government employees, and established families. The area\'s well-planned grid layout, with its mix of government quarters, private apartments, and independent houses, presents unique interior design opportunities.</p>

<h2>Interior Design in Salt Lake Sectors</h2>
<p>We have completed <strong>80+ projects</strong> across Salt Lake\'s five sectors. From compact 2BHK government quarters in <strong>Sector I and II</strong> to premium 3BHK apartments in <strong>Sector III and V</strong>, we understand the specific requirements of Salt Lake homes.</p>

<h2>Salt Lake Housing Characteristics</h2>
<p>Salt Lake homes have specific characteristics our designers are well-versed with — standard room dimensions, common structural constraints, and the aesthetic preferences of the educated, cosmopolitan residents. Our designs blend <strong>modern minimalism with functional elegance</strong> — perfect for Salt Lake\'s professional demographic.</p>

<h2>Popular Projects in Salt Lake</h2>
<ul>
<li>2BHK Sector III apartment — ₹4.8L complete interior (52 days)</li>
<li>3BHK Sector V flat — ₹7.2L premium package (65 days)</li>
<li>Modular kitchen Sector II — ₹1.6L (18 days)</li>
</ul>

<h2>Areas We Cover Near Salt Lake</h2>
<p>Bidhannagar, Sector I through V, Central Park area, City Centre, Nalban, Karunamoyee, New Town (adjacent), Rajarhat.</p>`,
    areas: ['Sector I', 'Sector II', 'Sector III', 'Sector IV', 'Sector V', 'Bidhannagar', 'City Centre', 'Karunamoyee'],
    housingTypes: ['Government Quarters', '2BHK Flat', '3BHK Apartment', 'Independent House'],
    nearbyLocations: ['New Town', 'Kolkata', 'Rajarhat', 'Dum Dum'],
    priceRange: '₹900 – ₹2,200/sq ft',
    lat: 22.5958,
    lng: 88.4154,
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14736.2!2d88.4154!3d22.5958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275b3b3b3b3b3%3A0x3a0275b3b3b3b3b3!2sSalt%20Lake%2C%20Kolkata!5e0!3m2!1sen!2sin!4v1234567890',
    faqs: [
      { q: 'Which interior designer is best in Salt Lake Kolkata?', a: 'Sankalp Interior Solution has completed 80+ projects in Salt Lake. We are rated 4.9★ and specialize in Salt Lake apartment interiors.' },
      { q: 'What is interior design cost in Salt Lake?', a: 'Interior design in Salt Lake costs ₹900–₹2,200/sq ft. A 2BHK complete interior costs ₹5–7 Lakhs.' },
    ],
    relatedSlugs: ['interior-designer-kolkata', 'interior-designer-new-town', 'interior-designer-howrah'],
  },
  {
    slug: 'interior-designer-new-town',
    name: 'New Town',
    state: 'West Bengal',
    type: 'area',
    metaTitle: 'Interior Designer in New Town Kolkata | Rajarhat Home Interior | Sankalp',
    metaDesc: 'Best interior designer in New Town (Rajarhat), Kolkata. Premium 2BHK/3BHK interior design, modular kitchens in Action Area I, II, III. 500+ projects. Free home visit!',
    h1: 'Interior Designer in New Town, Kolkata',
    intro: 'New Town\'s preferred interior design partner — crafting modern, luxurious homes across Action Area I, II & III with cutting-edge designs and transparent pricing.',
    body: `<p><strong>New Town (Rajarhat)</strong> is Kolkata\'s most modern planned township — a hub for IT companies, startups, and young professionals. With premium residential projects from developers like Merlin, Unitech, Shapoorji, and DLF, New Town has some of West Bengal\'s finest apartments that deserve equally fine interiors.</p>

<h2>Interior Design for New Town Apartments</h2>
<p>New Town apartments are characterized by modern construction, open floor plans, and large windows. Our designers leverage these features to create <strong>contemporary, light-filled interiors</strong> that complement the township\'s urban aesthetic. We have completed projects in major New Town residential complexes including Merlin Elita, Unitech Unihomes, Eden City, and many more.</p>

<h2>New Town Interior Design Trends</h2>
<p>New Town\'s young, tech-savvy residents prefer:</p>
<ul>
<li><strong>Minimalist designs</strong> with clean lines and neutral palettes</li>
<li><strong>Smart storage solutions</strong> for compact urban living</li>
<li><strong>Home office setups</strong> — especially post-pandemic</li>
<li><strong>Premium modular kitchens</strong> with high-end appliances</li>
<li><strong>Statement false ceilings</strong> with integrated lighting</li>
</ul>

<h2>Areas We Cover in New Town</h2>
<p>Action Area I, Action Area II, Action Area III, Eco Park area, Tech City, Biswa Bangla Gate area, New Town Square, Rajarhat Main Road corridor, Chinarpark, Baguiati.</p>`,
    areas: ['Action Area I', 'Action Area II', 'Action Area III', 'Eco Park', 'Tech City', 'Chinarpark', 'Baguiati'],
    housingTypes: ['Premium 2BHK', '3BHK Apartment', 'Penthouse', 'Studio Apartment'],
    nearbyLocations: ['Salt Lake', 'Kolkata', 'Rajarhat', 'Dum Dum'],
    priceRange: '₹1,000 – ₹2,500/sq ft',
    lat: 22.6155,
    lng: 88.4785,
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14730.2!2d88.4785!3d22.6155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275c5c5c5c5c5%3A0x3a0275c5c5c5c5c5!2sNew%20Town%2C%20Kolkata!5e0!3m2!1sen!2sin!4v1234567890',
    faqs: [
      { q: 'Do you design apartments in New Town Rajarhat?', a: 'Yes! We have 100+ completed projects in New Town across Action Area I, II, III. We specialize in modern apartment interiors for New Town\'s premium housing.' },
      { q: 'What is interior design cost in New Town Kolkata?', a: 'New Town interior design costs ₹1,000–₹2,500/sq ft. A premium 2BHK complete interior costs ₹5.5–8 Lakhs.' },
    ],
    relatedSlugs: ['interior-designer-kolkata', 'interior-designer-salt-lake', 'interior-designer-north-24-parganas'],
  },
  {
    slug: 'interior-designer-durgapur',
    name: 'Durgapur',
    state: 'West Bengal',
    type: 'city',
    metaTitle: 'Interior Designer in Durgapur | Home Interior Design | Sankalp Interior Solution',
    metaDesc: 'Best interior designer in Durgapur, West Bengal. Sankalp Interior Solution offers premium home interior, modular kitchen & complete flat interior in Durgapur at affordable prices. Free consultation!',
    h1: 'Interior Designer in Durgapur',
    intro: 'Bringing Kolkata-quality interior design to Durgapur — premium home interiors, modular kitchens, and complete flat transformations at honest prices.',
    body: `<p><strong>Durgapur</strong>, West Bengal\'s planned industrial city, has evolved into a thriving residential hub with a growing middle and upper-middle class demanding quality home interiors. The city\'s organized layout, with its well-planned residential sectors and modern apartment complexes, provides the perfect canvas for beautiful interior design.</p>

<h2>Interior Design Services in Durgapur</h2>
<p>Sankalp Interior Solution brings its expertise from Kolkata to Durgapur, offering the same premium quality and transparent pricing. We serve residential areas including <strong>City Centre, Bidhannagar, Benachity, Nachan Road, Steel Township, and Bidhan Nagar</strong>.</p>

<h2>Durgapur Housing Trends</h2>
<p>Durgapur\'s housing market is characterized by independent houses, government quarters (for SAIL, DVC employees), and a growing number of modern apartment complexes. Our designs are tailored to these housing types — we understand the specific requirements of <strong>Steel Township quarters</strong> as well as new-age apartments near City Centre.</p>

<h2>Why Durgapur Residents Choose Sankalp</h2>
<ul>
<li>We visit Durgapur for free home consultations</li>
<li>Local material sourcing to reduce costs</li>
<li>Same quality standards as our Kolkata projects</li>
<li>Dedicated project manager for out-of-Kolkata projects</li>
</ul>`,
    areas: ['City Centre', 'Bidhannagar', 'Benachity', 'Steel Township', 'Nachan Road', 'Bidhan Nagar', 'A-Zone', 'B-Zone'],
    housingTypes: ['Government Quarters', '2BHK Flat', 'Independent House', '3BHK Apartment'],
    nearbyLocations: ['Asansol', 'Burdwan', 'Bankura'],
    priceRange: '₹700 – ₹1,800/sq ft',
    lat: 23.5204,
    lng: 87.3119,
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58878.2!2d87.3119!3d23.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f71e4444444444%3A0x39f71e4444444444!2sDurgapur%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1234567890',
    faqs: [
      { q: 'Does Sankalp Interior serve Durgapur?', a: 'Yes! We serve Durgapur and all surrounding areas. Our team visits for free consultation and manages the complete project remotely with regular site visits.' },
      { q: 'What is interior design cost in Durgapur?', a: 'Interior design in Durgapur costs ₹700–₹1,800/sq ft — typically 10–15% more affordable than Kolkata due to local material sourcing.' },
    ],
    relatedSlugs: ['interior-designer-asansol', 'interior-designer-kolkata', 'interior-designer-burdwan'],
  },
  {
    slug: 'interior-designer-asansol',
    name: 'Asansol',
    state: 'West Bengal',
    type: 'city',
    metaTitle: 'Interior Designer in Asansol | Home Interior Design | Sankalp Interior Solution',
    metaDesc: 'Top interior designer in Asansol, West Bengal. Premium home interior design, modular kitchen, wardrobe & false ceiling in Asansol at affordable prices. Free home visit. Call now!',
    h1: 'Interior Designer in Asansol',
    intro: 'Premium interior design services in Asansol — transforming homes in Burnpur, Kulti, Raniganj, and all surrounding areas with quality craftsmanship.',
    body: `<p><strong>Asansol</strong>, West Bengal\'s second-largest city, is a major industrial and commercial hub with a large population of professionals and business owners investing in quality home interiors. The city\'s diverse housing stock — from mining colony quarters to modern apartments — requires versatile interior design expertise.</p>

<h2>Interior Design in Asansol</h2>
<p>We serve all residential areas of Asansol including <strong>Burnpur, Kulti, Raniganj, Hirapur, Barakar, Jamuria, and Dishergarh</strong>. Our team has experience with the specific housing types prevalent in the Asansol-Durgapur industrial belt.</p>

<h2>Services Available in Asansol</h2>
<ul>
<li>Complete home interior design</li>
<li>Modular kitchen installation</li>
<li>Wardrobe and storage solutions</li>
<li>False ceiling with LED lighting</li>
<li>Commercial interior for offices and shops</li>
</ul>`,
    areas: ['Burnpur', 'Kulti', 'Raniganj', 'Hirapur', 'Barakar', 'Jamuria', 'Dishergarh', 'Chittaranjan'],
    housingTypes: ['Government Quarters', '2BHK Flat', 'Independent House', 'Commercial Space'],
    nearbyLocations: ['Durgapur', 'Dhanbad', 'Burdwan'],
    priceRange: '₹700 – ₹1,700/sq ft',
    lat: 23.6833,
    lng: 86.9833,
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58845.2!2d86.9833!3d23.6833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f71a4444444444%3A0x39f71a4444444444!2sAsansol%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1234567890',
    faqs: [
      { q: 'Do you provide interior design in Asansol?', a: 'Yes! We serve Asansol, Burnpur, Kulti, Raniganj, and all surrounding areas with full interior design services.' },
      { q: 'How much does interior design cost in Asansol?', a: 'Interior design in Asansol costs ₹700–₹1,700/sq ft. A complete 2BHK interior costs approximately ₹3.5–5.5 Lakhs.' },
    ],
    relatedSlugs: ['interior-designer-durgapur', 'interior-designer-kolkata', 'interior-designer-burdwan'],
  },
  {
    slug: 'interior-designer-siliguri',
    name: 'Siliguri',
    state: 'West Bengal',
    type: 'city',
    metaTitle: 'Interior Designer in Siliguri | Home Interior Design | Sankalp Interior Solution',
    metaDesc: 'Best interior designer in Siliguri, West Bengal. Sankalp Interior Solution offers premium home interior, modular kitchen & flat interior design in Siliguri. Free consultation!',
    h1: 'Interior Designer in Siliguri',
    intro: 'Bringing premium interior design to Siliguri — the gateway to North Bengal. Quality home interiors, modular kitchens, and complete flat transformations.',
    body: `<p><strong>Siliguri</strong>, the commercial capital of North Bengal, is one of West Bengal\'s fastest-growing cities. With its booming real estate market and growing affluent class, Siliguri has a strong demand for quality interior design services. From apartments near <strong>Sevoke Road</strong> to independent houses in <strong>Pradhan Nagar</strong>, Siliguri\'s diverse housing market offers exciting design opportunities.</p>

<h2>Interior Design Services in Siliguri</h2>
<p>We serve all areas of Siliguri including <strong>Sevoke Road, Pradhan Nagar, Hakimpara, Bhaktinagar, Matigara, Bagdogra, and Naxalbari</strong>. Our North Bengal team understands the local climate, available materials, and design preferences of Siliguri residents.</p>

<h2>Siliguri Interior Design Trends</h2>
<p>Siliguri\'s proximity to the hills influences its interior design aesthetic — residents often prefer warm, earthy tones, natural wood finishes, and cozy, functional spaces. Our designers create interiors that reflect this unique North Bengal character while incorporating modern design elements.</p>`,
    areas: ['Sevoke Road', 'Pradhan Nagar', 'Hakimpara', 'Bhaktinagar', 'Matigara', 'Bagdogra', 'Naxalbari', 'Siliguri Town'],
    housingTypes: ['2BHK Flat', '3BHK Apartment', 'Independent House', 'Commercial Space'],
    nearbyLocations: ['Darjeeling', 'Jalpaiguri', 'Cooch Behar'],
    priceRange: '₹700 – ₹1,800/sq ft',
    lat: 26.7271,
    lng: 88.3953,
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58456.2!2d88.3953!3d26.7271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e44171111111111%3A0x39e44171111111111!2sSiliguri%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1234567890',
    faqs: [
      { q: 'Does Sankalp Interior provide services in Siliguri?', a: 'Yes! We serve Siliguri and all of North Bengal. Our team visits for consultation and manages complete projects with dedicated supervision.' },
      { q: 'What is interior design cost in Siliguri?', a: 'Interior design in Siliguri costs ₹700–₹1,800/sq ft. A complete 2BHK interior costs ₹3.5–6 Lakhs.' },
    ],
    relatedSlugs: ['interior-designer-kolkata', 'interior-designer-north-24-parganas', 'interior-designer-jalpaiguri'],
  },
  {
    slug: 'interior-designer-kharagpur',
    name: 'Kharagpur',
    state: 'West Bengal',
    type: 'city',
    metaTitle: 'Interior Designer in Kharagpur | Home Interior Design | Sankalp Interior',
    metaDesc: 'Best interior designer in Kharagpur, West Bengal. Premium home interior, modular kitchen & flat interior design in Kharagpur IIT area and Railway Colony. Free consultation!',
    h1: 'Interior Designer in Kharagpur',
    intro: 'Quality interior design in Kharagpur — serving IIT area, Railway Colony, Inda, and all surrounding localities with premium craftsmanship.',
    body: `<p><strong>Kharagpur</strong>, home to IIT Kharagpur and one of India\'s largest railway junctions, has a unique residential landscape. The city\'s educated, professional population — faculty, engineers, railway officers, and business owners — demands quality interior design that balances functionality with aesthetics.</p>

<h2>Interior Design in Kharagpur</h2>
<p>We serve all areas of Kharagpur including <strong>IIT Campus area, Railway Colony, Inda, Gol Bazar, Hijli, Malancha, and Nimpura</strong>. Our team understands the specific requirements of Kharagpur\'s housing — from railway quarters to private apartments near the IIT.</p>

<h2>Kharagpur Specialty</h2>
<p>Many of our Kharagpur clients are IIT faculty, railway officers, and local business owners who want Kolkata-quality interior design without traveling to the city. We bring our full service — design, materials, execution — directly to Kharagpur.</p>`,
    areas: ['IIT Area', 'Railway Colony', 'Inda', 'Gol Bazar', 'Hijli', 'Malancha', 'Nimpura', 'Barakpur'],
    housingTypes: ['Railway Quarters', '2BHK Flat', 'Independent House', 'Faculty Residence'],
    nearbyLocations: ['Midnapore', 'Jhargram', 'Kolkata'],
    priceRange: '₹700 – ₹1,700/sq ft',
    lat: 22.3460,
    lng: 87.2320,
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58950.2!2d87.2320!3d22.3460!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1d4d4444444444%3A0x3a1d4d4444444444!2sKharagpur%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1234567890',
    faqs: [
      { q: 'Do you provide interior design in Kharagpur?', a: 'Yes! We serve Kharagpur including IIT area, Railway Colony, and all surrounding localities.' },
      { q: 'How much does interior design cost in Kharagpur?', a: 'Interior design in Kharagpur costs ₹700–₹1,700/sq ft. A 2BHK complete interior costs ₹3.5–5.5 Lakhs.' },
    ],
    relatedSlugs: ['interior-designer-kolkata', 'interior-designer-midnapore', 'interior-designer-howrah'],
  },
  {
    slug: 'interior-designer-north-24-parganas',
    name: 'North 24 Parganas',
    state: 'West Bengal',
    type: 'district',
    metaTitle: 'Interior Designer in North 24 Parganas | Home Interior | Sankalp Interior',
    metaDesc: 'Best interior designer in North 24 Parganas, WB. Serving Barasat, Barrackpore, Dum Dum, Habra, Bangaon. Premium home interior at affordable prices. Free consultation!',
    h1: 'Interior Designer in North 24 Parganas',
    intro: 'Comprehensive interior design services across North 24 Parganas — from Barasat and Barrackpore to Habra and Bangaon, we transform homes across the entire district.',
    body: `<p><strong>North 24 Parganas</strong> is one of West Bengal\'s most populous and rapidly developing districts. Bordering Kolkata on the north, the district has seen explosive residential growth — with new townships, apartment complexes, and housing projects mushrooming across Barasat, Barrackpore, Dum Dum, and beyond.</p>

<h2>Interior Design Across North 24 Parganas</h2>
<p>We serve the entire district including major towns: <strong>Barasat, Barrackpore, Dum Dum, Habra, Bangaon, Basirhat, Naihati, Bhatpara, Kalyani, and Krishnanagar</strong>. Our network of suppliers and craftsmen covers the entire district, ensuring quality execution wherever you are.</p>

<h2>Key Areas and Their Housing Trends</h2>
<ul>
<li><strong>Barasat:</strong> Growing rapidly with new apartment complexes, strong demand for modern interiors</li>
<li><strong>Barrackpore:</strong> Mix of old bungalows and new flats, renovation projects popular</li>
<li><strong>Dum Dum:</strong> Urban, close to airport — premium apartments, high design standards</li>
<li><strong>Habra:</strong> Emerging residential hub, affordable 2BHK projects</li>
<li><strong>Kalyani:</strong> Planned township, government employees, quality-conscious clients</li>
</ul>`,
    areas: ['Barasat', 'Barrackpore', 'Dum Dum', 'Habra', 'Bangaon', 'Basirhat', 'Naihati', 'Bhatpara', 'Kalyani'],
    housingTypes: ['2BHK Flat', '3BHK Apartment', 'Independent House', 'Row House'],
    nearbyLocations: ['Kolkata', 'Nadia', 'Howrah'],
    priceRange: '₹750 – ₹2,000/sq ft',
    lat: 22.7200,
    lng: 88.4200,
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235791.2!2d88.4200!3d22.7200!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f88c0000000000%3A0x39f88c0000000000!2sNorth%2024%20Parganas%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1234567890',
    faqs: [
      { q: 'Do you serve North 24 Parganas?', a: 'Yes! We serve the entire North 24 Parganas district including Barasat, Barrackpore, Habra, Bangaon, Basirhat, and all surrounding areas.' },
      { q: 'What is interior design cost in North 24 Parganas?', a: 'Interior design costs ₹750–₹2,000/sq ft. Prices vary by town — Dum Dum is higher, Habra and Bangaon are more affordable.' },
    ],
    relatedSlugs: ['interior-designer-kolkata', 'interior-designer-new-town', 'interior-designer-south-24-parganas'],
  },
  {
    slug: 'interior-designer-south-24-parganas',
    name: 'South 24 Parganas',
    state: 'West Bengal',
    type: 'district',
    metaTitle: 'Interior Designer in South 24 Parganas | Home Interior | Sankalp Interior',
    metaDesc: 'Best interior designer in South 24 Parganas, WB. Serving Garia, Narendrapur, Baruipur, Diamond Harbour. Premium home interior at affordable prices. Free consultation!',
    h1: 'Interior Designer in South 24 Parganas',
    intro: 'Premium interior design across South 24 Parganas — from Garia and Narendrapur to Baruipur and Diamond Harbour, we bring quality design to every corner.',
    body: `<p><strong>South 24 Parganas</strong> is one of West Bengal\'s largest districts, extending from the southern suburbs of Kolkata to the Sundarbans delta. The district\'s northern areas — particularly <strong>Garia, Narendrapur, Sonarpur, and Baruipur</strong> — have seen rapid residential development and strong demand for quality interior design.</p>

<h2>Interior Design Services in South 24 Parganas</h2>
<p>We cover the entire district with focus on major residential areas: <strong>Garia, Narendrapur, Sonarpur, Baruipur, Rajpur, Maheshtala, Budge Budge, Diamond Harbour, and Kakdwip</strong>.</p>

<h2>Garia and Narendrapur — Our Stronghold</h2>
<p>Garia and Narendrapur are among our most active project areas in South 24 Parganas. The areas\' growing middle-class population, proximity to Kolkata, and new apartment developments make them ideal markets for quality interior design at accessible prices.</p>`,
    areas: ['Garia', 'Narendrapur', 'Sonarpur', 'Baruipur', 'Rajpur', 'Maheshtala', 'Budge Budge', 'Diamond Harbour'],
    housingTypes: ['2BHK Flat', 'Independent House', '3BHK Apartment', 'Villa'],
    nearbyLocations: ['Kolkata', 'Howrah', 'North 24 Parganas'],
    priceRange: '₹750 – ₹1,900/sq ft',
    lat: 22.3500,
    lng: 88.2500,
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d471582.2!2d88.2500!3d22.3500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a026c0000000000%3A0x3a026c0000000000!2sSouth%2024%20Parganas%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1234567890',
    faqs: [
      { q: 'Do you serve South 24 Parganas?', a: 'Yes! We serve Garia, Narendrapur, Sonarpur, Baruipur, and the entire South 24 Parganas district.' },
      { q: 'What is interior design cost in South 24 Parganas?', a: 'Interior design costs ₹750–₹1,900/sq ft. Garia/Narendrapur rates are close to Kolkata; outer areas are more affordable.' },
    ],
    relatedSlugs: ['interior-designer-kolkata', 'interior-designer-north-24-parganas', 'interior-designer-howrah'],
  },
  {
    slug: 'interior-designer-hooghly',
    name: 'Hooghly',
    state: 'West Bengal',
    type: 'district',
    metaTitle: 'Interior Designer in Hooghly | Chandannagar Serampore Home Interior | Sankalp',
    metaDesc: 'Best interior designer in Hooghly district, WB. Serving Chandannagar, Serampore, Chinsurah, Uttarpara. Premium home interior at honest prices. Free consultation!',
    h1: 'Interior Designer in Hooghly District',
    intro: 'Quality interior design across Hooghly district — from Chandannagar and Serampore to Chinsurah and Uttarpara, we create beautiful homes throughout the district.',
    body: `<p><strong>Hooghly district</strong> runs along the western bank of the Hooghly River, encompassing historic towns like Chandannagar, Serampore, and Chinsurah. The district\'s residential market is a mix of heritage homes, middle-class apartments, and new housing projects — all requiring specialized interior design expertise.</p>

<h2>Interior Design Services in Hooghly</h2>
<p>We serve the entire Hooghly district including: <strong>Chandannagar, Serampore, Chinsurah, Uttarpara, Konnagar, Rishra, Bhadreswar, Champdani, Arambagh, and Tarakeswar</strong>.</p>

<h2>Hooghly District Housing Character</h2>
<p>Hooghly\'s housing is characterized by its heritage — many homes blend traditional Bengali architecture with modern amenities. Our designers are skilled at creating interiors that respect and enhance these heritage elements while incorporating contemporary comfort and functionality.</p>`,
    areas: ['Chandannagar', 'Serampore', 'Chinsurah', 'Uttarpara', 'Konnagar', 'Rishra', 'Bhadreswar', 'Arambagh'],
    housingTypes: ['Heritage Home', '2BHK Flat', 'Independent House', '3BHK Apartment'],
    nearbyLocations: ['Kolkata', 'Howrah', 'Burdwan'],
    priceRange: '₹750 – ₹1,900/sq ft',
    lat: 22.9000,
    lng: 88.3900,
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235791.2!2d88.3900!3d22.9000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f88d0000000000%3A0x39f88d0000000000!2sHooghly%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1234567890',
    faqs: [
      { q: 'Do you serve Hooghly district?', a: 'Yes! We serve Chandannagar, Serampore, Chinsurah, Uttarpara, and the entire Hooghly district.' },
      { q: 'What is interior design cost in Hooghly?', a: 'Interior design in Hooghly costs ₹750–₹1,900/sq ft. A complete 2BHK interior costs ₹4–6 Lakhs.' },
    ],
    relatedSlugs: ['interior-designer-kolkata', 'interior-designer-howrah', 'interior-designer-nadia'],
  },
  {
    slug: 'interior-designer-nadia',
    name: 'Nadia',
    state: 'West Bengal',
    type: 'district',
    metaTitle: 'Interior Designer in Nadia | Krishnanagar Kalyani Home Interior | Sankalp',
    metaDesc: 'Best interior designer in Nadia district, WB. Serving Krishnanagar, Kalyani, Nabadwip, Ranaghat. Premium home interior design at honest prices. Free consultation!',
    h1: 'Interior Designer in Nadia District',
    intro: 'Premium interior design across Nadia district — from Kalyani and Krishnanagar to Nabadwip and Ranaghat, transforming homes with quality and care.',
    body: `<p><strong>Nadia district</strong> is one of West Bengal\'s most historically and culturally significant districts, home to Nabadwip (the birthplace of Sri Chaitanya) and Krishnanagar (famous for its clay artisans). The district has a growing urban population with strong demand for quality home interiors.</p>

<h2>Interior Design Services in Nadia</h2>
<p>We serve the entire Nadia district: <strong>Krishnanagar, Kalyani, Nabadwip, Ranaghat, Chakdaha, Shantipur, Tehatta, and Hanskhali</strong>.</p>

<h2>Kalyani — A Key Market</h2>
<p>Kalyani, a planned township and home to Kalyani University, has a large population of academics, doctors, and professionals who demand quality interior design. Our team has completed numerous projects in Kalyani\'s planned residential sectors.</p>`,
    areas: ['Krishnanagar', 'Kalyani', 'Nabadwip', 'Ranaghat', 'Chakdaha', 'Shantipur', 'Tehatta'],
    housingTypes: ['2BHK Flat', 'Independent House', '3BHK Apartment', 'Government Quarter'],
    nearbyLocations: ['North 24 Parganas', 'Murshidabad', 'Burdwan'],
    priceRange: '₹700 – ₹1,800/sq ft',
    lat: 23.4000,
    lng: 88.5500,
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d471582.2!2d88.5500!3d23.4000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f80a0000000000%3A0x39f80a0000000000!2sNadia%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1234567890',
    faqs: [
      { q: 'Do you serve Nadia district?', a: 'Yes! We serve Krishnanagar, Kalyani, Nabadwip, Ranaghat, and the entire Nadia district.' },
      { q: 'What is interior design cost in Nadia?', a: 'Interior design in Nadia costs ₹700–₹1,800/sq ft. Kalyani rates are slightly higher due to demand.' },
    ],
    relatedSlugs: ['interior-designer-north-24-parganas', 'interior-designer-kolkata', 'interior-designer-murshidabad'],
  },
  {
    slug: 'interior-designer-murshidabad',
    name: 'Murshidabad',
    state: 'West Bengal',
    type: 'district',
    metaTitle: 'Interior Designer in Murshidabad | Berhampore Home Interior | Sankalp',
    metaDesc: 'Best interior designer in Murshidabad district, WB. Serving Berhampore, Jiaganj, Lalbagh. Premium home interior design at honest prices. Free consultation!',
    h1: 'Interior Designer in Murshidabad District',
    intro: 'Quality interior design services in Murshidabad — from Berhampore and Jiaganj to Lalbagh and Domkal, bringing premium craftsmanship to every home.',
    body: `<p><strong>Murshidabad district</strong>, with its rich Nawabi heritage, has a growing urban population in Berhampore and surrounding towns that is increasingly investing in quality home interiors. The district\'s educated middle class — teachers, doctors, government employees, and businesspeople — demand quality interior design that combines aesthetics with practicality.</p>

<h2>Interior Design Services in Murshidabad</h2>
<p>We serve the major urban centres of Murshidabad district: <strong>Berhampore, Jiaganj, Lalbagh, Domkal, Kandi, Jangipur, and Raghunathganj</strong>.</p>

<h2>Berhampore — Our Primary Focus</h2>
<p>Berhampore, the district headquarters, has seen significant residential development with new apartment complexes and upgraded independent houses. Our team regularly visits Berhampore for projects and free consultations.</p>`,
    areas: ['Berhampore', 'Jiaganj', 'Lalbagh', 'Domkal', 'Kandi', 'Jangipur', 'Raghunathganj'],
    housingTypes: ['2BHK Flat', 'Independent House', '3BHK Apartment'],
    nearbyLocations: ['Nadia', 'Birbhum', 'Malda'],
    priceRange: '₹650 – ₹1,600/sq ft',
    lat: 24.1800,
    lng: 88.2700,
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d471582.2!2d88.2700!3d24.1800!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fbf30000000000%3A0x39fbf30000000000!2sMurshidabad%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1234567890',
    faqs: [
      { q: 'Do you serve Murshidabad district?', a: 'Yes! We serve Berhampore, Jiaganj, Lalbagh, and the entire Murshidabad district.' },
      { q: 'What is interior design cost in Murshidabad?', a: 'Interior design in Murshidabad costs ₹650–₹1,600/sq ft — one of the most affordable in West Bengal.' },
    ],
    relatedSlugs: ['interior-designer-nadia', 'interior-designer-kolkata', 'interior-designer-birbhum'],
  },
];

export const getLocation = (slug: string) => LOCATIONS.find(l => l.slug === slug);
export const getRelated = (slugs: string[]) => LOCATIONS.filter(l => slugs.includes(l.slug));
