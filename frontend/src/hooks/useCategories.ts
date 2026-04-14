import { useEffect, useState, useCallback } from "react";
import { Category } from "../types/category";
import { getCategories } from "../services/categoryService";
import { CategoryFilterState } from "types/categoryFilter";
export const useCategories = (nameFilter: CategoryFilterState | undefined) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getCategories(currentPage, nameFilter?.name);

      setCategories(data.results);
      setCount(data.count);
    } catch {
      setError("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  }, [currentPage, nameFilter]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    error,
    count,
    currentPage,
    setCurrentPage,
  };
};
