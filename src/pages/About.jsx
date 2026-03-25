import { motion } from 'framer-motion';
import { Award, Heart, Shield, Users, Target, Eye } from 'lucide-react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const { ref: statsRef, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
      {/* Hero */}
      <div className="bg-gradient-to-r from-maroon to-maroon-dark pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-playfair font-bold text-white mb-4">About Masum Vastu Guru</h1>
          <p className="text-white/70 font-poppins max-w-xl mx-auto">Transforming lives through the ancient science of Vastu Shastra for over 15 years.</p>
        </div>
      </div>

      {/* Founder Section */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-maroon/10 to-yellow/10 flex items-center justify-center relative overflow-hidden shadow-lg">
              <img src="/founder.jpg" alt="Masum Vastu Expert - Founder" className="w-full h-full object-cover object-top" />
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 text-center z-10 shadow-md">
                <p className="font-playfair font-bold text-maroon text-lg">Masum Vastu Expert</p>
                <p className="text-sm text-text-mid font-poppins">Founder & Chief Consultant</p>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-playfair font-bold text-maroon mb-2">Masum Vastu Expert</h2>
            <p className="text-yellow font-semibold font-poppins mb-4">15+ Years of Vastu Expertise</p>
            <div className="space-y-4 text-text-mid font-poppins leading-relaxed">
              <p>With over 15 years of dedicated practice in Vastu Shastra, Masum Vastu Guru has transformed hundreds of homes and businesses. His journey began with a deep fascination for the ancient sciences of India and has evolved into a mission to make Vastu accessible to everyone.</p>
              <p>Certified by leading Vastu institutions, he combines traditional Vedic knowledge with modern understanding to provide practical, non-destructive remedies that deliver results. His unique approach ensures that clients can benefit from Vastu corrections without any structural demolition.</p>
              <p>Through his courses, consultations, and curated products, he has built a trusted brand that stands for authenticity, expertise, and proven results in the Vastu consultancy space.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-bg-light">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { icon: Target, title: 'Our Mission', text: 'To make the ancient wisdom of Vastu Shastra accessible to everyone, providing practical and non-destructive solutions that transform living and working spaces for health, wealth, and happiness.' },
            { icon: Eye, title: 'Our Vision', text: 'To become the most trusted name in Vastu consultancy worldwide, bridging ancient wisdom with modern science while training the next generation of certified Vastu professionals.' },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }} viewport={{ once: true }}
              className="bg-white rounded-2xl overflow-hidden shadow-md">
              <div className="bg-gradient-to-r from-maroon to-maroon-dark p-6 flex items-center gap-3">
                <item.icon size={28} className="text-yellow" />
                <h3 className="text-white font-playfair font-bold text-xl">{item.title}</h3>
              </div>
              <div className="p-6"><p className="text-text-mid font-poppins leading-relaxed">{item.text}</p></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <h2 className="section-title">Core Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Shield, title: 'Authenticity', desc: 'We practice and teach only genuine, time-tested Vastu principles rooted in ancient scriptures.' },
            { icon: Award, title: 'Expertise', desc: 'Continuous learning and professional development ensure we provide the best guidance.' },
            { icon: Heart, title: 'Compassion', desc: 'We genuinely care about our clients well-being and provide personalized attention.' },
            { icon: Users, title: 'Results', desc: 'Our solutions are practical, measurable, and deliver tangible positive outcomes.' },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}
              className="text-center p-6 bg-white rounded-xl shadow-md card-hover border border-transparent hover:border-yellow/50">
              <div className="w-16 h-16 bg-yellow/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <item.icon size={28} className="text-maroon" />
              </div>
              <h3 className="font-playfair font-bold text-maroon text-lg mb-2">{item.title}</h3>
              <p className="text-text-mid text-sm font-poppins">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-bg-light">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="section-title">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-maroon/20 md:-translate-x-0.5" />
            {[
              { year: '2010', title: 'Founded', desc: 'Started Vastu consultancy practice in India.' },
              { year: '2014', title: 'First 100 Clients', desc: 'Reached milestone of 100 satisfied clients across multiple cities.' },
              { year: '2018', title: 'Online Courses Launched', desc: 'Expanded to online education with certified Vastu courses.' },
              { year: '2022', title: 'E-Commerce Store', desc: 'Launched curated collection of Vastu products and crystals.' },
              { year: '2025', title: '250+ Happy Clients', desc: 'Continuing to grow with nationwide consultancy reach.' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}
                className="relative flex items-start gap-6 mb-8 pl-12 md:pl-0">
                <div className="absolute left-2 md:left-1/2 w-5 h-5 bg-maroon rounded-full border-4 border-white shadow md:-translate-x-2.5" />
                <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'}`}>
                  <span className="inline-block bg-maroon text-white text-xs font-bold px-3 py-1 rounded-full font-poppins mb-2">{item.year}</span>
                  <h3 className="font-playfair font-bold text-maroon text-lg">{item.title}</h3>
                  <p className="text-text-mid text-sm font-poppins">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <h2 className="section-title">Achievements &amp; Recognitions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            'Certified Vastu Master',
            'Best Consultant Award',
            'Excellence in Education',
            'Community Service Award',
            'Top Rated Professional',
            'Industry Pioneer Award',
          ].map((award, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.05 }} viewport={{ once: true }}
              className="bg-white rounded-xl border-2 border-maroon/10 p-4 text-center card-hover">
              <Award size={32} className="text-yellow mx-auto mb-2" />
              <p className="text-xs font-poppins font-semibold text-maroon">{award}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default About;
