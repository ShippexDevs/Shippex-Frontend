import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Check,
  ChevronDown,
  ArrowDownAZ,
  ArrowDownUp,
  CircleDollarSign,
} from "lucide-react";

import { categories } from "../data/categories";
import { getProductsByCategorySlug } from "../services/productApi";

import PageHeader from "../components/common/PageHeader";
import SearchBar from "../components/common/Searchbar";
import ProductSection from "../components/product/ProductSection";

const SORT_OPTIONS = [
  {
    value: "recommended",
    label: "Recommended",
    description: "Best match for you",
    icon: ArrowDownUp,
  },
  {
    value: "price-low",
    label: "Price: Low to High",
    description: "Lowest price first",
    icon: CircleDollarSign,
  },
  {
    value: "price-high",
    label: "Price: High to Low",
    description: "Highest price first",
    icon: CircleDollarSign,
  },
  {
    value: "name",
    label: "Name: A to Z",
    description: "Alphabetical order",
    icon: ArrowDownAZ,
  },
];

function CategoryProductsPage() {
  const { slug } = useParams();

  const category = categories.find(
    (item) => item.slug === slug
  );

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [sortBy, setSortBy] = useState("recommended");
  const [sortOpen, setSortOpen] = useState(false);

  const sortRef = useRef(null);

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
   * Close sort menu when clicking outside.
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sortRef.current &&
        !sortRef.current.contains(event.target)
      ) {
        setSortOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /*
   * Reset sorting when changing category.
   */
  useEffect(() => {
    setSortBy("recommended");
    setSortOpen(false);
  }, [slug]);

  if (!category) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h2 className="text-2xl font-semibold">
          Category not found
        </h2>
      </div>
    );
  }

  /*
   * Sort products without modifying the original API state.
   */
  const sortedProducts = [...products].sort(
    (a, b) => {
      switch (sortBy) {
        case "price-low":
          return Number(a.price) - Number(b.price);

        case "price-high":
          return Number(b.price) - Number(a.price);

        case "name":
          return a.name.localeCompare(
            b.name,
            undefined,
            {
              sensitivity: "base",
            }
          );

        case "recommended":
        default:
          return 0;
      }
    }
  );

  const selectedSort =
    SORT_OPTIONS.find(
      (option) => option.value === sortBy
    ) || SORT_OPTIONS[0];

  return (
    <div className="min-h-screen bg-[#F5F8FA]">
      <div className="mx-auto max-w-7xl px-5 py-6">

        <PageHeader
          title={category.name}
          subtitle={category.description}
        />

        <SearchBar />

        <div className="mt-5 mb-8 flex items-center justify-between gap-4">

          {/* Product count */}
          <p className="text-sm text-slate-500">
            {loading
              ? "Loading products..."
              : `${products.length} ${
                  products.length === 1
                    ? "Product"
                    : "Products"
                }`}
          </p>

          {/* Custom Sort */}
          <div
            ref={sortRef}
            className="relative"
          >
            <button
              type="button"
              onClick={() =>
                setSortOpen((current) => !current)
              }
              aria-expanded={sortOpen}
              className="
                group
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-slate-200
                bg-white
                px-3.5
                py-2.5
                text-sm
                font-medium
                text-slate-700
                shadow-sm
                transition-all
                duration-200
                hover:border-slate-300
                hover:shadow-md
                active:scale-[0.98]
              "
            >
              <span className="text-slate-400">
                Sort:
              </span>

              <span className="text-[#102A43]">
                {selectedSort.label}
              </span>

              <ChevronDown
                size={16}
                className={`
                  text-slate-400
                  transition-transform
                  duration-200
                  ${
                    sortOpen
                      ? "rotate-180"
                      : ""
                  }
                `}
              />
            </button>

            {sortOpen && (
              <div
                className="
                  absolute
                  right-0
                  top-full
                  z-50
                  mt-2
                  w-64
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-1.5
                  shadow-[0_16px_40px_rgba(15,23,42,0.12)]
                "
              >
                <div className="px-3 pb-2 pt-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                    Sort products
                  </p>
                </div>

                <div className="space-y-0.5">
                  {SORT_OPTIONS.map(
                    (option) => {
                      const Icon = option.icon;
                      const isSelected =
                        sortBy === option.value;

                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            setSortBy(
                              option.value
                            );
                            setSortOpen(false);
                          }}
                          className={`
                            flex
                            w-full
                            items-center
                            gap-3
                            rounded-xl
                            px-3
                            py-2.5
                            text-left
                            transition
                            ${
                              isSelected
                                ? "bg-[#F0F8F9]"
                                : "hover:bg-slate-50"
                            }
                          `}
                        >
                          {/* Icon */}
                          <div
                            className={`
                              flex
                              h-8
                              w-8
                              shrink-0
                              items-center
                              justify-center
                              rounded-lg
                              ${
                                isSelected
                                  ? "bg-[#087E8B] text-white"
                                  : "bg-slate-100 text-slate-500"
                              }
                            `}
                          >
                            <Icon size={15} />
                          </div>

                          {/* Text */}
                          <div className="min-w-0 flex-1">
                            <p
                              className={`
                                text-sm
                                font-medium
                                ${
                                  isSelected
                                    ? "text-[#087E8B]"
                                    : "text-slate-700"
                                }
                              `}
                            >
                              {option.label}
                            </p>

                            <p className="mt-0.5 text-[11px] text-slate-400">
                              {option.description}
                            </p>
                          </div>

                          {/* Selected */}
                          {isSelected && (
                            <Check
                              size={17}
                              className="shrink-0 text-[#087E8B]"
                            />
                          )}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>
            )}
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

        {/* Empty */}
        {!loading &&
          !error &&
          products.length === 0 && (
            <div className="py-10 text-center">
              <p className="text-slate-500">
                No products found in this category.
              </p>
            </div>
          )}

        {/* Products */}
        {!loading &&
          !error &&
          sortedProducts.length > 0 && (
            <ProductSection
              products={sortedProducts}
              showHeader={false}
            />
          )}
      </div>
    </div>
  );
}

export default CategoryProductsPage;