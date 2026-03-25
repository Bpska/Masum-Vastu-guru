import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { WA } from '../../constants';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().regex(/^\d{10}$/, 'Enter 10-digit phone number'),
});

const EnrollmentModal = ({ isOpen, onClose, courseName = '' }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    const url = WA.course(courseName, data.name, data.phone);
    window.open(url, '_blank');
    toast.success('Enrollment request sent! 🎓');
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
          onClick={e => e.stopPropagation()} className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-xl font-playfair font-bold text-maroon">Enroll Now</h3>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full"><X size={20} /></button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
            <div className="bg-yellow/10 border border-yellow/30 rounded-lg p-3">
              <p className="text-sm text-text-mid font-poppins">Course</p>
              <p className="font-semibold text-maroon font-poppins">{courseName}</p>
            </div>
            <div>
              <input {...register('name')} placeholder="Full Name *" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-maroon font-poppins text-sm" />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <input {...register('email')} type="email" placeholder="Email *" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-maroon font-poppins text-sm" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <input {...register('phone')} type="tel" placeholder="Phone (10 digits) *" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-maroon font-poppins text-sm" />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>
            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
              Enroll via WhatsApp
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EnrollmentModal;
