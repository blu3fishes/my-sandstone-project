import { MCFunction, say, Selector, _ } from "sandstone";
import { isMCFunction } from "../decorators/isMCFunction";
import { Stat } from "../model/Stat";

export class StatController {
  model;
  constructor() {
    // 모든 메서드를 한번씩 실행
    this.model = new Stat();
  }

  // @isMCFunction("controller/stat_check")
  checkStatClick(): void {
    say("HI");
  }
}
