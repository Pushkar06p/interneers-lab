import {
  addCategoryToProduct,
  deleteProduct,
  removeCategoryFromProduct,
} from "services/productService";
import { useCategories } from "hooks/useCategories";
import { Product } from "../../types/product";
import { Link } from "react-router-dom";
import { getCategoryById } from "services/categoryService";
import { useState, useEffect } from "react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { categories } = useCategories(undefined);

  const [categoryName, setCategoryName] = useState<string>("No Category");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      if (!product.category) {
        setCategoryName("No Category");
        return;
      }

      try {
        const category = await getCategoryById(product.category);
        setCategoryName(category.name);
      } catch {
        setCategoryName("Unknown Category");
      }
    };

    fetchCategory();
  }, [product.category]);

  const handleAddCategory = async (categoryId: string) => {
    try {
      setLoading(true);
      await addCategoryToProduct(product.id, categoryId);

      const category = categories.find((c) => c.id === categoryId);
      setCategoryName(category?.name || "Category Added");
      product.category = categoryId;
      alert("Category added successfully.");
    } catch (error) {
      alert("Failed to add category.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCategory = async () => {
    if (!product.category) return;

    try {
      setLoading(true);
      await removeCategoryFromProduct(product.id);

      setCategoryName("No Category");
      product.category = "";
      alert("Category removed successfully.");
    } catch {
      alert("Failed to remove category.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    try {
      setLoading(true);
      await deleteProduct(product.id);
      alert("Product deleted successfully.");
    } catch {
      alert("Failed to delete product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "12px",
        marginBottom: "12px",
      }}
    >
      <h2>{product.name}</h2>
      <p>Brand: {product.brand}</p>
      <p>Price: ₹{product.price}</p>
      <p>Quantity: {product.quantity}</p>
      {/* CATEGORY SECTION */}
      <div style={{ display: "flex", gap: "18px" }}>
        <p>Category: {categoryName}</p>

        {product.category ? (
          <button onClick={handleRemoveCategory} disabled={loading}>
            Remove Category
          </button>
        ) : (
          <select
            onChange={(e) => handleAddCategory(e.target.value)}
            defaultValue=""
            disabled={loading}
          >
            <option value="">Select Category</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        )}
      </div>
      {/* ACTION BUTTONS */}
      <div style={{ display: "flex", gap: "18px", marginTop: "10px" }}>
        <Link to={`/products/${product.id}`}>Edit Product</Link>

        <button onClick={handleDelete} disabled={loading}>
          Delete Product
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
