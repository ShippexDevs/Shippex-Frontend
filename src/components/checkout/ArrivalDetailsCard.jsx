import { CalendarDays } from "lucide-react";

function ArrivalDetailsCard() {
  return (
    <section className="
      rounded-2xl
      border
      border-slate-200
      bg-white
      p-5
      sm:p-6
    ">

      <div className="flex items-start gap-3">

        <div className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-[#EAF7F8]
        ">
          <CalendarDays
            size={19}
            className="text-[#087E8B]"
          />
        </div>

        <div>
          <h2 className="
            text-base
            font-bold
            text-[#102A43]
          ">
            Expected Delivery
          </h2>

          <p className="mt-0.5 text-xs text-slate-400">
            Let us know when the supplies are required.
          </p>
        </div>

      </div>

      <div className="mt-5">

        <label className="
          mb-2
          block
          text-xs
          font-semibold
          text-slate-600
        ">
          Required Delivery Before
        </label>

        <div className="relative">

          <input
            type="datetime-local"
            className="
              w-full
              appearance-none
              rounded-xl
              border
              border-slate-200
              bg-[#FAFCFD]
              px-4
              py-3
              text-sm
              text-[#102A43]
              outline-none
              transition
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