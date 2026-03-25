import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye } from 'lucide-react';
import StarRating from '../common/StarRating';
import useCartStore from '../../store/cartStore';
import toast from 'react-hot-toast';

const ProductCard = ({ product, index = 0 }) => {
  const addItem = useCartStore(s => s.addItem);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;
    addItem(product);
    toast.success('Added to cart! 🛒');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
    >
      <Link to={`/products/${product.id}`} className="block group">
        <div className="bg-white rounded-xl overflow-hidden shadow-md card-hover border border-transparent hover:border-yellow/50 hover:shadow-[0_8px_30px_rgba(244,187,0,0.15)] relative">
          {/* Image */}
          <div className="aspect-square overflow-hidden relative">
            <img src={product.images[0]} alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.08]" />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
              {product.isBestseller && (
                <span className="bg-yellow text-maroon text-xs font-bold px-2 py-1 rounded-md">BESTSELLER</span>
              )}
              {product.discount > 0 && (
                <span className="bg-maroon text-white text-xs font-bold px-2 py-1 rounded-md">{product.discount}% OFF</span>
              )}
            </div>

            {/* Out of stock */}
            {!product.inStock && (
              <div className="absolute inset-0 bg-gray-500/50 flex items-center justify-center">
                <span className="bg-white text-gray-700 px-4 py-2 rounded-lg font-semibold text-sm">Out of Stock</span>
              </div>
            )}

            {/* Quick view overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <span className="bg-maroon text-white px-4 py-2 rounded-lg text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                <Eye size={16} /> Quick View
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="p-4">
            <p className="text-xs text-text-mid font-poppins uppercase tracking-wide mb-1">{product.category}</p>
            <h3 className="font-poppins font-semibold text-text-dark text-sm line-clamp-2 mb-2 min-h-[40px]">{product.name}</h3>
            <div className="flex items-center gap-2 mb-2">
              <StarRating rating={product.rating} size={14} />
              <span className="text-xs text-text-mid">({product.reviewCount})</span>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-maroon font-bold text-lg">₹{product.price.toLocaleString()}</span>
              {product.originalPrice > product.price && (
                <span className="text-text-mid line-through text-sm">₹{product.originalPrice.toLocaleString()}</span>
              )}
            </div>
            <button onClick={handleAddToCart} disabled={!product.inStock}
              className={`w-full py-2.5 rounded-lg text-sm font-semibold font-poppins flex items-center justify-center gap-2 transition-all duration-300
              ${product.inStock ? 'bg-maroon text-white hover:bg-yellow hover:text-maroon' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
              <ShoppingCart size={16} /> Add to Cart
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
