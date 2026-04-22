// ===== FILE: src/components/sections/Ribbon.jsx =====
const ribbonItems = [
  'Good Placement Record',
  'All Students Were Placed',
  'Expanding Recruiting Companies',
  'Package Based on Student Aspiration & Preparation',
];

export default function Ribbon() {
  return (
    <div className="ribbon" aria-hidden="true">
      <div className="ribbon-grid">
        {ribbonItems.map((label, i) => (
          <div key={i} className="ribbon-cell">
            <span className="ribbon-cell-icon">✦</span>
            <span className="ribbon-cell-text">{label}</span>
          </div>
        ))}
      </div>
      <style jsx="true">{`
        .ribbon {
          background: var(--burgundy);
          border-bottom: 1px solid rgba(184,146,42,0.2);
        }
        .ribbon-grid {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        .ribbon-cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 24px 20px;
          text-align: center;
          border-right: 1px solid rgba(255,255,255,0.15);
        }
        .ribbon-cell:last-child { border-right: none; }
        .ribbon-cell-icon {
          font-size: 0.8rem;
          color: var(--gold);
        }
        .ribbon-cell-text {
          font-family: var(--sans);
          font-size: 0.92rem;
          font-weight: 600;
          color: #fff;
          line-height: 1.4;
        }
        @media (max-width: 1024px) {
          .ribbon-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .ribbon-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}