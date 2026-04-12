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
import { testimonials } from '../data/testimonials';
import ProductCard from '../components/cards/ProductCard';
import ServiceCard from '../components/cards/ServiceCard';
import StarRating from '../components/common/StarRating';
import BookingModal from '../components/modals/BookingModal';
import LiveOrderNotification from '../components/common/LiveOrderNotification';
import toast from 'react-hot-toast';
import heroImage from '../assets/image.png';
import heroImageCopy from '../assets/image copy.png';
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
      <section className="relative mt-24 md:mt-28 lg:mt-32 bg-white overflow-hidden shadow-sm">
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
            <img src="/founder.jpg" alt="Founder Masum Vastu Expert" className="rounded-2xl shadow-lg w-full h-[500px] object-cover object-top" />
            <div className="absolute inset-0 border-2 border-maroon rounded-2xl translate-x-4 translate-y-4 -z-10" />
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
              At Masum Vastu Guru, we bridge the gap between ancient architectural science and modern living. Our goal is to transform your home or workspace into a magnet for positivity and success.
            </motion.p>
            <motion.ul variants={fadeInUp} className="space-y-4 mb-8">
              {['Non-destructive Vastu Corrections', 'Personalized Energy Mapping', 'Premium Energized Remedies'].map((item, i) => (
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

      {/* TESTIMONIALS */}
      <section className="py-20 md:py-28 bg-bg-light relative overflow-hidden">
        <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-96 h-96 bg-maroon/5 rounded-full blur-3xl" />
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h4 className="text-maroon font-bold tracking-widest uppercase mb-2">Moments of Harmony 🌟</h4>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-text-dark">Original Google Reviews</h2>
            <p className="text-text-mid text-lg mt-4">Read authentic success stories from our happy clients.</p>
          </div>
          
          <Swiper modules={[Autoplay, Pagination, EffectFade]} effect="fade" fadeEffect={{ crossFade: true }} spaceBetween={30} autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }} slidesPerView={1} className="pb-14 shadow-2xl rounded-3xl overflow-hidden bg-white">
            {testimonials.slice(0, 5).map(t => (
              <SwiperSlide key={t.id}>
                <div className="p-10 md:p-16 relative text-center">
                  <span className="text-[180px] font-playfair text-maroon/5 absolute top-0 left-10 leading-none select-none">"</span>
                  <div className="flex justify-center mb-4"><StarRating rating={t.rating} size={24} /></div>
                  {t.language && (
                     <div className="mb-4">
                       <span className="inline-block bg-maroon/10 text-maroon font-semibold font-poppins text-xs px-3 py-1 rounded-full">{t.language}</span>
                     </div>
                  )}
                  <p className="text-text-dark font-playfair italic text-xl md:text-3xl mb-10 relative z-10 leading-relaxed">"{t.text}"</p>
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow to-yellow-dark p-1">
                      <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-maroon font-bold font-poppins text-xl">
                        {t.avatar}
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-maroon text-lg font-poppins">{t.name}</p>
                      <p className="text-text-mid font-poppins">{t.city}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
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
    </motion.div>

  );
};

export default Home;
