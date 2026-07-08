function CategoryCard({
  icon: Icon,
  name,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
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
        hover:-translate-y-1
        hover:shadow-lg
        active:scale-95
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
    </button>
  );
}

export default CategoryCard;