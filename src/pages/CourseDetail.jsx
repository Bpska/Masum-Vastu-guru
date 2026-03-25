import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Clock, Users, Award, ChevronDown, Check, Shield, Share2, BookOpen } from 'lucide-react';
import { courses } from '../data/courses';
import StarRating from '../components/common/StarRating';
import EnrollmentModal from '../components/modals/EnrollmentModal';

const CourseDetail = () => {
  const { id } = useParams();
  const course = courses.find(c => c.id === Number(id));
  const [activeTab, setActiveTab] = useState('overview');
  const [openModule, setOpenModule] = useState(0);
  const [enrollOpen, setEnrollOpen] = useState(false);

  if (!course) return (
    <div className="pt-24 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-playfair font-bold text-maroon mb-4">Course Not Found</h2>
        <Link to="/courses" className="btn-primary">Browse Courses</Link>
      </div>
    </div>
  );

  const tabs = ['overview', 'curriculum', 'instructor', 'reviews'];
  const savings = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
      {/* Header */}
      <div className="bg-gradient-to-r from-maroon to-maroon-dark pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-white/60 text-sm font-poppins mb-4">
            <Link to="/" className="hover:text-yellow">Home</Link> / <Link to="/courses" className="hover:text-yellow">Courses</Link> / <span className="text-white">{course.name}</span>
          </div>
          <span className="inline-block bg-yellow text-maroon text-xs font-bold px-3 py-1 rounded-full font-poppins mb-3">{course.level}</span>
          <h1 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-3">{course.name}</h1>
          <p className="text-white/70 font-poppins max-w-2xl mb-4">{course.description}</p>
          <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm font-poppins">
            <span className="flex items-center gap-1"><Star size={14} className="text-yellow fill-yellow" /> {course.rating}</span>
            <span className="flex items-center gap-1"><Users size={14} /> {course.enrollments} enrolled</span>
            <span className="flex items-center gap-1"><Clock size={14} /> {course.duration}</span>
            <span className="flex items-center gap-1">👤 {course.instructor}</span>
            {course.certified && <span className="flex items-center gap-1"><Award size={14} className="text-yellow" /> Certified</span>}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          {/* Left Content */}
          <div>
            <div className="flex gap-0 border-b border-gray-200 mb-6 overflow-x-auto">
              {tabs.map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`relative px-6 py-3 font-poppins font-semibold text-sm capitalize whitespace-nowrap transition-colors
                  ${activeTab === tab ? 'text-maroon' : 'text-text-mid hover:text-maroon'}`}>
                  {tab}
                  {activeTab === tab && <motion.div layoutId="courseTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow" />}
                </button>
              ))}
            </div>

            {activeTab === 'overview' && (
              <div>
                <h3 className="text-xl font-playfair font-bold text-maroon mb-4">What You'll Learn</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {[
                    "Core Vastu principles and theory", "Practical application techniques", "Space analysis methodology",
                    "Remedial measures and solutions", "Client consultation skills", "Report writing and documentation",
                    "Modern adaptation strategies", "Professional practice setup"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm font-poppins text-text-mid">
                      <Check size={16} className="text-yellow flex-shrink-0 mt-0.5" /> {item}
                    </div>
                  ))}
                </div>
                <h3 className="text-xl font-playfair font-bold text-maroon mb-4">Requirements</h3>
                <ul className="space-y-2 mb-8 text-sm font-poppins text-text-mid">
                  <li>• No prior knowledge of Vastu required</li>
                  <li>• Basic understanding of Hindi or English</li>
                  <li>• Smartphone or computer with internet access</li>
                  <li>• Dedication to complete assignments</li>
                </ul>
                <p className="text-text-mid font-poppins leading-relaxed">{course.description}</p>
              </div>
            )}

            {activeTab === 'curriculum' && (
              <div className="space-y-3">
                {course.curriculum.map((mod, i) => (
                  <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                    <button onClick={() => setOpenModule(openModule === i ? -1 : i)}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 bg-maroon text-white rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                        <div className="text-left">
                          <p className="font-semibold text-text-dark font-poppins text-sm">{mod.module}</p>
                          <p className="text-xs text-text-mid font-poppins">{mod.lessons.length} lessons</p>
                        </div>
                      </div>
                      <ChevronDown size={18} className={`transition-transform ${openModule === i ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {openModule === i && (
                        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                          <div className="px-4 pb-4 pl-16 space-y-2">
                            {mod.lessons.map((l, j) => (
                              <div key={j} className="flex items-center gap-2 text-sm text-text-mid font-poppins py-1">
                                <span className="text-maroon">▶</span> {l}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'instructor' && (
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-24 h-24 rounded-full bg-maroon/10 flex items-center justify-center text-3xl font-playfair text-maroon font-bold flex-shrink-0">MV</div>
                <div>
                  <h3 className="text-xl font-playfair font-bold text-maroon mb-1">{course.instructor}</h3>
                  <p className="text-text-mid text-sm font-poppins mb-3">Certified Vastu Consultant • 15+ Years Experience</p>
                  <p className="text-text-mid font-poppins leading-relaxed">With over 15 years of experience in Vastu Shastra, our expert has helped hundreds of clients transform their living and working spaces. A certified master consultant with deep knowledge of both traditional and modern Vastu applications.</p>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center gap-4 mb-6 p-4 bg-bg-light rounded-xl">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-maroon font-playfair">{course.rating}</p>
                    <StarRating rating={course.rating} size={16} />
                    <p className="text-xs text-text-mid font-poppins mt-1">{course.enrollments} students</p>
                  </div>
                </div>
                {[
                  { name: "Ravi K.", rating: 5, text: "Exceptional course! The curriculum is well-structured and the instructor explains everything clearly." },
                  { name: "Meena S.", rating: 5, text: "Worth every rupee. I've started my own practice after completing this course." },
                  { name: "Arjun P.", rating: 4, text: "Great content and practical assignments. Would have liked more live sessions." },
                ].map((r, i) => (
                  <div key={i} className="border-b border-gray-200 py-4">
                    <div className="flex items-center gap-2 mb-2"><StarRating rating={r.rating} size={14} /><span className="font-semibold text-sm font-poppins">{r.name}</span></div>
                    <p className="text-text-mid text-sm font-poppins">{r.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:sticky lg:top-24 self-start">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <img src={course.image} alt={course.name} className="w-full h-full object-cover" />
              </div>
              <div className="bg-gradient-to-r from-maroon to-maroon-dark p-6 text-center">
                <p className="text-white text-4xl font-bold font-poppins">₹{course.price.toLocaleString()}</p>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="text-white/60 line-through text-sm">₹{course.originalPrice.toLocaleString()}</span>
                  <span className="bg-yellow text-maroon text-xs font-bold px-2 py-0.5 rounded">Save {savings}%</span>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <button onClick={() => setEnrollOpen(true)} className="btn-primary w-full text-lg py-3">Enroll Now</button>
                <button className="btn-outline w-full">Gift This Course</button>
                <div>
                  <p className="font-semibold text-text-dark font-poppins text-sm mb-3">This Course Includes:</p>
                  <ul className="space-y-2 text-sm text-text-mid font-poppins">
                    {['Lifetime Access', 'Certificate of Completion', 'Downloadable Resources', 'Expert Support', 'Mobile Access'].map((f, i) => (
                      <li key={i} className="flex items-center gap-2"><Check size={14} className="text-yellow" /> {f}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-yellow/10 border border-yellow/30 rounded-lg p-4 text-center">
                  <Shield size={24} className="text-maroon mx-auto mb-2" />
                  <p className="text-sm font-semibold text-maroon font-poppins">30-Day Money Back Guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EnrollmentModal isOpen={enrollOpen} onClose={() => setEnrollOpen(false)} courseName={course.name} />
    </motion.div>
  );
};

export default CourseDetail;
