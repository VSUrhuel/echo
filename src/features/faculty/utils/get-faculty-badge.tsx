import { CheckCircle, Calendar, Globe, Clock, UserCheck, UserX } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function GetFacultyStatusBadge(status: string) {
    switch (status) {
      case "active":
        return (
          <Badge 
            variant="outline" 
            className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800"
          >
            <CheckCircle className="mr-1 h-3 w-3" />
            Active
          </Badge>
        )
      case "on-leave":
        return (
          <Badge 
            variant="outline" 
            className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800"
          >
            <Calendar className="mr-1 h-3 w-3" />
            On Leave
          </Badge>
        )
      case "visiting":
        return (
          <Badge 
            variant="outline" 
            className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800"
          >
            <Globe className="mr-1 h-3 w-3" />
            Visiting
          </Badge>
        )
      case "part-time":
        return (
          <Badge 
            variant="outline" 
            className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-400 dark:border-purple-800"
          >
            <Clock className="mr-1 h-3 w-3" />
            Part-time
          </Badge>
        )
      case "inactive":
        return (
          <Badge 
            variant="outline" 
            className="bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-950/30 dark:text-gray-400 dark:border-gray-800"
          >
            <UserX className="mr-1 h-3 w-3" />
            Inactive
          </Badge>
        )
      default:
        return (
          <Badge 
            variant="outline" 
            className="bg-primary/10 text-primary border-primary/20"
          >
            <UserCheck className="mr-1 h-3 w-3" />
            Active
          </Badge>
        )
    }
}