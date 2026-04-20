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
import { Printer } from 'lucide-react';
import { toast } from 'sonner';

const getProductsStorageKey = (companyId) => `ucatalogo-products:${companyId}`;

export const CatalogPage = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();

  const [catalogData, setCatalogData] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const loadCatalog = async () => {
      try {
        setLoading(true);
        const data = await fetchCatalogData(companyId);

        if (data) {
          document.title = data.companyName;
        }

        const savedProducts = window.localStorage.getItem(getProductsStorageKey(companyId));
        const parsedProducts = savedProducts ? JSON.parse(savedProducts) : data.products;

        setCatalogData(data);
        setProducts(parsedProducts);
      } catch (error) {
        console.error('Error loading catalog:', error);
        toast.error(`Empresa '${companyId}' nao encontrada`);
        setTimeout(() => navigate('/nike'), 2000);
      } finally {
        setLoading(false);
      }
    };

    if (companyId) {
      loadCatalog();
    }
  }, [companyId, navigate]);

  const filteredProducts = useMemo(() => {
    if (!catalogData) return [];

    let result = products;

    if (selectedCategory !== 'Todos') {
      result = result.filter((product) => product.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    return result;
  }, [catalogData, products, searchQuery, selectedCategory]);

  const persistProducts = (nextProducts) => {
    setProducts(nextProducts);
    window.localStorage.setItem(getProductsStorageKey(companyId), JSON.stringify(nextProducts));
  };

  const handleAddProduct = (product) => {
    const nextId = products.reduce((highestId, item) => Math.max(highestId, Number(item.id) || 0), 0) + 1;
    const nextProducts = [...products, { id: nextId, price: 0, ...product }];
    persistProducts(nextProducts);
    toast.success('Produto adicionado ao catalogo');
  };

  const handleUpdateProduct = (productId, updates) => {
    const nextProducts = products.map((product) =>
      product.id === productId ? { ...product, ...updates } : product
    );

    persistProducts(nextProducts);
    setSelectedProduct((current) => (current?.id === productId ? { ...current, ...updates } : current));
    toast.success('Produto atualizado');
  };

  const handleDeleteProduct = (productId) => {
    const nextProducts = products.filter((product) => product.id !== productId);
    persistProducts(nextProducts);

    if (selectedProduct?.id === productId) {
      setSelectedProduct(null);
      setIsDrawerOpen(false);
    }

    toast.success('Produto removido do catalogo');
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setActiveTab('products');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="space-y-3 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-900 border-t-transparent" />
          <p className="text-sm text-gray-600">Carregando catalogo...</p>
        </div>
      </div>
    );
  }

  if (!catalogData) {
    return null;
  }

  const categoryNames = catalogData.categories.map((category) => category.id);
  const printableCatalogData = { ...catalogData, products };

  return (
    <CatalogLayout activeTab={activeTab} setActiveTab={setActiveTab} catalogData={printableCatalogData}>
      {activeTab === 'home' && (
        <HomeView
          catalogData={printableCatalogData}
          setActiveTab={setActiveTab}
          setSearchQuery={setSearchQuery}
        />
      )}

      {activeTab === 'products' && (
        <>
          <div className="pt-4">
            <div className="mb-4 px-4">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                {catalogData.companyName}
              </h1>
            </div>
          </div>

          <div className="mb-2 flex items-center justify-between px-4">
            <span className="text-xs font-medium uppercase tracking-widest text-gray-500">
              {filteredProducts.length} Produtos
            </span>
            <button
              onClick={() => window.print()}
              className="no-print flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition-colors hover:bg-slate-800"
            >
              <Printer className="h-3.5 w-3.5" />
              Imprimir Catalogo
            </button>
          </div>

          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          <CategoryFilter
            categories={categoryNames}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          {filteredProducts.length === 0 ? (
            <div className="px-4 py-20 text-center">
              <p className="text-sm text-gray-400">Nenhum produto encontrado</p>
            </div>
          ) : (
            <ProductGrid
              products={filteredProducts}
              onProductClick={handleProductClick}
            />
          )}
        </>
      )}

      {activeTab === 'categories' && (
        <CategoriesView
          categories={catalogData.categories}
          onCategorySelect={handleCategorySelect}
        />
      )}

      {activeTab === 'profile' && (
        <ProfileView
          catalogData={catalogData}
          companyId={companyId}
          products={products}
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
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
