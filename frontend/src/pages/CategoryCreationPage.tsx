import { FaLayerGroup, FaFolderPlus, FaBoxes } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import { useState } from "react";

import DashboardLayout from "../components/dashboard/DashboardLayout";

import DashboardCard from "../components/dashboard/DashboardCard";

import PageHeader from "../components/common/PageHeader";

import ErrorMessage from "components/common/ErrorMessage";

import CategoryForm from "../components/category/CategoryForm";

import { createCategory } from "../services/categoryService";

import { ROUTES } from "../routes/routePath";

import { Category } from "../types/category";

const CategoryCreationPage = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  // CREATE CATEGORY
  const handleCreate = async (category: Category) => {
    try {
      setLoading(true);

      setError("");

      const { id, ...categoryData } = category;

      await createCategory(categoryData);

      alert("Category created successfully");

      navigate(ROUTES.CATEGORIES);
    } catch {
      setError("Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div
        style={{
          display: "flex",

          flexDirection: "column",

          gap: "24px",

          padding: "24px",
        }}
      >
        {/* PAGE HEADER */}
        <PageHeader
          title="Create Category"
          subtitle="Organize your inventory products into categories"
        />

        {/* MAIN SECTION */}
        <div
          style={{
            display: "grid",

            gap: "24px",
          }}
        >
          {/* FORM SECTION */}
          <DashboardCard>
            {/* TITLE */}
            <div
              style={{
                marginBottom: "24px",
              }}
            >
              <h2
                style={{
                  margin: 0,

                  fontSize: "26px",

                  color: "#0f172a",
                }}
              >
                Category Details
              </h2>

              <p
                style={{
                  marginTop: "8px",

                  color: "#64748b",

                  fontSize: "14px",
                }}
              >
                Fill all required fields to create a new category.
              </p>
            </div>

            {/* ERROR */}
            {error && <ErrorMessage message={error} />}

            {/* FORM */}
            <div
              style={{
                marginTop: "20px",
              }}
            >
              <CategoryForm category={null} onSubmit={handleCreate} />
            </div>

            {/* LOADING */}
            {loading && (
              <div
                style={{
                  marginTop: "18px",

                  color: "#64748b",

                  fontSize: "14px",
                }}
              >
                Creating category...
              </div>
            )}
          </DashboardCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CategoryCreationPage;
