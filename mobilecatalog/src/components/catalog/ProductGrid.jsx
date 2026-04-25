import { ProductCard } from './ProductCard';
import { useState, useEffect } from 'react';

export const ProductGrid = ({ products, onProductClick, isLoading = false }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation
    setVisible(true);
  }, [products]);

  if (isLoading) {
    return (
      <div
        className="grid grid-cols-2 gap-4 p-4 md:grid-cols-4 md:gap-6 md:p-8"
        data-testid="product-grid-loading"
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={`product-skeleton-${index}`}
            className="overflow-hidden rounded-3xl border border-gray-100 bg-white p-3 shadow-sm"
          >
            <div className="aspect-[0.9] animate-pulse rounded-2xl bg-gray-100" />
            <div className="mt-3 space-y-2">
              <div className="h-4 w-3/4 animate-pulse rounded-full bg-gray-100" />
              <div className="h-3 w-1/2 animate-pulse rounded-full bg-gray-100" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-2 gap-4 p-4 md:grid-cols-4 md:gap-6 md:p-8 transition-opacity duration-400 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      data-testid="product-grid"
    >
      {products.map((product, index) => (
        <div
          key={product.id}
          style={{
            animation: `fadeInUp 0.4s ease-out ${index * 0.05}s both`
          }}
        >
          <ProductCard product={product} onClick={() => onProductClick(product)} />
        </div>
      ))}
    </div>
  );
};
