import { NPC } from '../../node_modules/@dcl/npc-utils/index'
import { Dialog } from '../../node_modules/@dcl/npc-utils/utils/types'
import * as utils from '@dcl/ecs-scene-utils'
import * as ui from '@dcl/ui-scene-utils'

import { SwordInTheStone } from "./swordinthestone"
import { Key } from "./key"
import { SnakeDragon } from "./snakedragon"
import { Chalice } from "./chalice"
import { ChestLid } from './chestlid'

export class P1 extends NPC {
    static me: Entity
    static gameStarted: boolean = false

    static hasKey: boolean = false
    static hasSword: boolean = false
    static hasChallice: boolean = false

    static swordIcon:ui.LargeIcon = new ui.LargeIcon('images/Sword.png',-32,0)
    static keyIcon:ui.LargeIcon = new ui.LargeIcon('images/Key.png',-128-32,0)
    static chaliceIcon:ui.LargeIcon = new ui.LargeIcon('images/Chalice.png',-256-64,0)

    static chestlid:ChestLid;

    constructor(transform: Transform, chestlid: ChestLid) {
        super(transform,
            "models/p1.gltf",
            () => {
                if(P1.hasChallice){
                  this.talk(DialogGameCompleted, 0)
                } else if (P1.gameStarted) {
                  this.talk(DialogGameStarted, 0)
                } else {
                  this.talk(MyDialog, 0)
                }
             },
             {
              faceUser: false,
              reactDistance: 1,
              onWalkAway: () => {
                //alice.playAnimation('Goodbye', true, 2)
              },
            }
            )

            // hide icons
            P1.swordIcon.hide();
            P1.keyIcon.hide();
            P1.chaliceIcon.hide();

            P1.chestlid = chestlid
          

        engine.addEntity(this);      
        
        // Create AudioClip object, holding audio file
      //  const clip = new AudioClip("sounds/collect.wav")

        // Create AudioSource component, referencing `clip`
      //  const source = new AudioSource(clip)

        // Add AudioSource component to entity
     //   this.addComponent(source)

        // Play sound
    //    source.playing = false

        P1.me = this;

        let startPos = transform.position
        let endPos =  new Vector3(transform.position.x, transform.position.y-0.1, transform.position.z)

        this.addComponent(
          new utils.ToggleComponent(
            utils.ToggleState.Off,
            (value: utils.ToggleState) => {
              if (value == utils.ToggleState.On) {
                this.addComponentOrReplace(
                  new utils.MoveTransformComponent(startPos, endPos, 1, () => {
                    this.getComponent(utils.ToggleComponent).toggle()
                  })
                )
              } else {
                this.addComponentOrReplace(
                  new utils.MoveTransformComponent(endPos, startPos, 1, () => {
                    this.getComponent(utils.ToggleComponent).toggle()
                  })
                )
              }
            }
          )
        )
        this.getComponent(utils.ToggleComponent).toggle()
        


    }

    static playCollect() {
        //P1.me.getComponent(AudioSource).playOnce();
    }

    static showSword(){
      P1.swordIcon.show();
      P1.hasSword = true;
    }

    static showKey(){
      P1.keyIcon.show();
      P1.hasKey = true;
    }

    static showChalice(){
      P1.chaliceIcon.show();
      P1.hasChallice = true;
    }
}


export let MyDialog: Dialog[] = [
  {
    text: 'Welcome to my tribute to Adventure II',
  },
  {
    text: 'Adventure II was the much-anticipated, unofficial sequel to Atari\'s classic Adventure on the 2600',
  },
  {
    text: 'We need an adventurer to brave dragons and dangerous mazes to return the Chalice from the forces of evil. Is that you?',
    isQuestion: true,
    buttons: [
      { label: 'Yes', goToDialog: 4 },
      { label: 'Not now', goToDialog: 3 },
    ],
  },
  {
    text: 'Oh. Okay then',
    isEndOfDialog: true,
  },
  {
    text: 'Excellent! Thank you'
  },
  {
    text: 'You will need to find a sword and a key in the maze to have a chance of claiming back the Chalice, good luck!',
    isEndOfDialog: true,
    triggeredByNext: () => {
      startGame();
    },
  },
]

export let DialogGameStarted: Dialog[] = [
  {
    text: 'Good luck young adventurer',
    isEndOfDialog: true
  }
]

export let DialogGameCompleted: Dialog[] = [
  {
    text: 'Congratulations! You beat the game',
  },
  {
    text: 'Would you like to play again?',
    isQuestion: true,
    buttons: [
      { label: 'Yes', goToDialog: 3 },
      { label: 'Not now', goToDialog: 2 },
    ],
  },
  {
    text: 'Okay, come back if you change your mind',
    isEndOfDialog: true,
  },
  {
    text: 'Great, good luck!',
    isEndOfDialog: true,
    triggeredByNext: () => {
      resetGame();
      startGame();
    },
  },
]

function resetGame(){
  new SwordInTheStone( 32,0.2, 32, 1, 0)
new Key( 37,1.573, 41, 1, 0)
new Chalice( 32,0.2, 32, 1, 0)
new SnakeDragon(new Transform({
  position: new Vector3(32,0.2, 32)
}))

P1.swordIcon.hide();
P1.keyIcon.hide();
P1.chaliceIcon.hide();
P1.hasKey = false;
P1.hasSword = false;
P1.hasChallice = false;

P1.chestlid.closeDoor();


}

function startGame(){
    P1.gameStarted = true;  
}