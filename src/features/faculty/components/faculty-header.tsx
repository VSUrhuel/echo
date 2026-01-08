"use client"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
interface FacultyHeaderProps {
    setIsAddDialogOpen: (open: boolean) => void
    resetForm: () => void
}

export default function FacultyHeader({
    setIsAddDialogOpen, 
    resetForm, 
}: FacultyHeaderProps) {
    return (
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b border-border bg-background px-6">
            <h1 className="text-lg font-semibold text-foreground">VSU DevCom Faculty</h1>
            
            <Button 
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => {
                    resetForm()
                    setIsAddDialogOpen(true)
                }}
            >
                <Plus className="mr-2 h-4 w-4" />
                Add Faculty
            </Button>

        </header>
    )
}
