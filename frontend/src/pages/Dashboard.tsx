import {
  FaBoxOpen,
  FaLayerGroup,
  FaArrowTrendUp,
  FaBoxArchive,
} from "react-icons/fa6";

import { useEffect, useState, useMemo } from "react";

import DashboardLayout from "../components/dashboard/DashboardLayout";

import DashboardCard from "../components/dashboard/DashboardCard";

import PageHeader from "../components/common/PageHeader";

import Loader from "../components/common/Loader";

import ErrorMessage from "../components/common/ErrorMessage";

import { useProducts } from "../hooks/useProducts";

import { useCategories } from "../hooks/useCategories";

import { ProductFilterState } from "types/productFilter";

const Dashboard = () => {
  const username = localStorage.getItem("username") || "User";

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [stats, setStats] = useState({
    totalProducts: 0,

    totalCategories: 0,

    lowStock: 0,

    totalInventory: 0,
  });
  const filters = useMemo<ProductFilterState>(
    () => ({
      name: "",
      brand: "",
      minPrice: undefined,
      maxPrice: undefined,
      category: [],
      sort_by: "-updated_at",
      all: true,
    }),
    [],
  );
  const { products } = useProducts(filters);
  const { categories } = useCategories(undefined);
  // FETCH DASHBOARD DATA
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);

        // LOW STOCK
        const lowStock = products.filter(
          (product: any) => product.quantity <= 10,
        ).length;

        // TOTAL INVENTORY
        const inventory = products.reduce(
          (acc: number, curr: any) => acc + curr.quantity,
          0,
        );

        setStats({
          totalProducts: products.length,

          totalCategories: categories.length,

          lowStock,

          totalInventory: inventory,
        });
      } catch {
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [categories, products]);

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
        <PageHeader
          title={`Hi, ${username} 👋`}
          subtitle="Welcome back to your inventory dashboard"
        />

        {/* TOP HERO CARD */}
        <div
          style={{
            background: "linear-gradient(135deg,#0f172a,#1e293b)",

            borderRadius: "28px",

            padding: "32px",

            color: "#fff",

            position: "relative",

            overflow: "hidden",
          }}
        >
          {/* CONTENT */}
          <div
            style={{
              position: "relative",

              zIndex: 2,
            }}
          >
            <div
              style={{
                display: "inline-flex",

                alignItems: "center",

                gap: "8px",

                background: "rgba(255,255,255,0.08)",

                padding: "8px 14px",

                borderRadius: "999px",

                marginBottom: "18px",

                fontSize: "13px",

                fontWeight: 600,
              }}
            >
              <FaArrowTrendUp />
              Inventory Analytics
            </div>

            <h1
              style={{
                margin: 0,

                fontSize: "38px",

                lineHeight: "1.2",

                maxWidth: "700px",
              }}
            >
              Manage your inventory smarter & faster.
            </h1>

            <p
              style={{
                marginTop: "16px",

                maxWidth: "650px",

                color: "rgba(255,255,255,0.75)",

                lineHeight: "1.7",

                fontSize: "15px",
              }}
            >
              Track products, monitor stock levels, manage categories and keep
              your business organized in one place.
            </p>
          </div>

          {/* BG CIRCLE */}
          <div
            style={{
              position: "absolute",

              right: "-80px",

              top: "-80px",

              width: "240px",

              height: "240px",

              borderRadius: "50%",

              background: "rgba(255,255,255,0.05)",
            }}
          />
        </div>

        {/* STATS */}
        <div
          style={{
            display: "grid",

            gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",

            gap: "20px",
          }}
        >
          {/* TOTAL PRODUCTS */}
          <DashboardCard>
            <StatCard
              icon={<FaBoxOpen />}
              title="Total Products"
              value={stats.totalProducts}
              iconBg="#eff6ff"
              iconColor="#2563eb"
            />
          </DashboardCard>

          {/* CATEGORIES */}
          <DashboardCard>
            <StatCard
              icon={<FaLayerGroup />}
              title="Categories"
              value={stats.totalCategories}
              iconBg="#fef3c7"
              iconColor="#d97706"
            />
          </DashboardCard>

          {/* LOW STOCK */}
          <DashboardCard>
            <StatCard
              icon={<FaArrowTrendUp />}
              title="Low Stock"
              value={stats.lowStock}
              iconBg="#fee2e2"
              iconColor="#dc2626"
            />
          </DashboardCard>

          {/* TOTAL INVENTORY */}
          <DashboardCard>
            <StatCard
              icon={<FaBoxArchive />}
              title="Inventory Units"
              value={stats.totalInventory}
              iconBg="#dcfce7"
              iconColor="#16a34a"
            />
          </DashboardCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

// ========================================
// STAT CARD
// ========================================

interface StatCardProps {
  icon: React.ReactNode;

  title: string;

  value: number;

  iconBg: string;

  iconColor: string;
}

const StatCard = ({ icon, title, value, iconBg, iconColor }: StatCardProps) => {
  return (
    <div
      style={{
        display: "flex",

        alignItems: "center",

        justifyContent: "space-between",
      }}
    >
      {/* LEFT */}
      <div>
        <p
          style={{
            margin: 0,

            color: "#64748b",

            fontSize: "14px",

            marginBottom: "10px",
          }}
        >
          {title}
        </p>

        <h2
          style={{
            margin: 0,

            fontSize: "34px",

            color: "#0f172a",
          }}
        >
          {value}
        </h2>
      </div>

      {/* ICON */}
      <div
        style={{
          width: "62px",

          height: "62px",

          borderRadius: "18px",

          background: iconBg,

          color: iconColor,

          display: "flex",

          alignItems: "center",

          justifyContent: "center",

          fontSize: "24px",
        }}
      >
        {icon}
      </div>
    </div>
  );
};
