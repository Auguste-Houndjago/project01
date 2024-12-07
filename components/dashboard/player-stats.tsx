"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Player } from "@prisma/client";
import { useEffect, useState } from "react";

export function PlayerStats() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [error, setError] = useState<string | null>(null);



  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch("/api/players");

        if (!response.ok) {
          throw new Error(`Erreur: ${response.statusText}`);
        }

        const data = await response.json();
        setPlayers(data);
      } catch (err: any) {
        console.error("Erreur lors de la récupération des joueurs :", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Player Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Games</TableHead>
              <TableHead>Goals</TableHead>
              <TableHead>Assists</TableHead>
              <TableHead>Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {players.map((player, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{player.firstName} {player.lastName} </TableCell>
                <TableCell>{player.position}</TableCell>
                <TableCell>{player.height}</TableCell>
                <TableCell>{player.weight}</TableCell>
                <TableCell>{player.jerseyNumber}</TableCell>
                <TableCell>{player.nationality}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}