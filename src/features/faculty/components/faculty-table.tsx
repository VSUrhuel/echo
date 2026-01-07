import { Profile } from "@/types"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Mail, Pencil, Trash2 } from "lucide-react"
import GetFacultyStatusBadge from "../utils/get-faculty-badge"
import { Button } from "@/components/ui/button"

import { Dialog, DialogContent, DialogDescription, DialogFooter,DialogClose, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface FacultyTableProps {
    profiles: Profile[]
    isLoading: boolean
    onEdit: (profile: Profile) => void
    onDelete: (id: string) => void
}

export default function FacultyTable({
    profiles,
    isLoading,
    onEdit,
    onDelete
}: FacultyTableProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {profiles.map((member) => (
              <Card key={member.id} className="overflow-hidden">
                <div className="relative aspect-square bg-muted">
                  <img
                    src={member.image_url || "/placeholder.svg?height=300&width=300&query=professor headshot"}
                    alt={member.first_name}
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2">{GetFacultyStatusBadge(member.status || "Active")}</div>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div>
                      <h3 className="font-semibold text-foreground line-clamp-1">{member.first_name + " " + member.last_name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">{member.designation}</p>
                    </div>
                    <p className="text-sm font-medium text-primary line-clamp-1">{member.specialization}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-3.5 w-3.5 flex-shrink-0" />
                      <span className="truncate">{member.email}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-border">
                    <Button variant="ghost" size="sm" onClick={() => onEdit(member)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Dialog>
                            <DialogTrigger asChild>
                              <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Delete Faculty</DialogTitle>
                                <DialogDescription>
                                  Are you sure you want to delete <strong>{member.first_name + " " + member.last_name}</strong>? This action cannot be undone.
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <DialogClose asChild onClick={() => onDelete(member.id)}>
                                  <Button variant="destructive">Delete</Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
    )
}