"use client"

import useFacultyData from "@/features/faculty/hooks/useFacultyData"
import useFacultyAction from "@/features/faculty/hooks/useFacultyAction"
import FacultyHeader from "@/features/faculty/components/faculty-header"
import FacultyDialog from "@/features/faculty/components/faculty-dialog"
import FacultyFilters from "@/features/faculty/components/faculty-filters"
import FacultyTable from "@/features/faculty/components/faculty-table"
import { Profile } from "@/types"

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
        filteredProfiles
    } = useFacultyData()

    const { onSubmit, handleImageUpload, isSaving, isUploading } = useFacultyAction()

    const handleSubmit = async (formData: Profile, editingProfileId: number | null) => {
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
                        // Implement delete logic if needed
                        console.log("Delete", id)
                    }}
                />

                {/* Pagination Controls */}
                <div className="flex items-center justify-end gap-2">
                    <button 
                        onClick={prevPage}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                        disabled={isLoading}
                    >
                        Previous
                    </button>
                    <button 
                        onClick={nextPage}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                        disabled={isLoading}
                    >
                        Next
                    </button>
                </div>
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
