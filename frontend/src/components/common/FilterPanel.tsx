import React, { useState } from "react";

interface FilterField {
  name: string;
  label: string;
}

interface FilterPanelProps<T> {
  filters: T;
  setFilters: React.Dispatch<React.SetStateAction<T>>;
  fields: FilterField[];
}

const FilterPanel = <T extends Record<string, any>>({
  filters,
  setFilters,
  fields,
}: FilterPanelProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        marginTop: "10px",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          padding: "12px 16px",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #e2e8f0",
          background: "#f8fafc",
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: "15px",
            fontWeight: 600,
            color: "#334155",
          }}
        >
          Filters
        </h3>

        <span style={{ fontSize: "14px", color: "#2563eb" }}>
          {isOpen ? "▲ Hide" : "▼ Show"}
        </span>
      </div>

      {/* Body */}
      {isOpen && (
        <div
          style={{
            padding: "16px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "12px",
          }}
        >
          {fields.map((field) => (
            <div
              key={field.name}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <label
                style={{
                  fontSize: "12px",
                  color: "#64748b",
                  fontWeight: 500,
                }}
              >
                {field.label}
              </label>

              <input
                name={field.name}
                value={(filters as any)[field.name] ?? ""}
                onChange={handleChange}
                placeholder={`Enter ${field.label}`}
                style={{
                  padding: "8px 10px",
                  borderRadius: "6px",
                  border: "1px solid #cbd5f5",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
