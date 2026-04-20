import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, User, Menu, X, ChevronDown, ChevronRight, Home, Info, ShoppingBag, Wrench, GraduationCap, Calendar, Star, MessageSquare, LayoutDashboard } from 'lucide-react';
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
  const [activeMobileMenu, setActiveMobileMenu] = useState(null); // 'products' or 'services' or null
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

  const navBg = 'bg-white shadow-md';
  const textColor = 'text-maroon';
  const logoColor = 'text-maroon';

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Products', path: '/products', dropdown: true, type: 'products', icon: ShoppingBag },
    { name: 'Services', path: '/services', dropdown: true, type: 'services', icon: Wrench },
    { name: 'Courses', path: '/courses', icon: GraduationCap },
    { name: 'Events', path: '/events', icon: Calendar },
    { name: 'Contact', path: '/contact', icon: MessageSquare },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
        <TopBar />
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="flex items-center gap-3">
              <img src="/logo.png" alt="Masum Vastu Guru" className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover shadow-lg border-2 border-yellow/30" />
              <div className={`hidden sm:flex flex-col justify-center leading-none ${logoColor}`}>
                <span className="text-2xl font-playfair font-bold">Masum</span>
                <span className="text-sm font-poppins font-medium tracking-widest uppercase">Vastu Guru</span>
              </div>
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
                className="hidden sm:flex items-center gap-2 bg-[#F4BB00] hover:bg-[#ffcd30] text-maroon font-bold px-4 py-1.5 rounded-full text-xs md:text-sm transition-all transform hover:scale-105 shadow-md mr-1"
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
                  <div className="flex flex-col justify-center leading-none text-maroon">
                    <span className="text-xl font-playfair font-bold">Masum</span>
                    <span className="text-[10px] font-poppins font-medium tracking-widest uppercase">Vastu Guru</span>
                  </div>
                </div>
                <button onClick={() => setMobileOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <X size={20} className="text-gray-600" />
                </button>
              </div>
              <div className="py-2">
                {navLinks.map(link => {
                  const Icon = link.icon;
                  return (
                    <div key={link.name} className="border-b border-gray-50 last:border-none">
                      <div className="flex items-center justify-between">
                        <Link to={link.path} onClick={() => !link.dropdown && setMobileOpen(false)}
                          className="flex-1 flex items-center gap-4 px-6 py-4 text-gray-700 hover:bg-yellow/10 transition-colors font-medium font-poppins text-base">
                          <Icon size={20} className="text-maroon/60" />
                          {link.name}
                        </Link>
                        {link.dropdown && (
                          <button onClick={() => setActiveMobileMenu(activeMobileMenu === link.type ? null : link.type)}
                            className="p-4 text-gray-400 hover:text-maroon transition-colors">
                            <ChevronDown size={20} className={`transform transition-transform ${activeMobileMenu === link.type ? 'rotate-180' : ''}`} />
                          </button>
                        )}
                      </div>
                      
                      <AnimatePresence>
                        {link.dropdown && activeMobileMenu === link.type && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                            className="bg-gray-50/50 overflow-hidden">
                            <div className="pl-14 pr-6 pb-2">
                              {link.type === 'products' ? (
                                <>
                                  <Link to="/products" onClick={() => setMobileOpen(false)} className="block py-3 text-sm text-gray-600 font-medium hover:text-maroon border-b border-gray-100">All Products</Link>
                                  {categories.map(cat => (
                                    <Link key={cat} to={`/products?category=${encodeURIComponent(cat)}`}
                                      onClick={() => setMobileOpen(false)}
                                      className="block py-3 text-sm text-gray-500 hover:text-maroon flex items-center justify-between border-b border-gray-100 last:border-none">
                                      {cat} <ChevronRight size={14} className="text-gray-300" />
                                    </Link>
                                  ))}
                                </>
                              ) : (
                                <>
                                  <Link to="/services" onClick={() => setMobileOpen(false)} className="block py-3 text-sm text-gray-600 font-medium hover:text-maroon border-b border-gray-100">All Services</Link>
                                  {services.map(svc => (
                                    <Link key={svc.id} to={`/services#service-${svc.id}`}
                                      onClick={() => setMobileOpen(false)}
                                      className="block py-3 text-sm text-gray-500 hover:text-maroon flex items-center justify-between border-b border-gray-100 last:border-none">
                                      {svc.name} <ChevronRight size={14} className="text-gray-300" />
                                    </Link>
                                  ))}
                                </>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
                
                <div className="mt-4 mx-4 p-4 bg-maroon/5 rounded-2xl space-y-1">
                  <Link to="/cart" onClick={() => setMobileOpen(false)} className="flex items-center gap-4 px-4 py-3 text-gray-700 hover:bg-white rounded-xl transition-all">
                    <ShoppingCart size={20} className="text-maroon/60" />
                    <span className="font-medium font-poppins">My Cart</span>
                    {cartCount > 0 && <span className="ml-auto bg-maroon text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{cartCount}</span>}
                  </Link>
                  <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="flex items-center gap-4 px-4 py-3 text-gray-700 hover:bg-white rounded-xl transition-all">
                    <LayoutDashboard size={20} className="text-maroon/60" />
                    <span className="font-medium font-poppins">Dashboard</span>
                  </Link>
                  <button onClick={() => { setMobileOpen(false); setAuthOpen(true); }}
                    className="w-full flex items-center gap-4 px-4 py-3 text-gray-700 hover:bg-white rounded-xl transition-all text-left">
                    <User size={20} className="text-maroon/60" />
                    <span className="font-medium font-poppins">Login / Sign Up</span>
                  </button>
                </div>

                <div className="mt-8 px-8 pb-10">
                  <button onClick={() => { setMobileOpen(false); openBooking(); }}
                    className="w-full py-4 bg-yellow text-maroon font-bold rounded-xl shadow-lg shadow-yellow/20 flex items-center justify-center gap-3 active:scale-95 transition-transform">
                    <Calendar size={20} /> Book Consultation
                  </button>
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
