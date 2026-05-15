import { useState } from "react";

import {
  FaHome,
  FaBox,
  FaUserPlus,
  FaTags,
  FaChartBar,
  FaChevronDown,
  FaSignOutAlt,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);

  // USER DATA
  const username = localStorage.getItem("username") || "User";

  const role = localStorage.getItem("role") || "Employee";

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("role");

    localStorage.removeItem("username");

    navigate("/login");
  };

  // MENU
  const menu = [
    {
      label: "Dashboard",
      path: "/",
      icon: <FaHome />,
    },

    {
      label: "Products",
      path: "/products",
      icon: <FaBox />,
    },

    {
      label: "Categories",
      path: "/categories",
      icon: <FaTags />,
    },
  ];

  if (role === "admin" || role === "manager") {
    menu.push({
      label: "Create Users",
      path: "/users/create/",
      icon: <FaUserPlus />,
    });
  }

  if (role === "admin" || role === "manager") {
    menu.push({
      label: "Report",
      path: "/report",
      icon: <FaChartBar />,
    });
  }

  return (
    <aside
      style={{
        width: "250px",

        height: "100vh",

        position: "fixed",

        top: 0,

        left: 0,

        background: "linear-gradient(180deg,#0f172a,#111827)",

        padding: "20px 14px",

        display: "flex",

        flexDirection: "column",

        borderRight: "1px solid rgba(255,255,255,0.05)",

        zIndex: 100,
      }}
    >
      {/* LOGO */}
      <div
        style={{
          marginBottom: "30px",

          padding: "10px",
        }}
      >
        <div
          style={{
            display: "flex",

            alignItems: "center",

            gap: "12px",
          }}
        >
          {/* ICON */}
          <div
            style={{
              width: "42px",

              height: "42px",

              borderRadius: "12px",

              background: "linear-gradient(135deg,#f59e0b,#fbbf24)",

              display: "flex",

              alignItems: "center",

              justifyContent: "center",

              fontWeight: 700,

              color: "#fff",

              fontSize: "18px",
            }}
          >
            I
          </div>

          {/* TEXT */}
          <div>
            <h2
              style={{
                margin: 0,

                fontSize: "20px",

                color: "#fff",
              }}
            >
              Inventory
            </h2>

            <p
              style={{
                margin: 0,

                fontSize: "11px",

                color: "rgba(255,255,255,0.5)",

                letterSpacing: "1px",
              }}
            >
              MANAGEMENT SYSTEM
            </p>
          </div>
        </div>
      </div>

      {/* SECTION */}
      <div
        style={{
          padding: "0 10px",

          marginBottom: "14px",

          fontSize: "11px",

          letterSpacing: "1px",

          textTransform: "uppercase",

          color: "rgba(255,255,255,0.4)",

          fontWeight: 600,
        }}
      >
        Main Menu
      </div>

      {/* MENU */}
      <div
        style={{
          flex: 1,

          overflowY: "auto",
        }}
      >
        <nav
          style={{
            display: "flex",

            flexDirection: "column",

            gap: "6px",
          }}
        >
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                display: "flex",

                alignItems: "center",

                gap: "14px",

                padding: "12px 14px",

                borderRadius: "14px",

                textDecoration: "none",

                fontSize: "14px",

                fontWeight: isActive ? 600 : 500,

                color: isActive ? "#fff" : "rgba(255,255,255,0.72)",

                background: isActive ? "rgba(255,255,255,0.08)" : "transparent",

                transition: "0.2s",
              })}
            >
              {({ isActive }) => (
                <>
                  {/* ICON */}
                  <div
                    style={{
                      width: "34px",

                      height: "34px",

                      borderRadius: "10px",

                      background: isActive
                        ? "rgba(255,255,255,0.12)"
                        : "rgba(255,255,255,0.05)",

                      display: "flex",

                      alignItems: "center",

                      justifyContent: "center",

                      color: "#fff",

                      fontSize: "13px",
                    }}
                  >
                    {item.icon}
                  </div>

                  {item.label}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* USER PROFILE */}
      <div
        style={{
          position: "relative",

          paddingTop: "16px",

          marginBottom: "14px",

          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* PROFILE CARD */}
        <div
          onClick={() => setProfileOpen(!profileOpen)}
          style={{
            background: "rgba(255,255,255,0.05)",

            borderRadius: "18px",

            padding: "12px",

            display: "flex",

            alignItems: "center",

            justifyContent: "space-between",

            cursor: "pointer",

            transition: "0.2s",
          }}
        >
          {/* LEFT */}
          <div
            style={{
              display: "flex",

              alignItems: "center",

              gap: "12px",
            }}
          >
            {/* AVATAR */}
            <div
              style={{
                width: "42px",

                height: "42px",

                borderRadius: "50%",

                background: "linear-gradient(135deg,#f59e0b,#fbbf24)",

                display: "flex",

                alignItems: "center",

                justifyContent: "center",

                color: "#fff",

                fontWeight: 700,

                fontSize: "15px",

                textTransform: "uppercase",
              }}
            >
              {username.charAt(0)}
            </div>

            {/* USER INFO */}
            <div>
              <div
                style={{
                  fontSize: "14px",

                  fontWeight: 600,

                  color: "#fff",
                }}
              >
                {username}
              </div>

              <div
                style={{
                  fontSize: "12px",

                  color: "rgba(255,255,255,0.55)",

                  textTransform: "capitalize",
                }}
              >
                {role}
              </div>
            </div>
          </div>

          {/* ARROW */}
          <FaChevronDown
            size={12}
            color="rgba(255,255,255,0.6)"
            style={{
              transform: profileOpen ? "rotate(180deg)" : "rotate(0deg)",

              transition: "0.2s",
            }}
          />
        </div>

        {/* DROPDOWN */}
        {profileOpen && (
          <div
            style={{
              position: "absolute",

              bottom: "78px",

              left: 0,

              right: 0,

              background: "#1e293b",

              borderRadius: "16px",

              overflow: "hidden",

              border: "1px solid rgba(255,255,255,0.06)",

              boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
            }}
          >
            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              style={{
                width: "100%",

                border: "none",

                background: "transparent",

                color: "#fff",

                padding: "14px 16px",

                display: "flex",

                alignItems: "center",

                gap: "12px",

                cursor: "pointer",

                fontSize: "14px",

                transition: "0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
