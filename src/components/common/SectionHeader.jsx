function SectionHeader({
  title,
  showViewAll = false,
  onViewAll,
}) {
  return (
    <div className="flex items-center justify-between">

      <h2 className="text-xl font-bold">
        {title}
      </h2>

      {showViewAll && (
        <button
          onClick={onViewAll}
          className="text-sm font-semibold text-[#0F6E8C]"
        >
          View All
        </button>
      )}

    </div>
  );
}

export default SectionHeader;