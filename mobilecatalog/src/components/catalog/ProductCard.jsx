export const ProductCard = ({ product, onClick }) => {
  return (
    <div
      onClick={onClick}
      data-testid={`product-card-${product.id}`}
      className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all hover:shadow-md cursor-pointer"
    >
      <div className="aspect-[3/4] overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.imageAlt}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-3 space-y-1">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
          {product.name}
        </h3>
        {/* <p className="text-lg font-medium text-black">
          R$ {product.price.toFixed(2).replace('.', ',')}
        </p> */}
      </div>
    </div>
  );
};
