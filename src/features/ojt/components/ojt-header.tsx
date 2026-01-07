"use client"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Partner } from "@/types"
import OjtDialog from "./ojt-dialog"

interface OjtHeaderProps {
    isAddDialogOpen: boolean
    setIsAddDialogOpen: (open: boolean) => void
    editingLinkage: boolean
    formData: Partner
    setFormData: (data: Partner) => void
    resetForm: () => void
    onSubmit: () => void
    isSaving: boolean
}

export default function OjtHeader({
    isAddDialogOpen, 
    setIsAddDialogOpen, 
    editingLinkage, 
    formData, 
    setFormData, 
    resetForm, 
    onSubmit,
    isSaving
}: OjtHeaderProps) {
    return (
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b border-border bg-background px-6">
            <h1 className="text-lg font-semibold text-foreground">OJT Company Linkages</h1>
            
            <Button 
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => {
                    resetForm()
                    setIsAddDialogOpen(true)
                }}
            >
                <Plus className="mr-2 h-4 w-4" />
                Add Linkage
            </Button>

            <OjtDialog
                isOpen={isAddDialogOpen}
                onOpenChange={setIsAddDialogOpen}
                formData={formData}
                setFormData={setFormData}
                onSave={onSubmit}
                isSaving={isSaving}
                editingLinkage={editingLinkage}
                resetForm={resetForm}
            />
        </header>
    )
}
