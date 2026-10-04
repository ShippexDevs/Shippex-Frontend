import { Ship, Clock } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

function DeliveryCard() {
  const reduceMotion = useReducedMotion();
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

        <motion.span whileHover={reduceMotion ? undefined : { y: -3, rotate: -4 }} transition={{ type: "spring", stiffness: 320, damping: 18 }}>
          <Ship size={48} />
        </motion.span>

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
