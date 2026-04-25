import { memo, startTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ac1, Ac2 } from '../ui/Accordion';
import SectionHeader from '../ui/SectionHeader';
import InfoCard from '../ui/InfoCard';
import './Admissions.css';

const admissionSteps = [
  { title: 'Submit Application', desc: 'Fill out the online form on this page or visit the Ganesan School of Business Management(GSBM) admissions office at Campus, Chennai.' },
  { title: 'Document Submission', desc: 'Submit mark sheets (10th, 12th, UG), entrance scorecard, ID proof, and two passport-size photographs.' },
  { title: 'Personal Interview', desc: 'Shortlisted candidates are invited for a personal interview or counselling session with the Ganesan School of Business Management(GSBM) admissions committee.' },
  { title: 'Offer Letter', desc: 'Selected candidates receive an offer letter. Seat is confirmed on payment of the first semester fee.' },
  { title: 'Orientation', desc: 'New students attend a mandatory orientation program before commencement in July.' },
];

const exams = ['TANCET', 'CAT', 'MAT', 'CMAT', 'XAT', 'ATMA', 'GSBM EXAM'];

const faqs = [
  { q: 'Is the Ganesan School of Business Management(GSBM) MBA recognised?', a: "Yes. The MBA is awarded by Vinayaka Mission's Research Foundation (VMRF), a UGC-recognised deemed to be university with NAAC accreditation." },
  { q: 'Can I apply without an entrance exam score?', a: 'Yes. Direct merit-based admission is available. The committee evaluates academic performance and personal interview scores.' },
  { q: 'Are scholarships available?', a: 'Yes. Merit-based scholarships are available for academically strong candidates. Contact the admissions office for eligibility criteria.' },
  { q: 'Is hostel accommodation available?', a: 'Yes. The campus has hostel facilities for outstation students. Contact campus administration for current availability and fees.' },
  { q: 'When does the academic year begin?', a: 'The MBA program commences in July each year. The exact date for 2026-2028 will be stated in your offer letter.' },
  { q: 'What is the placement record?', a: 'Ganesan School of Business Management(GSBM) will transform and make you one of the most sought-after candidates by corporates. Ganesan School of Business Management(GSBM) Promise!' },
];

const quickFactsRows = [
  { label: 'Applications Open', value: 'January 2026' },
  { label: 'Last Date', value: 'June 30, 2026' },
  { label: 'Interviews', value: 'May – June 2026' },
  { label: 'Results', value: 'Rolling basis' },
  { label: 'Commencement', value: 'July 2026' },
];

// ─── Sub-components ──────────────────────────────────────────────────────────
const QuickFacts = memo(({ rows }) => (
  <div className="admissions-sbox">
    <div className="admissions-sbox-head">Quick Facts</div>
    <div className="admissions-sbox-body">
      {rows.map((r, i) => (
        <div className="admissions-srow" key={i}>
          <span className="admissions-srow-lbl">{r.label}</span>
          <span className="admissions-srow-val">{r.value}</span>
        </div>
      ))}
    </div>
  </div>
));

const SidebarPromo = memo(() => {
  const navigate = useNavigate();
  const handleApply = (e) => {
    e.preventDefault();
    startTransition(() => navigate('/apply'));
  };
  return (
    <div className="admissions-sidebar-promo">
      <p className="admissions-promo-badge">Admissions Open</p>
      <p className="admissions-promo-title">MBA 2026–2028</p>
      <p className="admissions-promo-desc">Limited seats available. Early applications get priority.</p>
      <a href="/apply" className="btn btn-red admissions-promo-btn" onClick={handleApply}>
        Apply Now
      </a>
    </div>
  );
});

const ContactInfo = memo(() => (
  <div className="admissions-contact-box">
    <p className="admissions-contact-head">Get in Touch</p>
    <a href="tel:+919841283764" className="admissions-contact-row">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
        <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
      </svg>
      <span>+91 98412 83764</span>
    </a>
    <a href="mailto:manageradmissionsgsbm@vinayakamissions.com" className="admissions-contact-row">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
      <span>manageradmissionsgsbm@vinayakamissions.com</span>
    </a>
  </div>
));

// ─── Main component ──────────────────────────────────────────────────────────
const Admissions = () => {
  return (
    <section className="sec-parch" id="admissions">
      <div className="W">
        <div className="g21 as">
          {/* Left column */}
          <div>
            <SectionHeader
              kicker="Admissions 2026-2028"
              title="Your MBA Journey Starts Here"
              kickerClass="kred"
            />

            <Ac1 title="Admission Overview" defaultOpen>
              <Ac2 title="About the Process" defaultOpen>
                <p className="body-text admissions-mb12">
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
                <p className="body-text admissions-mb14">
                  Scores from any national management entrance exam are accepted. Students without scores may apply through direct merit-based admission.
                </p>
                <div className="exam-badges-row">
                  {exams.map(exam => <div key={exam} className="exam-badge">{exam}</div>)}
                </div>
              </Ac2>
            </Ac1>

            <Ac1 title="Step-by-Step Admission Process">
              <Ac2 title="How to Apply" defaultOpen>
                <div className="admissions-steps-container">
                  {admissionSteps.map((step, idx) => (
                    <div className="admissions-step" key={idx}>
                      <div className="admissions-step-n">{String(idx + 1).padStart(2, '0')}</div>
                      <div>
                        <p className="admissions-step-t">{step.title}</p>
                        <p className="admissions-step-d">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
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

          {/* Right sidebar – with Apply Now button & contact */}
          <div className="pin">
            <QuickFacts rows={quickFactsRows} />
            <SidebarPromo />
            <ContactInfo />
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Admissions);