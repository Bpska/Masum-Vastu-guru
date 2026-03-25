import { motion } from 'framer-motion';
import { Mail, Phone, MessageCircle, Instagram, Facebook, Youtube, MapPin } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SITE, WA } from '../constants';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().regex(/^\d{10}$/, 'Enter 10-digit phone number'),
  subject: z.string().min(1, 'Select a subject'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

const Contact = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data) => {
    const submissions = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
    submissions.push({ ...data, date: new Date().toISOString() });
    localStorage.setItem('contact_submissions', JSON.stringify(submissions));
    toast.success("Message received! We'll reply within 24 hours. 🙏");
    reset();
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
      <div className="bg-gradient-to-r from-maroon to-maroon-dark pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-playfair font-bold text-white mb-4">Get In Touch</h1>
          <p className="text-white/70 font-poppins">We'd love to hear from you. Reach out for consultations, products, or any inquiries.</p>
        </div>
      </div>

      {/* Contact Methods */}
      <section className="max-w-5xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Mail, title: 'Email', info: SITE.email, action: 'Send Email', href: `mailto:${SITE.email}`, color: 'btn-outline' },
            { icon: MessageCircle, title: 'WhatsApp', info: SITE.whatsapp, action: 'Chat Now', href: WA.general(), color: 'btn-primary' },
            { icon: Phone, title: 'Phone', info: SITE.phone, action: 'Call Now', href: `tel:${SITE.phone}`, color: 'btn-secondary' },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }} viewport={{ once: true }}
              className="bg-white rounded-xl p-6 text-center shadow-lg border border-transparent hover:border-maroon/20 card-hover">
              <div className="w-14 h-14 bg-yellow/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <item.icon size={24} className="text-maroon" />
              </div>
              <h3 className="font-playfair font-bold text-maroon text-lg mb-1">{item.title}</h3>
              <p className="text-text-mid text-sm font-poppins mb-4">{item.info}</p>
              <a href={item.href} target={item.title === 'WhatsApp' ? '_blank' : undefined} className={`${item.color} inline-block`}>
                {item.action}
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 max-w-3xl mx-auto px-4">
        <h2 className="section-title">Send Us a Message</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <input {...register('name')} placeholder="Full Name *" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-maroon font-poppins text-sm" />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <input {...register('email')} type="email" placeholder="Email *" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-maroon font-poppins text-sm" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <input {...register('phone')} type="tel" placeholder="Phone *" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-maroon font-poppins text-sm" />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>
            <div>
              <select {...register('subject')} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-maroon font-poppins text-sm">
                <option value="">Select Subject *</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Consultation">Consultation</option>
                <option value="Products">Products</option>
                <option value="Courses">Courses</option>
                <option value="Other">Other</option>
              </select>
              {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
            </div>
          </div>
          <div>
            <textarea {...register('message')} rows={5} placeholder="Your Message (min 20 characters) *"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-maroon font-poppins text-sm resize-none" />
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
          </div>
          <button type="submit" className="btn-primary w-full text-base py-3">Send Message</button>
        </form>
      </section>

      {/* Map Placeholder */}
      <section className="max-w-5xl mx-auto px-4 mb-12">
        <div className="bg-bg-light rounded-2xl p-12 text-center">
          <MapPin size={48} className="text-maroon mx-auto mb-4" />
          <h3 className="font-playfair font-bold text-maroon text-xl mb-2">Our Location</h3>
          <p className="text-text-mid font-poppins">India • Available for consultations worldwide</p>
        </div>
      </section>

      {/* Social */}
      <section className="py-12 max-w-7xl mx-auto px-4 text-center">
        <h2 className="section-title">Follow Us</h2>
        <div className="flex justify-center gap-6">
          {[
            { icon: Instagram, href: SITE.instagram, label: 'Instagram' },
            { icon: Facebook, href: SITE.facebook, label: 'Facebook' },
            { icon: Youtube, href: SITE.youtube, label: 'YouTube' },
          ].map((s, i) => (
            <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
              className="w-14 h-14 rounded-full border-2 border-maroon flex items-center justify-center text-maroon hover:bg-maroon hover:text-yellow transition-all duration-300">
              <s.icon size={24} />
            </a>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default Contact;
