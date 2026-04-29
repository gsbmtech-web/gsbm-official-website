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
const Hero        = lazy(() => import('./components/sections/Hero'));
const LogoStrip   = lazy(() => import('./components/sections/LogoStrip'));
const About       = lazy(() => import('./components/sections/About'));
const Leadership  = lazy(() => import('./components/sections/Leadership'));
const Programs    = lazy(() => import('./components/sections/Programs'));
const Gsbmwhy     = lazy(() => import('./components/sections/Gsbmwhy.jsx'));
const Campus      = lazy(() => import('./components/sections/Campus'));
const GIECSection = lazy(() => import('./components/sections/GIECSection.jsx'));
const Admissions  = lazy(() => import('./components/sections/Admissions'));
const Faculty     = lazy(() => import('./components/sections/Faculty'));
const Placements  = lazy(() => import('./components/sections/Placements'));
const Contact     = lazy(() => import('./components/sections/Contact'));
const Calbutton   = lazy(() => import('./components/sections/Calbutton.jsx'));

// ─── LazySection ─────────────────────────────────────────────────────────────
// FIX: Removed the IntersectionObserver gate. All sections now mount immediately
// on page load so their IDs exist in the DOM when navbar links are clicked from
// any scroll position. JS chunks are still code-split via React.lazy above —
// only the render-blocking gate is removed.
const LazySection = ({ children, fallback }) => (
  <Suspense fallback={fallback ?? <SectionLoader />}>
    {children}
  </Suspense>
);

// ─── ScrollToTop ──────────────────────────────────────────────────────────────
const ScrollToTop = memo(() => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          const nav  = document.querySelector('.gsbm-nav');
          const navH = nav ? nav.getBoundingClientRect().height : 80;
          const top  = el.getBoundingClientRect().top + window.scrollY - navH;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 300);
      return () => clearTimeout(id);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  return null;
});
ScrollToTop.displayName = 'ScrollToTop';

// ─── HomePage ─────────────────────────────────────────────────────────────────
const HomePage = () => (
  <main id="main-content" tabIndex={-1}>

    <Suspense fallback={<SectionLoader />}>
      <Hero />
    </Suspense>

    <Suspense fallback={<SectionLoader />}>
      <LogoStrip />
    </Suspense>

    <Suspense fallback={<SectionLoader />}>
      <About />
    </Suspense>

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
    <HelmetProvider>
      <BrowserRouter>
        <Helmet>
          <title>GSBM – Ganesan School of Business Management</title>
          <meta name="description" content="Transform your career with GSBM's industry-focused MBA programs. Apply now for the 2026–2028 batch." />
          <meta name="robots" content="index, follow" />
          <meta property="og:title" content="GSBM – Ganesan School of Business Management" />
          <meta property="og:description" content="Transform your career with GSBM's industry-focused MBA programs." />
          <meta property="og:image" content="/og-image.jpg" />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <link rel="canonical" href="https://gsbm.co.in" />
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