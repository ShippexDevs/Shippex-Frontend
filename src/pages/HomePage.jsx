import MobileLayout from "../layouts/MobileLayout";
import Header from "../components/home/Header";
import DeliveryCard from "../components/home/DeliveryCard";
import SearchBar from "../components/common/SearchBar";
import CategoriesSection from "../components/home/CategoriesSection";
import OfferBanner from "../components/home/OfferBanner";
import ProductSection from "../components/product/ProductSection";
import BottomNavigation from "../components/navigation/BottomNavigation";
import { products } from "../data/products";

function HomePage() {
  return (
    <MobileLayout>
      <div className="min-h-screen bg-[#F5F8FA]">

        <Header />

        <main className="px-5 pt-6 pb-24 space-y-8">

          <DeliveryCard />

          <SearchBar />

          <CategoriesSection />

          <OfferBanner />

          <ProductSection
            title="Popular Products"
            products={products.filter(product => product.featured)}
            showViewAll
          />

        </main>
        <BottomNavigation />
      </div>
    </MobileLayout>
  );
}

export default HomePage;