import api from "../api/axiosConfig";
import { Product } from "../types/product";

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get("/products/");
  return response.data.products;
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await api.get(`/products/${id}/`);
  console.log(response.data);
  return response.data.product;
};

export const updateProduct = async (
  id: string,
  product: Product,
): Promise<Product> => {
  const response = await api.put(`/products/${id}/`, product);
  return response.data;
};

export const createProduct = async (product: Product): Promise<Product> => {
  const response = await api.post(`/products/`, product);
  return response.data;
};

export const deleteProduct = async (id: string | undefined): Promise<void> => {
  await api.delete(`/products/${id}/`);
};

export const getProductsByCategoryId = async (
  categoryId: string,
): Promise<Product[]> => {
  const response = await api.get(`/categories/${categoryId}/products/`);
  return response.data.products;
};

export const removeCategoryFromProduct = async (
  productId: string | undefined,
) => {
  const response = await api.patch(`/products/${productId}/`, {
    category: null,
  });
  console.log(response.data);
  return response.data.product;
};

export const addCategoryToProduct = async (
  productId: string | undefined,
  categoryId: string | undefined,
) => {
  const response = await api.patch(`/products/${productId}/`, {
    category: categoryId,
  });

  return response.data;
};
