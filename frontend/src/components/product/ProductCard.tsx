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
  const { categories } = useCategories();
  const [categoryName, setCategoryName] = useState<string>("No Category");
  useEffect(() => {
    if (product.category) {
      getCategoryById(product.category).then((category) => {
        setCategoryName(category.name);
      });
    } else {
      setCategoryName("No Category");
    }
  }, [product.category]);
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "12px",
        marginBottom: "12px",
      }}
    >
      <h3>{product.name}</h3>
      <p>Brand: {product.brand}</p>
      <p>Price: Rs. {product.price}</p>
      <p>Qunatity: {product.quantity}</p>
      <div
        style={{
          display: "flex",
          gap: "18px",
          paddingTop: "0px",
        }}
      >
        <p>Category: {categoryName}</p>
        {product.category ? (
          <button
            onClick={() => {
              removeCategoryFromProduct(product.id).then(() => {
                alert("Category removed successfully");
                window.location.reload();
              });
            }}
          >
            Remove Category
          </button>
        ) : (
          <select
            name="category"
            value={product.category || ""}
            onChange={(e) => {
              const selectedCategory = e.target.value;
              if (selectedCategory) {
                addCategoryToProduct(product.id, selectedCategory).then(() => {
                  alert("Category added successfully");
                  window.location.reload();
                });
              }
            }}
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
      <div
        style={{
          display: "flex",
          gap: "18px",
        }}
      >
        <Link to={`/products/${product.id}`}>Edit Product</Link>
        <button
          onClick={() => {
            deleteProduct(product.id).then(() => {
              alert("Product deleted successfully");
              window.location.reload();
            });
          }}
        >
          Delete Product
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
