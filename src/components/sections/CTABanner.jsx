// ===== FILE: src/components/sections/CTABanner.jsx =====
import { go } from '../../utils/scroll';

export default function CTABanner() {
  return (
    <section className="ctab">
      <div className="W">
        <span className="ctab-kicker">MBA Admissions 2026–2028</span>
        <h2>Ready to Transform Your Career?</h2>
        <p>
          Limited seats available. Apply now for the 2026–28 MBA batch and secure your future
          with Chennai's most transformative and employability-driven MBA program.
        </p>
        <div className="ctab-btns">
          <a
            href="#apply"
            className="btn btn-wh btn-wh-filled"
            onClick={e => { e.preventDefault(); go('apply'); }}
          >
            Apply Now →
          </a>
          <a
            href="#contact"
            className="btn btn-wh"
            onClick={e => { e.preventDefault(); go('contact'); }}
          >
            Talk to an Advisor
          </a>
        </div>
      </div>

      <style jsx="true">{`
        .ctab {
          background: var(--burgundy);
          padding: 70px 0;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .ctab::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
        }
        .ctab::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
        }
        .ctab-kicker {
          font-family: var(--sans);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--gold);
          display: block;
          margin-bottom: 12px;
        }
        .ctab h2 {
          font-family: var(--serif);
          font-size: clamp(1.8rem, 3.8vw, 3rem);
          color: #fff;
          margin-bottom: 16px;
        }
        .ctab p {
          font-family: var(--sans);
          font-size: 1.08rem;
          color: rgba(255,255,255,0.75);
          max-width: 520px;
          margin: 0 auto 32px;
          line-height: 1.85;
        }
        .ctab-btns {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
        }

        @media (max-width: 768px) {
          .ctab { padding: 48px 0; }
          .ctab-btns { flex-direction: column; align-items: center; }
        }
      `}</style>
    </section>
  );
}