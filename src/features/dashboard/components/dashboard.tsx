"use client"

import DashboardStats from "./dashboard-stats"
import DashboardRecentArticles from "./dashboard-recent-articles"
import useDashboardData from "../hooks/useDashboardData"
import { LayoutDashboard, TrendingUp, Activity, Sparkles, Calendar, Briefcase, Users, FileText, ArrowUpRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
export default function Dashboard() {
    const { articles, isLoading } = useDashboardData()
    const router = useRouter()
    
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20">
                        <LayoutDashboard className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold text-foreground">Dashboard Overview</h1>
                        <p className="text-xs text-muted-foreground">Welcome back! Here's what's happening</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="hidden sm:flex gap-2 border-border hover:border-primary/50 hover:text-primary transition-colors"
                    >
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date().toLocaleDateString(
                            "en-US",
                            {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            }
                        )}
                    </Button>
                </div>
            </header>
            
            <main className="flex-1 p-6">
                {/* Quick Stats Summary */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                            <Activity className="h-5 w-5 text-primary" />
                            Quick Overview
                        </h2>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Sparkles className="h-3.5 w-3.5" />
                            <span>Updated just now</span>
                        </div>
                    </div>
                    
                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[...Array(4)].map((_, i) => (
                                <Card key={i} className="border-border/50">
                                    <CardContent className="p-6">
                                        <div className="space-y-3">
                                            <Skeleton className="h-4 w-1/2" />
                                            <Skeleton className="h-8 w-3/4" />
                                            <Skeleton className="h-3 w-full" />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <>
                            <DashboardStats articles={articles}/>
                        </>
                    )}
                </div>

                {/* Recent Activity Section */}
                <div className="grid grid-cols-1 gap-6">
                    <div className="lg:col-span-2">
                        {isLoading ? (
                            <Card className="border-border/50">
                                <CardContent className="p-6">
                                    <div className="space-y-4">
                                        <Skeleton className="h-6 w-1/4" />
                                        {[...Array(3)].map((_, i) => (
                                            <div key={i} className="space-y-2">
                                                <Skeleton className="h-4 w-full" />
                                                <Skeleton className="h-3 w-2/3" />
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ) : (
                            <DashboardRecentArticles articles={articles}/>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}