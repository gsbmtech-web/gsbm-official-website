// src/components/sections/BlogPost.jsx
//
// Generic renderer for any entry in the blogPosts registry. Handles SEO
// meta tags, Open Graph/Twitter tags, canonical URL, and JSON-LD
// (Article + FAQPage + HowTo — the FAQPage and HowTo schemas are what let
// this content show up as rich results / get picked up by AI answer
// engines).
//
// Supported per-post fields:
//   intro        — array of paragraphs rendered above the first H2
//   sections[]   — { heading, paragraphs, list, paragraphsAfterList,
//                    subsections: [{ title, paragraphs }],
//                    table: { caption, headers, rows } }
//   howTo        — { heading, description, items: [{ title, paragraphs }] }
//   faqs         — [{ question, answer }]
//   finalNote    — { heading, paragraphs }
//
// Paragraph text supports **bold** and [label](url) links. Links starting
// with "/" render as react-router <Link> (SPA navigation, no reload);
// everything else renders as an external anchor with rel="noopener".

import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { getBlogPost } from '../../utils/BlogPosts';
import NotFound from '../ui/NotFound';
import './BlogPost.css';

const SITE_URL = 'https://www.gsbm.co.in';

// Splits on **bold** and [label](url) in one pass, so the SEO content can
// use both without pulling in a full markdown parser.
const INLINE_RE = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;

const renderInline = (text) =>
  text.split(INLINE_RE).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }

    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const [, label, href] = link;
      return href.startsWith('/') ? (
        <Link key={i} to={href} className="blog-link">
          {label}
        </Link>
      ) : (
        <a
          key={i}
          href={href}
          className="blog-link blog-link--external"
          target="_blank"
          rel="noopener noreferrer"
        >
          {label}
        </a>
      );
    }

    return <span key={i}>{part}</span>;
  });

const Paragraph = ({ children }) => <p className="blog-paragraph">{renderInline(children)}</p>;

const BlogTable = ({ table }) => (
  <div className="blog-table-wrap">
    <table className="blog-table">
      {table.caption && <caption className="blog-table-caption">{table.caption}</caption>}
      <thead>
        <tr>
          {table.headers.map((h) => (
            <th key={h} scope="col">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {table.rows.map((row) => (
          <tr key={row[0]}>
            {row.map((cell, i) =>
              i === 0 ? (
                <th key={i} scope="row">
                  {cell}
                </th>
              ) : (
                <td key={i}>{cell}</td>
              )
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const BlogPost = ({ slug: slugProp }) => {
  const { slug: slugParam } = useParams();
  const slug = slugProp || slugParam;
  const post = getBlogPost(slug);

  if (!post) return <NotFound />;

  const { seo, h1, intro, sections, howTo, faqs, finalNote } = post;
  const canonical = seo.canonicalUrl || `${SITE_URL}/${seo.slug}`;
  const imageUrl = `${SITE_URL}/images/blog/${seo.imageFileName}`;
  // Social platforms centre-crop to a square, which cuts the headline off a
  // wide hero — use the square variant for OG/Twitter when one is provided.
  const socialImageUrl = seo.socialImageFileName
    ? `${SITE_URL}/images/blog/${seo.socialImageFileName}`
    : imageUrl;

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

  // HowTo schema — only emitted when the steps are actually visible on the
  // page, which is Google's requirement for this markup.
  const howToSchema = howTo?.items?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: howTo.heading,
        description: howTo.description || seo.description,
        step: howTo.items.map((item, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: item.title,
          text: item.paragraphs.join(' '),
          url: `${canonical}#howto-step-${i + 1}`,
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
        <meta property="og:image" content={socialImageUrl} />
        <meta property="og:url" content={canonical} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={socialImageUrl} />

        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
        {howToSchema && <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>}
      </Helmet>

      <div className="blog-post-container">
        <img
          src={`/images/blog/${seo.imageFileName}`}
          alt={seo.imageAlt}
          title={seo.imageTitle || seo.imageAlt}
          className="blog-hero-image"
          width={seo.imageWidth || 1536}
          height={seo.imageHeight || 1024}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />

        <h1 className="blog-h1">{h1}</h1>

        {intro?.length > 0 && (
          <div className="blog-intro">
            {intro.map((p, i) => (
              <Paragraph key={i}>{p}</Paragraph>
            ))}
          </div>
        )}

        {sections.map((section) => (
          <section key={section.heading} className="blog-section">
            <h2>{section.heading}</h2>
            {section.paragraphs?.map((p, i) => (
              <Paragraph key={i}>{p}</Paragraph>
            ))}
            {section.list && (
              <ul className="blog-list">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            {section.table && <BlogTable table={section.table} />}
            {section.subsections?.map((sub) => (
              <div key={sub.title} className="blog-subsection">
                <h3>{sub.title}</h3>
                {sub.paragraphs.map((p, i) => (
                  <Paragraph key={i}>{p}</Paragraph>
                ))}
              </div>
            ))}
            {section.paragraphsAfterList?.map((p, i) => (
              <Paragraph key={`after-${i}`}>{p}</Paragraph>
            ))}
          </section>
        ))}

        {howTo && (
          <section className="blog-section blog-howto">
            <h2>{howTo.heading}</h2>
            {howTo.items.map((item, i) => (
              <div key={item.title} id={`howto-step-${i + 1}`} className="blog-howto-item">
                <h3>{item.title}</h3>
                {item.paragraphs.map((p, j) => (
                  <Paragraph key={j}>{p}</Paragraph>
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