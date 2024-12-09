'use client';

import { useEffect, useState } from "react";
import { Player, Manager } from "@prisma/client"; // Import des types Prisma

// Interface pour structurer les données
interface PlayerInfo {
  player: Player;
  manager: Manager | null;
}

const ApiTry = () => {
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlayerInfo = async () => {
      try {
        const response = await fetch("/api/playertest");
        if (!response.ok) {
          throw new Error("Failed to fetch player data");
        }
        const data: PlayerInfo[] = await response.json();
        setPlayerInfo(data);
      } catch (err: any) {
        console.error("Error fetching player data:", err);
        setError(err.message);
      }
    };

    fetchPlayerInfo();
  }, []);

  return (
    <div>
      {error && <h1 className="text-red-500">Error: {error}</h1>}

      <div>
        {/* {playerInfo && (
          <div className="bg-yellow-200/50 p-4 rounded">
            <ul>
              {playerInfo.map(({ player, manager }) => (
                <li key={player.id} className="border-b py-2">
                  <h2 className="font-bold text-lg">
                    Player: {player.firstName} {player.lastName}
                  </h2>
                  {manager && (
                    <p className="text-sm text-gray-600">
                      Manager: {manager.firstName} {manager.lastName}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )} */}

        
      </div>
    </div>
  );
};

export default ApiTry;
