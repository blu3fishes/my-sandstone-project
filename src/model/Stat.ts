import { MCFunction, Objective, tellraw } from "sandstone";
import { MainModel } from './MainModel';

export class Stat {
    health = Objective.create('model.health', 'dummy');
    constructor() {
        MCFunction('model/stat', () => {
            tellraw('@a', 'Stat Model Loaded');
        }, {runOnLoad:true});
    }
}