import { motion, useReducedMotion } from "framer-motion";

function CategoryCard({
  icon: Icon,
  name,
  onClick,
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.button
      onClick={onClick}
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      whileHover={reduceMotion ? undefined : { y: -4, scale: 1.015 }}
      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 360, damping: 24, delay: reduceMotion ? 0 : 0.035 }}
      className="
        min-w-[82px]
        bg-white
        rounded-3xl
        p-4
        shadow-md
        flex
        flex-col
        items-center
        gap-3
        transition-all
        duration-200
        hover:shadow-lg
      "
    >
      <div
        className="
          h-14
          w-14
          rounded-2xl
          bg-cyan-50
          flex
          items-center
          justify-center
        "
      >
        <Icon
          size={28}
          className="text-[#0F6E8C]"
        />
      </div>

      <span className="text-xs font-semibold text-center">
        {name}
      </span>
    </motion.button>
  );
}

export default CategoryCard;
