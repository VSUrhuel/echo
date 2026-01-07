"use client"

import DashboardStats from "./dashboard-stats"
import DashboardRecentArticles from "./dashboard-recent-articles"
import useDashboardData from "../hooks/useDashboardData"

export default function Dashboard() {
    const {articles, isLoading} = useDashboardData()
    return (
        <div className="flex flex-col">
             <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-border bg-background px-6">
                <h1 className="text-lg font-semibold text-foreground">Dashboard</h1>
              </header>
              <main className="flex-1 p-6 gap-4">
            <DashboardStats articles={articles}/>
            <DashboardRecentArticles articles={articles}/>
            </main>
        </div>
    )
}