import { MCFunction, Objective, tellraw } from "sandstone";
import { MainModel } from './MainModel';

export class Stat {
	heaStat = Objective.create('model.hea', 'dummy');
	strStat = Objective.create('model.str', 'dummy');
	hanStat = Objective.create('model.han', 'dummy');
	dexStat = Objective.create('model.dex', 'dummy');
	intStat = Objective.create('model.int', 'dummy');
	lucStat = Objective.create('model.luc', 'dummy');

	constructor() {
		MCFunction('model/stat', () => {
			tellraw('@a', 'Stat Model Loaded');
		}, { runOnLoad: true });
	}
}