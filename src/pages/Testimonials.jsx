import { useState } from 'react';
import { motion } from 'framer-motion';
import { testimonials } from '../data/testimonials';
import StarRating from '../components/common/StarRating';

const Testimonials = () => {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Site Visit', 'Online', 'Courses', 'Products'];
  const filtered = filter === 'All' ? testimonials : testimonials.filter(t => t.service === filter);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
      <div className="bg-gradient-to-r from-maroon to-maroon-dark pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-playfair font-bold text-white mb-4">Client Success Stories</h1>
          <p className="text-white/70 font-poppins">Hear what our clients have to say about their Vastu transformation journey.</p>
        </div>
      </div>

      <section className="py-12 max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full font-poppins text-sm font-semibold transition-all ${filter === f ? 'bg-maroon text-white' : 'bg-white text-text-mid border border-gray-300 hover:bg-yellow hover:text-maroon hover:border-yellow'}`}>
              {f}
            </button>
          ))}
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filtered.map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.1 }} viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-md break-inside-avoid border border-transparent hover:border-yellow/50 card-hover">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-yellow border-[3px] border-yellow flex items-center justify-center text-maroon font-bold font-poppins">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-maroon font-poppins">{t.name}</p>
                  <p className="text-text-mid text-xs font-poppins">{t.city}</p>
                </div>
              </div>
              <StarRating rating={t.rating} size={16} />
              <p className="text-text-mid font-poppins text-sm mt-3 leading-relaxed">{t.text}</p>
              <span className="inline-block bg-yellow/20 text-maroon text-xs font-semibold px-3 py-1 rounded-full mt-3 font-poppins">{t.service}</span>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default Testimonials;
