import React from "react";

interface Props {
  search: string;
  setSearch: (value: string) => void;
  children?: React.ReactNode;
}

const TableToolbar = ({ search, setSearch, children }: Props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "16px",
        marginBottom: "18px",
        flexWrap: "wrap",
      }}
    >
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name..."
        style={{
          flex: 1,
          minWidth: "250px",
          height: "44px",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
          padding: "0 14px",
          fontSize: "14px",
          outline: "none",
          background: "#fff",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default TableToolbar;
