import React from "react";

import Sidebar from "./Sidebar";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  return (
    <div
      style={{
        background: "#f8fafc",

        minHeight: "100vh",
      }}
    >
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main
        style={{
          marginLeft: "250px",

          width: "calc(100% - 250px)",

          minHeight: "100vh",

          padding: "24px",

          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "100%",
          }}
        >
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
