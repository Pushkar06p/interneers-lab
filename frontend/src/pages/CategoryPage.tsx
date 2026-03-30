import { Link } from "react-router-dom";
import CategoryColumn from "../components/category/CategoryColumn";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import { useCategories } from "../hooks/useCategories";
import { Category } from "types/category";

const CategoryPage = () => {
  const { categories, loading, error } = useCategories();
  console.log(categories);
  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div
      style={{
        backgroundColor: "blanchedalmond",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h1>Categories</h1>
        <h2>
          <Link to={`/categories/create`}>Create Categories</Link>
        </h2>
        <h2>
          <Link to="/"> Go to Products</Link>
        </h2>
      </div>
      {categories.map((category: Category) => (
        <CategoryColumn key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CategoryPage;
