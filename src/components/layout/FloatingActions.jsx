// src/components/layout/FloatingActions.jsx
//
// Fixed-position quick-action stack: Call and Apply Online as primary
// CTAs, plus the same social links used in the Footer. Stays visible
// while scrolling. Same phone number/social URLs as Navbar/Footer —
// update in one place if any of those change, update here too.

import { useCallback, startTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPhone, FiEdit3, FiYoutube, FiFacebook, FiInstagram, FiLinkedin } from 'react-icons/fi';
import './FloatingActions.css';

const SOCIAL_LINKS = [
  { id: 'youtube', Icon: FiYoutube, label: 'YouTube', href: 'https://www.youtube.com/@GanesanSchoolofBusinessManagem' },
  { id: 'facebook', Icon: FiFacebook, label: 'Facebook', href: 'https://www.facebook.com/share/1FzGTgtwYY/' },
  { id: 'instagram', Icon: FiInstagram, label: 'Instagram', href: 'https://www.instagram.com/gsbm_chennai/' },
  { id: 'linkedin', Icon: FiLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/company/ganesan-school-of-business-management-chennai/about/?viewAsMember=true' },
];

const FloatingActions = () => {
  const navigate = useNavigate();

  const goToApply = useCallback(() => {
    startTransition(() => navigate('/apply'));
  }, [navigate]);

  return (
    <div className="fa-stack" role="complementary" aria-label="Quick actions">
      <a
        href="tel:+918667690672"
        className="fa-btn fa-btn--call"
        aria-label="Call admissions: +91 8667690672"
        title="Call us"
      >
        <FiPhone size={19} />
      </a>

      <button
        type="button"
        className="fa-btn fa-btn--apply"
        onClick={goToApply}
        aria-label="Apply Online"
        title="Apply Online"
      >
        <FiEdit3 size={19} />
      </button>

      <div className="fa-divider" aria-hidden="true" />

      {SOCIAL_LINKS.map(({ id, Icon, label, href }) => (
        <a
          key={id}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="fa-btn fa-btn--social"
          aria-label={label}
          title={label}
        >
          <Icon size={16} />
        </a>
      ))}
    </div>
  );
};

export default FloatingActions;