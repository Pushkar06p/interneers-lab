import { useState } from "react";

import DashboardLayout from "../components/dashboard/DashboardLayout";

import DashboardCard from "../components/dashboard/DashboardCard";

import PageHeader from "../components/common/PageHeader";

import { createUser } from "../services/userService";

const CreateUser = () => {
  const currentRole = localStorage.getItem("role");

  const [formData, setFormData] = useState({
    username: "",

    email: "",

    password: "",

    role: "employee",
  });

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState("");

  const [error, setError] = useState("");

  // HANDLE CHANGE
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      setError("");

      setSuccess("");

      await createUser(formData);

      setSuccess("User created successfully");

      setFormData({
        username: "",

        email: "",

        password: "",

        role: "employee",
      });
    } catch (err: any) {
      setError(err.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
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
          title="User Management"
          subtitle={
            localStorage.getItem("role") === "admin"
              ? "Create managers and employees for your inventory system"
              : "Create employees for your inventory system"
          }
        />
        {/* FORM */}
        <DashboardCard>
          {/* SUCCESS */}
          {success && <AlertBox text={success} type="success" />}

          {/* ERROR */}
          {error && <AlertBox text={error} type="error" />}

          {/* FORM */}
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "grid",

                gridTemplateColumns: "1fr 1fr",

                gap: "20px",
              }}
            >
              {/* USERNAME */}
              <div>
                <label style={label}>Username</label>

                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter username"
                  style={input}
                  required
                />
              </div>

              {/* EMAIL */}
              <div>
                <label style={label}>Email</label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  style={input}
                  required
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label style={label}>Password</label>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  style={input}
                  required
                />
              </div>

              {/* ROLE */}
              <div>
                <label style={label}>Role</label>

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  style={input}
                >
                  <option value="employee">Employee</option>

                  {currentRole === "admin" && (
                    <option value="manager">Manager</option>
                  )}
                </select>
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              style={{
                ...button,

                marginTop: "28px",

                background: loading ? "#94a3b8" : "#0f172a",
              }}
            >
              {loading ? "Creating..." : "Create User"}
            </button>
          </form>
        </DashboardCard>
      </div>
    </DashboardLayout>
  );
};

export default CreateUser;

// ========================================
// COMPONENTS
// ========================================
const AlertBox = ({ text, type }: any) => {
  return (
    <div
      style={{
        background: type === "success" ? "#dcfce7" : "#fee2e2",

        color: type === "success" ? "#166534" : "#dc2626",

        border: type === "success" ? "1px solid #bbf7d0" : "1px solid #fecaca",

        padding: "14px",

        borderRadius: "14px",

        marginBottom: "24px",

        fontSize: "14px",

        fontWeight: 500,
      }}
    >
      {text}
    </div>
  );
};

// ========================================
// STYLES
// ========================================

const label = {
  display: "block",

  marginBottom: "8px",

  fontWeight: 600,

  fontSize: "14px",

  color: "#334155",
};

const input = {
  width: "100%",

  height: "52px",

  borderRadius: "14px",

  border: "1px solid #dbe2ea",

  padding: "0 16px",

  fontSize: "14px",

  outline: "none",

  background: "#fff",

  boxSizing: "border-box" as const,
};

const button = {
  width: "100%",

  height: "54px",

  border: "none",

  borderRadius: "16px",

  color: "#fff",

  fontSize: "15px",

  fontWeight: 600,

  cursor: "pointer",
};
