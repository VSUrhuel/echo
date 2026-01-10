import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Target, Users, Briefcase, TrendingUp, CheckCircle } from "lucide-react"
import { OjtStats } from "../types"
import { Badge } from "@/components/ui/badge"

export default function OjtStatCards({stats}: {stats: OjtStats}) {
    return (
        <div className="grid gap-6 md:grid-cols-3">
            <Card className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border-primary/20 hover:border-primary/40 transition-all duration-300 group">
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-semibold uppercase tracking-wider text-primary">
                            Total Partners
                        </CardTitle>
                        <div className="p-2 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors">
                            <Building2 className="h-4 w-4 text-primary" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex items-baseline gap-2">
                        <div className="text-3xl font-bold text-foreground">{stats.total}</div>
                        <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                            
                        </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Company partnerships established</p>
                </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-secondary/5 via-secondary/10 to-secondary/5 border-secondary/20 hover:border-secondary/40 transition-all duration-300 group">
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-semibold uppercase tracking-wider text-secondary">
                            Active Partners
                        </CardTitle>
                        <div className="p-2 rounded-lg bg-secondary/20 group-hover:bg-secondary/30 transition-colors">
                            <CheckCircle className="h-4 w-4 text-secondary" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex items-baseline gap-2">
                        <div className="text-3xl font-bold text-foreground">{stats.active}</div>
                        <div className="text-sm font-medium text-green-600">
                            {stats.total > 0 ? `${Math.round((stats.active / stats.total) * 100)}% active` : '0%'}
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Currently accepting interns</p>
                </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-accent/5 via-accent/10 to-accent/5 border-accent/20 hover:border-accent/40 transition-all duration-300 group">
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-semibold uppercase tracking-wider text-accent-foreground">
                            Available Slots
                        </CardTitle>
                        <div className="p-2 rounded-lg bg-accent/20 group-hover:bg-accent/30 transition-colors">
                            <Users className="h-4 w-4 text-accent-foreground" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex items-baseline gap-2">
                        <div className="text-3xl font-bold text-foreground">{stats.totalSlots}</div>
                        <Badge variant="outline" className="text-xs border-accent/30 text-accent-foreground">
                            
                        </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Open internship positions</p>
                </CardContent>
            </Card>
        </div>
    )
}