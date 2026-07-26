import { useNavigate } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/formatPrice";
import QuantitySelector from "../product/QuantitySelector";
import toast from "react-hot-toast";

function ProductCard({ product }) {
  const navigate = useNavigate();

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
    <div
      onClick={handleCardClick}
      className="
        cursor-pointer
        rounded-3xl
        bg-white
        p-3
        shadow-md
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      {/* Rating */}
      <div className="flex justify-end">
        <span
          className="
            rounded-full
            bg-yellow-100
            px-2
            py-1
            text-xs
            font-semibold
          "
        >
          ⭐ {product.rating}
        </span>
      </div>

      {/* Product Image */}
      <div className="mt-2 flex justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="
            h-32
            w-32
            object-contain
            transition-transform
            duration-300
            hover:scale-105
          "
        />
      </div>

      {/* Product Info */}
      <div className="mt-5">
        <p className="text-xs text-slate-500">
          {product.category}
        </p>

        <h3
          className="
            mt-1
            line-clamp-2
            text-base
            font-bold
          "
        >
          {product.name}
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          {product.unit}
        </p>
      </div>

      {/* Price */}
      <div className="mt-5 flex items-center justify-between">
        <div>
          <p className="text-lg font-bold text-[#0A2342]">
            {formatPrice(
              product.price,
              product.currency
            )}
          </p>
        </div>

        {quantity === 0 ? (
          <button
            onClick={handleAddClick}
            className="
              rounded-xl
              bg-[#0A2342]
              px-4
              py-2
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-[#133B63]
              active:scale-95
            "
          >
            + Add
          </button>
        ) : (
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
        )}
      </div>
    </div>
  );
}

export default ProductCard;