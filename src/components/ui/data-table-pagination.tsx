import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

interface DataTablePaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  isLoading?: boolean
}

export function DataTablePagination({
  currentPage,
  totalPages,
  onPageChange,
  isLoading
}: DataTablePaginationProps) {
  const displayTotalPages = Math.max(totalPages, 1)
  
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 5
    
    if (displayTotalPages <= maxVisible) {
      for (let i = 1; i <= displayTotalPages; i++) pages.push(i)
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i)
        pages.push('...')
        pages.push(displayTotalPages)
      } else if (currentPage >= displayTotalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = displayTotalPages - 3; i <= displayTotalPages; i++) pages.push(i)
      } else {
        pages.push(1)
        pages.push('...')
        pages.push(currentPage - 1)
        pages.push(currentPage)
        pages.push(currentPage + 1)
        pages.push('...')
        pages.push(displayTotalPages)
      }
    }
    
    return pages
  }
  
  const pageNumbers = getPageNumbers()

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 py-4 mt-0 border-t border-border">
      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground font-medium">Showing page</span>
        <span className="font-bold text-primary bg-primary/10 px-2 py-1 rounded-md">
          {currentPage}
        </span>
        <span className="text-muted-foreground">of</span>
        <span className="font-bold text-secondary bg-secondary/10 px-2 py-1 rounded-md">
          {displayTotalPages}
        </span>
        <span className="text-muted-foreground">total pages</span>
      </div>
      
      <div className="flex items-center gap-1">
        {/* First Page */}
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 border-border hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors disabled:opacity-50"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1 || isLoading}
          title="First page"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        
        {/* Previous Page */}
        <Button
          variant="outline"
          className="h-9 px-3 border-border hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors disabled:opacity-50"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Prev
        </Button>
        
        {/* Page Numbers */}
        <div className="flex items-center gap-1 mx-1">
          {pageNumbers.map((page, index) => (
            page === '...' ? (
              <span key={`ellipsis-${index}`} className="h-9 w-9 flex items-center justify-center text-muted-foreground">
                ...
              </span>
            ) : (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="icon"
                className={`
                  h-9 w-9 font-medium transition-all duration-200
                  ${currentPage === page 
                    ? 'bg-primary text-primary-foreground shadow-md hover:bg-primary/90 scale-105' 
                    : 'border-border hover:bg-primary/10 hover:text-primary hover:border-primary/30'
                  }
                `}
                onClick={() => onPageChange(page as number)}
                disabled={isLoading}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </Button>
            )
          ))}
        </div>
        
        {/* Next Page */}
        <Button
          variant="outline"
          className="h-9 px-3 border-border hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors disabled:opacity-50"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= displayTotalPages || isLoading}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
        
        {/* Last Page */}
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 border-border hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors disabled:opacity-50"
          onClick={() => onPageChange(displayTotalPages)}
          disabled={currentPage >= displayTotalPages || isLoading}
          title="Last page"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}