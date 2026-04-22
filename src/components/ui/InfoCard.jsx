// ===== FILE: src/components/ui/InfoCard.jsx =====
export default function InfoCard({ label, value }) {
  return (
    <div className="info-card">
      <p className="info-card-label">{label}</p>
      <p className="info-card-value">{value}</p>
      <style jsx="true">{`
        .info-card {
          padding: 16px 20px;
          background: var(--white);
          border: 1px solid var(--border);
          margin-bottom: 8px;
          box-shadow: var(--shadow-sm);
        }
        .info-card-label {
          font-family: var(--sans);
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--burgundy);
          margin-bottom: 6px;
        }
        .info-card-value {
          font-family: var(--sans);
          font-size: 0.98rem;
          line-height: 1.72;
          color: var(--text);
        }
      `}</style>
    </div>
  );
}