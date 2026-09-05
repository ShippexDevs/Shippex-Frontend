import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("default");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getProductsByCategorySlug(slug);

        setProducts(data);
      } catch (error) {
        console.error(
          "Failed to fetch category products:",
          error
        );

        setError("Unable to load products.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProducts();
    }
  }, [slug]);

  /*
   * Search + Sort
   *
   * We don't modify the original products array.
   * Instead, create a filtered/sorted copy.
   */
  const displayedProducts = useMemo(() => {
    let result = [...products];

    const query = searchQuery.trim().toLowerCase();

    // Search
    if (query) {
      result = result.filter((product) => {
        const name = product.name?.toLowerCase() || "";
        const brand = product.brand?.toLowerCase() || "";
        const description =
          product.description?.toLowerCase() || "";
        const tags = Array.isArray(product.tags)
          ? product.tags.join(" ").toLowerCase()
          : "";

        return (
          name.includes(query) ||
          brand.includes(query) ||
          description.includes(query) ||
          tags.includes(query)
        );
      });
    }

    // Sort
    switch (sortOption) {
      case "price-low":
        result.sort(
          (a, b) =>
            Number(a.price || 0) -
            Number(b.price || 0)
        );
        break;

      case "price-high":
        result.sort(
          (a, b) =>
            Number(b.price || 0) -
            Number(a.price || 0)
        );
        break;

      case "name-az":
        result.sort((a, b) =>
          (a.name || "").localeCompare(
            b.name || ""
          )
        );
        break;

      case "name-za":
        result.sort((a, b) =>
          (b.name || "").localeCompare(
            a.name || ""
          )
        );
        break;

      default:
        break;
    }

    return result;
  }, [products, searchQuery, sortOption]);

  if (!category) {
    return (
      <div className="flex min-h-screen items-center justify-center">
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

        {/* Search */}
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
        />

        {/* Product controls */}
        <div className="mt-5 mb-8 flex items-center justify-between gap-4">

          <p className="text-sm text-slate-500">
            {loading
              ? "Loading products..."
              : searchQuery
                ? `${displayedProducts.length} ${
                    displayedProducts.length === 1
                      ? "product"
                      : "products"
                  } found`
                : `${products.length} Products`}
          </p>

          {/* Sort */}
          <div className="relative shrink-0">
            <select
              value={sortOption}
              onChange={(event) =>
                setSortOption(event.target.value)
              }
              className="
                appearance-none
                cursor-pointer
                rounded-xl
                border
                border-slate-200
                bg-white
                py-2
                pl-4
                pr-9
                text-sm
                font-medium
                text-slate-700
                shadow-sm
                outline-none
                transition

                hover:border-slate-300

                focus:border-[#0F6E8C]
                focus:ring-2
                focus:ring-[#0F6E8C]/10
              "
            >
              <option value="default">
                Sort
              </option>

              <option value="name-az">
                Name: A–Z
              </option>

              <option value="name-za">
                Name: Z–A
              </option>

              <option value="price-low">
                Price: Low to High
              </option>

              <option value="price-high">
                Price: High to Low
              </option>
            </select>

            {/* Dropdown arrow */}
            <svg
              className="
                pointer-events-none
                absolute
                right-3
                top-1/2
                h-4
                w-4
                -translate-y-1/2
                text-slate-400
              "
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                d="m6 8 4 4 4-4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-10 text-center">
            <p className="text-slate-500">
              Loading products...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="py-10 text-center">
            <p className="text-red-500">
              {error}
            </p>
          </div>
        )}

        {/* No search results */}
        {!loading &&
          !error &&
          displayedProducts.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-lg font-medium text-slate-700">
                No products found
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Try a different search term.
              </p>

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="
                    mt-4
                    rounded-xl
                    bg-[#0F6E8C]
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-white
                    transition
                    hover:bg-[#0B5D76]
                  "
                >
                  Clear search
                </button>
              )}
            </div>
          )}

        {/* Products */}
        {!loading &&
          !error &&
          displayedProducts.length > 0 && (
            <ProductSection
              products={displayedProducts}
              showHeader={false}
            />
          )}

      </div>
    </div>
  );
}

export default CategoryProductsPage;