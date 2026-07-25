import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../components/common/PageHeader";
import ShipDetailsCard from "../components/checkout/ShipDetailsCard";
import ArrivalDetailsCard from "../components/checkout/ArrivalDetailsCard";
import SpecialInstructionsCard from "../components/checkout/SpecialInstructionsCard";
import OrderSummaryCard from "../components/checkout/OrderSummaryCard";
import StickyActionBar from "../components/common/StickyActionbar";

import { useCart } from "../context/CartContext";

function CheckoutPage() {
  const { subtotal } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F5F8FA]">

      <div className="mx-auto max-w-5xl px-5 py-6 pb-40">

        <PageHeader
          title="Review Supply Request"
          subtitle="Review your request before submitting."
        />

        <div className="mt-8">
          <ShipDetailsCard />
        </div>

        <div className="mt-6">
          <ArrivalDetailsCard />
        </div>

        <div className="mt-6">
          <SpecialInstructionsCard />
        </div>

        <div className="mt-6">
          <OrderSummaryCard />
        </div>

      </div>

      <StickyActionBar
        total={subtotal}
        currency="USD"
        buttonText="Submit Supply Request"
        buttonIcon={ArrowRight}
        onClick={() => navigate("/requests/REQ-1001")}
      />

    </div>
  );
}

export default CheckoutPage;