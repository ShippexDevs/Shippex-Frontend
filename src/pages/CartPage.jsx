import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../components/common/PageHeader";
import EmptyCart from "../components/cart/EmptyCart";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import StickyActionBar from "../components/common/StickyActionBar";

import { useCart } from "../context/CartContext";

function CartPage() {
  const navigate = useNavigate();

  const {
    cartItems,
    subtotal,
    updateQuantity,
    removeFromCart,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#F5F8FA]">
        <div className="mx-auto max-w-5xl px-5 py-6">
          <PageHeader
            title="My Cart"
            subtitle="Your shopping cart is empty"
          />

          <EmptyCart />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F8FA]">

      <div className="mx-auto max-w-5xl px-5 py-6 pb-40">

        <PageHeader
          title="My Cart"
          subtitle={`${cartItems.length} item(s)`}
        />

        <div className="space-y-5">

          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={() =>
                updateQuantity(
                  item.id,
                  item.quantity + 1
                )
              }
              onDecrease={() =>
                updateQuantity(
                  item.id,
                  item.quantity - 1
                )
              }
              onRemove={() =>
                removeFromCart(item.id)
              }
            />
          ))}

        </div>

        <div className="mt-8">
          <CartSummary
            subtotal={subtotal}
            currency="USD"
          />
        </div>

      </div>

      <StickyActionBar
        total={subtotal}
        currency="USD"
        buttonText="Submit Request"
        buttonIcon={ArrowRight}
        onClick={() => navigate("/checkout")}
      />

    </div>
  );
}

export default CartPage;