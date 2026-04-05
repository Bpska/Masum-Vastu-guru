import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react';
import useCartStore from '../../store/cartStore';
import { categories } from '../../data/products';
import { services } from '../../data/services';
import AuthModal from '../modals/AuthModal';
import TopBar from './TopBar';
import useBookingStore from '../../store/bookingStore';


const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsDropdown, setProductsDropdown] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [authOpen, setAuthOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const cartCount = useCartStore(s => s.getCount());
  const openBooking = useBookingStore(s => s.openBooking);
  const isHome = location.pathname === '/';


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProductsDropdown(false);
    setServicesDropdown(false);
  }, [location]);

  const navBg = isHome && !scrolled ? 'bg-transparent' : 'bg-white shadow-md';
  const textColor = isHome && !scrolled ? 'text-white' : 'text-maroon';
  const logoColor = isHome && !scrolled ? 'text-white' : 'text-maroon';

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products', dropdown: true, type: 'products' },
    { name: 'Services', path: '/services', dropdown: true, type: 'services' },
    { name: 'Courses', path: '/courses' },
    { name: 'Events', path: '/events' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
        <TopBar />
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="flex items-center gap-3">
              <img src="/logo.png" alt="Masum Vastu Guru" className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover shadow-lg border-2 border-yellow/30" />
              <span className={`text-2xl font-playfair font-bold hidden sm:inline ${logoColor}`}>Masum Vastu Guru</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => (
                <div key={link.name} className="relative group"
                  onMouseEnter={() => {
                    if (link.type === 'products') setProductsDropdown(true);
                    if (link.type === 'services') setServicesDropdown(true);
                  }}
                  onMouseLeave={() => {
                    if (link.type === 'products') setProductsDropdown(false);
                    if (link.type === 'services') setServicesDropdown(false);
                  }}
                >
                  <Link to={link.path}
                    className={`px-3 py-2 text-sm font-poppins font-medium transition-colors flex items-center gap-1 rounded-md hover:bg-maroon/10 ${textColor} ${location.pathname === link.path ? 'font-bold' : ''}`}>
                    {link.name}
                    {link.dropdown && <ChevronDown size={14} />}
                  </Link>

                  {/* Products Dropdown */}
                  {link.type === 'products' && productsDropdown && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className="absolute top-full left-0 bg-white rounded-lg shadow-xl py-2 min-w-[220px] border border-gray-100">
                      <Link to="/products" className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow/20 hover:text-maroon font-medium">All Products</Link>
                      <div className="border-t border-gray-100 my-1"></div>
                      {categories.map(cat => (
                        <Link key={cat} to={`/products?category=${encodeURIComponent(cat)}`}
                          className="block px-4 py-2 text-sm text-gray-600 hover:bg-yellow/20 hover:text-maroon">{cat}</Link>
                      ))}
                    </motion.div>
                  )}

                  {/* Services Dropdown */}
                  {link.type === 'services' && servicesDropdown && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className="absolute top-full left-0 bg-white rounded-lg shadow-xl py-2 min-w-[280px] border border-gray-100">
                      <Link to="/services" className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow/20 hover:text-maroon font-medium">All Services</Link>
                      <div className="border-t border-gray-100 my-1"></div>
                      {services.map(svc => (
                        <Link key={svc.id} to={`/services#service-${svc.id}`}
                          className="block px-4 py-2 text-sm text-gray-600 hover:bg-yellow/20 hover:text-maroon">{svc.name}</Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-2 md:gap-3">
              <button 
                onClick={openBooking} 
                className="hidden md:flex items-center gap-2 bg-[#F4BB00] hover:bg-[#ffcd30] text-maroon font-bold px-5 py-2 rounded-full text-sm transition-all transform hover:scale-105 shadow-md mr-1"
              >
                Book Now
              </button>

              
              <button onClick={() => setSearchOpen(!searchOpen)} className={`p-2 rounded-full hover:bg-maroon/10 transition-colors ${textColor}`}>
                <Search size={20} />
              </button>
              <Link to="/cart" className={`p-2 rounded-full hover:bg-maroon/10 transition-colors relative ${textColor}`}>
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow text-maroon text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button onClick={() => setAuthOpen(true)} className={`p-2 rounded-full hover:bg-maroon/10 transition-colors hidden sm:block ${textColor}`}>
                <User size={20} />
              </button>
              <button onClick={() => setMobileOpen(true)} className={`p-2 rounded-full hover:bg-maroon/10 transition-colors lg:hidden ${textColor}`}>
                <Menu size={22} />
              </button>
            </div>
          </div>
        </nav>


        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.form initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              onSubmit={handleSearch} className="bg-white border-t border-gray-100 overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 py-3 flex gap-2">
                <input type="text" placeholder="Search products..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-maroon font-poppins" autoFocus />
                <button type="submit" className="btn-primary">Search</button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={() => setMobileOpen(false)} />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-80 bg-white z-50 overflow-y-auto shadow-2xl lg:hidden">
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-3">
                  <img src="/logo.png" alt="logo" className="w-14 h-14 rounded-full object-cover shadow-md" />
                  <span className="text-xl font-playfair font-bold text-maroon">Masum Vastu Guru</span>
                </div>
                <button onClick={() => setMobileOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <X size={20} className="text-gray-600" />
                </button>
              </div>
              <div className="py-2">
                {navLinks.map(link => (
                  <div key={link.name}>
                    <Link to={link.path} className="block px-6 py-3 text-gray-700 hover:bg-yellow/20 hover:text-maroon font-medium font-poppins">
                      {link.name}
                    </Link>
                    {link.type === 'products' && (
                      <div className="pl-10 pb-2">
                        {categories.map(cat => (
                          <Link key={cat} to={`/products?category=${encodeURIComponent(cat)}`}
                            className="block py-2 text-sm text-gray-500 hover:text-maroon">{cat}</Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="border-t mt-2 pt-2">
                  <Link to="/cart" className="block px-6 py-3 text-gray-700 hover:bg-yellow/20 hover:text-maroon font-medium font-poppins">Cart</Link>
                  <Link to="/dashboard" className="block px-6 py-3 text-gray-700 hover:bg-yellow/20 hover:text-maroon font-medium font-poppins">Dashboard</Link>
                  <button onClick={() => { setMobileOpen(false); setAuthOpen(true); }}
                    className="block w-full text-left px-6 py-3 text-gray-700 hover:bg-yellow/20 hover:text-maroon font-medium font-poppins">Login / Sign Up</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
};

export default Navbar;
