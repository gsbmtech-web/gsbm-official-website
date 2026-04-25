import { memo } from 'react';
import { Ac1, Ac2 } from '../ui/Accordion';
import SectionHeader from '../ui/SectionHeader';
import DotItem from '../ui/DotItem';
import InfoCard from '../ui/InfoCard';
import './Programs.css';

const SPECIALISATIONS = [
  'Marketing Management',
  'Banking & Finance Management',
  'Human Resource Management',
  'Business Analytics & Artificial Intelligence',
  'Logistics & Supply Chain Management',
  'Operations Management',
  'Hospital & Healthcare Management',
  'Specialisation Designed By Students',
];

const CERTIFICATIONS = [
  'Digital Marketing & SEO',
  'Financial Modelling & Valuation',
  'Data Analytics (Python + Excel)',
  'Supply Chain Management Tools',
  'Business Communication',
  'Leadership & Personality Development',
];

const WORKSHOP_TOPICS = [
  'Leadership & Entrepreneurship',
  'Business Strategy & Innovation',
  'AI in Business Decision-Making',
  'Digital Transformation',
  'Financial Markets — Live',
  'Supply Chain Disruptions',
  'Healthcare Management Trends',
  'Startup Ecosystems & Funding',
];

const Programs = () => {
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
            <p className="body-text program-mb">
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
            <div className="programs-grid">
              {SPECIALISATIONS.map(s => <DotItem key={s} text={s} />)}
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
            <div className="programs-grid">
              {CERTIFICATIONS.map(c => <DotItem key={c} text={c} />)}
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
            <div className="programs-grid">
              {WORKSHOP_TOPICS.map(t => <DotItem key={t} text={t} />)}
            </div>
          </Ac2>
        </Ac1>
      </div>
    </section>
  );
};

export default memo(Programs);