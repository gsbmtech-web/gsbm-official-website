import { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiArrowLeft, FiLock, FiPhone, FiCheckCircle, FiUser,
  FiFileText, FiMessageSquare,
  FiChevronDown, FiChevronUp, FiCheck, FiArrowRight
} from 'react-icons/fi';

/* ─────────────────────────────────────────
   STATIC DATA
───────────────────────────────────────── */
const WHY_GSBM = [
  'AICTE Approved MBA Program in Chennai',
  "Affiliated to Vinayaka Mission's Research Foundation (Deemed to be University under Section 3 of the UGC Act, 1956)",
  'Any Graduate Eligible',
  '100% Placement Support with Industry Partners',
  'Affordable MBA Fees with Scholarship Options',
  'UGC Recognised · NAAC Accredited Institution',
  'Top MBA College in Tamil Nadu Since 25+ Years',
];

const STATS = [
  { value: '25+',   label: 'Years of Excellence' },
  { value: '2000+', label: 'Alumni Network' },
  { value: '100%',  label: 'Placement Support' },
  { value: 'AICTE', label: 'Approved & Accredited' },
];

const HOW_IT_WORKS = [
  { icon: <FiUser size={22} strokeWidth={1.5} />,         step: '01', title: 'Quick Questions', desc: 'Tell us a bit about yourself — takes 10 seconds, no typing.' },
  { icon: <FiFileText size={22} strokeWidth={1.5} />,     step: '02', title: 'Share Your Details', desc: 'Just your name and number — we call you, you don\'t have to fill forms.' },
  { icon: <FiMessageSquare size={22} strokeWidth={1.5} />,step: '03', title: 'Counsellor Calls You', desc: 'Our admissions team calls within 24 hours to guide your next steps.' },
];

const TESTIMONIALS = [
  { name: 'Priya R.',  loc: 'Chennai',     rating: 5, text: 'GSBM gave me the career boost I needed. Best MBA college in Chennai with excellent faculty and outstanding placement support!' },
  { name: 'Arjun K.',  loc: 'Tamil Nadu',  rating: 5, text: 'I was looking for an MBA college in Chennai without entrance exam. GSBM was the perfect choice. Highly recommend to all freshers!' },
  { name: 'Divya S.',  loc: 'Coimbatore', rating: 5, text: 'AICTE approved, great campus, affordable fees. The admissions team was very helpful throughout my MBA application process.' },
];

const FAQS = [
  { q: 'Is GSBM an AICTE approved MBA college in Chennai?',         a: 'Yes. GSBM – Ganesan School of Business Management is AICTE approved and affiliated to Vinayaka Mission\'s Research Foundation (Deemed University), which is UGC recognised and NAAC accredited.' },
  { q: 'Can I get MBA admission in Chennai without entrance exam?',  a: 'Yes! GSBM offers MBA admission without any entrance exam. Any graduate with minimum 50% marks is directly eligible to apply through this form.' },
  { q: 'What is the MBA admission process at GSBM Chennai?',        a: 'Simple 3-step process: Submit online application → Attend a personal interview → Receive admission confirmation. Our admissions team guides you throughout.' },
  { q: 'Is GSBM one of the top MBA colleges in Tamil Nadu?',        a: 'Yes. GSBM is recognised as one of the best MBA colleges in Chennai and Tamil Nadu, offering an industry-integrated curriculum with 100% placement support.' },
  { q: 'What is the last date for MBA admission 2026?',             a: 'The last date for MBA admission 2026 at GSBM Chennai is July 30, 2026. Limited seats are available so we recommend applying as early as possible.' },
  { q: 'Does GSBM offer MBA for working professionals?',            a: 'Yes. GSBM offers MBA programs suitable for both fresh graduates and working professionals in Chennai. Contact our admissions team for batch timing details.' },
];

const KEY_DATES = [
  { label: 'Applications Open', date: 'MBA Batch 2026–28' },
  { label: 'Classes Commence',  date: 'August 2026' },
];

const ZOHO_FORM_URL = 'https://forms.zohopublic.in/gsbmtechgm1/form/GSBMChennaiMBAPROGRAM/formperma/TJrU6LXsWTqAWh5ZbxgeWMkmSW2-aK-lzoJ2xn3iEjQ';

const WHO_OPTIONS   = ['Yes, for myself', 'On behalf of someone else'];
const QUAL_OPTIONS  = ['Graduate', 'Final Year Student', 'Working Professional'];

/* ─────────────────────────────────────────
   FAQ ACCORDION
───────────────────────────────────────── */
const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open ? ' open' : ''}`} onClick={() => setOpen(o => !o)}>
      <div className="faq-q">
        <span>{q}</span>
        {open ? <FiChevronUp size={15} /> : <FiChevronDown size={15} />}
      </div>
      {open && <div className="faq-a">{a}</div>}
    </div>
  );
};

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
const ApplyNow = () => {
  const navigate   = useNavigate();
  const handleBack = useCallback(() => navigate(-1), [navigate]);

  const [stepNum, setStepNum] = useState(1); // 1: who, 2: qualification, 3: name+phone
  const [who,     setWho]     = useState('');
  const [qual,    setQual]    = useState('');
  const [name,    setName]    = useState('');
  const [phone,   setPhone]   = useState('');
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');
  const [gclid,   setGclid]   = useState('');

  /* gclid capture */
  useEffect(() => {
    const p  = new URLSearchParams(window.location.search);
    const id = p.get('gclid') || '';
    if (id) { setGclid(id); localStorage.setItem('gclid', id); }
    else    { const s = localStorage.getItem('gclid'); if (s) setGclid(s); }
  }, []);

  /* Schema markup */
  useEffect(() => {
    const org = {
      '@context': 'https://schema.org', '@type': 'EducationalOrganization',
      name: 'Ganesan School of Business Management', alternateName: 'GSBM Chennai',
      url: 'https://www.gsbm.co.in',
      description: 'Top MBA College in Chennai Tamil Nadu. AICTE Approved MBA. Vinayaka Mission University. MBA Without Entrance Exam. Admissions 2026 Open.',
      address: { '@type': 'PostalAddress', addressLocality: 'Chennai', addressRegion: 'Tamil Nadu', addressCountry: 'IN' },
      telephone: '+918667690672',
    };
    const faqSchema = {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    };
    const s1 = document.createElement('script'); s1.type = 'application/ld+json'; s1.text = JSON.stringify(org);
    const s2 = document.createElement('script'); s2.type = 'application/ld+json'; s2.text = JSON.stringify(faqSchema);
    document.head.appendChild(s1);
    document.head.appendChild(s2);
    return () => { document.head.removeChild(s1); document.head.removeChild(s2); };
  }, []);

  const selectWho = (val) => { setWho(val); setStepNum(2); };
  const selectQual = (val) => { setQual(val); setStepNum(3); };
  const goBack = () => { setError(''); setStepNum(s => Math.max(1, s - 1)); };
  const scrollToForm = () => {
    document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /**
   * Fire-and-forget lead save. Never blocks or gates the redirect.
   * Needs a lightweight /api/save-lead serverless function that writes
   * { name, phone, who, qualification, gclid, source, ts } somewhere
   * (Zoho CRM, a sheet, a DB). No OTP/SMS involved at all.
   */
  const saveLeadNonBlocking = (payload) => {
    try {
      fetch('/api/save-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, source: 'apply-now-form', ts: new Date().toISOString() }),
        keepalive: true,
      }).catch(() => { /* best-effort only */ });
    } catch {
      /* never block the flow */
    }
  };

  const handleSubmit = () => {
    setError('');
    const cleanedPhone = phone.replace(/\D/g, '');
    if (!name.trim())            { setError('Please enter your name.'); return; }
    if (cleanedPhone.length !== 10) { setError('Please enter a valid 10-digit mobile number.'); return; }

    setLoading(true);
    saveLeadNonBlocking({ name: name.trim(), phone: cleanedPhone, who, qualification: qual, gclid: gclid || null });

    const params = new URLSearchParams({ PhoneNumber: cleanedPhone, Name: name.trim() });
    if (gclid) params.set('gclid', gclid);
    window.location.href = `${ZOHO_FORM_URL}?${params.toString()}`;
  };

  /* ─────────────────────────────────────
     RENDER
  ───────────────────────────────────── */
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --navy:   #1a2340;
          --gold:   #c9a84c;
          --red:    #8b1a1a;
          --bg:     #f6f5f2;
          --border: #e4e1d9;
          --white:  #ffffff;
          --muted:  #777777;
          --ftr-bg: #eceae4;
          --ftr-bd: #ddd8cf;
        }

        .ap {
          min-height: 100vh;
          background: var(--bg);
          font-family: 'Outfit', system-ui, sans-serif;
          color: var(--navy);
          display: flex;
          flex-direction: column;
        }

        /* NAV */
        .ap-nav {
          background: var(--navy);
          height: 54px;
          display: flex; align-items: center;
          padding: 0 24px; justify-content: space-between;
          position: sticky; top: 0; z-index: 200;
          box-shadow: 0 2px 16px rgba(0,0,0,.3);
        }
        .ap-nav-back {
          display: flex; align-items: center; gap: 6px;
          background: rgba(255,255,255,.08);
          border: 1px solid rgba(255,255,255,.14);
          color: rgba(255,255,255,.85);
          font-size: 13px; font-weight: 500;
          padding: 6px 14px; border-radius: 7px;
          cursor: pointer; font-family: inherit;
          transition: all .15s;
          -webkit-tap-highlight-color: transparent;
        }
        .ap-nav-back:hover { background: rgba(255,255,255,.16); color: #fff; }
        .ap-nav-brand { display: flex; align-items: center; gap: 10px; }
        .ap-nav-logo  { font-size: 15px; font-weight: 800; color: #fff; letter-spacing: .08em; }
        .ap-nav-tag   { font-size: 10px; color: rgba(255,255,255,.38); border-left: 1px solid rgba(255,255,255,.14); padding-left: 10px; }
        .ap-nav-sec   { display: flex; align-items: center; gap: 4px; font-size: 11px; color: rgba(255,255,255,.32); }

        /* HEADER */
        .ap-urgency {
          background: var(--red);
          padding: 14px 24px;
          display: flex; align-items: center; justify-content: center;
          gap: 20px; flex-wrap: wrap;
        }
        .ap-urgency-text {
          font-size: 14px; color: #fff; font-weight: 700;
          letter-spacing: .01em;
        }
        .ap-urgency-btn {
          background: var(--gold); color: var(--navy);
          border: none; border-radius: 8px;
          padding: 11px 28px;
          font-size: 14px; font-weight: 800; font-family: inherit;
          letter-spacing: .02em;
          cursor: pointer; transition: all .15s;
          -webkit-tap-highlight-color: transparent;
        }
        .ap-urgency-btn:hover { background: #dcb95c; transform: translateY(-1px); box-shadow: 0 6px 16px rgba(0,0,0,.2); }
        .ap-urgency-btn:active { transform: scale(.98); }

        /* HERO */
        .ap-hero { background: linear-gradient(150deg, #1a2340 60%, #253060); flex: 1; }
        .ap-hero-inner {
          max-width: 1160px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 420px;
          min-height: calc(100vh - 96px);
          align-items: stretch;
        }

        .ap-left { padding: 52px 48px 52px 32px; display: flex; flex-direction: column; justify-content: center; }
        .ap-badge {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 10px; font-weight: 700; letter-spacing: .12em;
          text-transform: uppercase; color: var(--gold);
          border: 1px solid rgba(201,168,76,.4);
          padding: 5px 14px; border-radius: 30px;
          margin-bottom: 18px; width: fit-content;
        }
        .ap-badge-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--gold); }
        .ap-h1 { font-size: clamp(1.6rem, 2.8vw, 2.4rem); font-weight: 800; color: #fff; line-height: 1.22; margin-bottom: 12px; }
        .ap-h1 em { color: var(--gold); font-style: normal; }
        .ap-points { display: flex; flex-direction: column; gap: 11px; margin-bottom: 32px; }
        .ap-point  { display: flex; align-items: flex-start; gap: 10px; font-size: 13.5px; color: rgba(255,255,255,.82); line-height: 1.5; }
        .ap-check  {
          width: 20px; height: 20px; border-radius: 6px;
          background: rgba(201,168,76,.18);
          border: 1px solid rgba(201,168,76,.38);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-top: 1px; color: var(--gold);
        }
        .ap-stats  { display: flex; gap: 28px; flex-wrap: wrap; }
        .ap-stat-val { font-size: 1.5rem; font-weight: 800; color: var(--gold); line-height: 1; }
        .ap-stat-lbl { font-size: 10px; color: rgba(255,255,255,.4); margin-top: 3px; }

        /* FORM PANEL */
        .ap-right {
          background: var(--white);
          border-left: 1px solid rgba(255,255,255,.07);
          display: flex; flex-direction: column; justify-content: center;
          padding: 36px 32px;
        }

        .f-badge {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 10px; font-weight: 700; color: var(--red);
          background: rgba(139,26,26,.07);
          border: 1px solid rgba(139,26,26,.18);
          padding: 3px 10px; border-radius: 20px;
          letter-spacing: .06em; text-transform: uppercase;
          margin-bottom: 10px; width: fit-content;
        }
        .f-title { font-size: 17px; font-weight: 800; color: var(--navy); margin-bottom: 4px; line-height: 1.3; }
        .f-sub   { font-size: 12.5px; color: var(--muted); margin-bottom: 20px; line-height: 1.5; }

        /* progress */
        .f-prog { display: flex; align-items: center; background: #f8f9ff; border: 1px solid #e8ecff; border-radius: 10px; padding: 12px 16px; margin-bottom: 24px; }
        .f-prog-step  { display: flex; align-items: center; gap: 7px; flex: 1; }
        .f-prog-step:last-child { flex: none; }
        .f-prog-circle { width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; flex-shrink: 0; transition: all .3s; }
        .f-prog-circle.done    { background: var(--navy); color: #fff; }
        .f-prog-circle.active  { background: var(--gold); color: var(--navy); box-shadow: 0 0 0 3px rgba(201,168,76,.22); }
        .f-prog-circle.pending { background: #eee; color: #bbb; }
        .f-prog-lbl     { font-size: 10.5px; font-weight: 600; color: var(--navy); }
        .f-prog-lbl.dim { color: #ccc; }
        .f-prog-line    { flex: 1; height: 2px; background: #e0e0e0; margin: 0 6px; max-width: 36px; }
        .f-prog-line.done { background: var(--navy); }

        .f-otp-icon { width: 52px; height: 52px; border-radius: 16px; background: #f0f4ff; display: flex; align-items: center; justify-content: center; margin: 0 auto 14px; color: var(--navy); }
        .f-otp-h   { font-size: 18px; font-weight: 800; color: var(--navy); margin-bottom: 6px; text-align: center; }
        .f-otp-sub { font-size: 12.5px; color: var(--muted); text-align: center; line-height: 1.65; margin-bottom: 22px; }

        /* quiz options */
        .f-quiz { display: flex; flex-direction: column; gap: 10px; margin-bottom: 8px; }
        .f-quiz-option {
          display: flex; align-items: center; justify-content: space-between;
          width: 100%; text-align: left;
          border: 1.5px solid var(--border); border-radius: 10px;
          padding: 14px 16px; background: #fff;
          font-family: inherit; font-size: 14px; font-weight: 600; color: var(--navy);
          cursor: pointer; transition: all .15s;
          -webkit-tap-highlight-color: transparent;
        }
        .f-quiz-option:hover { border-color: var(--gold); background: #fffbf0; }
        .f-quiz-option svg { color: #ccc; flex-shrink: 0; }
        .f-quiz-option:hover svg { color: var(--gold); }

        .f-back-link {
          background: none; border: none; cursor: pointer;
          font-size: 12px; font-family: inherit; color: var(--muted);
          padding: 0; margin-bottom: 16px;
          display: flex; align-items: center; gap: 5px;
          -webkit-tap-highlight-color: transparent;
        }
        .f-back-link:hover { color: var(--navy); }

        /* inputs */
        .f-lbl { font-size: 11px; font-weight: 700; color: var(--navy); text-transform: uppercase; letter-spacing: .06em; margin-bottom: 7px; display: block; }
        .f-field { margin-bottom: 16px; }
        .f-phone-row { display: flex; gap: 8px; }
        .f-prefix {
          display: flex; align-items: center; gap: 5px; flex-shrink: 0;
          background: #f6f5f2; border: 1.5px solid var(--border);
          border-radius: 10px; padding: 0 12px;
          font-size: 13px; font-weight: 600; color: var(--navy); white-space: nowrap;
        }
        .f-input {
          flex: 1; min-width: 0; width: 100%;
          border: 1.5px solid var(--border); border-radius: 10px;
          padding: 13px; font-size: 16px; font-family: inherit;
          color: var(--navy); background: #fff; outline: none;
          transition: border-color .15s, box-shadow .15s;
        }
        .f-input:focus { border-color: var(--navy); box-shadow: 0 0 0 3px rgba(26,35,64,.07); }
        .f-input::placeholder { color: #ccc; font-size: 13px; }
        .f-hint { font-size: 11px; color: #bbb; margin-top: 5px; }

        .f-btn {
          width: 100%; background: var(--navy); color: #fff;
          border: none; border-radius: 10px; padding: 14px 20px;
          font-size: 14px; font-weight: 700; font-family: inherit;
          cursor: pointer; transition: all .15s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          -webkit-tap-highlight-color: transparent;
        }
        .f-btn:hover:not(:disabled)  { background: #253060; transform: translateY(-1px); box-shadow: 0 6px 18px rgba(26,35,64,.25); }
        .f-btn:active:not(:disabled) { transform: scale(.99); }
        .f-btn:disabled              { opacity: .45; cursor: not-allowed; }

        .f-err {
          font-size: 12px; color: #c0392b;
          background: #fdf3f2; border: 1px solid #f5c6c2;
          padding: 9px 13px; border-radius: 8px;
          margin-bottom: 14px;
          display: flex; align-items: center; gap: 6px;
        }

        .f-sec { display: flex; align-items: center; justify-content: center; gap: 5px; font-size: 10.5px; color: #ccc; margin-top: 14px; }

        .f-divider { height: 1px; background: var(--border); margin: 20px 0; }
        .f-dates   { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
        .f-date    { background: #fafafa; border: 1px solid var(--border); border-radius: 8px; padding: 8px 6px; text-align: center; }
        .f-date-val{ display: block; font-size: 12px; font-weight: 700; color: var(--red); }
        .f-date-lbl{ display: block; font-size: 9px; color: var(--muted); margin-top: 2px; }

        /* SECTIONS */
        .ap-section { padding: 56px 24px; }
        .ap-section.alt { background: var(--white); }
        .ap-section.def { background: var(--bg); }
        .ap-section-tag   { text-align: center; font-size: 10px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--gold); margin-bottom: 8px; }
        .ap-section-title { text-align: center; font-size: clamp(1.1rem, 2.5vw, 1.55rem); font-weight: 800; color: var(--navy); margin-bottom: 40px; }

        .how-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; max-width: 860px; margin: 0 auto; }
        .how-card { text-align: center; padding: 30px 20px 24px; border: 1.5px solid var(--border); border-radius: 14px; background: var(--bg); position: relative; transition: all .2s; }
        .how-card:hover { border-color: var(--gold); box-shadow: 0 6px 24px rgba(0,0,0,.07); }
        .how-num  { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: var(--navy); color: #fff; font-size: 10px; font-weight: 700; padding: 3px 12px; border-radius: 20px; letter-spacing: .06em; white-space: nowrap; }
        .how-icon { width: 54px; height: 54px; border-radius: 15px; background: #f0f4ff; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; color: var(--navy); }
        .how-t    { font-size: 14px; font-weight: 700; color: var(--navy); margin-bottom: 8px; }
        .how-d    { font-size: 12.5px; color: var(--muted); line-height: 1.65; }

        .testi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; max-width: 980px; margin: 0 auto; }
        .testi-card { background: var(--white); border: 1px solid var(--border); border-radius: 14px; padding: 22px; }
        .testi-stars{ color: var(--gold); font-size: 12px; letter-spacing: 2px; margin-bottom: 10px; }
        .testi-text { font-size: 13px; color: #444; line-height: 1.7; margin-bottom: 14px; font-style: italic; }
        .testi-name { font-size: 13px; font-weight: 700; color: var(--navy); }
        .testi-loc  { font-size: 11px; color: var(--muted); }

        .faq-list  { max-width: 760px; margin: 0 auto; display: flex; flex-direction: column; gap: 10px; }
        .faq-item  { border: 1px solid var(--border); border-radius: 10px; cursor: pointer; transition: border-color .2s; }
        .faq-item.open { border-color: var(--navy); }
        .faq-q     { display: flex; justify-content: space-between; align-items: center; gap: 14px; padding: 16px 18px; font-size: 13.5px; font-weight: 600; color: var(--navy); line-height: 1.45; }
        .faq-q svg { flex-shrink: 0; color: var(--muted); }
        .faq-a     { padding: 0 18px 15px; font-size: 13px; color: #555; line-height: 1.72; border-top: 1px solid var(--border); }

        .ap-footer {
          background: var(--ftr-bg); border-top: 1px solid var(--ftr-bd);
          padding: 16px 24px; text-align: center; font-size: 11px; color: #aaa;
          display: flex; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap;
        }
        .ap-footer-dot { opacity: .4; }

        /* RESPONSIVE */
        @media (max-width: 920px) {
          .ap-hero-inner { grid-template-columns: 1fr; min-height: auto; }
          .ap-right { order: 1; border-left: none; border-bottom: 1px solid rgba(255,255,255,.08); padding: 28px 20px; }
          .ap-left  { order: 2; padding: 32px 20px 40px; }
          .ap-stats { justify-content: center; gap: 20px; }
          .ap-h1    { font-size: clamp(1.45rem, 5vw, 2rem); }
          .how-grid   { grid-template-columns: 1fr; gap: 14px; max-width: 440px; }
          .testi-grid { grid-template-columns: 1fr; max-width: 480px; margin: 0 auto; }
          .f-dates    { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .ap-nav     { padding: 0 14px; }
          .ap-nav-tag { display: none; }
          .ap-urgency { padding: 12px 14px; gap: 12px; }
          .ap-urgency-text { font-size: 12.5px; }
          .ap-urgency-btn  { padding: 9px 20px; font-size: 13px; }
          .ap-right   { padding: 22px 16px; }
          .ap-left    { padding: 24px 16px 36px; }
          .f-title    { font-size: 15px; }
          .f-otp-h    { font-size: 16px; }
          .ap-section { padding: 40px 16px; }
          .faq-q      { font-size: 13px; padding: 14px 14px; }
          .faq-a      { padding: 0 14px 14px; }
          .ap-footer  { flex-direction: column; gap: 3px; font-size: 10px; }
          .ap-footer-dot { display: none; }
          .how-grid   { max-width: 100%; }
        }
        @media (max-width: 380px) {
          .ap-h1   { font-size: 1.35rem; }
          .ap-nav-back span { display: none; }
          .f-dates { grid-template-columns: repeat(2, 1fr); gap: 5px; }
          .f-date-val { font-size: 11px; }
        }
        @media (min-width: 1400px) {
          .ap-hero-inner { max-width: 1280px; grid-template-columns: 1fr 460px; }
          .ap-left  { padding: 60px 56px 60px 40px; }
          .ap-right { padding: 44px 40px; }
        }
      `}</style>

      <div className="ap">

        <nav className="ap-nav">
          <button className="ap-nav-back" onClick={handleBack}>
            <FiArrowLeft size={13} strokeWidth={2} /><span>Back</span>
          </button>
          <div className="ap-nav-brand">
            <span className="ap-nav-logo">GSBM</span>
            <span className="ap-nav-tag">MBA College · Chennai</span>
          </div>
          <div className="ap-nav-sec"><FiLock size={11} strokeWidth={2} />Secure</div>
        </nav>

        <div className="ap-urgency">
          <span className="ap-urgency-text">Applications Open — MBA Batch 2026–28</span>
          <button className="ap-urgency-btn" onClick={scrollToForm}>Apply Now</button>
        </div>

        <div className="ap-hero">
          <div className="ap-hero-inner">

            <div className="ap-left">
              <div className="ap-badge">
                <div className="ap-badge-dot" />
                MBA Admissions 2026–2028 · Open Now
              </div>
              <h1 className="ap-h1">
                Top MBA College in Chennai —<br />
                <em>GSBM, Tamil Nadu</em>
              </h1>
              <div className="ap-points">
                {WHY_GSBM.map((point, i) => (
                  <div key={i} className="ap-point">
                    <div className="ap-check"><FiCheck size={11} strokeWidth={3} /></div>
                    {point}
                  </div>
                ))}
              </div>
              <div className="ap-stats">
                {STATS.map(s => (
                  <div key={s.label}>
                    <div className="ap-stat-val">{s.value}</div>
                    <div className="ap-stat-lbl">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — QUIZ + FORM, NO OTP */}
            <div className="ap-right" id="apply-form">

              <div className="f-badge">Admissions Closing 30 July 2026</div>
              <h2 className="f-title">Get a Free Counselling Callback</h2>
              <p className="f-sub">
                {stepNum === 1 && 'Step 1 of 3 — Quick question to get started.'}
                {stepNum === 2 && 'Step 2 of 3 — Almost there.'}
                {stepNum === 3 && 'Step 3 of 3 — Where should we call you?'}
              </p>

              {/* PROGRESS */}
              <div className="f-prog">
                <div className="f-prog-step">
                  <div className={`f-prog-circle ${stepNum > 1 ? 'done' : 'active'}`}>{stepNum > 1 ? '✓' : '1'}</div>
                  <span className="f-prog-lbl">About You</span>
                </div>
                <div className={`f-prog-line ${stepNum > 1 ? 'done' : ''}`} />
                <div className="f-prog-step">
                  <div className={`f-prog-circle ${stepNum > 2 ? 'done' : stepNum === 2 ? 'active' : 'pending'}`}>{stepNum > 2 ? '✓' : '2'}</div>
                  <span className={`f-prog-lbl${stepNum >= 2 ? '' : ' dim'}`}>Qualification</span>
                </div>
                <div className={`f-prog-line ${stepNum > 2 ? 'done' : ''}`} />
                <div className="f-prog-step">
                  <div className={`f-prog-circle ${stepNum === 3 ? 'active' : 'pending'}`}>3</div>
                  <span className={`f-prog-lbl${stepNum === 3 ? '' : ' dim'}`}>Your Details</span>
                </div>
              </div>

              {/* ── STEP 1: WHO ── */}
              {stepNum === 1 && (
                <>
                  <div className="f-otp-icon"><FiUser size={22} strokeWidth={1.5} /></div>
                  <h3 className="f-otp-h">Looking for admission for yourself?</h3>
                  <p className="f-otp-sub">This helps us connect you with the right counsellor.</p>
                  <div className="f-quiz">
                    {WHO_OPTIONS.map(opt => (
                      <button key={opt} className="f-quiz-option" onClick={() => selectWho(opt)}>
                        {opt} <FiArrowRight size={15} />
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* ── STEP 2: QUALIFICATION ── */}
              {stepNum === 2 && (
                <>
                  <button className="f-back-link" onClick={goBack}><FiArrowLeft size={12} />Back</button>
                  <div className="f-otp-icon"><FiFileText size={22} strokeWidth={1.5} /></div>
                  <h3 className="f-otp-h">What's your highest qualification?</h3>
                  <p className="f-otp-sub">So we can tell you about the right batch and eligibility.</p>
                  <div className="f-quiz">
                    {QUAL_OPTIONS.map(opt => (
                      <button key={opt} className="f-quiz-option" onClick={() => selectQual(opt)}>
                        {opt} <FiArrowRight size={15} />
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* ── STEP 3: NAME + PHONE ── */}
              {stepNum === 3 && (
                <>
                  <button className="f-back-link" onClick={goBack}><FiArrowLeft size={12} />Back</button>
                  <div className="f-otp-icon"><FiPhone size={22} strokeWidth={1.5} /></div>
                  <h3 className="f-otp-h">Almost done!</h3>
                  <p className="f-otp-sub">Share your name and number — our counsellor will call you.</p>

                  <div className="f-field">
                    <label className="f-lbl" htmlFor="name-input">Your Name</label>
                    <input
                      id="name-input"
                      className="f-input"
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={e => { setName(e.target.value); setError(''); }}
                    />
                  </div>

                  <div className="f-field">
                    <label className="f-lbl" htmlFor="ph-input">Your Mobile Number</label>
                    <div className="f-phone-row">
                      <div className="f-prefix">🇮🇳 +91</div>
                      <input
                        id="ph-input"
                        className="f-input"
                        type="tel" inputMode="numeric" maxLength={10}
                        placeholder="Enter 10-digit number"
                        value={phone}
                        onChange={e => { setPhone(e.target.value.replace(/\D/g, '').slice(0, 10)); setError(''); }}
                        onKeyDown={e => { if (e.key === 'Enter') handleSubmit(); }}
                      />
                    </div>
                    <p className="f-hint">Used only to schedule your counselling call. No spam, ever.</p>
                  </div>

                  {error && <div className="f-err">⚠ {error}</div>}

                  <button className="f-btn" onClick={handleSubmit} disabled={loading}>
                    {loading ? <>↻ Connecting…</> : <><FiCheckCircle size={14} />Get a Callback from GSBM Admissions</>}
                  </button>

                  <div className="f-sec"><FiLock size={10} />100% secure · Used only for MBA admissions</div>
                </>
              )}

              <div className="f-divider" />
              <p style={{ fontSize: '10px', color: '#bbb', textAlign: 'center', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '.06em', fontWeight: 700 }}>
                Key Admission Dates
              </p>
              <div className="f-dates">
                {KEY_DATES.map(({ label, date }) => (
                  <div key={label} className="f-date">
                    <span className="f-date-val">{date}</span>
                    <span className="f-date-lbl">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <section className="ap-section alt" aria-label="How to apply MBA Chennai GSBM">
          <p className="ap-section-tag">Simple Process</p>
          <h2 className="ap-section-title">How to Apply for MBA at GSBM Chennai — 3 Easy Steps</h2>
          <div className="how-grid">
            {HOW_IT_WORKS.map((item, i) => (
              <div key={i} className="how-card">
                <div className="how-num">Step {item.step}</div>
                <div className="how-icon">{item.icon}</div>
                <h3 className="how-t">{item.title}</h3>
                <p className="how-d">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="ap-section def" aria-label="Student reviews GSBM MBA College Chennai">
          <p className="ap-section-tag">Student Reviews</p>
          <h2 className="ap-section-title">What MBA Students Say About GSBM Chennai</h2>
          <div className="testi-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testi-card">
                <div className="testi-stars">{'★'.repeat(t.rating)}</div>
                <p className="testi-text">"{t.text}"</p>
                <div className="testi-name">{t.name}</div>
                <div className="testi-loc">{t.loc}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="ap-section alt" aria-label="MBA admission FAQ GSBM Chennai 2026">
          <p className="ap-section-tag">Common Questions</p>
          <h2 className="ap-section-title">Frequently Asked Questions — MBA Admissions Chennai 2026</h2>
          <div className="faq-list">
            {FAQS.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
          </div>
        </section>

        <footer className="ap-footer">
          <FiLock size={11} strokeWidth={2} />
          <span>Your information is encrypted and used solely for MBA admissions purposes.</span>
          <span className="ap-footer-dot">·</span>
          <span>© 2026 Ganesan School of Business Management — Top MBA College in Chennai, Tamil Nadu</span>
        </footer>

      </div>
    </>
  );
};

export default ApplyNow;