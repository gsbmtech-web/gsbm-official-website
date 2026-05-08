import { useCallback, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiLock, FiPhone, FiShield, FiCheckCircle, FiRefreshCw } from 'react-icons/fi';

const KEY_DATES = [
  { label: 'Applications Open', date: 'Jan 2026' },
  { label: 'Last Date',         date: 'Jun 30'   },
  { label: 'Interviews',        date: 'May – Jun' },
  { label: 'Commencement',      date: 'Jul 2026'  },
];

const STEP = { PHONE: 'phone', OTP: 'otp', FORM: 'form' };

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
  const timerRef = useRef(null);
  const otpRefs  = useRef([]);

  const startCountdown = (sec = 30) => {
    setResendTimer(sec);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setResendTimer(t => {
        if (t <= 1) { clearInterval(timerRef.current); return 0; }
        return t - 1;
      });
    }, 1000);
  };

  const handleSendOTP = async () => {
    setError('');
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length !== 10) { setError('Please enter a valid 10-digit mobile number.'); return; }
    setLoading(true);
    try {
      const res  = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: cleaned }),
      });
      const data = await res.json();
      if (data.success) {
        setOtpToken(data.token);
        setStep(STEP.OTP);
        startCountdown(30);
        setTimeout(() => otpRefs.current[0]?.focus(), 100);
      } else {
        setError(data.message || 'Failed to send OTP. Please try again.');
      }
    } catch { setError('Network error. Please try again.'); }
    finally  { setLoading(false); }
  };

  const handleOtpChange = (i, val) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp]; next[i] = val.slice(-1); setOtp(next); setError('');
    if (val && i < 5) otpRefs.current[i + 1]?.focus();
  };

  const handleOtpKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus();
  };

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
      const res  = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phone.replace(/\D/g, ''), otp: entered, token: otpToken }),
      });
      const data = await res.json();
      if (data.success) { setStep(STEP.FORM); }
      else { setError(data.message || 'Incorrect OTP. Please try again.'); }
    } catch { setError('Network error. Please try again.'); }
    finally  { setLoading(false); }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    setOtp(['', '', '', '', '', '']); setError(''); setLoading(true);
    try {
      const res  = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phone.replace(/\D/g, '') }),
      });
      const data = await res.json();
      if (data.success) { setOtpToken(data.token); startCountdown(30); setTimeout(() => otpRefs.current[0]?.focus(), 100); }
      else { setError(data.message || 'Failed to resend OTP.'); }
    } catch { setError('Network error. Please try again.'); }
    finally  { setLoading(false); }
  };

  /* ─────────────── RENDER ─────────────── */
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .ap-root {
          min-height: 100vh;
          background: #f6f5f2;
          font-family: 'Outfit', system-ui, sans-serif;
          color: #1a2340;
          display: flex;
          flex-direction: column;
        }

        /* ── NAV ── */
        .ap-nav {
          background: #1a2340;
          height: 52px;
          display: flex;
          align-items: center;
          padding: 0 20px;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .ap-back {
          display: flex; align-items: center; gap: 6px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.22);
          color: rgba(255,255,255,0.85);
          font-size: 13px; font-weight: 500;
          padding: 6px 12px; border-radius: 6px;
          cursor: pointer; font-family: inherit;
          transition: all 0.15s; white-space: nowrap;
          -webkit-tap-highlight-color: transparent;
        }
        .ap-back:hover, .ap-back:active { background: rgba(255,255,255,0.12); color: #fff; }
        .ap-nav-logo { font-size: 15px; font-weight: 700; color: #fff; letter-spacing: 0.05em; }
        .ap-nav-secure { display: flex; align-items: center; gap: 4px; font-size: 11px; color: rgba(255,255,255,0.35); }

        /* ── HERO ── */
        .ap-hero { background: #1a2340; padding: 24px 20px 28px; }
        .ap-badge {
          display: inline-block; font-size: 10px; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase; color: #c9a84c;
          border: 1px solid rgba(201,168,76,0.35); padding: 3px 10px;
          border-radius: 4px; margin-bottom: 10px;
        }
        .ap-h1 { font-size: clamp(1.4rem, 5vw, 2.2rem); font-weight: 700; color: #fff; line-height: 1.2; margin-bottom: 6px; }
        .ap-h1-sub { font-size: 13px; color: rgba(255,255,255,0.45); line-height: 1.6; }

        /* ── BODY ── */
        .ap-body {
          flex: 1;
          max-width: 1080px;
          width: 100%;
          margin: 0 auto;
          padding: 20px 16px 48px;
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 18px;
          align-items: start;
        }

        /* ── SIDEBAR ── */
        .ap-sidebar { position: sticky; top: 68px; display: flex; flex-direction: column; gap: 10px; }
        .ap-card { background: #fff; border: 1px solid #e4e1d9; border-radius: 10px; padding: 14px 16px; }
        .ap-card-label { font-size: 9px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #aaa; margin-bottom: 4px; display: block; }
        .ap-card-value { font-size: 13px; font-weight: 600; color: #1a2340; margin-bottom: 2px; line-height: 1.4; }
        .ap-card-meta  { font-size: 11px; color: #999; line-height: 1.45; }
        .ap-divider    { height: 1px; background: #e4e1d9; }
        .ap-help-card  { background: #fff; border: 1px solid #e4e1d9; border-radius: 10px; padding: 14px 16px; }
        .ap-sec-label  { font-size: 9px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #aaa; margin-bottom: 10px; display: block; }
        .ap-contact-link { display: flex; align-items: center; gap: 7px; font-size: 13px; color: #1a2340; text-decoration: none; padding: 4px 0; }
        .ap-contact-link:hover { color: #8b1a1a; }
        .ap-dates-card { background: #fff; border: 1px solid #e4e1d9; border-radius: 10px; padding: 14px 16px; }
        .ap-trow { display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px solid #ede9e0; font-size: 12px; }
        .ap-trow:last-child { border-bottom: none; }
        .ap-trow-l { color: #666; }
        .ap-trow-d { font-weight: 600; color: #8b1a1a; }

        /* ── MAIN PANEL ── */
        .ap-panel { background: #fff; border: 1px solid #e4e1d9; border-radius: 12px; overflow: hidden; }
        .ap-panel-top { padding: 16px 20px 12px; border-bottom: 1px solid #ede9e0; }
        .ap-panel-title { font-size: 16px; font-weight: 700; color: #1a2340; margin-bottom: 2px; }
        .ap-panel-hint  { font-size: 12px; color: #999; }

        /* ── OTP GATE ── */
        .otp-gate {
          padding: 32px 24px 36px;
          display: flex; flex-direction: column; align-items: center; text-align: center;
        }
        .otp-steps { display: flex; align-items: center; gap: 6px; margin-bottom: 24px; flex-wrap: nowrap; }
        .otp-step  { display: flex; align-items: center; gap: 5px; font-size: 10px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; white-space: nowrap; }
        .otp-dot   { width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; flex-shrink: 0; }
        .otp-dot.done   { background: #1a2340; color: #fff; }
        .otp-dot.active { background: #c9a84c; color: #fff; }
        .otp-dot.todo   { background: #e4e1d9; color: #aaa; }
        .otp-lbl.active { color: #1a2340; }
        .otp-lbl.done   { color: #aaa; }
        .otp-lbl.todo   { color: #ccc; }
        .otp-line { width: 20px; height: 1px; background: #e4e1d9; flex-shrink: 0; }

        .otp-icon {
          width: 54px; height: 54px; border-radius: 16px; background: #f0f4ff;
          display: flex; align-items: center; justify-content: center; margin-bottom: 16px; color: #1a2340;
        }
        .otp-title { font-size: 19px; font-weight: 700; color: #1a2340; margin-bottom: 6px; }
        .otp-sub   { font-size: 13px; color: #888; margin-bottom: 24px; max-width: 320px; line-height: 1.6; }
        .otp-sub strong { color: #1a2340; }

        /* Phone row */
        .otp-phone-row { display: flex; gap: 8px; width: 100%; max-width: 340px; }
        .otp-prefix {
          display: flex; align-items: center; gap: 5px; flex-shrink: 0;
          background: #f6f5f2; border: 1px solid #ddd8cf; border-radius: 8px;
          padding: 0 10px; font-size: 14px; font-weight: 600; color: #1a2340;
          white-space: nowrap;
        }
        .otp-input {
          flex: 1; min-width: 0;
          border: 1px solid #ddd8cf; border-radius: 8px;
          padding: 12px 12px; font-size: 16px; font-family: inherit;
          color: #1a2340; background: #fff; outline: none;
          transition: border-color 0.15s;
        }
        .otp-input:focus { border-color: #1a2340; }
        .otp-input::placeholder { color: #bbb; font-size: 14px; }

        /* OTP Boxes */
        .otp-boxes { display: flex; gap: 8px; margin-bottom: 10px; }
        .otp-box {
          width: 44px; height: 52px;
          border: 1.5px solid #ddd8cf; border-radius: 10px;
          font-size: 20px; font-weight: 700; color: #1a2340;
          text-align: center; font-family: inherit;
          background: #fff; outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
          -webkit-tap-highlight-color: transparent;
        }
        .otp-box:focus { border-color: #1a2340; box-shadow: 0 0 0 3px rgba(26,35,64,0.08); }
        .otp-box.filled { border-color: #1a2340; background: #f0f4ff; }

        /* CTA */
        .otp-btn {
          width: 100%; max-width: 340px;
          background: #1a2340; color: #fff;
          border: none; border-radius: 8px;
          padding: 14px 20px; font-size: 15px; font-weight: 600;
          font-family: inherit; cursor: pointer;
          transition: background 0.15s, transform 0.1s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          margin-top: 6px;
          -webkit-tap-highlight-color: transparent;
        }
        .otp-btn:hover:not(:disabled)  { background: #253060; }
        .otp-btn:active:not(:disabled) { transform: scale(0.98); }
        .otp-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        /* Error */
        .otp-error {
          font-size: 12px; color: #c0392b;
          background: #fdf3f2; border: 1px solid #f5c6c2;
          padding: 8px 12px; border-radius: 6px;
          width: 100%; max-width: 340px; text-align: left; margin-top: 8px;
        }

        /* Resend */
        .otp-resend { margin-top: 16px; font-size: 12px; color: #aaa; display: flex; align-items: center; gap: 6px; flex-wrap: wrap; justify-content: center; }
        .otp-resend-btn {
          background: none; border: none; cursor: pointer;
          font-size: 12px; font-family: inherit; font-weight: 600;
          color: #1a2340; padding: 0; display: flex; align-items: center; gap: 4px;
          -webkit-tap-highlight-color: transparent;
        }
        .otp-resend-btn:disabled { color: #bbb; cursor: not-allowed; }
        .otp-change { margin-top: 8px; font-size: 12px; color: #aaa; }
        .otp-change-btn {
          background: none; border: none; cursor: pointer;
          font-size: 12px; font-family: inherit; color: #1a2340; padding: 0; text-decoration: underline;
          -webkit-tap-highlight-color: transparent;
        }

        /* Verified */
        .otp-verified {
          display: flex; align-items: center; gap: 8px;
          background: #edfdf5; border: 1px solid #a3e6c4;
          border-radius: 8px; padding: 10px 16px;
          font-size: 13px; font-weight: 600; color: #1a7a4a; margin-bottom: 16px;
        }

        /* Iframe */
        .ap-iframe { display: block; border: none; width: 100%; }

        /* ── FOOTER ── */
        .ap-footer {
          background: #eceae4; border-top: 1px solid #ddd8cf;
          padding: 12px 20px;
          display: flex; align-items: center; justify-content: center;
          gap: 8px; flex-wrap: wrap; font-size: 11px; color: #aaa; text-align: center;
        }
        .ap-footer-dot { opacity: 0.35; }

        /* ════════════════════════════
           TABLET  ≤ 800px
        ════════════════════════════ */
        @media (max-width: 800px) {
          .ap-body {
            grid-template-columns: 1fr;
            padding: 16px 14px 48px;
            gap: 14px;
          }
          /* Sidebar becomes a horizontal strip of 3 cards */
          .ap-sidebar {
            position: static;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
          }
          .ap-divider, .ap-help-card, .ap-dates-card { display: none; }
        }

        /* ════════════════════════════
           MOBILE  ≤ 540px
        ════════════════════════════ */
        @media (max-width: 540px) {
          /* Nav */
          .ap-nav { height: 48px; padding: 0 14px; }
          .ap-nav-logo { font-size: 14px; }
          .ap-back { padding: 5px 10px; font-size: 12px; }

          /* Hero */
          .ap-hero { padding: 18px 14px 22px; }
          .ap-h1-sub { display: none; }

          /* Body */
          .ap-body { padding: 12px 12px 40px; gap: 12px; }

          /* Hide sidebar entirely on small mobile */
          .ap-sidebar { display: none; }

          /* Panel */
          .ap-panel { border-radius: 10px; }
          .ap-panel-top { padding: 14px 16px 10px; }
          .ap-panel-title { font-size: 15px; }

          /* OTP Gate */
          .otp-gate { padding: 24px 16px 28px; }
          .otp-title { font-size: 17px; }
          .otp-sub   { font-size: 12px; margin-bottom: 20px; }

          /* OTP boxes — 6 across small screen */
          .otp-boxes { gap: 6px; }
          .otp-box   { width: 42px; height: 50px; font-size: 19px; border-radius: 8px; }

          /* Button full width */
          .otp-btn { max-width: 100%; }

          /* Phone row */
          .otp-phone-row { max-width: 100%; }
          .otp-error     { max-width: 100%; }

          /* Footer */
          .ap-footer { flex-direction: column; gap: 3px; font-size: 10px; }
          .ap-footer-dot { display: none; }
        }

        /* ════════════════════════════
           VERY SMALL  ≤ 360px
        ════════════════════════════ */
        @media (max-width: 360px) {
          .ap-h1 { font-size: 1.3rem; }
          .ap-back span { display: none; }
          .ap-back { padding: 5px 8px; }
          .otp-box { width: 36px; height: 44px; font-size: 17px; border-radius: 7px; }
          .otp-boxes { gap: 5px; }
          .otp-prefix { padding: 0 8px; font-size: 13px; }
          .otp-lbl { display: none; }
        }
      `}</style>

      <div className="ap-root">

        {/* ── Nav ── */}
        <nav className="ap-nav">
          <button className="ap-back" onClick={handleBack}>
            <FiArrowLeft size={14} strokeWidth={2} /><span>Back</span>
          </button>
          <span className="ap-nav-logo">GSBM</span>
          <div className="ap-nav-secure"><FiLock size={11} strokeWidth={2} />Secure</div>
        </nav>

        {/* ── Hero ── */}
        <div className="ap-hero">
          <div className="ap-badge">MBA 2026–2028 · Admissions Open</div>
          <h1 className="ap-h1">Apply to GSBM</h1>
          <p className="ap-h1-sub">Fill in your details. Our team will reach out within 24 hours.</p>
        </div>

        {/* ── Body ── */}
        <div className="ap-body">

          {/* Sidebar */}
          <aside className="ap-sidebar">
            <div className="ap-card">
              <span className="ap-card-label">Program</span>
              <p className="ap-card-value">MBA Full-Time</p>
              <p className="ap-card-meta">2 Years · July 2026</p>
            </div>
            <div className="ap-card">
              <span className="ap-card-label">University</span>
              <p className="ap-card-value">Vinayaka Mission's Research Foundation</p>
              <p className="ap-card-meta">UGC Recognised · NAAC Accredited</p>
            </div>
            <div className="ap-card">
              <span className="ap-card-label">Eligibility</span>
              <p className="ap-card-value">Any Bachelor's Degree</p>
              <p className="ap-card-meta">Min 50% · Final year may apply</p>
            </div>
            <div className="ap-divider" />
            <div className="ap-help-card">
              <span className="ap-sec-label">Need Help?</span>
              <a href="tel:+918667690672" className="ap-contact-link">
                <FiPhone size={13} strokeWidth={2} />+91 8667690672
              </a>
            </div>
            <div className="ap-dates-card">
              <span className="ap-sec-label">Key Dates</span>
              {KEY_DATES.map(({ label, date }) => (
                <div className="ap-trow" key={label}>
                  <span className="ap-trow-l">{label}</span>
                  <span className="ap-trow-d">{date}</span>
                </div>
              ))}
            </div>
          </aside>

          {/* Main Panel */}
          <section className="ap-panel">
            <div className="ap-panel-top">
              <h2 className="ap-panel-title">Application Form</h2>
              <p className="ap-panel-hint">
                {step === STEP.PHONE && 'Verify your mobile number to begin.'}
                {step === STEP.OTP   && 'Enter the OTP sent to your phone.'}
                {step === STEP.FORM  && 'Complete your application below.'}
              </p>
            </div>

            {/* ── STEP 1: Phone ── */}
            {step === STEP.PHONE && (
              <div className="otp-gate">
                <div className="otp-steps">
                  <div className="otp-step"><div className="otp-dot active">1</div><span className="otp-lbl active">Verify</span></div>
                  <div className="otp-line" />
                  <div className="otp-step"><div className="otp-dot todo">2</div><span className="otp-lbl todo">OTP</span></div>
                  <div className="otp-line" />
                  <div className="otp-step"><div className="otp-dot todo">3</div><span className="otp-lbl todo">Apply</span></div>
                </div>
                <div className="otp-icon"><FiPhone size={22} strokeWidth={1.5} /></div>
                <h3 className="otp-title">Verify Your Mobile</h3>
                <p className="otp-sub">We'll send a 6-digit OTP to confirm your number before opening the application form.</p>
                <div className="otp-phone-row">
                  <div className="otp-prefix">🇮🇳 +91</div>
                  <input
                    className="otp-input" type="tel" inputMode="numeric" maxLength={10}
                    placeholder="10-digit number" value={phone}
                    onChange={e => { setPhone(e.target.value.replace(/\D/g,'').slice(0,10)); setError(''); }}
                    onKeyDown={e => { if (e.key === 'Enter') handleSendOTP(); }}
                  />
                </div>
                {error && <div className="otp-error">{error}</div>}
                <button className="otp-btn" onClick={handleSendOTP} disabled={loading} style={{ marginTop: 14 }}>
                  {loading ? <>↻ Sending…</> : <><FiShield size={15} /> Send OTP</>}
                </button>
              </div>
            )}

            {/* ── STEP 2: OTP ── */}
            {step === STEP.OTP && (
              <div className="otp-gate">
                <div className="otp-steps">
                  <div className="otp-step"><div className="otp-dot done">✓</div><span className="otp-lbl done">Verify</span></div>
                  <div className="otp-line" />
                  <div className="otp-step"><div className="otp-dot active">2</div><span className="otp-lbl active">OTP</span></div>
                  <div className="otp-line" />
                  <div className="otp-step"><div className="otp-dot todo">3</div><span className="otp-lbl todo">Apply</span></div>
                </div>
                <div className="otp-icon" style={{ background: '#fff8e6' }}>
                  <FiShield size={22} strokeWidth={1.5} style={{ color: '#c9a84c' }} />
                </div>
                <h3 className="otp-title">Enter OTP</h3>
                <p className="otp-sub">A 6-digit OTP was sent to <strong>+91 {phone}</strong>. Valid for 10 minutes.</p>
                <div className="otp-boxes" onPaste={handleOtpPaste}>
                  {otp.map((d, i) => (
                    <input
                      key={i} ref={el => (otpRefs.current[i] = el)}
                      className={`otp-box${d ? ' filled' : ''}`}
                      type="text" inputMode="numeric" maxLength={1} value={d}
                      onChange={e => handleOtpChange(i, e.target.value)}
                      onKeyDown={e => handleOtpKeyDown(i, e)}
                      onFocus={e => e.target.select()}
                    />
                  ))}
                </div>
                {error && <div className="otp-error">{error}</div>}
                <button className="otp-btn" onClick={handleVerifyOTP} disabled={otp.join('').length < 6 || loading}>
                  {loading ? <>↻ Verifying…</> : <><FiCheckCircle size={15} /> Verify & Continue</>}
                </button>
                <div className="otp-resend">
                  <span>{resendTimer > 0 ? `Resend in ${resendTimer}s` : "Didn't receive it?"}</span>
                  <button className="otp-resend-btn" onClick={handleResend} disabled={resendTimer > 0 || loading}>
                    <FiRefreshCw size={11} /> Resend OTP
                  </button>
                </div>
                <div className="otp-change">
                  <button className="otp-change-btn" onClick={() => { setStep(STEP.PHONE); setOtp(['','','','','','']); setError(''); }}>
                    Change number
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 3: Form ── */}
            {step === STEP.FORM && (
              <>
                <div className="otp-gate" style={{ paddingBottom: 14 }}>
                  <div className="otp-steps">
                    <div className="otp-step"><div className="otp-dot done">✓</div><span className="otp-lbl done">Verify</span></div>
                    <div className="otp-line" />
                    <div className="otp-step"><div className="otp-dot done">✓</div><span className="otp-lbl done">OTP</span></div>
                    <div className="otp-line" />
                    <div className="otp-step"><div className="otp-dot active">3</div><span className="otp-lbl active">Apply</span></div>
                  </div>
                  <div className="otp-verified">
                    <FiCheckCircle size={15} />+91 {phone} verified successfully
                  </div>
                </div>
                <iframe
                  src={`https://forms.zohopublic.in/gsbmtechgm1/form/GSBMChennaiMBAPROGRAM/formperma/TJrU6LXsWTqAWh5ZbxgeWMkmSW2-aK-lzoJ2xn3iEjQ?PhoneNumber=${encodeURIComponent(phone)}`}
                  title="GSBM MBA Application Form"
                  width="100%" height="900" className="ap-iframe"
                  allow="geolocation" referrerPolicy="no-referrer-when-downgrade"
                />
              </>
            )}
          </section>
        </div>

        {/* ── Footer ── */}
        <footer className="ap-footer">
          <FiLock size={11} strokeWidth={2} />
          <span>Your information is encrypted and used solely for admissions purposes.</span>
          <span className="ap-footer-dot">·</span>
          <span>© 2026 Ganesan School of Business Management</span>
        </footer>
      </div>
    </>
  );
};

export default ApplyNow;