// src/components/sections/BlogIndex.jsx
//
// Lists every entry in src/data/blogPosts.js as a card linking to its
// slug. New posts appear here automatically — nothing to edit when a
// new post is added to blogPosts.js.

import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import blogPosts, { getAllBlogSlugs } from '../../utils/BlogPosts';
import './BlogIndex.css';

const SITE_URL = 'https://gsbm.co.in';

const BlogIndex = () => {
  const slugs = getAllBlogSlugs();

  return (
    <div className="blog-index">
      <Helmet>
        <title>Blog | GSBM – Ganesan School of Business Management</title>
        <meta
          name="description"
          content="Guides on MBA admissions, specializations, careers, and placements from GSBM — Ganesan School of Business Management, Chennai."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${SITE_URL}/blog`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Blog | GSBM Chennai" />
        <meta
          property="og:description"
          content="Guides on MBA admissions, specializations, careers, and placements from GSBM, Chennai."
        />
        <meta property="og:url" content={`${SITE_URL}/blog`} />
      </Helmet>

      <div className="blog-index-container">
        <h1 className="blog-index-h1">GSBM Blog</h1>
        <p className="blog-index-subhead">
          Guides on MBA admissions, specializations, careers, and placements.
        </p>

        {slugs.length === 0 ? (
          <p className="blog-index-empty">More guides are on the way — check back soon.</p>
        ) : (
          <div className="blog-index-grid">
            {slugs.map((slug) => {
              const post = blogPosts[slug];
              return (
                <Link key={slug} to={`/${slug}`} className="blog-index-card">
                  <h2 className="blog-index-card-title">{post.h1}</h2>
                  <p className="blog-index-card-desc">{post.seo.description}</p>
                  <span className="blog-index-card-cta">Read more →</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogIndex;