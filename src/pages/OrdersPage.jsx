import {
  ClipboardList,
  Package,
  ChevronRight,
} from "lucide-react";

import MobileLayout from "../layouts/MobileLayout";

function OrdersPage() {
  return (
    <MobileLayout>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">

        <div className="mb-7">

          <p className="text-sm font-medium text-[#087E8B]">
            Shippex
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#102A43] sm:text-3xl">
            My Orders
          </h1>

          <p className="mt-1.5 text-sm text-slate-500">
            Track your supply requests and orders.
          </p>

        </div>

        <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-[0_2px_8px_rgba(15,23,42,0.04)]">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
            <ClipboardList size={26} />
          </div>

          <h2 className="mt-5 text-lg font-bold text-slate-800">
            No orders yet
          </h2>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
            Your submitted supply requests will appear here.
          </p>

        </section>

      </div>

    </MobileLayout>
  );
}

export default OrdersPage;