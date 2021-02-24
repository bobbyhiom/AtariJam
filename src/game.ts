import {Scene} from "./entity/scene"
import { SwordInTheStone } from "./entity/swordinthestone"
import { Key } from "./entity/key"
import { ChestLid } from "./entity/chestlid"
import { Lock } from "./entity/lock"
import { Chalice } from "./entity/chalice"
import { SlerpRotate } from "./Slurp/SlerpRotate"
import { SpinRotate } from "./Spinner/SpinRotate"
import { P1 } from "./entity/p1"
import { SnakeDragon } from "./entity/snakedragon"

new Scene( 32,0.2, 32, 1, 0)

//new Key( 32,0.2, 32, 1, 0)


new SwordInTheStone( 32,0.2, 32, 1, 0)
new Key( 37,1.573, 41, 1, 0)
new Chalice( 32,0.2, 32, 1, 0)
new SnakeDragon(new Transform({
  position: new Vector3(32,0.2, 32)
}))



let chestLid = new ChestLid( 57.09, 0.86, 50.95, 1, 0)
//new ChestLid( 0, 0, 0, 1, 0)
new Lock(  32,0.2, 32, 1, 0)


new P1(new Transform({
    position: new Vector3(32,0.2, 32)
  }),chestLid)


// Add systems to engine
engine.addSystem(new SlerpRotate());
engine.addSystem(new SpinRotate());