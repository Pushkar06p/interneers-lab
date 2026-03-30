import { useEffect, useState } from "react";
import { Category } from "../types/category";
import { getCategories } from "../services/categoryService";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch categories");
        setLoading(false);
      });
  }, []);

  return { categories, loading, error };
};
