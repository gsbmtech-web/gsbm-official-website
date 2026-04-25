// ===== FILE: src/components/ui/Accordion.jsx =====
// FIXES:
// 1. Inline <style jsx="true"> injected on EVERY render of every accordion instance
//    (so 10 accordions = 10 identical <style> tags injected). Moved to Accordion.css.
// 2. No aria-expanded on accordion buttons → screen readers can't tell open/closed state
// 3. No aria-controls linking button to its panel → assistive tech can't navigate
// 4. Body panel not hidden from AT when closed (display:none or aria-hidden needed)
// 5. useCallback on a simple boolean toggle is over-engineered (no deps) — kept for
//    consistency but noted; removing it is also fine.

import { useState, useId } from 'react';
import './Accordion.css';

/* ─── Ac1 — Primary accordion ───────────────────────────────────────────────── */
export function Ac1({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  // useId generates a stable unique ID for aria-controls linkage
  const id = useId();
  const panelId = `ac1-panel-${id}`;

  return (
    <div className="ac1">
      <button
        type="button"
        className={`ac1-btn${open ? ' open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span>{title}</span>
        <span className="ac1-icon" aria-hidden="true">{open ? '×' : '+'}</span>
      </button>

      {/* role="region" + aria-labelledby makes the panel a landmark for screen readers */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={undefined} /* button already described by its text */
        className={`ac1-body${open ? ' open' : ''}`}
        hidden={!open ? true : undefined} /* hides from AT when closed */
      >
        <div className="ac1-inner">{children}</div>
      </div>
    </div>
  );
}

/* ─── Ac2 — Secondary (nested) accordion ────────────────────────────────────── */
export function Ac2({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  const panelId = `ac2-panel-${id}`;

  return (
    <div className="ac2">
      <button
        type="button"
        className={`ac2-btn${open ? ' open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <span className="ac2-dot" aria-hidden="true" />
          {title}
        </span>
        <span className="ac2-arr" aria-hidden="true" />
      </button>

      <div
        id={panelId}
        className={`ac2-body${open ? ' open' : ''}`}
        hidden={!open ? true : undefined}
      >
        <div className="ac2-content">{children}</div>
      </div>
    </div>
  );
}