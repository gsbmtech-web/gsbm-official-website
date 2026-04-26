// ===== FILE: src/components/ui/Accordion.jsx =====
// MOBILE FIX: Removed `hidden` attribute from panels.
// `hidden` sets display:none which fights the max-height CSS animation
// and behaves inconsistently on Android Chrome / Samsung Browser.
// Replaced with aria-hidden + visibility (in CSS) + pointer-events:none.
// Screen readers still correctly skip closed panels via aria-hidden.

import { useState, useId } from 'react';
import './Accordion.css';

/* ─── Ac1 — Primary accordion ─────────────────────────────────────────── */
export function Ac1({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
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

      <div
        id={panelId}
        role="region"
        className={`ac1-body${open ? ' open' : ''}`}
        aria-hidden={!open}
      >
        <div className="ac1-inner">{children}</div>
      </div>
    </div>
  );
}

/* ─── Ac2 — Secondary (nested) accordion ──────────────────────────────── */
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
        aria-hidden={!open}
      >
        <div className="ac2-content">{children}</div>
      </div>
    </div>
  );
}