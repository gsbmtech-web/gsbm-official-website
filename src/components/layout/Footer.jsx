import { useCallback, startTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import LogoImg from '../../assets/mainlogo.png';
import './Footer.css';

const footerLinks = [
  { label: 'About GSBM',  id: 'about'      },
  { label: 'Leadership',  id: 'leadership'  },
  { label: 'Programs',    id: 'programs'    },
  { label: 'Campus',      id: 'campus'      },
  { label: 'Admissions',  id: 'admissions'  },
  { label: 'Faculty',     id: 'faculty'     },
  { label: 'Placements',  id: 'placements'  },
  { label: 'Contact',     id: 'contact'     },
];

// Scroll helper — called after navigation settles.
// Uses requestAnimationFrame instead of a fixed setTimeout so it waits
// for the browser's next paint rather than guessing 100 ms.
const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
    return true;
  }
  return false;
};

const Footer = () => {
  const navigate = useNavigate();

  // Single handler reads the target id from data-scrollto attribute —
  // no per-link closure, stable reference via useCallback.
  const handleScroll = useCallback((e) => {
    e.preventDefault();
    const id = e.currentTarget.dataset.scrollto;
    if (!scrollToId(id)) {
      startTransition(() => {
        navigate('/');
      });
      // Wait for React to paint the home page, then scroll.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => scrollToId(id));
      });
    }
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
            Ganesan School of Business Management, under Vinayaka Mission's Research Foundation
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
                href={`#${link.id}`}
                className="footer-link"
                data-scrollto={link.id}
                onClick={handleScroll}
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
            <a href="tel:+919841283764">+91 98412 83764</a>
          </div>
          <div className="footer-contact-item">
            <FiMail size={15} className="footer-contact-icon" aria-hidden="true" />
            <a href="mailto:manageradmissionsgsbm@vinayakamissions.com">
              manageradmissionsgsbm@vinayakamissions.com
            </a>
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
              <span>+91 98412 83764</span>
            </div>
          </div>
        </div>

      </div>

      <div className="footer-divider" />

      <div className="footer-bottom">
        <span className="footer-copy">© 2026 Ganesan School of Business Management. All rights reserved.</span>
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