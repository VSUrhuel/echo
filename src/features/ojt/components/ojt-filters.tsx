"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PartnerTypes } from "@/constants/ojt-type"
import { Search, Filter, Briefcase, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function OjtFilters({
    searchQuery, 
    setSearchQuery, 
    filterType, 
    setFilterType
}: {
    searchQuery: string, 
    setSearchQuery: (query: string) => void, 
    filterType: string, 
    setFilterType: (type: string) => void
}) {
    const [showAdvanced, setShowAdvanced] = useState(false)

    return (
        <Card className="border-border/50 shadow-sm">
            <CardContent className="pt-6">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="relative flex-1 max-w-md group">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-hover:text-primary transition-colors" />
                            <Input
                                placeholder="Search companies by name, location, or type..."
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
                        
                        <div className="flex items-center gap-2 truncate">
                            <Select value={filterType} onValueChange={setFilterType}>
                                <SelectTrigger className="w-full md:w-[200px] border-border hover:border-primary/50 transition-colors">
                                    <div className="flex items-center gap-2">
                                        <Filter className="h-4 w-4 text-muted-foreground" />
                                        <SelectValue placeholder="Filter by type" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent className="w-full max-w-full">
                                    <SelectItem value="all" className="w-full">
                                        All Types
                                    </SelectItem>
                                    {PartnerTypes.map((type) => (
                                        <SelectItem key={type} value={type} className="w-full truncate text-truncate">
                                            {type}
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
                                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Company Status</label>
                                    <div className="flex items-center gap-2">
                                        {['All', 'Active', 'Inactive'].map((status) => (
                                            <Button
                                                key={status}
                                                variant="outline"
                                                size="sm"
                                                className={`text-xs px-3 py-1 rounded-full ${
                                                    filterType === status.toLowerCase()
                                                        ? 'bg-primary text-primary-foreground border-primary'
                                                        : 'border-border hover:border-primary/50'
                                                }`}
                                                onClick={() => setFilterType(status.toLowerCase())}
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