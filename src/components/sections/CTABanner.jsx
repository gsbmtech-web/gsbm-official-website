import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import './Ctabanner.css';

const Ctabanner = () => {
  const navigate = useNavigate();

  const handleApply = (e) => {
    e.preventDefault();
    navigate('/apply');
  };

  const handleContact = (e) => {
    e.preventDefault();
    navigate('/contact');
  };

  return (
    <section className="ctab">
      <div className="W">
        <span className="ctab-kicker">MBA Admissions 2026–2028</span>
        <h2>Ready to Transform Your Career?</h2>
        <p>
          Limited seats available. Apply now for the 2026-2028 MBA batch and secure your future
          with Chennai's most transformative and employability-driven MBA program.
        </p>
        <div className="ctab-btns">
          <a
            href="/apply"
            className="btn ctab-btn-primary"
            onClick={handleApply}
          >
            Apply Now →
          </a>
          <a
            href="/contact"
            className="btn ctab-btn-secondary"
            onClick={handleContact}
          >
            Talk to an Advisor
          </a>
        </div>
      </div>
    </section>
  );
};

export default memo(Ctabanner);