// ===== FILE: src/components/ui/SectionHeader.jsx =====
export default function SectionHeader({
  kicker,
  title,
  subtitle,
  kickerClass = 'kblue',
  ruleClass = '',
  center = false,
  oneLine = false,   // opt-in: keep this subtitle on a single line on wide screens
}) {
  return (
    <div className={`sh${center ? ' sh-center' : ''}`}>
      <span className={`sh-kicker ${kickerClass}`}>{kicker}</span>
      <h2>{title}</h2>
      <div className={`sh-rule ${ruleClass}`} />
      {subtitle && <p className={oneLine ? 'sh-oneline' : ''}>{subtitle}</p>}
      <style jsx="true">{`
        .sh { margin-bottom: 52px; }
        .sh-center { text-align: center; }
        .sh-kicker {
          font-family: var(--sans);
          font-size: 0.8rem;
          font-weight: 600;
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

        /* DEFAULT subtitle — wraps normally, always. Every section gets
           this unless it explicitly opts out via the oneLine prop.
           max-width uses ch (character widths) rather than a fixed pixel
           value, so line length stays readable at any font size or zoom
           level. ~68 characters is the standard readable measure. */
        .sh p {
          font-family: var(--sans);
          font-size: 1.1rem;
          color: var(--text2);
          line-height: 1.8;
          max-width: 68ch;
        }
        .sh-center p { margin: 0 auto; }

        /* OPT-IN single-line subtitle — applied ONLY to elements that ask
           for it, never globally.

           This was previously an unscoped rule targeting all .sh p inside
           a min-width query, which hit every section using this component.
           Since index.css sets overflow-x: clip on body, those longer
           subtitles could neither wrap nor scroll, so they were silently
           truncated mid-sentence at the right edge of the viewport.

           Now only the opted-in element gets nowrap, it needs enough
           viewport width to actually fit, and it still falls back to
           normal wrapping on anything narrower. */
        .sh p.sh-oneline {
          max-width: 100%;
        }
        @media (min-width: 1180px) {
          .sh p.sh-oneline {
            white-space: nowrap;
          }
        }
      `}</style>
    </div>
  );
}