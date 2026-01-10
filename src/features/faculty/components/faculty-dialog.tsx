"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Profile } from "@/types"
import { Loader2, Camera, X, Clock } from "lucide-react"
import { FacultyDesignations } from "@/constants/faculty-designation"
import { FacultySpecializations } from "@/constants/faculty-speicialization"
import { useEffect, useState, useRef } from "react"

interface FacultyDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  formData: Profile
  setFormData: (data: Profile) => void
  onSave: (data: Profile, editingProfileId: string | null, onSuccess: () => void) => void
  isSaving: boolean
  isUploading: boolean
  handleImageUpload: (file: File) => Promise<string | null | undefined>
  editingFaculty: boolean
  resetForm: () => void,
  editingProfile: Profile | null
}

export default function FacultyDialog({
  isOpen,
  onOpenChange,
  formData,
  setFormData,
  onSave,
  isSaving,
  isUploading,
  handleImageUpload,
  editingFaculty,
  resetForm,
  editingProfile
}: FacultyDialogProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")

  // Parse existing consultation hours if editing
  useEffect(() => {
    if (formData.consultation_hours && formData.consultation_hours.includes(" - ")) {
        const parts = formData.consultation_hours.split(" - ")
        setStartTime(parts[0])
        setEndTime(parts[1])
    } else {
        setStartTime("")
        setEndTime("")
    }
  }, [isOpen, formData.consultation_hours])

  const handleTimeChange = (type: 'start' | 'end', value: string) => {
    const newStartTime = type === 'start' ? value : startTime
    const newEndTime = type === 'end' ? value : endTime
    
    setStartTime(newStartTime)
    setEndTime(newEndTime)

    if (newStartTime && newEndTime) {
        // Format: 08:00 AM - 05:00 PM (or just HH:MM - HH:MM as strings for simplicity if requested)
        // Converting to more readable format if needed, but here sticking to simple range
        setFormData({ ...formData, consultation_hours: `${newStartTime} - ${newEndTime}` })
    }
  }

  const onFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = await handleImageUpload(file)
      if (url) {
        setFormData({ ...formData, image_url: url })
      }
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && !isSaving && !isUploading) {
          onOpenChange(false)
          resetForm()
        } else if (open) {
          onOpenChange(true)
        }
      }}
    >
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editingFaculty ? "Edit Faculty" : "Add New Faculty"}</DialogTitle>
          <DialogDescription>
            {editingFaculty
              ? "Update the faculty information below."
              : "Enter the details of the new faculty."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center gap-4">
            <Label>Profile Picture</Label>
            <div className="relative group">
              <div className="w-32 h-32 rounded-full border-2 border-dashed border-muted-foreground/30 overflow-hidden bg-muted flex items-center justify-center">
                {isUploading ? (
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                ) : formData.image_url ? (
                  <img 
                    src={formData.image_url} 
                    alt="Profile Preview" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Camera className="h-10 w-10 text-muted-foreground/50" />
                )}
              </div>
              
              {formData.image_url && !isUploading && (
                <button
                  onClick={() => setFormData({ ...formData, image_url: "" })}
                  className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
              
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-white"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  {formData.image_url ? "Change" : "Upload"}
                </Button>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={onFileSelect}
              />
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Clear background and frontal view recommended.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">First Name</Label>
              <Input
                id="name"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                placeholder="Enter first name"
                disabled={isSaving || isUploading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                placeholder="Enter last name"
                disabled={isSaving || isUploading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={formData.status || ""} 
                onValueChange={(value) => setFormData({ ...formData, status: value })}
                disabled={isSaving || isUploading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="on-leave">On Leave</SelectItem>
                  <SelectItem value="visiting">Visiting</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="designation">Designation</Label>
              <Select 
                value={formData.designation || ""} 
                onValueChange={(value) => setFormData({ ...formData, designation: value })}
                disabled={isSaving || isUploading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select designation" />
                </SelectTrigger>
                <SelectContent>
                  {FacultyDesignations.map((designation, index) => (
                    <SelectItem key={index} value={designation}>
                      {designation}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="specialization">Specialization</Label>
              <Select 
                value={formData.specialization || ""} 
                onValueChange={(value) => setFormData({ ...formData, specialization: value })}
                disabled={isSaving || isUploading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select specialization" />
                </SelectTrigger>
                <SelectContent>
                  {FacultySpecializations.map((specialization, index) => (
                    <SelectItem key={index} value={specialization}>
                      {specialization}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email || ""}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="faculty@vsu.edu.ph"
                disabled={isSaving || isUploading}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="education">Education (Graduated At)</Label>
              <Input
                id="education"
                type="text"
                value={formData.education || ""}
                onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                placeholder="e.g. MS in Development Communication"
                disabled={isSaving || isUploading}
              />
            </div>
            
            <div className="space-y-2">
                <Label className="flex items-center gap-2">
                    <Clock className="h-4 w-4" /> Consultation Hours
                </Label>
                <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                        <span className="text-[10px] text-muted-foreground uppercase font-bold">Start</span>
                        <Input
                            type="time"
                            value={startTime}
                            onChange={(e) => handleTimeChange('start', e.target.value)}
                            disabled={isSaving || isUploading}
                        />
                    </div>
                    <div className="space-y-1">
                        <span className="text-[10px] text-muted-foreground uppercase font-bold">End</span>
                        <Input
                            type="time"
                            value={endTime}
                            onChange={(e) => handleTimeChange('end', e.target.value)}
                            disabled={isSaving || isUploading}
                        />
                    </div>
                </div>
                {formData.consultation_hours && (
                    <p className="text-xs text-primary font-medium">Selected: {formData.consultation_hours}</p>
                )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio || ""}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Short professional biography..."
              className="min-h-[100px]"
              disabled={isSaving || isUploading}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSaving || isUploading}>
            Cancel
          </Button>
          <Button onClick={() => onSave(formData, editingProfile?.id || null, () => {
            onOpenChange(false)
            resetForm()
          })} className="bg-primary text-primary-foreground min-w-[120px]" disabled={isSaving || isUploading}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              editingFaculty ? "Save Changes" : "Add Faculty"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
