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
import { Loader2 } from "lucide-react"

interface OjtDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  formData: Partner
  setFormData: (data: Partner) => void
  onSave: () => void
  isSaving: boolean
  editingLinkage: boolean
  resetForm: () => void
}

export default function OjtDialog({
  isOpen,
  onOpenChange,
  formData,
  setFormData,
  onSave,
  isSaving,
  editingLinkage,
  resetForm
}: OjtDialogProps) {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && !isSaving) {
          onOpenChange(false)
          resetForm()
        } else if (open) {
          onOpenChange(true)
        }
      }}
    >
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editingLinkage ? "Edit Company Linkage" : "Add New Company Linkage"}</DialogTitle>
          <DialogDescription>
            {editingLinkage
              ? "Update the company information below."
              : "Enter the details of the new OJT partner company."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Company Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter company name"
                disabled={isSaving}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select 
                value={formData.type || ""} 
                onValueChange={(value) => setFormData({ ...formData, type: value })}
                disabled={isSaving}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Media Network">Media Network</SelectItem>
                  <SelectItem value="Government Agency">Government Agency</SelectItem>
                  <SelectItem value="Research Institution">Research Institution</SelectItem>
                  <SelectItem value="NGO">NGO</SelectItem>
                  <SelectItem value="Private Company">Private Company</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location || ""}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="City, Province"
                disabled={isSaving}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={formData.website_url || ""}
                onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                placeholder="https://example.com"
                disabled={isSaving}
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input
                id="contactEmail"
                type="email"
                value={formData.contact_email || ""}
                onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                placeholder="email@company.com"
                disabled={isSaving}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slots">Available Slots</Label>
              <Input
                id="slots"
                type="number"
                min="0"
                value={formData.available_slot || 0}
                onChange={(e) => setFormData({ ...formData, available_slot: Number.parseInt(e.target.value) || 0 })}
                disabled={isSaving}
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.is_active ? "Active" : "Inactive"}
                onValueChange={(value: "Active" | "Inactive") => setFormData({ ...formData, is_active: value === "Active" })}
                disabled={isSaving}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of the company and internship opportunities..."
              className="min-h-[100px]"
              disabled={isSaving}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSaving}>
            Cancel
          </Button>
          <Button onClick={onSave} className="bg-primary text-primary-foreground min-w-[120px]" disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              editingLinkage ? "Save Changes" : "Add Linkage"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
