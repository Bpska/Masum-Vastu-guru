import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Trash2, Minus, Plus, ArrowRight } from 'lucide-react';
import useCartStore from '../store/cartStore';
import AddressModal from '../components/modals/AddressModal';

const Cart = () => {
  const { items, removeItem, updateQty, getTotal, clearCart } = useCartStore();
  const [addressOpen, setAddressOpen] = useState(false);
  const subtotal = getTotal();
  const shipping = subtotal >= 999 ? 0 : 99;
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + gst;

  if (items.length === 0) return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="pt-36 md:pt-40 lg:pt-44 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <ShoppingCart size={80} className="text-maroon/30 mx-auto mb-4" />
        <h2 className="text-2xl font-playfair font-bold text-maroon mb-2">Your cart is empty</h2>
        <p className="text-text-mid font-poppins mb-6">Looks like you haven't added anything yet.</p>
        <Link to="/products" className="btn-primary inline-flex items-center gap-2">Start Shopping <ArrowRight size={16} /></Link>
      </div>
    </motion.div>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
      <div className="pt-36 md:pt-40 lg:pt-44 max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-playfair font-bold text-maroon mb-8">Shopping Cart ({items.length})</h1>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          {/* Cart Items */}
          <div className="space-y-4">
            {items.map(item => (
              <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-1 min-w-0">
                  <Link to={`/products/${item.id}`} className="font-poppins font-semibold text-text-dark hover:text-maroon line-clamp-1">{item.name}</Link>
                  <p className="text-xs text-text-mid font-poppins">{item.category}</p>
                  <p className="text-maroon font-bold font-poppins mt-1">₹{item.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button onClick={() => updateQty(item.id, item.qty - 1)} className="px-3 py-2 hover:bg-gray-100"><Minus size={14} /></button>
                  <span className="px-3 py-2 border-x border-gray-300 font-poppins font-semibold min-w-[40px] text-center">{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)} className="px-3 py-2 hover:bg-gray-100"><Plus size={14} /></button>
                </div>
                <p className="font-bold text-maroon font-poppins min-w-[80px] text-right">₹{(item.price * item.qty).toLocaleString()}</p>
                <button onClick={() => removeItem(item.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
              </div>
            ))}
            <Link to="/products" className="text-maroon font-semibold font-poppins hover:text-yellow inline-flex items-center gap-1 text-sm">
              ← Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24 self-start">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-xl font-playfair font-bold text-maroon mb-4">Order Summary</h3>
              <div className="space-y-3 text-sm font-poppins mb-4">
                <div className="flex justify-between"><span className="text-text-mid">Subtotal</span><span className="font-semibold">₹{subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-text-mid">Shipping</span><span className="font-semibold text-green-600">{shipping === 0 ? 'Free' : `₹${shipping}`}</span></div>
                <div className="flex justify-between"><span className="text-text-mid">GST (18%)</span><span className="font-semibold">₹{gst.toLocaleString()}</span></div>
                <div className="border-t pt-3 flex justify-between"><span className="font-bold text-lg text-text-dark">Total</span><span className="font-bold text-2xl text-maroon">₹{total.toLocaleString()}</span></div>
              </div>
              <button onClick={() => setAddressOpen(true)} className="btn-primary w-full text-base py-3 mb-3">
                Proceed to Checkout via WhatsApp
              </button>
              <p className="text-xs text-text-mid text-center font-poppins italic">We process orders via WhatsApp for your convenience.</p>
              <p className="text-xs text-text-mid text-center font-poppins mt-2">Accepted: Cash / UPI / Bank Transfer after WhatsApp confirmation</p>
            </div>
          </div>
        </div>
      </div>

      <AddressModal isOpen={addressOpen} onClose={() => setAddressOpen(false)} cartItems={items} total={total} />
    </motion.div>
  );
};

export default Cart;
