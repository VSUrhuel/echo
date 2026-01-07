"use client"
import { Profile } from "@/types"
import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function useFacultyData() {
    const supabase = createClient()
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [editingProfile, setIsEditingProfile] = useState<Profile | null>(null)
    const [profiles, setProfiles] = useState<Profile[] | null>(null)
    const [filteredProfiles, setFilteredProfiles] = useState<Profile[] | null>(null)
    const [paginatedProfiles, setPaginatedProfiles] = useState<Profile[] | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [filterType, setFilterType] = useState('all')
    const [isLoading, setIsLoading] = useState(false)

    const numberPerPage = 8
    const [currentPage, setCurrentPage] = useState(1)

    const [formData, setFormData] = useState<Profile>({
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        designation: '',
        specialization: '',
        image_url: '',
        bio: '',
        education: '',
        consultation_hours: '',
        status: '',
        created_at: '',
        updated_at: '',
        updated_by: null,
        is_deleted: false,
        deleted_at: null,
    })

    const resetForm = () => {
        setFormData({
            id: '',
            first_name: '',
            last_name: '',
            email: '',
            designation: '',
            specialization: '',
            image_url: '',
            bio: '',
            education: '',
            consultation_hours: '',
            status: '',
            created_at: '',
            updated_at: '',
            updated_by: null,
            is_deleted: false,
            deleted_at: null,
        })
    }

    useEffect(() => {
        const fetchFaculties = async () => {
            setIsLoading(true)
            try {
                const {data, error} = await supabase.from('profiles').select('*').eq('is_deleted', false)
                if (error) {
                    toast.error('Error fetching faculties: ' + error.message)
                } else {
                    setProfiles(data)
                }
            } catch (error) {
                console.error('Error fetching faculties: ', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchFaculties()
    }, [paginatedProfiles])

    useEffect(() => {
        if(profiles) {
            const filteredProfiles = profiles.filter((profile) => {
                if(filterType == 'all' && (profile.first_name.toLowerCase().includes(searchQuery.toLowerCase()) || profile.last_name.toLowerCase().includes(searchQuery.toLowerCase()))) {
                    return true
                }
                return profile.designation === filterType
            })
            setFilteredProfiles(filteredProfiles)
        }
    }, [profiles, filterType, searchQuery])

    useEffect(() => {
        if(filteredProfiles) {
            const paginatedProfiles = filteredProfiles.slice((currentPage - 1) * numberPerPage, currentPage * numberPerPage)
            setPaginatedProfiles(paginatedProfiles)
        }
    }, [filteredProfiles, currentPage])

    useEffect(() => {
        setCurrentPage(1)
    }, [filterType])

    const nextPage = () => {
        if(filteredProfiles) {
            if(currentPage + 1 < Math.ceil(filteredProfiles?.length / numberPerPage)) {
                setCurrentPage(currentPage + 1)
            }
        }
    }

    const prevPage = () => {
        if(currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    return {
        profiles,
        filteredProfiles,
        paginatedProfiles,
        searchQuery,
        setSearchQuery,
        filterType,
        setFilterType,
        isLoading,
        isAddDialogOpen,
        setIsAddDialogOpen,
        isEditDialogOpen,
        setIsEditDialogOpen,
        editingProfile,
        setIsEditingProfile,
        formData,
        setFormData,
        resetForm,
        nextPage,
        prevPage,
        currentPage,
        setCurrentPage,
    }
}