import React, { useState } from "react";

import { FaFilter, FaChevronDown, FaChevronUp } from "react-icons/fa";

interface Field {
  name: string;
  label: string;
}

interface Props<T> {
  filters: T;
  setFilters: React.Dispatch<React.SetStateAction<T>>;
  fields: Field[];
}

const FilterPanel = <T extends Record<string, any>>({
  filters,
  setFilters,
  fields,
}: Props<T>) => {
  const [open, setOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      {/* HEADER */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          height: "54px",
          padding: "0 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          background: "#fff",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontWeight: 600,
            fontSize: "14px",
            color: "#0f172a",
          }}
        >
          <FaFilter size={13} />
          Filters
        </div>

        {open ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
      </div>

      {/* BODY */}
      {open && (
        <div
          style={{
            borderTop: "1px solid #f1f5f9",
            padding: "18px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
            gap: "16px",
            background: "#fff",
          }}
        >
          {fields.map((field) => (
            <div
              key={field.name}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
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
                placeholder={field.label}
                style={{
                  height: "42px",
                  borderRadius: "10px",
                  border: "1px solid #e2e8f0",
                  padding: "0 12px",
                  fontSize: "13px",
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
