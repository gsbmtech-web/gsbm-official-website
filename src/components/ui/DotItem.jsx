// ===== FILE: src/components/ui/DotItem.jsx =====
export default function DotItem({ text }) {
  return (
    <div className="dot-item">
      <span className="dot-item-dot" />
      <span>{text}</span>
      <style jsx="true">{`
        .dot-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: var(--white);
          border: 1px solid var(--border);
          font-family: var(--sans);
          font-size: 0.92rem;
          font-weight: 500;
          color: var(--text);
          box-shadow: var(--shadow-sm);
        }
        .dot-item-dot {
          width: 6px; height: 6px;
          background: var(--burgundy);
          flex-shrink: 0;
          border-radius: 0;
        }
      `}</style>
    </div>
  );
}