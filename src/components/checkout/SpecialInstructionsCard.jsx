import { FileText, ClipboardList } from "lucide-react";

function SpecialInstructionsCard({
  instructions = {
    deliveryInstructions: "",
    orderInstructions: "",
  },
  onChange,
  errors = {},
}) {
  const handleChange = (field, value) => {
    onChange?.({
      ...instructions,
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
          <FileText size={20} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-[#102A43]">
            Instructions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Add instructions to help us prepare and deliver your order.
          </p>
        </div>
      </div>

      {/* Delivery Instructions */}

      <div className="mt-6">
        <label
          htmlFor="deliveryInstructions"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Delivery Instructions
        </label>

        <div className="relative">
          <FileText
            size={18}
            className="
              pointer-events-none
              absolute
              left-4
              top-4
              text-slate-400
            "
          />

          <textarea
            id="deliveryInstructions"
            value={instructions.deliveryInstructions || ""}
            onChange={(event) =>
              handleChange(
                "deliveryInstructions",
                event.target.value
              )
            }
            rows={4}
            placeholder="Example: Call before arrival and deliver to the starboard gangway."
            className={`
              w-full
              resize-none
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
              placeholder:text-slate-400
              ${
                errors.deliveryInstructions
                  ? "border-red-400 focus:border-red-500"
                  : "border-slate-200 focus:border-[#087E8B]"
              }
            `}
          />
        </div>

        {errors.deliveryInstructions && (
          <p className="mt-1.5 text-xs text-red-500">
            {errors.deliveryInstructions}
          </p>
        )}
      </div>

      {/* Order Instructions */}

      <div className="mt-5">
        <label
          htmlFor="orderInstructions"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Order Instructions
        </label>

        <div className="relative">
          <ClipboardList
            size={18}
            className="
              pointer-events-none
              absolute
              left-4
              top-4
              text-slate-400
            "
          />

          <textarea
            id="orderInstructions"
            value={instructions.orderInstructions || ""}
            onChange={(event) =>
              handleChange(
                "orderInstructions",
                event.target.value
              )
            }
            rows={4}
            placeholder="Example: Keep all items dry and properly packed."
            className={`
              w-full
              resize-none
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
              placeholder:text-slate-400
              ${
                errors.orderInstructions
                  ? "border-red-400 focus:border-red-500"
                  : "border-slate-200 focus:border-[#087E8B]"
              }
            `}
          />
        </div>

        {errors.orderInstructions && (
          <p className="mt-1.5 text-xs text-red-500">
            {errors.orderInstructions}
          </p>
        )}
      </div>
    </section>
  );
}

export default SpecialInstructionsCard;