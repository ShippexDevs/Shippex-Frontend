import ProductGrid from "./ProductGrid";
import SectionHeader from "../common/SectionHeader";

function ProductSection({
  title,
  products,
  showViewAll = false,
  showHeader = true,
}) {
  return (
    <section className="space-y-5">
      {showHeader && (
        <SectionHeader
          title={title}
          showViewAll={showViewAll}
        />
      )}

      <ProductGrid products={products} />
    </section>
  );
}

export default ProductSection;