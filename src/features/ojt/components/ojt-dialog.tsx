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
import { Partner } from "@/types"
import { Camera, Loader2, X, Building2, Globe, Mail, Phone, MapPin, Briefcase, Users, CheckCircle, XCircle, Link as LinkIcon } from "lucide-react"
import { useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface OjtDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  formData: Partner
  setFormData: (data: Partner) => void
  onSave: () => void
  isSaving: boolean
  editingLinkage: boolean
  resetForm: () => void
  handleLogoUpload: (file: File) => Promise<string | null | undefined>
  isUploading: boolean
}

export default function OjtDialog({
  isOpen,
  onOpenChange,
  formData,
  setFormData,
  onSave,
  isSaving,
  editingLinkage,
  resetForm,
  handleLogoUpload,
  isUploading
}: OjtDialogProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)

  const onFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Create preview
      const previewUrl = URL.createObjectURL(file)
      setLogoPreview(previewUrl)
      
      const url = await handleLogoUpload(file)
      if(url) {
        setFormData({ ...formData, logo_url: url })
      }
      URL.revokeObjectURL(previewUrl)
    }
  }

  const removeLogo = () => {
    setFormData({ ...formData, logo_url: "" })
    setLogoPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleClose = () => {
    if (!isSaving && !isUploading) {
      onOpenChange(false)
      resetForm()
      setLogoPreview(null)
    }
  }

  const getCompanyInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto border-border shadow-xl">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-foreground">
                {editingLinkage ? "Edit Company Linkage" : "Add New Partner Company"}
              </DialogTitle>
              <DialogDescription>
                {editingLinkage
                  ? "Update the company information and partnership details."
                  : "Fill in the details to add a new OJT partner company to the system."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          {/* Logo Upload Section */}
          <div className="flex flex-col items-center gap-4 p-4 bg-gradient-to-br from-muted/20 to-muted/10 rounded-xl">
            <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Company Logo
            </Label>
            
            <div className="relative group">
              <div className="w-40 h-40 rounded-2xl border-2 border-dashed border-primary/30 overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center transition-all hover:border-primary/50 hover:scale-[1.02]">
                {isUploading ? (
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <span className="text-xs text-muted-foreground">Uploading...</span>
                  </div>
                ) : formData.logo_url || logoPreview ? (
                  <Image 
                    src={logoPreview || formData.logo_url || "/placeholder.png"} 
                    alt="Company Logo" 
                    className="w-full h-full object-cover"
                    width={160}
                    height={160}
                  />
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <Camera className="h-8 w-8 text-primary/60" />
                    </div>
                    <p className="text-sm text-muted-foreground text-center">Upload company logo</p>
                  </div>
                )}
              </div>
              
              {(formData.logo_url || logoPreview) && !isUploading && (
                <button
                  onClick={removeLogo}
                  className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1.5 shadow-lg hover:bg-destructive/90 transition-colors"
                  title="Remove logo"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
              
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl cursor-pointer backdrop-blur-sm">
                <Button
                  variant="secondary"
                  size="sm"
                  className="text-white bg-white/20 hover:bg-white/30 border border-white/30"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  {formData.logo_url || logoPreview ? "Change Logo" : "Upload Logo"}
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
            
            <p className="text-xs text-muted-foreground text-center max-w-xs">
              Recommended: Square logo, 500x500px, PNG/JPG with transparent background
            </p>
          </div>

          {/* Company Details */}
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                  <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                  Company Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter company name"
                  disabled={isSaving || isUploading}
                  className="border-border hover:border-primary/50 focus:border-primary transition-colors"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type" className="text-sm font-medium flex items-center gap-2">
                  <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
                  Company Type
                </Label>
                <Select 
                  value={formData.type || ""} 
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                  disabled={isSaving || isUploading}
                >
                  <SelectTrigger className="border-border hover:border-primary/50">
                    <SelectValue placeholder="Select company type" />
                  </SelectTrigger>
                  <SelectContent>
                    {['Media Network', 'Government Agency', 'Research Institution', 'NGO', 'Private Company'].map((type) => (
                      <SelectItem key={type} value={type} className="flex items-center gap-2">
                        <Briefcase className="h-3.5 w-3.5" />
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                  Location
                </Label>
                <Input
                  id="location"
                  value={formData.location || ""}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="City, Province, Country"
                  disabled={isSaving || isUploading}
                  className="border-border hover:border-primary/50 focus:border-primary transition-colors"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="website" className="text-sm font-medium flex items-center gap-2">
                  <LinkIcon className="h-3.5 w-3.5 text-muted-foreground" />
                  Website URL
                </Label>
                <Input
                  id="website"
                  value={formData.website_url || ""}
                  onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                  placeholder="https://example.com"
                  disabled={isSaving || isUploading}
                  className="border-border hover:border-primary/50 focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="contactEmail" className="text-sm font-medium flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                  Contact Email
                </Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contact_email || ""}
                  onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                  placeholder="contact@company.com"
                  disabled={isSaving || isUploading}
                  className="border-border hover:border-primary/50 focus:border-primary transition-colors"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="slots" className="text-sm font-medium flex items-center gap-2">
                  <Users className="h-3.5 w-3.5 text-muted-foreground" />
                  Available Internship Slots
                </Label>
                <Input
                  id="slots"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.available_slot || 0}
                  onChange={(e) => setFormData({ ...formData, available_slot: Number.parseInt(e.target.value) || 0 })}
                  disabled={isSaving || isUploading}
                  className="border-border hover:border-primary/50 focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="status" className="text-sm font-medium flex items-center gap-2">
                  Partnership Status
                </Label>
                <Select
                  value={formData.is_active ? "Active" : "Inactive"}
                  onValueChange={(value: "Active" | "Inactive") => setFormData({ ...formData, is_active: value === "Active" })}
                  disabled={isSaving || isUploading}
                >
                  <SelectTrigger className="border-border hover:border-primary/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active" className="flex items-center gap-2">
                      <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                      Active - Currently accepting interns
                    </SelectItem>
                    <SelectItem value="Inactive" className="flex items-center gap-2">
                      <XCircle className="h-3.5 w-3.5 text-gray-500" />
                      Inactive - Not accepting interns
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Company Description
              </Label>
              <Textarea
                id="description"
                value={formData.description || ""}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of the company, internship opportunities, and partnership benefits..."
                className="min-h-[120px] border-border hover:border-primary/50 focus:border-primary transition-colors"
                disabled={isSaving || isUploading}
              />
              <p className="text-xs text-muted-foreground">
                Describe the company's focus, type of internships offered, and any special requirements or benefits.
              </p>
            </div>
          </div>
        </div>
        
        <DialogFooter className="gap-2 pt-4 border-t border-border">
          <Button 
            variant="outline" 
            onClick={handleClose} 
            disabled={isSaving || isUploading}
            className="border-border hover:border-primary/50 transition-colors"
          >
            Cancel
          </Button>
          <Button 
            onClick={onSave} 
            disabled={isSaving || isUploading || !formData.name || !formData.type}
            className="min-w-[140px] bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:from-primary/90 hover:to-secondary/90 shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving || isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : editingLinkage ? (
              "Update Partner"
            ) : (
              "Add Partner Company"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}