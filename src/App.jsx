// ===== FILE: src/App.jsx =====
import { lazy, Suspense } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Lazy load all section components
const Hero = lazy(() => import('./components/sections/Hero'));
const About = lazy(() => import('./components/sections/About'));
const Leadership = lazy(() => import('./components/sections/Leadership'));
const Programs = lazy(() => import('./components/sections/Programs'));
const WhyGSBM = lazy(() => import('./components/sections/WhyGSBM'));
const Campus = lazy(() => import('./components/sections/Campus'));
const Admissions = lazy(() => import('./components/sections/Admissions'));
const Faculty = lazy(() => import('./components/sections/Faculty'));
const Placements = lazy(() => import('./components/sections/Placements'));
const Contact = lazy(() => import('./components/sections/Contact'));
const CTABanner = lazy(() => import('./components/sections/CTABanner'));

// Optional: a simple loading fallback
const SectionLoader = () => <div style={{ minHeight: '200px' }} />;

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Suspense fallback={<SectionLoader />}>
          <Hero />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Leadership />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Programs />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <WhyGSBM />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Campus />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Admissions />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Faculty />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Placements />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <CTABanner />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}