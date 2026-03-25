import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],
      toggle: (productId) => {
        const items = get().items;
        if (items.includes(productId)) {
          set({ items: items.filter(id => id !== productId) });
        } else {
          set({ items: [...items, productId] });
        }
      },
      has: (productId) => get().items.includes(productId),
      getAll: () => get().items,
    }),
    { name: 'vastu-wishlist' }
  )
);

export default useWishlistStore;
