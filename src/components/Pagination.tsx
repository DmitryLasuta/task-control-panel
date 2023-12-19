import React from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex justify-center mt-4 flex-wrap gap-1">
      {pageNumbers.map(pageNumber => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={`px-2 py-1 text-sm ${
            pageNumber === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'
          } md:mx-2 md:px-4 md:py-2 md:text-base`}
          type="button"
        >
          {pageNumber}
        </button>
      ))}
    </div>
  )
}
