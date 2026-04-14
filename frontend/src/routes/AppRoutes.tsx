import { Routes, Route } from "react-router-dom";
import ProductsPage from "../pages/ProductPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import CategoryPage from "pages/CategoryPage";
import CategoryDetailPage from "../pages/CategoryDetailPage";
import CategoryCreationPage from "pages/CategoryCreationPage";
import CategoryProductsPage from "pages/CategoryProductsPage";
import ProductCreationPage from "pages/ProductCreationPage";
import { ROUTES } from "./routePath";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<ProductsPage />} />

      <Route path={ROUTES.PRODUCTS} element={<ProductsPage />} />
      <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductDetailPage />} />
      <Route path={ROUTES.PRODUCT_CREATE} element={<ProductCreationPage />} />

      <Route path={ROUTES.CATEGORIES} element={<CategoryPage />} />
      <Route path={ROUTES.CATEGORY_DETAIL} element={<CategoryDetailPage />} />
      <Route path={ROUTES.CATEGORY_CREATE} element={<CategoryCreationPage />} />

      <Route
        path={ROUTES.CATEGORY_PRODUCTS}
        element={<CategoryProductsPage />}
      />
    </Routes>
  );
};

export default AppRoutes;
