import { Routes, Route } from "react-router-dom";
import ProductsPage from "./pages/ProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductCreateionPage from "pages/ProductCreationPage";
import CategoryPage from "pages/CategoryPage";
import CategoryDetailPage from "./pages/CategoryDetailPage";
import CategoryCreationPage from "pages/CategoryCreationPage";
import CategoryProductsPage from "pages/CategoryProductsPage";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route path="/products/create" element={<ProductCreateionPage />} />
      <Route path="/categories" element={<CategoryPage />} />
      <Route path="/categories/:id" element={<CategoryDetailPage />} />
      <Route path="/categories/create" element={<CategoryCreationPage />} />
      <Route
        path="/categories/products/:id"
        element={<CategoryProductsPage />}
      />
    </Routes>
  );
};

export default AppRoutes;
