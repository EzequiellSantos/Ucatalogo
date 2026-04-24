import axios from 'axios';

const API_BASE_URL =
  process.env.REACT_APP_PRODUCTS_API_URL?.replace(/\/+$/, '') || 'http://localhost:4000/api';

const productsApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

const normalizeProduct = (product) => ({
  id: product.id,
  legacyId: product.legacyId ?? null,
  name: product.name,
  category: product.category,
  price: product.price ?? 0,
  description: product.description,
  image: product.image,
  imageAlt: product.imageAlt,
  publicId: product.public_id ?? product.publicId ?? null
});

export const fetchProducts = async () => {
  const response = await productsApi.get('/products');
  return response.data.map(normalizeProduct);
};

export const seedProducts = async (products) => {
  const response = await productsApi.post('/products/seed', { products });
  return response.data.products.map(normalizeProduct);
};

export const createProduct = async (product) => {
  const response = await productsApi.post('/products', product);
  return normalizeProduct(response.data);
};

export const updateProduct = async (productId, product) => {
  const response = await productsApi.put(`/products/${productId}`, product);
  return normalizeProduct(response.data);
};

export const deleteProduct = async (productId) => {
  await productsApi.delete(`/products/${productId}`);
};
