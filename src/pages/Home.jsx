import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import CountUpImport from 'react-countup';
import { useInView } from 'react-intersection-observer';

// Fix CJS/ESM interop: react-countup may double-wrap its default export
const CountUp = (CountUpImport && CountUpImport.default && typeof CountUpImport.default === 'function')
  ? CountUpImport.default
  : CountUpImport;
import { ChevronDown, Plus, Minus, Award, Shield, Heart, Users, ArrowRight, Send, Star, CheckCircle, Phone, ShieldAlert } from 'lucide-react';
import { products } from '../data/products';
import { services } from '../data/services';
import ProductCard from '../components/cards/ProductCard';
import ServiceCard from '../components/cards/ServiceCard';
import StarRating from '../components/common/StarRating';
import BookingModal from '../components/modals/BookingModal';
import LiveOrderNotification from '../components/common/LiveOrderNotification';
import ImageLightbox from '../components/modals/ImageLightbox';
import toast from 'react-hot-toast';
import heroImage from '../assets/hero1.jpeg';
import heroImageCopy from '../assets/hero-2.jpeg';
import wonImage from '../assets/won-pxbee-minitools-enhance-202604208720-pxbee-bg-remover-2026042081254.png';
import goldMedal from '../assets/WhatsApp Image 2026-04-19 at 12.05.40 PM.jpeg';
import useBookingStore from '../store/bookingStore';





// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const Home = () => {
  const openBooking = useBookingStore(s => s.openBooking);
  const [openFaq, setOpenFaq] = useState(null);
  const [lightbox, setLightbox] = useState({ isOpen: false, src: '', alt: '' });

  const openLightbox = (src, alt) => setLightbox({ isOpen: true, src, alt });

  const [communityEmail, setCommunityEmail] = useState('');
  
  const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: aboutRef, inView: aboutInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: servicesRef, inView: servicesInView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const featuredProducts = products.filter(p => p.isFeatured);

  const handleCommunityUpdate = (e) => {
    e.preventDefault();
    if (!communityEmail.trim()) return;
    const subs = JSON.parse(localStorage.getItem('vastu_subscribers') || '[]');
    subs.push({ email: communityEmail, date: new Date().toISOString() });
    localStorage.setItem('vastu_subscribers', JSON.stringify(subs));
    toast.success('Thank you for subscribing! 🙏');
    setCommunityEmail('');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      {/* HERO SECTION - Premium Sliding Banner */}
      <section className="relative mt-32 md:mt-36 lg:mt-40 bg-white overflow-hidden shadow-sm">
        <div className="max-w-[1920px] mx-auto">
          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            effect="fade"
            speed={1200}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            loop={true}
            className="w-full h-auto"
          >
            {/* Slide 1 */}
            <SwiperSlide>
              <div className="relative group px-4 md:px-8 lg:px-12 py-6">
                <div className="rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-500">
                  <img 
                    src={heroImage} 
                    alt="Masum Vastu Guru Presentation 1" 
                    className="w-full h-auto block select-none transform hover:scale-[1.02] transition-transform duration-700"
                  />
                </div>
              </div>
            </SwiperSlide>

            {/* Slide 2 */}
            <SwiperSlide>
              <div className="relative group px-4 md:px-8 lg:px-12 py-6">
                <div className="rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-500">
                  <img 
                    src={heroImageCopy} 
                    alt="Masum Vastu Guru Presentation 2" 
                    className="w-full h-auto block select-none transform hover:scale-[1.02] transition-transform duration-700"
                  />
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>







      {/* ABOUT PREVIEW SECTION */}
      <section id="about" className="py-20 md:py-28 bg-white relative overflow-hidden" ref={aboutRef}>
        <div className="absolute top-0 left-0 w-64 h-64 bg-yellow/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={aboutInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="order-2 md:order-1 relative"
          >
            <div className="relative group">
              <img src={wonImage} alt="Founder Masum Vastu Expert" className="rounded-3xl shadow-2xl w-full h-[550px] object-cover border-4 border-white cursor-pointer hover:scale-[1.01] transition-transform duration-500" 
                   onClick={() => openLightbox(wonImage, "Founder Masum Vastu Expert")} />
              <motion.div 
                initial={{ scale: 0, rotate: -20 }}
                animate={aboutInView ? { scale: 1, rotate: 0 } : {}}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
                className="absolute -bottom-6 -right-6 md:-right-10 w-32 h-32 md:w-40 md:h-40 bg-white rounded-full p-2 shadow-2xl border-4 border-yellow z-20 overflow-hidden group-hover:scale-110 transition-transform duration-300 cursor-pointer"
                onClick={() => openLightbox(goldMedal, "Gold Medal for Vastu Experts")}
              >
                <img src={goldMedal} alt="Gold Medal for Vastu Experts" className="w-full h-full object-cover rounded-full" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <p className="text-[8px] md:text-[10px] text-white font-bold uppercase text-center leading-tight drop-shadow-lg">Gold Medalist<br/>Vastu Expert</p>
                </div>
              </motion.div>
            </div>
            <div className="absolute inset-0 border-2 border-maroon rounded-3xl translate-x-4 translate-y-4 -z-10" />
          </motion.div>
          
          <motion.div 
            initial="hidden"
            animate={aboutInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="order-1 md:order-2"
          >
            <motion.h4 variants={fadeInUp} className="text-maroon font-bold tracking-widest uppercase mb-2">About Us</motion.h4>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-playfair font-bold text-text-dark mb-6 leading-tight">
              Mastering the Flow of <span className="text-maroon italic">Cosmic Energy</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-text-mid text-lg mb-6 leading-relaxed">
              At <strong className="font-bold text-maroon">MASUM VASTU GURU</strong>, we bridge the gap between ancient architectural science and modern living. Our goal is to transform your home or workspace into a magnet for positivity and success.
            </motion.p>
            <motion.ul variants={fadeInUp} className="space-y-4 mb-8">
              {['Non-destructive Vastu Corrections', 'Industrial & Factory Expert', 'Professional Construction Plans', 'Shree Hanuman & Ram Ji Katha'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-text-dark font-medium font-poppins"><CheckCircle className="text-yellow" size={20} /> {item}</li>
              ))}
            </motion.ul>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
              <Link to="/about" className="btn-outline inline-flex items-center gap-2 group justify-center">
                Our Journey <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button 
                onClick={openBooking} 
                className="btn-primary inline-flex items-center gap-2 group text-sm md:text-base justify-center"
              >
                Book Fast Consultation <Phone size={18} />
              </button>

            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* STATS COUNTER */}
      <section ref={statsRef} className="py-20 bg-[url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920')] bg-cover bg-center relative bg-fixed">
        <div className="absolute inset-0 bg-maroon-dark/90 backdrop-blur-sm" />
        <div className="max-w-7xl relative z-10 mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { num: 250, suffix: '+', label: 'Satisfied Clients', icon: Users },
            { num: 500, suffix: '+', label: 'Remedies Sold', icon: Shield },
            { num: 20, suffix: '+', label: 'Certified Courses', icon: Award },
            { num: 8, suffix: '+', label: 'Years Experience', icon: Heart },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md group hover:-translate-y-2 transition-all duration-300"
            >
              <stat.icon size={40} className="text-yellow mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-4xl md:text-6xl font-playfair font-bold text-white mb-2 tracking-tight flex justify-center items-center">
                <CountUp end={stat.num} duration={2.5} enableScrollSpy scrollSpyOnce />
                <span className="text-yellow">{stat.suffix}</span>
              </div>
              <p className="text-white/80 font-poppins font-medium uppercase tracking-wider text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SERVICES OVERVIEW */}
      <section className="py-20 md:py-28 bg-bg-light relative" ref={servicesRef}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h4 className="text-maroon font-bold tracking-widest uppercase mb-2">Our Expertise</h4>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-text-dark mb-6">Comprehensive Vastu Services</h2>
            <p className="text-text-mid text-lg">We offer tailored solutions to harmonize your spaces and align your life's goals with the cosmic environment.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 3).map((s, i) => (
              <ServiceCard key={s.id} service={s} index={i} onBook={() => setBookingOpen(true)} />
            ))}
          </div>



          <div className="text-center mt-12">
            <Link to="/services" className="btn-primary inline-flex items-center gap-2 group">
              Explore All Services <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET Section */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-playfair font-bold text-text-dark mb-10">What You Get ?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-6 bg-yellow/5 rounded-xl border border-yellow/20">
              <ShieldAlert className="mx-auto text-maroon mb-3" size={32} />
              <p className="font-poppins font-semibold text-text-dark">Detailed Report</p>
            </div>
            <div className="p-6 bg-yellow/5 rounded-xl border border-yellow/20">
              <Phone className="mx-auto text-maroon mb-3" size={32} />
              <p className="font-poppins font-semibold text-text-dark">Post-visit Support</p>
            </div>
            <div className="p-6 bg-yellow/5 rounded-xl border border-yellow/20">
              <Heart className="mx-auto text-maroon mb-3" size={32} />
              <p className="font-poppins font-semibold text-text-dark">Energy Balancing</p>
            </div>
            <div className="p-6 bg-yellow/5 rounded-xl border border-yellow/20">
              <Award className="mx-auto text-maroon mb-3" size={32} />
              <p className="font-poppins font-semibold text-text-dark">Proven Remedies</p>
            </div>
          </div>
        </div>
      </section>

      {/* MEDIA COVERAGE Section */}
      <section className="py-16 bg-maroon text-white text-center">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">Media Coverage ? / Workshop ? / YouTube Videos ?</h2>
          <p className="font-poppins mb-8 text-white/80">Recognized by leading news outlets and adored by millions on YouTube for simplifying Vastu Shastra.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="https://youtube.com/@masumvastuguru" target="_blank" rel="noreferrer" className="bg-white text-maroon px-6 py-3 rounded-full font-bold font-poppins shadow-md hover:bg-yellow transition-colors">Watch on YouTube</a>
            <Link to="/events" className="border-2 border-white px-6 py-3 rounded-full font-bold font-poppins hover:bg-white hover:text-maroon transition-colors">Upcoming Workshops</Link>
          </div>
        </div>
      </section>

      {/* PROFESSIONAL VASTU Section */}
      <section className="py-20 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920')] bg-cover bg-fixed relative">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-5xl md:text-7xl font-playfair font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow to-white tracking-wider uppercase mb-6 drop-shadow-lg">
            Professional Vastu
          </h2>
          <p className="text-xl md:text-2xl font-poppins text-white/90 italic max-w-2xl mx-auto">Elevating spaces with scientific analysis and Vedic principles. No demolition required.</p>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-20 md:py-28 bg-white max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h4 className="text-maroon font-bold tracking-widest uppercase mb-2">Shop Remedies</h4>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-text-dark">Featured Vastu Products</h2>
          </div>
          <Link to="/products" className="text-maroon font-semibold font-poppins hover:text-yellow flex items-center gap-2 group whitespace-nowrap">
            View All Products <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <Swiper modules={[Navigation, Pagination, Autoplay]} spaceBetween={30} loop={true}
          autoplay={{ delay: 3500, disableOnInteraction: false }} navigation pagination={{ clickable: true, dynamicBullets: true }}
          breakpoints={{ 0: { slidesPerView: 1 }, 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 }, 1280: { slidesPerView: 4 } }}
          className="pb-16"
        >
          {featuredProducts.map((p, i) => (
            <SwiperSlide key={p.id}><ProductCard product={p} index={i} /></SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* GALLERY SECTION */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h4 className="text-maroon font-bold tracking-widest uppercase mb-2">Moments of Harmony</h4>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-text-dark">Our Transformation Gallery</h2>
            <p className="text-text-mid text-lg max-w-2xl mx-auto mt-4">Witness the balance of cosmic energies brought to life across residential, commercial, and industrial spaces.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600",
              "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600",
              "https://images.unsplash.com/photo-1628592102751-ba83b0314276?w=600",
              "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600",
              "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600",
              "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600",
              "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600",
              "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600"
            ].map((img, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }} 
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer ${idx === 0 || idx === 3 ? 'md:col-span-2' : ''} h-64 md:h-80`}
              >
                <div className="absolute inset-0 bg-maroon-dark/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img src={img} alt={`Vastu project ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-maroon-dark/90 via-maroon-dark/50 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                  <p className="text-yellow font-bold tracking-wider text-sm uppercase">Project Overview</p>
                  <p className="text-white font-playfair text-xl">Energy Alignment</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GOOGLE REVIEWS SECTION */}
      <section className="py-20 md:py-28 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-text-dark mb-4">Google review summary</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">Q</div>
                <div>
                  <h4 className="font-poppins font-bold text-text-dark">Qudosi Sives</h4>
                  <p className="text-xs text-text-mid">2 reviews · 1 photo</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-[#F4BB00]"><Star size={14} fill="#F4BB00" /><Star size={14} fill="#F4BB00" /><Star size={14} fill="#F4BB00" /><Star size={14} fill="#F4BB00" /><Star size={14} fill="#F4BB00" /></div>
                <span className="text-xs text-text-mid">6 days ago</span>
                <span className="text-xs bg-gray-100 px-2 rounded-full">New</span>
              </div>
              <p className="text-text-dark font-poppins text-sm">It's an awesome place, 😃</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl">M</div>
                <div>
                  <h4 className="font-poppins font-bold text-text-dark">MID and construction</h4>
                  <p className="text-xs text-text-mid">1 review</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-[#F4BB00]"><Star size={14} fill="#F4BB00" /><Star size={14} fill="#F4BB00" /><Star size={14} fill="#F4BB00" /><Star size={14} fill="#F4BB00" /><Star size={14} fill="#F4BB00" /></div>
                <span className="text-xs text-text-mid">5 months ago</span>
              </div>
              <p className="text-text-dark font-poppins text-sm mb-2">vastu shastra best</p>
              <p className="text-xs text-text-mid italic">Translated by Google · See original (Hindi)</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">N</div>
                <div>
                  <h4 className="font-poppins font-bold text-text-dark">Nyayabanta Behera</h4>
                  <p className="text-xs text-text-mid">3 reviews · 1 photo</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-[#F4BB00]"><Star size={14} fill="#F4BB00" /><Star size={14} fill="#F4BB00" /><Star size={14} fill="#F4BB00" /><Star size={14} fill="#F4BB00" /><Star size={14} fill="#F4BB00" /></div>
                <span className="text-xs text-text-mid">6 days ago</span>
                <span className="text-xs bg-gray-100 px-2 rounded-full">New</span>
              </div>
              <p className="text-text-dark font-poppins text-sm mb-2">Masum Vastu Guru is the best for Home Vastu, Office Vastu and Business Vastu Solution. Thank you for the professional service and accurate guidance 🙏</p>
              <p className="text-xs text-text-mid italic">Translated by Google · See original (Odia)</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">L</div>
                <div>
                  <h4 className="font-poppins font-bold text-text-dark">Lopa mudra Das</h4>
                  <p className="text-xs text-text-mid">2 reviews</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-[#F4BB00]"><Star size={14} fill="#F4BB00" /><Star size={14} fill="#F4BB00" /><Star size={14} fill="#F4BB00" /><Star size={14} fill="#F4BB00" /><Star size={14} fill="#F4BB00" /></div>
                <span className="text-xs text-text-mid">6 days ago</span>
                <span className="text-xs bg-gray-100 px-2 rounded-full">New</span>
              </div>
              <p className="text-text-dark font-poppins text-sm mb-2">Masum Vastu Guru is the Best Vastu Expert in Bhubaneswar, Odisha. He gives very accurate and effective advice for Home Vastu, Shop Vastu, Office Vastu and Vastu Dosh Nivaran in Odisha.</p>
              <p className="text-xs text-text-mid italic">Translated by Google · See original (Odia)</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">B</div>
                <div>
                  <h4 className="font-poppins font-bold text-text-dark">Babul Barik</h4>
                  <p className="text-xs text-text-mid">2 reviews</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-[#F4BB00]"><Star size={14} fill="#F4BB00" /><Star size={14} fill="#F4BB00" /><Star size={14} fill="#F4BB00" /><Star size={14} fill="#F4BB00" /><Star size={14} fill="#F4BB00" /></div>
                <span className="text-xs text-text-mid">6 days ago</span>
                <span className="text-xs bg-gray-100 px-2 rounded-full">New</span>
              </div>
              <p className="text-text-dark font-poppins text-sm mb-2">Masum Vastu Guru is a famous Vastu Shastra Expert in Odisha. He gives very good advice for correct Vastu Dosh Nivaran for Home Vastu, Shop Vastu and Office Vastu problems.</p>
              <p className="text-xs text-text-mid italic">Translated by Google · See original (Odia)</p>
            </div>
            
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-text-dark">The Masum Vastu Difference</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Award, title: 'Certified Expertise', desc: 'Our consultants hold globally recognized credentials in Vastu sciences.' },
            { icon: Heart, title: 'Authentic Wisdom', desc: 'Strict adherence to traditional scriptures applied to modern architecture.' },
            { icon: Shield, title: 'Proven Methods', desc: 'Over 250+ documented success stories of personal and professional growth.' },
            { icon: Users, title: 'Dedicated Support', desc: 'Continuous guidance and post-consultation assistance for smooth transitions.' },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}
              className="text-center p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="w-20 h-20 bg-yellow/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-yellow group-hover:scale-110 transition-all duration-300">
                <item.icon size={36} className="text-maroon" />
              </div>
              <h3 className="font-playfair font-bold text-text-dark text-xl mb-3">{item.title}</h3>
              <p className="text-text-mid font-poppins leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>




      <LiveOrderNotification />
      <ImageLightbox 
        isOpen={lightbox.isOpen} 
        onClose={() => setLightbox({ ...lightbox, isOpen: false })} 
        imageSrc={lightbox.src} 
        altText={lightbox.alt} 
      />
    </motion.div>

  );
};

export default Home;
