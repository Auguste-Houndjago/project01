'use client'


import { getAllPlayers } from "@/lib/constants";
import { Player, Statistics } from "@prisma/client";
import { createContext, useContext, useEffect, useState } from 'react';




interface PlayersContextType {
    players: Player[];
    statistics: Statistics[];
}

const PlayersContext = createContext<PlayersContextType | undefined >(undefined)

export const PlayerProvider = ({children}:{children: React.ReactNode}) => {

const [players, setplayers] = useState<Player[]>([]);
const [statistics, setstatistics] = useState<Statistics[]>([]);


useEffect(() => {
 const fetchData = async ()=>{
    const playersData = await getAllPlayers();
    // const statisticsData = await getAllStatistics();

    setplayers(playersData);
    // setstatistics(statisticsData)


 }   


fetchData().catch((error)=> console.error(error) )
}, []);


    return ( 
    <PlayersContext.Provider value={{players, statistics}}>
        {children}
    </PlayersContext.Provider>

    );
}
 
export default PlayerProvider;


export const usePlayers = () =>{
const context = useContext(PlayersContext);
 if (!context) {
    throw new Error("use usePlayers inside PlayersProvider")
 }
return context;
}