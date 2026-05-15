import { FiZap, FiTarget, FiCpu, FiMic, FiAward, FiUsers } from 'react-icons/fi';
import SectionHeader from '../ui/SectionHeader';
import './Gsbmwhy.css';

const WHY_CARDS = [
  {
    id: 'curriculum',
    Icon: FiZap,
    title: 'Futuristic, Industry-Integrated Curriculum',
    desc: 'Co-designed with Industry partners and updated annually to match real Employer expectations — not Textbook theory alone.',
  },
  {
    id: 'placement',
    Icon: FiTarget,
    title: 'Dedicated Placement Cell',
    desc: 'Strong Company relationships, On-campus Recruitment drives, Internship pipelines, and Year-round Placement preparation for every student.',
  },
  {
    id: 'faculty',
    Icon: FiCpu,
    title: 'Experienced Faculty',
    desc: 'Professors of Practice, Academics with Doctoral credentials, and Professionals who have led teams in Industry — bringing depth and real-world relevance together.',
  },
  {
    id: 'guest-lectures',
    Icon: FiMic,
    title: 'Guest Lectures & Industry Talks',
    desc: "Regular sessions by CEOs, VPs, and Senior leaders from India's top organisations — giving students direct access to Corporate thinking.",
  },
  {
    id: 'research',
    Icon: FiAward,
    title: 'Research & Innovation Culture',
    desc: 'Active research environment, Live projects, Publications, and Collaboration with the wider VMRF (Deemed to be university) ecosystem.',
  },
  {
    id: 'alumni',
    Icon: FiUsers,
    title: 'Alumni Network & Mentorship',
    desc: 'A growing community of placed Alumni offering Mentorship, Referrals, and Guidance across Industries and Geographies.',
  },
];

const WhyCard = ({ Icon, title, desc }) => (
  <div className="why-card">
    <div className="why-card-icon" aria-hidden="true">
      <Icon size={32} strokeWidth={1.5} />
    </div>
    <h3 className="why-card-title">{title}</h3>
    <p className="why-card-desc">{desc}</p>
  </div>
);

const Gsbmwhy = () => (
  <section className="sec" id="why">
    <div className="W">
      <SectionHeader
        kicker="Why Choose GSBM"
        title="Your Competitive Edge Starts Here"
        subtitle="Ganesan School of Business Management (GSBM) is not just another MBA degree offering institute. It is a launchpad — built around the belief that Education must translate directly into Personal and Professional Career outcomes."
        center
      />
      <div className="why-grid">
        {WHY_CARDS.map(({ id, Icon, title, desc }) => (
          <WhyCard key={id} Icon={Icon} title={title} desc={desc} />
        ))}
      </div>
    </div>
  </section>
);

export default Gsbmwhy;