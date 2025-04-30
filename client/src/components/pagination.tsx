"use client";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }: any) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    pageNumbers.push(1);
    if (currentPage > 3) {
      pageNumbers.push("...");
    } else if (currentPage > 2) {
      pageNumbers.push(2);
    }
    if (currentPage !== 1 && currentPage !== totalPages) {
      pageNumbers.push(currentPage);
    }
    if (currentPage < totalPages - 2) {
      pageNumbers.push("...");
    } else if (currentPage < totalPages - 1) {
      pageNumbers.push(totalPages - 1);
    }
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-left mt-6">
      <div className="flex items-center rounded-full bg-gray-100 shadow-sm">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 rounded-l-full focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Go to previous page"
        >
          <span className="text-[#A34E78]"><ChevronsLeft/></span>
        </button>

        {getPageNumbers().map((page, index) => (
          <React.Fragment key={index}>
            {page === "..." ? (
              <span className="px-3 py-2 text-gray-500">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page)}
                className={`px-4 py-2 min-w-[40px] text-center ${
                  currentPage === page
                    ? "bg-[#8C2F5D] text-white font-medium"
                    : "text-gray-700 hover:bg-gray-200"
                } focus:outline-none`}
                aria-label={`Go to page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 rounded-r-full focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Go to next page"
        >
          <span className="text-[#A34E78]"><ChevronsRight/> </span>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
