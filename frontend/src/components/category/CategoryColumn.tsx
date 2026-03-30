import { Category } from "../../types/category";
import { Link } from "react-router-dom";
import { deleteCategory } from "services/categoryService";
interface CategoryColumnProps {
  category: Category;
}

const CategoryColumn = ({ category }: CategoryColumnProps) => {
  return (
    <div
      style={{
        border: "1px solid black",
        backgroundColor: "lightsteelblue",
        padding: "12px",
        marginBottom: "12px",
      }}
    >
      <Link to={`/categories/products/${category.id}`}>
        <h2>{category.name}</h2>
      </Link>
      <p>{category.description}</p>
      <Link to={`/categories/${category.id}`}>Edit Category</Link>
      <button
        onClick={() => {
          deleteCategory(category.id).then(() => {
            alert("Category deleted successfully");
            window.location.reload();
          });
        }}
      >
        Delete Category
      </button>
    </div>
  );
};

export default CategoryColumn;
