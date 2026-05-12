import api from "../api/axiosConfig";
import { Product } from "../types/product";

export interface ProductResponse {
  count: number;
  current: number;
  next: string | null;
  previous: string | null;
  results: Product[];
  products: Product[];
}
export interface ProductFilters {
  page?: number;
  name?: string;
  minQuantity?: number;
  maxQuantity?: number;
  minPrice?: number;
  maxPrice?: number;
  category?: string[];
  brand?: string;
  sort_by?: string;
  all?: boolean;
}

export const getProducts = async (
  filters: ProductFilters = {},
): Promise<ProductResponse> => {
  const response = await api.get("/products/", {
    params: {
      page: filters.page,
      name: filters.name,
      min_price: filters.minPrice,
      max_price: filters.maxPrice,
      min_quantity: filters.minQuantity,
      max_quantity: filters.maxQuantity,
      category: filters.category,
      brand: filters.brand,
      sort_by: filters.sort_by,
      all: filters.all,
    },
  });
  // console.log(response.data.products);
  if (filters.all) return response.data;
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

export const createProduct = async (product: Product) => {
  try {
    const response = await api.post("/products/", product);
    return response.data;
  } catch (error: any) {
    throw (
      error.response?.data || {
        error: "Something went wrong",
      }
    );
  }
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
