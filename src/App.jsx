import { lazy, Suspense, useEffect, memo } from 'react';
import { Analytics } from "@vercel/analytics/react"
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import ErrorBoundary from './components/ErrorBoundary';
import SectionLoader from './components/ui/SectionLoader';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FloatingActions from './components/layout/FloatingActions';
import ApplyNow from './components/sections/Applynow';
import NotFound from './components/ui/NotFound';
import ThankYou from './components/sections/ThankYou.jsx';

// Eager — above-the-fold, first thing anyone sees on Home. Code-splitting
// these caused a visible pop-in/layout-shift on first paint.
import Hero from './components/sections/Hero';
import LogoStrip from './components/sections/LogoStrip';

// ─── Lazy sections (below-the-fold — fine to code-split) ─────────────────────
const About = lazy(() => import('./components/sections/About'));
const Leadership = lazy(() => import('./components/sections/Leadership'));
const Programs = lazy(() => import('./components/sections/Programs'));
const Gsbmwhy = lazy(() => import('./components/sections/Gsbmwhy.jsx'));
const Campus = lazy(() => import('./components/sections/Campus'));
const GIECSection = lazy(() => import('./components/sections/GIECSection.jsx'));
const Admissions = lazy(() => import('./components/sections/Admissions'));
const Faculty = lazy(() => import('./components/sections/Faculty'));
const Placements = lazy(() => import('./components/sections/Placements'));
const Contact = lazy(() => import('./components/sections/Contact'));
const Calbutton = lazy(() => import('./components/sections/Calbutton.jsx'));
const PrivacyPolicy = lazy(() => import('./components/sections/PrivacyPolicy.jsx'));

// Blog — BlogIndex lists every post; BlogPost renders one, looked up
// by the :slug URL param against src/data/blogPosts.js.
const BlogIndex = lazy(() => import('./components/sections/BlogIndex.jsx'));
const BlogPost = lazy(() => import('./components/sections/BlogPost.jsx'));

// ─── LazySection ─────────────────────────────────────────────────────────────
// minHeight is a rough estimate of the section's real rendered height, used
// only for the loading skeleton so nothing shoves the layout around as each
// lazy section pops in. These are estimates — check real rendered heights
// in the browser and tighten them if anything still visibly jumps.
const LazySection = ({ children, minHeight }) => (
  <Suspense fallback={<SectionLoader minHeight={minHeight} />}>
    {children}
  </Suspense>
);

// ─── ScrollToTop ──────────────────────────────────────────────────────────────
// Standard multi-page behaviour: every route change resets scroll to top.
const ScrollToTop = memo(() => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
});
ScrollToTop.displayName = 'ScrollToTop';

// ─── SEO meta per page ─────────────────────────────────────────────────────
// Placeholder copy — swap for real, reviewed copy before this ships.
const PAGE_META = {
  home: {
    title: 'GSBM – Ganesan School of Business Management | MBA College Chennai',
    description: "Transform your career with GSBM's industry-focused MBA programs. AICTE approved, VMRF-DU affiliated. Apply now for the 2026–2028 batch.",
    path: '/',
  },
  about: {
    title: 'About GSBM | Ganesan School of Business Management, Chennai',
    description: 'Approvals, accreditation, vision, mission, and leadership at Ganesan School of Business Management — an AICTE approved MBA institution in Chennai.',
    path: '/about',
  },
  leadership: {
    title: 'Leadership | GSBM Chennai',
    description: 'Meet the leadership of Ganesan School of Business Management — Chancellor, Patrons, and Director.',
    path: '/leadership',
  },
  programs: {
    title: 'MBA Programmes & Specialisations | GSBM Chennai',
    description: "Explore GSBM's MBA specialisations in Chennai — Marketing, HR, Finance, Business Analytics & AI, Operations, Logistics, and Healthcare Management.",
    path: '/programs',
  },
  admissions: {
    title: 'MBA Admissions 2026 | GSBM Chennai',
    description: 'GSBM MBA admissions 2026 — eligibility, entrance exams accepted, the step-by-step process, and key dates.',
    path: '/admissions',
  },
  faculty: {
    title: 'Faculty | GSBM Chennai',
    description: "Meet the faculty at GSBM — doctoral credentials and real corporate experience behind Chennai's industry-focused MBA programme.",
    path: '/faculty',
  },
  placements: {
    title: 'Placements | GSBM Chennai',
    description: 'GSBM MBA placement training, recruiter partners, and student success stories.',
    path: '/placements',
  },
  campus: {
    title: 'Campus & Infrastructure | GSBM Chennai',
    description: "Explore GSBM's campus on Old Mahabalipuram Road (OMR), Chennai — smart classrooms, library, labs, sports facilities, and the Ganesan Incubation and Entrepreneurship Centre.",
    path: '/campus',
  },
  contact: {
    title: 'Contact GSBM | Ganesan School of Business Management, Chennai',
    description: 'Get in touch with GSBM admissions — phone, email, WhatsApp, campus address, and location map.',
    path: '/contact',
  },
};

const PageHelmet = ({ meta }) => (
  <Helmet>
    <title>{meta.title}</title>
    <meta name="description" content={meta.description} />
    <meta name="robots" content="index, follow" />
    <meta property="og:title" content={meta.title} />
    <meta property="og:description" content={meta.description} />
    <meta property="og:image" content="/og-image.jpg" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="canonical" href={`https://gsbm.co.in${meta.path === '/' ? '' : meta.path}`} />
  </Helmet>
);

// ─── Standalone-page layout ──────────────────────────────────────────────────
// Every dedicated section page uses this: Navbar + that section's content +
// Footer, own ErrorBoundary, own SEO meta — same shape as the existing
// ApplyPage.
const StandalonePage = ({ metaKey, children }) => (
  <ErrorBoundary>
    <Navbar />
    <main id="main-content" tabIndex={-1}>
      <PageHelmet meta={PAGE_META[metaKey]} />
      {children}
    </main>
    <Footer />
  </ErrorBoundary>
);

// ─── HomePage ─────────────────────────────────────────────────────────────────
// The full one-page scroll — every section, in order, exactly like the
// original site.
const HomePage = () => (
  <ErrorBoundary>
    <Navbar />
    <main id="main-content" tabIndex={-1}>
      <PageHelmet meta={PAGE_META.home} />
      <Hero />
      <LogoStrip />
      <Suspense fallback={<SectionLoader minHeight={900} />}><About /></Suspense>
      <LazySection minHeight={1400}><Leadership /></LazySection>
      <LazySection minHeight={800}><Programs /></LazySection>
      <LazySection minHeight={700}><Gsbmwhy /></LazySection>
      <LazySection minHeight={900}><Campus /></LazySection>
      <LazySection minHeight={500}><GIECSection /></LazySection>
      <LazySection minHeight={1000}><Admissions /></LazySection>
      <LazySection minHeight={600}><Faculty /></LazySection>
      <LazySection minHeight={800}><Placements /></LazySection>
      <LazySection minHeight={500}><Contact /></LazySection>
      <LazySection minHeight={300}><Calbutton /></LazySection>
    </main>
    <Footer />
  </ErrorBoundary>
);

// ─── Dedicated section pages ──────────────────────────────────────────────────
const AboutPage = () => (
  <StandalonePage metaKey="about">
    <LazySection minHeight={900}><About /></LazySection>
    <LazySection minHeight={300}><Calbutton /></LazySection>
  </StandalonePage>
);

const LeadershipPage = () => (
  <StandalonePage metaKey="leadership">
    <LazySection minHeight={1400}><Leadership /></LazySection>
    <LazySection minHeight={300}><Calbutton /></LazySection>
  </StandalonePage>
);

const ProgramsPage = () => (
  <StandalonePage metaKey="programs">
    <LazySection minHeight={800}><Programs /></LazySection>
    <LazySection minHeight={300}><Calbutton /></LazySection>
  </StandalonePage>
);

const AdmissionsPage = () => (
  <StandalonePage metaKey="admissions">
    <LazySection minHeight={1000}><Admissions /></LazySection>
  </StandalonePage>
);

const FacultyPage = () => (
  <StandalonePage metaKey="faculty">
    <LazySection minHeight={600}><Faculty /></LazySection>
    <LazySection minHeight={300}><Calbutton /></LazySection>
  </StandalonePage>
);

const PlacementsPage = () => (
  <StandalonePage metaKey="placements">
    <LazySection minHeight={800}><Placements /></LazySection>
    <LazySection minHeight={300}><Calbutton /></LazySection>
  </StandalonePage>
);

const CampusPage = () => (
  <StandalonePage metaKey="campus">
    <LazySection minHeight={900}><Campus /></LazySection>
    <LazySection minHeight={500}><GIECSection /></LazySection>
    <LazySection minHeight={300}><Calbutton /></LazySection>
  </StandalonePage>
);

const ContactPage = () => (
  <StandalonePage metaKey="contact">
    <LazySection minHeight={500}><Contact /></LazySection>
  </StandalonePage>
);

// ─── ApplyNow page layout ─────────────────────────────────────────────────────
const ApplyPage = () => (
  <>
    <Navbar />
    <main id="main-content" tabIndex={-1}>
      <Suspense fallback={<SectionLoader />}>
        <ApplyNow />
      </Suspense>
    </main>
    <Footer />
  </>
);

// ─── Blog index page layout ─────────────────────────────────────────────────────
// <BlogIndex> builds its own <Helmet>, same idea as BlogPostPage below.
const BlogIndexPage = () => (
  <ErrorBoundary>
    <Navbar />
    <main id="main-content" tabIndex={-1}>
      <LazySection minHeight={800}>
        <BlogIndex />
      </LazySection>
    </main>
    <Footer />
  </ErrorBoundary>
);

// ─── Blog post page layout ─────────────────────────────────────────────────────
// <BlogPost> builds its own <Helmet> (title/description/canonical/OG/
// JSON-LD) from the matching entry in src/data/blogPosts.js, keyed by
// the :slug route param — so this wrapper only needs Navbar/Footer/
// ErrorBoundary, same shape as every other StandalonePage.
const BlogPostPage = () => (
  <ErrorBoundary>
    <Navbar />
    <main id="main-content" tabIndex={-1}>
      <LazySection minHeight={1200}>
        <BlogPost />
      </LazySection>
      <LazySection minHeight={300}><Calbutton /></LazySection>
    </main>
    <Footer />
  </ErrorBoundary>
);

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <ScrollToTop />
        <FloatingActions />

        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/about" element={<AboutPage />} />
          <Route path="/leadership" element={<LeadershipPage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/admissions" element={<AdmissionsPage />} />
          <Route path="/faculty" element={<FacultyPage />} />
          <Route path="/placements" element={<PlacementsPage />} />
          <Route path="/campus" element={<CampusPage />} />
          <Route path="/contact" element={<ContactPage />} />

          <Route path="/apply" element={
            <ErrorBoundary>
              <ApplyPage />
            </ErrorBoundary>
          } />

          {/* ── Thank You page ── */}
          <Route path="/thank-you" element={
            <ErrorBoundary>
              <ThankYou />
            </ErrorBoundary>
          } />

          {/* ── Privacy Policy page ── */}
          <Route path="/privacy-policy" element={
            <ErrorBoundary>
              <Navbar />
              <Suspense fallback={<SectionLoader />}>
                <PrivacyPolicy />
              </Suspense>
              <Footer />
            </ErrorBoundary>
          } />

          {/* ── Blog index — must come before the /:slug route below,
               otherwise /:slug would match "blog" as a slug first. ── */}
          <Route path="/blog" element={<BlogIndexPage />} />

          {/* ── Blog posts — any slug present in src/data/blogPosts.js.
               Kept last (before the catch-all) so it never shadows a
               real page path like /about or /programs. BlogPost renders
               <NotFound /> itself when the slug isn't a known post. ── */}
          <Route path="/:slug" element={<BlogPostPage />} />

          <Route path="*" element={
            <ErrorBoundary>
              <Suspense fallback={<SectionLoader />}>
                <NotFound />
              </Suspense>
            </ErrorBoundary>
          } />
        </Routes>

      </BrowserRouter>
    </HelmetProvider>
  );
}