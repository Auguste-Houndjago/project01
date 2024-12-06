"use client"

import { useState } from "react"
import { PlayerCard } from "@/components/players/player-card"
import { PlayerFilters } from "@/components/players/player-filters"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { AddPlayerDialog } from "@/components/players/add-player-dialog"
import Loader from "@/components/ux/FootLoader"

export const players=
  {
    id: "1",
    firstName: "joeur ",
    lastName: "special",
    position: "GK",
    jerseyNumber: 2,
    profileImage: "",
    nationality: "togolaise"
  }



export default function PlayersPage() {
  const [showAddDialog, setShowAddDialog] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Joueurs</h1>
        <Button onClick={() => setShowAddDialog(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Ajouter un joueur
        </Button>
      </div>

      <PlayerFilters />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Les cartes des joueurs seront mappées ici */}
        <PlayerCard player={players}/>
      </div>

   
<Loader/>
      <AddPlayerDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </div>
  )
}