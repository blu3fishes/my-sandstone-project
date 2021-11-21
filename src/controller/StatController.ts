import { MCFunction } from 'sandstone';
import {Stat} from '../model/Stat';

export class StatController {
    mainDir = 'controller/stat_controller';
    model = new Stat();
    constructor() {
        // 모든 메서드를 한번씩 실행
        this.checkStatClick(this.mainDir);
    }

    checkStatClick(dir):void {
        MCFunction(dir, () => {
            
        }, {onConflict:"append"});
    }
}