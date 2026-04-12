import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, ShoppingBag, BookOpen, Heart, Settings, LogOut, Edit, Trash2, ShieldAlert } from 'lucide-react';
import useWishlistStore from '../store/wishlistStore';
import useCartStore from '../store/cartStore';
import { products } from '../data/products';
import { WA } from '../constants';
import toast from 'react-hot-toast';

const Dashboard = ({ defaultTab = 'profile' }) => {
  const navigate = useNavigate();
  const [tab, setTab] = useState(defaultTab);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('vastu_user') || '{}'));
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: user.name || '', email: user.email || '', phone: user.phone || '' });
  const wishlistItems = useWishlistStore(s => s.items);
  const wishlistToggle = useWishlistStore(s => s.toggle);
  const addItem = useCartStore(s => s.addItem);
  const [settings, setSettings] = useState(() => JSON.parse(localStorage.getItem('vastu_settings') || '{"emailNotif":true,"whatsappUpdates":true}'));

  const wishlistProducts = products.filter(p => wishlistItems.includes(p.id));

  const handleSaveProfile = () => {
    const updated = { ...user, ...editForm };
    localStorage.setItem('vastu_user', JSON.stringify(updated));
    setUser(updated);
    setEditing(false);
    toast.success('Profile updated! ✅');
  };

  const handleLogout = () => {
    localStorage.removeItem('vastu_user');
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleSettingChange = (key) => {
    const updated = { ...settings, [key]: !settings[key] };
    setSettings(updated);
    localStorage.setItem('vastu_settings', JSON.stringify(updated));
    toast.success('Setting updated');
  };

  const tabs = [
    { id: 'profile', icon: User, label: 'My Profile' },
    { id: 'orders', icon: ShoppingBag, label: 'My Orders' },
    { id: 'courses', icon: BookOpen, label: 'My Courses' },
    { id: 'wishlist', icon: Heart, label: 'Wishlist' },
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'admin', icon: ShieldAlert, label: 'Admin Panel' },
  ];

  const adminSubscribers = JSON.parse(localStorage.getItem('vastu_subscribers') || '[]');
  const adminCookies = JSON.parse(localStorage.getItem('vastu_cookies') || '[]');

  const mockOrders = [
    { id: 'MVG-2026-001', items: 3, date: 'Mar 10, 2026', status: 'Delivered', total: 3497 },
    { id: 'MVG-2026-002', items: 1, date: 'Mar 5, 2026', status: 'Processing', total: 1499 },
    { id: 'MVG-2026-003', items: 2, date: 'Feb 28, 2026', status: 'Confirmed', total: 2198 },
  ];

  const statusColors = { Confirmed: 'bg-green-100 text-green-700', Processing: 'bg-yellow/20 text-maroon', Delivered: 'bg-maroon/10 text-maroon' };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
      <div className="pt-24 min-h-screen bg-bg-light">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
            {/* Sidebar */}
            <div className="bg-maroon rounded-2xl p-6 text-white self-start lg:sticky lg:top-24">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-yellow rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-maroon font-poppins">{(user.name || 'U')[0]?.toUpperCase()}</span>
                </div>
                <p className="font-semibold font-poppins">{user.name || 'Guest'}</p>
                <p className="text-white/60 text-sm font-poppins">{user.email || 'Not signed in'}</p>
              </div>
              <div className="space-y-1">
                {tabs.map(t => (
                  <button key={t.id} onClick={() => setTab(t.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-poppins transition-colors
                    ${tab === t.id ? 'bg-white/20 text-yellow' : 'hover:bg-white/10'}`}>
                    <t.icon size={18} /> {t.label}
                  </button>
                ))}
                <button onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-poppins hover:bg-white/10 text-red-300">
                  <LogOut size={18} /> Logout
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              {tab === 'profile' && (
                <div>
                  <h2 className="text-2xl font-playfair font-bold text-maroon mb-6">My Profile</h2>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-yellow rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-maroon">{(user.name || 'U')[0]?.toUpperCase()}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-text-dark font-poppins">{user.name || 'Guest'}</p>
                      <p className="text-sm text-text-mid font-poppins">{user.email || 'No email'}</p>
                    </div>
                  </div>
                  {editing ? (
                    <div className="space-y-4 max-w-md">
                      <input value={editForm.name} onChange={e => setEditForm(p => ({ ...p, name: e.target.value }))}
                        placeholder="Name" className="w-full px-4 py-3 border border-gray-300 rounded-lg font-poppins text-sm focus:outline-none focus:border-maroon" />
                      <input value={editForm.email} onChange={e => setEditForm(p => ({ ...p, email: e.target.value }))}
                        placeholder="Email" className="w-full px-4 py-3 border border-gray-300 rounded-lg font-poppins text-sm focus:outline-none focus:border-maroon" />
                      <input value={editForm.phone} onChange={e => setEditForm(p => ({ ...p, phone: e.target.value }))}
                        placeholder="Phone" className="w-full px-4 py-3 border border-gray-300 rounded-lg font-poppins text-sm focus:outline-none focus:border-maroon" />
                      <div className="flex gap-3">
                        <button onClick={handleSaveProfile} className="btn-primary">Save</button>
                        <button onClick={() => setEditing(false)} className="btn-outline">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => setEditing(true)} className="btn-outline flex items-center gap-2">
                      <Edit size={16} /> Edit Profile
                    </button>
                  )}
                </div>
              )}

              {tab === 'orders' && (
                <div>
                  <h2 className="text-2xl font-playfair font-bold text-maroon mb-6">My Orders</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm font-poppins">
                      <thead><tr className="border-b border-gray-200 text-left text-text-mid">
                        <th className="pb-3">Order ID</th><th className="pb-3">Items</th><th className="pb-3">Date</th><th className="pb-3">Status</th><th className="pb-3">Total</th><th className="pb-3"></th>
                      </tr></thead>
                      <tbody>
                        {mockOrders.map(o => (
                          <tr key={o.id} className="border-b border-gray-100">
                            <td className="py-4 font-semibold text-maroon">{o.id}</td>
                            <td className="py-4">{o.items} items</td>
                            <td className="py-4 text-text-mid">{o.date}</td>
                            <td className="py-4"><span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[o.status]}`}>{o.status}</span></td>
                            <td className="py-4 font-semibold">₹{o.total.toLocaleString()}</td>
                            <td className="py-4"><a href={WA.general()} target="_blank" rel="noopener noreferrer" className="text-maroon hover:text-yellow text-xs font-semibold">Reorder</a></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {tab === 'courses' && (
                <div>
                  <h2 className="text-2xl font-playfair font-bold text-maroon mb-6">Enrolled Courses</h2>
                  <div className="text-center py-12">
                    <BookOpen size={48} className="text-gray-300 mx-auto mb-4" />
                    <p className="text-text-mid font-poppins mb-4">No enrolled courses yet.</p>
                    <Link to="/courses" className="btn-primary">Browse Courses</Link>
                  </div>
                </div>
              )}

              {tab === 'wishlist' && (
                <div>
                  <h2 className="text-2xl font-playfair font-bold text-maroon mb-6">Wishlist ({wishlistProducts.length})</h2>
                  {wishlistProducts.length === 0 ? (
                    <div className="text-center py-12">
                      <Heart size={48} className="text-gray-300 mx-auto mb-4" />
                      <p className="text-text-mid font-poppins mb-4">Your wishlist is empty.</p>
                      <Link to="/products" className="btn-primary">Browse Products</Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {wishlistProducts.map(p => (
                        <div key={p.id} className="bg-white border border-gray-200 rounded-xl p-4 flex gap-4">
                          <img src={p.images[0]} alt={p.name} className="w-20 h-20 object-cover rounded-lg" />
                          <div className="flex-1">
                            <Link to={`/products/${p.id}`} className="font-poppins font-semibold text-sm text-text-dark hover:text-maroon line-clamp-2">{p.name}</Link>
                            <p className="text-maroon font-bold text-sm mt-1">₹{p.price.toLocaleString()}</p>
                            <div className="flex gap-2 mt-2">
                              <button onClick={() => { addItem(p); toast.success('Added to cart!'); }} className="text-xs bg-yellow text-maroon px-3 py-1 rounded font-semibold">Add to Cart</button>
                              <button onClick={() => wishlistToggle(p.id)} className="text-xs text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {tab === 'settings' && (
                <div>
                  <h2 className="text-2xl font-playfair font-bold text-maroon mb-6">Settings</h2>
                  <div className="space-y-4 max-w-md">
                    {[
                      { key: 'emailNotif', label: 'Email Notifications', desc: 'Receive order and booking updates via email' },
                      { key: 'whatsappUpdates', label: 'WhatsApp Updates', desc: 'Get offers and tips on WhatsApp' },
                    ].map(s => (
                      <div key={s.key} className="flex items-center justify-between p-4 bg-bg-light rounded-xl">
                        <div>
                          <p className="font-semibold text-text-dark font-poppins text-sm">{s.label}</p>
                          <p className="text-xs text-text-mid font-poppins">{s.desc}</p>
                        </div>
                        <button onClick={() => handleSettingChange(s.key)}
                          className={`w-12 h-6 rounded-full transition-colors relative ${settings[s.key] ? 'bg-maroon' : 'bg-gray-300'}`}>
                          <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${settings[s.key] ? 'left-6' : 'left-0.5'}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tab === 'admin' && (
                <div>
                  <h2 className="text-2xl font-playfair font-bold text-maroon mb-6">Admin Panel</h2>
                  
                  <div className="mb-8">
                    <h3 className="text-lg font-playfair font-bold text-text-dark mb-4 border-b pb-2">Newsletter Subscribers ({adminSubscribers.length})</h3>
                    {adminSubscribers.length === 0 ? (
                      <p className="text-text-mid font-poppins text-sm py-4">No subscribers yet.</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm font-poppins border border-gray-100 rounded-lg">
                          <thead className="bg-gray-50">
                            <tr className="text-left text-text-mid">
                              <th className="py-3 px-4">Email</th>
                              <th className="py-3 px-4">Date Subscribed</th>
                            </tr>
                          </thead>
                          <tbody>
                            {adminSubscribers.map((s, i) => (
                              <tr key={i} className="border-b border-gray-100 hover:bg-yellow/5">
                                <td className="py-3 px-4 font-semibold text-text-dark">{s.email}</td>
                                <td className="py-3 px-4 text-text-mid">{new Date(s.date).toLocaleString()}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-playfair font-bold text-text-dark mb-4 border-b pb-2">Cookie Consents ({adminCookies.length})</h3>
                    {adminCookies.length === 0 ? (
                      <p className="text-text-mid font-poppins text-sm py-4">No cookie data yet.</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm font-poppins border border-gray-100 rounded-lg">
                          <thead className="bg-gray-50">
                            <tr className="text-left text-text-mid">
                              <th className="py-3 px-4">Status</th>
                              <th className="py-3 px-4">Date</th>
                              <th className="py-3 px-4">User Agent</th>
                            </tr>
                          </thead>
                          <tbody>
                            {adminCookies.slice().reverse().map((c, i) => (
                              <tr key={i} className="border-b border-gray-100 hover:bg-yellow/5">
                                <td className="py-3 px-4">
                                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${c.status === 'accepted' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {c.status}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-text-mid">{new Date(c.date).toLocaleString()}</td>
                                <td className="py-3 px-4 text-text-mid text-xs max-w-xs truncate" title={c.userAgent}>{c.userAgent}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
