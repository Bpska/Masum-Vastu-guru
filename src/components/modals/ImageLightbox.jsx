import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const ImageLightbox = ({ isOpen, onClose, imageSrc, altText }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-10"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative max-w-5xl w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 md:-right-12 text-white hover:text-yellow transition-colors p-2 bg-white/10 rounded-full backdrop-blur-md"
            >
              <X size={32} />
            </button>
            <img
              src={imageSrc}
              alt={altText || "Full size view"}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
            {altText && (
              <div className="absolute -bottom-10 left-0 right-0 text-center">
                <p className="text-white font-playfair font-medium text-lg">{altText}</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageLightbox;
