import { FaLayerGroup, FaAlignLeft } from "react-icons/fa";

import { useState } from "react";

import { Category } from "../../types/category";

interface CategoryFormProps {
  category: Category | null;

  onSubmit: (category: Category) => void;
}

const CategoryForm = ({ category, onSubmit }: CategoryFormProps) => {
  const [formData, setFormData] = useState<Category>({
    id: category?.id || "",

    name: category?.name || "",

    description: category?.description || "",
  });

  // HANDLE CHANGE
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]: value,
    }));
  };

  // HANDLE SUBMIT
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",

        flexDirection: "column",

        gap: "24px",
      }}
    >
      {/* CATEGORY NAME */}
      <div>
        <label style={label}>Category Name</label>

        <div style={inputWrapper}>
          {/* ICON */}
          <div style={iconBox}>
            <FaLayerGroup />
          </div>

          {/* INPUT */}
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            placeholder="Enter category name"
            style={input}
            required
          />
        </div>
      </div>

      {/* DESCRIPTION */}
      <div>
        <label style={label}>Description</label>

        <div
          style={{
            ...inputWrapper,

            alignItems: "flex-start",

            paddingTop: "14px",
          }}
        >
          {/* ICON */}
          <div style={iconBox}>
            <FaAlignLeft />
          </div>

          {/* TEXTAREA */}
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            placeholder="Enter category description"
            style={textarea}
            rows={5}
          />
        </div>
      </div>

      {/* BUTTON */}
      <button type="submit" style={button}>
        {category ? "Update Category" : "Create Category"}
      </button>
    </form>
  );
};

export default CategoryForm;

// ========================================
// STYLES
// ========================================

const label = {
  display: "block",

  marginBottom: "10px",

  fontSize: "14px",

  fontWeight: 600,

  color: "#334155",
};

const inputWrapper = {
  display: "flex",

  alignItems: "center",

  gap: "14px",

  border: "1px solid #dbe2ea",

  borderRadius: "16px",

  padding: "0 16px",

  background: "#fff",

  transition: "0.2s",
};

const iconBox = {
  color: "#64748b",

  fontSize: "15px",

  marginTop: "2px",
};

const input = {
  width: "100%",

  height: "54px",

  border: "none",

  outline: "none",

  fontSize: "14px",

  background: "transparent",

  color: "#0f172a",
};

const textarea = {
  width: "100%",

  border: "none",

  outline: "none",

  resize: "none" as const,

  fontSize: "14px",

  background: "transparent",

  color: "#0f172a",

  fontFamily: "inherit",

  paddingBottom: "14px",
};

const button = {
  width: "100%",

  height: "56px",

  border: "none",

  borderRadius: "16px",

  background: "linear-gradient(135deg,#0f172a,#1e293b)",

  color: "#fff",

  fontSize: "15px",

  fontWeight: 600,

  cursor: "pointer",

  transition: "0.2s",

  boxShadow: "0 10px 20px rgba(15,23,42,0.15)",
};
