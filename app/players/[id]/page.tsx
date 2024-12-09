'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Player } from '@prisma/client';
import PlayerStatistics from '@/components/statistics/PlayerStatistics';


const PlayerStatsPage = () => {
  const [Player, setPlayer] = useState<Player[]>([]);
  
  const params = useParams();
  const playerId = Array.isArray(params.id) 
    ? params.id[0] 
    : params.id;    




  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Player Statistics</h1>
      {playerId && 
<PlayerStatistics playerId={playerId}/>
}
    </div>
  );
};

export default PlayerStatsPage;