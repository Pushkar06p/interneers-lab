import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Category } from "types/category";
import { createCategory } from "../services/categoryService";
import ErrorMessage from "components/common/ErrorMessage";
import CategoryForm from "components/category/CategoryForm";

const CategoryCreateionPage = () => {
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const handleCreate = async (category: Category) => {
    try {
      const { id, ...categoryData } = category;

      await createCategory(categoryData);
      alert("Category created successfully");
      navigate(`/categories`);
    } catch {
      setError("Creation failed");
    }
  };
  if (error) return <ErrorMessage message={error} />;
  return (
    <div>
      <h1>Create Category</h1>
      <CategoryForm category={null} onSubmit={handleCreate} />
    </div>
  );
};

export default CategoryCreateionPage;
