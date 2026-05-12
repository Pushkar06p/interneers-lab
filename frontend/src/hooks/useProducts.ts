// hooks/useProducts.ts

import { useEffect, useState, useCallback } from "react";
import { Product } from "../types/product";
import { getProducts } from "../services/productService";

export const useProducts = (filters: any) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getProducts({
        ...filters,
        page: currentPage,
        category: filters.category.join(","),
      });
      if (filters.all) {
        setProducts(data.products);
      } else {
        setProducts(data.results);
        setCount(data.count);
      }
    } catch {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, [filters, currentPage]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  // console.log(products);
  return {
    products,
    loading,
    error,
    count,
    currentPage,
    setCurrentPage,
  };
};
