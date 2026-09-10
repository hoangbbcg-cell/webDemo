type ProductPaginationProps = {
  page: number
  hasNextPage: boolean
  onPrevious: () => void
  onNext: () => void
}

export const ProductPagination = ({
  page,
  hasNextPage,
  onPrevious,
  onNext,
}: ProductPaginationProps) => {
  return (
    <div className="flex items-center justify-center gap-4 mt-10">
      <button
        onClick={onPrevious}
        disabled={page === 1}
        className="px-4 py-2 bg-white border border-slate-300 rounded-lg font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100"
      >
        Trang trước
      </button>

      <span className="font-medium text-slate-700">
        Trang {page}
      </span>

      <button
        onClick={onNext}
        disabled={!hasNextPage}
        className="px-4 py-2 bg-white border border-slate-300 rounded-lg font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100"
      >
        Trang sau
      </button>
    </div>
  )
}