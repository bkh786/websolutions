const fs = require('fs');
const path = require('path');

const root = __dirname;
const outputPages = ['index.html', 'services.html', 'portfolio.html', 'vision.html', 'contact.html'];
const legacyPages = ['about.html', 'pricing.html'];

const contact = {
  email: 'contact@websoul.in',
  phone: '+91-9064435909',
  whatsapp: '919064435909',
};

const cities = [
  'Kolkata', 'Mumbai', 'Delhi NCR', 'Bengaluru', 'Hyderabad', 'Chennai', 'Pune', 'Ahmedabad',
  'Jaipur', 'Surat', 'Lucknow', 'Indore', 'Bhubaneswar', 'Patna', 'Ranchi', 'Guwahati',
  'Siliguri', 'Durgapur', 'Asansol', 'Raipur', 'Nagpur', 'Coimbatore', 'Kochi', 'Chandigarh',
];

const services = [
  'New website development',
  'Current website enhancement',
  'CRM development',
  'Mobile app development',
  'GEO and SEO based content writing and customization',
  'UI & UX enhancement',
  'Web hosting on shared space',
  'Landing pages and conversion funnels',
  'E-commerce storefronts',
  'Performance optimization',
  'Analytics and lead tracking',
  'Maintenance and security care',
];

const pageMeta = {
  'index.html': {
    title: 'Cinematic Web Development Studio',
    description: 'WebSoul.in builds cinematic websites, CRM systems, mobile apps, GEO content, SEO pages, UI UX enhancements, and hosted digital platforms for Indian businesses.',
  },
  'services.html': {
    title: 'Services',
    description: 'Premium web development, website enhancement, CRM development, mobile app development, GEO SEO content, UI UX enhancement, and shared hosting services.',
  },
  'portfolio.html': {
    title: 'Portfolio',
    description: 'A cinematic portfolio of luxury web interfaces, CRM systems, content engines, mobile app experiences, and high-performance digital platforms.',
  },
  'vision.html': {
    title: 'Vision',
    description: 'WebSoul.in vision for restrained, fast, AI-readable, search-ready digital experiences engineered for brand authority and business growth.',
  },
  'contact.html': {
    title: 'Contact',
    description: 'Contact WebSoul.in for website development, CRM development, mobile apps, GEO SEO content, UI UX enhancement, and reliable web hosting.',
  },
};

const serviceDescriptions = [
  'Bespoke marketing sites, business websites and scalable page systems with premium motion.',
  'Redesigns, speed repair, content refresh, accessibility improvements and conversion upgrades.',
  'Custom lead, sales, support and workflow dashboards built around your operating process.',
  'Mobile-first app interfaces and product journeys for Android, iOS and progressive web apps.',
  'Search and generative-engine content tuned for direct answers, local intent and service clarity.',
  'Interface audits, wireframes, design systems and usability improvements for stronger journeys.',
  'Shared-space hosting support for lean, reliable launches with maintenance-ready foundations.',
  'Campaign pages with clear offers, persuasive sections and measurable enquiry paths.',
  'Product catalogs, checkout-ready storefronts and premium commerce presentation.',
  'Core Web Vitals, image optimization, lightweight code and responsive front-end refinements.',
  'Lead tracking, event measurement and reporting setups that reveal what is working.',
  'Ongoing updates, backup thinking, security hygiene and content support after launch.',
];

const portfolioItems = [
  { label: '01', type: 'Luxury Website', title: 'A quiet home page for a premium consultancy.', note: 'Editorial hero, service proof, conversion CTA.' },
  { label: '02', type: 'CRM Experience', title: 'A refined lead pipeline for sales teams.', note: 'Status clarity, contact history, next-action flow.' },
  { label: '03', type: 'Mobile Product', title: 'An app journey designed for repeat use.', note: 'Fast decisions, calm UI, strong onboarding.' },
  { label: '04', type: 'GEO Content System', title: 'Service pages shaped for AI discovery.', note: 'Schema, direct answers, local keyword logic.' },
];

function nav(page) {
  const links = [
    ['index.html', 'Home'],
    ['services.html', 'Services'],
    ['portfolio.html', 'Portfolio'],
    ['vision.html', 'Vision'],
    ['contact.html', 'Contact'],
  ];

  return links.map(([href, label]) => (
    `<a class="nav-link${page === href ? ' is-active' : ''}" href="${href}">${label}</a>`
  )).join('');
}

function shell(page, body) {
  const meta = pageMeta[page];
  const serviceSchema = services.map(service => `"${service}"`).join(',');
  const citySchema = cities.map(city => `{"@type":"City","name":"${city}"}`).join(',');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${meta.description}">
  <title>${meta.title} | WebSoul.in</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            ink: '#050505',
            panel: '#111111',
            gold: '#D4AF37',
            porcelain: '#F5F5F5',
            muted: '#A1A1A1'
          },
          fontFamily: {
            sans: ['Satoshi', 'Inter', 'Arial', 'sans-serif']
          }
        }
      }
    }
  </script>
  <link rel="preconnect" href="https://api.fontshare.com">
  <link href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700,900&display=swap" rel="stylesheet">
  <link href="public/css/style.css?v=cinematic-luxury-4" rel="stylesheet">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "WebSoul.in - Web Development & Digital Marketing Solutions",
    "url": "https://websoul.in",
    "email": "${contact.email}",
    "telephone": "${contact.phone}",
    "areaServed": [${citySchema}],
    "knowsAbout": [${serviceSchema}],
    "sameAs": ["https://websoul.in"]
  }
  </script>
</head>
<body class="bg-ink text-porcelain antialiased">
  <div class="cursor-dot" aria-hidden="true"></div>
  <div class="cursor-outline" aria-hidden="true"></div>
  <div class="ambient ambient-one" aria-hidden="true"></div>
  <div class="ambient ambient-two" aria-hidden="true"></div>

  <header class="site-header">
    <a class="brand interactive" href="index.html" aria-label="WebSoul.in home">
      <span>WebSoul.in</span>
      <small>Digital Studio</small>
    </a>
    <nav class="desktop-nav" aria-label="Primary navigation">
      ${nav(page)}
    </nav>
    <a class="header-cta magnetic-btn" href="contact.html">Start a Project</a>
  </header>
  <a class="mobile-header-cta magnetic-btn" href="contact.html" aria-label="Start a project" style="position:fixed;top:30px;right:24px;z-index:130;display:grid;width:42px;height:42px;place-items:center;border-radius:999px;background:#F5F5F5;color:#050505;font-size:20px;font-weight:900;">+</a>

  <main>
${body}
  </main>

  <footer class="footer">
    <div>
      <p class="footer-brand">Web Development & Digital Marketing Solutions</p>
      <p class="footer-copy">Cinematic websites, CRM systems, mobile apps, GEO-ready content, UI UX enhancement, and reliable hosted digital infrastructure for growth-focused businesses.</p>
    </div>
    <div class="footer-contact">
      <a href="mailto:${contact.email}">${contact.email}</a>
      <a href="tel:${contact.phone.replace(/-/g, '')}">${contact.phone}</a>
      <span>Copyright 2026 WebSoul.in</span>
    </div>
  </footer>

  <a class="whatsapp-widget magnetic-btn" href="https://wa.me/${contact.whatsapp}?text=Hi%20WebSoul.in%2C%20I%20want%20to%20start%20a%20digital%20project." target="_blank" rel="noopener" aria-label="Chat with WebSoul.in on WhatsApp">
    <span>WA</span>
  </a>

  <script src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.29/bundled/lenis.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <script src="https://unpkg.com/split-type"></script>
  <script src="public/js/animations.js?v=cinematic-luxury-4"></script>
</body>
</html>
`;
}

const pages = {
  'index.html': `
    <section class="hero scene">
      <div class="hero-media" aria-hidden="true">
        <div class="device-frame device-one"></div>
        <div class="device-frame device-two"></div>
        <div class="light-sweep"></div>
      </div>
      <div class="section-inner hero-inner">
        <p class="eyebrow gsap-fade-up">Cinematic digital studio for India and global-first brands</p>
        <h1 class="split-title">Web experiences engineered to dominate attention.</h1>
        <p class="hero-copy gsap-fade-up">WebSoul.in designs fast, elegant and AI-readable digital products: websites, CRM platforms, mobile apps, content systems, interface upgrades and hosting that make a business easier to discover, trust and contact.</p>
        <div class="hero-actions gsap-fade-up">
          <a class="primary-btn magnetic-btn" href="services.html">Explore Services</a>
          <a class="ghost-btn magnetic-btn" href="portfolio.html">View Portfolio</a>
        </div>
      </div>
    </section>
    <section class="cinema-band">
      <div class="section-inner two-column">
        <h2 class="split-title">Luxury restraint. Search clarity. Conversion discipline.</h2>
        <p class="gsap-fade-up">The new WebSoul.in direction is intentionally quiet: fewer words, stronger sections, polished motion and precise service signals for Google, ChatGPT, Gemini and real buyers. Every page says what you do, who it helps and how quickly a visitor can take action.</p>
      </div>
    </section>`,

  'services.html': `
    <section class="page-hero">
      <div class="section-inner">
        <p class="eyebrow gsap-fade-up">Services</p>
        <h1 class="split-title">A complete digital build desk, shaped like a luxury studio.</h1>
        <p class="hero-copy gsap-fade-up">From a first website to a refined CRM and mobile ecosystem, WebSoul.in turns scattered digital needs into one coherent growth platform.</p>
      </div>
    </section>
    <section class="section-inner service-grid gsap-stagger-list">
      ${services.map((service, index) => `
      <article class="service-card">
        <span>${String(index + 1).padStart(2, '0')}</span>
        <h2>${service}</h2>
        <p>${serviceDescriptions[index]}</p>
      </article>`).join('')}
    </section>
    <section class="contrast-strip">
      <div class="section-inner two-column">
        <h2 class="split-title">Built for ranking, briefing and buying decisions.</h2>
        <p class="gsap-fade-up">Service pages, product pages and local landing pages can be customized with GEO prompts, structured answers, schema, speed improvements and human editorial polish so search engines and AI assistants understand the brand clearly.</p>
      </div>
    </section>`,

  'portfolio.html': `
    <section class="page-hero portfolio-intro">
      <div class="section-inner">
        <p class="eyebrow gsap-fade-up">Portfolio</p>
        <h1 class="split-title">Editorial systems for brands that want to feel premium before they speak.</h1>
      </div>
    </section>
    <section class="portfolio-track-wrap">
      <div class="portfolio-track">
        ${portfolioItems.map(item => `
        <article class="portfolio-panel">
          <div class="mockup">
            <span>${item.label}</span>
            <div></div>
          </div>
          <p>${item.type}</p>
          <h2>${item.title}</h2>
          <span>${item.note}</span>
        </article>`).join('')}
      </div>
    </section>
    <section class="cinema-band">
      <div class="section-inner two-column">
        <h2 class="split-title">Whitespace does the selling.</h2>
        <p class="gsap-fade-up">Portfolio work is presented as cinematic direction: immersive mockups, restrained text and scroll-led reveals that make websites, apps and CRM interfaces feel valuable without shouting.</p>
      </div>
    </section>`,

  'vision.html': `
    <section class="vision-hero scene">
      <div class="section-inner">
        <p class="eyebrow gsap-fade-up">Vision</p>
        <h1 class="split-title">The future website is a calm machine for trust.</h1>
      </div>
    </section>
    <section class="section-inner vision-stack">
      <article class="vision-row gsap-fade-up">
        <span>01</span>
        <h2>Readable by people and AI.</h2>
        <p>Copy is concise, factual and structured so customers, Google, ChatGPT and Gemini can quickly identify services, locations, proof and next steps.</p>
      </article>
      <article class="vision-row gsap-fade-up">
        <span>02</span>
        <h2>Motion with restraint.</h2>
        <p>Animation supports focus: slow fades, parallax depth and horizontal storytelling, with no noisy loops competing with the offer.</p>
      </article>
      <article class="vision-row gsap-fade-up">
        <span>03</span>
        <h2>Growth without visual clutter.</h2>
        <p>The studio builds digital infrastructure that can expand into content libraries, lead funnels, CRM workflows, app journeys and hosted business tools.</p>
      </article>
    </section>`,

  'contact.html': `
    <section class="contact-screen">
      <div class="contact-copy">
        <p class="eyebrow gsap-fade-up">Contact</p>
        <h1 class="split-title">Bring the next version of your business online.</h1>
        <p class="hero-copy gsap-fade-up">Tell WebSoul.in what you want to build, repair or scale. The response can cover website development, CRM, app design, content, UI UX, hosting or a full digital roadmap.</p>
      </div>
      <div class="contact-panel gsap-fade-up">
        <a class="contact-card magnetic-btn" href="mailto:${contact.email}">
          <span>Email</span>
          <strong>${contact.email}</strong>
        </a>
        <a class="contact-card magnetic-btn" href="tel:${contact.phone.replace(/-/g, '')}">
          <span>Phone</span>
          <strong>${contact.phone}</strong>
        </a>
        <a class="primary-btn magnetic-btn" href="https://wa.me/${contact.whatsapp}?text=Hi%20WebSoul.in%2C%20I%20want%20to%20start%20a%20digital%20project." target="_blank" rel="noopener">Chat on WhatsApp</a>
      </div>
    </section>`,
};

outputPages.forEach(page => {
  fs.writeFileSync(path.join(root, page), shell(page, pages[page]));
  console.log(`Generated ${page}`);
});

legacyPages.forEach(page => {
  const file = path.join(root, page);
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
    console.log(`Removed ${page}`);
  }
});
