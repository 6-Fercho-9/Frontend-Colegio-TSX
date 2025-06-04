import Button from "../../components/ui/button/Button";

// components/Tables/PaginacionT.tsx
interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-between border-t border-gray-100 dark:border-white/[0.05] px-4 pt-4">
      <Button
        size="sm"
        variant="outline"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </Button>

      <div className="flex items-center space-x-2">
        {pages.map((page, idx) => {
          if (totalPages > 7 && idx === 3 && page !== currentPage) {
            return <span key={`ellipsis-${idx}`} className="text-gray-400">...</span>;
          }

          return (
            <Button
              key={page}
              size="sm"
              variant={page === currentPage ? "primary" : "outline"}
              className="w-8 h-8 px-0 py-0 text-sm rounded-md"
              onClick={() => onPageChange(page)}
            >
              {page}
            </Button>
          );
        })}
      </div>

      <Button
        size="sm"
        variant="outline"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
};


export default Pagination;