"use client"

import { useState } from "react"
import { TeamCard } from "@/components/teams/team-card"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { AddTeamDialog } from "@/components/teams/add-team-dialog"
import Link from "next/link"

export default function TeamsPage() {
  const [showAddDialog, setShowAddDialog] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Équipes</h1>
        <Button onClick={() => setShowAddDialog(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Ajouter une équipe
        </Button>
      </div>

<Link href={"/managers/dashboard"} className=" flex justify-end">
<Button className="border-2 ">
strategie
</Button>

</Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Les cartes des équipes seront mappées ici */}
      </div>

      <AddTeamDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </div>
  )
}