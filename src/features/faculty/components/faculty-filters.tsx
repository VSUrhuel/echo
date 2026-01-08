"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { FacultyDesignations } from "@/constants/faculty-designation"

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
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder="Search faculty..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                />
            </div>
            
            <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="All Designations" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Designations</SelectItem>
                    {FacultyDesignations.map((designation) => (
                        <SelectItem key={designation} value={designation}>
                            {designation}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
