import { P1 } from "./p1"

export class SwordInTheStone extends Entity {

    static MODEL: string = "models/SwordInTheStone.gltf"

    gltfShape: GLTFShape
    direction: Vector3 = Vector3.Right()

    constructor(x: number, y: number, z: number, scale: number, rotation: number) {
        super()

        this.gltfShape = new GLTFShape(SwordInTheStone.MODEL)
        this.addComponent(this.gltfShape)

        let baseTransform = new Transform()
        baseTransform.position.x = x
        baseTransform.position.y = y
        baseTransform.position.z = z
        baseTransform.rotate(Vector3.Up(), rotation )
        baseTransform.scale.set(scale, scale, scale)
        this.addComponent(baseTransform)

        this.addComponent(
            new OnPointerDown(
                ()=> {
                    P1.showSword();
                    engine.removeEntity(this);
                    //let transform = this.getComponent(Transform)
                    //transform.position = Camera.instance.position.clone();
                    //this.setParent(Attachable.AVATAR);
                },
                {
                    button: ActionButton.PRIMARY,
                    hoverText: "Wield",
                    distance: 3
                }
            )
        )

        engine.addEntity(this)
    }
}