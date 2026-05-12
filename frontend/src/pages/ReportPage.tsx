import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useReportCategories } from "../hooks/useReportCategories";
import { useProducts } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategories";

import { ProductFilterState } from "../types/productFilter";

const ReportPage: React.FC = () => {
  const navigate = useNavigate();

  const [threshold, setThreshold] = useState<number>(10);

  const [mode, setMode] = useState<"selected" | "rejected">("selected");

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

  const { products = [], loading: productsLoading } = useProducts(filters);

  const { categories = [], loading: categoriesLoading } =
    useCategories(undefined);

  const { selectedCategories, rejectedCategories } = useReportCategories(
    threshold,
    products,
    categories,
  );

  const reportList =
    mode === "selected" ? selectedCategories : rejectedCategories;

  const loading = productsLoading || categoriesLoading;

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
    <div
      style={{
        minHeight: "100vh",
        background: "#f1f5f9",
        padding: "32px",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ marginBottom: "8px" }}>📊 Category Report</h2>

        <p
          style={{
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          Click any value to filter products
        </p>
      </div>

      {/* Controls */}
      <div
        style={{
          background: "#fff",
          padding: "16px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <label style={{ fontWeight: 500 }}>Stock Threshold:</label>

        <input
          type="number"
          value={threshold}
          onChange={(e) => {
            const val = Number(e.target.value);

            setThreshold(isNaN(val) ? 0 : val);
          }}
          style={{
            padding: "6px 10px",
            borderRadius: "6px",
            border: "1px solid #cbd5f5",
            outline: "none",
          }}
        />

        {/* Selected */}
        <button
          onClick={() => setMode("selected")}
          style={{
            padding: "8px 16px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            background: mode === "selected" ? "#2563eb" : "#cbd5e1",
            color: "#fff",
          }}
        >
          Selected Categories
        </button>

        {/* Rejected */}
        <button
          onClick={() => setMode("rejected")}
          style={{
            padding: "8px 16px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            background: mode === "rejected" ? "#dc2626" : "#cbd5e1",
            color: "#fff",
          }}
        >
          Rejected Categories
        </button>

        {/* Export */}
        <button
          onClick={exportCSV}
          style={{
            padding: "8px 16px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            background: "#059669",
            color: "#fff",
            marginLeft: "auto",
          }}
        >
          Export CSV
        </button>
      </div>

      {/* Table */}
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "14px",
          }}
        >
          <thead
            style={{
              background: "#f8fafc",
            }}
          >
            <tr>
              {["Category", "Total", "High", "Low", "≤1k", "≤10k", "10k+"].map(
                (h) => (
                  <th
                    key={h}
                    style={{
                      padding: "14px",
                      textAlign: "left",
                      fontWeight: 600,
                      color: "#334155",
                      borderBottom: "1px solid #e2e8f0",
                    }}
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={7}
                  style={{
                    padding: "24px",
                    textAlign: "center",
                  }}
                >
                  Loading...
                </td>
              </tr>
            ) : reportList.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  style={{
                    padding: "24px",
                    textAlign: "center",
                  }}
                >
                  No Data Available
                </td>
              </tr>
            ) : (
              reportList.map((item, index) => (
                <tr
                  key={item.id}
                  style={{
                    background: index % 2 === 0 ? "#ffffff" : "#f9fafb",
                  }}
                >
                  {/* Category */}
                  <td
                    onClick={() => handleClick(item.id)}
                    style={{
                      padding: "12px",
                      fontWeight: 500,
                      color: "#2563eb",
                      cursor: "pointer",
                    }}
                  >
                    {item.name}
                  </td>

                  {/* Total */}
                  <td
                    onClick={() => handleClick(item.id)}
                    style={{
                      padding: "12px",
                      cursor: "pointer",
                    }}
                  >
                    {item.count}
                  </td>

                  {/* High */}
                  <td
                    onClick={() => handleClick(item.id, "high")}
                    style={{
                      padding: "12px",
                      color: "#16a34a",
                      cursor: "pointer",
                    }}
                  >
                    {item.gte_threshold}
                  </td>

                  {/* Low */}
                  <td
                    onClick={() => handleClick(item.id, "low")}
                    style={{
                      padding: "12px",
                      color: item.lt_threshold > 0 ? "#dc2626" : "#111827",
                      cursor: "pointer",
                    }}
                  >
                    {item.lt_threshold}
                  </td>

                  {/* ≤1k */}
                  <td
                    onClick={() => handleClick(item.id, "lte1k")}
                    style={{
                      padding: "12px",
                      cursor: "pointer",
                    }}
                  >
                    {item.lte_thousand}
                  </td>

                  {/* ≤10k */}
                  <td
                    onClick={() => handleClick(item.id, "lte10k")}
                    style={{
                      padding: "12px",
                      cursor: "pointer",
                    }}
                  >
                    {item.lte_lakh}
                  </td>

                  {/* 10k+ */}
                  <td
                    onClick={() => handleClick(item.id, "gt10k")}
                    style={{
                      padding: "12px",
                      cursor: "pointer",
                    }}
                  >
                    {item.gt_lakh}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportPage;
