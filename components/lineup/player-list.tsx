"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Position } from "@prisma/client";


interface Player {
  id: string;
  name: string;
  position: Position;
  number: number;
}


const AVAILABLE_PLAYERS: Player[] = [
  { id: "1", name: "Komi Etru", position: "GK", number: 1 },
  { id: "2", name: "Gigi Tacleur", position: "DF", number: 4 },
  { id: "3", name: "casse jambe", position: "DF", number: 5 },
  { id: "4", name: "messie mesiano", position: "MF", number: 8 },
  { id: "5", name: "Robert Davis", position: "FW", number: 9 },
  { id: "6", name: "Michael robert", position: "MF", number: 10 },
  { id: "7", name: "Daniel Taylor", position: "DF", number: 2 },
  { id: "8", name: "agbota Anderson", position: "FW", number: 11 },
  { id: "9", name: "prepre special", position: "MF", number: 6 },
  { id: "10", name: "Thomas Garcia", position: "DF", number: 3 },
  { id: "11", name: "miltraillette petit", position: "GK", number: 13 },
];

interface PlayerListProps {
  onPlayerSelect: (player: Player) => void;
  selectedPlayers: Player[];
}

export function PlayerList({ onPlayerSelect, selectedPlayers }: PlayerListProps) {
  const isPlayerSelected = (playerId: string) => 
    selectedPlayers.some(p => p.id === playerId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Players</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-2">
            {AVAILABLE_PLAYERS.map((player) => (
              <div
                key={player.id}
                className="flex items-center justify-between p-2 border rounded hover:bg-accent"
              >
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{player.number}</Badge>
                  <div>
                    <p className="font-medium">{player.name}</p>
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