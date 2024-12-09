import { PlayerStats } from "@/components/dashboard/player-stats";
import PlayerProfile from "@/components/players/PlayerProfile";
import ApiTry from "@/components/try/ApiTry";


const TestUi = () => {
    return ( <div>
  <h1>test page</h1>
  <PlayerStats/>

  <div>
    <PlayerProfile/>
  </div>

  <ApiTry/>
    </div> );
}
 
export default TestUi;