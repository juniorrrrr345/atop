import React from 'react';
import ProductDrawer from './ProductDrawer';
import { useProductSelectionStore } from '@/hooks/useProductSelection';

// Un composant global qui sera utilisé une seule fois dans l'application
export function GlobalProductDrawer() {
  const { selectedProduct, isDrawerOpen, closeDrawer } = useProductSelectionStore();

  return (
    <ProductDrawer
      product={selectedProduct}
      isOpen={isDrawerOpen}
      onClose={closeDrawer}
    />
  );
}