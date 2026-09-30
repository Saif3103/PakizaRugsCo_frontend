import './index.css';
import './App.css';

// ── Existing components (unchanged) ───────────────────────────
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import Heritage from './components/Heritage';
import Founder from './components/Founder';
import RugViewer360 from './components/RugViewer360';
import GlobeCTA from './components/GlobeCTA';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

// ── NEW premium sections ───────────────────────────────────────
import FabricDivider from './components/FabricDivider';
import RugShowcase3D from './components/RugShowcase3D';
import CraftsmanshipReveal from './components/CraftsmanshipReveal';
import AIRugConcierge from './components/AIRugConcierge';
import RoomMoodSwitch from './components/RoomMoodSwitch';
import MacroTexture from './components/MacroTexture';
import CustomRugStudio from './components/CustomRugStudio';
import PremiumTrust from './components/PremiumTrust';
import GlobalShippingMap from './components/GlobalShippingMap';

function App() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        {/* ── HERO (untouched) ── */}
        <Hero />

        {/* ── FABRIC DIVIDER ── */}
        <FabricDivider />

        {/* ── 3D RUG SHOWCASE (NEW) ── */}
        <RugShowcase3D />

        {/* ── PRODUCTS (existing) ── */}
        <Products />

        {/* ── FABRIC DIVIDER ── */}
        <FabricDivider flip />

        {/* ── CRAFTSMANSHIP REVEAL (NEW) ── */}
        <CraftsmanshipReveal />

        {/* ── HERITAGE (existing) ── */}
        <Heritage />

        {/* ── PREMIUM TRUST CARDS (NEW) ── */}
        <PremiumTrust />

        {/* ── FABRIC DIVIDER ── */}
        <FabricDivider />

        {/* ── AI RUG CONCIERGE (NEW) ── */}
        <AIRugConcierge />

        {/* ── ROOM MOOD SWITCH (NEW) ── */}
        <RoomMoodSwitch />

        {/* ── MACRO TEXTURE EXPERIENCE (NEW) ── */}
        <MacroTexture />

        {/* ── FABRIC DIVIDER ── */}
        <FabricDivider flip />

        {/* ── CUSTOM RUG STUDIO (NEW) ── */}
        <CustomRugStudio />

        {/* ── FOUNDER (existing) ── */}
        <Founder />

        {/* ── RUG VIEWER 360 (existing) ── */}
        <RugViewer360 />

        {/* ── GLOBAL SHIPPING MAP (NEW) ── */}
        <GlobalShippingMap />

        {/* ── FABRIC DIVIDER ── */}
        <FabricDivider />

        {/* ── GLOBE CTA (existing) ── */}
        <GlobeCTA />

        {/* ── TESTIMONIALS (existing) ── */}
        <Testimonials />

        {/* ── CONTACT (existing) ── */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
