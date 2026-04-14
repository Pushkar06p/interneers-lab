import { useState, useRef, useEffect } from "react";
import { Category } from "../../types/category";

interface Props {
  categories: Category[];
  selectedCategories: string[];
  setFilters: React.Dispatch<React.SetStateAction<any>>;
}

const CategoryFilter = ({
  categories,
  selectedCategories,
  setFilters,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleCategory = (id: string) => {
    setFilters((prev: any) => {
      const exists = prev.category.includes(id);

      return {
        ...prev,
        category: exists
          ? prev.category.filter((c: string) => c !== id)
          : [...prev.category, id],
      };
    });
  };

  const removeCategory = (id: string) => {
    setFilters((prev: any) => ({
      ...prev,
      category: prev.category.filter((c: string) => c !== id),
    }));
  };

  return (
    <div ref={dropdownRef} style={{ position: "relative", width: "250px" }}>
      {/* Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          border: "1px solid gray",
          padding: "8px",
          cursor: "pointer",
          background: "white",
        }}
      >
        Select Categories ▼
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "40px",
            width: "100%",
            border: "1px solid gray",
            background: "white",
            maxHeight: "150px",
            overflowY: "auto",
            zIndex: 10,
          }}
        >
          {categories.map((cat) => (
            <div
              key={cat.id}
              style={{ padding: "6px", cursor: "pointer" }}
              onClick={() => toggleCategory(cat.id!)}
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.id!)}
                readOnly
              />{" "}
              {cat.name}
            </div>
          ))}
        </div>
      )}

      {/* Selected Chips */}
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          gap: "5px",
          flexWrap: "wrap",
        }}
      >
        {selectedCategories.map((id) => {
          const category = categories.find((c) => c.id === id);

          return (
            <div
              key={id}
              style={{
                background: "#ddd",
                padding: "4px 8px",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              {category?.name}

              <span
                onClick={() => removeCategory(id)}
                style={{
                  cursor: "pointer",
                  color: "red",
                  fontWeight: "bold",
                }}
              >
                ❌
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
