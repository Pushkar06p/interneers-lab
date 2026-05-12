import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

import ProductList from "../components/product/ProductList";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import Pagination from "../components/common/Pagination";
import CategoryFilter from "../components/category/CategoryFilter";
import FilterPanel from "components/common/FilterPanel";
import SortDropdown from "components/common/SortDropDown";

import { useProducts } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategories";
import { ProductFilterState } from "../types/productFilter";

const ProductsPage = () => {
  const { categories } = useCategories(undefined);

  // ✅ URL params
  const [searchParams, setSearchParams] = useSearchParams();

  // helper to extract category from URL
  const getCategoryFromURL = () => {
    const category = searchParams.get("category");
    return category ? [category] : [];
  };

  const getMinPriceFromURL = () => {
    const minPrice = searchParams.get("minPrice");
    return minPrice ? +minPrice : undefined;
  };

  const getMaxPriceFromURL = () => {
    const maxPrice = searchParams.get("maxPrice");
    return maxPrice ? +maxPrice : undefined;
  };

  const getMinQuantityFromURL = () => {
    const minQuantity = searchParams.get("minQuantity");
    return minQuantity ? +minQuantity : undefined;
  };

  const getMaxQuantityFromURL = () => {
    const maxQuantity = searchParams.get("maxQuantity");
    return maxQuantity ? +maxQuantity : undefined;
  };

  // ✅ Filters state (initialized from URL)
  const [filters, setFilters] = useState<ProductFilterState>({
    name: "",
    brand: "",
    maxQuantity: getMaxQuantityFromURL(),
    minQuantity: getMinQuantityFromURL(),
    minPrice: getMinPriceFromURL(),
    maxPrice: getMaxPriceFromURL(),
    category: getCategoryFromURL(),
    sort_by: "-updated_at",
  });

  // ✅ Applied filters (used for API call)
  const [appliedFilters, setAppliedFilters] = useState<ProductFilterState>({
    ...filters,
    category: getCategoryFromURL(),
    minPrice: getMinPriceFromURL(),
    maxPrice: getMaxPriceFromURL(),
  });

  // ✅ Sync when URL changes
  useEffect(() => {
    setAppliedFilters(filters);
  }, [filters]);

  // ✅ Fetch products
  const { products, loading, error, count, currentPage, setCurrentPage } =
    useProducts(appliedFilters);

  // ✅ Apply filters + update URL
  const applyFilter = () => {
    setCurrentPage(1);
    setAppliedFilters(filters);

    setSearchParams({
      category: filters.category[0] || "",
    });
  };

  // ✅ Sorting options
  const options = [
    { label: "Latest", value: "-updated_at" },
    { label: "Oldest", value: "updated_at" },
    { label: "Price (Low → High)", value: "price" },
    { label: "Price (High → Low)", value: "-price" },
    { label: "Name (A → Z)", value: "name" },
    { label: "Name (Z → A)", value: "-name" },
  ];

  // ✅ UI states
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
      {/* Header */}
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

      {/* Filters */}
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
            { name: "minQuantity", label: "Min Quantity" },
            { name: "maxQuantity", label: "Max Quantity" },
          ]}
        />

        <SortDropdown
          value={filters.sort_by}
          setFilters={setFilters}
          options={options}
        />
      </div>

      {/* Apply Button */}
      <button
        onClick={applyFilter}
        style={{
          width: "150px",
          marginTop: "10px",
          padding: "8px",
          cursor: "pointer",
        }}
      >
        Apply Filters
      </button>

      {/* Products */}
      <ProductList products={products} />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={count}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default ProductsPage;
