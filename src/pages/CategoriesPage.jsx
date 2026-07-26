import { useNavigate } from "react-router-dom";

import { categories } from "../data/categories";

import CategoryCard from "../components/home/CategoryCard";
import PageHeader from "../components/common/PageHeader";

function CategoriesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F5F8FA]">

      <div className="mx-auto max-w-7xl px-5 py-6">

        <PageHeader
          title="Categories"
          subtitle="Browse all available categories"
          showBack
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-8">

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

      </div>

    </div>
  );
}

export default CategoriesPage;