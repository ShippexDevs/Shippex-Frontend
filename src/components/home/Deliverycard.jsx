import { Ship, Clock } from "lucide-react";

function DeliveryCard() {
  return (
    <div className="rounded-3xl bg-gradient-to-r from-[#0F6E8C] to-[#0A2342] p-5 text-white shadow-xl">

      <div className="flex justify-between">

        <div>

          <p className="text-cyan-200 text-sm">
            Delivering To
          </p>

          <h2 className="text-xl font-bold mt-1">
            MV Ocean Star
          </h2>

          <span className="inline-block mt-3 rounded-full bg-white/20 px-3 py-1 text-sm">
            Oceanview Port
          </span>

        </div>

        <Ship size={48} />

      </div>

      <div className="mt-6 flex items-center gap-2">

        <Clock size={18} />

        <span>
          ETA • 25-35 mins
        </span>

      </div>

    </div>
  );
}

export default DeliveryCard;