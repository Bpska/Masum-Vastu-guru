import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Send } from 'lucide-react';
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
              </div>
            </Link>
            <p className="text-text-mid text-sm mb-4 font-poppins">Ancient Vastu Wisdom for Modern Living</p>
            <div className="flex gap-3">
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-full text-maroon hover:text-yellow hover:bg-maroon transition-colors">
                <Instagram size={20} />
              </a>
              <a href={SITE.facebook} target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-full text-maroon hover:text-yellow hover:bg-maroon transition-colors">
                <Facebook size={20} />
              </a>
              <a href={SITE.youtube} target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-full text-maroon hover:text-yellow hover:bg-maroon transition-colors">
                <Youtube size={20} />
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

          {/* Column 4 */}
          <div>
            <h4 className="font-playfair font-bold text-maroon text-lg mb-4">Get Vastu Tips</h4>
            <p className="text-text-mid text-sm mb-4 font-poppins">Subscribe for weekly Vastu tips and exclusive offers.</p>
            <form onSubmit={handleSubscribe} className="flex">
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                placeholder="Your email" className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg text-sm focus:outline-none focus:border-maroon font-poppins" />
              <button type="submit" className="bg-yellow text-maroon px-4 py-2 rounded-r-lg font-semibold hover:bg-yellow-dark transition-colors">
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-maroon text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm font-poppins">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <p>&copy; 2026 Masum Vastu Guru. All Rights Reserved.</p>
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
