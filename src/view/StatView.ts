import { MCFunction, say, tellraw } from "sandstone";
import { isMCFunction } from "../modules/MVCStone";

export class StatView {
  constructor() {
    this.viewStat();
  }
  
  @isMCFunction("view/view_stat")
  viewStat() {
    tellraw("@s", "showing stats of mine...");
    say("showing stats globally...");
  }
}
