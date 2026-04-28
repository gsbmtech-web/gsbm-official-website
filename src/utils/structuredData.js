export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Ganesan School of Business Management",
  "alternateName": "GSBM Chennai",
  "url": "https://gsbm.co.in",
  "logo": "https://gsbm.co.in/logo.png",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Vinayaka Nagar, Rajiv Gandhi Salai (OMR)",
    "addressLocality": "Chennai",
    "addressRegion": "Tamil Nadu",
    "postalCode": "603104",
    "addressCountry": "IN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+918667690672",
    "contactType": "admissions",
    "email": "manageradmissionsgsbm@vinayakamissions.com",
    "availableLanguage": "English"
  },
  "sameAs": [
    "https://www.instagram.com/domavcampus/",
    "https://www.facebook.com/DoMAVCampus",
    "https://www.linkedin.com/in/dom-avcampus/"
  ]
});

export const generateCourseSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Master of Business Administration (MBA)",
  "description": "Two-year full-time MBA with specialisations in Marketing, Finance, HR, Business Analytics, Logistics, Operations, Healthcare. AICTE approved, NAAC accredited.",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "Vinayaka Mission's Research Foundation (Deemed University)",
    "sameAs": "https://vmrf.edu.in"
  },
  "educationalCredentialAwarded": "MBA Degree",
  "url": "https://gsbm.co.in/programs",
  "duration": "P2Y",
  "courseCode": "MBA-01",
  "occupationalCredentialAwarded": "MBA Postgraduate"
});

export const generateWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://gsbm.co.in",
  "name": "GSBM Chennai",
  "description": "Top MBA college in Chennai – industry integrated curriculum, high placements, AICTE approved.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://gsbm.co.in/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
});