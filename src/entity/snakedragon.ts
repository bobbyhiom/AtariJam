import { NPC } from '../../node_modules/@dcl/npc-utils/index'
import { Dialog } from '../../node_modules/@dcl/npc-utils/utils/types'
import * as utils from '@dcl/ecs-scene-utils'
import * as ui from '@dcl/ui-scene-utils'
import { P1 } from './p1'

export class SnakeDragon extends NPC {
    isGrabbed: boolean = false
    static me: Entity 


    constructor(transform: Transform) {
        super(transform,
            "models/SnakeDragon.gltf",
            () => {
                if(P1.hasSword){
                  this.talk(DeathDialog,0)
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
          
        SnakeDragon.me = this;
        engine.addEntity(this);      
        
      }
}


export let MyDialog: Dialog[] = [
  {
    text: 'sssssssth go away humanthhh',
    isEndOfDialog: true,
  }
]

export let DeathDialog: Dialog[] = [
  {
    text: 'Sssssssth go away human',
  },
  {
    text: 'Wait..... what hathhhh you got?',
  },
  {
    text: 'Kill the beast?',
    isQuestion: true,
    buttons: [
      { label: 'Yes', goToDialog: 4 },
      { label: 'No', goToDialog: 3 },
    ],
  },
  {
    text: 'Leave me be human',
    isEndOfDialog: true,
  },
  {
    text: 'Noooarghhhhh!',
    isEndOfDialog: true,
    triggeredByNext: () => {
      killMe()
      
    },
  },
]

function killMe(){
  engine.removeEntity(SnakeDragon.me);  
}