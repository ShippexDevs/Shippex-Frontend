import { useNavigate } from "react-router-dom";
import { categories } from "../../data/categories";
import CategoryCard from "./CategoryCard";

const HOME_CATEGORY_LIMIT = 6;

function CategoriesSection() {
  const navigate = useNavigate();

  const visibleCategories = categories.slice(
    0,
    HOME_CATEGORY_LIMIT
  );

  return (
    <section>
      {/* Header */}

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#102A43]">
          Categories
        </h2>

        <button
          type="button"
          onClick={() => navigate("/categories")}
          className="
            text-sm
            font-semibold
            text-cyan-700
            transition
            hover:text-cyan-800
          "
        >
          View All
        </button>
      </div>

      {/* Category Grid */}

      <div
        className="
          grid
          grid-cols-2
          gap-3
          sm:grid-cols-3
        "
      >
        {visibleCategories.map((category) => (
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