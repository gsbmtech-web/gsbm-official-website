// src/components/sections/BlogPost.jsx
//
// Generic renderer for any entry in src/data/blogPosts.js. Handles SEO
// meta tags, Open Graph/Twitter tags, canonical URL, and JSON-LD
// (Article + FAQPage — the FAQPage schema is what lets FAQ content show
// up as rich results / gets picked up by AI answer engines).
//
// Usage: <BlogPost slug="top-mba-colleges-in-chennai" />

import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { getBlogPost } from '../../utils/BlogPosts';
import NotFound from '../ui/NotFound';
import './BlogPost.css';

const SITE_URL = 'https://gsbm.co.in';

// Turns **bold** markers into <strong> without pulling in a full markdown
// parser — the SEO content only ever needs this one inline style.
const renderInline = (text) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
};

const Paragraph = ({ children }) => <p className="blog-paragraph">{renderInline(children)}</p>;

const BlogPost = ({ slug: slugProp }) => {
  const { slug: slugParam } = useParams();
  const slug = slugProp || slugParam;
  const post = getBlogPost(slug);

  if (!post) return <NotFound />;

  const { seo, h1, sections, howTo, faqs, finalNote } = post;
  const canonical = seo.canonicalUrl || `${SITE_URL}/${seo.slug}`;
  const imageUrl = `${SITE_URL}/images/blog/${seo.imageFileName}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: h1,
    description: seo.description,
    image: imageUrl,
    author: { '@type': 'Organization', name: 'GSBM - Ganesan School of Business Management' },
    publisher: {
      '@type': 'Organization',
      name: 'GSBM - Ganesan School of Business Management',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
    datePublished: seo.publishedDate,
    dateModified: seo.modifiedDate || seo.publishedDate,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
  };

  const faqSchema = faqs?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      }
    : null;

  return (
    <article className="blog-post">
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonical} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={canonical} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={imageUrl} />

        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
      </Helmet>

      <div className="blog-post-container">
        <img
          src={`/images/blog/${seo.imageFileName}`}
          alt={seo.imageAlt}
          className="blog-hero-image"
          width={seo.imageWidth || 1536}
          height={seo.imageHeight || 1024}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />

        <h1 className="blog-h1">{h1}</h1>

        {sections.map((section) => (
          <section key={section.heading} className="blog-section">
            <h2>{section.heading}</h2>
            {section.paragraphs.map((p, i) => (
              <Paragraph key={i}>{p}</Paragraph>
            ))}
            {section.list && (
              <ul className="blog-list">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            {section.paragraphsAfterList?.map((p, i) => (
              <Paragraph key={`after-${i}`}>{p}</Paragraph>
            ))}
          </section>
        ))}

        {howTo && (
          <section className="blog-section blog-howto">
            <h2>{howTo.heading}</h2>
            {howTo.items.map((item) => (
              <div key={item.title} className="blog-howto-item">
                <h3>{item.title}</h3>
                {item.paragraphs.map((p, i) => (
                  <Paragraph key={i}>{p}</Paragraph>
                ))}
              </div>
            ))}
          </section>
        )}

        {faqs?.length > 0 && (
          <section className="blog-section blog-faq">
            <h2>Frequently Asked Questions (FAQs)</h2>
            {faqs.map((f, i) => (
              <div key={f.question} className="blog-faq-item">
                <h3>
                  {i + 1}. {f.question}
                </h3>
                <p className="blog-paragraph">{f.answer}</p>
              </div>
            ))}
          </section>
        )}

        {finalNote && (
          <section className="blog-section">
            <h2>{finalNote.heading}</h2>
            {finalNote.paragraphs.map((p, i) => (
              <Paragraph key={i}>{p}</Paragraph>
            ))}
          </section>
        )}
      </div>
    </article>
  );
};

export default BlogPost;