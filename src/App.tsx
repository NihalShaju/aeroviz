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
  return (
    <div className="min-h-screen flex flex-col selection:bg-pink selection:text-white relative overflow-x-hidden text-white">
      {/* Single Continuous Fullscreen Background Video for Entire Website */}
      <div 
        className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none select-none"
        aria-hidden="true"
      >
        {/* Mobile Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="block md:hidden w-full h-full object-cover object-center"
        >
          <source src="/dubai vertical.mp4" type="video/mp4" />
        </video>

        {/* Desktop Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hidden md:block w-full h-full object-cover object-center"
        >
          <source src="/dubai.mp4" type="video/mp4" />
        </video>
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
