// ===== FILE: src/components/sections/Admissions.jsx =====
import { useState } from 'react';
import { Ac1, Ac2 } from '../ui/Accordion';
import SectionHeader from '../ui/SectionHeader';
import InfoCard from '../ui/InfoCard';
import { go } from '../../utils/scroll';

/* ─── STATIC DATA ─── */
const SPECS = [
  'Marketing Management',
  'Banking & Finance Management',
  'Human Resource Management',
  'Business Analytics & Artificial Intelligence',
  'Logistics & Supply Chain Management',
  'Operations Management',
  'Hospital & Healthcare Management',
];

const admissionSteps = [
  { title: 'Submit Application', desc: 'Fill out the online form on this page or visit the Ganesan School of Business Management(GSBM) admissions office at . Campus, Chennai.' },
  { title: 'Document Submission', desc: 'Submit mark sheets (10th, 12th, UG), entrance scorecard, ID proof, and two passport-size photographs.' },
  { title: 'Personal Interview', desc: 'Shortlisted candidates are invited for a personal interview or counselling session with the Ganesan School of Business Management(GSBM) admissions committee.' },
  { title: 'Offer Letter', desc: 'Selected candidates receive an offer letter. Seat is confirmed on payment of the first semester fee.' },
  { title: 'Orientation', desc: 'New students attend a mandatory orientation program before commencement in July.' },
];

const exams = ['TANCET', 'CAT', 'MAT', 'CMAT', 'XAT', 'ATMA', 'GSBM EXAM'];

const faqs = [
  { q: 'Is the Ganesan School of Business Management(GSBM) MBA recognised?', a: "Yes. The MBA is awarded by Vinayaka Mission's Research Foundation (VMRF), a UGC-recognised deemed university with NAAC accreditation." },
  { q: 'Can I apply without an entrance exam score?', a: 'Yes. Direct merit-based admission is available. The committee evaluates academic performance and personal interview scores.' },
  { q: 'Are scholarships available?', a: 'Yes. Merit-based scholarships are available for academically strong candidates. Contact the admissions office for eligibility criteria.' },
  { q: 'Is hostel accommodation available?', a: 'Yes. The campus has hostel facilities for outstation students. Contact campus administration for current availability and fees.' },
  { q: 'When does the academic year begin?', a: 'The MBA program commences in July each year. The exact date for 2026–28 will be stated in your offer letter.' },
  { q: 'What is the placement record?', a: 'Ganesan School of Business Management(GSBM) will transform and make you one of the most sought-after candidates by corporates. Ganesan School of Business Management(GSBM) Promise!' },
];

const quickFactsRows = [
  { label: 'Applications Open', value: 'January 2026' },
  { label: 'Last Date', value: 'June 30, 2026' },
  { label: 'Interviews', value: 'May – June 2026' },
  { label: 'Results', value: 'Rolling basis' },
  { label: 'Commencement', value: 'July 2026' },
];

/* ─── Quick Facts Sidebar (inline) ─── */
function QuickFacts({ rows }) {
  return (
    <div className="sbox">
      <div className="sbox-head">Quick Facts</div>
      <div className="sbox-body">
        {rows.map((r, i) => (
          <div className="srow" key={i}>
            <span className="srow-lbl">{r.label}</span>
            <span className="srow-val">{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Apply Form (inline, exact from original) ─── */
function ApplyForm({ compact = false }) {
  const [f, setF] = useState({ name: '', phone: '', email: '', qual: '', spec: '', msg: '' });
  const [done, setDone] = useState(false);

  const set = e => setF(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = e => {
    e.preventDefault();
    // TODO: replace with real API call
    setDone(true);
  };

  if (done) {
    return (
      <div className="form-success">
        <div className="form-success-icon">✓</div>
        <h3>Application Received</h3>
        <p>Thank you, {f.name}. Our admissions team will contact you within 24 hours.</p>
        <p className="form-success-phone">+91 98412 83764</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="apply-form" noValidate>
      <div className="form-grid">
        <div className="fg">
          <label htmlFor="af-name">Full Name *</label>
          <input
            id="af-name"
            name="name"
            type="text"
            required
            placeholder="Your full name"
            value={f.name}
            onChange={set}
            autoComplete="name"
          />
        </div>
        <div className="fg">
          <label htmlFor="af-phone">Phone *</label>
          <input
            id="af-phone"
            name="phone"
            type="tel"
            required
            placeholder="+91 XXXXX XXXXX"
            value={f.phone}
            onChange={set}
            autoComplete="tel"
          />
        </div>
        <div className="fg">
          <label htmlFor="af-email">Email *</label>
          <input
            id="af-email"
            name="email"
            type="email"
            required
            placeholder="your@email.com"
            value={f.email}
            onChange={set}
            autoComplete="email"
          />
        </div>
        <div className="fg">
          <label htmlFor="af-qual">Qualification *</label>
          <select id="af-qual" name="qual" required value={f.qual} onChange={set}>
            <option value="">Select</option>
            <option>B.E / B.Tech</option>
            <option>B.Com / BBA / BBM</option>
            <option>B.Sc</option>
            <option>B.A</option>
            <option>Other Graduate</option>
          </select>
        </div>
        <div className="fg fg-full">
          <label htmlFor="af-spec">Preferred Specialisation (optional)</label>
          <select id="af-spec" name="spec" value={f.spec} onChange={set}>
            <option value="">Select (optional)</option>
            {SPECS.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        {!compact && (
          <div className="fg fg-full">
            <label htmlFor="af-msg">Message / Query</label>
            <textarea
              id="af-msg"
              name="msg"
              rows={3}
              placeholder="Any questions about the program..."
              value={f.msg}
              onChange={set}
            />
          </div>
        )}
      </div>
      <button type="submit" className="btn btn-red btn-block">Submit Application</button>
      <p className="form-privacy">We respect your privacy. No spam, ever.</p>
    </form>
  );
}

/* ══════════════════════════════════════
   MAIN ADMISSIONS SECTION
══════════════════════════════════════ */
export default function Admissions() {
  return (
    <section className="sec-parch" id="admissions">
      <div className="W">
        <div className="g21 as">
          {/* Left column */}
          <div>
            <SectionHeader
              kicker="Admissions 2026–28"
              title="Your MBA Journey Starts Here"
              kickerClass="kred"
            />

            <Ac1 title="Admission Overview" defaultOpen>
              <Ac2 title="About the Process" defaultOpen>
                <p className="body-text" style={{ marginBottom: 12 }}>
                  Ganesan School of Business Management(GSBM) admits students annually for the MBA program commencing in July of every year.
                  Admissions are based on academic merit, entrance exam performance, and a personal interview
                  or counselling session conducted by the admissions committee.
                </p>
                <p className="body-text">
                  The process is designed to be transparent, student-friendly, and focused on identifying
                  candidates with genuine drive and a clear sense of purpose — not just exam scores.
                </p>
              </Ac2>
            </Ac1>

            <Ac1 title="Eligibility Criteria">
              <Ac2 title="Academic Requirements" defaultOpen>
                <InfoCard label="Basic Qualification" value="Any Bachelor's degree (10+2+3 or 10+2+4) from a recognised university with minimum 50% aggregate marks." />
                <InfoCard label="Relaxation" value="For government notified categories, 45% aggregate as per AICTE norms." />
                <InfoCard label="Final Year Students" value="Students appearing in final year exams may apply. Admission is provisional until final results are submitted." />
                <InfoCard label="Work Experience" value="Not mandatory. Candidates with work experience receive additional weightage in the selection process." />
              </Ac2>
              <Ac2 title="Entrance Exams Accepted">
                <p className="body-text" style={{ marginBottom: 14 }}>
                  Scores from any national management entrance exam are accepted. Students without scores may apply through direct merit-based admission.
                </p>
                <div className="exam-badges-row">
                  {exams.map(exam => <div key={exam} className="exam-badge">{exam}</div>)}
                </div>
              </Ac2>
            </Ac1>

            <Ac1 title="Step-by-Step Admission Process">
              <Ac2 title="How to Apply" defaultOpen>
                <div style={{ paddingTop: 6 }}>
                  {admissionSteps.map((step, idx) => (
                    <div className="step" key={idx}>
                      <div className="step-n">{String(idx + 1).padStart(2, '0')}</div>
                      <div>
                        <p className="step-t">{step.title}</p>
                        <p className="step-d">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Ac2>
            </Ac1>

            <Ac1 title="Fee Structure">
              <Ac2 title="2026–2028 Fee Breakdown" defaultOpen>
                <div style={{ overflowX: 'auto', marginBottom: 12 }}>
                  <table className="dtbl">
                    <thead>
                      <tr>
                        <th>Component</th>
                        <th>Year 1 (₹)</th>
                        <th>Year 2 (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>Admission Fee (One-time)</td><td>₹ 25,000</td><td>—</td></tr>
                      <tr><td>Tuition Fee</td><td>₹ 1,70,000</td><td>₹ 1,95,000</td></tr>
                      <tr><td>Exam & University Fee</td><td>₹ 15,000</td><td>₹ 15,000</td></tr>
                      <tr><td>Library & Lab Fee</td><td>₹ 5,000</td><td>₹ 5,000</td></tr>
                      <tr><td>Skill Development Training</td><td>₹ 10,000</td><td>₹ 10,000</td></tr>
                      <tr className="tot">
                        <td><strong>Total</strong></td>
                        <td><strong>₹ 2,25,000</strong></td>
                        <td><strong>₹ 2,25,000</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="fee-total-box">
                  <p className="fee-total-text">Grand Total for 2 Years: ₹ 4,50,000</p>
                </div>
                <p className="fee-note">
                  * Scholarship provisions available for meritorious students. Hostel and transport charges are separate.
                  Contact admissions for the official 2026–2028 fee notification.
                </p>
              </Ac2>
            </Ac1>

            <Ac1 title="Frequently Asked Questions">
              {faqs.map((faq, idx) => (
                <Ac2 key={idx} title={faq.q}>
                  <p className="body-text">{faq.a}</p>
                </Ac2>
              ))}
            </Ac1>
          </div>

          {/* Right sidebar — Application form */}
          <div className="pin" id="apply">
            <div className="form-head">
              <p className="form-head-lbl">Apply Online — MBA 2026–28</p>
              <p className="form-head-title">Start Your Application</p>
            </div>
            <div className="form-body">
              <ApplyForm />
            </div>

            <QuickFacts rows={quickFactsRows} />

            <div className="help-box">
              <p className="help-box-title">Need Help?</p>
              <a href="tel:+919841283764" className="btn btn-navy btn-block" style={{ marginBottom: 10 }}>
                📞 Call +91 98412 83764
              </a>
              <a
                href="https://wa.me/919841283764"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-out-blue btn-block"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        .sbox {
          border: 1px solid var(--border);
          border-radius: 2px;
          overflow: hidden;
          margin-bottom: 18px;
        }
        .sbox-head {
          background: var(--burgundy);
          padding: 12px 16px;
          font-family: var(--sans);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #E8D5A8;
          border-bottom: 1px solid rgba(184,146,42,0.25);
        }
        .sbox-body {
          padding: 16px;
          background: var(--white);
        }
        .srow {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          padding: 9px 0;
          border-bottom: 1px solid var(--border);
          font-family: var(--sans);
          font-size: 0.92rem;
        }
        .srow:last-child { border-bottom: none; }
        .srow-lbl {
          font-weight: 700;
          font-size: 0.82rem;
          color: var(--navy);
          min-width: 110px;
          flex-shrink: 0;
        }
        .srow-val {
          color: var(--text2);
          font-size: 0.9rem;
        }

        .form-head {
          background: var(--burgundy);
          padding: 16px 22px;
          border-radius: 2px 2px 0 0;
          border-bottom: 2px solid var(--gold);
        }
        .form-head-lbl {
          font-family: var(--sans);
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          margin-bottom: 4px;
        }
        .form-head-title {
          font-family: var(--serif);
          font-size: 1.3rem;
          color: var(--white);
        }
        .form-body {
          background: var(--white);
          border: 1px solid var(--border);
          border-top: none;
          border-radius: 0 0 2px 2px;
          padding: 28px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 0;
        }
        .fg { margin-bottom: 16px; }
        .fg-full { grid-column: 1 / -1; }
        .fg label {
          display: block;
          font-family: var(--sans);
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--navy);
          margin-bottom: 6px;
        }
        .fg input,
        .fg select,
        .fg textarea {
          width: 100%;
          padding: 12px 14px;
          font-family: var(--sans);
          font-size: 1rem;
          color: var(--text);
          background: var(--white);
          border: 1.5px solid var(--border);
          border-radius: 1px;
          outline: none;
          transition: border-color .18s;
          -webkit-appearance: none;
          appearance: none;
        }
        .fg input:focus,
        .fg select:focus,
        .fg textarea:focus {
          border-color: var(--gold);
          box-shadow: 0 0 0 3px rgba(184,146,42,0.08);
        }
        .fg textarea { resize: vertical; }

        .form-success {
          text-align: center;
          padding: 36px 16px;
        }
        .form-success-icon {
          width: 52px; height: 52px;
          background: var(--burgundy);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 14px;
          color: #fff;
          font-size: 1.3rem;
        }
        .form-success h3 {
          font-family: var(--serif);
          font-size: 1.4rem;
          color: var(--navy);
          margin-bottom: 8px;
        }
        .form-success p {
          font-family: var(--sans);
          color: var(--text2);
          font-size: 0.9rem;
          line-height: 1.8;
        }
        .form-success-phone {
          font-weight: 600;
          color: var(--burgundy);
          margin-top: 8px;
        }
        .form-privacy {
          font-family: var(--sans);
          font-size: 0.68rem;
          color: var(--text3);
          text-align: center;
          margin-top: 9px;
        }

        .help-box {
          padding: 20px;
          background: var(--cream);
          border: 1px solid var(--border);
          margin-top: 18px;
        }
        .help-box-title {
          font-family: var(--sans);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text3);
          margin-bottom: 12px;
        }

        .step {
          display: flex;
          gap: 18px;
          margin-bottom: 28px;
          position: relative;
        }
        .step:not(:last-child)::before {
          content: '';
          position: absolute;
          left: 17px; top: 40px; bottom: -28px;
          width: 1px;
          background: var(--border);
        }
        .step-n {
          width: 36px; height: 36px;
          background: var(--burgundy);
          color: #E8D5A8;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--sans);
          font-weight: 700;
          font-size: 0.9rem;
          flex-shrink: 0;
          z-index: 1;
        }
        .step-t {
          font-family: var(--sans);
          font-weight: 700;
          font-size: 1rem;
          color: var(--navy);
          margin-bottom: 4px;
        }
        .step-d {
          font-family: var(--sans);
          font-size: 0.9rem;
          color: var(--text2);
          line-height: 1.78;
        }

        .exam-badges-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 12px;
        }
        .exam-badge {
          padding: 10px 18px;
          background: var(--white);
          border: 1.5px solid var(--border);
          border-radius: 2px;
          font-family: var(--sans);
          font-weight: 700;
          font-size: 0.88rem;
          color: var(--navy);
          letter-spacing: 0.04em;
          box-shadow: var(--shadow-sm);
          transition: all .18s;
        }
        .exam-badge:hover {
          border-color: var(--gold);
          background: var(--sky);
        }

        .dtbl {
          width: 100%;
          border-collapse: collapse;
          font-family: var(--sans);
          font-size: 0.92rem;
        }
        .dtbl th {
          background: var(--burgundy);
          color: #E8D5A8;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          padding: 12px 16px;
          text-align: left;
        }
        .dtbl td {
          padding: 11px 16px;
          border-bottom: 1px solid var(--border);
        }
        .dtbl tr:hover td { background: var(--sky); }
        .dtbl tr.tot td {
          background: var(--parchment);
          font-weight: 700;
          color: var(--navy);
        }

        .fee-total-box {
          margin-top: 16px;
          padding: 12px;
          background: var(--cream);
          border: 1px solid var(--border);
          text-align: center;
        }
        .fee-total-text {
          font-family: var(--serif);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--navy);
        }
        .fee-note {
          font-family: var(--sans);
          font-size: 0.8rem;
          color: var(--text3);
          line-height: 1.7;
          margin-top: 16px;
        }

        @media (max-width: 768px) {
          .form-body { padding: 20px; }
          .form-grid { grid-template-columns: 1fr; }
          .fg-full { grid-column: 1; }
        }
        @media (max-width: 640px) {
          .form-body { padding: 16px; }
        }
      `}</style>
    </section>
  );
}