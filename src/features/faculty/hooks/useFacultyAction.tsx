"use client"
import { Profile } from "@/types"
import {createClient} from "@/utils/supabase/client"
import { useState } from "react"
import { toast } from "sonner"

export default function useFacultyAction() {
    const supabase = createClient()
    const [isSaving, setIsSaving] = useState(false)
    const [isUploading, setIsUploading] = useState(false)

    const onSubmit = async (data: Profile, editingProfileId: number | null, onSuccess: () => void) => {
        if(data.email == null) {
            toast.error('Email is required')
            return
        }
        // ensure all values are not null
        if(data.first_name == null || data.last_name == null || data.designation == null || data.specialization == null ||  data.bio == null || data.education == null || data.consultation_hours == null || data.status == null) {
            toast.error('All fields except Image are required')
            return
        }
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
             const {id, ...insertData} = userData // get only the data except id
            const {data, error : errorAuth} = await supabase.auth.signUp({
                email: insertData.email,
                password: 'iloveVSU2025',
                options: {
                    data: {
                        first_name: insertData.first_name,
                        last_name: insertData.last_name,
                        role: 'faculty'
                    }
                }
            })

           
            const { error : errorInsert } = await supabase.from('profiles').insert({
                id: data.user?.id,
                ...insertData,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            })

            
            if (errorInsert || errorAuth) {
                toast.error('Error creating profile')
                throw errorInsert || errorAuth
            }
            toast.success('Profile created successfully')
        } catch (error) {
            console.error('Error creating profile: ', error)
            toast.error('Error creating profile')
        }
    }

    return {
        onSubmit,
        handleImageUpload,
        updateProfile,
        createProfile,
        isSaving,
        isUploading
    }
    
}
