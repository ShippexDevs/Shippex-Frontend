import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MobileLayout from "../layouts/MobileLayout";
import { categories } from "../data/categories";

import CategoryCard from "../components/home/CategoryCard";
import PageHeader from "../components/common/PageHeader";
import { getCategories } from "../services/categoryApi";
import { Package } from "lucide-react";

function CategoriesPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState(categories);
  useEffect(() => { getCategories().then(setItems).catch(() => {}); }, []);

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

          {items.map((category) => (
            <CategoryCard
              key={category.id}
              icon={category.icon || Package}
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
