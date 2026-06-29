import { useCallback, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiArrowLeft, FiLock, FiPhone, FiShield, FiCheckCircle,
  FiRefreshCw, FiFileText, FiMessageSquare,
  FiChevronDown, FiChevronUp, FiCheck
} from 'react-icons/fi';

/* ─────────────────────────────────────────
   STATIC DATA
───────────────────────────────────────── */
const WHY_GSBM = [
  'AICTE Approved MBA Program in Chennai',
  'Affiliated to Vinayaka Mission University (Deemed)',
  'MBA Without Entrance Exam — Any Graduate Eligible',
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
  { icon: <FiPhone size={22} strokeWidth={1.5} />,        step: '01', title: 'Verify Mobile',    desc: 'Enter your number. We send a 6-digit OTP instantly to your phone.' },
  { icon: <FiFileText size={22} strokeWidth={1.5} />,     step: '02', title: 'Fill Application', desc: 'Complete your MBA application form with basic details. Takes 5 minutes.' },
  { icon: <FiMessageSquare size={22} strokeWidth={1.5} />,step: '03', title: 'Team Calls You',   desc: 'Our admissions team calls within 24 hours to guide your next steps.' },
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
  { label: 'Applications Open', date: 'Jan 2026' },
  { label: 'Last Date',         date: 'Jul 30, 2026' },
  { label: 'Interviews',        date: 'May – Jun' },
  { label: 'Commencement',      date: 'Jul 2026' },
];

const STEP = { PHONE: 'phone', OTP: 'otp' };
const ZOHO_FORM_URL = 'https://forms.zohopublic.in/gsbmtechgm1/form/GSBMChennaiMBAPROGRAM/formperma/TJrU6LXsWTqAWh5ZbxgeWMkmSW2-aK-lzoJ2xn3iEjQ';

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

  const [step,        setStep]        = useState(STEP.PHONE);
  const [phone,       setPhone]       = useState('');
  const [otp,         setOtp]         = useState(['', '', '', '', '', '']);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const [otpToken,    setOtpToken]    = useState('');
  const [gclid,       setGclid]       = useState('');
  const timerRef = useRef(null);
  const otpRefs  = useRef([]);

  /* gclid capture */
  useEffect(() => {
    const p  = new URLSearchParams(window.location.search);
    const id = p.get('gclid') || '';
    if (id) { setGclid(id); localStorage.setItem('gclid', id); }
    else    { const s = localStorage.getItem('gclid'); if (s) setGclid(s); }
  }, []);

  useEffect(() => {
    if (!gclid) return;
    const inject = () => { const el = document.querySelector('input[name="gclid"]'); if (el) el.value = gclid; };
    inject();
    const t = setTimeout(inject, 500);
    return () => clearTimeout(t);
  }, [gclid]);

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

  /* OTP helpers */
  const startCountdown = (sec = 30) => {
    setResendTimer(sec);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setResendTimer(t => { if (t <= 1) { clearInterval(timerRef.current); return 0; } return t - 1; }), 1000);
  };

  const handleSendOTP = async () => {
    setError('');
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length !== 10) { setError('Please enter a valid 10-digit mobile number.'); return; }
    setLoading(true);
    try {
      const res  = await fetch('/api/send-otp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ phone: cleaned }) });
      const data = await res.json();
      if (data.success) { setOtpToken(data.token); setStep(STEP.OTP); startCountdown(30); setTimeout(() => otpRefs.current[0]?.focus(), 100); }
      else setError(data.message || 'Failed to send OTP. Please try again.');
    } catch { setError('Network error. Please try again.'); }
    finally { setLoading(false); }
  };

  const handleOtpChange = (i, val) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp]; next[i] = val.slice(-1); setOtp(next); setError('');
    if (val && i < 5) otpRefs.current[i + 1]?.focus();
  };

  const handleOtpKeyDown = (i, e) => { if (e.key === 'Backspace' && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus(); };

  const handleOtpPaste = (e) => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (text.length === 6) { setOtp(text.split('')); setError(''); otpRefs.current[5]?.focus(); }
    e.preventDefault();
  };

  const handleVerifyOTP = async () => {
    setError('');
    const entered = otp.join('');
    if (entered.length < 6) { setError('Please enter the 6-digit OTP.'); return; }
    setLoading(true);
    try {
      const res  = await fetch('/api/verify-otp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ phone: phone.replace(/\D/g, ''), otp: entered, token: otpToken }) });
      const data = await res.json();
      if (data.success) { window.location.href = `${ZOHO_FORM_URL}?PhoneNumber=${encodeURIComponent(phone.replace(/\D/g, ''))}`; }
      else setError(data.message || 'Incorrect OTP. Please try again.');
    } catch { setError('Network error. Please try again.'); }
    finally { setLoading(false); }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    setOtp(['', '', '', '', '', '']); setError(''); setLoading(true);
    try {
      const res  = await fetch('/api/send-otp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ phone: phone.replace(/\D/g, '') }) });
      const data = await res.json();
      if (data.success) { setOtpToken(data.token); startCountdown(30); setTimeout(() => otpRefs.current[0]?.focus(), 100); }
      else setError(data.message || 'Failed to resend OTP.');
    } catch { setError('Network error. Please try again.'); }
    finally { setLoading(false); }
  };

  /* ─────────────────────────────────────
     RENDER
  ───────────────────────────────────── */
  return (
    <>
      <style>{`
        /* ── RESET ── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── TOKENS ── */
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

        /* ── ROOT ── */
        .ap {
          min-height: 100vh;
          background: var(--bg);
          font-family: 'Outfit', system-ui, sans-serif;
          color: var(--navy);
          display: flex;
          flex-direction: column;
        }

        /* ══════════════════════════════
           NAV
        ══════════════════════════════ */
        .ap-nav {
          background: var(--navy);
          height: 54px;
          display: flex;
          align-items: center;
          padding: 0 24px;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 200;
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

        /* ══════════════════════════════
           URGENCY BAR
        ══════════════════════════════ */
        .ap-urgency {
          background: var(--red);
          padding: 9px 16px;
          display: flex; align-items: center; justify-content: center;
          gap: 8px;
          font-size: 12px; color: #fff; font-weight: 600;
          text-align: center; flex-wrap: wrap;
        }
        .ap-urgency-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #ffcc44; flex-shrink: 0;
          animation: blink 1.4s infinite;
        }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: .35; } }

        /* ══════════════════════════════
           ABOVE-THE-FOLD HERO
        ══════════════════════════════ */
        .ap-hero {
          background: linear-gradient(150deg, #1a2340 60%, #253060);
          flex: 1;
        }
        .ap-hero-inner {
          max-width: 1160px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 420px;
          min-height: calc(100vh - 96px); /* viewport minus nav+urgency */
          align-items: stretch;
        }

        /* LEFT PANEL */
        .ap-left {
          padding: 52px 48px 52px 32px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0;
        }
        .ap-badge {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 10px; font-weight: 700; letter-spacing: .12em;
          text-transform: uppercase; color: var(--gold);
          border: 1px solid rgba(201,168,76,.4);
          padding: 5px 14px; border-radius: 30px;
          margin-bottom: 18px; width: fit-content;
        }
        .ap-badge-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--gold); }
        .ap-h1 {
          font-size: clamp(1.6rem, 2.8vw, 2.4rem);
          font-weight: 800; color: #fff; line-height: 1.22;
          margin-bottom: 12px;
        }
        .ap-h1 em { color: var(--gold); font-style: normal; }
        .ap-sub {
          font-size: 13.5px; color: rgba(255,255,255,.5);
          line-height: 1.72; margin-bottom: 28px; max-width: 440px;
        }
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

        /* RIGHT PANEL — FORM */
        .ap-right {
          background: var(--white);
          border-left: 1px solid rgba(255,255,255,.07);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 36px 32px;
        }

        /* form top */
        .f-badge {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 10px; font-weight: 700;
          color: var(--red);
          background: rgba(139,26,26,.07);
          border: 1px solid rgba(139,26,26,.18);
          padding: 3px 10px; border-radius: 20px;
          letter-spacing: .06em; text-transform: uppercase;
          margin-bottom: 10px; width: fit-content;
        }
        .f-title { font-size: 17px; font-weight: 800; color: var(--navy); margin-bottom: 4px; line-height: 1.3; }
        .f-sub   { font-size: 12.5px; color: var(--muted); margin-bottom: 20px; line-height: 1.5; }

        /* progress */
        .f-prog {
          display: flex; align-items: center;
          background: #f8f9ff; border: 1px solid #e8ecff;
          border-radius: 10px; padding: 12px 16px;
          margin-bottom: 24px;
        }
        .f-prog-step  { display: flex; align-items: center; gap: 7px; flex: 1; }
        .f-prog-step:last-child { flex: none; }
        .f-prog-circle {
          width: 26px; height: 26px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 700; flex-shrink: 0;
          transition: all .3s;
        }
        .f-prog-circle.done    { background: var(--navy); color: #fff; }
        .f-prog-circle.active  { background: var(--gold); color: var(--navy); box-shadow: 0 0 0 3px rgba(201,168,76,.22); }
        .f-prog-circle.pending { background: #eee; color: #bbb; }
        .f-prog-lbl     { font-size: 10.5px; font-weight: 600; color: var(--navy); }
        .f-prog-lbl.dim { color: #ccc; }
        .f-prog-line    { flex: 1; height: 2px; background: #e0e0e0; margin: 0 6px; max-width: 36px; }
        .f-prog-line.done { background: var(--navy); }

        /* otp icon */
        .f-otp-icon {
          width: 52px; height: 52px; border-radius: 16px;
          background: #f0f4ff;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 14px; color: var(--navy);
        }
        .f-otp-h   { font-size: 18px; font-weight: 800; color: var(--navy); margin-bottom: 6px; text-align: center; }
        .f-otp-sub { font-size: 12.5px; color: var(--muted); text-align: center; line-height: 1.65; margin-bottom: 22px; }
        .f-otp-sub strong { color: var(--navy); }

        /* inputs */
        .f-lbl { font-size: 11px; font-weight: 700; color: var(--navy); text-transform: uppercase; letter-spacing: .06em; margin-bottom: 7px; display: block; }
        .f-phone-row { display: flex; gap: 8px; margin-bottom: 5px; }
        .f-prefix {
          display: flex; align-items: center; gap: 5px; flex-shrink: 0;
          background: #f6f5f2; border: 1.5px solid var(--border);
          border-radius: 10px; padding: 0 12px;
          font-size: 13px; font-weight: 600; color: var(--navy); white-space: nowrap;
        }
        .f-input {
          flex: 1; min-width: 0;
          border: 1.5px solid var(--border); border-radius: 10px;
          padding: 13px; font-size: 16px; font-family: inherit;
          color: var(--navy); background: #fff; outline: none;
          transition: border-color .15s, box-shadow .15s;
        }
        .f-input:focus { border-color: var(--navy); box-shadow: 0 0 0 3px rgba(26,35,64,.07); }
        .f-input::placeholder { color: #ccc; font-size: 13px; }
        .f-hint { font-size: 11px; color: #bbb; margin-bottom: 18px; }

        /* otp boxes */
        .f-otp-lbl { font-size: 11px; font-weight: 700; color: var(--navy); text-transform: uppercase; letter-spacing: .06em; display: block; text-align: center; margin-bottom: 10px; }
        .f-boxes   { display: flex; gap: 10px; justify-content: center; margin-bottom: 6px; }
        .f-box {
          width: 46px; height: 54px;
          border: 2px solid var(--border); border-radius: 12px;
          font-size: 21px; font-weight: 700; color: var(--navy);
          text-align: center; font-family: inherit; background: #fff; outline: none;
          transition: all .15s;
          -webkit-tap-highlight-color: transparent;
        }
        .f-box:focus  { border-color: var(--navy); box-shadow: 0 0 0 3px rgba(26,35,64,.07); }
        .f-box.filled { border-color: var(--navy); background: #f0f4ff; }
        .f-otp-hint   { font-size: 11px; color: #bbb; text-align: center; margin-bottom: 18px; }

        /* button */
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

        /* error */
        .f-err {
          font-size: 12px; color: #c0392b;
          background: #fdf3f2; border: 1px solid #f5c6c2;
          padding: 9px 13px; border-radius: 8px;
          margin-bottom: 14px;
          display: flex; align-items: center; gap: 6px;
        }

        /* resend / change */
        .f-resend     { margin-top: 16px; text-align: center; font-size: 12px; color: #aaa; }
        .f-resend-btn {
          background: none; border: none; cursor: pointer;
          font-size: 12px; font-family: inherit; font-weight: 700;
          color: var(--navy); padding: 0;
          display: inline-flex; align-items: center; gap: 4px;
          -webkit-tap-highlight-color: transparent;
        }
        .f-resend-btn:disabled { color: #bbb; cursor: not-allowed; }
        .f-change-btn {
          background: none; border: none; cursor: pointer;
          font-size: 12px; font-family: inherit;
          color: var(--navy); padding: 0; text-decoration: underline;
          margin-top: 8px; display: block; text-align: center;
          -webkit-tap-highlight-color: transparent;
        }

        /* security note */
        .f-sec { display: flex; align-items: center; justify-content: center; gap: 5px; font-size: 10.5px; color: #ccc; margin-top: 14px; }

        /* dates strip inside form */
        .f-divider { height: 1px; background: var(--border); margin: 20px 0; }
        .f-dates   { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; }
        .f-date    { background: #fafafa; border: 1px solid var(--border); border-radius: 8px; padding: 8px 6px; text-align: center; }
        .f-date-val{ display: block; font-size: 12px; font-weight: 700; color: var(--red); }
        .f-date-lbl{ display: block; font-size: 9px; color: var(--muted); margin-top: 2px; }

        /* ══════════════════════════════
           BELOW-FOLD SECTIONS
        ══════════════════════════════ */

        /* section shell */
        .ap-section { padding: 56px 24px; }
        .ap-section.alt { background: var(--white); }
        .ap-section.def { background: var(--bg); }
        .ap-section-tag   { text-align: center; font-size: 10px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--gold); margin-bottom: 8px; }
        .ap-section-title { text-align: center; font-size: clamp(1.1rem, 2.5vw, 1.55rem); font-weight: 800; color: var(--navy); margin-bottom: 40px; }

        /* HOW IT WORKS */
        .how-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; max-width: 860px; margin: 0 auto; }
        .how-card {
          text-align: center; padding: 30px 20px 24px;
          border: 1.5px solid var(--border); border-radius: 14px;
          background: var(--bg); position: relative; transition: all .2s;
        }
        .how-card:hover { border-color: var(--gold); box-shadow: 0 6px 24px rgba(0,0,0,.07); }
        .how-num  { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: var(--navy); color: #fff; font-size: 10px; font-weight: 700; padding: 3px 12px; border-radius: 20px; letter-spacing: .06em; white-space: nowrap; }
        .how-icon { width: 54px; height: 54px; border-radius: 15px; background: #f0f4ff; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; color: var(--navy); }
        .how-t    { font-size: 14px; font-weight: 700; color: var(--navy); margin-bottom: 8px; }
        .how-d    { font-size: 12.5px; color: var(--muted); line-height: 1.65; }

        /* TESTIMONIALS */
        .testi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; max-width: 980px; margin: 0 auto; }
        .testi-card { background: var(--white); border: 1px solid var(--border); border-radius: 14px; padding: 22px; }
        .testi-stars{ color: var(--gold); font-size: 12px; letter-spacing: 2px; margin-bottom: 10px; }
        .testi-text { font-size: 13px; color: #444; line-height: 1.7; margin-bottom: 14px; font-style: italic; }
        .testi-name { font-size: 13px; font-weight: 700; color: var(--navy); }
        .testi-loc  { font-size: 11px; color: var(--muted); }

        /* FAQ */
        .faq-list  { max-width: 760px; margin: 0 auto; display: flex; flex-direction: column; gap: 10px; }
        .faq-item  { border: 1px solid var(--border); border-radius: 10px; cursor: pointer; transition: border-color .2s; }
        .faq-item.open { border-color: var(--navy); }
        .faq-q     { display: flex; justify-content: space-between; align-items: center; gap: 14px; padding: 16px 18px; font-size: 13.5px; font-weight: 600; color: var(--navy); line-height: 1.45; }
        .faq-q svg { flex-shrink: 0; color: var(--muted); }
        .faq-a     { padding: 0 18px 15px; font-size: 13px; color: #555; line-height: 1.72; border-top: 1px solid var(--border); }

        /* ══════════════════════════════
           FOOTER  — original color
        ══════════════════════════════ */
        .ap-footer {
          background: var(--ftr-bg);
          border-top: 1px solid var(--ftr-bd);
          padding: 16px 24px;
          text-align: center;
          font-size: 11px;
          color: #aaa;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .ap-footer-dot { opacity: .4; }

        /* ══════════════════════════════
           RESPONSIVE
        ══════════════════════════════ */

        /* Tablet / large mobile: stack form ON TOP */
        @media (max-width: 920px) {
          .ap-hero-inner {
            grid-template-columns: 1fr;
            min-height: auto;
          }
          /* Form first on mobile */
          .ap-right {
            order: 1;
            border-left: none;
            border-bottom: 1px solid rgba(255,255,255,.08);
            padding: 28px 20px;
          }
          .ap-left {
            order: 2;
            padding: 32px 20px 40px;
          }
          .ap-stats { justify-content: center; gap: 20px; }
          .ap-h1    { font-size: clamp(1.45rem, 5vw, 2rem); }
          .ap-sub   { max-width: 100%; }

          /* How grid */
          .how-grid   { grid-template-columns: 1fr; gap: 14px; max-width: 440px; }
          /* Testi grid */
          .testi-grid { grid-template-columns: 1fr; max-width: 480px; margin: 0 auto; }
          /* dates */
          .f-dates    { grid-template-columns: repeat(2, 1fr); }
        }

        /* Phablet */
        @media (max-width: 600px) {
          .ap-nav     { padding: 0 14px; }
          .ap-nav-tag { display: none; }
          .ap-urgency { font-size: 11px; padding: 8px 12px; }
          .ap-right   { padding: 22px 16px; }
          .ap-left    { padding: 24px 16px 36px; }
          .f-title    { font-size: 15px; }
          .f-otp-h    { font-size: 16px; }
          .f-boxes    { gap: 8px; }
          .f-box      { width: 42px; height: 50px; font-size: 19px; }
          .ap-section { padding: 40px 16px; }
          .faq-q      { font-size: 13px; padding: 14px 14px; }
          .faq-a      { padding: 0 14px 14px; }
          .ap-footer  { flex-direction: column; gap: 3px; font-size: 10px; }
          .ap-footer-dot { display: none; }
          .how-grid   { max-width: 100%; }
        }

        /* Small phones */
        @media (max-width: 380px) {
          .ap-h1   { font-size: 1.35rem; }
          .f-box   { width: 37px; height: 45px; font-size: 17px; border-radius: 9px; }
          .f-boxes { gap: 6px; }
          .ap-nav-back span { display: none; }
          .f-dates { grid-template-columns: repeat(2, 1fr); gap: 5px; }
          .f-date-val { font-size: 11px; }
        }

        /* Large desktop */
        @media (min-width: 1400px) {
          .ap-hero-inner { max-width: 1280px; }
          .ap-hero-inner { grid-template-columns: 1fr 460px; }
          .ap-left  { padding: 60px 56px 60px 40px; }
          .ap-right { padding: 44px 40px; }
        }
      `}</style>

      <div className="ap">

        {/* ── NAV ── */}
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

        {/* ── URGENCY ── */}
        <div className="ap-urgency">
          <div className="ap-urgency-dot" />
          MBA Admissions 2026 Closing — Last Date:
          <strong style={{ margin: '0 4px' }}>July 30, 2026</strong>
          · Limited Seats · Apply Now
        </div>

        {/* ══════════════════════════════
            ABOVE THE FOLD
        ══════════════════════════════ */}
        <div className="ap-hero">
          <div className="ap-hero-inner">

            {/* LEFT — WHY GSBM */}
            <div className="ap-left">
              <div className="ap-badge">
                <div className="ap-badge-dot" />
                MBA Admissions 2026–2028 · Open Now
              </div>

              <h1 className="ap-h1">
                Top MBA College in Chennai —<br />
                <em>GSBM, Tamil Nadu</em>
              </h1>

              <p className="ap-sub">
                AICTE Approved · Affiliated to Vinayaka Mission's Research Foundation
                (Deemed University) · MBA Without Entrance Exam · Admissions Open 2026
              </p>

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

            {/* RIGHT — FORM */}
            <div className="ap-right">

              <div className="f-badge">Admissions Closing 30 July 2026</div>
              <h2 className="f-title">MBA Application Form — Chennai 2026</h2>
              <p className="f-sub">
                {step === STEP.PHONE
                  ? 'Step 1 of 3 — Verify your mobile number to begin.'
                  : 'Step 2 of 3 — Enter OTP to continue your application.'}
              </p>

              {/* PROGRESS */}
              <div className="f-prog">
                <div className="f-prog-step">
                  <div className={`f-prog-circle ${step === STEP.OTP ? 'done' : 'active'}`}>
                    {step === STEP.OTP ? '✓' : '1'}
                  </div>
                  <span className="f-prog-lbl">Verify Mobile</span>
                </div>
                <div className={`f-prog-line ${step === STEP.OTP ? 'done' : ''}`} />
                <div className="f-prog-step">
                  <div className={`f-prog-circle ${step === STEP.OTP ? 'active' : 'pending'}`}>2</div>
                  <span className={`f-prog-lbl${step === STEP.OTP ? '' : ' dim'}`}>Enter OTP</span>
                </div>
                <div className="f-prog-line" />
                <div className="f-prog-step">
                  <div className="f-prog-circle pending">3</div>
                  <span className="f-prog-lbl dim">Fill Form</span>
                </div>
              </div>

              {/* ── STEP 1: PHONE ── */}
              {step === STEP.PHONE && (
                <>
                  <div className="f-otp-icon"><FiPhone size={22} strokeWidth={1.5} /></div>
                  <h3 className="f-otp-h">Verify Your Mobile</h3>
                  <p className="f-otp-sub">
                    Enter your number to receive a secure 6-digit OTP and begin your MBA application.
                  </p>

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
                      onKeyDown={e => { if (e.key === 'Enter') handleSendOTP(); }}
                    />
                  </div>
                  <p className="f-hint">We'll send a 6-digit OTP. No spam, ever.</p>

                  {error && <div className="f-err">⚠ {error}</div>}

                  <button className="f-btn" onClick={handleSendOTP} disabled={loading}>
                    {loading ? <>↻ Sending OTP…</> : <><FiShield size={14} />Send OTP — Apply Now</>}
                  </button>

                  <div className="f-sec"><FiLock size={10} />100% secure · Used only for MBA admissions</div>

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
                </>
              )}

              {/* ── STEP 2: OTP ── */}
              {step === STEP.OTP && (
                <>
                  <div className="f-otp-icon" style={{ background: '#fff8e6' }}>
                    <FiShield size={22} strokeWidth={1.5} style={{ color: '#c9a84c' }} />
                  </div>
                  <h3 className="f-otp-h">Enter Your OTP</h3>
                  <p className="f-otp-sub">
                    We sent a 6-digit OTP to <strong>+91 {phone}</strong>. Valid for 10 minutes.
                  </p>

                  <span className="f-otp-lbl">Enter 6-Digit OTP</span>
                  <div className="f-boxes" onPaste={handleOtpPaste}>
                    {otp.map((d, i) => (
                      <input
                        key={i} ref={el => (otpRefs.current[i] = el)}
                        className={`f-box${d ? ' filled' : ''}`}
                        type="text" inputMode="numeric" maxLength={1} value={d}
                        onChange={e => handleOtpChange(i, e.target.value)}
                        onKeyDown={e => handleOtpKeyDown(i, e)}
                        onFocus={e => e.target.select()}
                      />
                    ))}
                  </div>
                  <p className="f-otp-hint">Tip: You can paste the OTP directly</p>

                  {error && <div className="f-err">⚠ {error}</div>}

                  <button
                    className="f-btn"
                    onClick={handleVerifyOTP}
                    disabled={otp.join('').length < 6 || loading}
                  >
                    {loading ? <>↻ Verifying…</> : <><FiCheckCircle size={14} />Verify & Continue to Application</>}
                  </button>

                  <div className="f-resend">
                    {resendTimer > 0
                      ? <span>Resend OTP in {resendTimer}s</span>
                      : <span>Didn't receive it?{' '}
                          <button className="f-resend-btn" onClick={handleResend} disabled={loading}>
                            <FiRefreshCw size={11} />Resend OTP
                          </button>
                        </span>
                    }
                  </div>
                  <button
                    className="f-change-btn"
                    onClick={() => { setStep(STEP.PHONE); setOtp(['', '', '', '', '', '']); setError(''); }}
                  >
                    ← Change phone number
                  </button>
                  <div className="f-sec"><FiLock size={10} />100% secure · Used only for MBA admissions</div>
                </>
              )}

            </div>
          </div>
        </div>

        {/* ══════════════════════════════
            BELOW THE FOLD
        ══════════════════════════════ */}

        {/* HOW IT WORKS */}
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

        {/* TESTIMONIALS */}
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

        {/* FAQ */}
        <section className="ap-section alt" aria-label="MBA admission FAQ GSBM Chennai 2026">
          <p className="ap-section-tag">Common Questions</p>
          <h2 className="ap-section-title">Frequently Asked Questions — MBA Admissions Chennai 2026</h2>
          <div className="faq-list">
            {FAQS.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
          </div>
        </section>

        {/* FOOTER — original #eceae4 color */}
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