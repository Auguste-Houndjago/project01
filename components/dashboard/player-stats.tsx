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
import { Player, Statistics } from "@prisma/client";
import { useEffect, useState } from "react";

export function PlayerStats() {
  const [players, setPlayers] = useState<Player[]>([]);

  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [error, setError] = useState<string | null>(null);
const [playerId, setplayerId] = useState();
const [stats, setstats] = useState<Statistics>();

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

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`/api/players/${playerId}/statistics`);

        if (!response.ok) {
          throw new Error(`Erreur: ${response.statusText}`);
        }

        const data = await response.json();
        setstats(data);
      } catch (err: any) {
        console.error("Erreur lors de la récupération des joueurs :", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [playerId]);

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
              <TableHead>nationality</TableHead>
              <TableHead>Games</TableHead>
              <TableHead>Goals</TableHead>
              <TableHead>Assists</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {players.map((player, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{player.firstName} {player.lastName} </TableCell>
                <TableCell>{player.position}</TableCell>
                <TableCell>{player.nationality}</TableCell>
                <TableCell>{player.height}   </TableCell>
                <TableCell>{stats?.goals}</TableCell>
                <TableCell>{stats?.assists}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}