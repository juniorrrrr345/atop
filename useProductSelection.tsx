import { useState, useCallback } from 'react';
import { Product } from '@/lib/types';
import { create } from 'zustand';

// On crée un store Zustand pour partager l'état de sélection des produits entre les composants
type ProductSelectionStore = {
  selectedProduct: Product | null;
  isDrawerOpen: boolean;
  selectProduct: (product: Product) => void;
  closeDrawer: () => void;
};

export const useProductSelectionStore = create<ProductSelectionStore>((set) => ({
  selectedProduct: null,
  isDrawerOpen: false,
  selectProduct: (product) => set({ selectedProduct: product, isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),
}));

// Hook pour utiliser le store dans les composants
export function useProductSelection() {
  const { selectedProduct, isDrawerOpen, selectProduct, closeDrawer } = useProductSelectionStore();

  const handleProductClick = useCallback((product: Product) => {
    selectProduct(product);
  }, [selectProduct]);

  return {
    selectedProduct,
    isDrawerOpen,
    handleProductClick,
    closeDrawer
  };
}