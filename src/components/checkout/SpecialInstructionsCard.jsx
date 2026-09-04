import { FileText } from "lucide-react";

function SpecialInstructionsCard({
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
          <FileText size={19} />
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#102A43]">
            Instructions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Add instructions related to delivery and handling.
          </p>
        </div>

      </div>

      <div className="mt-6 space-y-5">

        {/* Delivery Instructions */}
        <div>

          <label className="mb-2 block text-sm font-medium text-slate-700">
            Delivery Instructions
          </label>

          <textarea
            rows={3}
            value={deliveryDetails.deliveryInstructions}
            onChange={(e) =>
              onChange(
                "deliveryInstructions",
                e.target.value
              )
            }
            placeholder="Example: Call before arrival."
            className="
              w-full
              resize-none
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
              text-sm
              outline-none
              transition
              placeholder:text-slate-400
              focus:border-[#087E8B]
              focus:ring-2
              focus:ring-[#087E8B]/10
            "
          />

        </div>

        {/* Order Instructions */}
        <div>

          <label className="mb-2 block text-sm font-medium text-slate-700">
            Order Instructions
          </label>

          <textarea
            rows={3}
            value={deliveryDetails.orderInstructions}
            onChange={(e) =>
              onChange(
                "orderInstructions",
                e.target.value
              )
            }
            placeholder="Example: Keep items dry."
            className="
              w-full
              resize-none
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
              text-sm
              outline-none
              transition
              placeholder:text-slate-400
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

export default SpecialInstructionsCard;