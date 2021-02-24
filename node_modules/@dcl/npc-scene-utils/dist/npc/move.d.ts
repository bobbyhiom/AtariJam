/// <reference types="dcl" />
import { NPC } from './npc';
export declare class NPCLerpData {
    path: Vector3[];
    origin: number;
    target: number;
    fraction: number;
    totalDuration: number;
    speed: number[];
    loop: boolean;
    onFinishCallback?: () => void;
    onReachedPointCallback?: () => void;
    constructor(path: Vector3[]);
    setIndex(index: number): void;
}
export declare let walkingNPCGroup: NPC[];
export declare class NPCWalkSystem implements ISystem {
    static _instance: NPCWalkSystem | null;
    update(dt: number): void;
    static createAndAddToEngine(): NPCWalkSystem;
    private constructor();
}
