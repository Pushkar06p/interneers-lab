import React from "react";

interface FilterField {
  name: string;
  label: string;
}

interface FilterPanelProps<T> {
  filters: T;
  setFilters: React.Dispatch<React.SetStateAction<T>>;
  fields: FilterField[];
}

const FilterPanel = <T extends Record<string, any>>({
  filters,
  setFilters,
  fields,
}: FilterPanelProps<T>) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
      {fields.map((field) => {
        return (
          <input
            key={field.name}
            name={field.name}
            placeholder={field.label}
            value={(filters as any)[field.name] ?? ""}
            onChange={handleChange}
          />
        );
      })}
    </div>
  );
};

export default FilterPanel;
