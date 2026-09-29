import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";

import MobileLayout from "../layouts/MobileLayout";
import DeliveryCard from "../components/home/Deliverycard";
import SearchBar from "../components/common/Searchbar";
import CategoriesSection from "../components/home/CategoriesSection";
import OfferBanner from "../components/home/OfferBanner";
import ProductSection from "../components/product/ProductSection";

import { getFeaturedProducts } from "../services/productApi";
import { useAuth } from "../context/AuthContext";

const PAGE_SIZE = 10;

function HomePage() {
  const { user } = useAuth();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [loadMoreError, setLoadMoreError] = useState("");

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const products = await getFeaturedProducts(0, PAGE_SIZE);
        setFeaturedProducts(products);
        setHasMore(products.length === PAGE_SIZE);
      } catch (error) {
        console.error(
          "Failed to fetch featured products:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const loadMoreProducts = async () => {
    if (loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);
      setLoadMoreError("");
      const nextProducts = await getFeaturedProducts(featuredProducts.length, PAGE_SIZE);
      setFeaturedProducts((currentProducts) => [...currentProducts, ...nextProducts]);
      setHasMore(nextProducts.length === PAGE_SIZE);
    } catch (error) {
      console.error("Failed to fetch more featured products:", error);
      setLoadMoreError("Unable to load more products. Please try again.");
    } finally {
      setLoadingMore(false);
    }
  };

  const productsByCategory =
    featuredProducts.reduce(
      (groups, product) => {
        const category =
          product.category || "Other";

        if (!groups[category]) {
          groups[category] = [];
        }

        groups[category].push(product);

        return groups;
      },
      {}
    );

  return (
    <MobileLayout>

      <div className="bg-[#F5F8FA]">

        <main className="mx-auto max-w-7xl space-y-8 px-4 pt-6 sm:px-6 lg:px-8">

          <DeliveryCard />

          <SearchBar />

          <CategoriesSection />

          <OfferBanner />

          <section className="space-y-8">

            {loading && (
              <p className="py-6 text-center text-sm text-slate-500">Loading featured products...</p>
            )}

            {Object.entries(productsByCategory).map(
              ([category, products]) => (
                <ProductSection
                  key={category}
                  title={category}
                  products={products}
                  showViewAll
                />
              )
            )}

          </section>

          {user && hasMore && (
            <div className="flex flex-col items-center gap-3 pb-8">
              {loadMoreError && <p className="text-sm text-red-600" role="alert">{loadMoreError}</p>}
              <button
                type="button"
                onClick={loadMoreProducts}
                disabled={loadingMore}
                className="inline-flex min-w-48 items-center justify-center gap-2 rounded-xl bg-[#087E8B] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#066b76] hover:shadow-md disabled:cursor-wait disabled:opacity-70"
              >
                {loadingMore && <LoaderCircle size={17} className="animate-spin" />}
                {loadingMore ? "Loading products..." : "Load More Products"}
              </button>
              <p className="text-xs text-slate-400">Showing {featuredProducts.length} featured products</p>
            </div>
          )}

        </main>

      </div>

    </MobileLayout>
  );
}

export default HomePage;
