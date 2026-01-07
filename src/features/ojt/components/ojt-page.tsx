"use client"
import OjtHeader from "./ojt-header";
import useOjtData from "../hooks/useOjtData"
import useOjtAction from "../hooks/useOjtAction"
import OjtStatCards from "./ojt-stat-cards";
import OjtFilters from "./ojt-filters";
import OjtTable from "./ojt-table";
import { Partner } from "@/types";

export default function OjtPage() {
    const { isAddDialogOpen, setIsAddDialogOpen, editingLinkage,setEditingLinkage ,formData, setFormData, resetForm, searchQuery, setSearchQuery, filterType, setFilterType, isLoading, nextPage, prevPage, paginatedLinkages, filteredLinkages } = useOjtData()
    const { onSubmit, deletePartner, isSaving } = useOjtAction()

    const handleSubmit = async () => {
        await onSubmit(formData, editingLinkage?.id || null, () => {
            setIsAddDialogOpen(false)
            resetForm()
        })
    }

    return (
        <div className="flex flex-col">
            <OjtHeader 
                isAddDialogOpen={isAddDialogOpen} 
                setIsAddDialogOpen={setIsAddDialogOpen} 
                editingLinkage={editingLinkage !== null} 
                formData={formData} 
                setFormData={setFormData} 
                resetForm={resetForm} 
                onSubmit={handleSubmit}
                isSaving={isSaving}
            />
            <main className="flex-1 p-6">
                <OjtStatCards stats={{
                    total: filteredLinkages?.length || 0, 
                    active: filteredLinkages?.filter(l => l.is_active).length || 0, 
                    totalSlots: filteredLinkages?.reduce((acc, curr) => acc + (curr.available_slot || 0), 0) || 0
                }} />
                <OjtFilters searchQuery={searchQuery} setSearchQuery={setSearchQuery} filterType={filterType} setFilterType={setFilterType} />
                <OjtTable 
                    paginatedLinkages={paginatedLinkages || []} 
                    openEditDialog={(data: Partner) => {
                        setEditingLinkage(data)
                        setFormData(data)
                        setIsAddDialogOpen(true)
                    }} 
                    handleDelete={(id: number) => deletePartner(id)} 
                />
                
            </main>
        </div>
    )
}