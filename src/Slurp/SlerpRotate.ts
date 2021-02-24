import { SlerpData } from "./SlerpData"

// a system to carry out the rotation
export class SlerpRotate implements ISystem {
    group = engine.getComponentGroup(SlerpData);

    update(dt: number) {
        for (let entity of this.group.entities) {
            let slerp = entity.getComponent(SlerpData)
                let transform = entity.getComponent(Transform)
                if (slerp.fraction < 1) {
                    let rot = Quaternion.Slerp(
                    slerp.originRot,
                    slerp.targetRot,
                    slerp.fraction
                    )
                    transform.rotation = rot;
                    slerp.fraction += (dt / 5) * slerp.speed;

                    // Clamping
                    if(slerp.fraction<0){
                        slerp.fraction = 0;
                    } else if (slerp.fraction > 1){
                        slerp.fraction = 1;
                    }
                }
        }
    }
}