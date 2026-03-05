import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CatalogLayout } from '../components/catalog/CatalogLayout';
import { SearchBar } from '../components/catalog/SearchBar';
import { CategoryFilter } from '../components/catalog/CategoryFilter';
import { ProductGrid } from '../components/catalog/ProductGrid';
import { ProductDetail } from '../components/catalog/ProductDetail';
import { fetchCatalogData } from '../data/mockCatalog';
import { toast } from 'sonner';
import { catalogData as MOCK_DATABASE} from '../data/mockCatalog'; // Importe o mock aqui

export const CatalogPage = () => {

  const navigate = useNavigate();
  
  const [catalogData, setCatalogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  
  // Em vez de buscar na API, pegamos direto do objeto local
  const { companyId } = useParams();
  const companyInfo = MOCK_DATABASE[companyId];
  setCatalogData(companyInfo)

  if (!companyInfo) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-xl font-bold">Empresa não encontrada</h1>
        <button onClick={() => navigate('/nike')} className="mt-4 text-blue-500 underline">
          Ir para Nike Store
        </button>
      </div>
    );
  }

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
        
    if (!catalogData) return [];
    
    console.log("Filtrando", catalogData)
    
    let products = catalogData.products;

    // Filter by category
    if (selectedCategory !== 'Todos') {
      products = products.filter(p => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }

    return products;
  }, [catalogData, selectedCategory, searchQuery]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm text-gray-600">Carregando catálogo...</p>
        </div>
      </div>
    );
  }

  if (!catalogData) {
    return null;
  }

  return (
    <CatalogLayout companyName={catalogData.companyName}>
      
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <CategoryFilter
        categories={catalogData.categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {filteredProducts == "null" ? (
        <div className="text-center py-20 px-4">
          <p className="text-gray-400 text-sm">Nenhum produto encontrado</p>
        </div>
      ) : (
        <ProductGrid
          products={filteredProducts}
          onProductClick={handleProductClick}
        />
      )}

      <ProductDetail
        product={selectedProduct}
        open={isDrawerOpen}
        onClose={setIsDrawerOpen}
        whatsappNumber={catalogData.whatsappNumber}
      />
    </CatalogLayout>
  );
};
