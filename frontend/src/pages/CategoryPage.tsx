import { Link } from "react-router-dom";
import { useState } from "react";

import CategoryColumn from "../components/category/CategoryColumn";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import Pagination from "../components/common/Pagination";
import FilterPanel from "../components/common/FilterPanel";
import { useCategories } from "../hooks/useCategories";
import { Category } from "types/category";
import { ROUTES } from "routes/routePath";
import { CategoryFilterState } from "types/categoryFilter";

const CategoryPage = () => {
  const [filters, setFilters] = useState<CategoryFilterState>({
    name: "",
    sort_by: "-updated_at",
  });
  const [appliedFilters, setAppliedFilters] =
    useState<CategoryFilterState>(filters);
  const { categories, loading, error, count, currentPage, setCurrentPage } =
    useCategories(appliedFilters);

  const applyFilter = () => {
    setCurrentPage(1);
    setAppliedFilters(filters);
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div
      style={{
        backgroundColor: "blanchedalmond",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h1>Categories</h1>

        <h2>
          <Link to={ROUTES.CATEGORY_CREATE}>Create Categories</Link>
        </h2>

        <h2>
          <Link to={ROUTES.PRODUCTS}>Go to Products</Link>
        </h2>
      </div>
      <div>
        <FilterPanel
          filters={filters}
          setFilters={setFilters}
          fields={[{ name: "name", label: "Search name" }]}
        />
      </div>
      {/* Filter Panel */}

      <button
        onClick={applyFilter}
        style={{
          width: "120px",
          marginTop: "10px",
          padding: "8px",
          cursor: "pointer",
        }}
      >
        Apply Filters
      </button>

      {/* Category List */}
      {categories.length === 0 ? (
        <p>No categories available</p>
      ) : (
        categories.map((category: Category) => (
          <CategoryColumn key={category.id} category={category} />
        ))
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={count}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default CategoryPage;
