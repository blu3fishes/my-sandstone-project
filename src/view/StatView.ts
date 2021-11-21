import { MCFunction, tellraw } from "sandstone";

export class StatView {
    constructor() {
        this.viewStat();
    }
    viewStat() {
        MCFunction('view/view_stat', () => {
            tellraw('@s', 'showing stats of mine...');
        });
    }
}