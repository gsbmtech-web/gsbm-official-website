import { lazy, Suspense, useEffect, memo } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import SectionLoader from './components/ui/SectionLoader';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ApplyNow from './components/sections/Applynow';
import NotFound from './components/ui/NotFound';

// ─── Meta tag manager ───────────────────────────────────────────────────────
const MetaTags = memo(({ title, description, url, image }) => {
  useEffect(() => {
    const t = title || 'GSBM – Global School of Business Management';
    const d = description || "Transform your career with GSBM's industry-focused programs.";
    const u = url || window.location.href;
    const img = image || '/og-image.jpg';

    document.title = t;

    const setMeta = (sel, attr, val) => {
      let el = document.querySelector(sel);
      if (!el) {
        el = document.createElement('meta');
        if (sel.includes('property=')) el.setAttribute('property', sel.match(/property="([^"]+)"/)[1]);
        else if (sel.includes('name=')) el.setAttribute('name', sel.match(/name="([^"]+)"/)[1]);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, val);
    };

    setMeta('meta[name="description"]',         'content', d);
    setMeta('meta[name="robots"]',              'content', 'index, follow');
    setMeta('meta[property="og:title"]',        'content', t);
    setMeta('meta[property="og:description"]',  'content', d);
    setMeta('meta[property="og:url"]',          'content', u);
    setMeta('meta[property="og:image"]',        'content', img);
    setMeta('meta[property="og:type"]',         'content', 'website');
    setMeta('meta[name="twitter:card"]',        'content', 'summary_large_image');
    setMeta('meta[name="twitter:title"]',       'content', t);
    setMeta('meta[name="twitter:description"]', 'content', d);
    setMeta('meta[name="twitter:image"]',       'content', img);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = u;
  }, [title, description, url, image]);

  return null;
});
MetaTags.displayName = 'MetaTags';

// ─── Lazy sections ───────────────────────────────────────────────────────────
const Hero       = lazy(() => import('./components/sections/Hero'));
const LogoStrip  = lazy(() => import('./components/sections/LogoStrip'));
const About      = lazy(() => import('./components/sections/About'));
const Leadership = lazy(() => import('./components/sections/Leadership'));
const Programs   = lazy(() => import('./components/sections/Programs'));
const Whygsbm = lazy(() => import('./components/sections/whygsbm.jsx'));
const Campus     = lazy(() => import('./components/sections/Campus'));
const Admissions = lazy(() => import('./components/sections/Admissions'));
const Faculty    = lazy(() => import('./components/sections/Faculty'));
const Placements = lazy(() => import('./components/sections/Placements'));
const Contact    = lazy(() => import('./components/sections/Contact'));
const Ctabanner = lazy(() => import('./components/sections/ctabanner.jsx'));

// ─── ScrollToTop ─────────────────────────────────────────────────────────────
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
const HomePage = () => (
  <main id="main-content" tabIndex={-1}>
    <Suspense fallback={<SectionLoader />}>
      <Hero />
      <LogoStrip />
      <About />
      <Leadership />
      <Programs />
      <Whygsbm />      {/* ✅ matches import */}
      <Campus />
      <Admissions />
      <Faculty />
      <Placements />
      <Contact />
      <Ctabanner />    {/* ✅ matches import */}
    </Suspense>
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

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <MetaTags
        title="GSBM – Global School of Business Management"
        description="Transform your career with GSBM's industry-focused MBA programs. Apply now for the 2026–2028 batch."
        image="/og-image.jpg"
      />
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
  );
}