import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import ProductList from "../components/product/ProductList";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import Pagination from "../components/common/Pagination";
import SortDropdown from "../components/common/SortDropDown";
import FilterPanel from "../components/common/FilterPanel";

import DashboardLayout from "../components/dashboard/DashboardLayout";

import DashboardCard from "../components/dashboard/DashboardCard";
import PageHeader from "../components/common/PageHeader";
import TableToolbar from "../components/common/TableToolBar";
import DataTableWrapper from "../components/common/DataTableWrapper";

import { useProducts } from "../hooks/useProducts";

import { ProductFilterState } from "../types/productFilter";

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL FILTERS
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

  // FILTER STATE
  const [filters, setFilters] = useState<ProductFilterState>({
    name: "",
    brand: "",

    minPrice: getMinPriceFromURL(),
    maxPrice: getMaxPriceFromURL(),

    minQuantity: getMinQuantityFromURL(),

    maxQuantity: getMaxQuantityFromURL(),

    category: getCategoryFromURL(),

    sort_by: "-updated_at",
  });

  const [appliedFilters, setAppliedFilters] = useState<ProductFilterState>({
    ...filters,
  });

  // PRODUCTS
  const { products, loading, error, count, currentPage, setCurrentPage } =
    useProducts(appliedFilters);

  // APPLY FILTERS
  const applyFilter = () => {
    setCurrentPage(1);

    setAppliedFilters(filters);

    setSearchParams({
      category: filters.category[0] || "",
    });
  };

  // SORT OPTIONS
  const options = [
    {
      label: "Latest",
      value: "-updated_at",
    },

    {
      label: "Oldest",
      value: "updated_at",
    },

    {
      label: "Price Low → High",
      value: "price",
    },

    {
      label: "Price High → Low",
      value: "-price",
    },
  ];

  if (loading) return <Loader />;

  if (error) return <ErrorMessage message={error} />;
  const menu = [
    {
      label: "Categories",
      to: "/Categories",
      primary: false,
    },
  ];
  if (localStorage.getItem("role") !== "employee") {
    menu.push({
      label: "+ Add Product",
      to: "/products/create",
      primary: true,
    });
  }

  return (
    <DashboardLayout>
      <div
        style={{
          background: "#f8fafc",
          minHeight: "100vh",
          paddingLeft: "24px",
        }}
      >
        {/* PAGE HEADER */}
        <PageHeader
          title="Products"
          subtitle="Manage your inventory products"
          actions={menu}
        />
        {/* MAIN CONTENT */}
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
            <SortDropdown
              value={filters.sort_by}
              setFilters={setFilters}
              options={options}
            />

            <button
              onClick={applyFilter}
              style={{
                padding: "11px 18px",
                background: "#f59e0b",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "14px",
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
          >
            <FilterPanel
              filters={filters}
              setFilters={setFilters}
              fields={[
                {
                  name: "brand",
                  label: "Brand",
                },

                {
                  name: "minPrice",
                  label: "Min Price",
                },

                {
                  name: "maxPrice",
                  label: "Max Price",
                },

                {
                  name: "minQuantity",
                  label: "Min Quantity",
                },

                {
                  name: "maxQuantity",
                  label: "Max Quantity",
                },
              ]}
            />
          </div>

          {/* PRODUCT COUNT */}
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
                color: "#0f172a",
              }}
            >
              Product List
            </h2>

            <span
              style={{
                color: "#64748b",
                fontSize: "14px",
              }}
            >
              {products.length} products found
            </span>
          </div>

          {/* TABLE */}
          <DataTableWrapper>
            <ProductList products={products} />
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

export default ProductsPage;
