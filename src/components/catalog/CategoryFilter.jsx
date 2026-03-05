export const CategoryFilter = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="flex gap-2 overflow-x-auto py-2 px-4 no-scrollbar scroll-smooth">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          data-testid={`category-chip-${category}`}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
            selectedCategory === category
              ? 'bg-black text-white border-black'
              : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
          }`}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  );
};
