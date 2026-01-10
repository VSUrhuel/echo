"use client"
import { Profile } from "@/types"
import { imageSizeCheck } from "@/utils/imageSizeCheck"
import {createClient} from "@/utils/supabase/client"
import { useState } from "react"
import { toast } from "sonner"

export default function useFacultyAction() {
    const supabase = createClient()
    const [isSaving, setIsSaving] = useState(false)
    const [isUploading, setIsUploading] = useState(false)

    const onSubmit = async (data: Profile, editingProfileId: string | null, onSuccess: () => void) => {
        
        setIsSaving(true)
        try {
            if (data.id) {
               await updateProfile(data, data.id)
            } else {
                await createProfile(data)
            }
            onSuccess()
        } catch (error) {
            console.error('Error saving profile: ', error)
        } finally {
            setIsSaving(false)
        }
    }

    const handleImageUpload = async (file: File) => {
        setIsUploading(true)
        try {
            if(!imageSizeCheck(file)) return
            const fileExt = file.name.split('.').pop()
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
            const filePath = `faculty/${fileName}`

            const { error: uploadError } = await supabase.storage
                .from('faculty-images')
                .upload(filePath, file)

            if (uploadError) throw uploadError

            const { data: { publicUrl } } = supabase.storage
                .from('faculty-images')
                .getPublicUrl(filePath)

            toast.success('Image uploaded successfully')
            return publicUrl
        } catch (error: any) {
            console.error('Error uploading image:', error)
            toast.error('Error uploading image: ' + error.message)
            return null
        } finally {
            setIsUploading(false)
        }
    }

    const updateProfile = async (data: Profile, editingProfileId: string) => {
        try {
            const { error } = await supabase.from('profiles').update({
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                designation: data.designation,
                specialization: data.specialization,
                image_url: data.image_url,
                bio: data.bio,
                education: data.education,
                consultation_hours: data.consultation_hours,
                status: data.status,
                updated_at: new Date().toISOString()
            }).eq('id', editingProfileId)
            if (error) {
                toast.error('Error updating profile')
                throw error
            }
            toast.success('Profile updated successfully')
        } catch (error) {
            console.error('Error updating profile: ', error)
            toast.error('Error updating profile')
        }
    }
    
    const createProfile = async (userData: Profile) => {
        try {
            const { id, ...insertData } = userData // get only the data except id
            const { data, error: errorAuth } = await supabase.auth.signUp({
                email: insertData.email,
                password: 'iloveVSU2025',
                options: {
                    data: {
                        first_name: insertData.first_name,
                        last_name: insertData.last_name,
                        role: 'faculty',
                    },
                },
            })

            if (errorAuth) {
                toast.error('Error signing up: ' + errorAuth.message)
                throw errorAuth
            }

            if (!data.user) {
                toast.error('User creation failed: No user returned')
                throw new Error('User creation failed')
            }

            const { error: errorInsert } = await supabase.from('profiles').insert({
                id: data.user.id,
                ...insertData,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            })

            if (errorInsert) {
                toast.error('Error creating profile: ' + errorInsert.message)
                throw errorInsert
            }

            toast.success('Profile created successfully')
        } catch (error) {
            console.error('Error creating profile: ', error)
        }
    }

    const handleSoftDelete = async (id: string) => {
        try {
            const { error } = await supabase.from('profiles').update({
                is_deleted: true,
                deleted_at: new Date().toISOString()
            }).eq('id', id)
            if (error) {
                toast.error('Error deleting profile')
                throw error
            }
            toast.success('Profile deleted successfully')
        } catch (error) {
            console.error('Error deleting profile: ', error)
            toast.error('Error deleting profile')
        }
    }

    return {
        onSubmit,
        handleImageUpload,
        updateProfile,
        createProfile,
        handleSoftDelete,
        isSaving,
        isUploading
    }
    
}
