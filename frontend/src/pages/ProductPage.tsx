import { Link } from "react-router-dom";
import { useState } from "react";

import ProductList from "../components/product/ProductList";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import Pagination from "../components/common/Pagination";
import CategoryFilter from "../components/common/CategoryFilter";
import FilterPanel from "components/common/FilterPanel";
import { useProducts } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategories";
import { ProductFilterState } from "../types/productFilter";
import SortDropdown from "components/common/SortDropDown";
const ProductsPage = () => {
  const { categories } = useCategories(undefined);

  const [filters, setFilters] = useState<ProductFilterState>({
    name: "",
    brand: "",
    minPrice: undefined,
    maxPrice: undefined,
    category: [],
    sort_by: "-updated_at",
  });

  const [appliedFilters, setAppliedFilters] =
    useState<ProductFilterState>(filters);

  const { products, loading, error, count, currentPage, setCurrentPage } =
    useProducts(appliedFilters);

  const applyFilter = () => {
    setCurrentPage(1);
    setAppliedFilters(filters);
  };

  const options = [
    { label: "Latest", value: "-updated_at" },
    { label: "Oldest", value: "updated_at" },
    { label: "Price (Low → High)", value: "price" },
    { label: "Price (High → Low)", value: "-price" },
    { label: "Name (A → Z)", value: "name" },
    { label: "Name (Z → A)", value: "-name" },
  ];

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div
      style={{
        backgroundColor: "blanchedalmond",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h1>Products</h1>

        <Link to="/products/create">Create Product</Link>

        <Link to="/categories">Go to Categories</Link>
      </div>
      {/* Category filter */}
      <div>
        <CategoryFilter
          categories={categories}
          selectedCategories={filters.category}
          setFilters={setFilters}
        />
        <FilterPanel
          filters={filters}
          setFilters={setFilters}
          fields={[
            { name: "name", label: "Name" },
            { name: "brand", label: "Brand" },
            { name: "minPrice", label: "Min Price" },
            { name: "maxPrice", label: "Max Price" },
          ]}
        ></FilterPanel>
        <SortDropdown
          value={filters.sort_by}
          setFilters={setFilters}
          options={options}
        />
      </div>

      {/* Apply button */}
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
      <ProductList products={products} />
      <Pagination
        currentPage={currentPage}
        totalPages={count}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default ProductsPage;
