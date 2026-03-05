import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CatalogLayout } from '../components/catalog/CatalogLayout';
import { HomeView } from '../components/catalog/HomeView';
import { SearchBar } from '../components/catalog/SearchBar';
import { CategoryFilter } from '../components/catalog/CategoryFilter';
import { ProductGrid } from '../components/catalog/ProductGrid';
import { CategoriesView } from '../components/catalog/CategoriesView';
import { ProfileView } from '../components/catalog/ProfileView';
import { ProductDetail } from '../components/catalog/ProductDetail';
import { fetchCatalogData } from '../data/mockCatalog';
import { toast } from 'sonner';

export const CatalogPage = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  
  const [catalogData, setCatalogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  // Fetch catalog data
  useEffect(() => {
    const loadCatalog = async () => {
      try {
        setLoading(true);
        const data = await fetchCatalogData(companyId);
        if (data) {
          document.title = data.companyName
        }
        setCatalogData(data);
      } catch (error) {
        console.error('Error loading catalog:', error);
        toast.error(`Empresa '${companyId}' não encontrada`);
        setTimeout(() => navigate('/nike'), 2000);
      } finally {
        setLoading(false);
      }
    };

    if (companyId) {
      loadCatalog();
    }
  }, [companyId, navigate]);

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    if (!catalogData) return [];

    let products = catalogData.products;

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
  }, [catalogData, selectedCategory, searchQuery]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setActiveTab('products');
    setSearchQuery('');
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

  const categoryNames = catalogData.categories.map(cat => cat.id);

  return (
    <CatalogLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {/* Home View */}
      {activeTab === 'home' && (
        <HomeView catalogData={catalogData} />
      )}

      {/* Products View */}
      {activeTab === 'products' && (
        <>
          <div className="pt-4">
            <div className="px-4 mb-4">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                {catalogData.companyName}
              </h1>
            </div>
          </div>
          
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          
          <CategoryFilter
            categories={categoryNames}
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
        </>
      )}

      {/* Categories View */}
      {activeTab === 'categories' && (
        <CategoriesView
          categories={catalogData.categories}
          onCategorySelect={handleCategorySelect}
        />
      )}

      {/* Profile View */}
      {activeTab === 'profile' && (
        <ProfileView catalogData={catalogData} />
      )}

      {/* Product Detail Drawer */}
      <ProductDetail
        product={selectedProduct}
        open={isDrawerOpen}
        onClose={setIsDrawerOpen}
        whatsappNumber={catalogData.whatsappNumber}
      />
    </CatalogLayout>
  );
};