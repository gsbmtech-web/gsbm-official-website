import { useCallback, startTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import './Calbutton.css';

const Calbutton = () => {
  const navigate = useNavigate();

  // Single handler for all CTA links — reads target route from data-href.
  // startTransition marks the navigation as non-urgent so the current UI
  // stays interactive while the new route loads.
  const handleNav = useCallback((e) => {
    e.preventDefault();
    const href = e.currentTarget.dataset.href;
    startTransition(() => navigate(href));
  }, [navigate]);

  return (
    <section className="ctab">
      <div className="W">
        <span className="ctab-kicker">MBA Admissions 2026–2028</span>
        <h2>Ready to Transform Your Career?</h2>
        <p>
          Limited seats available. Apply to GSBM and begin your MBA journey with a program built around academic rigour, industry exposure and career readiness. This also avoids an unsupported superlative such as “Chennai’s most transformative”.
        </p>
        <div className="ctab-btns">
          <a
            href="/apply"
            data-href="/apply"
            className="btn ctab-btn-primary"
            onClick={handleNav}
          >
            Apply Now →
          </a>
          <a
            href="tel:+918667690672"
            className="btn ctab-btn-secondary"
          >
            Talk to an Advisor
          </a>
        </div>
      </div>
    </section>
  );
};

export default Calbutton;