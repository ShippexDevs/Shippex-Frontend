import ProductCard from "./ProductCard";

function ProductGrid({ products }) {

  return (
    <div
      className="
        flex
        gap-4
        overflow-x-auto
        pb-2
        scrollbar-hide
      "
    >

      {products.map((product) => (
        <div
          key={product.id}
          className="w-[150px] shrink-0"
        >
          <ProductCard product={product} />
        </div>
      ))}

    </div>
  );
}

export default ProductGrid;