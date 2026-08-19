// src/utils/structuredData.js
//
// JSON-LD schema for GSBM. Every URL uses the WWW host — it's the primary
// domain in Vercel and matches the canonical tags across the codebase.
//
// Two rules to keep this valid:
//  1. `sameAs` must list GSBM's own verified profiles, as clean canonical
//     URLs — no ?rdid=, ?share_url=, ?viewAsMember= tracking parameters.
//  2. Never reference a build-hashed asset (e.g. mainlogo-BGlttWD7.png).
//     Vite regenerates that hash on every build, so the URL breaks on the
//     next deploy. Point at a stable file in public/ instead.

const SITE = "https://www.gsbm.co.in";

export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Ganesan School of Business Management",
  "alternateName": "GSBM",
  "url": SITE,
  "logo": `${SITE}/images/Logo.png`,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Vinayaka Nagar, Old Mahabalipuram Road",
    "addressLocality": "Chennai",
    "addressRegion": "Tamil Nadu",
    "postalCode": "603104",
    "addressCountry": "IN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+918667690672",
    "contactType": "admissions",
    "email": "admissions@gsbm.co.in",
    "availableLanguage": "English"
  },
  "sameAs": [
    "https://www.instagram.com/gsbm_chennai/",
    "https://www.facebook.com/gsbm.mba.chennai",
    "https://www.linkedin.com/company/ganesan-school-of-business-management-chennai/",
    "https://www.youtube.com/@GanesanSchoolofBusinessManagem"
  ]
});

export const generateCourseSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Master of Business Administration (MBA)",
  "description": "Two-year full-time MBA with specialisations in Marketing, Finance, HR, Business Analytics, Logistics, Operations, Healthcare. AICTE approved.",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "Ganesan School of Business Management",
    "sameAs": SITE
  },
  "educationalCredentialAwarded": "MBA Degree",
  "url": `${SITE}/programs`,
  "duration": "P2Y",
  "courseCode": "MBA-01",
  "occupationalCredentialAwarded": "MBA Postgraduate"
});

// SearchAction removed on purpose: it declared a site search endpoint at
// /search, which doesn't exist here. Add it back only if a real search
// page is ever built.
export const generateWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": SITE,
  "name": "Ganesan School of Business Management",
  "description": "Top MBA college in Chennai – industry integrated curriculum, high placements, AICTE approved."
});