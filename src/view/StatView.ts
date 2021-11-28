import { MCFunction, tellraw } from "sandstone";
import { isMCFunction } from "../decorators/isMCFunction";

export class StatView {
  constructor() {
    this.viewStat();
  }
  @isMCFunction("view/view_stat")
  viewStat() {
    tellraw("@s", "showing stats of mine...");
  }
}
