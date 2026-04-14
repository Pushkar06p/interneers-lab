import { Product } from "../../types/product";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {products.map((product) => (
        <div
          style={{
            backgroundColor: "lightsteelblue",
          }}
          key={product.id}
        >
          <ProductCard key={product.id} product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
