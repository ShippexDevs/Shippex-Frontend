import { MessageSquareText } from "lucide-react";

function SpecialInstructionsCard() {
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
          <MessageSquareText
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
            Delivery Instructions

            <span className="
              ml-1.5
              text-xs
              font-normal
              text-slate-400
            ">
              Optional
            </span>
          </h2>

          <p className="mt-0.5 text-xs text-slate-400">
            Add anything our delivery team should know.
          </p>
        </div>

      </div>

      <div className="relative mt-5">

        <textarea
          rows={5}
          maxLength={250}
          placeholder="Example: Deliver to the starboard gangway. Contact the Chief Officer on arrival."
          className="
            w-full
            resize-none
            rounded-xl
            border
            border-slate-200
            bg-[#FAFCFD]
            px-4
            py-3
            text-sm
            leading-6
            text-[#102A43]
            outline-none
            placeholder:text-slate-400
            transition
            focus:border-[#087E8B]
            focus:ring-2
            focus:ring-[#087E8B]/10
          "
        />

        <span className="
          absolute
          bottom-3
          right-3
          text-[10px]
          text-slate-400
        ">
          0/250
        </span>

      </div>

    </section>
  );
}

export default SpecialInstructionsCard;