"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Position } from "@prisma/client";

interface Player {
  id: string;
  firstName: string;
  position: Position;
  jerseyNumber: number;
}

interface PlayerListProps {
  onPlayerSelect: (player: Player) => void;
  selectedPlayers: Player[];
}

export function PlayerList({ onPlayerSelect, selectedPlayers }: PlayerListProps) {
  const [players, setPlayers] = useState<Player[]>([]); 
  const isPlayerSelected = (playerId: string) =>
    selectedPlayers.some((p) => p.id === playerId);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/api/players`); 
        const data = await response.json();
        setPlayers(data); 
      } catch (error) {
        console.error("Erreur lors de la récupération des joueurs :", error);
      }
    };

    fetchPlayers();
  }, []); 

  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Players</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-2">
            {players.map((player) => (
              <div
                key={player.id}
                className="flex items-center justify-between p-2 border rounded hover:bg-accent"
              >
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{player.jerseyNumber}</Badge>
                  <div>
                    <p className="font-medium">{player.firstName}</p>
                    <p className="text-sm text-muted-foreground">{player.position}</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => onPlayerSelect(player)}
                  disabled={isPlayerSelected(player.id)}
                >
                  {isPlayerSelected(player.id) ? "Selected" : "Select"}
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
