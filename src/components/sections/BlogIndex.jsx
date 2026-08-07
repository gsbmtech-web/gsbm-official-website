// src/components/sections/BlogIndex.jsx
//
// Structure modeled on reva.edu.in/blog (dark hero band, category filter
// pills, single-column post list with thumbnail + excerpt + Read More,
// sidebar with search + Recent Posts + contact form) — restyled in GSBM's
// navy/gold. Reads every post from blogPosts.js, so new posts just need
// a `category` field to slot into the filter pills automatically.

import { useState, useMemo, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import blogPosts, { getAllBlogSlugs } from '../../utils/BlogPosts';
import './BlogIndex.css';

const SITE_URL = 'https://gsbm.co.in';

const formatDate = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
};

const BlogIndex = () => {
  const slugs = getAllBlogSlugs();
  const posts = useMemo(
    () => slugs.map((slug) => ({ slug, ...blogPosts[slug] })),
    [slugs]
  );

  const categories = useMemo(() => {
    const set = new Set(posts.map((p) => p.seo.category).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, [posts]);

  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const matchesCategory = activeCategory === 'All' || p.seo.category === activeCategory;
      const matchesSearch =
        !search.trim() || p.h1.toLowerCase().includes(search.trim().toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [posts, activeCategory, search]);

  const recentPosts = posts.slice(0, 6);

  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '' });
  const handleContactChange = useCallback((field) => (e) => {
    setContactForm((prev) => ({ ...prev, [field]: e.target.value }));
  }, []);
  const handleContactSubmit = useCallback((e) => {
    e.preventDefault();
    const body = encodeURIComponent(
      `Name: ${contactForm.name}\nPhone: ${contactForm.phone}\n\n${contactForm.message}`
    );
    window.location.href = `mailto:admissions@gsbm.co.in?subject=${encodeURIComponent(
      'Website enquiry from Blog'
    )}&body=${body}`;
  }, [contactForm]);

  return (
    <div className="blogx">
      <Helmet>
        <title>GSBM Blogs | Ganesan School of Business Management</title>
        <meta
          name="description"
          content="Guides on MBA admissions, specializations, careers, and placements from GSBM — Ganesan School of Business Management, Chennai."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${SITE_URL}/blog`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="GSBM Blogs | Ganesan School of Business Management" />
        <meta
          property="og:description"
          content="Guides on MBA admissions, specializations, careers, and placements from GSBM, Chennai."
        />
        <meta property="og:url" content={`${SITE_URL}/blog`} />
      </Helmet>

      {/* ── Hero band ── */}
      <div className="blogx-hero">
        <div className="blogx-hero-pattern" aria-hidden="true" />
        <div className="blogx-hero-inner">
          <h1>GSBM Blogs</h1>
        </div>
      </div>

      <div className="blogx-body">
        {/* ── Main column ── */}
        <div className="blogx-main">
          <div className="blogx-pills">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`blogx-pill${activeCategory === cat ? ' blogx-pill--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          {filteredPosts.length === 0 ? (
            <p className="blogx-empty">No posts match that search yet — try a different term.</p>
          ) : (
            <div className="blogx-list">
              {filteredPosts.map((post) => (
                <article key={post.slug} className="blogx-item">
                  <h2 className="blogx-item-title">
                    <Link to={`/${post.slug}`}>{post.h1}</Link>
                  </h2>
                  <div className="blogx-item-meta">
                    <span className="blogx-item-date">{formatDate(post.seo.publishedDate)}</span>
                    <span className="blogx-item-dot">|</span>
                    <span className="blogx-item-category">{post.seo.category}</span>
                  </div>
                  <div className="blogx-item-body">
                    <Link to={`/${post.slug}`} className="blogx-item-thumb-link">
                      <img
                        src={`/images/blog/${post.seo.imageFileName}`}
                        alt={post.seo.imageAlt}
                        className="blogx-item-thumb"
                        loading="lazy"
                        width={220}
                        height={148}
                      />
                    </Link>
                    <p className="blogx-item-excerpt">{post.seo.description}</p>
                  </div>
                  <Link to={`/${post.slug}`} className="blogx-readmore">
                    READ MORE
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* ── Sidebar ── */}
        <aside className="blogx-sidebar">
          <div className="blogx-search-block">
            <label htmlFor="blogx-search" className="blogx-sidebar-label">
              Search for:
            </label>
            <input
              id="blogx-search"
              type="text"
              className="blogx-search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder=""
            />
          </div>

          <div className="blogx-recent-panel">
            <h3>Recent Posts</h3>
            <ul>
              {recentPosts.map((post) => (
                <li key={post.slug}>
                  <Link to={`/${post.slug}`}>{post.h1}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="blogx-contact-panel">
            <h3>Contact Form</h3>
            <form onSubmit={handleContactSubmit}>
              <label htmlFor="cf-name">Name</label>
              <input
                id="cf-name"
                type="text"
                placeholder="Please enter name."
                value={contactForm.name}
                onChange={handleContactChange('name')}
                required
              />

              <label htmlFor="cf-email">Email ID</label>
              <input
                id="cf-email"
                type="email"
                placeholder="Please enter email."
                value={contactForm.email}
                onChange={handleContactChange('email')}
                required
              />

              <label htmlFor="cf-phone">Phone</label>
              <input
                id="cf-phone"
                type="tel"
                placeholder="Please enter phone."
                value={contactForm.phone}
                onChange={handleContactChange('phone')}
              />

              <label htmlFor="cf-message">Message</label>
              <textarea
                id="cf-message"
                rows={4}
                value={contactForm.message}
                onChange={handleContactChange('message')}
              />

              <button type="submit" className="blogx-submit">
                Submit
              </button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogIndex;