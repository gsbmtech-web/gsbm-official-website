import { memo, startTransition, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPhone, FiMail } from 'react-icons/fi';
import { Ac1, Ac2 } from '../ui/Accordion';
import SectionHeader from '../ui/SectionHeader';
import InfoCard from '../ui/InfoCard';
import './Admissions.css';

const admissionSteps = [
  { id: 'apply',       title: 'Submit Application',  desc: 'Fill out the online form on this page or visit the Ganesan School of Business Management (GSBM) admissions office at Campus, Chennai.' },
  { id: 'docs',        title: 'Document Submission',  desc: 'Submit mark sheets (10th, 12th, UG), entrance scorecard, ID proof, and two passport-size photographs.' },
  { id: 'interview',   title: 'Personal Interview',   desc: 'Shortlisted candidates are invited for a personal interview or counselling session with the GSBM admissions committee.' },
  { id: 'offer',       title: 'Offer Letter',         desc: 'Selected candidates receive an offer letter. Seat is confirmed on payment of the first semester fee.' },
  { id: 'orientation', title: 'Orientation',          desc: 'New students attend a mandatory orientation program before commencement in July.' },
];

const exams = ['TANCET', 'CAT', 'MAT', 'CMAT', 'XAT', 'ATMA', 'GSBM EXAM'];

const faqs = [
  { id: 'recognised',    q: 'Is the GSBM MBA recognised?',             a: "Yes. The MBA is awarded by Vinayaka Mission's Research Foundation (VMRF), a UGC-recognised deemed to be university with NAAC accreditation." },
  { id: 'no-exam',       q: 'Can I apply without an entrance exam score?', a: 'Yes. Direct merit-based admission is available. The committee evaluates academic performance and personal interview scores.' },
  { id: 'scholarship',   q: 'Are scholarships available?',             a: 'Yes. Merit-based scholarships are available for academically strong candidates. Contact the admissions office for eligibility criteria.' },
  { id: 'hostel',        q: 'Is hostel accommodation available?',      a: 'Yes. The campus has hostel facilities for outstation students. Contact campus administration for current availability and fees.' },
  { id: 'start-date',   q: 'When does the academic year begin?',      a: 'The MBA program commences in July each year. The exact date for 2026–2028 will be stated in your offer letter.' },
  { id: 'placement',     q: 'What is the placement record?',           a: 'GSBM will transform and make you one of the most sought-after candidates by corporates. GSBM Promise!' },
];

const quickFactsRows = [
  { label: 'Applications Open', value: 'January 2026' },
  { label: 'Last Date',         value: 'June 30, 2026' },
  { label: 'Interviews',        value: 'May – June 2026' },
  { label: 'Results',           value: 'Rolling basis' },
  { label: 'Commencement',      value: 'July 2026' },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

// memo is correct here — receives rows prop, skip re-render if parent re-renders
const QuickFacts = memo(({ rows }) => (
  <div className="admissions-sbox">
    <div className="admissions-sbox-head">Quick Facts</div>
    <div className="admissions-sbox-body">
      {rows.map((r) => (
        <div className="admissions-srow" key={r.label}>
          <span className="admissions-srow-lbl">{r.label}</span>
          <span className="admissions-srow-val">{r.value}</span>
        </div>
      ))}
    </div>
  </div>
));

// No props — memo removed; useCallback stabilises the handler reference
const SidebarPromo = () => {
  const navigate = useNavigate();

  const handleApply = useCallback((e) => {
    e.preventDefault();
    startTransition(() => navigate('/apply'));
  }, [navigate]);

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
};

// No props — memo removed; inline SVGs replaced with react-icons/fi
const ContactInfo = () => (
  <div className="admissions-contact-box">
    <p className="admissions-contact-head">Get in Touch</p>
    <a href="tel:+919841283764" className="admissions-contact-row">
      <FiPhone size={16} aria-hidden="true" focusable="false" />
      <span>+91 98412 83764</span>
    </a>
    <a href="mailto:manageradmissionsgsbm@vinayakamissions.com" className="admissions-contact-row">
      <FiMail size={16} aria-hidden="true" focusable="false" />
      <span>manageradmissionsgsbm@vinayakamissions.com</span>
    </a>
  </div>
);

// ─── Main component ──────────────────────────────────────────────────────────

// No props — memo removed
const Admissions = () => (
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
                GSBM admits students annually for the MBA program commencing in July of every year.
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
              <InfoCard label="Relaxation"          value="For government notified categories, 45% aggregate as per AICTE norms." />
              <InfoCard label="Final Year Students" value="Students appearing in final year exams may apply. Admission is provisional until final results are submitted." />
              <InfoCard label="Work Experience"     value="Not mandatory. Candidates with work experience receive additional weightage in the selection process." />
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
                  <div className="admissions-step" key={step.id}>
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
            {faqs.map((faq) => (
              <Ac2 key={faq.id} title={faq.q}>
                <p className="body-text">{faq.a}</p>
              </Ac2>
            ))}
          </Ac1>
        </div>

        {/* Right sidebar */}
        <div className="pin">
          <QuickFacts rows={quickFactsRows} />
          <SidebarPromo />
          <ContactInfo />
        </div>

      </div>
    </div>
  </section>
);

export default Admissions;