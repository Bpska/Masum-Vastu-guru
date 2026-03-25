import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Video, Award, Download, Headphones, Smartphone, ArrowRight } from 'lucide-react';
import { courses } from '../data/courses';
import CourseCard from '../components/cards/CourseCard';
import EnrollmentModal from '../components/modals/EnrollmentModal';

const Courses = () => {
  const [filter, setFilter] = useState('All');
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');

  const levels = ['All', 'Foundation', 'Specialized', 'Expert'];
  const filtered = filter === 'All' ? courses : courses.filter(c => c.level === filter);

  const handleEnroll = (name) => { setSelectedCourse(name); setEnrollOpen(true); };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
      {/* Hero */}
      <div className="bg-gradient-to-r from-maroon to-maroon-dark pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="inline-block bg-yellow text-maroon text-sm font-bold px-4 py-1 rounded-full font-poppins mb-4">Professional Certification</span>
          <h1 className="text-3xl md:text-5xl font-playfair font-bold text-white mb-4">Become a Certified Vastu Consultant</h1>
          <div className="flex justify-center gap-8 text-white/80 font-poppins text-sm mt-6">
            <span>20+ Courses</span> <span>•</span> <span>500+ Students</span> <span>•</span> <span>Certified Programs</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {levels.map(l => (
            <button key={l} onClick={() => setFilter(l)}
              className={`px-6 py-2 rounded-full font-poppins font-semibold text-sm transition-all
              ${filter === l ? 'bg-maroon text-white' : 'bg-white text-text-mid border border-gray-300 hover:bg-yellow hover:text-maroon hover:border-yellow'}`}>
              {l}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c, i) => <CourseCard key={c.id} course={c} index={i} onEnroll={handleEnroll} />)}
        </div>
      </section>

      {/* Enrollment Process */}
      <section className="py-16 bg-bg-light">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="section-title">Enrollment Process</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: 1, title: 'Choose Course', icon: BookOpen },
              { step: 2, title: 'Complete Payment', icon: ArrowRight },
              { step: 3, title: 'Access Portal', icon: Video },
              { step: 4, title: 'Get Certified', icon: Award },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }} viewport={{ once: true }} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-maroon to-maroon-dark rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-yellow font-bold text-xl font-poppins">{s.step}</span>
                </div>
                <div className="w-12 h-12 bg-yellow/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <s.icon size={20} className="text-yellow" />
                </div>
                <h3 className="font-poppins font-semibold text-text-dark">{s.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Features */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <h2 className="section-title">What You Get</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Video, title: 'HD Video Lessons', desc: 'High-quality recorded video lectures' },
            { icon: Download, title: 'Downloadable Notes', desc: 'Comprehensive study materials PDF' },
            { icon: Award, title: 'Certificate', desc: 'Professional certification on completion' },
            { icon: BookOpen, title: 'Lifetime Access', desc: 'Access course materials forever' },
            { icon: Headphones, title: 'Expert Support', desc: 'Direct access to instructor' },
            { icon: Smartphone, title: 'Mobile Learning', desc: 'Learn anytime on any device' },
          ].map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }} viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-md card-hover text-center border border-transparent hover:border-yellow/50">
              <div className="w-14 h-14 bg-yellow/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <f.icon size={24} className="text-maroon" />
              </div>
              <h3 className="font-poppins font-semibold text-text-dark mb-1">{f.title}</h3>
              <p className="text-text-mid text-sm font-poppins">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <EnrollmentModal isOpen={enrollOpen} onClose={() => setEnrollOpen(false)} courseName={selectedCourse} />
    </motion.div>
  );
};

export default Courses;
