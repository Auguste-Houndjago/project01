"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

import { FootballField } from "./football-field";
import { PlayerList } from "./player-list";
import { Position } from "@prisma/client";

interface Player {
  id: string;
  firstName: string;
  position: Position;
  jerseyNumber: number;
}

const FORMATIONS = {
  "4-3-3": { defenders: 4, midfielders: 3, forwards: 3 },
  "4-4-2": { defenders: 4, midfielders: 4, forwards: 2 },
  "3-5-2": { defenders: 3, midfielders: 5, forwards: 2 },
  "4-2-3-1": { defenders: 4, midfielders: 5, forwards: 1 },
};

export function LineupBuilder() {
  const [selectedFormation, setSelectedFormation] = useState("4-3-3");
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [fieldPositions, setFieldPositions] = useState<{ [key: string]: { x: number; y: number } }>({});

  const handlePlayerDrop = (playerId: string, position: { x: number; y: number }) => {
    setFieldPositions((prev) => ({
      ...prev,
      [playerId]: position,
    }));
  };

  const handlePlayerSelect = (player: Player) => {
    if (selectedPlayers.length < 11 && !selectedPlayers.find(p => p.id === player.id)) {
      setSelectedPlayers([...selectedPlayers, player]);
    }
  };

  const handlePlayerRemove = (playerId: string) => {
    setSelectedPlayers(selectedPlayers.filter(p => p.id !== playerId));
    const newPositions = { ...fieldPositions };
    delete newPositions[playerId];
    setFieldPositions(newPositions);
  };

  return (
    <div className="grid gap-6 md:grid-cols-[300px_1fr]">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Formation</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedFormation} onValueChange={setSelectedFormation}>
              <SelectTrigger>
                <SelectValue placeholder="Select formation" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(FORMATIONS).map((formation) => (
                  <SelectItem key={formation} value={formation}>
                    {formation}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex justify-center text-base font-bold ">Selected Players <span className="text-red-400 ml-2">  ({selectedPlayers.length}/11)</span> </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-2">
                {selectedPlayers.map((player) => (
                  <div key={player.id} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{player.jerseyNumber}</Badge>
                      <span>{player.firstName}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handlePlayerRemove(player.id)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <PlayerList onPlayerSelect={handlePlayerSelect} selectedPlayers={selectedPlayers} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Field Setup</CardTitle>
        </CardHeader>
        <CardContent className="xl:px-10 ">
          <FootballField 
            formation={selectedFormation}
            players={selectedPlayers}
            positions={fieldPositions}
            onPlayerDrop={handlePlayerDrop}
          />
        </CardContent>
      </Card>
    </div>
  );
}