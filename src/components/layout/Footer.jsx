import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Send, ShieldAlert } from 'lucide-react';
import { SITE } from '../../constants';
import { categories } from '../../data/products';
import toast from 'react-hot-toast';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    const subs = JSON.parse(localStorage.getItem('vastu_subscribers') || '[]');
    subs.push({ email, date: new Date().toISOString() });
    localStorage.setItem('vastu_subscribers', JSON.stringify(subs));
    toast.success('Thank you for subscribing! 🙏');
    setEmail('');
  };

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 */}
          <div>
            <Link to="/" className="flex items-center gap-4 mb-4">
              <img src="/logo.png" alt="Masum Vastu Guru" className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover shadow-lg border-4 border-yellow" />
              <div>
                <p className="text-2xl font-playfair font-bold text-maroon leading-tight">Masum Vastu Guru</p>
                <p className="text-sm text-text-mid font-poppins italic">Vastu Kahe Tathastu</p>
                <p className="text-sm font-semibold text-maroon mt-1">Vastu Consultant — Astrology Vastu ⭐</p>
              </div>
            </Link>
            <p className="text-text-mid text-sm mb-4 font-poppins">Ancient Vastu Wisdom for Modern Living</p>

            <div className="flex gap-3">
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center text-white bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-80 transition-opacity">
                <Instagram size={16} />
              </a>
              <a href={SITE.facebook} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center text-white bg-[#1877F2] hover:opacity-80 transition-opacity">
                <Facebook size={16} />
              </a>
              <a href={SITE.youtube} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center text-white bg-[#FF0000] hover:opacity-80 transition-opacity">
                <Youtube size={16} />
              </a>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center text-white bg-[#25D366] hover:opacity-80 transition-opacity">
                <svg viewBox="0 0 24 24" className="w-[16px] h-[16px] fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="font-playfair font-bold text-maroon text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 font-poppins text-sm">
              {[
                { name: 'About', path: '/about' },
                { name: 'Services', path: '/services' },
                { name: 'Products', path: '/products' },
                { name: 'Courses', path: '/courses' },
                { name: 'Events', path: '/events' },
                { name: 'Contact', path: '/contact' },
              ].map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-text-mid hover:text-maroon transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-playfair font-bold text-maroon text-lg mb-4">Categories</h4>
            <ul className="space-y-2 font-poppins text-sm">
              {categories.map(cat => (
                <li key={cat}>
                  <Link to={`/products?category=${encodeURIComponent(cat)}`} className="text-text-mid hover:text-maroon transition-colors">{cat}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-playfair font-bold text-maroon text-lg mb-1">Masum Vastu Guru</h4>
            <div className="flex items-center gap-3">
              <a href={SITE.facebook} className="w-8 h-8 rounded-full bg-maroon/5 flex items-center justify-center text-maroon hover:bg-maroon hover:text-white transition-all"><Facebook size={16} /></a>
              <a href={SITE.instagram} className="w-8 h-8 rounded-full bg-maroon/5 flex items-center justify-center text-maroon hover:bg-maroon hover:text-white transition-all"><Instagram size={16} /></a>
              <a href={SITE.youtube} className="w-8 h-8 rounded-full bg-maroon/5 flex items-center justify-center text-maroon hover:bg-maroon hover:text-white transition-all"><Youtube size={16} /></a>
              <a href={SITE.whatsapp} className="w-8 h-8 rounded-full bg-maroon/5 flex items-center justify-center text-maroon hover:bg-maroon hover:text-white transition-all">
                <svg viewBox="0 0 24 24" className="w-[16px] h-[16px] fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-maroon text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm font-poppins">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <p>&copy; 2019 — Copyright Reserved.</p>
            <span className="hidden sm:inline border-l border-white/20 h-4 mx-1"></span>
            <p className="text-gray-300">Design by <span className="text-yellow font-bold">Logisaar</span></p>
          </div>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-yellow transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-yellow transition-colors">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
