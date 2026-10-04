import { useNavigate } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/formatPrice";
import QuantitySelector from "../product/QuantitySelector";
import toast from "react-hot-toast";
import { motion, useReducedMotion } from "framer-motion";

function ProductCard({ product }) {

  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  const {
    addToCart,
    updateQuantity,
    cartItems,
    isProductInCart,
  } = useCart();

  const cartItem = cartItems.find(
    (item) => item.id === product.id
  );

  const quantity = cartItem?.quantity ?? 0;

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddClick = (event) => {

    event.stopPropagation();

    const alreadyInCart =
      isProductInCart(product.id);

    addToCart(product, 1);

    if (!alreadyInCart) {

      toast.success(
        `${product.name} added to cart`
      );

    }
  };

  return (
    <motion.div
      onClick={handleCardClick}
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      whileHover={reduceMotion ? undefined : { y: -4, scale: 1.012 }}
      whileTap={reduceMotion ? undefined : { scale: 0.985 }}
      transition={{ type: "spring", stiffness: 340, damping: 25, duration: 0.35 }}
      className="
        min-w-[140px]
        cursor-pointer
        rounded-2xl
        bg-white
        p-3
        shadow-sm
        transition-all
        duration-300
        hover:shadow-md
      "
    >

      {/* Product Image */}

      <div className="relative flex justify-center">

        <div
          className="
            flex
            h-32
            w-full
            items-center
            justify-center
            rounded-xl
            border
            border-slate-200
            bg-white
          "
        >

          <motion.img
            src={product.image}
            alt={product.name}
            whileHover={reduceMotion ? undefined : { scale: 1.07, rotate: 1.5 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="
              h-28
              w-28
              object-contain
              transition-transform
              duration-300
              hover:scale-105
            "
          />

        </div>

        {/* Add Button */}

        {quantity === 0 ? (

          <button
            onClick={handleAddClick}
            className="
              absolute
              bottom-1
              right-1
              rounded-lg
              border
              border-pink-500
              bg-white
              px-3
              py-1
              text-xs
              font-bold
              text-pink-500
              transition
              hover:bg-pink-50
              active:scale-95
            "
          >
            ADD
          </button>

        ) : (

          <div className="absolute bottom-1 right-1">

            <QuantitySelector
              quantity={quantity}
              onIncrease={() =>
                updateQuantity(
                  product.id,
                  quantity + 1
                )
              }
              onDecrease={() =>
                updateQuantity(
                  product.id,
                  quantity - 1
                )
              }
            />

          </div>

        )}

      </div>

      {/* Price */}

      <div className="mt-3">

        <div className="flex items-center gap-2">

          <p className="text-base font-bold text-[#0A2342]">
            {formatPrice(
              product.price,
              product.currency
            )}
          </p>

          {product.originalPrice && (
            <p className="text-xs text-slate-400 line-through">
              {formatPrice(
                product.originalPrice,
                product.currency
              )}
            </p>
          )}

        </div>

      </div>

      {/* Product Name */}

      <h3
        className="
          mt-2
          line-clamp-2
          text-sm
          font-semibold
          text-slate-800
        "
      >
        {product.name}
      </h3>

      {/* Brand */}

      {product.brand && (
        <p className="mt-1 text-xs text-slate-500">
          {product.brand}
        </p>
      )}

      {/* Unit */}

      <p className="mt-1 text-xs text-slate-500">
        {product.unit}
      </p>

    </motion.div>
  );
}

export default ProductCard;
