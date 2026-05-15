import { FaEdit, FaTrash, FaTag, FaBoxOpen, FaEye } from "react-icons/fa";

import { Link } from "react-router-dom";

import {
  addCategoryToProduct,
  deleteProduct,
  removeCategoryFromProduct,
} from "services/productService";

import { getCategoryById } from "services/categoryService";

import { useCategories } from "hooks/useCategories";

import { Product } from "../../types/product";

import { useEffect, useState } from "react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { categories } = useCategories(undefined);

  const [categoryName, setCategoryName] = useState("No Category");

  const [loading, setLoading] = useState(false);

  // FETCH CATEGORY
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

  // ADD CATEGORY
  const handleAddCategory = async (categoryId: string) => {
    try {
      setLoading(true);

      await addCategoryToProduct(product.id, categoryId);

      const category = categories.find((c) => c.id === categoryId);

      setCategoryName(category?.name || "Category Added");

      product.category = categoryId;
    } catch {
      alert("Failed to add category");
    } finally {
      setLoading(false);
    }
  };

  // REMOVE CATEGORY
  const handleRemoveCategory = async () => {
    if (!product.category) return;

    try {
      setLoading(true);

      await removeCategoryFromProduct(product.id);

      setCategoryName("No Category");

      product.category = "";
    } catch {
      alert("Failed to remove category");
    } finally {
      setLoading(false);
    }
  };

  // DELETE PRODUCT
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Delete this product?");

    if (!confirmDelete) return;

    try {
      setLoading(true);

      await deleteProduct(product.id);

      alert("Product deleted successfully");
    } catch {
      alert("Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  const handleView = () => {
    window.open(`/products/${product.id}`, "_blank");
  };

  return (
    <div
      style={{
        background: "#fff",

        border: "1px solid #edf2f7",

        borderRadius: "20px",

        padding: "20px",

        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",

        transition: "0.2s",

        display: "flex",

        flexDirection: "column",

        gap: "18px",
      }}
    >
      {/* TOP */}
      <div
        style={{
          display: "flex",

          justifyContent: "space-between",

          alignItems: "flex-start",
        }}
      >
        {/* PRODUCT INFO */}
        <div>
          <h2
            style={{
              margin: 0,

              fontSize: "20px",

              fontWeight: 700,

              color: "#0f172a",
            }}
          >
            {product.name}
          </h2>

          <p
            style={{
              marginTop: "6px",

              color: "#64748b",

              fontSize: "14px",
            }}
          >
            {product.brand}
          </p>
        </div>

        {/* STOCK BADGE */}
        <div
          style={{
            padding: "8px 14px",

            borderRadius: "999px",

            background: product.quantity > 10 ? "#dcfce7" : "#fee2e2",

            color: product.quantity > 10 ? "#166534" : "#dc2626",

            fontSize: "12px",

            fontWeight: 600,
          }}
        >
          {product.quantity > 10 ? "In Stock" : "Low Stock"}
        </div>
      </div>

      {/* PRODUCT DETAILS */}
      <div
        style={{
          display: "grid",

          gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))",

          gap: "14px",
        }}
      >
        {/* PRICE */}
        <div style={detailCard}>
          <span style={label}>Price</span>

          <h3 style={value}>₹{product.price}</h3>
        </div>

        {/* QUANTITY */}
        <div style={detailCard}>
          <span style={label}>Quantity</span>

          <h3 style={value}>{product.quantity}</h3>
        </div>

        {/* CATEGORY */}
        <div style={detailCard}>
          <span style={label}>Category</span>

          <h3 style={value}>{categoryName}</h3>
        </div>
      </div>

      {/* CATEGORY ACTION */}
      {localStorage.getItem("role") !== "employee" && (
        <div
          style={{
            display: "flex",

            alignItems: "center",

            gap: "12px",

            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",

              alignItems: "center",

              gap: "8px",

              color: "#475569",

              fontSize: "14px",

              fontWeight: 500,
            }}
          >
            <FaTag />
            Category Action
          </div>

          {product.category ? (
            <button
              onClick={handleRemoveCategory}
              disabled={loading}
              style={{
                ...secondaryButton,

                color: "#dc2626",

                border: "1px solid #fecaca",

                background: "#fff5f5",
              }}
            >
              Remove Category
            </button>
          ) : (
            <select
              onChange={(e) => handleAddCategory(e.target.value)}
              defaultValue=""
              disabled={loading}
              style={selectStyle}
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
      )}

      {/* ACTIONS */}
      <div
        style={{
          display: "flex",

          justifyContent: "space-between",

          alignItems: "center",

          paddingTop: "10px",

          borderTop: "1px solid #f1f5f9",
        }}
      >
        {/* PRODUCT ID */}
        <div
          style={{
            display: "flex",

            alignItems: "center",

            gap: "8px",

            color: "#64748b",

            fontSize: "13px",
          }}
        >
          <FaBoxOpen />
          Product ID: {product.id}
        </div>

        {/* BUTTONS */}
        <div
          style={{
            display: "flex",

            gap: "10px",
          }}
        >
          {/* EDIT */}
          {(localStorage.getItem("role") === "admin" ||
            localStorage.getItem("role") === "manager") && (
            <Link to={`/products/${product.id}`} style={editButton}>
              <FaEdit />
              Edit
            </Link>
          )}

          {/* DELETE */}
          {localStorage.getItem("role") === "admin" && (
            <button
              onClick={handleDelete}
              disabled={loading}
              style={deleteButton}
            >
              <FaTrash />
              Delete
            </button>
          )}
          <button onClick={handleView} disabled={loading} style={viewButton}>
            <FaEye />
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

// ========================================
// STYLES
// ========================================

const detailCard = {
  background: "#f8fafc",

  borderRadius: "14px",

  padding: "14px",
};

const label = {
  display: "block",

  fontSize: "12px",

  color: "#64748b",

  marginBottom: "6px",
};

const value = {
  margin: 0,

  fontSize: "18px",

  color: "#0f172a",

  fontWeight: 700,
};

const secondaryButton = {
  height: "40px",

  padding: "0 16px",

  borderRadius: "10px",

  cursor: "pointer",

  fontSize: "13px",

  fontWeight: 600,
};

const selectStyle = {
  height: "42px",

  borderRadius: "10px",

  border: "1px solid #e2e8f0",

  padding: "0 12px",

  fontSize: "14px",

  outline: "none",

  background: "#fff",
};

const editButton = {
  height: "40px",

  padding: "0 16px",

  borderRadius: "10px",

  background: "#0f172a",

  color: "#fff",

  textDecoration: "none",

  display: "flex",

  alignItems: "center",

  gap: "8px",

  fontSize: "13px",

  fontWeight: 600,
};

const deleteButton = {
  height: "40px",

  padding: "0 16px",

  borderRadius: "10px",

  border: "none",

  background: "#ef4444",

  color: "#fff",

  display: "flex",

  alignItems: "center",

  gap: "8px",

  fontSize: "13px",

  fontWeight: 600,

  cursor: "pointer",
};

const viewButton = {
  height: "40px",

  padding: "0 16px",

  borderRadius: "10px",

  border: "none",

  background: "#281389",

  color: "#fff",

  display: "flex",

  alignItems: "center",

  gap: "8px",

  fontSize: "13px",

  fontWeight: 600,

  cursor: "pointer",
};
