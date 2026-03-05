import { Search } from 'lucide-react';

export const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md p-4 border-b border-gray-100">
      <div className="relative max-w-md mx-auto md:max-w-5xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Buscar produtos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          data-testid="search-input"
          className="w-full bg-gray-100/50 border-0 rounded-xl px-4 py-3 pl-10 text-sm focus:ring-1 focus:ring-black focus:bg-white transition-all placeholder:text-gray-400 focus:outline-none"
        />
      </div>
    </div>
  );
};
