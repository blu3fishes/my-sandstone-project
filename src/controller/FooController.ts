import { Objective, say, tellraw } from "sandstone";
import { Controller, isLoopTick, isMCFunction } from "../modules/MVCStone";
import { Foo } from "../model/Foo";
import { FooService } from "../service/FooService";

@Controller
export class FooController{
  fooModel: Foo;
  fooService: FooService;
  constructor() {
    this.fooModel = new Foo();
    this.fooService = new FooService();
  }

  @isMCFunction("foo/sayhi")
  foo(): void {
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
    say("Hello");
    this.fooService.getFooClass(this.fooModel.scoreboard1, "@s");
    this.fooService.getFooClass(this.fooModel.scoreboard1, "lees2541");
    this.fooService.getFooClass(this.fooModel.scoreboard1, "Jinjun");
  }

  @isLoopTick("foo/loop")
  foofoo(): void {
    const allFoos = this.fooModel.foo("@a");
    allFoos.add(1);
  }
}
