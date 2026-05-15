import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { loginUser } from "../services/userService";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // HANDLE CHANGE
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

      await loginUser(formData);

      navigate("/");
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        {/* LOGO */}
        <div style={logo}>I</div>

        {/* TITLE */}
        <h1 style={title}>Welcome Back</h1>

        <p style={subtitle}>Login to Inventory Management System</p>

        {/* ERROR */}
        {error && <div style={errorBox}>{error}</div>}

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          {/* USERNAME */}
          <div style={group}>
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

          {/* PASSWORD */}
          <div style={group}>
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

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            style={{
              ...button,

              background: loading ? "#94a3b8" : "#0f172a",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

// ========================================
// STYLES
// ========================================

const container = {
  width: "100%",

  height: "100vh",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  background: "linear-gradient(135deg,#0f172a,#1e293b)",

  padding: "20px",
};

const card = {
  width: "100%",

  maxWidth: "420px",

  background: "#fff",

  borderRadius: "24px",

  padding: "40px",

  boxShadow: "0 20px 40px rgba(0,0,0,0.2)",

  boxSizing: "border-box" as const,
};

const logo = {
  width: "70px",

  height: "70px",

  borderRadius: "20px",

  background: "linear-gradient(135deg,#f59e0b,#fbbf24)",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  margin: "0 auto 20px auto",

  color: "#fff",

  fontSize: "30px",

  fontWeight: 700,
};

const title = {
  textAlign: "center" as const,

  fontSize: "32px",

  color: "#0f172a",

  marginBottom: "10px",
};

const subtitle = {
  textAlign: "center" as const,

  color: "#64748b",

  marginBottom: "30px",
};

const errorBox = {
  background: "#fee2e2",

  color: "#dc2626",

  border: "1px solid #fecaca",

  padding: "12px",

  borderRadius: "12px",

  marginBottom: "20px",

  fontSize: "14px",
};

const group = {
  marginBottom: "20px",
};

const label = {
  display: "block",

  marginBottom: "8px",

  fontWeight: 600,

  fontSize: "14px",

  color: "#334155",
};

const input = {
  width: "100%",

  height: "48px",

  borderRadius: "12px",

  border: "1px solid #dbe2ea",

  padding: "0 14px",

  fontSize: "14px",

  outline: "none",

  boxSizing: "border-box" as const,
};

const button = {
  width: "100%",

  height: "50px",

  border: "none",

  borderRadius: "14px",

  color: "#fff",

  fontSize: "15px",

  fontWeight: 600,

  cursor: "pointer",
};
