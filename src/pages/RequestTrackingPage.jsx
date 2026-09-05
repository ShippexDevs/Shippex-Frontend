import {
  Check,
  Copy,
  Download,
  Home,
  PackageCheck,
  X,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import { generateInvoice } from "../utils/invoiceGenerator";

function RequestTrackingPage() {
  const { requestId } = useParams();

  const location = useLocation();
  const navigate = useNavigate();

  const [showLeaveModal, setShowLeaveModal] =
    useState(false);

  const [copied, setCopied] = useState(false);

  /*
   * Order comes from CheckoutPage through router state.
   *
   * We ALSO persist it in sessionStorage so that
   * refreshing the tracking page does not destroy it.
   */

  const [order, setOrder] = useState(
    () => {
      if (location.state?.order) {
        return location.state.order;
      }

      try {
        const saved =
          sessionStorage.getItem(
            "shippex_last_order"
          );

        return saved
          ? JSON.parse(saved)
          : null;
      } catch {
        return null;
      }
    }
  );

  /*
   * Save the latest order.
   */

  useEffect(() => {
    if (!location.state?.order) {
      return;
    }

    setOrder(location.state.order);

    sessionStorage.setItem(
      "shippex_last_order",
      JSON.stringify(location.state.order)
    );
  }, [location.state]);

  /*
   * Prevent browser/mobile back navigation.
   *
   * The user should not return to cart or checkout
   * after successfully placing the order.
   */

  useEffect(() => {
    window.history.pushState(
      { shippexOrderPlaced: true },
      "",
      window.location.href
    );

    const handlePopState = () => {
      window.history.pushState(
        { shippexOrderPlaced: true },
        "",
        window.location.href
      );

      setShowLeaveModal(true);
    };

    window.addEventListener(
      "popstate",
      handlePopState
    );

    return () => {
      window.removeEventListener(
        "popstate",
        handlePopState
      );
    };
  }, []);

  const orderNumber =
    order?.orderNumber || requestId;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        orderNumber
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      // Clipboard API may be unavailable.
    }
  };

  const handlePrintInvoice = () => {
    if (!order) {
      return;
    }

    generateInvoice(order);
  };

  const handleGoHome = () => {
    setShowLeaveModal(true);
  };

  const confirmLeave = () => {
    /*
     * Cart was already cleared when the order was
     * successfully created.
     *
     * Replace history so the user cannot return to
     * checkout through browser history.
     */

    navigate("/", {
      replace: true,
    });
  };

  const items = order?.items || [];

  const total =
    order?.totalAmount ??
    items.reduce(
      (sum, item) =>
        sum +
        Number(item.subtotal || 0),
      0
    );

  const currency =
    order?.currency || "USD";

  return (
    <div className="min-h-screen bg-[#F5F8FA]">

      <div
        className="
          mx-auto
          w-full
          max-w-3xl
          px-4
          py-6
          sm:px-6
          sm:py-10
        "
      >
        {/* Success */}

        <div className="text-center">

          <div
            className="
              mx-auto
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-full
              bg-emerald-100
              ring-8
              ring-emerald-50
            "
          >
            <Check
              size={48}
              strokeWidth={3}
              className="text-emerald-600"
            />
          </div>

          <h1
            className="
              mt-7
              text-3xl
              font-bold
              tracking-tight
              text-[#102A43]
              sm:text-4xl
            "
          >
            Supply Request Submitted
          </h1>

          <p
            className="
              mx-auto
              mt-3
              max-w-xl
              text-sm
              leading-6
              text-slate-500
              sm:text-base
            "
          >
            Your supply request has been
            successfully placed. Keep your
            order number for tracking.
          </p>

        </div>

        {/* Order Number */}

        <section
          className="
            mt-9
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-5
            shadow-[0_10px_35px_rgba(15,42,67,0.07)]
            sm:p-6
          "
        >

          <div
            className="
              flex
              items-center
              gap-4
            "
          >

            <div
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-[#EAF7F8]
                text-[#087E8B]
              "
            >
              <PackageCheck size={22} />
            </div>

            <div className="min-w-0">

              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-slate-400
                "
              >
                Order Number
              </p>

              <p
                className="
                  mt-1
                  truncate
                  text-lg
                  font-bold
                  text-[#102A43]
                  sm:text-xl
                "
              >
                {orderNumber}
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="
              mt-5
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-3
              text-sm
              font-medium
              text-slate-700
              transition
              hover:border-[#087E8B]
              hover:bg-[#F4FBFC]
              hover:text-[#087E8B]
            "
          >
            {copied ? (
              <>
                <Check
                  size={17}
                  className="text-emerald-600"
                />
                Copied
              </>
            ) : (
              <>
                <Copy size={17} />
                Copy Order Number
              </>
            )}
          </button>

        </section>

        {/* Order Details */}

        <section
          className="
            mt-5
            overflow-hidden
            rounded-3xl
            border
            border-slate-200
            bg-white
            shadow-[0_10px_35px_rgba(15,42,67,0.07)]
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-slate-100
              px-5
              py-5
              sm:px-6
            "
          >

            <h2
              className="
                text-lg
                font-bold
                text-[#102A43]
              "
            >
              Order Details
            </h2>

            <span
              className="
                rounded-full
                bg-emerald-50
                px-3
                py-1
                text-xs
                font-bold
                uppercase
                tracking-wide
                text-emerald-600
              "
            >
              {order?.status || "PLACED"}
            </span>

          </div>

          <div className="px-5 sm:px-6">

            {items.length > 0 ? (
              <div>

                {items.map((item) => (
                  <div
                    key={item.productId}
                    className="
                      flex
                      items-center
                      gap-4
                      border-b
                      border-slate-100
                      py-5
                    "
                  >

                    <div
                      className="
                        flex
                        h-14
                        w-14
                        shrink-0
                        items-center
                        justify-center
                        overflow-hidden
                        rounded-xl
                        bg-slate-50
                      "
                    >
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="
                            h-full
                            w-full
                            object-contain
                            p-1
                          "
                        />
                      ) : (
                        <PackageCheck
                          size={22}
                          className="text-slate-300"
                        />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">

                      <p
                        className="
                          truncate
                          text-sm
                          font-semibold
                          text-[#102A43]
                        "
                      >
                        {item.name}
                      </p>

                      <p
                        className="
                          mt-1
                          text-xs
                          text-slate-400
                        "
                      >
                        {item.quantity} ×{" "}
                        {formatCurrency(
                          item.unitPrice,
                          currency
                        )}
                      </p>

                    </div>

                    <p
                      className="
                        shrink-0
                        text-sm
                        font-bold
                        text-[#102A43]
                      "
                    >
                      {formatCurrency(
                        item.subtotal,
                        currency
                      )}
                    </p>

                  </div>
                ))}

              </div>
            ) : (
              <p className="py-8 text-sm text-slate-500">
                Order details are unavailable.
              </p>
            )}

            {/* Total */}

            <div
              className="
                flex
                items-center
                justify-between
                py-5
              "
            >

              <span
                className="
                  text-sm
                  font-medium
                  text-slate-500
                "
              >
                Total
              </span>

              <span
                className="
                  text-xl
                  font-bold
                  text-[#102A43]
                "
              >
                {formatCurrency(
                  total,
                  currency
                )}
              </span>

            </div>

          </div>

        </section>

        {/* Invoice */}

        <button
          type="button"
          onClick={handlePrintInvoice}
          disabled={!order}
          className="
            mt-5
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-5
            py-4
            text-sm
            font-semibold
            text-slate-700
            shadow-sm
            transition
            hover:border-[#087E8B]
            hover:bg-[#F4FBFC]
            hover:text-[#087E8B]
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <Download size={18} />
          Print Invoice
        </button>

        {/* Home */}

        <button
          type="button"
          onClick={handleGoHome}
          className="
            mt-3
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-[#102A43]
            px-5
            py-4
            text-sm
            font-semibold
            text-white
            shadow-[0_8px_20px_rgba(16,42,67,0.18)]
            transition
            hover:bg-[#163B5C]
            active:scale-[0.99]
          "
        >
          <Home size={18} />
          Back to Home
        </button>

        <p
          className="
            mt-6
            text-center
            text-xs
            leading-5
            text-slate-400
          "
        >
          Your order has been placed successfully.
          You can safely return to the home page.
        </p>

      </div>

      {/* Leave confirmation modal */}

      {showLeaveModal && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-slate-950/45
            px-4
            backdrop-blur-sm
          "
          onClick={() =>
            setShowLeaveModal(false)
          }
        >

          <div
            role="dialog"
            aria-modal="true"
            className="
              w-full
              max-w-md
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-6
              shadow-2xl
              sm:p-7
            "
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="flex items-start justify-between">

              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-2xl
                  bg-amber-50
                  text-amber-600
                "
              >
                <Home size={20} />
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowLeaveModal(false)
                }
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  text-slate-400
                  transition
                  hover:bg-slate-100
                  hover:text-slate-700
                "
              >
                <X size={18} />
              </button>

            </div>

            <h2
              className="
                mt-5
                text-xl
                font-bold
                text-[#102A43]
              "
            >
              Leave this request?
            </h2>

            <p
              className="
                mt-2
                text-sm
                leading-6
                text-slate-500
              "
            >
              Your supply request has already
              been placed successfully. You
              won't be able to return to the
              cart or review the request again.
            </p>

            <div
              className="
                mt-6
                grid
                grid-cols-2
                gap-3
              "
            >

              <button
                type="button"
                onClick={() =>
                  setShowLeaveModal(false)
                }
                className="
                  rounded-xl
                  border
                  border-slate-200
                  px-4
                  py-3
                  text-sm
                  font-semibold
                  text-slate-700
                  transition
                  hover:bg-slate-50
                "
              >
                Stay Here
              </button>

              <button
                type="button"
                onClick={confirmLeave}
                className="
                  rounded-xl
                  bg-[#102A43]
                  px-4
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-[#163B5C]
                "
              >
                Go to Home
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

function formatCurrency(
  amount = 0,
  currency = "USD"
) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(Number(amount) || 0);
}

export default RequestTrackingPage;