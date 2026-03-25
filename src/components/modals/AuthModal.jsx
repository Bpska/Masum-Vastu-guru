import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

const AuthModal = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '', remember: false, terms: false });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(p => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('vastu_user', JSON.stringify({ email: form.email, name: form.name || 'User' }));
    toast.success('Welcome! 🙏');
    onClose();
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) { toast.error('Passwords do not match'); return; }
    if (!form.terms) { toast.error('Please accept terms'); return; }
    localStorage.setItem('vastu_user', JSON.stringify({ name: form.name, email: form.email, phone: form.phone }));
    toast.success('Welcome! 🙏');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
          onClick={e => e.stopPropagation()} className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-xl font-playfair font-bold text-maroon">{tab === 'login' ? 'Welcome Back' : 'Create Account'}</h3>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full"><X size={20} /></button>
          </div>
          <div className="flex border-b">
            <button onClick={() => setTab('login')} className={`flex-1 py-3 text-sm font-semibold font-poppins transition-colors ${tab === 'login' ? 'text-maroon border-b-2 border-maroon' : 'text-gray-500'}`}>Login</button>
            <button onClick={() => setTab('signup')} className={`flex-1 py-3 text-sm font-semibold font-poppins transition-colors ${tab === 'signup' ? 'text-maroon border-b-2 border-maroon' : 'text-gray-500'}`}>Sign Up</button>
          </div>
          <div className="p-6">
            {tab === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <input name="email" type="email" required placeholder="Email or Phone" value={form.email} onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-maroon font-poppins text-sm" />
                <input name="password" type="password" required placeholder="Password" value={form.password} onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-maroon font-poppins text-sm" />
                <div className="flex justify-between items-center text-sm font-poppins">
                  <label className="flex items-center gap-2 text-gray-600">
                    <input type="checkbox" name="remember" checked={form.remember} onChange={handleChange} className="accent-maroon" /> Remember Me
                  </label>
                  <button type="button" className="text-maroon hover:underline">Forgot Password?</button>
                </div>
                <button type="submit" className="btn-primary w-full">Login</button>
              </form>
            ) : (
              <form onSubmit={handleSignup} className="space-y-4">
                <input name="name" required placeholder="Full Name" value={form.name} onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-maroon font-poppins text-sm" />
                <input name="email" type="email" required placeholder="Email" value={form.email} onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-maroon font-poppins text-sm" />
                <input name="phone" type="tel" required placeholder="Phone" value={form.phone} onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-maroon font-poppins text-sm" />
                <input name="password" type="password" required placeholder="Password" value={form.password} onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-maroon font-poppins text-sm" />
                <input name="confirmPassword" type="password" required placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-maroon font-poppins text-sm" />
                <label className="flex items-center gap-2 text-sm text-gray-600 font-poppins">
                  <input type="checkbox" name="terms" checked={form.terms} onChange={handleChange} className="accent-maroon" />
                  I agree to the Terms &amp; Conditions
                </label>
                <button type="submit" className="btn-secondary w-full">Sign Up</button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;
