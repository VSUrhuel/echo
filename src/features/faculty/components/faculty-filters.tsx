"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, User, Award, Briefcase } from "lucide-react"
import { FacultyDesignations } from "@/constants/faculty-designation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { FacultySpecializations } from "@/constants/faculty-speicialization"

interface FacultyFiltersProps {
    searchQuery: string
    setSearchQuery: (query: string) => void
    filterType: string
    setFilterType: (type: string) => void
}

export default function FacultyFilters({
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType
}: FacultyFiltersProps) {
    const [showAdvanced, setShowAdvanced] = useState(false)

    return (
        <Card className="border-border/50 shadow-sm">
            <CardContent className="pt-6">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="relative flex-1 max-w-md group">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-hover:text-primary transition-colors" />
                            <Input
                                placeholder="Search by name, email, or specialization..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 border-border hover:border-primary/50 focus:border-primary transition-colors"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-destructive transition-colors"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <Select value={filterType} onValueChange={setFilterType}>
                                <SelectTrigger className="w-full md:w-[220px] border-border hover:border-primary/50 transition-colors">
                                    <div className="flex items-center gap-2">
                                        <Award className="h-4 w-4 text-muted-foreground" />
                                        <SelectValue placeholder="All Designations" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all" className="flex items-center gap-2">
                                        All Designations
                                    </SelectItem>
                                    {FacultyDesignations.map((designation) => (
                                        <SelectItem key={designation} value={designation} className="flex items-center gap-2">
                                            
                                            {designation}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            
                            <Select value={filterType} onValueChange={setFilterType}>
                                <SelectTrigger className="w-full md:w-[220px] border-border hover:border-primary/50 transition-colors">
                                    <div className="flex items-center gap-2">
                                        <Briefcase />
                                        <SelectValue placeholder="All Specializations" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all" className="flex items-center gap-2">
                                        All Specializations
                                    </SelectItem>
                                    {FacultySpecializations.map((specialization) => (
                                        <SelectItem key={specialization} value={specialization} className="flex items-center gap-2">
                                            {specialization}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setShowAdvanced(!showAdvanced)}
                                className="border border-border hover:border-primary/50"
                            >
                                <Filter className="h-4 w-4" />
                            </Button>
                        </div>

                    </div>
                    
                    {showAdvanced && (
                        <div className="border-t border-border/50 pt-4 mt-2">
                            <div className="flex flex-col md:flex-row md:items-center gap-4">
                                <div className="flex-1">
                                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Faculty Status</label>
                                    <div className="flex items-center gap-2">
                                        {['All', 'Active', 'Inactive', 'On-Leave'].map((status) => (
                                            <Button
                                                key={status}
                                                variant="outline"
                                                size="sm"
                                                className={`text-xs px-3 py-1 rounded-full ${
                                                    filterType === status.toLowerCase().replace(' ', '-')
                                                        ? 'bg-primary text-primary-foreground border-primary'
                                                        : 'border-border hover:border-primary/50'
                                                }`}
                                                onClick={() => setFilterType(status.toLowerCase().replace(' ', '-'))}
                                            >
                                                {status}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                                
                                
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}