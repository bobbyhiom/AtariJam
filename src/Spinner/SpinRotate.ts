import { SpinData } from "./SpinData"

// a system to carry out the rotation
export class SpinRotate implements ISystem {
    group = engine.getComponentGroup(SpinData);

    update(dt: number) {
        for (let entity of this.group.entities) {
            let rotate = entity.getComponent(SpinData)
            let transform = entity.getComponent(Transform)
            transform.rotate(Vector3.Left(), rotate.speed)
        }
    }
}