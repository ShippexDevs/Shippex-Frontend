import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getProductById } from "../services/productApi";

import PageHeader from "../components/common/PageHeader";
import AddToCartButton from "../components/product/AddTocartButton";

import { formatPrice } from "../utils/formatPrice";

function ProductDetailsPage() {

  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchProduct = async () => {

      try {

        setLoading(true);
        setError(null);

        const data = await getProductById(id);

        console.log("Mapped product:", data);

        setProduct(data);

      } catch (error) {

        console.error(
          "Failed to fetch product:",
          error
        );

        setError(
          "Unable to load product details."
        );

      } finally {

        setLoading(false);

      }
    };

    fetchProduct();

  }, [id]);


  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F8FA]">

        <p className="text-slate-500">
          Loading product...
        </p>

      </div>
    );
  }


  if (error) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F8FA]">

        <h2 className="text-xl font-semibold">
          {error}
        </h2>

      </div>
    );
  }


  if (!product) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F8FA]">

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


        {/* Product Images */}

<div className="mt-6">

  {product.images?.length > 1 ? (

    <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory rounded-3xl bg-white p-4 shadow-md">

      {product.images.map((image, index) => (

        <div
          key={image}
          className="
            min-w-full
            snap-center
            overflow-hidden
            rounded-2xl
            bg-slate-50
          "
        >

          <img
            src={image}
            alt={`${product.name} ${index + 1}`}
            className="
              h-96
              w-full
              object-contain
              p-6
            "
          />

        </div>

      ))}

    </div>

  ) : product.images?.length === 1 ? (

    <div className="overflow-hidden rounded-3xl bg-white shadow-md">

      <img
        src={product.images[0]}
        alt={product.name}
        className="
          h-96
          w-full
          object-contain
          p-6
        "
      />

    </div>

  ) : (

    <div className="
      flex
      h-96
      items-center
      justify-center
      rounded-3xl
      bg-white
      shadow-md
    ">

      <p className="text-slate-400">
        No image available
      </p>

    </div>

  )}

</div>


        {/* Product Information */}

        <section className="mt-8 space-y-6">

          <div className="flex items-start justify-between gap-4">

            <div>

              {product.brand && (
                <p className="text-sm font-medium text-slate-500">
                  {product.brand}
                </p>
              )}

              <h2 className="mt-1 text-3xl font-bold">
                {product.name}
              </h2>


              <div className="mt-4 flex flex-wrap gap-3">

                <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium">
                  ⭐ {product.rating}
                </span>

                <span className="rounded-full bg-cyan-100 px-3 py-1 text-sm font-medium">
                  {product.unit}
                </span>

              </div>

            </div>


            {/* Price */}

            <div className="text-right">

              <p className="text-3xl font-bold text-[#0A2342]">
                {formatPrice(
                  product.price,
                  product.currency
                )}
              </p>

              {product.originalPrice &&
                product.originalPrice > product.price && (

                <p className="mt-1 text-sm text-slate-400 line-through">
                  {formatPrice(
                    product.originalPrice,
                    product.currency
                  )}
                </p>

              )}

            </div>

          </div>


          {/* Description */}

          {product.description && (

            <div className="rounded-2xl bg-white p-5 shadow-sm">

              <h3 className="mb-3 text-lg font-semibold">
                Description
              </h3>

              <p className="leading-7 text-slate-600">
                {product.description}
              </p>

            </div>

          )}


          {/* Delivery */}

          {product.deliveryTime && (

            <div className="rounded-2xl bg-white p-5 shadow-sm">

              <h3 className="font-semibold">
                Delivery Time
              </h3>

              <p className="mt-2 text-slate-500">
                {product.deliveryTime}
              </p>

            </div>

          )}

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