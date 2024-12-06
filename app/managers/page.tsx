"use client"

import { useState } from "react"
import { ManagerCard } from "@/components/managers/manager-card"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { AddManagerDialog } from "@/components/managers/add-manager-dialog"

export default function ManagersPage() {
  const [showAddDialog, setShowAddDialog] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Managers</h1>
        <Button onClick={() => setShowAddDialog(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Ajouter un manager
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Les cartes des managers seront mappées ici */}
      </div>

      <AddManagerDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </div>
  )
}