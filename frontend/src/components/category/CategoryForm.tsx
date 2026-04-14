import { useState } from "react";
import { Category } from "../../types/category";
import Button from "../common/Button";

interface CategoryFormProps {
  category: Category | null;
  onSubmit: (category: Category) => void;
}

const CategoryForm = ({ category, onSubmit }: CategoryFormProps) => {
  const [formData, setFormData] = useState<Category>({
    id: category?.id || "",
    name: category?.name || "",
    description: category?.description || "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name || ""}
        onChange={handleChange}
        placeholder="Category Name"
      />

      <input
        name="description"
        value={formData.description || ""}
        onChange={handleChange}
        placeholder="Description"
      />
      <Button text="Save" type="submit" />
    </form>
  );
};

export default CategoryForm;
