import { useNavigate } from "react-router-dom";

import { useState } from "react";

import DashboardLayout from "../components/dashboard/DashboardLayout";

import DashboardCard from "../components/dashboard/DashboardCard";

import PageHeader from "../components/common/PageHeader";

import ErrorMessage from "../components/common/ErrorMessage";

import ProductForm from "../components/product/ProductForm";

import { createProduct } from "../services/productService";

import { Product } from "../types/product";
import ImportCSV from "components/product/ImportCsv";

const ProductCreationPage = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  // CREATE PRODUCT
  const handleCreate = async (product: Product) => {
    try {
      setLoading(true);

      setError("");

      const { id, ...productData } = product;

      await createProduct(productData);

      alert("Product created successfully");

      navigate("/products");
    } catch (err: any) {
      const message = err?.error || "Failed to create product";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div
        style={{
          display: "flex",

          flexDirection: "row",

          justifyContent: "space-between",

          paddingLeft: "24px",
        }}
      >
        {/* PAGE HEADER */}
        <PageHeader
          title="Create Product"
          subtitle="Add new products to your inventory management system"
        />
        <ImportCSV />
      </div>
      <DashboardCard>
        {/* FORM HEADER */}
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
            Product Details
          </h2>

          <p
            style={{
              marginTop: "8px",

              color: "#64748b",

              fontSize: "14px",
            }}
          >
            Fill all required fields to create a product.
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div
            style={{
              marginBottom: "20px",
            }}
          >
            <ErrorMessage message={error} />
          </div>
        )}

        {/* FORM */}
        <ProductForm product={null} onSubmit={handleCreate} />

        {/* LOADING */}
        {loading && (
          <div
            style={{
              marginTop: "20px",

              color: "#64748b",

              fontSize: "14px",
            }}
          >
            Creating product...
          </div>
        )}
      </DashboardCard>
    </DashboardLayout>
  );
};

export default ProductCreationPage;
