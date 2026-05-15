import { FaEdit, FaTrash, FaFolderOpen, FaBoxes } from "react-icons/fa";

import { Link } from "react-router-dom";

import { useState } from "react";

import { deleteCategory } from "services/categoryService";

import { Category } from "../../types/category";

interface CategoryColumnProps {
  category: Category;
}

const CategoryColumn = ({ category }: CategoryColumnProps) => {
  const [loading, setLoading] = useState(false);

  // DELETE CATEGORY
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Delete this category?");

    if (!confirmDelete) return;

    try {
      setLoading(true);

      await deleteCategory(category.id);

      alert("Category deleted successfully");

      window.location.reload();
    } catch {
      alert("Failed to delete category");
    } finally {
      setLoading(false);
    }
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

        marginBottom: "18px",

        display: "flex",

        flexDirection: "column",

        gap: "18px",
      }}
    >
      {/* TOP SECTION */}
      <div
        style={{
          display: "flex",

          justifyContent: "space-between",

          alignItems: "flex-start",

          gap: "16px",
        }}
      >
        {/* LEFT */}
        <div
          style={{
            flex: 1,
          }}
        >
          {/* TITLE */}
          <Link
            to={`/categories/products/${category.id}`}
            style={{
              textDecoration: "none",
            }}
          >
            <h2
              style={{
                margin: 0,

                fontSize: "22px",

                fontWeight: 700,

                color: "#0f172a",

                transition: "0.2s",
              }}
            >
              {category.name}
            </h2>
          </Link>

          {/* DESCRIPTION */}
          <p
            style={{
              marginTop: "10px",

              color: "#64748b",

              fontSize: "14px",

              lineHeight: "1.6",
            }}
          >
            {category.description || "No description available"}
          </p>
        </div>
      </div>

      {/* CATEGORY INFO */}
      <div
        style={{
          display: "grid",

          gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",

          gap: "14px",
        }}
      >
        {/* CATEGORY ID */}
        <div style={infoCard}>
          <div style={infoHeader}>
            <FaFolderOpen />
            Category ID
          </div>

          <h3 style={infoValue}>#{category.id}</h3>
        </div>

        {/* CATEGORY STATUS */}
        <div style={infoCard}>
          <div style={infoHeader}>
            <FaBoxes />
            Products
          </div>

          <h3 style={infoValue}>Available</h3>
        </div>
      </div>

      {/* FOOTER */}
      <div
        style={{
          display: "flex",

          justifyContent: "space-between",

          alignItems: "center",

          paddingTop: "14px",

          borderTop: "1px solid #f1f5f9",
        }}
      >
        {/* VIEW PRODUCTS */}
        <Link
          to={`/categories/products/${category.id}`}
          style={{
            textDecoration: "none",

            color: "#2563eb",

            fontSize: "14px",

            fontWeight: 600,
          }}
        >
          View Products →
        </Link>

        {/* ACTION BUTTONS */}
        <div
          style={{
            display: "flex",

            gap: "10px",
          }}
        >
          {/* EDIT */}
          {(localStorage.getItem("role") === "admin" ||
            localStorage.getItem("role") === "manager") && (
            <Link to={`/categories/${category.id}`} style={editButton}>
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

              {loading ? "Deleting..." : "Delete"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryColumn;

// ========================================
// STYLES
// ========================================

const infoCard = {
  background: "#f8fafc",

  borderRadius: "14px",

  padding: "14px",
};

const infoHeader = {
  display: "flex",

  alignItems: "center",

  gap: "8px",

  fontSize: "12px",

  color: "#64748b",

  marginBottom: "8px",
};

const infoValue = {
  margin: 0,

  fontSize: "18px",

  fontWeight: 700,

  color: "#0f172a",
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
