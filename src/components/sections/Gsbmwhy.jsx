import { FiZap, FiTarget, FiCpu, FiMic, FiAward, FiUsers } from 'react-icons/fi';
import SectionHeader from '../ui/SectionHeader';
import './Gsbmwhy.css';

const WHY_CARDS = [
  {
    id: 'curriculum',
    Icon: FiZap,
    title: 'Futuristic, Industry-Integrated Curriculum',
    desc: "An industry integrated curriculum shaped with inputs from industry partners and regularly updated to reflect evolving employer expectations, going well beyond textbook learning."
  },
  {
    id: 'placement',
    Icon: FiTarget,
    title: 'Dedicated Placement Cell',
    desc: "A dedicated career development team focused on building industry relationships, internship opportunities and structured career preparation for every student."
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
    desc: "An active research and innovation environment supported by live projects, applied research, publications and collaboration with industry and academic partners.",
  },
  {
    id: 'alumni',
    Icon: FiUsers,
    title: 'Industry Mentorship',
    desc: "Students gain access to experienced industry professionals who provide mentoring, career perspectives and practical insights across functions and sectors."
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
        subtitle="Ganesan School of Business Management (GSBM) is not just another MBA institution. It is a launchpad built around a simple belief management education must translate into meaningful personal and professional outcomes."
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