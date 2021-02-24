import { SpinData } from "../Spinner/SpinData"
import { P1 } from "./p1"

export class Key extends Entity {

    static MODEL: string = "models/Key.gltf"

    gltfShape: GLTFShape
    direction: Vector3 = Vector3.Right()

    constructor(x: number, y: number, z: number, scale: number, rotation: number) {
        super()

        this.gltfShape = new GLTFShape(Key.MODEL)
        this.addComponent(this.gltfShape)

        let baseTransform = new Transform()
        baseTransform.position.x = x
        baseTransform.position.y = y
        baseTransform.position.z = z
        baseTransform.rotate(Vector3.Up(), rotation )
        baseTransform.scale.set(scale, scale, scale)
        this.addComponent(baseTransform)

        this.addComponent(new SpinData())

        this.getComponent(SpinData).speed = -3;

        this.addComponent(
            new OnPointerDown(
                ()=> {
                    P1.showKey();
                    engine.removeEntity(this);
                },
                {
                    button: ActionButton.PRIMARY,
                    hoverText: "Take",
                    distance: 3
                }
            )
        )

        engine.addEntity(this)
    }
}