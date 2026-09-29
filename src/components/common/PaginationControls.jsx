import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PaginationControls({ offset, limit, count, onPageChange, loading = false }) {
  const hasPrevious = offset > 0;
  const hasNext = count === limit;
  const firstItem = count === 0 ? 0 : offset + 1;
  const lastItem = offset + count;

  if (!hasPrevious && !hasNext) return null;

  const buttonClass = "inline-flex min-w-28 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#087E8B]/30 hover:bg-[#087E8B]/[0.04] hover:text-[#087E8B] hover:shadow-md focus:outline-none focus:ring-4 focus:ring-[#087E8B]/10 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none";

  return (
    <nav aria-label="Pagination" className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-4 shadow-[0_8px_24px_rgba(15,23,42,0.05)] sm:flex-row sm:px-5">
      <div className="text-center sm:text-left">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Results</p>
        <p className="mt-0.5 text-sm font-medium text-slate-600">Showing <span className="font-bold text-slate-900">{firstItem}–{lastItem}</span></p>
      </div>
      <div className="flex items-center gap-2">
        <button type="button" aria-label="Go to previous page" onClick={() => onPageChange(Math.max(0, offset - limit))} disabled={!hasPrevious || loading} className={buttonClass}>
          <ChevronLeft size={17} strokeWidth={2.25} /> Previous
        </button>
        <span className="mx-1 min-w-16 rounded-lg bg-slate-50 px-3 py-2 text-center text-xs font-bold text-slate-500">Page {Math.floor(offset / limit) + 1}</span>
        <button type="button" aria-label="Go to next page" onClick={() => onPageChange(offset + limit)} disabled={!hasNext || loading} className={buttonClass}>
          Next <ChevronRight size={17} strokeWidth={2.25} />
        </button>
      </div>
    </nav>
  );
}
