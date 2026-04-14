import api from "../api/axiosConfig";
import { Category } from "../types/category";

export interface CategoryResponse {
  count: number;
  current: number;
  next: string | null;
  previous: string | null;
  results: Category[];
}

export const getCategories = async (
  page?: number,
  name?: string,
  sort_by?: string,
): Promise<CategoryResponse> => {
  const response = await api.get("/categories/", {
    params: {
      page,
      name,
      sort_by,
    },
  });

  return response.data.categories;
};

export const getCategoryById = async (id: string): Promise<Category> => {
  const response = await api.get(`/categories/${id}`);
  return response.data.category;
};

export const createCategory = async (category: Category): Promise<Category> => {
  const response = await api.post("/categories/", category);
  return response.data.category;
};

export const updateCategory = async (
  id: string,
  category: Category,
): Promise<Category> => {
  const response = await api.put(`/categories/${id}/`, category);
  return response.data.category;
};

export const deleteCategory = async (id: string | undefined): Promise<void> => {
  await api.delete(`/categories/${id}/`);
};
