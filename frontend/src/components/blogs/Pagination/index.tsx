"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  useEffect(() => {
    if (currentPage > totalPages) {
      onPageChange(totalPages);
    }
  }, [currentPage, totalPages, onPageChange]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const generatePageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => ({
        id: i + 1,
        page: i + 1,
      }));
    }

    const pageNumbers = [];

    if (currentPage <= 3) {
      // First 3 page
      for (let index = 1; index <= 3; index++) {
        pageNumbers.push({ id: index, page: index });
      }
      pageNumbers.push(
        { id: "1-break", page: "..." },
        { id: totalPages - 2, page: totalPages - 2 },
        { id: totalPages - 1, page: totalPages - 1 },
        { id: totalPages, page: totalPages },
      );
    } else if (currentPage >= totalPages - 2) {
      // Final 3 pages
      pageNumbers.push(
        { id: 1, page: 1 },
        { id: 2, page: 2 },
        { id: 3, page: 3 },
        { id: "2-break", page: "..." },
      );
      for (let index = totalPages - 2; index <= totalPages; index++) {
        pageNumbers.push({ id: index, page: index });
      }
    } else {
      // Pagination mid section
      pageNumbers.push({ id: 1, page: 1 }, { id: "3-break", page: "..." });
      for (let index = currentPage - 1; index <= currentPage + 1; index++) {
        pageNumbers.push({ id: index, page: index });
      }
      pageNumbers.push(
        { id: "4-break", page: "..." },
        { id: totalPages, page: totalPages },
      );
    }

    return pageNumbers;
  };

  return (
    <div className="mt-4 flex flex-wrap items-center justify-end space-x-2">
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        variant="ghost"
        disabled={isFirstPage}
        className={`${
          isFirstPage ? "cursor-not-allowed" : "cursor-pointer"
        } h-10 w-10 shrink-0 rounded-full bg-transparent p-0`}
      >
        <ArrowLeft className="h-5 w-5 fill-black" />
      </Button>

      {generatePageNumbers().map(({ id, page }) => {
        return (
          <span
            key={id}
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
              page === currentPage
                ? "bg-slate-800 text-white"
                : "cursor-pointer hover:bg-slate-800 hover:text-white"
            }`}
            onClick={() =>
              page !== "..." ? handlePageChange(page as number) : null
            }
          >
            {page}
          </span>
        );
      })}

      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        variant="ghost"
        disabled={isLastPage}
        className={`${
          isLastPage ? "cursor-not-allowed" : "cursor-pointer"
        } h-10 w-10 shrink-0 rounded-full bg-transparent p-0`}
      >
        <ArrowRight className="h-5 w-5 fill-black" />
      </Button>
    </div>
  );
};

export default Pagination;
