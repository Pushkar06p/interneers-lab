import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Product } from "types/product";
import { createProduct } from "../services/productService";
import ErrorMessage from "components/common/ErrorMessage";
import ProductForm from "components/product/ProductForm";

const ProductCreationPage = () => {
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const handleCreate = async (product: Product) => {
    try {
      const { id, ...productData } = product;

      await createProduct(productData);

      alert("Product created successfully");
      navigate("/");
    } catch (err: any) {
      const message = err?.error || "Failed to create product";

      setError(message);
    }
  };
  if (error) return <ErrorMessage message={error} />;
  return (
    <div>
      <h1>Create Product</h1>
      <ProductForm product={null} onSubmit={handleCreate} />
    </div>
  );
};

export default ProductCreationPage;
