import { useState } from "react";

import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import Pagination from "../components/common/Pagination";

import DashboardLayout from "../components/dashboard/DashboardLayout";

import DashboardCard from "../components/dashboard/DashboardCard";
import PageHeader from "../components/common/PageHeader";
import TableToolbar from "../components/common/TableToolBar";
import DataTableWrapper from "../components/common/DataTableWrapper";

import CategoryColumn from "../components/category/CategoryColumn";

import { useCategories } from "../hooks/useCategories";

import { Category } from "types/category";
import { ROUTES } from "routes/routePath";
import { CategoryFilterState } from "types/categoryFilter";

const CategoryPage = () => {
  // FILTER STATE
  const [filters, setFilters] = useState<CategoryFilterState>({
    name: "",
    sort_by: "-updated_at",
  });

  const [appliedFilters, setAppliedFilters] =
    useState<CategoryFilterState>(filters);

  // API
  const { categories, loading, error, count, currentPage, setCurrentPage } =
    useCategories(appliedFilters);

  // APPLY FILTER
  const applyFilter = () => {
    setCurrentPage(1);

    setAppliedFilters(filters);
  };

  // LOADING
  if (loading) return <Loader />;

  // ERROR
  if (error) return <ErrorMessage message={error} />;

  const menu = [
    {
      label: "Products",
      to: ROUTES.PRODUCTS,
    },
  ];
  if (localStorage.getItem("role") !== "employee") {
    menu.push({
      label: "Create Category",
      to: ROUTES.CATEGORY_CREATE,
    });
  }
  return (
    <DashboardLayout>
      <div
        style={{
          display: "flex",

          flexDirection: "column",

          paddingLeft: "24px",
        }}
      >
        {/* PAGE HEADER */}
        <PageHeader
          title="Categories"
          subtitle="Manage your product categories"
          actions={menu}
        />

        {/* MAIN CARD */}
        <DashboardCard>
          {/* TOOLBAR */}
          <TableToolbar
            search={filters.name}
            setSearch={(value) =>
              setFilters((prev) => ({
                ...prev,
                name: value,
              }))
            }
          >
            {/* APPLY */}
            <button
              onClick={applyFilter}
              style={{
                height: "44px",

                padding: "0 20px",

                border: "none",

                borderRadius: "12px",

                background: "#f59e0b",

                color: "#fff",

                fontWeight: 600,

                fontSize: "14px",

                cursor: "pointer",
              }}
            >
              Apply
            </button>
          </TableToolbar>

          {/* FILTER PANEL */}
          <div
            style={{
              marginBottom: "22px",
            }}
          ></div>
          {/* HEADER */}
          <div
            style={{
              display: "flex",

              justifyContent: "space-between",

              alignItems: "center",

              marginBottom: "18px",
            }}
          >
            <h2
              style={{
                margin: 0,

                fontSize: "18px",

                fontWeight: 700,

                color: "#0f172a",
              }}
            >
              Category List
            </h2>

            <span
              style={{
                fontSize: "14px",

                color: "#64748b",
              }}
            >
              {categories.length} categories
            </span>
          </div>

          {/* CATEGORY TABLE */}
          <DataTableWrapper>
            {categories.length === 0 ? (
              <div
                style={{
                  padding: "40px",

                  textAlign: "center",

                  color: "#64748b",

                  fontSize: "14px",
                }}
              >
                No categories found
              </div>
            ) : (
              <div
                style={{
                  display: "flex",

                  flexDirection: "column",
                }}
              >
                {categories.map((category: Category) => (
                  <CategoryColumn key={category.id} category={category} />
                ))}
              </div>
            )}
          </DataTableWrapper>

          {/* PAGINATION */}
          <div
            style={{
              marginTop: "24px",

              display: "flex",

              justifyContent: "center",
            }}
          >
            <Pagination
              currentPage={currentPage}
              totalPages={count}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </DashboardCard>
      </div>
    </DashboardLayout>
  );
};

export default CategoryPage;
