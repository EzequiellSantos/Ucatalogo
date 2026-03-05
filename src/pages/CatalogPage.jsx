import { useState, useMemo } from 'react'; // Removido useEffect
import { useParams, useNavigate } from 'react-router-dom';
import { CatalogLayout } from '../components/catalog/CatalogLayout';
import { SearchBar } from '../components/catalog/SearchBar';
import { CategoryFilter } from '../components/catalog/CategoryFilter';
import { ProductGrid } from '../components/catalog/ProductGrid';
import { ProductDetail } from '../components/catalog/ProductDetail';
import { catalogData as MOCK_DATABASE } from '../data/mockCatalog'; 

export const CatalogPage = () => {
  const navigate = useNavigate();
  const { companyId } = useParams();

  // 1. Pegamos os dados diretamente do import (Sem useState para os dados brutos)
  const companyInfo = MOCK_DATABASE[companyId];

  // 2. Estados apenas para a INTERAÇÃO do usuário
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // 3. Verificação de erro (Se a empresa não existir no JSON)
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

  // 4. Filtro de produtos usando os dados de 'companyInfo'
  const filteredProducts = useMemo(() => {
    let products = companyInfo.products || [];

    if (selectedCategory !== 'Todos') {
      products = products.filter(p => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }
    return products;
  }, [companyInfo, selectedCategory, searchQuery]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };

  return (
    <CatalogLayout companyName={companyInfo.companyName}>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <CategoryFilter
        categories={companyInfo.categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {filteredProducts.length === 0 ? (
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
        whatsappNumber={companyInfo.whatsappNumber}
      />
    </CatalogLayout>
  );
};