"use client"
import { Partner } from "@/types"
import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function useOjtData() {
    const supabase = createClient()
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [editingLinkage, setEditingLinkage] = useState<Partner | null>(null)
    const [linkages, setLinkages] = useState<Partner[] | null>(null)
    const [filteredLinkages, setFilteredLinkages] = useState<Partner[] | null>(null)
    const [paginatedLinkages, setPaginatedLinkages] = useState<Partner[] | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [filterType, setFilterType] = useState('all')
    const [isLoading, setIsLoading] = useState(false)

    const numberPerPage = 10
    const [currentPage, setCurrentPage] = useState(1)

    const [formData, setFormData] = useState<Partner>({
        id: 0,
        name: '',
        logo_url: '',
        type: '',
        location: '',
        website_url: '',
        is_active: false,
        is_deleted: false,
        deleted_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        updated_by: null,
        description: '',
        available_slot: null,
        contact_email: '',
    })
   

    const resetForm = () => {
        setFormData({
            id: 0,
            name: '',
            logo_url: '',
            type: '',
            location: '',
            website_url: '',
            is_active: false,
            is_deleted: false,
            deleted_at: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            updated_by: null,
            description: '',
            available_slot: null,
            contact_email: '',
        })
    }

    useEffect(() => {
        const fetchLinkages = async () => {
            setIsLoading(true)
            try {
                const {data, error} = await supabase.from('partners').select('*')
                if (error) {
                    toast.error('Error fetching linkages:!')
                } else {
                    setLinkages(data)
                }
            } catch (error) {
                console.error('Error fetching linkages:', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchLinkages()
    }, [paginatedLinkages])

    useEffect(() => {
        if (linkages) {
            const filteredData = linkages.filter((linkage) => {
                if (filterType === 'all' && linkage.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                    return true
                }
                return linkage.type === filterType
            })
            setFilteredLinkages(filteredData)
        }
    }, [linkages, filterType, searchQuery])

    useEffect(() => {
        if (filteredLinkages) {
            const paginatedData = filteredLinkages.slice((currentPage - 1) * numberPerPage, currentPage * numberPerPage)
            setPaginatedLinkages(paginatedData)
        }
    }, [filteredLinkages, currentPage])

    useEffect(() => {
        setCurrentPage(1)
    }, [filterType])

    const nextPage = () => {
        if(filteredLinkages) {
            setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(filteredLinkages.length / numberPerPage)))
        }
    }

    const prevPage = () => {
        if(filteredLinkages) {
            setCurrentPage((prevPage) => Math.max(1, prevPage - 1))
        }
    }

    return {
        isAddDialogOpen,
        setIsAddDialogOpen,
        isEditDialogOpen,
        setIsEditDialogOpen,
        editingLinkage,
        setEditingLinkage,
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

        paginatedLinkages,
        filteredLinkages,
        linkages,
    }
}