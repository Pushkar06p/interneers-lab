interface Props {
  value: string;
  setFilters: React.Dispatch<React.SetStateAction<any>>;
  options: { value: string; label: string }[];
}

const SortDropdown = ({ value, setFilters, options }: Props) => {
  const handleChange = (val: string) => {
    setFilters((prev: any) => ({
      ...prev,
      sort_by: val,
    }));
  };

  return (
    <select
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      style={{ padding: "6px", marginTop: "10px" }}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default SortDropdown;
