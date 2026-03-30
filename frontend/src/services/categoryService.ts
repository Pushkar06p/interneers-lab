import api from "../api/axiosConfig";
import { Category } from "../types/category";

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get("/product_category/");
  return response.data.product_category;
};

export const getCategoryById = async (id: string): Promise<Category> => {
  const response = await api.get(`/product_category/${id}`);
  return response.data;
};

export const createCategory = async (category: Category): Promise<Category> => {
  const response = await api.post("/product_category/create/", category);
  return response.data;
};

export const updateCategory = async (
  id: string,
  category: Category,
): Promise<Category> => {
  const response = await api.put(`/product_category/update/${id}/`, category);
  return response.data;
};

export const deleteCategory = async (id: string | undefined): Promise<void> => {
  await api.delete(`/product_category/delete/${id}/`);
};
