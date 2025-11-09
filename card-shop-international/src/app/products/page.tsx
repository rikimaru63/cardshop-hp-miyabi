import { Suspense } from 'react';
import ProductsPageClient from '@/components/ui/ProductsPageClient';
import { products, categories } from '@/lib/data/products';

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsPageClient 
        initialProducts={products}
        allCategories={categories}
      />
    </Suspense>
  );
}