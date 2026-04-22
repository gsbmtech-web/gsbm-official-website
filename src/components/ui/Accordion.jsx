// ===== FILE: src/components/ui/Accordion.jsx =====
import { useState, useCallback } from 'react'

export function Ac1({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)

  const toggle = useCallback(() => {
    setOpen(prev => !prev)
  }, [])

  return (
    <div className="ac1">
      <button
        className={`ac1-btn${open ? ' open' : ''}`}
        onClick={toggle}
      >
        <span>{title}</span>
        <span className="ac1-icon">{open ? '×' : '+'}</span>
      </button>
      <div className={`ac1-body${open ? ' open' : ''}`}>
        <div className="ac1-inner">{children}</div>
      </div>
      <style jsx="true">{`
        .ac1 {
          border: 1px solid var(--border);
          border-radius: 2px;
          margin-bottom: 10px;
          overflow: hidden;
        }
        .ac1-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 22px;
          background: var(--white);
          border: none;
          gap: 14px;
          font-family: var(--serif);
          font-size: 1.22rem;
          font-weight: 600;
          color: var(--navy);
          text-align: left;
          transition: background .14s;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
          cursor: pointer;
        }
        .ac1-btn:hover { background: var(--sky); }
        .ac1-btn.open { background: var(--burgundy); color: var(--white); }
        .ac1-btn.open .ac1-icon { background: var(--gold); color: var(--navy); transform: rotate(45deg); }
        .ac1-icon {
          width: 28px; height: 28px;
          border-radius: 50%;
          background: var(--burgundy);
          color: #fff;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
          font-weight: 400;
          flex-shrink: 0;
          transition: all .25s;
          line-height: 1;
        }

        .ac1-body {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.35s ease;
        }
        .ac1-body.open {
          grid-template-rows: 1fr;
        }
        .ac1-inner {
          overflow: hidden;
          background: var(--off);
          border-top: 1px solid var(--border);
          padding: 0;
        }
        .ac1-body.open .ac1-inner {
          padding: 10px 0 6px;
        }
      `}</style>
    </div>
  )
}

export function Ac2({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)

  const toggle = useCallback(() => {
    setOpen(prev => !prev)
  }, [])

  return (
    <div className="ac2">
      <button
        className={`ac2-btn${open ? ' open' : ''}`}
        onClick={toggle}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <span className="ac2-dot" />
          {title}
        </span>
        <span className="ac2-arr" />
      </button>
      <div className={`ac2-body${open ? ' open' : ''}`}>
        <div className="ac2-content">{children}</div>
      </div>
      <style jsx="true">{`
        .ac2 {
          margin: 0 16px 8px;
          border: 1px solid var(--border2);
          border-radius: 2px;
          overflow: hidden;
        }
        .ac2-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 18px;
          background: var(--white);
          border: none;
          gap: 10px;
          font-family: var(--sans);
          font-size: 1rem;
          font-weight: 600;
          color: var(--blue);
          text-align: left;
          transition: background .12s;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
          cursor: pointer;
        }
        .ac2-btn:hover { background: var(--sky); }
        .ac2-btn.open { background: var(--blue); color: var(--white); }
        .ac2-btn.open .ac2-arr { border-top-color: rgba(255,255,255,0.8); transform: rotate(180deg); }
        .ac2-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--gold);
          flex-shrink: 0;
          transition: background .18s;
        }
        .ac2-btn.open .ac2-dot { background: rgba(255,255,255,0.6); }
        .ac2-arr {
          width: 0; height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-top: 5px solid currentColor;
          flex-shrink: 0;
          transition: transform .2s;
        }

        .ac2-body {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.3s ease;
        }
        .ac2-body.open {
          grid-template-rows: 1fr;
        }
        .ac2-content {
          overflow: hidden;
          padding: 0 22px;
          background: var(--white);
          border-top: 1px solid var(--border);
          font-family: var(--sans);
          font-size: 1rem;
          line-height: 1.8;
          color: var(--text2);
        }
        .ac2-body.open .ac2-content {
          padding: 20px 22px;
        }
      `}</style>
    </div>
  )
}