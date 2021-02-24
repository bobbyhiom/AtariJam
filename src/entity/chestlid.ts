import { SlerpRotate } from "../Slurp/SlerpRotate"
import { SlerpData } from "../Slurp/SlerpData"
import { P1 } from "./p1"

export class ChestLid
 extends Entity {   
    update(dt: number) {
        let transform = this.getParent().getComponent(Transform)
        transform.rotate(Vector3.Up(), dt)
    }
    public isOpen: boolean

    static MODEL: string = "models/ChestLid.gltf"

    gltfShape: GLTFShape
    direction: Vector3 = Vector3.Right()

    constructor(x: number, y: number, z: number, scale: number, rotation: number) {
        super()
        this.isOpen = false;

        const pivot = new Entity()

        // Position the pivot entity on the pivot point of the rotation


        pivot.addComponent(  new Transform({
            position: new Vector3(6, 30, 30.9)
          }))

      //  pivot.addComponent(new BoxShape())

        // add pivot entity
       // engine.addEntity(pivot)
        // Set pivot as the parent
       // this.setParent(pivot)


        // Pivot /////////////////////////////////

        this.gltfShape = new GLTFShape(ChestLid.MODEL)
        this.addComponent(this.gltfShape)

        let baseTransform = new Transform()
        baseTransform.position.x = x
        baseTransform.position.y = y
        baseTransform.position.z = z

        baseTransform.rotate(Vector3.Up(), rotation )
        baseTransform.scale.set(1, 1, 1)
        this.addComponent(baseTransform)

        // Pivot /////////////////////////////////

        // Create AudioClip object, holding audio file
       // const clip = new AudioClip("sounds/door.wav")

        // Create AudioSource component, referencing `clip`
        //const source = new AudioSource(clip)

        // Add AudioSource component to entity
       // this.addComponent(source)

        // Play sound
       // source.playing = false

        engine.addEntity(this)


        this.addComponent(
            new OnClick((): void => {
              this.toggleDoor()
            })
          )



          this.addComponent(new SlerpData())

          this.getComponent(SlerpData).originRot = Quaternion.Euler(0, 0, 0)
          this.getComponent(SlerpData).targetRot = Quaternion.Euler(0, 0, 0)
          this.getComponent(SlerpData).fraction = 0;
          this.getComponent(SlerpData).speed = 8;

       // this.getComponent(SlerpData).targetRot = Quaternion.Euler(0, 90, 0)
        
    }

    public openDoor(playAudio = true): void {
        this.isOpen = true;
       // let transform = this.getParent().getComponent(Transform)
       // transform.rotate(Vector3.Up(), -90)
       this.getComponent(SlerpData).originRot = Quaternion.Euler(0, 0, 0)
       this.getComponent(SlerpData).targetRot = Quaternion.Euler(0, 0, -90)
       this.getComponent(SlerpData).fraction = 0;
        
    }

    public closeDoor(playAudio = true): void {
        this.isOpen = false;
        //let transform = this.getParent().getComponent(Transform)
        //transform.rotate(Vector3.Up(), 90)
        this.getComponent(SlerpData).originRot = Quaternion.Euler(0, 0, -90)
        this.getComponent(SlerpData).targetRot = Quaternion.Euler(0, 0, 0)
        this.getComponent(SlerpData).fraction = 0;
    }

    public toggleDoor(playAudio = true): void {
      if(P1.hasKey) {
        if (this.isOpen) {
          this.closeDoor(playAudio)
        } else {
          this.openDoor(playAudio)
        }
      }
    }
}