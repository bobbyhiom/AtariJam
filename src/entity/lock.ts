export class Lock extends Entity {

    static MODEL: string = "models/Lock.gltf"

    gltfShape: GLTFShape
    direction: Vector3 = Vector3.Right()

    constructor(x: number, y: number, z: number, scale: number, rotation: number) {
        super()

        this.gltfShape = new GLTFShape(Lock.MODEL)
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