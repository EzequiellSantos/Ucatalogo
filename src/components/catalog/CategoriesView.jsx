import { Package } from 'lucide-react';

export const CategoriesView = ({ categories, onCategorySelect }) => {
  // Exclude 'Todos' from the grid view
  const displayCategories = categories.filter(cat => cat.id !== 'Todos');

  return (
    <div className="p-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Categorias</h1>
        <p className="text-sm text-gray-600">Explore nossos produtos por categoria</p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 gap-4">
        {displayCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            data-testid={`category-card-${category.id}`}
            className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 hover:shadow-lg transition-all active:scale-95"
          >
            {/* Category Image */}
            <div className="aspect-square overflow-hidden bg-gray-50">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Category Info */}
            <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
              <h3 className="text-sm font-semibold capitalize">{category.name}</h3>
              <div className="flex items-center gap-1 mt-1">
                <Package className="w-3 h-3" />
                <p className="text-xs">{category.count} produtos</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* View All Button */}
      <button
        onClick={() => onCategorySelect('Todos')}
        data-testid="view-all-products"
        className="w-full bg-gray-900 text-white rounded-2xl py-4 font-medium hover:bg-gray-800 transition-colors"
      >
        Ver Todos os Produtos
      </button>
    </div>
  );
};
