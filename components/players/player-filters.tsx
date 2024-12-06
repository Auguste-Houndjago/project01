"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

export function PlayerFilters() {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Input
        placeholder="Rechercher un joueur..."
        className="sm:max-w-[300px]"
      />
      <Select>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Position" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="GK">Gardien</SelectItem>
          <SelectItem value="DF">Défenseur</SelectItem>
          <SelectItem value="MF">Milieu</SelectItem>
          <SelectItem value="FW">Attaquant</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Nationalité" />
        </SelectTrigger>
        <SelectContent>
          {/* Les nationalités seront ajoutées dynamiquement */}
        </SelectContent>
      </Select>
    </div>
  )
}