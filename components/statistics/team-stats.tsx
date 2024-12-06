"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TeamPerformanceChart } from "@/components/statistics/team-performance-chart"

export function TeamStats() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Performance de l&apos;Équipe</CardTitle>
          <CardDescription>
            Résultats des 5 derniers matchs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TeamPerformanceChart />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Statistiques Globales</CardTitle>
          <CardDescription>
            Saison en cours
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Matchs joués</p>
              <p className="text-2xl font-bold">0</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Victoires</p>
              <p className="text-2xl font-bold">0</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Nuls</p>
              <p className="text-2xl font-bold">0</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Défaites</p>
              <p className="text-2xl font-bold">0</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}