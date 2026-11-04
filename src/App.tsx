import { useEffect, useRef, useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { Services } from './components/Services';
import { VisaExplainer } from './components/VisaExplainer';
import { HowItWorks } from './components/HowItWorks';
import { Flights } from './components/Flights';
import { Destinations } from './components/Destinations';
import { Reviews } from './components/Reviews';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { StickyContact } from './components/StickyContact';
import { FlightPath } from './components/FlightPath';

function MainApp() {
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 767px)').matches : false
  );
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure mobile browsers (iOS Safari / Android Chrome) recognize muted + inline attributes
    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    const attemptPlay = () => {
      video.play().catch(() => {
        // Fallback if mobile OS defers autoplay until first interaction
      });
    };

    attemptPlay();

    const handleInteraction = () => {
      if (video.paused) {
        attemptPlay();
      }
    };

    window.addEventListener('touchstart', handleInteraction, { passive: true, once: true });
    window.addEventListener('scroll', handleInteraction, { passive: true, once: true });
    window.addEventListener('click', handleInteraction, { passive: true, once: true });

    return () => {
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('click', handleInteraction);
    };
  }, [isMobile]);

  const videoSrc = isMobile ? '/dubai-vertical.mp4' : '/dubai.mp4';

  return (
    <div className="min-h-screen flex flex-col selection:bg-pink selection:text-white relative overflow-x-hidden text-white">
      {/* Single Continuous Fullscreen Background Video for Entire Website */}
      <div 
        className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none select-none"
        aria-hidden="true"
      >
        <video
          key={videoSrc}
          ref={videoRef}
          src={videoSrc}
          poster={isMobile ? '/dubai-vertical-poster.jpg' : undefined}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onCanPlay={(e) => {
            e.currentTarget.muted = true;
            e.currentTarget.play().catch(() => {});
          }}
          className="w-full h-full object-cover object-center"
        />
        {/* Seamless cinematic dark shading across the entire viewport */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/60" />
      </div>

      {/* Accessibility Skip Link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[100] px-4 py-2 bg-pink text-white rounded-xl font-bold shadow-lg"
      >
        Skip to main content
      </a>

      {/* Top Navigation */}
      <Navbar />

      {/* Scroll-Linked Flight Path on Desktop */}
      <FlightPath />

      {/* Main Content Sections */}
      <main id="main-content" className="flex-1 relative z-10">
        <Hero />
        <TrustStrip />
        <Services />
        <VisaExplainer />
        <HowItWorks />
        <Flights />
        <Destinations />
        <Reviews />
        <FAQ />
        <Contact />
        <FinalCTA />
      </main>

      <Footer />
      <StickyContact />
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}

export default App;
