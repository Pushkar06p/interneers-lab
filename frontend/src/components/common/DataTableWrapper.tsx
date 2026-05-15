import React from "react";

interface Props {
  children: React.ReactNode;
}

const DataTableWrapper = ({ children }: Props) => {
  return (
    <div
      style={{
        width: "100%",

        border: "1px solid #f1f5f9",

        borderRadius: "18px",

        overflowX: "auto",

        background: "#fff",
      }}
    >
      {children}
    </div>
  );
};

export default DataTableWrapper;
