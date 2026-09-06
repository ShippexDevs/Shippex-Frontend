import { useNavigate } from "react-router-dom";

import MobileLayout from "../layouts/MobileLayout";
import { categories } from "../data/categories";

import CategoryCard from "../components/home/CategoryCard";
import PageHeader from "../components/common/PageHeader";

function CategoriesPage() {
  const navigate = useNavigate();

  return (
    <MobileLayout>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        <PageHeader
          title="Categories"
          subtitle="Browse all available categories"
          showBack
        />

        <div
          className="
            mt-8
            grid
            grid-cols-2
            gap-4
            sm:grid-cols-3
            md:grid-cols-4
            lg:grid-cols-5
            xl:grid-cols-6
          "
        >

          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              icon={category.icon}
              name={category.name}
              onClick={() =>
                navigate(
                  `/categories/${category.slug}`
                )
              }
            />
          ))}

        </div>

      </div>

    </MobileLayout>
  );
}

export default CategoriesPage;