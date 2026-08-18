import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { categories } from "../data/categories";
import { getProductsByCategorySlug } from "../services/productApi";

import PageHeader from "../components/common/PageHeader";
import SearchBar from "../components/common/Searchbar";
import ProductSection from "../components/product/ProductSection";

function CategoryProductsPage() {

  const { slug } = useParams();

  const category = categories.find(
    (item) => item.slug === slug
  );

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        setLoading(true);
        setError(null);

        const data =
          await getProductsByCategorySlug(slug);

        setProducts(data);

      } catch (error) {

        console.error(
          "Failed to fetch category products:",
          error
        );

        setError(
          "Unable to load products."
        );

      } finally {

        setLoading(false);

      }
    };

    if (slug) {
      fetchProducts();
    }

  }, [slug]);

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

            {loading
              ? "Loading products..."
              : `${products.length} Products`}

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

        {loading && (
          <div className="py-10 text-center">
            <p className="text-slate-500">
              Loading products...
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="py-10 text-center">
            <p className="text-red-500">
              {error}
            </p>
          </div>
        )}

        {!loading &&
          !error &&
          products.length === 0 && (
            <div className="py-10 text-center">
              <p className="text-slate-500">
                No products found in this category.
              </p>
            </div>
          )}

        {!loading &&
          !error &&
          products.length > 0 && (
            <ProductSection
              products={products}
              showHeader={false}
            />
          )}

      </div>
    </div>
  );
}

export default CategoryProductsPage;