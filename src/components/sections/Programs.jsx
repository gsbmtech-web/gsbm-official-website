// ===== FILE: src/components/sections/Programs.jsx =====
import { Ac1, Ac2 } from '../ui/Accordion';
import SectionHeader from '../ui/SectionHeader';
import DotItem from '../ui/DotItem';
import InfoCard from '../ui/InfoCard';

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

const certifications = [
  'Digital Marketing & SEO',
  'Financial Modelling & Valuation',
  'Data Analytics (Python + Excel)',
  'Supply Chain Management Tools',
  'Business Communication',
  'Leadership & Personality Development',
];

const whatYouGain = [
  { title: 'Industry-Ready Futuristic Curriculum', desc: "We don't teach theory. We teach application." },
  { title: 'Student-Driven Placement & GSBM Support', desc: 'Strong company network, on-campus drives, end-to-end career preparation.' },
  { title: 'Experiential & Practical Learning', desc: 'Case studies, simulations, gamification, live projects, and internship opportunities.' },
  { title: 'Global Perspective', desc: 'Foreign professor masterclasses. Exposure to international business trends, frameworks, and case studies.' },
];

export default function Programs() {
  return (
    <section className="sec-sky" id="programs">
      <div className="W">
        <SectionHeader
          kicker="Programs Offered"
          title="MBA with Specialisations Designed by Students, Industry & Faculty"
          subtitle="Every program at GSBM is designed to produce industry-ready professionals with the knowledge, exposure, and confidence to lead from day one. Coached, mentored, and groomed by the best."
          kickerClass="kred"
          ruleClass="sh-rule-blue"
        />

        <Ac1 title="MBA Degree Program — 2 Years Full-Time" defaultOpen>
          <Ac2 title="Program Overview" defaultOpen>
            <p className="body-text" style={{ marginBottom: 14 }}>
              A full-time MBA degree awarded by Vinayaka Mission's Research Foundation (Deemed University).
              The program balances rigorous academic theory with hands-on exposure through case studies,
              industry simulations, live projects, and expert guest sessions.
            </p>
            <p className="body-text">
              Designed to produce decision-makers with strong analytical ability, ethical values, and a global
              business perspective — graduates who are both leadership-ready and placement-ready.
            </p>
          </Ac2>
          <Ac2 title="Specialisations Available">
            <div className="g2" style={{ gap: 10 }}>
              {SPECS.map(s => <DotItem key={s} text={s} />)}
            </div>
          </Ac2>
          <Ac2 title="What You Gain">
            <div className="g2" style={{ gap: 12 }}>
              {whatYouGain.map((item, idx) => (
                <div key={idx} className="gain-card">
                  <p className="gain-card-title">{item.title}</p>
                  <p className="gain-card-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </Ac2>
        </Ac1>

        <Ac1 title="Industry-Integrated Certification Programs">
          <Ac2 title="Overview" defaultOpen>
            <p className="body-text">
              Short-term certification programs running alongside the MBA curriculum. Designed to make students
              immediately job-ready with in-demand technical and functional skills that complement their core MBA degree.
            </p>
          </Ac2>
          <Ac2 title="Available Certifications">
            <div className="g2" style={{ gap: 10 }}>
              {certifications.map(c => <DotItem key={c} text={c} />)}
            </div>
          </Ac2>
        </Ac1>

        <Ac1 title="Placement Training & Career Development">
          <Ac2 title="Overview" defaultOpen>
            <p className="body-text">
              Year-round training embedded into the MBA program. Every student goes through structured preparation —
              not just academics, but full corporate readiness across aptitude, communication, interviews, and personal branding.
            </p>
          </Ac2>
          <Ac2 title="Training Modules">
            <InfoCard label="Aptitude & Logical Reasoning" value="Structured mock tests aligned with actual corporate selection formats used by top companies." />
            <InfoCard label="Soft Skills & Communication" value="Business writing, presentation delivery, professional communication, and workplace etiquette." />
            <InfoCard label="Resume & LinkedIn Building" value="Crafting results-driven resumes and building an effective LinkedIn presence for visibility." />
            <InfoCard label="Mock Interviews & Group Discussions" value="Full-length simulated interviews and GD rounds with detailed, constructive feedback from faculty and industry professionals." />
          </Ac2>
        </Ac1>

        <Ac1 title="Workshops, Seminars & Guest Lectures">
          <Ac2 title="Overview" defaultOpen>
            <p className="body-text">
              Regular sessions by CEOs, senior leaders, and domain experts from India's top organisations.
              These sessions give students direct exposure to how business actually operates — far beyond what any textbook can offer.
            </p>
          </Ac2>
          <Ac2 title="Topics Covered">
            <div className="g2" style={{ gap: 10 }}>
              {[
                'Leadership & Entrepreneurship',
                'Business Strategy & Innovation',
                'AI in Business Decision-Making',
                'Digital Transformation',
                'Financial Markets — Live',
                'Supply Chain Disruptions',
                'Healthcare Management Trends',
                'Startup Ecosystems & Funding',
              ].map(t => <DotItem key={t} text={t} />)}
            </div>
          </Ac2>
        </Ac1>
      </div>

      <style jsx="true">{`
        .gain-card {
          padding: 20px;
          background: var(--white);
          border: 1px solid var(--border);
          box-shadow: var(--shadow-sm);
        }
        .gain-card-title {
          font-family: var(--sans);
          font-weight: 700;
          font-size: 1.02rem;
          color: var(--navy);
          margin-bottom: 5px;
        }
        .gain-card-desc {
          font-family: var(--sans);
          font-size: 0.92rem;
          color: var(--text2);
          line-height: 1.78;
        }
      `}</style>
    </section>
  );
}