import { Clock } from "lucide-react";

function ArrivalDetailsCard() {
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
          <Clock
            size={22}
            className="text-[#0F6E8C]"
          />
        </div>

        <div>
          <h2 className="text-lg font-bold">
            Expected Delivery Time
          </h2>

          <p className="text-sm text-slate-500">
            Help us schedule your delivery efficiently.
          </p>
        </div>

      </div>

      <div className="mt-6">

        <label className="mb-2 block text-sm font-medium">
          Required Delivery Before
        </label>

        <input
          type="datetime-local"
          className="
            w-full
            rounded-2xl
            border
            border-slate-300
            px-4
            py-3
            outline-none
            focus:border-[#0F6E8C]
          "
        />

      </div>

    </section>
  );
}

export default ArrivalDetailsCard;