import { useParams } from "react-router-dom";

import { products } from "../data/products";

import PageHeader from "../components/common/PageHeader";
import AddToCartButton from "../components/product/AddToCartButton";

import { formatPrice } from "../utils/formatPrice";

function ProductDetailsPage() {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id === id
  );

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-semibold">
          Product not found
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F8FA]">

      <div className="mx-auto max-w-5xl px-5 py-6 pb-40">

        <PageHeader
          title={product.name}
          subtitle={product.category}
        />

        {/* Product Image */}

        <div className="overflow-hidden rounded-3xl bg-white shadow-md">

          <img
            src={product.image}
            alt={product.name}
            className="h-96 w-full object-cover"
          />

        </div>

        {/* Product Information */}

        <section className="mt-8 space-y-6">

          <div className="flex items-start justify-between gap-4">

            <div>

              <h2 className="text-3xl font-bold">
                {product.name}
              </h2>

              <div className="mt-4 flex gap-3">

                <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium">
                  ⭐ {product.rating}
                </span>

                <span className="rounded-full bg-cyan-100 px-3 py-1 text-sm font-medium">
                  {product.unit}
                </span>

              </div>

            </div>

            <span className="text-3xl font-bold text-[#0A2342]">
              {formatPrice(
                product.price,
                product.currency
              )}
            </span>

          </div>

          {/* Description */}

          <div className="rounded-2xl bg-white p-5 shadow-sm">

            <h3 className="mb-3 text-lg font-semibold">
              Description
            </h3>

            <p className="leading-7 text-slate-600">
              {product.description}
            </p>

          </div>

          {/* Delivery */}

          <div className="rounded-2xl bg-white p-5 shadow-sm">

            <h3 className="font-semibold">
              Delivery Time
            </h3>

            <p className="mt-2 text-slate-500">
              {product.deliveryTime}
            </p>

          </div>

        </section>

      </div>

      {/* Sticky Footer */}

      <div
        className="
          fixed
          bottom-0
          left-0
          right-0
          z-50
          border-t
          border-slate-200
          bg-white/95
          backdrop-blur-xl
          shadow-[0_-8px_25px_rgba(0,0,0,0.08)]
        "
      >

        <div className="mx-auto max-w-5xl px-5 py-4">

          <AddToCartButton
            product={product}
          />

        </div>

      </div>

    </div>
  );
}

export default ProductDetailsPage;