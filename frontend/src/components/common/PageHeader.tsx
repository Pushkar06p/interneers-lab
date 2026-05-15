import React from "react";
import { Link } from "react-router-dom";

interface Action {
  label: string;
  to: string;
  primary?: boolean;
}

interface Props {
  title: string;
  subtitle: string;
  actions?: Action[];
}

const PageHeader = ({ title, subtitle, actions }: Props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "24px",
        flexWrap: "wrap",
        gap: "14px",
      }}
    >
      <div>
        <h1
          style={{
            margin: 0,
            fontSize: "30px",
            fontWeight: 700,
            color: "#0f172a",
          }}
        >
          {title}
        </h1>

        <p
          style={{
            marginTop: "6px",
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          {subtitle}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          gap: "12px",
        }}
      >
        {actions?.map((action) => (
          <Link
            key={action.label}
            to={action.to}
            style={{
              padding: "11px 18px",
              borderRadius: "12px",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "14px",

              background: action.primary ? "#f59e0b" : "#fff",

              color: action.primary ? "#fff" : "#0f172a",

              border: action.primary ? "none" : "1px solid #e2e8f0",

              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            {action.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PageHeader;
