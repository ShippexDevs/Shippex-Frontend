import { CalendarClock } from "lucide-react";

function ArrivalDetailsCard({
  deliveryDetails,
  onChange,
}) {
  return (
    <section
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        sm:p-6
      "
    >
      <div className="flex items-start gap-3">

        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-[#EAF7F8]
            text-[#087E8B]
          "
        >
          <CalendarClock size={19} />
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#102A43]">
            Expected Delivery
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            When should the supplies arrive?
          </p>
        </div>

      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Required Delivery Date
          </label>

          <input
            type="date"
            value={deliveryDetails.estimatedDeliveryDate}
            onChange={(e) =>
              onChange(
                "estimatedDeliveryDate",
                e.target.value
              )
            }
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
              text-sm
              outline-none
              focus:border-[#087E8B]
              focus:ring-2
              focus:ring-[#087E8B]/10
            "
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Required Delivery Time
          </label>

          <input
            type="time"
            value={deliveryDetails.estimatedDeliveryTime}
            onChange={(e) =>
              onChange(
                "estimatedDeliveryTime",
                e.target.value
              )
            }
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
              text-sm
              outline-none
              focus:border-[#087E8B]
              focus:ring-2
              focus:ring-[#087E8B]/10
            "
          />
        </div>

      </div>
    </section>
  );
}

export default ArrivalDetailsCard;