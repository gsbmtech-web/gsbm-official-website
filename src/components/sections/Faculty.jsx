import { memo, useState } from 'react';
import { FiLinkedin, FiInstagram, FiGlobe, FiYoutube } from 'react-icons/fi';
import { SiUdemy, SiQuora } from 'react-icons/si';

// Each platform's own brand color, applied via a CSS custom property
// (--brand) rather than hardcoded classes — see Faculty.css. "website"
// has no brand color of its own, so it's left out and falls back to
// the site's burgundy/gold in the CSS.
const BRAND = {
  linkedin: '#0A66C2',
  instagram: '#E4405F',
  youtube: '#FF0000',
  udemy: '#A435F0',
  quora: '#B92B27',
};
import { Ac1, Ac2 } from '../ui/Accordion';
import SectionHeader from '../ui/SectionHeader';
import DotItem from '../ui/DotItem';
import './Faculty.css';

// Initials computed once at module load — never recalculated on re-render
const toInitials = (name) =>
  name
    .split(' ')
    .filter((w) => w.length > 2 && !w.includes('.'))
    .slice(0, 2)
    .map((w) => w[0])
    .join('');

// 👇 For each person: paste their photo URL and social links between the
// quotes. Leave any field as '' to skip it — the card falls back to an
// initials avatar with no photo, and only shows the social icons that
// actually have a link (no broken empty-href icons).
const FACULTY = [
  {
    name: 'Raman Pushkar',
    title: 'Consultant, ex-VP Deutsche Bank',
    area: 'Finance & Investment Banking',
    photo: 'https://res.cloudinary.com/vewrsjxm/image/upload/v1787662681/wmremove-transformed_2.png',
    social: {
      linkedin: 'https://www.linkedin.com/in/ramanpushkar/',
      instagram: 'https://www.instagram.com/ramanpushkarconsulting/',
      website: 'https://ramanpushkar.com/en/',
      youtube: 'https://www.youtube.com/@RamanPushkar07',
      udemy: 'https://www.udemy.com/user/raman-pushkar-3/?srsltid=AfmBOor3f905BLGMvoea5vAP9zniBeh-vI__k_pDMYFSd11zedU5Fk-v',
      quora: 'https://www.quora.com/profile/Raman-Pushkar',
    },
  },
  {
    name: 'Prasanna Rao',
    title: 'Vice President, Accenture',
    area: 'Strategy & Consulting',
    photo: '', // 👈 paste Prasanna Rao's photo URL here
    social: {
      linkedin: '',
      instagram: '',
      website: '',
      youtube: '',
      udemy: '',
      quora: '',
    },
  },
  {
    name: 'Vimal M G',
    title: 'Vice President, Barclays',
    area: 'Banking & Financial Services',
    photo: '', // 👈 paste Vimal M G's photo URL here
    social: {
      linkedin: '',
      instagram: '',
      website: '',
      youtube: '',
      udemy: '',
      quora: '',
    },
  },
  {
    name: 'Ram Dheeraj G',
    title: 'Associate Director, Novartis',
    area: 'Healthcare & Pharma Management',
    photo: '', // 👈 paste Ram Dheeraj G's photo URL here
    social: {
      linkedin: '',
      instagram: '',
      website: '',
      youtube: '',
      udemy: '',
      quora: '',
    },
  },
].map((f) => ({ ...f, initials: toInitials(f.name) }));

const researchAreas = [
  'Strategic Management & Entrepreneurship',
  'Financial Markets & Behavioural Finance',
  'Consumer Behaviour & Digital Marketing',
  'HR Analytics & Organisational Behaviour',
  'Supply Chain Optimisation',
  'Healthcare Administration',
  'Business Intelligence & AI',
  'Sustainability & Corporate Governance',
];

// ─── FacultyCard ──────────────────────────────────────────────────────────────
const FacultyCard = memo(({ photo, initials, name, title, area, social }) => {
  // Tracks whether the photo actually loaded — starts true only if a URL
  // was given at all, and flips to false on a broken/missing image so we
  // fall back to the initials avatar instead of a blank image box.
  const [photoOk, setPhotoOk] = useState(Boolean(photo));
  const hasSocial = social && (social.linkedin || social.instagram || social.website || social.youtube || social.udemy || social.quora);

  return (
    <div className="fcard">
      <div className="fcard-photo">
        {photo && photoOk ? (
          <img
            src={photo}
            alt={`Portrait of ${name}, ${title}`}
            loading="lazy"
            decoding="async"
            onError={() => setPhotoOk(false)}
          />
        ) : (
          <div className="fcard-av" aria-hidden="true">{initials}</div>
        )}
      </div>

      <div className="fcard-body">
        <p className="fcard-name">{name}</p>
        <p className="fcard-title">{title}</p>
        <p className="fcard-area">{area}</p>

        {hasSocial && (
          <div className="fcard-social">
            {social.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="fcard-social-btn"
                style={{ '--brand': BRAND.linkedin }}
                aria-label={`${name} on LinkedIn`}
                title="LinkedIn"
              >
                <FiLinkedin size={16} strokeWidth={1.8} />
              </a>
            )}
            {social.instagram && (
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="fcard-social-btn"
                style={{ '--brand': BRAND.instagram }}
                aria-label={`${name} on Instagram`}
                title="Instagram"
              >
                <FiInstagram size={16} strokeWidth={1.8} />
              </a>
            )}
            {social.website && (
              <a
                href={social.website}
                target="_blank"
                rel="noopener noreferrer"
                className="fcard-social-btn"
                aria-label={`${name}'s website`}
                title="Website"
              >
                <FiGlobe size={16} strokeWidth={1.8} />
              </a>
            )}
            {social.youtube && (
              <a
                href={social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="fcard-social-btn"
                style={{ '--brand': BRAND.youtube }}
                aria-label={`${name} on YouTube`}
                title="YouTube"
              >
                <FiYoutube size={16} strokeWidth={1.8} />
              </a>
            )}
            {social.udemy && (
              <a
                href={social.udemy}
                target="_blank"
                rel="noopener noreferrer"
                className="fcard-social-btn"
                style={{ '--brand': BRAND.udemy }}
                aria-label={`${name} on Udemy`}
                title="Udemy"
              >
                <SiUdemy size={16} />
              </a>
            )}
            {social.quora && (
              <a
                href={social.quora}
                target="_blank"
                rel="noopener noreferrer"
                className="fcard-social-btn"
                style={{ '--brand': BRAND.quora }}
                aria-label={`${name} on Quora`}
                title="Quora"
              >
                <SiQuora size={16} />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

const Faculty = () => (
  <section className="sec" id="faculty">
    <div className="W">
      <SectionHeader
        kicker="Faculty & Research"
        title="Academic Excellence Meets Industry Experience"
        subtitle="Our faculty bring doctoral credentials, academic depth and real corporate experience into the classroom, ensuring students receive an education that is both rigorous and relevant."
      />

      <Ac1 title="Faculty Overview & Teaching Philosophy" defaultOpen>
        <Ac2 title="Our Approach" defaultOpen>
          <p className="body-text faculty-mb12">
           At GSBM, faculty are educators, practitioners, researchers and mentors. Each faculty member is selected for academic depth and practical exposure, creating a learning environment that combines rigour with real world relevance.
          </p>
          <p className="body-text">
            The teaching methodology combines case based learning, industry simulations, live projects and regular interaction with visiting professionals from leading organisations.
          </p>
        </Ac2>
      </Ac1>

      <Ac1 title="Faculty Profiles">
        <div className="faculty-grid">
          {FACULTY.map(({ name, photo, initials, title, area, social }) => (
            <FacultyCard
              key={name}
              name={name}
              photo={photo}
              initials={initials}
              title={title}
              area={area}
              social={social}
            />
          ))}
        </div>
      </Ac1>

      <Ac1 title="Research Areas">
        <Ac2 title="Active Research Domains" defaultOpen>
          <div className="faculty-research-grid">
            {researchAreas.map((r) => <DotItem key={r} text={r} />)}
          </div>
        </Ac2>
      </Ac1>

      <Ac1 title="Publications & Conferences">
        <Ac2 title="Research Output" defaultOpen>
          <p className="body-text faculty-mb12">
            GSBM faculty contribute actively to Academic and Industry research through peer-reviewed Journal
            Publications, Conference papers, Case studies, and Textbook contributions.
          </p>
          <p className="body-text">
            The institution participates in National-Level Management Conferences, bringing together Academics
            and Pactitioners to exchange perspectives on the most pressing business challenges of the day.
          </p>
        </Ac2>
      </Ac1>
    </div>
  </section>
);

export default Faculty;