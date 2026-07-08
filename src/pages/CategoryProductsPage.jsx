import { useParams } from "react-router-dom";

import { categories } from "../data/categories";
import { products } from "../data/products";

import PageHeader from "../components/common/PageHeader";
import SearchBar from "../components/common/SearchBar";
import ProductSection from "../components/product/ProductSection";

function CategoryProductsPage() {
  const { slug } = useParams();

  const category = categories.find(
    (item) => item.slug === slug
  );

  const filteredProducts = products.filter(
    (product) => product.categorySlug === slug
  );

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-semibold">
          Category not found
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F8FA]">
      <div className="mx-auto max-w-7xl px-5 py-6">

        <PageHeader
          title={category.name}
          subtitle={category.description}
        />

        <SearchBar />

        <div className="mt-5 mb-8 flex items-center justify-between">

          <p className="text-sm text-slate-500">
            {filteredProducts.length} Products
          </p>

          <button
            className="
              rounded-xl
              border
              border-slate-300
              px-4
              py-2
              text-sm
              font-medium
              hover:bg-slate-100
            "
          >
            Sort
          </button>

        </div>

        <ProductSection
          products={filteredProducts}
          showHeader={false}
        />

      </div>
    </div>
  );
}

export default CategoryProductsPage;