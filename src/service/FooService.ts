import { Objective, tellraw } from "sandstone";
import { MVCScoreboard } from "../modules/MVCStone";

export class FooService {
    getFooClass(fooScoreboard:MVCScoreboard, who:string):void {
        const myScore = fooScoreboard.getSelector(who);
        tellraw("@a", [
            {text:"my score is "},
            {score:fooScoreboard.scoreboard, selector:who},
            {text:"score!"}
        ]);
        myScore.add(1);
    }
}