import { FileText } from "lucide-react";

function SpecialInstructionsCard() {
  return (
    <section
      className="
        mt-6
        rounded-3xl
        bg-white
        p-6
        shadow-md
      "
    >
      <div className="flex items-center gap-3">

        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-cyan-100
          "
        >
          <FileText
            size={22}
            className="text-[#0F6E8C]"
          />
        </div>

        <div>
          <h2 className="text-lg font-bold">
            Delivery Instructions
          </h2>

          <p className="text-sm text-slate-500">
            Add any instructions for our delivery executive.
          </p>
        </div>

      </div>

      <textarea
        rows={5}
        placeholder="Example: Deliver to the starboard gangway. Contact the Chief Officer on arrival."
        className="
          mt-6
          w-full
          resize-none
          rounded-2xl
          border
          border-slate-300
          px-4
          py-3
          outline-none
          focus:border-[#0F6E8C]
        "
      />
    </section>
  );
}

export default SpecialInstructionsCard;