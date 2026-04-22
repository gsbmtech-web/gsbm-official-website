// ===== FILE: src/components/sections/WhyGanesan School of Business Management(GSBM).jsx =====
import SectionHeader from '../ui/SectionHeader';
import { FiZap, FiTarget, FiCpu, FiMic, FiAward, FiUsers } from 'react-icons/fi';

/* ─── STATIC DATA ─── */
const WHY_CARDS = [
  {
    icon: '📊',
    title: 'Futuristic, Industry-Integrated Curriculum',
    desc: 'Co-designed with industry partners and updated annually to match real employer expectations — not textbook theory alone.',
  },
  {
    icon: '🎯',
    title: 'Dedicated Placement Cell',
    desc: 'Strong company relationships, on-campus recruitment drives, internship pipelines, and year-round placement preparation for every student.',
  },
  {
    icon: '👨‍🏫',
    title: 'Experienced Faculty',
    desc: 'Professors of Practice, academics with doctoral credentials, and professionals who have led teams in industry — bringing depth and real-world relevance together.',
  },
  {
    icon: '🌐',
    title: 'Guest Lectures & Industry Talks',
    desc: "Regular sessions by CEOs, VPs, and senior leaders from India's top organisations — giving students direct access to corporate thinking.",
  },
  {
    icon: '🔬',
    title: 'Research & Innovation Culture',
    desc: 'Active research environment, live projects, publications, and collaboration with the wider VMRF deemed university ecosystem.',
  },
  {
    icon: '🤝',
    title: 'Alumni Network & Mentorship',
    desc: 'A growing community of placed alumni offering mentorship, referrals, and guidance across industries and geographies.',
  },
];

const icons = [FiZap, FiTarget, FiCpu, FiMic, FiAward, FiUsers];

export default function WhyGSBM() {
  return (
    <section className="sec" id="why">
      <div className="W">
        <SectionHeader
          kicker="Why Choose GSBM"
          title="Your Competitive Edge Starts Here"
          subtitle=" Ganesan School of Business Management(GSBM)  is not just another MBA degree offering institute. It is a launchpad — built around the belief that education must translate directly into personal and professional career outcomes."
          center
        />
        <div className="g3">
          {WHY_CARDS.map((card, idx) => {
            const Icon = icons[idx];
            return (
              <div key={idx} className="icard">
                <div className="icard-ico">
                  <Icon size={32} strokeWidth={1.5} />
                </div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx="true">{`
        .icard {
          padding: 28px 24px;
          background: var(--white);
          border: 1px solid var(--border);
          border-top: 2px solid var(--gold);
          border-radius: 2px;
          transition: all .22s;
        }
        .icard:hover {
          border-top-color: var(--burgundy);
          box-shadow: 0 8px 32px rgba(28,24,20,.08);
          transform: translateY(-3px);
        }
        .icard-ico {
          width: 46px; height: 46px;
          background: var(--burgundy);
          border-radius: 3px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.2rem;
          margin-bottom: 16px;
        }
        .icard h3 {
          font-family: var(--serif);
          font-size: 1.25rem;
          color: var(--navy);
          margin-bottom: 9px;
        }
        .icard p {
          font-family: var(--sans);
          font-size: 1rem;
          color: var(--text2);
          line-height: 1.78;
        }
      `}</style>
    </section>
  );
}