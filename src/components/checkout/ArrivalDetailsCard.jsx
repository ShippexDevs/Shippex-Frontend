import { CalendarDays, Clock3 } from "lucide-react";

function ArrivalDetailsCard({
  deliveryDetails = {
    estimatedDeliveryDate: "",
    estimatedDeliveryTime: "",
  },
  onChange,
  errors = {},
}) {
  const handleChange = (field, value) => {
    onChange?.({
      ...deliveryDetails,
      [field]: value,
    });
  };

  return (
    <section
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        sm:p-6
      "
    >
      {/* Header */}

      <div className="flex items-start gap-3">
        <div
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-2xl
            bg-[#EAF7F8]
            text-[#087E8B]
          "
        >
          <Clock3 size={20} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-[#102A43]">
            Expected Delivery
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Let us know when your supply should be delivered.
          </p>
        </div>
      </div>

      {/* Date */}

      <div className="mt-6">
        <label
          htmlFor="estimatedDeliveryDate"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Required Delivery Date
        </label>

        <div className="relative">
          <CalendarDays
            size={18}
            className="
              pointer-events-none
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            id="estimatedDeliveryDate"
            type="date"
            value={deliveryDetails.estimatedDeliveryDate || ""}
            onChange={(event) =>
              handleChange(
                "estimatedDeliveryDate",
                event.target.value
              )
            }
            className={`
              w-full
              rounded-2xl
              border
              bg-white
              py-3.5
              pl-11
              pr-4
              text-sm
              text-slate-900
              outline-none
              transition
              ${
                errors.estimatedDeliveryDate
                  ? "border-red-400 focus:border-red-500"
                  : "border-slate-200 focus:border-[#087E8B]"
              }
            `}
          />
        </div>

        {errors.estimatedDeliveryDate && (
          <p className="mt-1.5 text-xs text-red-500">
            {errors.estimatedDeliveryDate}
          </p>
        )}
      </div>

      {/* Time */}

      <div className="mt-5">
        <label
          htmlFor="estimatedDeliveryTime"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Required Delivery Time
        </label>

        <div className="relative">
          <Clock3
            size={18}
            className="
              pointer-events-none
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            id="estimatedDeliveryTime"
            type="time"
            value={deliveryDetails.estimatedDeliveryTime || ""}
            onChange={(event) =>
              handleChange(
                "estimatedDeliveryTime",
                event.target.value
              )
            }
            className={`
              w-full
              rounded-2xl
              border
              bg-white
              py-3.5
              pl-11
              pr-4
              text-sm
              text-slate-900
              outline-none
              transition
              ${
                errors.estimatedDeliveryTime
                  ? "border-red-400 focus:border-red-500"
                  : "border-slate-200 focus:border-[#087E8B]"
              }
            `}
          />
        </div>

        {errors.estimatedDeliveryTime && (
          <p className="mt-1.5 text-xs text-red-500">
            {errors.estimatedDeliveryTime}
          </p>
        )}
      </div>
    </section>
  );
}

export default ArrivalDetailsCard;