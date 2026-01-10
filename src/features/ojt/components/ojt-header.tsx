"use client"
import { Button } from "@/components/ui/button"
import { Plus, Building2, Target, Users, Briefcase } from "lucide-react"
import { Partner } from "@/types"
import OjtDialog from "./ojt-dialog"
import { Badge } from "@/components/ui/badge"

interface OjtHeaderProps {
    isAddDialogOpen: boolean
    setIsAddDialogOpen: (open: boolean) => void
    editingLinkage: boolean
    formData: Partner
    setFormData: (data: Partner) => void
    resetForm: () => void
    onSubmit: () => void
    isSaving: boolean
    handleLogoUpload: (file: File) => Promise<string | null | undefined>
    isUploading: boolean
}

export default function OjtHeader({
    isAddDialogOpen, 
    setIsAddDialogOpen, 
    editingLinkage, 
    formData, 
    setFormData, 
    resetForm, 
    onSubmit,
    isSaving,
    handleLogoUpload,
    isUploading
}: OjtHeaderProps) {
    return (
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20">
                    <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                    <h1 className="text-lg font-semibold text-foreground">OJT Company Linkages</h1>
                    <p className="text-xs text-muted-foreground">Manage industry partnerships</p>
                </div>
            </div>
            
            <Button 
                className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:from-primary/90 hover:to-secondary/90 shadow-md hover:shadow-lg transition-all"
                onClick={() => {
                    resetForm()
                    setIsAddDialogOpen(true)
                }}
            >
                <Plus className="mr-2 h-4 w-4" />
                {editingLinkage ? 'Update Partner' : 'Add New Partner'}
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
                handleLogoUpload={handleLogoUpload}
                isUploading={isUploading}
            />
        </header>
    )
}