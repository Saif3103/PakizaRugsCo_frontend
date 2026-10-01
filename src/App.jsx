import './index.css';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// ── Pages ─────────────────────────────────────────────────────
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminAddProduct from './pages/admin/AdminAddProduct';
import AdminOrders from './pages/admin/AdminOrders';
import AdminCustomers from './pages/admin/AdminCustomers';

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

// Protected admin route
function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="auth-loading"><span className="auth-btn__spinner" /></div>;
  if (!user || user.role !== 'admin') return <Navigate to="/login" replace />;
  return children;
}

function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FabricDivider />
        <RugShowcase3D />
        <Products />
        <FabricDivider flip />
        <CraftsmanshipReveal />
        <Heritage />
        <PremiumTrust />
        <FabricDivider />
        <AIRugConcierge />
        <RoomMoodSwitch />
        <MacroTexture />
        <FabricDivider flip />
        <CustomRugStudio />
        <Founder />
        <RugViewer360 />
        <GlobalShippingMap />
        <FabricDivider />
        <GlobeCTA />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <CustomCursor />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
          <Route path="/admin/add-product" element={<AdminRoute><AdminAddProduct /></AdminRoute>} />
          <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
          <Route path="/admin/customers" element={<AdminRoute><AdminCustomers /></AdminRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
