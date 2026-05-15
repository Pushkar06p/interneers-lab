import React, { useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  FaChartPie,
  FaFileCsv,
  FaTriangleExclamation,
  FaBox,
} from "react-icons/fa6";

import DashboardLayout from "../components/dashboard/DashboardLayout";

import DashboardCard from "../components/dashboard/DashboardCard";

import PageHeader from "../components/common/PageHeader";

import { useReportCategories } from "../hooks/useReportCategories";

import { useProducts } from "../hooks/useProducts";

import { useCategories } from "../hooks/useCategories";

import { ProductFilterState } from "../types/productFilter";

const ReportPage: React.FC = () => {
  const navigate = useNavigate();

  const [threshold, setThreshold] = useState<number>(10);

  const [mode, setMode] = useState<"selected" | "rejected">("selected");

  // FILTERS
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

  // DATA
  const {
    products = [],

    loading: productsLoading,
  } = useProducts(filters);

  const {
    categories = [],

    loading: categoriesLoading,
  } = useCategories(undefined);

  const {
    selectedCategories,

    rejectedCategories,
  } = useReportCategories(threshold, products, categories);

  const reportList =
    mode === "selected" ? selectedCategories : rejectedCategories;

  const loading = productsLoading || categoriesLoading;

  // HANDLE CLICK
  const handleClick = (categoryId?: string, type?: string) => {
    const params = new URLSearchParams();

    if (categoryId) {
      params.set("category", categoryId);
    }

    switch (type) {
      case "high":
        params.set("minQuantity", threshold.toString());
        break;

      case "low":
        params.set("maxQuantity", threshold.toString());
        break;

      case "lte1k":
        params.set("maxPrice", "1000");
        break;

      case "lte10k":
        params.set("minPrice", "1001");

        params.set("maxPrice", "10000");
        break;

      case "gt10k":
        params.set("minPrice", "10001");
        break;

      default:
        break;
    }

    navigate(`/products?${params.toString()}`);
  };

  // CSV EXPORT
  const escapeCSV = (value: unknown) => {
    return `"${String(value).replace(/"/g, '""')}"`;
  };

  const exportCSV = () => {
    const headers = [
      "Category",

      "Total",

      "High",

      "Low",

      "less than 1k",

      "less than 10k",

      "above 10k",
    ];

    const rows = reportList.map((item) => [
      escapeCSV(item.name),

      item.count,

      item.gte_threshold,

      item.lt_threshold,

      item.lte_thousand,

      item.lte_lakh,

      item.gt_lakh,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.setAttribute("download", `${mode}_category_report.csv`);

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout>
      <div
        style={{
          display: "flex",

          flexDirection: "column",

          gap: "24px",

          paddingLeft: "24px",
        }}
      >
        {/* PAGE HEADER */}
        <PageHeader
          title="Analytics Reports"
          subtitle="Monitor inventory distribution and category insights"
        />

        {/* STATS */}
        <div
          style={{
            display: "grid",

            gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",

            gap: "20px",
          }}
        >
          <StatsCard
            title="Total Products"
            value={products.length}
            icon={<FaBox />}
            bg="#eff6ff"
            color="#2563eb"
          />

          <StatsCard
            title="Categories"
            value={categories.length}
            icon={<FaChartPie />}
            bg="#fef3c7"
            color="#d97706"
          />

          <StatsCard
            title="Low Stock"
            value={products.filter((p: any) => p.quantity <= threshold).length}
            icon={<FaTriangleExclamation />}
            bg="#fee2e2"
            color="#dc2626"
          />
        </div>

        {/* CONTROLS */}
        <DashboardCard>
          <div
            style={{
              display: "flex",

              alignItems: "center",

              justifyContent: "space-between",

              gap: "20px",

              flexWrap: "wrap",
            }}
          >
            {/* LEFT */}
            <div
              style={{
                display: "flex",

                alignItems: "center",

                gap: "14px",

                flexWrap: "wrap",
              }}
            >
              {/* THRESHOLD */}
              <div>
                <label
                  style={{
                    display: "block",

                    marginBottom: "8px",

                    fontSize: "13px",

                    color: "#64748b",

                    fontWeight: 600,
                  }}
                >
                  Stock Threshold
                </label>

                <input
                  type="number"
                  value={threshold}
                  onChange={(e) => {
                    const val = Number(e.target.value);

                    setThreshold(isNaN(val) ? 0 : val);
                  }}
                  style={inputStyle}
                />
              </div>

              {/* SELECTED */}
              <button
                onClick={() => setMode("selected")}
                style={{
                  ...filterButton,

                  marginTop: "26px",

                  background: mode === "selected" ? "#2563eb" : "#e2e8f0",

                  color: mode === "selected" ? "#fff" : "#0f172a",
                }}
              >
                High Stock Categories
              </button>

              {/* REJECTED */}
              <button
                onClick={() => setMode("rejected")}
                style={{
                  ...filterButton,

                  marginTop: "26px",

                  background: mode === "rejected" ? "#dc2626" : "#e2e8f0",

                  color: mode === "rejected" ? "#fff" : "#0f172a",
                }}
              >
                Low Stock Categories
              </button>
            </div>

            {/* EXPORT */}
            <button
              onClick={exportCSV}
              style={{
                height: "48px",

                padding: "0 20px",

                border: "none",

                borderRadius: "14px",

                background: "#059669",

                color: "#fff",

                fontWeight: 600,

                display: "flex",

                alignItems: "center",

                gap: "10px",

                cursor: "pointer",
              }}
            >
              <FaFileCsv />
              Export CSV
            </button>
          </div>
        </DashboardCard>

        {/* TABLE */}
        <DashboardCard>
          <div
            style={{
              overflowX: "auto",
            }}
          >
            <table
              style={{
                width: "100%",

                borderCollapse: "collapse",

                minWidth: "900px",
              }}
            >
              {/* HEADER */}
              <thead>
                <tr
                  style={{
                    background: "#f8fafc",
                  }}
                >
                  {[
                    "Category",
                    "Total",
                    "High",
                    "Low",
                    "≤1k",
                    "≤10k",
                    "10k+",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "16px",

                        textAlign: "left",

                        fontSize: "14px",

                        fontWeight: 700,

                        color: "#334155",

                        borderBottom: "1px solid #e2e8f0",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* BODY */}
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={7}
                      style={{
                        padding: "40px",

                        textAlign: "center",

                        color: "#64748b",
                      }}
                    >
                      Loading Reports...
                    </td>
                  </tr>
                ) : reportList.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      style={{
                        padding: "40px",

                        textAlign: "center",

                        color: "#64748b",
                      }}
                    >
                      No Report Data
                    </td>
                  </tr>
                ) : (
                  reportList.map((item, index) => (
                    <tr
                      key={item.id}
                      style={{
                        background: index % 2 === 0 ? "#fff" : "#f8fafc",

                        transition: "0.2s",
                      }}
                    >
                      {/* CATEGORY */}
                      <TableCell
                        onClick={() => handleClick(item.id)}
                        color="#2563eb"
                        bold
                      >
                        {item.name}
                      </TableCell>

                      {/* TOTAL */}
                      <TableCell onClick={() => handleClick(item.id)}>
                        {item.count}
                      </TableCell>

                      {/* HIGH */}
                      <TableCell
                        onClick={() => handleClick(item.id, "high")}
                        color="#16a34a"
                      >
                        {item.gte_threshold}
                      </TableCell>

                      {/* LOW */}
                      <TableCell
                        onClick={() => handleClick(item.id, "low")}
                        color={item.lt_threshold > 0 ? "#dc2626" : "#111827"}
                      >
                        {item.lt_threshold}
                      </TableCell>

                      {/* 1K */}
                      <TableCell onClick={() => handleClick(item.id, "lte1k")}>
                        {item.lte_thousand}
                      </TableCell>

                      {/* 10K */}
                      <TableCell onClick={() => handleClick(item.id, "lte10k")}>
                        {item.lte_lakh}
                      </TableCell>

                      {/* GT10K */}
                      <TableCell onClick={() => handleClick(item.id, "gt10k")}>
                        {item.gt_lakh}
                      </TableCell>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </DashboardCard>
      </div>
    </DashboardLayout>
  );
};

export default ReportPage;

// ========================================
// STATS CARD
// ========================================

const StatsCard = ({ title, value, icon, bg, color }: any) => {
  return (
    <DashboardCard>
      <div
        style={{
          display: "flex",

          justifyContent: "space-between",

          alignItems: "center",
        }}
      >
        <div>
          <p
            style={{
              margin: 0,

              color: "#64748b",

              marginBottom: "10px",

              fontSize: "14px",
            }}
          >
            {title}
          </p>

          <h2
            style={{
              margin: 0,

              fontSize: "32px",

              color: "#0f172a",
            }}
          >
            {value}
          </h2>
        </div>

        <div
          style={{
            width: "62px",

            height: "62px",

            borderRadius: "18px",

            background: bg,

            color: color,

            display: "flex",

            alignItems: "center",

            justifyContent: "center",

            fontSize: "24px",
          }}
        >
          {icon}
        </div>
      </div>
    </DashboardCard>
  );
};

// ========================================
// TABLE CELL
// ========================================

const TableCell = ({ children, onClick, color, bold }: any) => {
  return (
    <td
      onClick={onClick}
      style={{
        padding: "16px",

        cursor: "pointer",

        color: color || "#111827",

        fontWeight: bold ? 600 : 500,

        borderBottom: "1px solid #f1f5f9",
      }}
    >
      {children}
    </td>
  );
};

// ========================================
// STYLES
// ========================================

const filterButton = {
  height: "46px",

  padding: "0 18px",

  border: "none",

  borderRadius: "12px",

  cursor: "pointer",

  fontWeight: 600,

  transition: "0.2s",
};

const inputStyle = {
  width: "120px",

  height: "46px",

  borderRadius: "12px",

  border: "1px solid #dbe2ea",

  padding: "0 14px",

  outline: "none",

  fontSize: "14px",
};
