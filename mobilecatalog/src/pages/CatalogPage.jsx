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
import {
  createProduct as createProductRequest,
  deleteProduct as deleteProductRequest,
  fetchProducts,
  updateProduct as updateProductRequest
} from '../services/productsApi';
import { Printer } from 'lucide-react';
import { toast } from 'sonner';

const getAuthStorageKey = (companyId) => `ucatalogo-google-auth:${companyId}`;

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
  const [isSavingProduct, setIsSavingProduct] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  useEffect(() => {
    const loadCatalog = async () => {
      try {
        setLoading(true);
        const data = await fetchCatalogData(companyId);

        if (data) {
          document.title = data.companyName;
        }

        try {
          const productsFromApi = await fetchProducts();
          setProducts(productsFromApi);
        } catch (apiError) {
          console.error('Error loading products from API:', apiError);
          setProducts([]);
          toast.error('Nao foi possivel carregar os produtos da API.');
        }

        setCatalogData(data);
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

  useEffect(() => {
    if (!companyId) {
      setAuthenticatedUser(null);
      return undefined;
    }

    const authStorageKey = getAuthStorageKey(companyId);

    const syncAuthenticatedUser = () => {
      const savedUser = window.localStorage.getItem(authStorageKey);
      setAuthenticatedUser(savedUser ? JSON.parse(savedUser) : null);
    };

    syncAuthenticatedUser();
    window.addEventListener('storage', syncAuthenticatedUser);

    return () => {
      window.removeEventListener('storage', syncAuthenticatedUser);
    };
  }, [companyId]);

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

  const handleAddProduct = async (product) => {
    try {
      setIsSavingProduct(true);
      const createdProduct = await createProductRequest(product);
      setProducts((current) => [...current, createdProduct]);
      toast.success('Produto adicionado ao catalogo');
      return true;
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error('Nao foi possivel adicionar o produto');
      return false;
    } finally {
      setIsSavingProduct(false);
    }
  };

  const handleUpdateProduct = async (productId, updates) => {
    try {
      setIsSavingProduct(true);
      const updatedProduct = await updateProductRequest(productId, updates);

      setProducts((current) =>
        current.map((product) => (product.id === productId ? updatedProduct : product))
      );
      setSelectedProduct((current) => (current?.id === productId ? updatedProduct : current));
      toast.success('Produto atualizado');
      return true;
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Nao foi possivel atualizar o produto');
      return false;
    } finally {
      setIsSavingProduct(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      setIsSavingProduct(true);
      await deleteProductRequest(productId);
      setProducts((current) => current.filter((product) => product.id !== productId));

      if (selectedProduct?.id === productId) {
        setSelectedProduct(null);
        setIsDrawerOpen(false);
      }

      toast.success('Produto removido do catalogo');
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Nao foi possivel remover o produto');
      return false;
    } finally {
      setIsSavingProduct(false);
    }
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

  const categoriesWithCounts = catalogData.categories.map((category) => {
    if (category.id === 'Todos') {
      return {
        ...category,
        count: products.length
      };
    }

    return {
      ...category,
      count: products.filter((product) => product.category === category.id).length
    };
  });

  const categoryNames = categoriesWithCounts.map((category) => category.id);
  const printableCatalogData = { ...catalogData, categories: categoriesWithCounts, products };

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
            {authenticatedUser ? (
              <button
                onClick={() => window.print()}
                className="no-print flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition-colors hover:bg-slate-800"
              >
                <Printer className="h-3.5 w-3.5" />
                Imprimir Catalogo
              </button>
            ) : null}
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
          categories={categoriesWithCounts}
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
          isSavingProduct={isSavingProduct}
          authenticatedUser={authenticatedUser}
          setAuthenticatedUser={setAuthenticatedUser}
        />
      )}

      <ProductDetail
        product={selectedProduct}
        open={isDrawerOpen}
        onClose={setIsDrawerOpen}
        whatsappNumber={catalogData.whatsappNumber}
        authenticatedUser={authenticatedUser}
        categories={categoryNames}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        isSavingProduct={isSavingProduct}
      />
    </CatalogLayout>
  );
};
