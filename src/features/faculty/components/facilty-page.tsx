"use client"

import useFacultyData from "@/features/faculty/hooks/useFacultyData"
import useFacultyAction from "@/features/faculty/hooks/useFacultyAction"
import FacultyHeader from "@/features/faculty/components/faculty-header"
import FacultyDialog from "@/features/faculty/components/faculty-dialog"
import FacultyFilters from "@/features/faculty/components/faculty-filters"
import FacultyTable from "@/features/faculty/components/faculty-table"
import { Profile } from "@/types"
import { Kufam } from "next/font/google"
import { toast } from "sonner"
import { DataTablePagination } from "@/components/ui/data-table-pagination"

export default function FacultyPage() {
    const { 
        isAddDialogOpen, 
        setIsAddDialogOpen, 
        editingProfile, 
        setIsEditingProfile,
        formData, 
        setFormData, 
        resetForm, 
        searchQuery, 
        setSearchQuery, 
        filterType, 
        setFilterType, 
        isLoading, 
        nextPage, 
        prevPage, 
        paginatedProfiles,
        filteredProfiles,
        currentPage,
        setCurrentPage
    } = useFacultyData()

    const { onSubmit, handleImageUpload, isSaving, isUploading, handleSoftDelete } = useFacultyAction()

    const handleSubmit = async (formData: Profile, editingProfileId: number | null) => {
        if(formData.email == '') {
            toast.error('Email is required')
            return
        }
        // ensure all values are not null
        if(formData.first_name == '' || formData.last_name == '' || formData.designation == '' || formData.specialization == '' ||  formData.bio == '' || formData.education == '' || formData.consultation_hours == '' || formData.status == '') {
            toast.error('All fields except Image are required')
            return
        }
        await onSubmit(formData, editingProfileId, () => {
            setIsAddDialogOpen(false)
            resetForm()
        })
    }



    return (
        <div className="flex flex-col min-h-screen">
            <FacultyHeader 
                setIsAddDialogOpen={setIsAddDialogOpen}
                resetForm={resetForm}
            />  
            
            <main className="flex-1 p-6 space-y-6">
                <FacultyFilters 
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    filterType={filterType}
                    setFilterType={setFilterType}
                />

                <FacultyTable 
                    profiles={paginatedProfiles || []}
                    isLoading={isLoading}
                    onEdit={(profile: Profile) => {
                        setIsEditingProfile(profile)
                        setFormData(profile)
                        setIsAddDialogOpen(true)
                    }}
                    onDelete={(id: string) => {
                        handleSoftDelete(id)
                    }}
                />

                <DataTablePagination 
                    currentPage={currentPage}
                    totalPages={Math.ceil((filteredProfiles?.length || 0) / 8)}
                    onPageChange={(page) => setCurrentPage(page)}
                    isLoading={isLoading}
                />
            </main>

            <FacultyDialog
                isOpen={isAddDialogOpen}
                onOpenChange={setIsAddDialogOpen}
                formData={formData}
                setFormData={setFormData}
                onSave={handleSubmit}
                isSaving={isSaving}
                isUploading={isUploading}
                handleImageUpload={handleImageUpload}
                editingFaculty={editingProfile !== null}
                resetForm={resetForm}
                editingProfile={editingProfile}
            />
        </div>
    )
}
