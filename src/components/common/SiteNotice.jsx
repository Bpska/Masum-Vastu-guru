import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X } from 'lucide-react';
import toast from 'react-hot-toast';

const SiteNotice = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('vastu_cookie_consent');
    if (!consent) {
      // Small delay so it animates in after initial load
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    const existing = JSON.parse(localStorage.getItem('vastu_cookies') || '[]');
    existing.push({
      status: 'accepted',
      date: new Date().toISOString(),
      userAgent: navigator.userAgent
    });
    localStorage.setItem('vastu_cookies', JSON.stringify(existing));
    localStorage.setItem('vastu_cookie_consent', 'true');
    setIsVisible(false);
    toast.success('Preferences saved!');
  };

  const handleDecline = () => {
    const existing = JSON.parse(localStorage.getItem('vastu_cookies') || '[]');
    existing.push({
      status: 'declined',
      date: new Date().toISOString(),
      userAgent: navigator.userAgent
    });
    localStorage.setItem('vastu_cookies', JSON.stringify(existing));
    localStorage.setItem('vastu_cookie_consent', 'false');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 150, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 pb-6 md:pb-8 pointer-events-none flex justify-center"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 md:p-8 max-w-4xl w-full flex flex-col md:flex-row items-center gap-6 pointer-events-auto relative">
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <div className="bg-yellow/20 p-4 rounded-full flex-shrink-0">
              <ShieldCheck size={32} className="text-maroon" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-playfair font-bold text-text-dark mb-2">We value your privacy</h3>
              <p className="text-sm font-poppins text-text-mid leading-relaxed">
                We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies according to our Privacy Policy.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-shrink-0 mt-4 md:mt-0">
              <button
                onClick={handleDecline}
                className="px-6 py-3 rounded-xl font-poppins font-semibold text-text-mid bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="px-6 py-3 rounded-xl font-poppins font-bold text-maroon bg-yellow hover:bg-[#ffcd30] transition-colors shadow-md"
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SiteNotice;
