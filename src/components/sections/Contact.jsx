import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiYoutube,
  FiInstagram,
  FiLinkedin,
  FiTwitter,
  FiFacebook,
} from 'react-icons/fi';
import { Ac1 } from '../ui/Accordion';
import SectionHeader from '../ui/SectionHeader';
import './Contact.css';

// ─── Contact data ──────────────────────────────────────────────────────────────

const CONTACT_CARDS = [
  {
    id: 'manager',
    Icon: FiPhone,
    label: 'Manager Admissions',
    content: <a href="tel:+918667690672" className="contact-card-value">+91 8667690672</a>,
  },
  {
    id: 'counselor',
    Icon: FiPhone,
    label: 'Counselor Tel',
    content: (
      <div className="contact-card-value">
        <a href="tel:9791476444">+91 9791476444</a>,{' '}
        <a href="tel:9791658444">+91 9791658444</a>
      </div>
    ),
  },
  {
    id: 'email',
    Icon: FiMail,
    label: 'Email',
    content: (
      <a
        href="mailto:manageradmissionsgsbm@vinayakamissions.com"
        className="contact-card-value"
      >
        manageradmissionsgsbm@vinayakamissions.com
      </a>
    ),
  },
  {
    id: 'address',
    Icon: FiMapPin,
    label: 'Address',
    content: (
      <p className="contact-card-value">
        Vinayaka Nagar, Rajiv Gandhi Salai (Old Mahabalipuram Road), Chennai – 603 104
      </p>
    ),
  },
  {
    id: 'whatsapp',
    Icon: FiMessageCircle,
    label: 'WhatsApp',
    content: (
      <a href="https://wa.me/918667690672" className="contact-card-value">
        +91 8667690672
      </a>
    ),
  },
];

// ─── Social links data ─────────────────────────────────────────────────────────

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
    href: 'https://www.facebook.com/ganesanschoolofbusinessmanagement/',
  },
  {
    id: 'instagram',
    Icon: FiInstagram,
    label: 'Instagram',
    href: 'https://www.instagram.com/ganesanschoolofbusinessmanagem/',
  },
  {
    id: 'linkedin',
    Icon: FiLinkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/ganesan-school-of-business-management',
  },
  {
    id: 'twitter',
    Icon: FiTwitter,
    label: 'X (Twitter)',
    href: 'https://x.com/gsbmchennaiin',
  },
];

// ─── Exact campus coordinates (VMRF Vinayaka Nagar, Paiyanoor, OMR) ───────────
// Confirmed via Google Places — same campus as VMLS & VSEP: 12.6578, 80.1810
const CAMPUS_LAT = 12.6578;
const CAMPUS_LNG = 80.1810;

// ─── Sub-components ───────────────────────────────────────────────────────────

const ContactCard = ({ Icon, label, content }) => (
  <div className="contact-card">
    <span className="contact-card-icon" aria-hidden="true">
      <Icon size={22} strokeWidth={1.5} />
    </span>
    <p className="contact-card-label">{label}</p>
    {content}
  </div>
);

const SocialCard = () => (
  <div className="contact-card contact-card-social">
    <p className="contact-card-label">Follow Us</p>
    <div className="contact-social-icons">
      {SOCIAL_LINKS.map(({ id, Icon, label, href }) => (
        <a
          key={id}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-social-btn"
          aria-label={label}
          title={label}
        >
          <Icon size={18} strokeWidth={1.8} />
          <span className="contact-social-label">{label}</span>
        </a>
      ))}
    </div>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────

const Contact = () => (
  <section className="sec-sky" id="contact">
    <div className="W">
      <SectionHeader
        kicker="Contact Us"
        title="We're Here to Help"
        subtitle="Reach our admissions team for any query about the MBA program, eligibility, fees, campus visits, or anything else."
        kickerClass="kred"
      />

      <div className="contact-cards-grid">
        {CONTACT_CARDS.map(({ id, Icon, label, content }) => (
          <ContactCard key={id} Icon={Icon} label={label} content={content} />
        ))}
        <SocialCard />
      </div>

      <Ac1 title="Campus Location & Map">
        <div className="contact-map-container">
          <p className="body-text contact-map-text">
            GSBM is located at the VMRF campus, Vinayaka Nagar, Old Mahabalipuram Road (OMR),
            Paiyanoor, Chennai – 603 104. Easily accessible by road with regular bus and cab
            connectivity along the OMR IT corridor.
          </p>
          <iframe
            title="GSBM Campus Map"
            src={`https://maps.google.com/maps?q=${CAMPUS_LAT},${CAMPUS_LNG}&z=17&output=embed`}
            className="contact-map-iframe"
            width="100%"
            height="400"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Ac1>
    </div>
  </section>
);

export default Contact;