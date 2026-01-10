"use client"

import { Profile } from "@/types"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Pencil, Trash2, Phone, Calendar, GraduationCap, MapPin, Award, ExternalLink } from "lucide-react"
import GetFacultyStatusBadge from "../utils/get-faculty-badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

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
    const getFacultyInitials = (firstName: string, lastName: string) => {
        return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase()
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {profiles.map((member) => (
                <Card 
                  key={member.id} 
                  className="group overflow-hidden border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                  {/* Large Profile Image Section - Now majority of card */}
                  <div className="relative h-64 bg-gray-100 dark:bg-gray-800">
                  {/* Profile Image */}
                  <div className="w-full h-full">
                      {member.image_url ? (
                          <img
                              src={member.image_url}
                              alt={`${member.first_name} ${member.last_name}`}
                              className="w-full h-full object-cover"
                          />
                      ) : (
                          <div className="w-full h-full flex items-center justify-center">
                              <Avatar className="h-40 w-40 border-4 border-background shadow-lg">
                                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-4xl font-bold">
                                      {getFacultyInitials(member.first_name, member.last_name)}
                                  </AvatarFallback>
                              </Avatar>
                          </div>
                      )}
                  </div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                      {GetFacultyStatusBadge(member.status?.toLowerCase() || "active")}
                  </div>
              </div>

              <CardContent className="px-6 space-y-2">
                  {/* Faculty Info */}
                  <div className="space-y-2">
                      <h3 className="text-xl font-bold text-foreground">
                          {member.first_name} {member.last_name}
                      </h3>
                      <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-primary" />
                          <p className="text-md font-medium text-primary">
                              {member.designation}
                          </p>
                      </div>
                      
                      {member.specialization && (
                          <Badge variant="secondary" className="text-sm px-2 py-1 font-normal">
                              <GraduationCap className="h-4 w-4 mr-2" />
                              {member.specialization}
                          </Badge>
                      )}
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-3">
                      {member.email && (
                          <div className="flex text-sm items-center gap-3 p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                              <div className="p-1 rounded-lg bg-primary/20">
                                  <Mail className="h-3 w-3 text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                  <a 
                                      href={`mailto:${member.email}`}
                                      className="font-medium text-sm hover:text-primary hover:underline transition-colors truncate block"
                                  >
                                      {member.email}
                                  </a>
                              </div>
                          </div>
                      )}
                      
                      {member.consultation_hours && (
                          <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                              <div className="p-1 rounded-lg bg-secondary/20">
                                  <Calendar className="h-3 w-3 text-secondary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm">{member.consultation_hours}</p>
                              </div>
                          </div>
                      )}
                  </div>
                      {/* Actions */}
                      <div className="flex items-center justify-center gap-2 mt-2 pt-2 border-t border-border/30">
                          <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-8 w-8 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors group"
                              onClick={() => onEdit(member)}
                              title="Edit faculty"
                          >
                              <div className="flex items-center justify-center">
                                  <Pencil className="h-4 w-4 group-hover:scale-110 transition-transform" />
                              </div>
                          </Button>
                          
                          <Dialog>
                              <DialogTrigger asChild>
                                  <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-9 w-9 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors group"
                                      title="Delete faculty"
                                  >
                                      <div className="flex items-center justify-center">
                                          <Trash2 className="h-4 w-4 group-hover:scale-110 transition-transform" />
                                      </div>
                                  </Button>
                              </DialogTrigger>
                              <DialogContent>
                                  <DialogHeader>
                                      <DialogTitle className="flex items-center gap-2 text-destructive">
                                          <Trash2 className="h-5 w-5" />
                                          Delete Faculty Member
                                      </DialogTitle>
                                      <DialogDescription className="pt-4">
                                          <div className="flex items-center gap-3 mb-4 p-3 bg-muted rounded-lg">
                                              <Avatar className="h-12 w-12">
                                                  {member.image_url ? (
                                                      <AvatarImage src={member.image_url} alt={`${member.first_name} ${member.last_name}`} />
                                                  ) : (
                                                      <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                                                          {getFacultyInitials(member.first_name, member.last_name)}
                                                      </AvatarFallback>
                                                  )}
                                              </Avatar>
                                              <div>
                                                  <p className="font-semibold text-foreground">{member.first_name} {member.last_name}</p>
                                                  <p className="text-sm text-muted-foreground">{member.designation}</p>
                                              </div>
                                          </div>
                                          <p className="text-foreground">
                                              Are you sure you want to delete <strong className="font-semibold">{member.first_name} {member.last_name}</strong>? 
                                              This will permanently remove their profile, articles, and associated data.
                                          </p>
                                      </DialogDescription>
                                  </DialogHeader>
                                  <DialogFooter className="gap-2 sm:gap-0">
                                      <DialogClose asChild>
                                          <Button variant="outline" className="w-full sm:w-auto">
                                              Cancel
                                          </Button>
                                      </DialogClose>
                                      <DialogClose asChild>
                                          <Button 
                                              variant="destructive"
                                              className="w-full sm:w-auto"
                                              onClick={() => onDelete(member.id)}
                                          >
                                              Delete Permanently
                                          </Button>
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