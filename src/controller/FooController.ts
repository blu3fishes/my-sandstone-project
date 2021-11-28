import {
  execute,
  Objective,
  say,
  scoreboard,
  Selector,
  tellraw,
} from "sandstone";
import { Execute, Scoreboard } from "sandstone/commands/implementations";
import { isMCFunction } from "../decorators/isMCFunction";
import { Foo } from "../model/Foo";

export class FooController {
  constructor() {
    let foo = new Foo();
    this.foo(foo);
    this.bar(foo);
  }
  @isMCFunction("controller/foo")
  foo(foo: Foo) {
    say("HI");
    let player = Objective.get(foo.foo("@s"));
    console.log("hello");
    tellraw("@s", [{ text: "ff" }, { score: foo.foo, selector: "@s" }]);
  }

  @isMCFunction("controller/foo")
  bar(foo: Foo): void {
    say("Hello");
  }
}
