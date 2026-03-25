import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, ExternalLink, Calendar, MapPin, Users } from 'lucide-react';
import { WA } from '../constants';
import { SITE } from '../constants';

const Events = () => {
  const [tab, setTab] = useState('media');
  const tabs = [
    { id: 'media', label: 'Media Coverage' },
    { id: 'workshops', label: 'Workshops' },
    { id: 'youtube', label: 'YouTube Videos' },
  ];

  const workshops = {
    upcoming: [
      { id: 1, title: 'Vastu for Home Harmony Workshop', date: 'April 15, 2026', location: 'Mumbai, Maharashtra', seats: 25, price: '₹2,500' },
      { id: 2, title: 'Crystal Healing & Vastu Integration', date: 'May 10, 2026', location: 'Delhi NCR', seats: 15, price: '₹3,000' },
      { id: 3, title: 'Commercial Vastu Masterclass', date: 'June 5, 2026', location: 'Online (Zoom)', seats: 50, price: '₹1,500' },
    ],
    past: [
      'Vastu Basics for Beginners – Jan 2026',
      'Industrial Vastu Workshop – Dec 2025',
      'Crystal Energy & Placement – Nov 2025',
      'Advanced Remedies Seminar – Oct 2025',
      'Numerology & Vastu Connection – Sep 2025',
      'Temple Design Vastu Workshop – Aug 2025',
    ]
  };

  const videos = [
    { title: '5 Vastu Tips for Your Bedroom', views: '45K views', thumb: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400' },
    { title: 'Kitchen Vastu Dos and Donts', views: '32K views', thumb: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400' },
    { title: 'How to Choose the Right Crystal', views: '28K views', thumb: 'https://images.unsplash.com/photo-1576022158563-24b1b59e4beb?w=400' },
    { title: 'Office Vastu for Success', views: '38K views', thumb: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400' },
  ];

  const pressArticles = [
    { source: 'Times of India', title: 'Vastu Expert Helps Transform 250+ Homes', date: 'Feb 2026' },
    { source: 'Hindustan Times', title: 'The Rising Demand for Non-Demolition Vastu', date: 'Jan 2026' },
    { source: 'Indian Express', title: 'How Vastu Shastra is Going Digital', date: 'Dec 2025' },
    { source: 'Economic Times', title: 'Vastu Consultancy: A Growing Industry', date: 'Nov 2025' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
      <div className="bg-gradient-to-r from-maroon to-maroon-dark pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-playfair font-bold text-white mb-4">Events &amp; Media</h1>
          <p className="text-white/70 font-poppins">Stay updated with our workshops, media features, and video content.</p>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-0 border-b border-gray-200 mb-8 overflow-x-auto">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`relative px-6 py-3 font-poppins font-semibold text-sm whitespace-nowrap transition-colors
              ${tab === t.id ? 'text-maroon' : 'text-text-mid hover:text-maroon'}`}>
              {t.label}
              {tab === t.id && <motion.div layoutId="eventTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow" />}
            </button>
          ))}
        </div>

        {tab === 'media' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {pressArticles.map((article, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }} viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-md border border-gray-200 card-hover">
                  <span className="text-xs text-text-mid font-poppins">{article.date}</span>
                  <h3 className="font-playfair font-bold text-maroon text-lg mt-2 mb-1">{article.title}</h3>
                  <p className="text-text-mid text-sm font-poppins mb-3">— {article.source}</p>
                  <a href="#" className="text-maroon font-semibold text-sm font-poppins hover:text-yellow inline-flex items-center gap-1">
                    Read Article <ExternalLink size={14} />
                  </a>
                </motion.div>
              ))}
            </div>
            <div className="bg-bg-light rounded-2xl p-8">
              <h3 className="text-center font-playfair font-bold text-maroon text-lg mb-6">Featured In</h3>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
                {['Times of India', 'HT', 'Express', 'ET', 'Dainik', 'NDTV'].map((name, i) => (
                  <div key={i} className="bg-white rounded-lg p-4 flex items-center justify-center h-16 shadow-sm">
                    <span className="font-poppins font-bold text-gray-400 text-xs text-center">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'workshops' && (
          <div>
            <h3 className="text-xl font-playfair font-bold text-maroon mb-6">Upcoming Workshops</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {workshops.upcoming.map((w, i) => (
                <motion.div key={w.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }} viewport={{ once: true }}
                  className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 card-hover">
                  <div className="bg-maroon p-4">
                    <span className="bg-yellow text-maroon text-xs font-bold px-3 py-1 rounded-full">{w.date}</span>
                  </div>
                  <div className="p-5">
                    <h4 className="font-poppins font-semibold text-text-dark mb-2">{w.title}</h4>
                    <div className="space-y-1 text-sm text-text-mid font-poppins mb-4">
                      <p className="flex items-center gap-2"><MapPin size={14} /> {w.location}</p>
                      <p className="flex items-center gap-2"><Users size={14} /> {w.seats} seats remaining</p>
                      <p className="flex items-center gap-2"><Calendar size={14} /> {w.price}</p>
                    </div>
                    <a href={WA.general()} target="_blank" rel="noopener noreferrer" className="btn-secondary w-full text-center block text-sm py-2">
                      Register via WhatsApp
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
            <h3 className="text-xl font-playfair font-bold text-maroon mb-6">Past Workshops</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {workshops.past.map((w, i) => (
                <div key={i} className="bg-bg-light rounded-xl p-4 text-center">
                  <p className="text-sm font-poppins text-text-mid">{w}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'youtube' && (
          <div>
            <div className="aspect-video rounded-2xl overflow-hidden bg-gray-100 mb-8 relative">
              <img src="https://images.unsplash.com/photo-1548013146-72479768bada?w=1200" alt="Featured Video" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                  <Play size={32} className="text-maroon ml-1" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {videos.map((v, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }} viewport={{ once: true }}
                  className="bg-white rounded-xl overflow-hidden shadow-md card-hover cursor-pointer">
                  <div className="aspect-video relative overflow-hidden">
                    <img src={v.thumb} alt={v.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                        <Play size={20} className="text-maroon ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <h4 className="font-poppins font-semibold text-text-dark text-sm line-clamp-2">{v.title}</h4>
                    <p className="text-xs text-text-mid font-poppins mt-1">{v.views}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-center">
              <a href={SITE.youtube} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-red-600 text-white font-semibold font-poppins px-8 py-3 rounded-lg hover:bg-red-700 transition-colors">
                <Play size={18} /> Subscribe to Channel
              </a>
            </div>
          </div>
        )}
      </section>
    </motion.div>
  );
};

export default Events;
