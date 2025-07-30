export const Pagination: React.FC<{
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null
  }
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav
      className="flex items-center justify-center space-x-4"
      aria-label="Pagination"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      <div className="flex items-center space-x-2">
        {pageNumbers.map((num) => {
          const isActive = currentPage === num
          const activeClasses = 'bg-gray-100 text-gray-800 border-gray-200'
          const inactiveClasses =
            'bg-white text-gray-500 hover:bg-gray-50 border-gray-300'

          return (
            <button
              key={num}
              onClick={() => onPageChange(num)}
              className={`flex items-center justify-center w-9 h-9 text-sm font-medium border rounded-md transition-colors ${
                isActive ? activeClasses : inactiveClasses
              }`}
            >
              {num}
            </button>
          )
        })}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </nav>
  )
}
