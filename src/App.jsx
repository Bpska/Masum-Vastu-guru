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
import PageTransition from './components/common/PageTransition';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/products" element={<PageTransition><Products /></PageTransition>} />
        <Route path="/products/:id" element={<PageTransition><ProductDetail /></PageTransition>} />
        <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/courses" element={<PageTransition><Courses /></PageTransition>} />
        <Route path="/courses/:id" element={<PageTransition><CourseDetail /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/events" element={<PageTransition><Events /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/cart" element={<PageTransition><Cart /></PageTransition>} />
        <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
        <Route path="/admin" element={<PageTransition><Dashboard defaultTab="admin" /></PageTransition>} />
        <Route path="/privacy" element={<PageTransition><Privacy /></PageTransition>} />
        <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />
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
