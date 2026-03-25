import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { WA } from '../../constants';
import toast from 'react-hot-toast';
import { services } from '../../data/services';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().regex(/^\d{10}$/, 'Enter 10-digit phone number'),
  service: z.string().min(1, 'Select a service'),
  date: z.string().min(1, 'Select a date'),
  time: z.string().min(1, 'Select a time slot'),
  address: z.string().min(5, 'Enter property address'),
  message: z.string().optional(),
  terms: z.literal(true, { errorMap: () => ({ message: 'Accept terms to proceed' }) }),
});

const BookingModal = ({ isOpen, onClose, preSelectedService = '' }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { service: preSelectedService, terms: false },
  });

  const onSubmit = (data) => {
    const url = WA.booking(data.service, data.name, data.phone, data.date, data.time, data.address);
    window.open(url, '_blank');
    toast.success('Booking request sent! 📅');
    reset();
    onClose();
  };

  const today = new Date().toISOString().split('T')[0];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
          onClick={e => e.stopPropagation()} className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
          <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10">
            <h3 className="text-xl font-playfair font-bold text-maroon">Book Consultation</h3>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full"><X size={20} /></button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
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
            <div>
              <select {...register('service')} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-maroon font-poppins text-sm">
                <option value="">Select Service *</option>
                {services.map(s => <option key={s.id} value={s.name}>{s.name} — {s.priceLabel}</option>)}
              </select>
              {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service.message}</p>}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input {...register('date')} type="date" min={today} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-maroon font-poppins text-sm" />
                {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
              </div>
              <div>
                <select {...register('time')} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-maroon font-poppins text-sm">
                  <option value="">Time Slot *</option>
                  <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                  <option value="Afternoon (12 PM - 5 PM)">Afternoon (12 PM - 5 PM)</option>
                  <option value="Evening (5 PM - 8 PM)">Evening (5 PM - 8 PM)</option>
                </select>
                {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>}
              </div>
            </div>
            <div>
              <textarea {...register('address')} rows={2} placeholder="Property Address *" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-maroon font-poppins text-sm resize-none" />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
            </div>
            <div>
              <textarea {...register('message')} rows={2} placeholder="Message (optional)" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-maroon font-poppins text-sm resize-none" />
            </div>
            <label className="flex items-start gap-2 text-sm text-gray-600 font-poppins">
              <input type="checkbox" {...register('terms')} className="accent-maroon mt-1" />
              <span>I agree to the Terms &amp; Conditions and consent to be contacted via WhatsApp *</span>
            </label>
            {errors.terms && <p className="text-red-500 text-xs">{errors.terms.message}</p>}
            <button type="submit" className="btn-secondary w-full flex items-center justify-center gap-2">
              Send Booking on WhatsApp
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BookingModal;
