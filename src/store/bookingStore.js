import { create } from 'zustand';

const useBookingStore = create((set) => ({
  isOpen: false,
  openBooking: () => set({ isOpen: true }),
  closeBooking: () => set({ isOpen: false }),
}));

export default useBookingStore;
