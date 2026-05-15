import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import DashboardLayout from "../components/dashboard/DashboardLayout";

import DashboardCard from "../components/dashboard/DashboardCard";

import PageHeader from "../components/common/PageHeader";

import Loader from "../components/common/Loader";

import ErrorMessage from "../components/common/ErrorMessage";

import ProductForm from "../components/product/ProductForm";

import { getProductById, updateProduct } from "../services/productService";

import { Product } from "../types/product";

const ProductDetailPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // FETCH PRODUCT
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);

        const data = await getProductById(id);

        setProduct(data);
      } catch {
        setError("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // UPDATE PRODUCT
  const handleUpdate = async (updatedProduct: Product) => {
    if (!id) return;

    try {
      setLoading(true);

      await updateProduct(id, updatedProduct);

      alert("Product updated successfully");

      navigate("/products");
    } catch {
      setError("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

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

  // NO PRODUCT
  if (!product) return null;

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
        <PageHeader title={`${product.name}`} subtitle="Product Details" />
        {/* FORM */}
        <DashboardCard>
          {/* HEADER */}
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
          </div>

          {/* FORM */}
          <ProductForm
            product={product}
            onSubmit={handleUpdate}
            isUpdate={false}
          />
        </DashboardCard>
      </div>
    </DashboardLayout>
  );
};

export default ProductDetailPage;
