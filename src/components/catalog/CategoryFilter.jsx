export const CategoryFilter = ({ categories, selectedCategory, setSelectedCategory }) => {
  // Handle both string arrays and object arrays
  const getCategoryId = (cat) => typeof cat === 'string' ? cat : cat.id;
  const getCategoryName = (cat) => typeof cat === 'string' ? cat : cat.name;

  return (
    <div className="flex gap-2 overflow-x-auto py-2 px-4 no-scrollbar scroll-smooth">
      {categories.map((category) => {
        const categoryId = getCategoryId(category);
        const categoryName = getCategoryName(category);
        
        return (
          <button
            key={categoryId}
            onClick={() => setSelectedCategory(categoryId)}
            data-testid={`category-chip-${categoryId}`}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
              selectedCategory === categoryId
                ? 'bg-black text-white border-black'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
            }`}
          >
            {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
          </button>
        );
      })}
    </div>
  );
};