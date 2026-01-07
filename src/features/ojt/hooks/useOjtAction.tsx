"use client";
import { createClient } from "@/utils/supabase/client"
import { Partner } from "@/types"
import { toast } from "sonner";
import { useState } from "react";

export default function useOjtAction() {
    const [isSaving, setIsSaving] = useState(false)
    const supabase = createClient()

    const onSubmit = async (data: Partner, editingLinkageId: number | null, onSuccess: () => void) => {
        setIsSaving(true)
        try {
            if (editingLinkageId) {
                await updatePartner(editingLinkageId, data)
            } else {
                await addPartner(data)
            }
            onSuccess()
        } catch (error) {
            // Error handled in underlying functions
        } finally {
            setIsSaving(false)
        }
    }

    const updatePartner = async (id: number, data: Partner) => {
        const { error } = await supabase
            .from('partners')
            .update({
                name: data.name,
                type: data.type,
                location: data.location,
                website_url: data.website_url,
                contact_email: data.contact_email,
                available_slot: data.available_slot,
                is_active: data.is_active,
                description: data.description,
                updated_at: new Date().toISOString()
            })
            .eq('id', id)
        
        if (error) {
            toast.error('Error updating partner')
            throw error
        }
        toast.success('Partner updated successfully')
    }

    const deletePartner = async (id: number) => {
        try {
            const { error } = await supabase.from('partners').delete().eq('id', id)
            if (error) throw error
            toast.success('Partner deleted successfully!')
        } catch (error) {
            toast.error('Error deleting partner!')
        }
    }

    const addPartner = async (data: Partner) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...insertData } = data
        const { error } = await supabase.from('partners').insert([{
            ...insertData,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }])
        
        if (error) {
            toast.error('Error adding partner!')
            throw error
        }
        toast.success('Partner added successfully')
    }
    
    return {
        onSubmit,
        updatePartner,
        deletePartner,
        addPartner,
        isSaving
    }
}