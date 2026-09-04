import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import ShipDetailsCard from "../components/checkout/ShipDetailsCard";
import ArrivalDetailsCard from "../components/checkout/ArrivalDetailsCard";
import SpecialInstructionsCard from "../components/checkout/SpecialInstructionsCard";
import OrderSummaryCard from "../components/checkout/OrderSummaryCard";
import StickyActionBar from "../components/common/StickyActionbar";

import { useCart } from "../context/CartContext";
import { currentShip } from "../data/currentShip";

function CheckoutPage() {
  const navigate = useNavigate();

  const { cartItems, subtotal } = useCart();

  const [deliveryDestination, setDeliveryDestination] =
    useState({
      shipName: currentShip?.shipName || "",
      imoNumber: currentShip?.imoNumber || "",
      berthNumber: currentShip?.berthNumber || "",
      portName: currentShip?.portName || "",
    });

  const [deliveryDetails, setDeliveryDetails] =
    useState({
      estimatedDeliveryDate: "",
      estimatedDeliveryTime: "",
      deliveryInstructions: "",
      orderInstructions: "",
    });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /*
   * Update ship / destination fields
   */
  const handleDestinationChange = (field, value) => {
    setDeliveryDestination((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  /*
   * Update delivery fields
   */
  const handleDeliveryDetailsChange = (
    field,
    value
  ) => {
    setDeliveryDetails((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  /*
   * Create order
   */
  const handleSubmitOrder = async () => {
    setError("");

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    const token =
      localStorage.getItem("shippex_token");

    if (!token) {
      setError(
        "Your session has expired. Please log in again."
      );

      navigate("/login");
      return;
    }

    /*
     * Validate required destination fields
     */
    if (
      !deliveryDestination.shipName.trim() ||
      !deliveryDestination.imoNumber.trim() ||
      !deliveryDestination.berthNumber.trim() ||
      !deliveryDestination.portName.trim()
    ) {
      setError(
        "Please complete all delivery destination fields."
      );
      return;
    }

    /*
     * Validate delivery date/time
     */
    if (
      !deliveryDetails.estimatedDeliveryDate ||
      !deliveryDetails.estimatedDeliveryTime
    ) {
      setError(
        "Please select the expected delivery date and time."
      );
      return;
    }

    /*
     * Build backend request
     */
    const orderRequest = {
      items: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),

      deliveryDestination: {
        shipName:
          deliveryDestination.shipName.trim(),

        imoNumber:
          deliveryDestination.imoNumber.trim(),

        berthNumber:
          deliveryDestination.berthNumber.trim(),

        portName:
          deliveryDestination.portName.trim(),
      },

      estimatedDeliveryDate:
        deliveryDetails.estimatedDeliveryDate,

      estimatedDeliveryTime:
        deliveryDetails.estimatedDeliveryTime,

      deliveryInstructions:
        deliveryDetails.deliveryInstructions.trim(),

      orderInstructions:
        deliveryDetails.orderInstructions.trim(),

      paymentMethod: "CASH_ON_DELIVERY",
    };

    console.log(
      "Submitting order:",
      orderRequest
    );

    try {
      setLoading(true);

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

      const responseText =
        await response.text();

      console.log(
        "Create order status:",
        response.status
      );

      console.log(
        "Create order response:",
        responseText
      );

      if (!response.ok) {
        let message =
          "Failed to create supply request.";

        try {
          const errorData =
            JSON.parse(responseText);

          message =
            errorData.message ||
            errorData.error ||
            message;
        } catch {
          if (responseText) {
            message = responseText;
          }
        }

        throw new Error(message);
      }

      /*
       * Parse backend response
       */
      let responseData = null;

      if (responseText) {
        try {
          responseData =
            JSON.parse(responseText);
        } catch {
          responseData = null;
        }
      }

      console.log(
        "Order created:",
        responseData
      );

      /*
       * Try to find the created order ID.
       *
       * This supports common response structures:
       *
       * {
       *   "id": "..."
       * }
       *
       * {
       *   "orderId": "..."
       * }
       *
       * {
       *   "data": {
       *      "id": "..."
       *   }
       * }
       */
      const orderId =
        responseData?.id ||
        responseData?.orderId ||
        responseData?.data?.id ||
        responseData?.data?.orderId;

      if (orderId) {
        navigate(`/requests/${orderId}`);
      } else {
        /*
         * Don't invent an order ID.
         *
         * If your backend doesn't return one,
         * navigate to the requests page.
         */
        navigate("/requests");
      }
    } catch (err) {
      console.error(
        "Create order failed:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to create supply request."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F9FB]">

      <div
        className="
          mx-auto
          max-w-6xl
          px-4
          py-5
          pb-28
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

          <div
            className="
              flex
              items-start
              justify-between
              gap-4
            "
          >

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

              <p
                className="
                  mt-1.5
                  text-sm
                  text-slate-500
                "
              >
                Confirm the delivery details
                before submitting.
              </p>

            </div>

            <div
              className="
                hidden
                items-center
                gap-2
                rounded-full
                bg-[#EAF7F8]
                px-3
                py-1.5
                text-xs
                font-medium
                text-[#087E8B]
                sm:flex
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#087E8B]
                "
              />

              Secure request
            </div>

          </div>

        </div>

        {/* Error */}

        {error && (
          <div
            className="
              mb-6
              rounded-xl
              border
              border-red-200
              bg-red-50
              px-4
              py-3
              text-sm
              text-red-700
            "
          >
            {error}
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

          {/* Left */}

          <main className="space-y-4">

            <ShipDetailsCard
              deliveryDestination={
                deliveryDestination
              }
              onChange={
                handleDestinationChange
              }
            />

            <ArrivalDetailsCard
              deliveryDetails={
                deliveryDetails
              }
              onChange={
                handleDeliveryDetailsChange
              }
            />

            <SpecialInstructionsCard
              deliveryDetails={
                deliveryDetails
              }
              onChange={
                handleDeliveryDetailsChange
              }
            />

            {/* Order summary on mobile */}

            <div className="lg:hidden">
              <OrderSummaryCard />
            </div>

          </main>

          {/* Desktop summary */}

          <aside
            className="
              hidden
              lg:block
              lg:sticky
              lg:top-6
            "
          >

            <OrderSummaryCard />

            {/* SINGLE desktop submit button */}

            <button
              type="button"
              onClick={handleSubmitOrder}
              disabled={loading}
              className="
                mt-4
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#0A2342]
                px-5
                py-3.5
                text-sm
                font-semibold
                text-white
                shadow-sm
                transition
                hover:bg-[#123B68]
                active:scale-[0.99]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {loading
                ? "Submitting..."
                : "Submit Supply Request"}

              {!loading && (
                <ArrowRight size={18} />
              )}
            </button>

          </aside>

        </div>

      </div>

      {/* SINGLE mobile submit button */}

      <div className="lg:hidden">

        <StickyActionBar
          total={subtotal}
          currency="USD"
          buttonText={
            loading
              ? "Submitting..."
              : "Submit Supply Request"
          }
          buttonIcon={ArrowRight}
          onClick={handleSubmitOrder}
          loading={loading}
          disabled={loading}
        />

      </div>

    </div>
  );
}

export default CheckoutPage;