import { create } from "zustand";
import type { Product } from "../api/api";

interface CartState {
  items: Product[];
  add: (p: Product) => void;
  remove: (id: string) => void;
  clear: () => void;
}

export const useCart = create<CartState>((set) => ({
  items: [],
  add: (p) => set((state) => ({ items: [...state.items, p] })),
  remove: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  clear: () => set({ items: [] })
}));
