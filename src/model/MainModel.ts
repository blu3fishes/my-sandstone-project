import {Objective} from 'sandstone';
import { StatController } from '../controller/StatController';

export class MainModel {
    static STAT_DMG_TAKEN = Objective.create('model.dmgtaken', 'minecraft.custom:minecraft.damage_taken');

    constructor(){
        new StatController();
    }
}