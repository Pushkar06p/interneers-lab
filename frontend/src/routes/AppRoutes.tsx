import { Routes, Route } from "react-router-dom";

import ProductsPage from "../pages/ProductPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import ProductCreationPage from "../pages/ProductCreationPage";

import CategoryPage from "../pages/CategoryPage";
import CategoryDetailPage from "../pages/CategoryDetailPage";
import CategoryCreationPage from "../pages/CategoryCreationPage";
import CategoryProductsPage from "../pages/CategoryProductsPage";

import ReportPage from "../pages/ReportPage";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";

import { ROUTES } from "./routePath";

import RoleProtectedRoute from "./RoleProtectedRoute";
import CreateUser from "pages/CreateUser";

const AppRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path={ROUTES.LOGIN} element={<Login />} />

      {/* PROTECTED ROUTES */}

      <Route
        path="/users/create"
        element={
          <RoleProtectedRoute allowedRoles={["admin", "manager"]}>
            <CreateUser />
          </RoleProtectedRoute>
        }
      />

      {/* DASHBOARD */}
      <Route
        path={ROUTES.HOME}
        element={
          <RoleProtectedRoute allowedRoles={["admin", "manager", "employee"]}>
            <Dashboard />
          </RoleProtectedRoute>
        }
      />

      {/* PRODUCTS */}
      <Route
        path={ROUTES.PRODUCTS}
        element={
          <RoleProtectedRoute allowedRoles={["admin", "manager", "employee"]}>
            <ProductsPage />
          </RoleProtectedRoute>
        }
      />

      <Route
        path={ROUTES.PRODUCT_DETAIL}
        element={
          <RoleProtectedRoute allowedRoles={["admin", "manager", "employee"]}>
            <ProductDetailPage />
          </RoleProtectedRoute>
        }
      />

      <Route
        path={ROUTES.PRODUCT_CREATE}
        element={
          <RoleProtectedRoute allowedRoles={["admin", "manager"]}>
            <ProductCreationPage />
          </RoleProtectedRoute>
        }
      />

      {/* CATEGORIES */}
      <Route
        path={ROUTES.CATEGORIES}
        element={
          <RoleProtectedRoute allowedRoles={["admin", "manager", "employee"]}>
            <CategoryPage />
          </RoleProtectedRoute>
        }
      />

      <Route
        path={ROUTES.CATEGORY_DETAIL}
        element={
          <RoleProtectedRoute allowedRoles={["admin", "manager", "employee"]}>
            <CategoryDetailPage />
          </RoleProtectedRoute>
        }
      />

      <Route
        path={ROUTES.CATEGORY_CREATE}
        element={
          <RoleProtectedRoute allowedRoles={["admin", "manager"]}>
            <CategoryCreationPage />
          </RoleProtectedRoute>
        }
      />

      <Route
        path={ROUTES.CATEGORY_PRODUCTS}
        element={
          <RoleProtectedRoute allowedRoles={["admin", "manager", "employee"]}>
            <CategoryProductsPage />
          </RoleProtectedRoute>
        }
      />

      {/* REPORTS */}
      <Route
        path={ROUTES.REPORT}
        element={
          <RoleProtectedRoute allowedRoles={["admin", "manager"]}>
            <ReportPage />
          </RoleProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
