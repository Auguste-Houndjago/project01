"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function PlayerStats() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Statistiques des Joueurs</CardTitle>
          <CardDescription>
            Vue d&apos;ensemble des performances individuelles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Joueur</TableHead>
                <TableHead>Matchs</TableHead>
                <TableHead>Buts</TableHead>
                <TableHead>Passes D.</TableHead>
                <TableHead>Cartons J.</TableHead>
                <TableHead>Cartons R.</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Les données des joueurs seront mappées ici */}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}