import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ShipDetailsCard from "../components/checkout/ShipDetailsCard";
import ArrivalDetailsCard from "../components/checkout/ArrivalDetailsCard";
import SpecialInstructionsCard from "../components/checkout/SpecialInstructionsCard";
import OrderSummaryCard from "../components/checkout/OrderSummaryCard";
import StickyActionBar from "../components/common/StickyActionbar";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { createOrder } from "../api/orderApi.js";

function CheckoutPage() {
  const navigate = useNavigate();

  const { user, loading: authLoading } = useAuth();

  const {
    cartItems,
    subtotal,
    clearCart,
  } = useCart();

  const [deliveryDestination, setDeliveryDestination] =
    useState({
      shipName: "",
      imoNumber: "",
      berthNumber: "",
      portName: "",
    });

  const [deliveryDetails, setDeliveryDetails] =
    useState({
      estimatedDeliveryDate: "",
      estimatedDeliveryTime: "",
    });

  const [instructions, setInstructions] =
    useState({
      deliveryInstructions: "",
      orderInstructions: "",
    });

  const [errors, setErrors] = useState({});

  const [submitting, setSubmitting] = useState(false);

  /*
   * Prefill ship details from registered user profile.
   * User can still edit them afterwards.
   */
  useEffect(() => {
    if (!user) {
      return;
    }

    setDeliveryDestination((current) => ({
      ...current,

      shipName:
        current.shipName ||
        user.shipName ||
        "",

      imoNumber:
        current.imoNumber ||
        user.shipIMONumber ||
        "",
    }));
  }, [user]);

  const validateForm = () => {
    const newErrors = {};

    if (!deliveryDestination.shipName.trim()) {
      newErrors.shipName = "Ship name is required.";
    }

    if (!/^\d{7}$/.test(
      deliveryDestination.imoNumber.trim()
    )) {
      newErrors.imoNumber =
        "IMO number must contain exactly 7 numeric digits.";
    }

    if (!deliveryDestination.berthNumber.trim()) {
      newErrors.berthNumber =
        "Berth number is required.";
    }

    if (!deliveryDestination.portName.trim()) {
      newErrors.portName =
        "Port name is required.";
    }

    if (!deliveryDetails.estimatedDeliveryDate) {
      newErrors.estimatedDeliveryDate =
        "Delivery date is required.";
    }

    if (!deliveryDetails.estimatedDeliveryTime) {
      newErrors.estimatedDeliveryTime =
        "Delivery time is required.";
    }

    if (!instructions.deliveryInstructions.trim()) {
      newErrors.deliveryInstructions =
        "Delivery instructions are required.";
    }

    if (!instructions.orderInstructions.trim()) {
      newErrors.orderInstructions =
        "Order instructions are required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }

  const orderRequest = {
    items: cartItems.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    })),

    deliveryDestination: {
      shipName: deliveryDestination.shipName.trim(),
      imoNumber: deliveryDestination.imoNumber.trim(),
      berthNumber: deliveryDestination.berthNumber.trim(),
      portName: deliveryDestination.portName.trim(),
    },

    estimatedDeliveryDate:
      deliveryDetails.estimatedDeliveryDate,

    estimatedDeliveryTime:
      deliveryDetails.estimatedDeliveryTime,

    deliveryInstructions:
      instructions.deliveryInstructions.trim(),

    orderInstructions:
      instructions.orderInstructions.trim(),

    paymentMethod: "CASH_ON_DELIVERY",
  };

  try {
    const token =
      localStorage.getItem("shippex_token");

    const response = await fetch(
      "http://localhost:8080/api/v1/orders",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(orderRequest),
      }
    );

    if (!response.ok) {
      let message = "Unable to place order.";

      try {
        const errorBody =
          await response.json();

        message =
          errorBody.message ||
          errorBody.error ||
          message;
      } catch {
        // Backend returned non-JSON response.
      }

      throw new Error(message);
    }

    const responseBody =
      await response.json();

    /*
     * Backend structure:
     *
     * {
     *   success: true,
     *   message: "...",
     *   data: {
     *     id: "...",
     *     orderNumber: "ORD-...",
     *     ...
     *   }
     * }
     */

    const createdOrder =
      responseBody.data;

    if (!createdOrder?.orderNumber) {
      throw new Error(
        "Order was created but no order number was returned."
      );
    }

    /*
     * Save the complete backend response so
     * RequestTrackingPage can display the actual
     * submitted order and generate the invoice.
     */

    sessionStorage.setItem(
      "shippex_last_order",
      JSON.stringify(createdOrder)
    );

    /*
     * IMPORTANT:
     * Clear the cart only AFTER the backend confirms
     * the order was successfully created.
     */

    clearCart();

    /*
     * Navigate using the REAL order number.
     */

    navigate(
      `/requests/${createdOrder.orderNumber}`,
      {
        replace: true,
        state: {
          order: createdOrder,
        },
      }
    );

  } catch (error) {
    console.error(
      "Failed to submit supply request:",
      error
    );

    setErrors((current) => ({
      ...current,
      submit:
        error.message ||
        "Unable to submit supply request.",
    }));
  }
};

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F6F9FB]">
        <p className="text-sm text-slate-500">
          Loading request details...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F9FB]">

      <div
        className="
          mx-auto
          max-w-6xl
          px-4
          py-5
          pb-32
          sm:px-6
          sm:py-8
          lg:px-8
          lg:pb-10
        "
      >

        {/* Header */}

        <div className="mb-7">

          <button
            type="button"
            onClick={() => navigate("/cart")}
            className="
              mb-5
              flex
              items-center
              gap-2
              text-sm
              font-medium
              text-slate-500
              transition
              hover:text-[#087E8B]
            "
          >
            <ArrowLeft size={17} />
            Back to cart
          </button>

          <div>
            <h1
              className="
                text-2xl
                font-bold
                tracking-tight
                text-[#102A43]
                sm:text-3xl
              "
            >
              Review Supply Request
            </h1>

            <p className="mt-1.5 text-sm text-slate-500">
              Confirm the delivery details before submitting.
            </p>
          </div>

        </div>

        {/* Submission Error */}

        {errors.submit && (
          <div
            className="
              mb-6
              rounded-2xl
              border
              border-red-200
              bg-red-50
              px-4
              py-3
              text-sm
              text-red-600
            "
          >
            {errors.submit}
          </div>
        )}

        {/* Main Layout */}

        <div
          className="
            grid
            grid-cols-1
            gap-6
            lg:grid-cols-[minmax(0,1fr)_340px]
            lg:items-start
          "
        >

          <main className="space-y-4">

            <ShipDetailsCard
              deliveryDestination={deliveryDestination}
              onChange={setDeliveryDestination}
              errors={errors}
            />

            <ArrivalDetailsCard
              deliveryDetails={deliveryDetails}
              onChange={setDeliveryDetails}
              errors={errors}
            />

            <SpecialInstructionsCard
              instructions={instructions}
              onChange={setInstructions}
              errors={errors}
            />

          </main>

          <aside className="hidden lg:block">
            <OrderSummaryCard />
          </aside>

        </div>

      </div>

      <StickyActionBar
        total={subtotal}
        currency="USD"
        buttonText={
          submitting
            ? "Submitting..."
            : "Submit Supply Request"
        }
        buttonIcon={ArrowRight}
        onClick={handleSubmit}
        loading={submitting}
        disabled={submitting}
      />

    </div>
  );
}

export default CheckoutPage;