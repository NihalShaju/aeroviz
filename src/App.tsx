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
    <div className="min-h-screen flex flex-col selection:bg-pink-100 selection:text-pink-700 relative overflow-x-hidden bg-white text-slate-900">
      {/* Accessibility Skip Link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[100] px-4 py-2 bg-pink text-white rounded-xl font-bold shadow-lg"
      >
        Skip to main content
      </a>

      {/* Floating Navbar */}
      <Navbar />

      {/* Scroll-Linked Flight Path on Desktop */}
      <FlightPath />

      {/* Main Content Sections */}
      <main id="main-content" className="flex-1">
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
