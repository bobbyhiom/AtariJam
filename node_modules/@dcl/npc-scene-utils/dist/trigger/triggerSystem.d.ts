/// <reference types="dcl" />
import { TriggerData } from '../utils/types';
export declare class NPCTriggerSystem implements ISystem {
    private static _instance;
    static get instance(): NPCTriggerSystem;
    private _triggers;
    private _cameraTriggerWrapper;
    private _componentGroup;
    private constructor();
    static createAndAddToEngine(): NPCTriggerSystem;
    /**
     * set a custom trigger's shape for the camera
     * @param shape custom trigger's shape
     */
    setCameraTriggerShape(shape: TriggerBoxShape | TriggerSphereShape): void;
    update(): void;
    private shouldWrapTriggerEntity;
    private wrapTriggerEntity;
    private static removeTriggerFromSystem;
    private static disengageCollision;
    private static engageCollision;
    private checkCollisionAgainstCamera;
    private checkCollisionAgainstOtherTriggers;
    private static canTriggersCollide;
    private static areColliding;
    private static areCollidingAABB;
    private static areCollidingSphere;
    private static areCollidingAABBSphere;
    private static getBoxShapeValues;
}
export declare class NPCTriggerComponent {
    /**
     * is trigger enable?
     */
    enabled: boolean;
    /**
     * shape of the collider
     */
    shape: TriggerBoxShape | TriggerSphereShape;
    /**
     * bit layer of the Tigger (usefull to discriminate between trigger events)
     */
    layer: number;
    /**
     * against which layer are we going to check trigger's collisions
     */
    triggeredByLayer: number;
    /**
     * callback when trigger is entered
     */
    onTriggerEnter?: (entity: Entity) => void;
    /**
     * callback when trigger is exit
     */
    onTriggerExit?: (entity: Entity) => void;
    /**
     * callback when trigger is entered
     */
    onCameraEnter?: () => void;
    /**
     * callback when trigger is exit
     */
    onCameraExit?: () => void;
    /**
     * get if debug is enabled
     */
    get debugEnabled(): boolean;
    private _debugEnabled;
    /**
     *
     * @param {TriggerBoxShape | TriggerSphereShape} shape shape of the triggering collider area
     * @param {TriggerData} data Object of type TriggerData, including the following optional fields: onCameraEnter, onCameraExit, onTriggerEnter, onTriggerExit, layer, triggeredByLayer, enableDebug
     */
    constructor(shape: TriggerBoxShape | TriggerSphereShape, data?: TriggerData);
}
export declare class TriggerBoxShape {
    size: Vector3;
    position: Vector3;
    constructor(size: Vector3, position: Vector3);
}
export declare class TriggerSphereShape {
    radius: number;
    position: Vector3;
    constructor(radius: number, position: Vector3);
}
