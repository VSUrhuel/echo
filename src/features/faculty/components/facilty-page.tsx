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
