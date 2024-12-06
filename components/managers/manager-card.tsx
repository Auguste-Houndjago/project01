"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User } from "lucide-react"

interface ManagerCardProps {
  manager: {
    id: string
    firstName: string
    lastName: string
    nationality: string
    licenseLevel?: string
    profileImage?: string
    team?: {
      name: string
    }
  }
}

export function ManagerCard({ manager }: ManagerCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={manager.profileImage} alt={`${manager.firstName} ${manager.lastName}`} />
          <AvatarFallback>
            <User className="h-8 w-8" />
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-lg">
            {manager.firstName} {manager.lastName}
          </h3>
          {manager.licenseLevel && (
            <Badge variant="outline">{manager.licenseLevel}</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">
          Nationalité: {manager.nationality}
        </p>
        {manager.team && (
          <p className="text-sm">
            Équipe: <span className="font-medium">{manager.team.name}</span>
          </p>
        )}
      </CardContent>
    </Card>
  )
}