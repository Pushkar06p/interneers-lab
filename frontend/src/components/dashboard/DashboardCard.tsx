import React from "react";

interface Props {
  children: React.ReactNode;
}

const DashboardCard = ({ children }: Props) => {
  return (
    <div
      style={{
        width: "100%",

        background: "#fff",

        borderRadius: "22px",

        padding: "22px",

        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",

        boxSizing: "border-box",
      }}
    >
      {children}
    </div>
  );
};

export default DashboardCard;
