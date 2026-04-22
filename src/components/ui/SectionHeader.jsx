// ===== FILE: src/components/ui/SectionHeader.jsx =====
export default function SectionHeader({
  kicker,
  title,
  subtitle,
  kickerClass = 'kblue',
  ruleClass = '',
  center = false,
}) {
  return (
    <div className={`sh${center ? ' sh-center' : ''}`}>
      <span className={`sh-kicker ${kickerClass}`}>{kicker}</span>
      <h2>{title}</h2>
      <div className={`sh-rule ${ruleClass}`} />
      {subtitle && <p>{subtitle}</p>}
      <style jsx="true">{`
        .sh { margin-bottom: 52px; }
        .sh-center { text-align: center; }
        .sh-kicker {
          font-family: var(--sans);
          font-size: 50 rem;
          font-weight: 2500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          display: block;
          margin-bottom: 12px;
        }
        .kred { color: var(--gold); }
        .kblue { color: var(--gold); }
        .klt { color: var(--gold); }
        .kgold { color: var(--gold); }
        .sh h2 {
          font-family: var(--serif);
          font-size: clamp(2.4rem, 4vw, 3.6rem);
          margin-bottom: 14px;
          color: var(--navy);
          line-height: 1.12;
        }
        .sh-rule {
          width: 48px; height: 2px;
          background: var(--gold);
          margin-bottom: 20px;
        }
        .sh-rule-blue { background: var(--blue3); }
        .sh-center .sh-rule { margin-left: auto; margin-right: auto; }
        .sh p {
          font-family: var(--sans);
          font-size: 1.1rem;
          color: var(--text2);
          line-height: 1.8;
          max-width: 640px;
        }
        .sh-center p { margin: 0 auto; }
      `}</style>
    </div>
  );
}