import { FaBoxOpen, FaLayerGroup } from "react-icons/fa";

import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import DashboardLayout from "components/dashboard/DashboardLayout";

import DashboardCard from "components/dashboard/DashboardCard";

import PageHeader from "components/common/PageHeader";

import Loader from "components/common/Loader";

import ErrorMessage from "components/common/ErrorMessage";

import ProductList from "components/product/ProductList";

import { getCategoryById } from "services/categoryService";

import { getProductsByCategoryId } from "services/productService";

import { Category } from "types/category";

import { Product } from "types/product";

const CategoryProductsPage = () => {
  const { id } = useParams();

  const [category, setCategory] = useState<Category | null>(null);

  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // FETCH CATEGORY + PRODUCTS
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const [categoryData, productData] = await Promise.all([
          getCategoryById(id),

          getProductsByCategoryId(id),
        ]);

        setCategory(categoryData);

        setProducts(productData);
      } catch {
        setError("Failed to load category products");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // LOADING
  if (loading) {
    return (
      <DashboardLayout>
        <Loader />
      </DashboardLayout>
    );
  }

  // ERROR
  if (error) {
    return (
      <DashboardLayout>
        <ErrorMessage message={error} />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div
        style={{
          display: "flex",

          flexDirection: "column",

          gap: "24px",
        }}
      >
        {/* PAGE HEADER */}
        <div
          style={{
            paddingLeft: 24,
          }}
        >
          <PageHeader
            title={category?.name || "Category"}
            subtitle="Browse all products under this category"
          />
        </div>

        {/* CATEGORY INFO */}
        <div
          style={{
            display: "grid",

            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",

            gap: "18px",
          }}
        >
          {/* TOTAL PRODUCTS */}
          <DashboardCard>
            <div
              style={{
                display: "flex",

                alignItems: "center",

                gap: "16px",
              }}
            >
              {/* ICON */}
              <div
                style={{
                  width: "56px",

                  height: "56px",

                  borderRadius: "16px",

                  background: "#eff6ff",

                  color: "#2563eb",

                  display: "flex",

                  alignItems: "center",

                  justifyContent: "center",

                  fontSize: "22px",
                }}
              >
                <FaBoxOpen />
              </div>

              {/* INFO */}
              <div>
                <div
                  style={{
                    fontSize: "13px",

                    color: "#64748b",

                    marginBottom: "6px",
                  }}
                >
                  Total Products
                </div>

                <h2
                  style={{
                    margin: 0,

                    fontSize: "28px",

                    color: "#0f172a",
                  }}
                >
                  {products.length}
                </h2>
              </div>
            </div>
          </DashboardCard>

          {/* CATEGORY NAME */}
          <DashboardCard>
            <div
              style={{
                display: "flex",

                alignItems: "center",

                gap: "16px",
              }}
            >
              {/* ICON */}
              <div
                style={{
                  width: "56px",

                  height: "56px",

                  borderRadius: "16px",

                  background: "#fef3c7",

                  color: "#d97706",

                  display: "flex",

                  alignItems: "center",

                  justifyContent: "center",

                  fontSize: "22px",
                }}
              >
                <FaLayerGroup />
              </div>

              {/* INFO */}
              <div>
                <div
                  style={{
                    fontSize: "13px",

                    color: "#64748b",

                    marginBottom: "6px",
                  }}
                >
                  Category
                </div>

                <h2
                  style={{
                    margin: 0,

                    fontSize: "24px",

                    color: "#0f172a",
                  }}
                >
                  {category?.name}
                </h2>
              </div>
            </div>
          </DashboardCard>
        </div>

        {/* PRODUCT SECTION */}
        <DashboardCard>
          {/* HEADER */}
          <div
            style={{
              display: "flex",

              justifyContent: "space-between",

              alignItems: "center",

              marginBottom: "24px",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,

                  fontSize: "22px",

                  color: "#0f172a",
                }}
              >
                Products
              </h2>

              <p
                style={{
                  marginTop: "6px",

                  color: "#64748b",

                  fontSize: "14px",
                }}
              >
                All products available in {category?.name}
              </p>
            </div>

            {/* BADGE */}
            <div
              style={{
                padding: "10px 16px",

                borderRadius: "999px",

                background: "#eff6ff",

                color: "#2563eb",

                fontSize: "13px",

                fontWeight: 600,
              }}
            >
              {products.length} Products
            </div>
          </div>

          {/* PRODUCTS */}
          {products.length === 0 ? (
            <div
              style={{
                padding: "60px 20px",

                textAlign: "center",

                color: "#64748b",
              }}
            >
              <div
                style={{
                  fontSize: "50px",

                  marginBottom: "16px",
                }}
              >
                📦
              </div>

              <h3
                style={{
                  marginBottom: "10px",

                  color: "#0f172a",
                }}
              >
                No Products Found
              </h3>

              <p>This category currently has no products.</p>
            </div>
          ) : (
            <ProductList products={products} />
          )}
        </DashboardCard>
      </div>
    </DashboardLayout>
  );
};

export default CategoryProductsPage;
