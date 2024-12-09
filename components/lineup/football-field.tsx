"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Position } from "@prisma/client";
import { Users } from "lucide-react";

interface Player {
  id: string;
  firstName: string;
  position: Position;
  jerseyNumber: number;
}

interface FootballFieldProps {
  formation: string;
  players: Player[];
  positions: { [key: string]: { x: number; y: number } };
  onPlayerDrop: (playerId: string, position: { x: number; y: number }) => void;
}

// Opponent team mock data
const opponentPlayers = [
  { id: 'opp1', name: 'Opponent 1', position: 'GK', jerseyNumber: 1 },
  { id: 'opp2', name: 'Opponent 2', position: 'DF', jerseyNumber: 2 },
  { id: 'opp3', name: 'Opponent 3', position: 'DF', jerseyNumber: 3 },
  { id: 'opp4', name: 'Opponent 4', position: 'DF', jerseyNumber: 4 },
  { id: 'opp5', name: 'Opponent 5', position: 'DF', jerseyNumber: 5 },
  { id: 'opp6', name: 'Opponent 6', position: 'MF', jerseyNumber: 6 },
  { id: 'opp7', name: 'Opponent 7', position: 'MF', jerseyNumber: 7 },
  { id: 'opp8', name: 'Opponent 8', position: 'MF', jerseyNumber: 8 },
  { id: 'opp9', name: 'Opponent 9', position: 'FW', jerseyNumber: 9 },
  { id: 'opp10', name: 'Opponent 10', position: 'FW', jerseyNumber: 10 },
  { id: 'opp11', name: 'Opponent 11', position: 'FW', jerseyNumber: 11 },
];

export function FootballField({ formation, players, positions, onPlayerDrop }: FootballFieldProps) {
  const [showOpponents, setShowOpponents] = useState(false);
  const [opponentPositions, setOpponentPositions] = useState<{ [key: string]: { x: number; y: number } }>({});

  const defaultPositions = useMemo(() => {
    const [defenders, midfielders, forwards] = formation.split("-").map(Number);
    const positions: { [key: string]: { x: number; y: number }[] } = {
      GK: [{ x: 50, y: 90 }],
      DF: Array.from({ length: defenders }, (_, i) => ({
        x: 20 + (60 / (defenders + 1)) * (i + 1),
        y: 70
      })),
      MF: Array.from({ length: midfielders }, (_, i) => ({
        x: 20 + (60 / (midfielders + 1)) * (i + 1),
        y: 45
      })),
      FW: Array.from({ length: forwards }, (_, i) => ({
        x: 20 + (60 / (forwards + 1)) * (i + 1),
        y: 20
      }))
    };
    return positions;
  }, [formation]);

  const defaultOpponentPositions = useMemo(() => {
    const [defenders, midfielders, forwards] = "4-3-3".split("-").map(Number);
    const positions: { [key: string]: { x: number; y: number }[] } = {
      GK: [{ x: 50, y: 10 }],
      DF: Array.from({ length: defenders }, (_, i) => ({
        x: 20 + (60 / (defenders + 1)) * (i + 1),
        y: 30
      })),
      MF: Array.from({ length: midfielders }, (_, i) => ({
        x: 20 + (60 / (midfielders + 1)) * (i + 1),
        y: 55
      })),
      FW: Array.from({ length: forwards }, (_, i) => ({
        x: 20 + (60 / (forwards + 1)) * (i + 1),
        y: 80
      }))
    };
    return positions;
  }, []);

  const handleDragStart = (e: React.DragEvent, playerId: string) => {
    e.dataTransfer.setData("playerId", playerId);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const playerId = e.dataTransfer.getData("playerId");
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    if (playerId.startsWith('opp')) {
      setOpponentPositions(prev => ({
        ...prev,
        [playerId]: { x, y }
      }));
    } else {
      onPlayerDrop(playerId, { x, y });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          variant="outline"
          onClick={() => setShowOpponents(!showOpponents)}
          className="flex items-center gap-2"
        >
          <Users className="h-4 w-4" />
          {showOpponents ? "Hide Opponents" : "Show Opponents"}
        </Button>
      </div>
      
      <div 
        className="relative w-full h-[750px] rounded-lg overflow-hidden shadow-xl"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        style={{
          background: 'linear-gradient(to bottom, #2d8a2d, #1f6e1f)',
        }}
      >
        {/* Field texture */}
        <div className="absolute inset-0" 
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 2px, transparent 2px, transparent 40px)',
          }}
        />

        {/* Field markings */}
        <div className="absolute inset-0 border-4 border-white/30" />
        <div className="absolute left-0 right-0 top-1/2 h-1 bg-white/30" />
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white/30" />
        
        {/* Center circle */}
        <div className="absolute left-1/2 top-1/2 w-[150px] h-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/30" />
        <div className="absolute left-1/2 top-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/30" />
        
        {/* Penalty areas */}
        <div className="absolute left-1/2 bottom-0 w-[220px] h-[66px] -translate-x-1/2 border-2 border-white/30" />
        <div className="absolute left-1/2 top-0 w-[220px] h-[66px] -translate-x-1/2 border-2 border-white/30" />
        
        {/* Goal areas */}
        <div className="absolute left-1/2 bottom-0 w-[100px] h-[30px] -translate-x-1/2 border-2 border-white/30" />
        <div className="absolute left-1/2 top-0 w-[100px] h-[30px] -translate-x-1/2 border-2 border-white/30" />

        {/* Players */}
        {players.map((player) => {
          const position = positions[player.id] || defaultPositions[player.position]?.[0];
          if (!position) return null;

          return (
            <div
              key={player.id}
              draggable
              onDragStart={(e) => handleDragStart(e, player.id)}
              className="absolute cursor-pointer"
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                transform: "translate(-50%, -50%)"
              }}
            >
              <Badge 
                className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-primary cursor-pointer shadow-lg transition-transform hover:scale-110"
                variant="secondary"
              >
                {player.jerseyNumber}
              </Badge>
            </div>
          );
        })}

        {/* Opponent Players */}
        {showOpponents && opponentPlayers.map((player) => {
          const position = opponentPositions[player.id] || defaultOpponentPositions[player.position]?.[0];
          if (!position) return null;

          return (
            <div
              key={player.id}
              draggable
              onDragStart={(e) => handleDragStart(e, player.id)}
              className="absolute cursor-pointer"
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                transform: "translate(-50%, -50%)"
              }}
            >
              <Badge 
                className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-destructive cursor-pointer shadow-lg transition-transform hover:scale-110"
                variant="destructive"
              >
                {player.jerseyNumber}
              </Badge>
            </div>
          );
        })}
      </div>
    </div>
  );
}