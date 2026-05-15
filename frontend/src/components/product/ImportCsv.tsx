import { useState } from "react";

import axios from "axios";

const ImportCSV = () => {
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a CSV file");

      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("file", file);

      await axios.post(
        "http://localhost:8001/ims/products/import-csv/",

        formData,

        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,

            "Content-Type": "multipart/form-data",
          },
        },
      );

      alert("CSV imported successfully");
    } catch (error) {
      alert("Failed to import CSV");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "#f0f2f4",

        padding: "10px",

        borderRadius: "18px",
      }}
    >
      {/* <h3>Import Products CSV</h3> */}

      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        style={{
          marginTop: "16px",

          padding: "12px 18px",

          border: "none",

          borderRadius: "10px",

          background: "#0f172a",

          color: "#fff",

          cursor: "pointer",
        }}
      >
        {loading ? "Importing..." : "Import CSV"}
      </button>
    </div>
  );
};

export default ImportCSV;
