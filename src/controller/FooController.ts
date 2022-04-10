import { Objective, say, tellraw } from "sandstone";
import { Controller, isLoopTick, isMCFunction } from "../modules/MVCStone";
import { Foo } from "../model/Foo";

@Controller
export class FooController {
  fooModel: Foo;
  constructor() {
    this.fooModel = new Foo();
  }

  @isMCFunction("foo/sayhi")
  foo() {
    say("HI");
    let player = Objective.get(this.fooModel.foo("@s"));
    console.log("hello");
    tellraw("@s", [
      { text: "ff" },
      { score: this.fooModel.foo, selector: "@s" },
    ]);
  }

  @isMCFunction("foo/sayhi")
  bar(): void {
    this.fooModel;
    say("Hello");
  }

  @isLoopTick("foo/loop")
  foofoo(): void {
    const allFoos = this.fooModel.foo("@a");
    allFoos.add(1);
  }
}
