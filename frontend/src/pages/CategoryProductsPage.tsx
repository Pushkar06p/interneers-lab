import ErrorMessage from "components/common/ErrorMessage";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCategoryById } from "services/categoryService";
import { getProductsByCategoryId } from "services/productService";
import { Category } from "types/category";
import { Product } from "types/product";
import ProductList from "components/product/ProductList";

const CategoryProductsPage = () => {
  const { id } = useParams();
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    if (!id) return;

    getCategoryById(id)
      .then((data) => {
        setCategory(data);
      })
      .catch(() => {
        setError("Failed to fetch Category");
      });
  }, [id]);
  useEffect(() => {
    if (!id) return;
    getProductsByCategoryId(id)
      .then((data) => {
        setProducts(data);
      })
      .catch(() => {
        setError("Failed to fetch products");
      });
  }, [id]);
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <h1>{category?.name}</h1>
      <ProductList products={products} />
    </div>
  );
};

export default CategoryProductsPage;
