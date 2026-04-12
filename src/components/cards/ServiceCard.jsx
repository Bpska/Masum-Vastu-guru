import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, MapPin, Video, Wrench, Lightbulb, Map, ShoppingCart } from 'lucide-react';
import useCartStore from '../../store/cartStore';
import toast from 'react-hot-toast';

const iconMap = { MapPin, Video, Wrench, Lightbulb, Map };

const ServiceCard = ({ service, index = 0, onBook }) => {
  const Icon = iconMap[service.icon] || MapPin;
  const addItem = useCartStore(s => s.addItem);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: service.id,
      name: service.name,
      price: service.price,
      images: [service.image || ''],
      category: 'Services'
    });
    toast.success('Service added to cart! 🛒');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
      id={`service-${service.id}`}
      className="bg-white rounded-xl overflow-hidden shadow-md card-hover border border-transparent hover:border-yellow/50 hover:shadow-[0_8px_30px_rgba(244,187,0,0.15)] group relative"
    >
      <div className="bg-gradient-to-r from-maroon to-maroon-dark p-6">
        <div className="w-12 h-12 bg-yellow rounded-full flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
          <Icon size={24} className="text-maroon" />
        </div>
        <h3 className="text-white font-playfair font-bold text-xl">{service.name}</h3>
        <p className="text-white/70 text-sm font-poppins mt-1">{service.shortDesc}</p>
      </div>
      <div className="p-6">
        <ul className="space-y-2 mb-4">
          {service.features.slice(0, 4).map((f, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-text-mid font-poppins">
              <CheckCircle size={16} className="text-yellow flex-shrink-0" /> {f}
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-maroon font-poppins">{service.priceLabel}</span>
          <span className="text-sm text-text-mid font-poppins">{service.duration}</span>
        </div>
        
        <div className="flex flex-col gap-2">
          {service.canAddToCart && (
            <button onClick={handleAddToCart}
              className="bg-maroon text-white w-full py-2.5 rounded-lg text-sm font-semibold font-poppins flex items-center justify-center gap-2 hover:bg-yellow hover:text-maroon transition-all duration-300 border border-maroon">
              <ShoppingCart size={16} /> Add to Cart
            </button>
          )}
          <button onClick={() => onBook?.(service.name)}
            className={`w-full flex items-center justify-center gap-2 ${service.canAddToCart ? 'btn-outline border-maroon text-maroon hover:bg-maroon/5' : 'btn-secondary'}`}>
            Book Now <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
