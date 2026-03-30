import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Product } from "../types/product";
import { getProductById, updateProduct } from "../services/productService";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import ProductForm from "../components/product/ProductForm";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!id) return;

    getProductById(id)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch product");
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = async (updatedProduct: Product) => {
    if (!id) return;

    try {
      await updateProduct(id, updatedProduct);
      alert("Product updated successfully");
      navigate(`/`);
    } catch {
      setError("Update failed");
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!product) return null;

  return (
    <div>
      <h1>Edit Product</h1>

      <ProductForm product={product} onSubmit={handleUpdate} />
    </div>
  );
};

export default ProductDetailPage;
