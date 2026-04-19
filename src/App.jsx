import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FloatingWhatsApp from './components/layout/FloatingWhatsApp';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Services from './pages/Services';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import About from './pages/About';
import Events from './pages/Events';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Dashboard from './pages/Dashboard';
import ScrollToTop from './components/common/ScrollToTop';
import BookingModal from './components/modals/BookingModal';
import useBookingStore from './store/bookingStore';
import SiteNotice from './components/common/SiteNotice';


import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import ScrollToTopButton from './components/common/ScrollToTopButton';
import BackgroundAudio from './components/common/BackgroundAudio';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/services" element={<Services />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Dashboard defaultTab="admin" />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <AnimatedRoutes />
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTopButton />
      <BackgroundAudio />
      <BookingModal 
        isOpen={useBookingStore(s => s.isOpen)} 
        onClose={useBookingStore(s => s.closeBooking)} 
      />
      <SiteNotice />
      <Toaster position="top-right" toastOptions={{ style: { fontFamily: 'Poppins', borderRadius: '12px' }, success: { iconTheme: { primary: '#7F0404', secondary: '#fff' } } }} />

    </BrowserRouter>
  );
}

export default App;
