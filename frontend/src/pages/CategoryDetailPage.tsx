import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Category } from "../types/category";
import { getCategoryById, updateCategory } from "../services/categoryService";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import CategoryForm from "../components/category/CategoryForm";

const CategoryDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!id) return;
    getCategoryById(id)
      .then((data) => {
        setCategory(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch Category");
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = async (updatedCategory: Category) => {
    if (!id) return;

    try {
      await updateCategory(id, updatedCategory);
      alert("Catgeory updated successfully");
      navigate(`/categories`);
    } catch {
      setError("Update failed");
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!category) return null;

  return (
    <div>
      <h1>Edit Category</h1>

      <CategoryForm category={category} onSubmit={handleUpdate} />
    </div>
  );
};

export default CategoryDetailPage;
