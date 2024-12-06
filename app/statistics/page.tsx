"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TeamStats } from "@/components/statistics/team-stats"
import { PlayerStats } from "@/components/statistics/player-stats"

export default function StatisticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Statistiques</h1>
      
      <Tabs defaultValue="team">
        <TabsList>
          <TabsTrigger value="team">Équipe</TabsTrigger>
          <TabsTrigger value="players">Joueurs</TabsTrigger>
        </TabsList>
        <TabsContent value="team">
          <TeamStats />
        </TabsContent>
        <TabsContent value="players">
          <PlayerStats />
        </TabsContent>
      </Tabs>
    </div>
  )
}