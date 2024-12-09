"use client"
import { Player } from "@prisma/client";
import { useEffect, useState } from "react";

const PlayerProfile = () => {


    const [players, setPlayers] = useState<Player[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedPlayer, setselectedPlayer] = useState<Player>();
  
  
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

    const fetchPlayerDetails = async (playerId:string)=>{
        try {
            const playerResponce = await fetch(`api/players/${playerId} `)
            const playerTarget = await playerResponce.json()
            
            
            setselectedPlayer(playerTarget)
        } catch (error) {
            console.error("error fetching player id ", error)
        }

    }


    return ( <div>
               <ul>

                {players.map((player)=>(
                    <li key={player.id}>
                     <span onClick={()=> fetchPlayerDetails(player.id) } >joueur id : {player.firstName}</span>  
                    </li>
                ))}

                </ul>

                {selectedPlayer&& 
                <div>
                    <h1>player : {selectedPlayer.firstName}</h1>
                    <h2>nationaliter : {selectedPlayer.nationality} </h2>
                </div>
                }
    </div> );
}
 
export default PlayerProfile;