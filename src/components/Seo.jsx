// src/components/SEO.jsx
import { useEffect } from 'react';

const SEO = ({ 
  title = 'GSBM – Ganesan School of Business Management',
  description = 'AICTE approved MBA in Chennai with specialisations in Marketing, Finance, HR, Business Analytics. Industry-integrated curriculum, placements, NAAC accredited.',
  keywords = ['MBA Chennai', 'GSBM', 'business school', 'MBA admissions 2026', 'AICTE approved MBA', 'management college Chennai'],
  image = 'https://gsbm.co.in/og-default.jpg',
  url = 'https://gsbm.co.in',
  type = 'website',
  publishedTime = null,
  author = 'GSBM Chennai'
}) => {
  const fullTitle = title === 'GSBM – Ganesan School of Business Management' ? title : `${title} | GSBM Chennai`;
  const metaDesc = description;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Meta description
    let metaDescTag = document.querySelector('meta[name="description"]');
    if (!metaDescTag) {
      metaDescTag = document.createElement('meta');
      metaDescTag.name = 'description';
      document.head.appendChild(metaDescTag);
    }
    metaDescTag.content = metaDesc;

    // Meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = keywords.join(', ');

    // Open Graph
    const ogTags = {
      'og:title': fullTitle,
      'og:description': metaDesc,
      'og:image': image,
      'og:url': url,
      'og:type': type,
      'og:site_name': 'GSBM – Ganesan School of Business Management',
      'og:locale': 'en_IN'
    };
    Object.entries(ogTags).forEach(([prop, content]) => {
      let tag = document.querySelector(`meta[property="${prop}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', prop);
        document.head.appendChild(tag);
      }
      tag.content = content;
    });

    // Twitter Card
    const twitterTags = {
      'twitter:card': 'summary_large_image',
      'twitter:title': fullTitle,
      'twitter:description': metaDesc,
      'twitter:image': image,
      'twitter:site': '@gsbmchennai'
    };
    Object.entries(twitterTags).forEach(([name, content]) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.name = name;
        document.head.appendChild(tag);
      }
      tag.content = content;
    });

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    // Optional: robots meta (allow indexing)
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement('meta');
      robots.name = 'robots';
      robots.content = 'index, follow';
      document.head.appendChild(robots);
    }
  }, [fullTitle, metaDesc, keywords, image, url, type]);

  return null;
};

export default SEO;