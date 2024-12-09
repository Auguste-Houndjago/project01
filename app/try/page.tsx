import { PlayerStats } from "@/components/dashboard/player-stats";
import PlayerProfile from "@/components/players/PlayerProfile";
import ApiTry from "@/components/try/ApiTry";
import PlayersPage from "@/components/try/PlayerRelation";


const TestUi = () => {
    return ( <div>
  <h1>test page</h1>
  <PlayerStats/>

  <div>
    <PlayerProfile/>
  </div>

  <ApiTry/>

  <PlayersPage/>
    </div> );
}
 
export default TestUi;