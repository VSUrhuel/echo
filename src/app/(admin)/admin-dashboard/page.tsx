import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Dashboard from "@/features/dashboard/components/dashboard"
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
        <Dashboard />
    )
}
