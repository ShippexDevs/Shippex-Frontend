import { useEffect, useState } from "react";

import MobileLayout from "../layouts/MobileLayout";
import Header from "../components/home/Header";
import DeliveryCard from "../components/home/Deliverycard";
import SearchBar from "../components/common/Searchbar";
import CategoriesSection from "../components/home/CategoriesSection";
import OfferBanner from "../components/home/OfferBanner";
import ProductSection from "../components/product/ProductSection";

import { getFeaturedProducts } from "../services/productApi";

function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const products = await getFeaturedProducts();
        setFeaturedProducts(products);
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

        {/* Keep this only if Header contains
            home-specific content.
            If it is another navigation/header,
            remove it. */}

        <Header />

        <main className="mx-auto max-w-7xl space-y-8 px-4 pt-6 sm:px-6 lg:px-8">

          <DeliveryCard />

          <SearchBar />

          <CategoriesSection />

          <OfferBanner />

          <section className="space-y-8">

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

        </main>

      </div>

    </MobileLayout>
  );
}

export default HomePage;