"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Shield } from "lucide-react"

interface TeamCardProps {
  team: {
    id: string
    name: string
    logo?: string
    country: string
    league: string
    stadiumName?: string
    founded?: number
  }
}

export function TeamCard({ team }: TeamCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={team.logo} alt={team.name} />
          <AvatarFallback>
            <Shield className="h-8 w-8" />
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-lg">{team.name}</h3>
          <p className="text-sm text-muted-foreground">{team.league}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm">
          <span className="font-medium">Pays:</span> {team.country}
        </p>
        {team.stadiumName && (
          <p className="text-sm">
            <span className="font-medium">Stade:</span> {team.stadiumName}
          </p>
        )}
        {team.founded && (
          <p className="text-sm">
            <span className="font-medium">Fondé en:</span> {team.founded}
          </p>
        )}
      </CardContent>
    </Card>
  )
}