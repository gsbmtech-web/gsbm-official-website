import { lazy, Suspense, useEffect, useRef, useState, memo } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import ErrorBoundary from './components/ErrorBoundary';
import SectionLoader from './components/ui/SectionLoader';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ApplyNow from './components/sections/Applynow';
import NotFound from './components/ui/NotFound';

// ─── Lazy sections ────────────────────────────────────────────────────────────
// ALL sections are lazy — including GIECSection (was incorrectly a static import)
const Hero        = lazy(() => import('./components/sections/Hero'));
const LogoStrip   = lazy(() => import('./components/sections/LogoStrip'));
const About       = lazy(() => import('./components/sections/About'));
const Leadership  = lazy(() => import('./components/sections/Leadership'));
const Programs    = lazy(() => import('./components/sections/Programs'));
const Gsbmwhy     = lazy(() => import('./components/sections/Gsbmwhy.jsx'));
const Campus      = lazy(() => import('./components/sections/Campus'));
const GIECSection = lazy(() => import('./components/sections/GIECSection.jsx')); // ✅ fixed: was static import
const Admissions  = lazy(() => import('./components/sections/Admissions'));
const Faculty     = lazy(() => import('./components/sections/Faculty'));
const Placements  = lazy(() => import('./components/sections/Placements'));
const Contact     = lazy(() => import('./components/sections/Contact'));
const Calbutton   = lazy(() => import('./components/sections/Calbutton.jsx'));

// ─── LazySection ─────────────────────────────────────────────────────────────
// Delays rendering a section until user scrolls within 300px of it.
// Use this for everything below the fold to avoid downloading unused chunks.
const LazySection = ({ children, fallback }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' } // start loading 300px before it enters view
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {visible
        ? <Suspense fallback={fallback ?? <SectionLoader />}>{children}</Suspense>
        : (fallback ?? <SectionLoader />)
      }
    </div>
  );
};

// ─── ScrollToTop ──────────────────────────────────────────────────────────────
const ScrollToTop = memo(() => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = setTimeout(() => {
        const el = document.querySelector(hash);
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      return () => clearTimeout(id);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);
  return null;
});
ScrollToTop.displayName = 'ScrollToTop';

// ─── HomePage ─────────────────────────────────────────────────────────────────
// KEY FIX: Every section now has its OWN Suspense boundary.
// Hero loads and renders immediately. Every other section loads independently.
// Sections below the fold use LazySection so they don't even start downloading
// until the user scrolls near them.
const HomePage = () => (
  <main id="main-content" tabIndex={-1}>

    {/* ── Above the fold: load immediately, own Suspense ── */}
    <Suspense fallback={<SectionLoader />}>
      <Hero />
    </Suspense>

    <Suspense fallback={<SectionLoader />}>
      <LogoStrip />
    </Suspense>

    <Suspense fallback={<SectionLoader />}>
      <About />
    </Suspense>

    {/* ── Below the fold: use LazySection (only downloads when near viewport) ── */}
    <LazySection>
      <Leadership />
    </LazySection>

    <LazySection>
      <Programs />
    </LazySection>

    <LazySection>
      <Gsbmwhy />
    </LazySection>

    <LazySection>
      <Campus />
    </LazySection>

    <LazySection>
      <GIECSection />
    </LazySection>

    <LazySection>
      <Admissions />
    </LazySection>

    <LazySection>
      <Faculty />
    </LazySection>

    <LazySection>
      <Placements />
    </LazySection>

    <LazySection>
      <Contact />
    </LazySection>

    <LazySection>
      <Calbutton />
    </LazySection>

  </main>
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

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    // HelmetProvider replaces the custom MetaTags component.
    // react-helmet-async was already in your package.json but unused!
    <HelmetProvider>
      <BrowserRouter>
        <Helmet>
          <title>GSBM – Global School of Business Management</title>
          <meta name="description" content="Transform your career with GSBM's industry-focused MBA programs. Apply now for the 2026–2028 batch." />
          <meta name="robots" content="index, follow" />
          <meta property="og:title" content="GSBM – Global School of Business Management" />
          <meta property="og:description" content="Transform your career with GSBM's industry-focused MBA programs." />
          <meta property="og:image" content="/og-image.jpg" />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <link rel="canonical" href="https://mba-webpage.vercel.app" />
        </Helmet>

        <a href="#main-content" className="skip-link">Skip to main content</a>
        <ScrollToTop />

        <Routes>
          <Route path="/" element={
            <ErrorBoundary>
              <Navbar />
              <HomePage />
              <Footer />
            </ErrorBoundary>
          } />

          <Route path="/apply" element={
            <ErrorBoundary>
              <ApplyPage />
            </ErrorBoundary>
          } />

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