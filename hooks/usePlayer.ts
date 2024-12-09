'use client'

import { useEffect, useState } from "react";



const usePlayer = (playerId:string) => {

const [player, setplayer] = useState(null);
const [statistics, setstatistics] = useState(null);
const [loading, setloading] = useState(true);

useEffect(() => {
    const fetchData = async ()=>{
        try {
            const playerResponce = await fetch(`/api/players/${playerId}`)
            const player = await playerResponce.json();

            const statisticsResponce = await fetch(`/api/players/${playerId}/statistics`)
            const statistics = await statisticsResponce.json()

            setplayer(player)
            setstatistics(statistics)
        } catch (error) {
            console.log("erreur dans la recuperation de player et stats")
            console.error("error fetching player data", error)
        }finally{
            setloading(false)
        }
    }
fetchData()
}, [playerId]);


return {player, statistics ,loading}
}
 
export default usePlayer;