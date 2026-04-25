import { memo } from 'react';
import { FiZap, FiTarget, FiCpu, FiMic, FiAward, FiUsers } from 'react-icons/fi';
import SectionHeader from '../ui/SectionHeader';
import './WhyGSBM.css';

const WHY_CARDS = [
  {
    icon: FiZap,
    title: 'Futuristic, Industry-Integrated Curriculum',
    desc: 'Co-designed with industry partners and updated annually to match real employer expectations — not textbook theory alone.',
  },
  {
    icon: FiTarget,
    title: 'Dedicated Placement Cell',
    desc: 'Strong company relationships, on-campus recruitment drives, internship pipelines, and year-round placement preparation for every student.',
  },
  {
    icon: FiCpu,
    title: 'Experienced Faculty',
    desc: 'Professors of Practice, academics with doctoral credentials, and professionals who have led teams in industry — bringing depth and real-world relevance together.',
  },
  {
    icon: FiMic,
    title: 'Guest Lectures & Industry Talks',
    desc: "Regular sessions by CEOs, VPs, and senior leaders from India's top organisations — giving students direct access to corporate thinking.",
  },
  {
    icon: FiAward,
    title: 'Research & Innovation Culture',
    desc: 'Active research environment, live projects, publications, and collaboration with the wider VMRF deemed to be university ecosystem.',
  },
  {
    icon: FiUsers,
    title: 'Alumni Network & Mentorship',
    desc: 'A growing community of placed alumni offering mentorship, referrals, and guidance across industries and geographies.',
  },
];

const WhyGSBM = () => {
  return (
    <section className="sec" id="why">
      <div className="W">
        <SectionHeader
          kicker="Why Choose GSBM"
          title="Your Competitive Edge Starts Here"
          subtitle="Ganesan School of Business Management (GSBM) is not just another MBA degree offering institute. It is a launchpad — built around the belief that education must translate directly into personal and professional career outcomes."
          center
        />
        <div className="why-grid">
          {WHY_CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div key={idx} className="why-card">
                <div className="why-card-icon" aria-hidden="true">
                  <Icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className="why-card-title">{card.title}</h3>
                <p className="why-card-desc">{card.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default memo(WhyGSBM);