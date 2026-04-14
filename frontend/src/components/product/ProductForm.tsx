import { useState } from "react";
import { Product } from "../../types/product";
import Button from "../common/Button";
import { useCategories } from "hooks/useCategories";
interface ProductFormProps {
  product: Product | null;
  onSubmit: (product: Product) => void;
}

const ProductForm = ({ product, onSubmit }: ProductFormProps) => {
  const [formData, setFormData] = useState<Product>({
    id: product?.id || "",
    name: product?.name || "",
    brand: product?.brand || "",
    category: product?.category || "",
    price: product?.price || 0,
    quantity: product?.quantity || 0,
    description: product?.description || "",
  });
  const { categories } = useCategories(undefined);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "quantity" ? Number(value) : value,
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
        placeholder="Product Name"
      />

      <input
        name="brand"
        value={formData.brand || ""}
        onChange={handleChange}
        placeholder="Brand"
      />

      <input
        name="price"
        type="number"
        value={formData.price ?? 0}
        onChange={handleChange}
        placeholder="Price"
      />

      <select
        name="category"
        value={formData.category || ""}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            category: e.target.value,
          }))
        }
      >
        <option value="">Select Category</option>

        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <input
        name="quantity"
        type="number"
        value={formData.quantity ?? 0}
        onChange={handleChange}
        placeholder="Quantity"
      />

      <Button text="Save" type="submit" />
    </form>
  );
};

export default ProductForm;
