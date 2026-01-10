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
  // Ensure totalPages is at least 1
  const displayTotalPages = Math.max(totalPages, 1)
  return (
    <div className="flex items-center justify-between px-2 py-4 mt-4 border-t border-border/50">
      <div className="flex-1 text-sm text-muted-foreground font-medium">
        Page <span className="text-foreground">{currentPage}</span> of{" "}
        <span className="text-foreground">{displayTotalPages}</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1 || isLoading}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 px-3"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1 || isLoading}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <Button
            variant="outline"
            className="h-8 px-3"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= displayTotalPages || isLoading}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onPageChange(displayTotalPages)}
            disabled={currentPage >= displayTotalPages || isLoading}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
