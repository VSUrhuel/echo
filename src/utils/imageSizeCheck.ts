import { toast } from "sonner"

export const imageSizeCheck = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
        toast.error('File size exceeds 5MB limit')
        return false
    }
    return true   
}