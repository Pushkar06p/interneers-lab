import api from "../api/axiosConfig";
import { Product } from "../types/product";

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get("/product_service/");
  return response.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await api.get(`/product_service/${id}/`);
  return response.data;
};

export const updateProduct = async (
  id: string,
  product: Product,
): Promise<Product> => {
  const response = await api.put(`/product_service/update/${id}/`, product);
  return response.data;
};

export const createProduct = async (product: Product): Promise<Product> => {
  const response = await api.post(`/product_service/create/`, product);
  return response.data;
};

export const deleteProduct = async (id: string | undefined): Promise<void> => {
  await api.delete(`/product_service/delete/${id}/`);
};

export const getProductsByCategoryId = async (
  categoryId: string,
): Promise<Product[]> => {
  const response = await api.get(
    `/product_service/products-by-category/${categoryId}/`,
  );
  return response.data;
};

export const addCategoryToProduct = async (
  productId: string | undefined,
  categoryId: string,
): Promise<Product> => {
  const response = await api.patch(
    `/product_service/add-category/${productId}/${categoryId}/`,
  );
  return response.data;
};

export const removeCategoryFromProduct = async (
  productId: string | undefined,
): Promise<Product> => {
  const response = await api.patch(
    `/product_service/remove-category/${productId}/`,
  );
  return response.data;
};
