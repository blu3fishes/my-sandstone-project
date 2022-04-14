import { Objective } from "sandstone";
import { MVCScoreboard } from "mvcstone";

export class Foo {
  foo;
  scoreboard1: MVCScoreboard;
  constructor() {
    this.foo = Objective.create("foooooo", "dummy");
    this.scoreboard1 = new MVCScoreboard("fooo", "dummy"); // 다른 방식
  }
}