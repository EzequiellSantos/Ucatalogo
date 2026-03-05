import { ProductCard } from './ProductCard';
import { useState, useEffect } from 'react';

export const ProductGrid = ({ products, onProductClick }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation
    setVisible(true);
  }, [products]);

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
