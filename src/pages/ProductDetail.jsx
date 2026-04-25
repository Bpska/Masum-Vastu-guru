import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, Heart, ShoppingCart, Share2, Check, Truck } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { products } from '../data/products';
import ProductCard from '../components/cards/ProductCard';
import StarRating from '../components/common/StarRating';
import useCartStore from '../store/cartStore';
import useWishlistStore from '../store/wishlistStore';
import AddressModal from '../components/modals/AddressModal';
import { WA } from '../constants';
import toast from 'react-hot-toast';

const mockReviews = [
  { name: "Priya M.", date: "Feb 2026", rating: 5, text: "Excellent quality! The energy is truly amazing. Noticed positive changes within days of placing it.", verified: true },
  { name: "Rahul S.", date: "Jan 2026", rating: 4, text: "Good product, delivered well-packed. The quality matches the description perfectly.", verified: true },
  { name: "Sunita K.", date: "Dec 2025", rating: 5, text: "Beautiful product! Masum sir guided me on the perfect placement. Very happy with the purchase.", verified: true },
  { name: "Amit G.", date: "Nov 2025", rating: 5, text: "Third purchase from this store. The products are always genuine and well-energized. Highly recommend!", verified: false },
];

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const [selectedImg, setSelectedImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [addressOpen, setAddressOpen] = useState(false);
  const addItem = useCartStore(s => s.addItem);
  const wishlistToggle = useWishlistStore(s => s.toggle);
  const wishlistHas = useWishlistStore(s => s.items.includes(Number(id)));

  if (!product) return (
    <div className="pt-36 md:pt-40 lg:pt-44 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-playfair font-bold text-maroon mb-4">Product Not Found</h2>
        <Link to="/products" className="btn-primary">Browse Products</Link>
      </div>
    </div>
  );

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const tabs = ['description', 'benefits', 'usage', 'reviews'];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
      <div className="pt-36 md:pt-40 lg:pt-44 max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm font-poppins text-text-mid mb-6">
          <Link to="/" className="hover:text-maroon">Home</Link> <span>/</span>
          <Link to="/products" className="hover:text-maroon">Products</Link> <span>/</span>
          <span className="text-text-dark">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left - Images */}
          <div>
            <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 mb-4 relative">
              <img src={product.images[selectedImg]} alt={product.name} className="w-full h-full object-cover" />
              {product.isBestseller && (
                <span className="absolute top-4 left-4 bg-yellow text-maroon text-xs font-bold px-3 py-1 rounded-md">BESTSELLER</span>
              )}
              {product.discount > 0 && (
                <span className="absolute top-4 right-4 bg-maroon text-white text-xs font-bold px-3 py-1 rounded-md">{product.discount}% OFF</span>
              )}
            </div>
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImg(i)}
                  className={`aspect-square rounded-lg overflow-hidden border-3 transition-colors ${selectedImg === i ? 'border-yellow' : 'border-transparent'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right - Product Info */}
          <div>
            <span className="inline-block bg-yellow/20 text-maroon text-xs font-semibold px-3 py-1 rounded-full font-poppins mb-2">{product.category}</span>
            <h1 className="text-3xl lg:text-4xl font-playfair font-bold text-maroon mb-3">{product.name}</h1>
            <div className="flex items-center gap-3 mb-4">
              <StarRating rating={product.rating} size={18} />
              <span className="text-sm text-text-mid font-poppins">{product.rating} ({product.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-bold text-maroon font-poppins">₹{product.price.toLocaleString()}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-lg text-text-mid line-through font-poppins">₹{product.originalPrice.toLocaleString()}</span>
                  <span className="bg-maroon/10 text-maroon text-xs font-bold px-2 py-1 rounded">Save ₹{(product.originalPrice - product.price).toLocaleString()} ({product.discount}% OFF)</span>
                </>
              )}
            </div>
            <div className="mb-4">
              {product.inStock ? (
                <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full"><Check size={14} /> In Stock</span>
              ) : (
                <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 text-sm font-semibold px-3 py-1 rounded-full">Out of Stock</span>
              )}
            </div>
            <p className="text-text-mid font-poppins mb-6 leading-relaxed">{product.description}</p>

            {/* Qty */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-semibold font-poppins text-text-dark">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3 py-2 hover:bg-gray-100 text-maroon"><Minus size={16} /></button>
                <span className="px-4 py-2 font-semibold font-poppins border-x border-gray-300 min-w-[48px] text-center">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="px-3 py-2 hover:bg-gray-100 text-maroon"><Plus size={16} /></button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-6">
              <button onClick={() => { for (let i = 0; i < qty; i++) addItem(product); toast.success('Added to cart! 🛒'); }}
                disabled={!product.inStock} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50">
                <ShoppingCart size={18} /> Add to Cart
              </button>
              <button onClick={() => product.inStock && setAddressOpen(true)}
                disabled={!product.inStock} className="btn-secondary w-full flex items-center justify-center gap-2 disabled:opacity-50">
                Buy Now
              </button>
              <button onClick={() => { wishlistToggle(product.id); toast.success(wishlistHas ? 'Removed from wishlist' : 'Added to wishlist! ❤️'); }}
                className={`btn-outline w-full flex items-center justify-center gap-2 ${wishlistHas ? 'bg-maroon text-white' : ''}`}>
                <Heart size={18} fill={wishlistHas ? 'white' : 'none'} /> {wishlistHas ? 'In Wishlist' : 'Add to Wishlist'}
              </button>
            </div>

            {/* Meta */}
            <div className="border-t border-gray-200 pt-4 space-y-2 text-sm font-poppins text-text-mid">
              <p><span className="font-semibold text-text-dark">Category:</span> {product.category}</p>
              <p><span className="font-semibold text-text-dark">SKU:</span> {product.sku}</p>
              {product.freeShipping && <p className="flex items-center gap-1 text-green-600"><Truck size={14} /> Free Shipping</p>}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12 border-t pt-8">
          <div className="flex gap-0 border-b border-gray-200 mb-6 overflow-x-auto">
            {tabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`relative px-6 py-3 font-poppins font-semibold text-sm capitalize whitespace-nowrap transition-colors
                ${activeTab === tab ? 'text-maroon' : 'text-text-mid hover:text-maroon'}`}>
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow" />
                )}
              </button>
            ))}
          </div>
          <div className="min-h-[200px]">
            {activeTab === 'description' && <p className="text-text-mid font-poppins leading-relaxed max-w-3xl">{product.description}</p>}
            {activeTab === 'benefits' && (
              <ul className="space-y-3 max-w-3xl">
                {product.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-text-mid font-poppins">
                    <Check size={18} className="text-yellow flex-shrink-0 mt-0.5" /> {b}
                  </li>
                ))}
              </ul>
            )}
            {activeTab === 'usage' && <p className="text-text-mid font-poppins leading-relaxed max-w-3xl">{product.usage}</p>}
            {activeTab === 'reviews' && (
              <div className="space-y-4 max-w-3xl">
                {mockReviews.map((r, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-maroon/10 flex items-center justify-center text-maroon font-bold font-poppins text-sm">{r.name[0]}</div>
                        <div>
                          <p className="font-semibold text-text-dark font-poppins text-sm">{r.name}</p>
                          <p className="text-xs text-text-mid font-poppins">{r.date}</p>
                        </div>
                      </div>
                      {r.verified && <span className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-1 rounded">✓ Verified Purchase</span>}
                    </div>
                    <StarRating rating={r.rating} size={14} />
                    <p className="text-text-mid font-poppins text-sm mt-2">{r.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="section-title">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </section>
        )}
      </div>

      <AddressModal isOpen={addressOpen} onClose={() => setAddressOpen(false)}
        cartItems={[{ name: product.name, price: product.price, qty }]} total={product.price * qty} />
    </motion.div>
  );
};

export default ProductDetail;
