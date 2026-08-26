import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  FiLock, FiPhone, FiCheckCircle, FiUser, FiArrowRight, FiDownload,
  FiFileText, FiMessageSquare, FiChevronDown, FiChevronUp, FiCheck, FiStar
} from 'react-icons/fi';

/* ═══════════════════════════════════════════════════════════════════════
   ⚠️  1. LOGO — fix path for where this file lives.
          Navbar.jsx uses '../../assets/mainlogo.png'
          If ApplyNow.jsx is in src/pages/ → '../assets/mainlogo.png'

   ⚠️  2. PHOTOS in /public
          /public/campus.jpg        — hero background (1920×1080+, <400KB)
          /public/campus-about.jpg  — About section (800×600+); falls back
                                      to campus.jpg if you don't add one

   ⚠️  3. BROCHURE — /public/brochure.pdf
   ═══════════════════════════════════════════════════════════════════════ */
import gsbmLogo from '../../assets/mainlogo.png';
import './Applynow.css';

const CAMPUS_PHOTO  = '/campus.jpg';
const ABOUT_PHOTO   = '/campus-about.jpg';
const BROCHURE_FILE      = '/brochure.pdf';        // update to match your exact filename
const BROCHURE_DOWNLOAD  = 'GSBM_Brochure.pdf';    // the name the user sees when downloading

/* ── SEO ───────────────────────────────────────────────────────────────── */
const SEO = {
  title: 'MBA Admission in Chennai 2026 | AICTE Approved MBA College | GSBM',
  description:
    'Apply for MBA admission 2026–28 at GSBM Chennai. AICTE approved MBA college in Chennai, UGC recognised and NAAC accredited framework. Any graduate eligible. 100% placement support. Scholarships available. Apply in 20 seconds.',
  canonical: 'https://www.gsbm.co.in/apply',
  keywords:
    'MBA admission Chennai, MBA college in Chennai, AICTE approved MBA Chennai, best MBA college Tamil Nadu, MBA without entrance exam Chennai, MBA admission 2026, top MBA colleges Chennai, MBA fees Chennai, management college Chennai',
};

const WHY_GSBM = [
  "AICTE Approved",
  "UGC Recognised Degree Framework",
  "NAAC Accredited Institutional Framework",
  'Graduates from Any Discipline Can Apply',
  'Structured Career Development and Placement Support',
  'Merit Scholarships Available',
  "25+ Years of Educational Experience",
  "100% Career Development Support",
  

];

const HERO_POINTS = [
  "UGC Recognised Degree Framework",
  "AICTE Approved",
  "UGC Recognised • NAAC Accredited Institutional Framework",
  'Graduates from Any Discipline Can Apply',
  'Structured Career Development and Placement Support',
  'Merit Scholarships Available',
  "25+ Years of Educational Experience",
  "100% Career Development Support"
  
];

/* Accreditation logos — same sources as the site's LogoStrip component.
   VMRF dropped here on request — AICTE / NAAC / 25-years only. */
const HERO_BADGES = [
  { src: 'https://res.cloudinary.com/damisreoh/image/upload/q_auto,f_auto,w_200/v1777091751/AICTE_umarzo.webp',
    alt: 'AICTE – All India Council for Technical Education' },
  { src: 'https://res.cloudinary.com/damisreoh/image/upload/v1779259623/NAAC_LOGO_1_wvpqpj.jpg',
    alt: 'NAAC – National Assessment and Accreditation Council' },
  { src: 'https://res.cloudinary.com/damisreoh/image/upload/q_auto,f_auto,w_200/v1777091881/25-_NEW_final_tfkexe.png',
    alt: 'GSBM – 25 years of excellence' },
]

const HOW_IT_WORKS = [
  { icon: <FiUser size={26} strokeWidth={2} />,          step: '1', title: 'Fill the Form',        desc: 'Fill the Form Enter your name and mobile number to get started. It takes less than a minute' },
  { icon: <FiFileText size={26} strokeWidth={2} />,      step: '2', title: 'Complete Application', desc: 'Complete Your Application Continue to the application form and provide the required academic and admissions details.' },
  { icon: <FiCheckCircle size={26} strokeWidth={2} />,   step: '3', title: 'Counsellor Calls You', desc: 'Speak to an Admissions Counsellor Our admissions team will connect with you to guide you through the next steps.' },
];

const TESTIMONIALS = [
  { name: 'Priya R.',  loc: 'Chennai',    rating: 5, text: 'GSBM gave me the career boost I needed. Best MBA college in Chennai with excellent faculty and outstanding placement support!' },
  { name: 'Arjun K.',  loc: 'Tamil Nadu', rating: 5, text: 'I was looking for an MBA college in Chennai without entrance exam. GSBM was the perfect choice. Highly recommend to all freshers!' },
  { name: 'Divya S.',  loc: 'Coimbatore', rating: 5, text: 'AICTE approved, great campus, affordable fees. The admissions team was very helpful throughout my MBA application process.' },
];

const FAQS = [
  { q: 'Is GSBM an AICTE approved MBA college in Chennai?',        a: "Yes. GSBM offers an AICTE approved MBA in Chennai within a UGC recognised and NAAC accredited institutional framework." },
  { q: 'Can I get MBA admission in Chennai without entrance exam?', a: "Candidates may apply to GSBM through the applicable admission routes. Eligibility is based on academic qualifications and the prevailing admission requirements. Our admissions team can guide you on the appropriate route." },
  { q: 'What is the MBA admission process at GSBM Chennai?',        a: "The process is simple: submit your application, complete the required admission interaction and, if selected, receive your admission offer. Our admissions team will guide you throughout the process." },
  { q: 'Why should I consider GSBM for my MBA?',                    a: " GSBM offers an industry integrated MBA experience built around academic rigour, personalised learning, industry exposure, career development and a strong focus on employability." },
   { q: 'What is the last date for MBA admission 2026?',             a: 'The last date for MBA admission 2026 at GSBM Chennai is August 30, 2026. Limited seats are available so we recommend applying as early as possible.' },
  { q: 'Can working professionals apply for the GSBM MBA??',         a: "Yes. Eligible working professionals may apply to the full time MBA program, subject to the applicable admission " },
  
];


const ZOHO_FORM_URL = 'https://forms.zohopublic.in/gsbmtechgm1/form/GSBMChennaiMBAPROGRAM/formperma/TJrU6LXsWTqAWh5ZbxgeWMkmSW2-aK-lzoJ2xn3iEjQ';

const COUNSELLOR_PHONE         = '+918667690672';
const COUNSELLOR_PHONE_DISPLAY = '+91 8667690672';
const WHATSAPP_NUMBER          = '918667690672'; // country code, no + and no spaces
const WHATSAPP_MSG             = 'Hi, I would like to know more about MBA admissions at GSBM.';
const WHATSAPP_URL             = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MSG)}`;

/* Small inline WhatsApp glyph — avoids pulling in a whole icon set for
   one icon. currentColor so it follows the button's text colour. */
const WhatsAppIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.02c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.12.11-1.8-.11-.42-.13-.95-.31-1.64-.6-2.88-1.24-4.76-4.15-4.9-4.34-.14-.19-1.17-1.56-1.17-2.98 0-1.42.74-2.11 1-2.4.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.58.82 2 .89 2.14.07.14.11.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.71 1.17 1.52 1.9 1.05.94 1.93 1.23 2.21 1.37.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.19-.28.37-.23.62-.14.26.09 1.63.77 1.91.91.28.14.47.21.54.33.07.12.07.68-.17 1.35Z" />
  </svg>
);

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`ap-faq-i${open ? ' open' : ''}`}>
      <button className="ap-faq-q" onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <span>{q}</span>
        {open ? <FiChevronUp size={20} strokeWidth={2.5} /> : <FiChevronDown size={20} strokeWidth={2.5} />}
      </button>
      {open && <div className="ap-faq-a">{a}</div>}
    </div>
  );
};

const ApplyNow = () => {
  const [name,     setName]     = useState('');
  const [phone,    setPhone]    = useState('');
  const [consent,  setConsent]  = useState(true);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');
  const [gclid,    setGclid]    = useState('');
  const [photoOk,  setPhotoOk]  = useState(false);
  const [aboutSrc, setAboutSrc] = useState(ABOUT_PHOTO);

  const startedRef   = useRef(false);
  const submittedRef = useRef(false);

  const push = (payload) => {
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(payload);
    } catch { /* never block the flow */ }
  };

  useEffect(() => { push({ event: 'apply_page_view' }); }, []);

  /* ── SEO: title, meta description, keywords, canonical, OG ── */
  useEffect(() => {
    const prevTitle = document.title;
    document.title = SEO.title;

    const created = [];
    const setMeta = (attr, key, content) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
        created.push(el);
      }
      el.setAttribute('content', content);
      return el;
    };

    setMeta('name', 'description', SEO.description);
    setMeta('name', 'keywords', SEO.keywords);
    setMeta('name', 'robots', 'index,follow');
    setMeta('property', 'og:title', SEO.title);
    setMeta('property', 'og:description', SEO.description);
    setMeta('property', 'og:url', SEO.canonical);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:locale', 'en_IN');
    setMeta('name', 'twitter:card', 'summary_large_image');

    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
      created.push(link);
    }
    link.setAttribute('href', SEO.canonical);

    return () => {
      document.title = prevTitle;
      created.forEach(el => el.parentNode && el.parentNode.removeChild(el));
    };
  }, []);

  /* Preload the hero photo so text never lands on a half-painted image */
  useEffect(() => {
    const img = new Image();
    img.onload  = () => setPhotoOk(true);
    img.onerror = () => setPhotoOk(false);
    img.src = CAMPUS_PHOTO;
  }, []);

  useEffect(() => {
    const onLeave = () => {
      if (startedRef.current && !submittedRef.current) push({ event: 'form_abandon' });
    };
    window.addEventListener('pagehide', onLeave);
    return () => window.removeEventListener('pagehide', onLeave);
  }, []);

  const markStart = () => {
    if (!startedRef.current) { startedRef.current = true; push({ event: 'form_start' }); }
  };
  const trackCall     = (loc) => push({ event: 'call_click', cta_location: loc });
  const trackWhatsApp = (loc) => push({ event: 'whatsapp_click', cta_location: loc });

  /* Brochure download — same pattern as the site's existing
     handleExploreClick: build a real <a download>, click it, remove it.
     GTM event fires first so the download itself can never block it. */
  const handleDownloadBrochure = useCallback((loc) => {
    push({ event: 'brochure_download', cta_location: loc });
    const link = document.createElement('a');
    link.href = BROCHURE_FILE;
    link.download = BROCHURE_DOWNLOAD;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  useEffect(() => {
    const p  = new URLSearchParams(window.location.search);
    const id = p.get('gclid') || '';
    if (id) { setGclid(id); localStorage.setItem('gclid', id); }
    else    { const s = localStorage.getItem('gclid'); if (s) setGclid(s); }
  }, []);

  /* Reset html/body while this page is mounted — a standalone route like
     this one has no shared layout to reset margins/background for it,
     so the browser's default 8px body margin can expose the app
     shell's background colour as a sliver above our sticky header.
     Force it to 0/white here, restore whatever it was on unmount. */
  useEffect(() => {
    const prev = {
      htmlMargin: document.documentElement.style.margin,
      bodyMargin: document.body.style.margin,
      bodyPad:    document.body.style.padding,
      bodyBg:     document.body.style.background,
    };
    document.documentElement.style.margin = '0';
    document.body.style.margin     = '0';
    document.body.style.padding    = '0';
    document.body.style.background = '#FFFFFF';
    return () => {
      document.documentElement.style.margin = prev.htmlMargin;
      document.body.style.margin     = prev.bodyMargin;
      document.body.style.padding    = prev.bodyPad;
      document.body.style.background = prev.bodyBg;
    };
  }, []);

  /* Hide anything the site's global chrome renders outside our route:
     the floating social-icon rail, a route-transition loading bar, or
     any other fixed-position overlay that isn't part of this page.
     Scans EVERY element in <body>, not just direct children, so depth
     doesn't matter. Restores everything the instant this page unmounts. */
  useEffect(() => {
    const root = document.querySelector('.ap');
    const restore = [];
    document.querySelectorAll('body *').forEach((el) => {
      if (root && root.contains(el)) return;
      const cs = getComputedStyle(el);
      const isFixed = cs.position === 'fixed';
      const isTopStrip = (cs.position === 'fixed' || cs.position === 'absolute' || cs.position === 'sticky')
        && (cs.top === '0px' || cs.top === '0%')
        && el.offsetHeight > 0 && el.offsetHeight <= 8
        && el.offsetWidth > window.innerWidth * 0.5;
      const looksLikeLoader = /progress|loading|loader|topbar|nprogress/i.test(el.className || '')
        || /progress|loading|loader|topbar|nprogress/i.test(el.id || '');
      if (isFixed || isTopStrip || looksLikeLoader) {
        restore.push([el, el.style.display]);
        el.style.display = 'none';
      }
    });
    return () => restore.forEach(([el, prev]) => { el.style.display = prev; });
  }, []);

  /* ── Structured data: Organization + Course + FAQ + Breadcrumb ── */
  useEffect(() => {
    const org = {
      '@context': 'https://schema.org', '@type': 'CollegeOrUniversity',
      name: 'Ganesan School of Business Management', alternateName: 'GSBM Chennai',
      url: 'https://www.gsbm.co.in', telephone: COUNSELLOR_PHONE,
      email: 'admissions@gsbm.co.in',
      description: 'AICTE approved MBA college in Chennai, Tamil Nadu. UGC recognised and NAAC accredited framework. MBA admissions 2026–28 open.',
      address: { '@type': 'PostalAddress', addressLocality: 'Chennai', addressRegion: 'Tamil Nadu', addressCountry: 'IN' },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: String(TESTIMONIALS.length), bestRating: '5' },
    };
    const course = {
      '@context': 'https://schema.org', '@type': 'Course',
      name: 'Master of Business Administration (MBA) 2026–2028',
      description: 'Two year full time MBA in Chennai with an industry integrated curriculum, experienced faculty and 100% placement support.',
      provider: { '@type': 'CollegeOrUniversity', name: 'Ganesan School of Business Management', sameAs: 'https://www.gsbm.co.in' },
      hasCourseInstance: {
        '@type': 'CourseInstance', courseMode: 'full-time', courseWorkload: 'P2Y',
        location: { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: 'Chennai', addressRegion: 'Tamil Nadu', addressCountry: 'IN' } },
      },
    };
    const faqSchema = {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    };
    const crumbs = {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.gsbm.co.in' },
        { '@type': 'ListItem', position: 2, name: 'MBA Admission 2026–28', item: SEO.canonical },
      ],
    };
    const nodes = [org, course, faqSchema, crumbs].map(obj => {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.text = JSON.stringify(obj);
      document.head.appendChild(s);
      return s;
    });
    return () => nodes.forEach(n => n.parentNode && n.parentNode.removeChild(n));
  }, []);

  /* Mark <body> while this page is mounted so the global Footer (which
     always renders on every route, /apply included) can be given extra
     bottom padding on mobile — otherwise the fixed Call Us/WhatsApp bar
     at the bottom of THIS page sits on top of Footer's last line
     (copyright/credit) and covers it. See the body.ap-active rule near
     the top of Applynow.css. */
  useEffect(() => {
    document.body.classList.add('ap-active');
    return () => document.body.classList.remove('ap-active');
  }, []);

  const scrollToForm = () => {
    document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => document.getElementById('name-input')?.focus({ preventScroll: true }), 400);
  };

  const saveLeadNonBlocking = (payload) => {
    try {
      fetch('/api/save-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, source: 'apply-now-landing', ts: new Date().toISOString() }),
        keepalive: true,
      }).catch(() => {});
    } catch { /* never block the flow */ }
  };

  const handleSubmit = () => {
    setError('');
    const cleanedPhone = phone.replace(/\D/g, '');
    if (!name.trim())               { setError('Enter your name to continue.'); return; }
    if (cleanedPhone.length !== 10) { setError('Enter a valid 10-digit mobile number.'); return; }
    if (!consent)                   { setError('Please accept the terms to continue.'); return; }

    setLoading(true);
    submittedRef.current = true;
    push({ event: 'generate_lead', value: 1, currency: 'INR' });

    saveLeadNonBlocking({
      name: name.trim(), phone: cleanedPhone,
      who: null, qualification: null, gclid: gclid || null,
    });

    const params = new URLSearchParams({ PhoneNumber: cleanedPhone, Name: name.trim() });
    if (gclid) params.set('gclid', gclid);
    window.location.href = `${ZOHO_FORM_URL}?${params.toString()}`;
  };

  return (
    <div className="ap">

      {/* ══ HEADER ══ */}
      <header className="ap-hd">
        <Link className="ap-hd-logo" to="/" aria-label="GSBM – Go to homepage">
          <img src={gsbmLogo} alt="GSBM – Ganesan School of Business Management, Chennai" fetchPriority="high" />
        </Link>
        <div className="ap-hd-right">
          <a className="ap-hd-call" href={`tel:${COUNSELLOR_PHONE}`} onClick={() => trackCall('header')}>
            <FiPhone size={18} strokeWidth={2.4} />{COUNSELLOR_PHONE_DISPLAY}
          </a>
          <button className="ap-hd-btn" onClick={() => handleDownloadBrochure('header')}>
            <FiDownload size={16} strokeWidth={2.4} />
            <span className="ap-hd-btn-txt"><span className="ap-hd-btn-full">Download </span>Brochure</span>
            <FiArrowRight size={16} strokeWidth={2.6} className="ap-hd-btn-arrow" />
          </button>
        </div>
      </header>

      {/* ══ HERO ══ */}
      <section
        className={`ap-hero${photoOk ? ' has-photo' : ''}`}
        style={{ '--hero-img': `url(${CAMPUS_PHOTO})` }}
      >
        <div className="ap-hero-in">
          {/* Top chunk — always first: branding + headline. Stays visible
              above the form on every breakpoint. */}
          <div className="ap-hero-top">
            <div className="ap-banner"><h1>MBA 2026–28</h1></div>
            <p className="ap-hero-by">Master of Business Administration at</p>
            <p className="ap-hero-name">Ganesan School of Business Management, Chennai</p>
          </div>

          {/* Bottom chunk — points + accreditation logos. Pushed BELOW the
              form on mobile (see .ap-hero-bottom order in the mobile media
              query) so the form is the first interactive thing visible. */}
          <div className="ap-hero-bottom">
            <div className="ap-pts">
              {HERO_POINTS.map((p, i) => (
                <div key={i} className="ap-pt">
                  <span className="ap-pt-ck"><FiCheck size={16} strokeWidth={3.5} /></span>{p}
                </div>
              ))}
            </div>

            <div className="ap-badges" role="list" aria-label="Accreditations and affiliations">
              {HERO_BADGES.map(b => (
                <div key={b.alt} className="ap-badge-card" role="listitem">
                  <img className="ap-badge-img" src={b.src} alt={b.alt}
                       width={200} height={80} loading="eager" decoding="async" />
                </div>
              ))}
            </div>
            <p className="ap-badges-cap">AICTE Approved &nbsp;·&nbsp; NAAC Accredited &nbsp;·&nbsp; 25+ Years</p>
          </div>

          {/* FORM */}
          <div className="ap-card" id="apply-form">
            <div className="ap-card-hd">
              <h2>Apply Now</h2>
              {/* <p>Enter your name and mobile number to begin your application</p> */}
              {/* <p>Our admissions counsellor will connect with you within 24 hours to guide you through the next steps.</p> */}
            </div>
            <div className="ap-card-in">
              <div className="ap-field">
                <label className="ap-lbl" htmlFor="name-input">Your Name</label>
                <input id="name-input" className="ap-input" type="text" autoComplete="name"
                  placeholder="Enter your full name" value={name} onFocus={markStart}
                  onChange={e => { setName(e.target.value); setError(''); }}
                  onKeyDown={e => { if (e.key === 'Enter') handleSubmit(); }} />
              </div>
              <div className="ap-field">
                <label className="ap-lbl" htmlFor="ph-input">Mobile Number</label>
                <div className="ap-phone-row">
                  <div className="ap-prefix">🇮🇳 +91</div>
                  <input id="ph-input" className="ap-input" type="tel" inputMode="numeric" maxLength={10}
                    autoComplete="tel-national" placeholder="Mobile Number" value={phone} onFocus={markStart}
                    onChange={e => { setPhone(e.target.value.replace(/\D/g, '').slice(0, 10)); setError(''); }}
                    onKeyDown={e => { if (e.key === 'Enter') handleSubmit(); }} />
                </div>
                
              </div>
              <div className="ap-consent">
                <input id="consent" type="checkbox" checked={consent}
                  onChange={e => { setConsent(e.target.checked); setError(''); }} />
                <label htmlFor="consent">
                  I agree to the <a href="/privacy-policy" target="_blank" rel="noreferrer">Terms &amp; Privacy Policy</a>
                </label>
              </div>
              {error && <div className="ap-err">⚠ {error}</div>}
              <button className="ap-btn" onClick={handleSubmit} disabled={loading}>
                {loading ? <>↻ Opening application…</> : <><FiCheckCircle size={19} strokeWidth={2.4} />Submit &amp; Continue</>}
              </button>
              <div className="ap-secure"><FiLock size={12} strokeWidth={2.4} />100% secure - This application is completely free</div>
              {/* <div className="ap-free"><FiCheck size={13} strokeWidth={3} />This application is completely free — no payment required to fill this form</div> */}
              <div className="ap-callbox">
                <p className="ap-callbox-t">Need help with your application? Speak to our admissions team.</p>
                <a className="ap-callbox-n" href={`tel:${COUNSELLOR_PHONE}`} onClick={() => trackCall('form')}>
                  <FiPhone size={20} strokeWidth={2.4} />{COUNSELLOR_PHONE_DISPLAY}
                </a>
                <p className="ap-callbox-h">Mon–Sat, 9 AM – 6 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main>
        {/* ══ ABOUT GSBM ══ */}
        <section className="ap-sec" aria-labelledby="about-h">
          <div className="ap-about">
            <div>
              <h2 id="about-h">About GSBM — A Leading MBA College in Chennai</h2>
              <div className="ap-about-rule" />
<p>
                Established to bridge the gap between academic knowledge and real-world business
                challenges, <strong>Ganesan School of Business Management (GSBM)</strong> develops
                professionals with the analytical ability, ethical grounding and leadership confidence
                to deliver results. Our founding philosophy is simple: management education must go
                beyond the classroom to develop individuals who can lead organisations, solve real
                problems and operate with integrity.
              </p>
              <p>
                Located in Chennai, GSBM combines academic rigour with an intensely industry connected
                curriculum and a strong focus on employability, leadership and career outcomes.
              </p>
              
              <Link className="ap-about-link" to="/">
                Read More About GSBM <FiArrowRight size={18} strokeWidth={2.6} />
              </Link>
            </div>
            <div className="ap-about-img">
              <img
                src={aboutSrc}
                alt="GSBM campus in Chennai — Ganesan School of Business Management"
                loading="lazy"
                onError={() => setAboutSrc(CAMPUS_PHOTO)}
              />
            </div>
          </div>
        </section>

        {/* ══ STEPS ══ */}
        <section className="ap-sec tinted" aria-labelledby="steps-h">
          <p className="ap-tag">Simple Process</p>
          <h2 className="ap-h2" id="steps-h">How to Apply to GSBM Chennai in 3 Easy Steps</h2>
          <p className="ap-lede"></p>
          <div className="ap-steps">
            <div className="ap-steps-row">
              {HOW_IT_WORKS.map((item) => (
                <div key={item.step} className="ap-ribbon">
                  <div className="ap-ribbon-n">Step {item.step}</div>
                  <div className="ap-ribbon-ic">{item.icon}</div>
                  <h3 className="ap-ribbon-t">{item.title}</h3>
                  <p className="ap-ribbon-d">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ WHY GSBM ══ */}
        <section className="ap-sec" aria-labelledby="why-h">
          <p className="ap-tag">Why GSBM</p>
          <h2 className="ap-h2" id="why-h">Why Students Choose GSBM Chennai</h2>
          <div className="ap-rule" />
          <div className="ap-why">
            {WHY_GSBM.map((point, i) => (
              <div key={i} className="ap-why-i">
                <span className="ap-why-ck"><FiCheck size={15} strokeWidth={3.5} /></span>
                <span>{point}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ══ REVIEWS ══ */}
        <section className="ap-sec tinted" aria-labelledby="reviews-h">
          <p className="ap-tag">Student Reviews</p>
          <h2 className="ap-h2" id="reviews-h">What MBA Students Say About GSBM Chennai</h2>
          <div className="ap-rule" />
          <div className="ap-testi">
            {TESTIMONIALS.map((t, i) => (
              <article key={i} className="ap-testi-c">
                <div className="ap-testi-s" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, k) => (
                    <FiStar key={k} size={17} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="ap-testi-q">"{t.text}"</p>
                <div className="ap-testi-r">
                  <div className="ap-testi-av">{t.name.charAt(0)}</div>
                  <div>
                    <div className="ap-testi-n">{t.name}</div>
                    <div className="ap-testi-l">MBA · {t.loc}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ══ FAQ ══ */}
        <section className="ap-sec" aria-labelledby="faq-h">
          <p className="ap-tag">Common Questions</p>
          <h2 className="ap-h2" id="faq-h">MBA Admission Chennai 2026 — FAQs</h2>
          <div className="ap-rule" />
          <div className="ap-faq">
            {FAQS.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
          </div>
        </section>
      </main>

      {/* ══ CLOSING ══ */}
      <section className="ap-close">
        <h2>Ready to Apply for MBA 2026–28?</h2>
        <p>Limited seats available. Last date for MBA admission 2026 is August 30, 2026.</p>
        <div className="ap-close-row">
          <button className="ap-close-btn" onClick={scrollToForm}>
            <FiCheckCircle size={19} strokeWidth={2.4} />Apply Now
          </button>
          <a className="ap-close-call" href={`tel:${COUNSELLOR_PHONE}`} onClick={() => trackCall('footer')}>
            <FiPhone size={19} strokeWidth={2.4} />{COUNSELLOR_PHONE_DISPLAY}
          </a>
        </div>
      </section>

      {/* <footer className="ap-ft">
        <p><FiLock size={12} strokeWidth={2.4} style={{ verticalAlign: '-2px', marginRight: 6 }} />
          Your information is encrypted and used solely for MBA admissions purposes.</p>
        <p>
          <Link to="/">Visit Website</Link>·
          <button className="ap-ft-linkbtn" onClick={() => handleDownloadBrochure('footer')}>Download Brochure</button>·
          <a href="/privacy-policy">Privacy Policy</a>·
          <a href="mailto:admissions@gsbm.co.in">admissions@gsbm.co.in</a>
        </p>
        <p>© 2026 Ganesan School of Business Management — Top MBA College in Chennai, Tamil Nadu</p>
      </footer> */}

      <div className="ap-mobile-bar">
        <a className="ap-mobile-call" href={`tel:${COUNSELLOR_PHONE}`} onClick={() => trackCall('mobile_bar')}>
          <FiPhone size={17} strokeWidth={2.5} />Call Us
        </a>
        <a className="ap-mobile-wa" href={WHATSAPP_URL} target="_blank" rel="noreferrer"
           onClick={() => trackWhatsApp('mobile_bar')}>
          <WhatsAppIcon size={18} />WhatsApp
        </a>
      </div>
    </div>
  );
};

export default ApplyNow;