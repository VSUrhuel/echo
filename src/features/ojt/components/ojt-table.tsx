"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableRow , TableHeader} from "@/components/ui/table"
import { Partner } from "@/types"
import { ExternalLink, MapPin, Pencil, Trash2, Building2, Mail, Phone, Globe, Calendar, Award, Briefcase, CheckCircle, XCircle } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface OjtTableProps {
    paginatedLinkages: Partner[],
    openEditDialog: (data: Partner) => void,
    handleDelete: (id: number) => void
 }

export default function OjtTable({paginatedLinkages, openEditDialog, handleDelete}: OjtTableProps) {
    const getCompanyInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .substring(0, 2)
    }

    return (
        <Card className="border-border/50 shadow-sm overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/5 via-transparent to-primary/5 border-b border-border/50">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-xl font-bold text-foreground">Partner Companies</CardTitle>
                        <CardDescription>Manage OJT partner companies and available slots</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="border-primary/30 text-primary">
                            <Briefcase className="h-3 w-3 mr-1" />
                            {paginatedLinkages.length} Companies
                        </Badge>
                    </div>
                </div>
            </CardHeader>
            
            <CardContent className="p-0">
                {paginatedLinkages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                        <div className="p-4 rounded-full bg-muted mb-4">
                            <Building2 className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">No Partners Found</h3>
                        <p className="text-muted-foreground mb-6 max-w-sm">
                            Start building your industry network by adding your first partner company
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto p-4">
                        <Table>
                            <TableHeader className="bg-muted/30">
                                <TableRow className="hover:bg-transparent">
                                    <TableHead className="font-semibold text-muted-foreground">Company</TableHead>
                                    <TableHead className="font-semibold text-muted-foreground">Industry</TableHead>
                                    <TableHead className="font-semibold text-muted-foreground">Location</TableHead>
                                    <TableHead className="font-semibold text-muted-foreground">Contact</TableHead>
                                    <TableHead className="font-semibold text-muted-foreground text-center">Slots</TableHead>
                                    <TableHead className="font-semibold text-muted-foreground">Status</TableHead>
                                    <TableHead className="font-semibold text-muted-foreground text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="">
                                {paginatedLinkages.map((linkage) => (
                                    <TableRow 
                                        key={linkage.id} 
                                        className="group hover:bg-muted/20 transition-colors border-b border-border/50 last:border-0 "
                                    >
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-10 w-10 border border-border">
                                                    {linkage.logo_url ? (
                                                        <AvatarImage src={linkage.logo_url} alt={linkage.name} />
                                                    ) : (
                                                        <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20 text-primary font-semibold truncate max-w-[200px]">
                                                            {getCompanyInitials(linkage.name)}
                                                        </AvatarFallback>
                                                    )}
                                                </Avatar>
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-semibold text-foreground truncate group-hover:text-primary transition-colors max-w-[200px]">
                                                            {linkage.name}
                                                        </p>
                                                        {linkage.website_url && (
                                                            <a
                                                                href={linkage.website_url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-muted-foreground hover:text-primary transition-colors"
                                                                title="Visit website"
                                                            >
                                                                <Globe className="h-3.5 w-3.5" />
                                                            </a>
                                                        )}
                                                    </div>
                                                    {linkage.description && (
                                                        <p className="text-xs text-muted-foreground truncate mt-1 truncate max-w-[200px]">
                                                            {linkage.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className="font-medium">
                                                <Briefcase className="h-3 w-3 mr-1" />
                                                {linkage.type}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-sm">
                                                <MapPin className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                                                <span className="truncate max-w-[100px]">{linkage.location}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="space-y-1">
                                                {linkage.contact_email && (
                                                    <div className="flex items-center gap-2">
                                                        <Mail className="h-3 w-3 text-muted-foreground" />
                                                        <a 
                                                            href={`mailto:${linkage.contact_email}`}
                                                            className="text-xs text-primary hover:underline truncate max-w-[100px]"
                                                        >
                                                            {linkage.contact_email}
                                                        </a>
                                                    </div>
                                                )}
                                                
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <div className="flex flex-col items-center">
                                                {linkage.available_slot ? <div className={`
                                                    h-10 w-10 rounded-full flex items-center justify-center font-bold text-lg
                                                    ${linkage.available_slot > 5
                                                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                                                        : linkage?.available_slot > 0
                                                            ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                                    }
                                                `}>
                                                    {linkage.available_slot}
                                                </div> : <div className="h-10 w-10 rounded-full flex items-center justify-center font-bold text-lg bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400">N/A</div>}
                                                <span className="text-xs text-muted-foreground mt-1">Slots</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                {linkage.is_active ? (
                                                    <Badge className="bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 border-0">
                                                        <CheckCircle className="h-3 w-3 mr-1" />
                                                        Active
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="outline" className="border-gray-300 text-gray-600">
                                                        <XCircle className="h-3 w-3 mr-1" />
                                                        Inactive
                                                    </Badge>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full"
                                                    onClick={() => openEditDialog(linkage)}
                                                    title="Edit partner"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full"
                                                            title="Delete partner"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle className="flex items-center gap-2 text-destructive">
                                                                <Trash2 className="h-5 w-5" />
                                                                Delete Partner Company
                                                            </DialogTitle>
                                                            <DialogDescription className="pt-4">
                                                                <div className="flex items-center gap-3 mb-4 p-3 bg-muted rounded-lg">
                                                                    <Avatar className="h-10 w-10">
                                                                        {linkage.logo_url ? (
                                                                            <AvatarImage src={linkage.logo_url} alt={linkage.name} />
                                                                        ) : (
                                                                            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20 text-primary font-semibold">
                                                                                {getCompanyInitials(linkage.name)}
                                                                            </AvatarFallback>
                                                                        )}
                                                                    </Avatar>
                                                                    <div>
                                                                        <p className="font-semibold text-foreground">{linkage.name}</p>
                                                                        <p className="text-sm text-muted-foreground">{linkage.type} • {linkage.location}</p>
                                                                    </div>
                                                                </div>
                                                                <p className="text-foreground">
                                                                    Are you sure you want to delete <strong className="font-semibold">{linkage.name}</strong>? 
                                                                    This will permanently remove all associated data including internship records.
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
                                                                    onClick={() => handleDelete(linkage.id)}
                                                                >
                                                                    Delete Permanently
                                                                </Button>
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
                    </div>
                )}
            </CardContent>
        </Card>
    )
}