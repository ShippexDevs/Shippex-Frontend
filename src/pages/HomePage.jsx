import { useEffect, useState } from "react";

import MobileLayout from "../layouts/MobileLayout";
import Header from "../components/home/Header";
import DeliveryCard from "../components/home/Deliverycard";
import SearchBar from "../components/common/Searchbar";
import CategoriesSection from "../components/home/CategoriesSection";
import OfferBanner from "../components/home/OfferBanner";
import ProductSection from "../components/product/ProductSection";
import BottomNavigation from "../components/navigation/BottomNavigation";

import { getFeaturedProducts } from "../services/productApi";

function HomePage() {

  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchFeaturedProducts = async () => {

      try {

        const products =
          await getFeaturedProducts();

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

  /*
   * Group featured products by category
   *
   * Example:
   *
   * {
   *   "Laundry Care": [product1, product2],
   *   "Cleaning Essentials": [product3, product4]
   * }
   */
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

      <div className="min-h-screen bg-[#F5F8FA]">

        <Header />

        <main className="space-y-8 px-5 pt-6 pb-24">

          <DeliveryCard />

          <SearchBar />

          <CategoriesSection />

          <OfferBanner />

          {/* Popular Products */}

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

        <BottomNavigation />

      </div>

    </MobileLayout>
  );
}

export default HomePage;