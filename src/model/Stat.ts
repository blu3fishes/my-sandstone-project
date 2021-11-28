import { MCFunction, Objective, tellraw } from "sandstone";
import { MainModel } from "./MainModel";

export class Stat {
  heaStat = Objective.create("cf.hea", "dummy");
  strStat = Objective.create("cf.str", "dummy");
  hanStat = Objective.create("cf.han", "dummy");
  dexStat = Objective.create("cf.dex", "dummy");
  intStat = Objective.create("cf.int", "dummy");
  lucStat = Objective.create("cf.luc", "dummy");
  constructor() {}
}
