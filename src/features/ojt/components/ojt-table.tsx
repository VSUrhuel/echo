"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableRow , TableHeader} from "@/components/ui/table"
import { Partner } from "@/types"
import { ExternalLink, MapPin, Pencil, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog"

interface OjtTableProps {
    paginatedLinkages: Partner[],
    openEditDialog: (data: Partner) => void,
    handleDelete: (id: number) => void
 }

export default function OjtTable({paginatedLinkages, openEditDialog, handleDelete}: OjtTableProps) {
    return (
        <Card>
            <CardHeader>
              <CardTitle>Partner Companies</CardTitle>
              <CardDescription>Manage OJT partner companies and available slots</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead className="text-center">Slots</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedLinkages.map((linkage) => (
                    <TableRow key={linkage.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{linkage.name}</span>
                          {linkage.website_url && (
                            <a
                              href={linkage.website_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:text-primary/80"
                            >
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">{linkage.type}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {linkage.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p className="font-medium">Company Email</p>
                          <p className="text-muted-foreground">{linkage.contact_email}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="font-semibold text-primary">{linkage.available_slot}</span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            linkage.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {linkage.is_active ? "Active" : "Inactive"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => openEditDialog(linkage)}>
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
                                <DialogTitle>Delete Partner</DialogTitle>
                                <DialogDescription>
                                  Are you sure you want to delete <strong>{linkage.name}</strong>? This action cannot be undone.
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <DialogClose asChild onClick={() => handleDelete(linkage.id)}>
                                  <Button variant="destructive">Delete</Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {paginatedLinkages.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">No company linkages found.</div>
              )}
            </CardContent>
            </Card>
    )
}
