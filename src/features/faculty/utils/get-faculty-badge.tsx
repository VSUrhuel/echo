import { Badge } from "lucide-react"

export default function GetFacultyStatusBadge(status: string) {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
      case "on-leave":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">On Leave</Badge>
      case "visiting":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Visiting</Badge>
      default:
        return null
    }
}