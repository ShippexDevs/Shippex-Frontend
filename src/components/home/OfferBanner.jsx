import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function OfferBanner() {
  const reduceMotion = useReducedMotion();
  const navigate = useNavigate();
  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { y: -2 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="
      relative
      isolate
      overflow-hidden
      rounded-3xl
      bg-gradient-to-r
      from-orange-500
      to-orange-400
      p-6
      text-white
      shadow-xl
      "
    >
      <motion.div aria-hidden="true" className="pointer-events-none absolute -right-8 -top-16 z-0 h-52 w-52 rounded-full bg-white/15 blur-2xl" animate={reduceMotion ? undefined : { scale: [1, 1.12, 1], opacity: [0.55, 0.8, 0.55] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
      <div className="relative z-10">
      <p className="text-sm">
        THIS WEEK ONLY
      </p>

      <h2 className="text-2xl font-bold mt-2">
        Flat 20% OFF
      </h2>

      <p className="mt-2">
        Selected beverages & snacks
      </p>

      <motion.button
        type="button"
        onClick={() => navigate("/categories")}
        whileTap={reduceMotion ? undefined : { scale: 0.96 }}
        whileHover={reduceMotion ? undefined : { scale: 1.035 }}
        className="
        mt-5
        bg-white
        text-orange-500
        rounded-full
        px-5
        py-3
        font-semibold
        flex
        items-center
        gap-2
        "
      >
        Shop Now

        <motion.span whileHover={reduceMotion ? undefined : { x: 3 }} transition={{ duration: 0.18 }}><ArrowRight size={18} /></motion.span>
      </motion.button>
      </div>
    </motion.div>
  );
}

export default OfferBanner;
