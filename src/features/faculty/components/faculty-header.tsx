"use client"
import { Button } from "@/components/ui/button"
import { Plus, Users, Sparkles, GraduationCap } from "lucide-react"
interface FacultyHeaderProps {
    setIsAddDialogOpen: (open: boolean) => void
    resetForm: () => void
}

export default function FacultyHeader({
    setIsAddDialogOpen, 
    resetForm, 
}: FacultyHeaderProps) {
    return (
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 shadow-sm">
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20">
                    <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                    <h1 className="text-lg font-semibold text-foreground">VSU DevCom Faculty</h1>
                    <p className="text-xs text-muted-foreground">Academic staff and administration</p>
                </div>
            </div>
            
            <Button 
                className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:from-primary/90 hover:to-secondary/90 shadow-md hover:shadow-lg transition-all group"
                onClick={() => {
                    resetForm()
                    setIsAddDialogOpen(true)
                }}
            >
                <div className="flex items-center gap-2">
                    <div className="p-1 rounded-md bg-white/20 group-hover:bg-white/30 transition-colors">
                        <Plus className="h-4 w-4" />
                    </div>
                    <span>Add Faculty</span>
                    <Sparkles className="h-3.5 w-3.5 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
            </Button>
        </header>
    )
}