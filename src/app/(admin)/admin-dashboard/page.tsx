import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Eye } from "lucide-react"

const stats = [
  {
    title: "Total Articles",
    value: "24",
    description: "+3 this month",
    icon: FileText,
  },
  {
    title: "Total Views",
    value: "12,459",
    description: "+18% from last month",
    icon: Eye,
  },
]


const recentArticles = [
  {
    title: "DevCom Students Win Regional Documentary Competition",
    status: "Published",
    date: "Dec 15, 2024",
    views: 456,
  },
  {
    title: "Community Radio Workshop Series Launched",
    status: "Published",
    date: "Dec 10, 2024",
    views: 312,
  },
  {
    title: "Research Paper Published in International Journal",
    status: "Published",
    date: "Dec 5, 2024",
    views: 289,
  },
  {
    title: "Upcoming: DevCom Week 2025 Preparations",
    status: "Draft",
    date: "Dec 18, 2024",
    views: 0,
  },
]

export default function AdminPage() {
    return (
        <div className="flex flex-col">
              {/* Header */}
              <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-border bg-background px-6">
                <h1 className="text-lg font-semibold text-foreground">Dashboard</h1>
              </header>
        
              {/* Content */}
              <main className="flex-1 p-6">
                <div className="space-y-6">
                  {/* Stats Grid */}
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    {stats.map((stat) => (
                      <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                          <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                          <p className="text-xs text-muted-foreground">{stat.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
        
                  {/* Recent Articles */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Articles</CardTitle>
                      <CardDescription>Your latest published and draft articles</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentArticles.map((article, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between py-3 border-b border-border last:border-0"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-foreground truncate">{article.title}</p>
                              <p className="text-sm text-muted-foreground">{article.date}</p>
                            </div>
                            <div className="flex items-center gap-4">
                              <span
                                className={`text-xs font-medium px-2 py-1 rounded-full ${
                                  article.status === "Published"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-yellow-100 text-yellow-700"
                                }`}
                              >
                                {article.status}
                              </span>
                              <span className="text-sm text-muted-foreground w-16 text-right">{article.views} views</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </main>
            </div>
    )
}
