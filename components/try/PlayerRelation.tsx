'use client';

import { useState, useEffect } from 'react';
import { Player, Manager, Statistics, Team } from '@prisma/client';

interface PlayerWithRelations extends Player {
  manager: Manager | null;
  statistics: Statistics[];
  team: Team | null;
}

export default function PlayersPage() {
  const [players, setPlayers] = useState<PlayerWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch('/api/players');
        if (!response.ok) throw new Error('Failed to fetch players');
        
        const data = await response.json();
        setPlayers(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  if (loading) return <div>Loading players...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Players</h1>
      {players.map((player) => (
        <div key={player.id} className="mb-4 p-4 border rounded">
          <h2 className="text-xl font-semibold">
            {player.firstName} {player.lastName}
          </h2>
          <div className="text-sm text-gray-600">
            <p>Position: {player.position}</p>
            {player.manager && (
              <p>Manager: {player.manager.firstName} {player.manager.lastName}</p>
            )}
            {player.team && (
              <p>Team: {player.team.name}</p>
            )}
            {player.statistics && player.statistics.length > 0 && (
              <div className="mt-2">
                <h3 className="font-medium">Recent Statistics</h3>
                <p>Games Played: {player.statistics[0].gamesPlayed}</p>
                <p>Goals: {player.statistics[0].goals}</p>
                <p>Assists: {player.statistics[0].assists}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}