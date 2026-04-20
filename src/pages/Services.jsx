import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { services } from '../data/services';
import ServiceCard from '../components/cards/ServiceCard';
import BookingModal from '../components/modals/BookingModal';
import { Award, Users, Shield, Clock } from 'lucide-react';

const Services = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const handleBook = (name) => { setSelectedService(name); setBookingOpen(true); };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
      {/* Hero */}
      <div className="bg-gradient-to-r from-maroon to-maroon-dark pt-36 md:pt-40 lg:pt-44 pb-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-playfair font-bold text-white mb-4">Professional Vastu Consultation Services</h1>
          <p className="text-white/70 font-poppins max-w-2xl mx-auto">Expert Vastu guidance to harmonize your living and working spaces with time-tested principles.</p>
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => <ServiceCard key={s.id} service={s} index={i} onBook={handleBook} />)}
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-16 bg-bg-light">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-title">Why Choose Our Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Clock, title: '8+ Years Experience', desc: 'Decades of expertise in Vastu consultancy' },
              { icon: Users, title: '250+ Happy Clients', desc: 'Trusted by hundreds of satisfied customers' },
              { icon: Award, title: 'Certified Consultants', desc: 'Professionally trained and certified experts' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}
                className="bg-white rounded-xl p-6 text-center shadow-md card-hover">
                <div className="w-16 h-16 bg-yellow/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon size={28} className="text-maroon" />
                </div>
                <h3 className="font-playfair font-bold text-maroon text-lg mb-2">{item.title}</h3>
                <p className="text-text-mid text-sm font-poppins">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-maroon to-maroon-dark">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-4">Ready to Transform Your Space?</h2>
          <p className="text-white/70 font-poppins mb-8">Book a free initial consultation to discuss your Vastu needs.</p>
          <button onClick={() => handleBook('')} className="btn-primary text-lg px-10 py-4">Book Free Consultation</button>
        </div>
      </section>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} preSelectedService={selectedService} />
    </motion.div>
  );
};

export default Services;
