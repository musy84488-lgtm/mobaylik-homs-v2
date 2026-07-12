'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types';

interface CompareState {
  items: { product: Product; addedAt: string }[];
  maxItems: number;
  addItem: (product: Product) => boolean;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => boolean;
  clearCompare: () => void;
  isInCompare: (productId: string) => boolean;
  getCount: () => number;
  canAddMore: () => boolean;
}

export const useCompare = create<CompareState>()(
  persist(
    (set, get) => ({
      items: [],
      maxItems: 4,

      addItem: (product) => {
        if (get().items.length >= get().maxItems) {
          return false;
        }
        set((state) => {
          if (state.items.some((item) => item.product.id === product.id)) {
            return state;
          }
          return {
            items: [...state.items, { product, addedAt: new Date().toISOString() }],
          };
        });
        return true;
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },

      toggleItem: (product) => {
        const isInCompare = get().isInCompare(product.id);
        if (isInCompare) {
          get().removeItem(product.id);
          return true;
        } else {
          return get().addItem(product);
        }
      },

      clearCompare: () => set({ items: [] }),

      isInCompare: (productId) => {
        return get().items.some((item) => item.product.id === productId);
      },

      getCount: () => get().items.length,

      canAddMore: () => get().items.length < get().maxItems,
    }),
    {
      name: 'mobaylik-compare',
      version: 1,
    }
  )
);
