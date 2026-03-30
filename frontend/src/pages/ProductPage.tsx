import { Link } from "react-router-dom";
import ProductList from "../components/product/ProductList";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import { useProducts } from "../hooks/useProducts";

const ProductsPage = () => {
  const { products, loading, error } = useProducts();

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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h1>Products</h1>
        <h2>
          <Link to={`/products/create`}>Create Product</Link>
        </h2>
        <h2>
          <Link to="/categories"> Go to Categories</Link>
        </h2>
      </div>
      <ProductList products={products} />
    </div>
  );
};

export default ProductsPage;
