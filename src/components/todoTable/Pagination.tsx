interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex justify-center mt-4">
      {pageNumbers.map(pageNumber => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={`mx-2 px-4 py-2 ${pageNumber === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          type="button"
        >
          {pageNumber}
        </button>
      ))}
    </div>
  )
}

export default Pagination
