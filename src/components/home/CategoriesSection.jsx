import { useNavigate } from "react-router-dom";
import { categories } from "../../data/categories";
import CategoryCard from "./CategoryCard";

function CategoriesSection() {
  const navigate = useNavigate();

  return (
    <section>

      <div className="flex justify-between mb-4">

        <h2 className="text-xl font-bold">
          Categories
        </h2>

        <button
          onClick={() => navigate("/categories")}
          className="text-cyan-700 font-semibold"
        >
          View All
        </button>

      </div>

      <div
        className="
          flex
          gap-4
          overflow-x-auto
          pb-3
        "
      >
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            icon={category.icon}
            name={category.name}
            onClick={() =>
              navigate(`/categories/${category.slug}`)
            }
          />
        ))}
      </div>

    </section>
  );
}

export default CategoriesSection;