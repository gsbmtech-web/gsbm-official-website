import { useCallback, startTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiYoutube,
  FiFacebook,
  FiInstagram,
  FiLinkedin,
} from 'react-icons/fi';
import LogoImg from '../../assets/mainlogo.png';
import './Footer.css';

const footerLinks = [
  { label: 'About GSBM',  id: 'about',      path: '/about'      },
  { label: 'Leadership',  id: 'leadership', path: '/leadership' },
  { label: 'Programs',    id: 'programs',   path: '/programs'   },
  { label: 'Campus',      id: 'campus',     path: '/campus'     },
  { label: 'Admissions',  id: 'admissions', path: '/admissions' },
  { label: 'Faculty',     id: 'faculty',    path: '/faculty'    },
  { label: 'Placements',  id: 'placements', path: '/placements' },
  { label: 'Blogs',       id: 'blog',       path: '/blog'       },
  { label: 'Contact',     id: 'contact',    path: '/contact'    },
];

const SOCIAL_LINKS = [
  {
    id: 'youtube',
    Icon: FiYoutube,
    label: 'YouTube',
    href: 'https://www.youtube.com/@GanesanSchoolofBusinessManagem',
  },
  {
    id: 'facebook',
    Icon: FiFacebook,
    label: 'Facebook',
    href: 'https://www.facebook.com/share/1FzGTgtwYY/',
  },
  {
    id: 'instagram',
    Icon: FiInstagram,
    label: 'Instagram',
    href: 'https://www.instagram.com/gsbm_chennai/',
  },
  {
    id: 'linkedin',
    Icon: FiLinkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/ganesan-school-of-business-management-chennai/about/?viewAsMember=true',
  },
];

const Footer = () => {
  const navigate = useNavigate();

  // Plain route navigation — every link is a genuinely separate page now.
  const handleNav = useCallback((e, path) => {
    e.preventDefault();
    startTransition(() => navigate(path));
  }, [navigate]);

  const handleApply = useCallback((e) => {
    e.preventDefault();
    startTransition(() => navigate('/apply'));
  }, [navigate]);

  return (
    <footer className="footer">
      <div className="footer-top-stripe" />
      <div className="footer-grid">

        {/* Column 1 – Brand */}
        <div className="footer-col footer-col-brand">
          <img
            src={LogoImg}
            alt="GSBM Logo"
            className="footer-logo"
            loading="lazy"
            decoding="async"
            width={180}
            height={60}
          />
          <p className="footer-tagline">
            Ganesan School of Business Management
            (Deemed to be University), Chennai — building employable, ethical, and industry-ready leaders.
          </p>
          <button className="footer-cta" onClick={handleApply}>
            Apply Now <span className="footer-cta-arrow">→</span>
          </button>
        </div>

        {/* Column 2 – Quick Links */}
        <div className="footer-col footer-col-links">
          <p className="footer-heading">Quick Links</p>
          <nav>
            {footerLinks.map((link) => (
              <a
                key={link.id}
                href={link.path}
                className="footer-link"
                onClick={(e) => handleNav(e, link.path)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Column 3 – Contact */}
        <div className="footer-col footer-col-contact">
          <p className="footer-heading">Get in Touch</p>

          <div className="footer-contact-item">
            <FiMapPin size={15} className="footer-contact-icon" aria-hidden="true" />
            <span>Vinayaka Nagar, Old Mahabalipuram Road, Chennai – 603 104</span>
          </div>
          <div className="footer-contact-item">
            <FiPhone size={15} className="footer-contact-icon" aria-hidden="true" />
            <a href="tel:+918667690672">+91 8667690672</a>
          </div>
          <div className="footer-contact-item">
            <FiMail size={15} className="footer-contact-icon" aria-hidden="true" />
            <a href="mailto:admissions@gsbm.co.in">
              admissions@gsbm.co.in
            </a>
          </div>

          {/* Social icons */}
          <div className="footer-social">
            <p className="footer-heading footer-social-heading">Follow Us</p>
            <div className="footer-social-icons">
              {SOCIAL_LINKS.map(({ id, Icon, label, href }) => (
                <a
                  key={id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn"
                  aria-label={label}
                  title={label}
                >
                  <Icon size={16} strokeWidth={1.8} />
                </a>
              ))}
            </div>
          </div>

          {/* Corporate Office – hidden on mobile via CSS */}
          <div className="footer-corp">
            <p className="footer-heading footer-corp-heading">Corporate Office</p>
            <div className="footer-contact-item">
              <FiMapPin size={15} className="footer-contact-icon" aria-hidden="true" />
              <span>213/160, Poonamallee High Rd, Kilpauk, Chennai – 600 010</span>
            </div>
            <div className="footer-contact-item">
              <FiPhone size={15} className="footer-contact-icon" aria-hidden="true" />
              <span>+91 8667690672</span>
            </div>
          </div>
        </div>

      </div>

      <div className="footer-divider" />

      {/* Bottom bar — copyright + legal links on the left, credit on the
          right. Legal links live here rather than in Quick Links: that's
          where users and ad-platform reviewers expect to find them. */}
      <div className="footer-bottom">
        <div className="footer-bottom-left">
          <span className="footer-copy">
            © 2026 Ganesan School of Business Management. All rights reserved.
          </span>
          <span className="footer-legal-sep" aria-hidden="true">|</span>
          <a
            href="/privacy-policy"
            className="footer-legal-link"
            onClick={(e) => handleNav(e, '/privacy-policy')}
          >
            Privacy Policy
          </a>
        </div>

        <div className="footer-credit">
          <span className="footer-credit-label">Designed &amp; Developed by</span>
          <a
            href="https://ariartech.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-credit-link"
          >
            Ariar Technology
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;