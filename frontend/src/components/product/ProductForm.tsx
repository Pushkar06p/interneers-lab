import {
  FaBoxOpen,
  FaTag,
  FaIndianRupeeSign,
  FaLayerGroup,
  FaAlignLeft,
} from "react-icons/fa6";

import { useState } from "react";

import { Product } from "../../types/product";

import { useCategories } from "hooks/useCategories";
import Sidebar from "components/dashboard/Sidebar";

interface ProductFormProps {
  product: Product | null;

  onSubmit: (product: Product) => void;

  isUpdate?: boolean;
}

const ProductForm = ({
  product,
  onSubmit,
  isUpdate = true,
}: ProductFormProps) => {
  const [formData, setFormData] = useState<Product>({
    id: product?.id || "",

    name: product?.name || "",

    brand: product?.brand || "",

    category: product?.category || "",

    price: product?.price || 0,

    quantity: product?.quantity || 0,

    description: product?.description || "",
  });

  const { categories } = useCategories(undefined);

  // HANDLE CHANGE
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]: name === "price" || name === "quantity" ? Number(value) : value,
    }));
  };

  // SUBMIT
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
      {/* GRID */}
      <div
        style={{
          display: "grid",

          gridTemplateColumns: "1fr 1fr",

          gap: "20px",
        }}
      >
        {/* PRODUCT NAME */}
        <FormField label="Product Name" icon={<FaBoxOpen />}>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            placeholder="Enter product name"
            style={input}
            required
          />
        </FormField>

        {/* BRAND */}
        <FormField label="Brand" icon={<FaTag />}>
          <input
            type="text"
            name="brand"
            value={formData.brand || ""}
            onChange={handleChange}
            placeholder="Enter brand"
            style={input}
            required
          />
        </FormField>

        {/* PRICE */}
        <FormField label="Price" icon={<FaIndianRupeeSign />}>
          <input
            type="number"
            name="price"
            value={formData.price ?? 0}
            onChange={handleChange}
            placeholder="Enter price"
            style={input}
            required
          />
        </FormField>

        {/* QUANTITY */}
        <FormField label="Quantity" icon={<FaBoxOpen />}>
          <input
            type="number"
            name="quantity"
            value={formData.quantity ?? 0}
            onChange={handleChange}
            placeholder="Enter quantity"
            style={input}
            required
          />
        </FormField>

        {/* CATEGORY */}
        <FormField label="Category" icon={<FaLayerGroup />}>
          <select
            name="category"
            value={formData.category || ""}
            onChange={handleChange}
            style={input}
          >
            <option value="">Select Category</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      {/* DESCRIPTION */}
      <FormField label="Description" icon={<FaAlignLeft />}>
        <textarea
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          placeholder="Enter product description"
          style={textarea}
          rows={5}
        />
      </FormField>

      {/* BUTTON */}
      {isUpdate && (
        <button type="submit" style={button}>
          {product ? "Update Product" : "Create Product"}
        </button>
      )}
    </form>
  );
};

export default ProductForm;

// ========================================
// FIELD WRAPPER
// ========================================

interface FormFieldProps {
  label: string;

  icon: React.ReactNode;

  children: React.ReactNode;
}

const FormField = ({ label, icon, children }: FormFieldProps) => {
  return (
    <div>
      <label style={labelStyle}>{label}</label>

      <div style={wrapper}>
        {/* ICON */}
        <div style={iconBox}>{icon}</div>

        {/* FIELD */}
        <div
          style={{
            width: "100%",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

// ========================================
// STYLES
// ========================================

const labelStyle = {
  display: "block",

  marginBottom: "10px",

  fontSize: "14px",

  fontWeight: 600,

  color: "#334155",
};

const wrapper = {
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

  padding: "16px 0",
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
