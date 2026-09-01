import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import ShipDetailsCard from "../components/checkout/ShipDetailsCard";
import ArrivalDetailsCard from "../components/checkout/ArrivalDetailsCard";
import SpecialInstructionsCard from "../components/checkout/SpecialInstructionsCard";
import OrderSummaryCard from "../components/checkout/OrderSummaryCard";

function CheckoutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F5F8FC]">
      <div
        className="
          mx-auto
          max-w-6xl
          px-4
          py-5
          sm:px-6
          sm:py-7
          lg:px-8
        "
      >
        {/* Header */}
        <div className="mb-6">
          <button
            type="button"
            onClick={() => navigate("/cart")}
            className="
              mb-4
              flex
              items-center
              gap-2
              text-xs
              font-medium
              text-slate-500
              transition
              hover:text-[#0A3568]
            "
          >
            <ArrowLeft size={15} />
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

            <p className="mt-1 text-sm text-slate-500">
              Please confirm the details before submitting.
            </p>
          </div>
        </div>

        {/* Progress */}
        <div
          className="
            mb-5
            hidden
            rounded-xl
            border
            border-[#E3EAF2]
            bg-white
            px-5
            py-4
            sm:block
          "
        >
          <div className="flex items-center justify-between">
            <Step number="1" label="Vessel Details" active completed />
            <Line />
            <Step number="2" label="Schedule" active />
            <Line />
            <Step number="3" label="Instructions" />
            <Line />
            <Step number="4" label="Summary" />
          </div>
        </div>

        {/* Content */}
        <div
          className="
            grid
            grid-cols-1
            gap-5
            lg:grid-cols-[minmax(0,1fr)_280px]
            lg:items-start
          "
        >
          <main className="space-y-4">
            <ShipDetailsCard />
            <ArrivalDetailsCard />
            <SpecialInstructionsCard />
          </main>

          <aside className="lg:sticky lg:top-5">
            <OrderSummaryCard
              onSubmit={() =>
                navigate("/requests/REQ-1001")
              }
            />
          </aside>
        </div>
      </div>
    </div>
  );
}

function Step({
  number,
  label,
  active = false,
  completed = false,
}) {
  return (
    <div className="flex min-w-0 flex-col items-center">
      <div
        className={`
          flex
          h-7
          w-7
          items-center
          justify-center
          rounded-full
          border
          text-[11px]
          font-semibold
          ${
            completed
              ? "border-[#1769D1] bg-[#1769D1] text-white"
              : active
              ? "border-[#1769D1] bg-[#1769D1] text-white"
              : "border-slate-300 bg-white text-slate-500"
          }
        `}
      >
        {completed ? "✓" : number}
      </div>

      <span
        className={`
          mt-1.5
          text-[10px]
          font-medium
          ${
            active || completed
              ? "text-[#173B68]"
              : "text-slate-400"
          }
        `}
      >
        {label}
      </span>
    </div>
  );
}

function Line() {
  return (
    <div className="mx-2 h-px flex-1 bg-[#DCE5EF]" />
  );
}

export default CheckoutPage;