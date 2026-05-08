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
    if (cleaned.length !== 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: cleaned }),
      });
      const data = await res.json();
      if (data.success) {
        setStep(STEP.OTP);
        startCountdown(30);
        setTimeout(() => otpRefs.current[0]?.focus(), 100);
      } else {
        setError(data.message || 'Failed to send OTP. Please try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (i, val) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[i] = val.slice(-1);
    setOtp(next);
    setError('');
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
      const res = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phone.replace(/\D/g, ''), otp: entered }),
      });
      const data = await res.json();
      if (data.success) {
        setStep(STEP.FORM);
      } else {
        setError(data.message || 'Incorrect OTP. Please try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    setOtp(['', '', '', '', '', '']);
    setError('');
    setLoading(true);
    const cleaned = phone.replace(/\D/g, '');
    try {
      const res = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: cleaned }),
      });
      const data = await res.json();
      if (data.success) {
        startCountdown(30);
        setTimeout(() => otpRefs.current[0]?.focus(), 100);
      } else {
        setError(data.message || 'Failed to resend OTP.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .ap-root { min-height:100vh; background:#f6f5f2; font-family:'Outfit',system-ui,sans-serif; color:#1a2340; display:flex; flex-direction:column; }
        .ap-nav { background:#1a2340; height:52px; display:flex; align-items:center; padding:0 24px; justify-content:space-between; position:sticky; top:0; z-index:50; flex-shrink:0; }
        .ap-back { display:flex; align-items:center; gap:6px; background:transparent; border:1px solid rgba(255,255,255,0.22); color:rgba(255,255,255,0.85); font-size:13px; font-weight:500; padding:6px 14px; border-radius:6px; cursor:pointer; font-family:inherit; transition:all 0.15s; white-space:nowrap; }
        .ap-back:hover { background:rgba(255,255,255,0.1); color:#fff; }
        .ap-nav-brand { display:flex; align-items:center; gap:10px; }
        .ap-nav-logo { font-size:15px; font-weight:700; color:#fff; letter-spacing:0.05em; }
        .ap-nav-sep { color:rgba(255,255,255,0.18); font-weight:200; }
        .ap-nav-tag { font-size:13px; color:rgba(255,255,255,0.42); }
        .ap-nav-secure { display:flex; align-items:center; gap:5px; font-size:11px; color:rgba(255,255,255,0.32); }
        .ap-hero { background:#1a2340; padding:32px 24px 36px; flex-shrink:0; }
        .ap-hero-inner { max-width:1060px; margin:0 auto; }
        .ap-badge { display:inline-block; font-size:10px; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; color:#c9a84c; border:1px solid rgba(201,168,76,0.32); padding:3px 10px; border-radius:4px; margin-bottom:12px; }
        .ap-h1 { font-size:clamp(1.6rem,3.5vw,2.3rem); font-weight:700; color:#fff; margin:0 0 8px; line-height:1.2; }
        .ap-h1-sub { font-size:14px; color:rgba(255,255,255,0.48); margin:0; line-height:1.6; }
        .ap-body { max-width:1060px; margin:0 auto; padding:28px 24px 56px; display:grid; grid-template-columns:240px 1fr; gap:20px; align-items:start; flex:1; width:100%; box-sizing:border-box; }
        .ap-sidebar { position:sticky; top:68px; display:flex; flex-direction:column; gap:10px; }
        .ap-card { background:#fff; border:1px solid #e4e1d9; border-radius:10px; padding:14px 16px; }
        .ap-card-label { font-size:9px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:#aaa; margin:0 0 4px; display:block; }
        .ap-card-value { font-size:13px; font-weight:600; color:#1a2340; margin:0 0 2px; line-height:1.4; }
        .ap-card-meta { font-size:11px; color:#999; margin:0; line-height:1.45; }
        .ap-divider { height:1px; background:#e4e1d9; }
        .ap-help-card { background:#fff; border:1px solid #e4e1d9; border-radius:10px; padding:14px 16px; }
        .ap-section-label { font-size:9px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:#aaa; margin:0 0 10px; display:block; }
        .ap-contact-link { display:flex; align-items:center; gap:7px; font-size:13px; color:#1a2340; text-decoration:none; padding:4px 0; transition:color 0.15s; }
        .ap-contact-link:hover { color:#8b1a1a; }
        .ap-dates-card { background:#fff; border:1px solid #e4e1d9; border-radius:10px; padding:14px 16px; }
        .ap-trow { display:flex; justify-content:space-between; padding:5px 0; border-bottom:1px solid #ede9e0; font-size:12px; }
        .ap-trow:last-child { border-bottom:none; }
        .ap-trow-label { color:#666; }
        .ap-trow-date { font-weight:600; color:#8b1a1a; }
        .ap-panel { background:#fff; border:1px solid #e4e1d9; border-radius:12px; overflow:hidden; }
        .ap-panel-top { padding:18px 22px 14px; border-bottom:1px solid #ede9e0; }
        .ap-panel-title { font-size:17px; font-weight:700; color:#1a2340; margin:0 0 3px; }
        .ap-panel-hint { font-size:12px; color:#999; margin:0; }
        .ap-iframe { display:block; border:none; width:100%; }
        .otp-gate { padding:36px 32px 40px; display:flex; flex-direction:column; align-items:center; text-align:center; }
        .otp-gate-icon { width:56px; height:56px; border-radius:16px; background:#f0f4ff; display:flex; align-items:center; justify-content:center; margin-bottom:18px; color:#1a2340; }
        .otp-gate-title { font-size:20px; font-weight:700; color:#1a2340; margin:0 0 6px; }
        .otp-gate-sub { font-size:13px; color:#888; margin:0 0 28px; max-width:340px; line-height:1.6; }
        .otp-gate-sub strong { color:#1a2340; }
        .otp-phone-row { display:flex; gap:10px; width:100%; max-width:360px; }
        .otp-prefix { display:flex; align-items:center; gap:6px; background:#f6f5f2; border:1px solid #ddd8cf; border-radius:8px; padding:0 12px; font-size:14px; font-weight:600; color:#1a2340; white-space:nowrap; flex-shrink:0; }
        .otp-input { flex:1; border:1px solid #ddd8cf; border-radius:8px; padding:11px 14px; font-size:15px; font-family:inherit; color:#1a2340; background:#fff; outline:none; transition:border-color 0.15s; letter-spacing:0.5px; }
        .otp-input:focus { border-color:#1a2340; }
        .otp-input::placeholder { color:#bbb; font-size:14px; }
        .otp-boxes { display:flex; gap:10px; margin-bottom:8px; }
        .otp-box { width:46px; height:54px; border:1.5px solid #ddd8cf; border-radius:10px; font-size:22px; font-weight:700; color:#1a2340; text-align:center; font-family:inherit; background:#fff; outline:none; transition:border-color 0.15s,box-shadow 0.15s; caret-color:#1a2340; }
        .otp-box:focus { border-color:#1a2340; box-shadow:0 0 0 3px rgba(26,35,64,0.08); }
        .otp-box.filled { border-color:#1a2340; background:#f0f4ff; }
        .otp-btn { width:100%; max-width:360px; background:#1a2340; color:#fff; border:none; border-radius:8px; padding:13px 20px; font-size:15px; font-weight:600; font-family:inherit; cursor:pointer; transition:background 0.15s,transform 0.1s; display:flex; align-items:center; justify-content:center; gap:8px; margin-top:4px; }
        .otp-btn:hover:not(:disabled) { background:#253060; }
        .otp-btn:active:not(:disabled) { transform:scale(0.98); }
        .otp-btn:disabled { opacity:0.55; cursor:not-allowed; }
        .otp-error { font-size:12px; color:#c0392b; margin:6px 0 0; background:#fdf3f2; border:1px solid #f5c6c2; padding:7px 12px; border-radius:6px; width:100%; max-width:360px; text-align:left; box-sizing:border-box; }
        .otp-resend { margin-top:16px; font-size:12px; color:#aaa; display:flex; align-items:center; gap:6px; }
        .otp-resend-btn { background:none; border:none; cursor:pointer; font-size:12px; font-family:inherit; font-weight:600; color:#1a2340; padding:0; display:flex; align-items:center; gap:4px; transition:color 0.15s; }
        .otp-resend-btn:disabled { color:#bbb; cursor:not-allowed; }
        .otp-resend-btn:not(:disabled):hover { color:#8b1a1a; }
        .otp-change { margin-top:8px; font-size:12px; color:#aaa; }
        .otp-change-btn { background:none; border:none; cursor:pointer; font-size:12px; font-family:inherit; color:#1a2340; padding:0; text-decoration:underline; }
        .otp-verified { display:flex; align-items:center; gap:8px; background:#edfdf5; border:1px solid #a3e6c4; border-radius:8px; padding:10px 16px; font-size:13px; font-weight:600; color:#1a7a4a; margin-bottom:16px; }
        .otp-steps { display:flex; align-items:center; gap:6px; margin-bottom:24px; }
        .otp-step { display:flex; align-items:center; gap:6px; font-size:11px; font-weight:600; letter-spacing:0.06em; text-transform:uppercase; }
        .otp-step-dot { width:22px; height:22px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:700; }
        .otp-step-dot.done { background:#1a2340; color:#fff; }
        .otp-step-dot.active { background:#c9a84c; color:#fff; }
        .otp-step-dot.todo { background:#e4e1d9; color:#aaa; }
        .otp-step-label.active { color:#1a2340; }
        .otp-step-label.done { color:#aaa; }
        .otp-step-label.todo { color:#ccc; }
        .otp-step-line { width:24px; height:1px; background:#e4e1d9; }
        .ap-footer { background:#eceae4; border-top:1px solid #ddd8cf; padding:12px 24px; display:flex; align-items:center; justify-content:center; gap:8px; flex-wrap:wrap; font-size:11px; color:#aaa; flex-shrink:0; }
        .ap-footer-dot { opacity:0.35; }
        @media(max-width:860px){.ap-body{grid-template-columns:1fr;padding:20px 16px 48px;gap:16px}.ap-sidebar{position:static;display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.ap-help-card,.ap-dates-card,.ap-divider{display:none}}
        @media(max-width:600px){.ap-nav{padding:0 14px;height:48px}.ap-nav-tag,.ap-nav-sep,.ap-nav-secure{display:none}.ap-hero{padding:20px 14px 24px}.ap-h1-sub{display:none}.ap-body{padding:14px 12px 40px;gap:12px}.ap-sidebar{display:none}.ap-panel{border-radius:8px}.ap-panel-top{padding:14px 16px 12px}.ap-panel-title{font-size:15px}.otp-gate{padding:28px 20px 32px}.otp-boxes{gap:7px}.otp-box{width:40px;height:48px;font-size:19px}.ap-footer{flex-direction:column;gap:2px;text-align:center;font-size:10px}.ap-footer-dot{display:none}}
        @media(max-width:380px){.ap-h1{font-size:1.4rem}.ap-back span{display:none}.ap-back{padding:6px 10px}.otp-box{width:36px;height:44px;font-size:17px;border-radius:8px}.otp-boxes{gap:5px}}
      `}</style>

      <div className="ap-root">
        <nav className="ap-nav">
          <button className="ap-back" onClick={handleBack}>
            <FiArrowLeft size={14} strokeWidth={2} /><span>Back</span>
          </button>
          <div className="ap-nav-brand">
            <span className="ap-nav-logo">GSBM</span>
            <span className="ap-nav-sep">|</span>
            <span className="ap-nav-tag">Admissions Portal</span>
          </div>
          <div className="ap-nav-secure"><FiLock size={11} strokeWidth={2} />Secure</div>
        </nav>

        <div className="ap-hero">
          <div className="ap-hero-inner">
            <div className="ap-badge">MBA 2026–2028 &nbsp;·&nbsp; Admissions Open</div>
            <h1 className="ap-h1">Apply to GSBM</h1>
            <p className="ap-h1-sub">Fill in your details. Our team will reach out within 24 hours.</p>
          </div>
        </div>

        <div className="ap-body">
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
              <span className="ap-section-label">Need Help?</span>
              <a href="tel:+918667690672" className="ap-contact-link">
                <FiPhone size={13} strokeWidth={2} />+91 8667690672
              </a>
            </div>
            <div className="ap-dates-card">
              <span className="ap-section-label">Key Dates</span>
              {KEY_DATES.map(({ label, date }) => (
                <div className="ap-trow" key={label}>
                  <span className="ap-trow-label">{label}</span>
                  <span className="ap-trow-date">{date}</span>
                </div>
              ))}
            </div>
          </aside>

          <section className="ap-panel">
            <div className="ap-panel-top">
              <h2 className="ap-panel-title">Application Form</h2>
              <p className="ap-panel-hint">
                {step === STEP.PHONE && 'Verify your mobile number to begin.'}
                {step === STEP.OTP   && 'Enter the OTP sent to your phone.'}
                {step === STEP.FORM  && 'Complete your application below.'}
              </p>
            </div>

            {step === STEP.PHONE && (
              <div className="otp-gate">
                <div className="otp-steps">
                  <div className="otp-step"><div className="otp-step-dot active">1</div><span className="otp-step-label active">Verify</span></div>
                  <div className="otp-step-line" />
                  <div className="otp-step"><div className="otp-step-dot todo">2</div><span className="otp-step-label todo">OTP</span></div>
                  <div className="otp-step-line" />
                  <div className="otp-step"><div className="otp-step-dot todo">3</div><span className="otp-step-label todo">Apply</span></div>
                </div>
                <div className="otp-gate-icon"><FiPhone size={24} strokeWidth={1.5} /></div>
                <h3 className="otp-gate-title">Verify Your Mobile</h3>
                <p className="otp-gate-sub">We'll send a 6-digit OTP to confirm your number before opening the application form.</p>
                <div className="otp-phone-row">
                  <div className="otp-prefix">🇮🇳 +91</div>
                  <input className="otp-input" type="tel" inputMode="numeric" maxLength={10} placeholder="10-digit mobile number" value={phone}
                    onChange={e => { setPhone(e.target.value.replace(/\D/g,'').slice(0,10)); setError(''); }}
                    onKeyDown={e => { if(e.key==='Enter') handleSendOTP(); }} />
                </div>
                {error && <div className="otp-error">{error}</div>}
                <button className="otp-btn" onClick={handleSendOTP} disabled={loading} style={{marginTop:14}}>
                  {loading ? <>↻ Sending…</> : <><FiShield size={15}/> Send OTP</>}
                </button>
              </div>
            )}

            {step === STEP.OTP && (
              <div className="otp-gate">
                <div className="otp-steps">
                  <div className="otp-step"><div className="otp-step-dot done">✓</div><span className="otp-step-label done">Verify</span></div>
                  <div className="otp-step-line" />
                  <div className="otp-step"><div className="otp-step-dot active">2</div><span className="otp-step-label active">OTP</span></div>
                  <div className="otp-step-line" />
                  <div className="otp-step"><div className="otp-step-dot todo">3</div><span className="otp-step-label todo">Apply</span></div>
                </div>
                <div className="otp-gate-icon" style={{background:'#fff8e6'}}><FiShield size={24} strokeWidth={1.5} style={{color:'#c9a84c'}}/></div>
                <h3 className="otp-gate-title">Enter OTP</h3>
                <p className="otp-gate-sub">A 6-digit OTP has been sent to <strong>+91 {phone}</strong>. It expires in 10 minutes.</p>
                <div className="otp-boxes" onPaste={handleOtpPaste}>
                  {otp.map((d,i) => (
                    <input key={i} ref={el=>(otpRefs.current[i]=el)} className={`otp-box${d?' filled':''}`}
                      type="text" inputMode="numeric" maxLength={1} value={d}
                      onChange={e=>handleOtpChange(i,e.target.value)}
                      onKeyDown={e=>handleOtpKeyDown(i,e)}
                      onFocus={e=>e.target.select()} />
                  ))}
                </div>
                {error && <div className="otp-error">{error}</div>}
                <button className="otp-btn" onClick={handleVerifyOTP} disabled={otp.join('').length<6||loading}>
                  {loading ? <>↻ Verifying…</> : <><FiCheckCircle size={15}/> Verify & Continue</>}
                </button>
                <div className="otp-resend">
                  <span>{resendTimer>0?`Resend in ${resendTimer}s`:"Didn't receive it?"}</span>
                  <button className="otp-resend-btn" onClick={handleResend} disabled={resendTimer>0||loading}>
                    <FiRefreshCw size={11}/>Resend OTP
                  </button>
                </div>
                <div className="otp-change">
                  <button className="otp-change-btn" onClick={()=>{setStep(STEP.PHONE);setOtp(['','','','','','']);setError('');}}>Change number</button>
                </div>
              </div>
            )}

            {step === STEP.FORM && (
              <>
                <div className="otp-gate" style={{paddingBottom:16}}>
                  <div className="otp-steps">
                    <div className="otp-step"><div className="otp-step-dot done">✓</div><span className="otp-step-label done">Verify</span></div>
                    <div className="otp-step-line" />
                    <div className="otp-step"><div className="otp-step-dot done">✓</div><span className="otp-step-label done">OTP</span></div>
                    <div className="otp-step-line" />
                    <div className="otp-step"><div className="otp-step-dot active">3</div><span className="otp-step-label active">Apply</span></div>
                  </div>
                  <div className="otp-verified"><FiCheckCircle size={16}/>+91 {phone} verified successfully</div>
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