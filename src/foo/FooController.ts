import { Controller, isLoopTick, isMCFunction } from "mvcstone";
import { FooService } from "./FooService";

@Controller()
// manages or detects user input, scoreboard variation and skill logics.
// builds responses to inputs using services and creates MCFUNCTION files.
// in controller, you can not access to a scoreboard of Foo , which is the model of the module.
export class FooController{
  // you can add multiple services in controller, so that you can manage lot's of logics into one controller.
  private fooService: FooService = new FooService();
  constructor() {}

  @isMCFunction("foo/sayhi")
  foo(): void {
    this.fooService.foo();
  }

  // in controller you can just change route of the module's logics.
  // for example, i want to append this method from "foo/sayhello" to "foo/sayhi"
  // just change the decorator's parameter
  @isMCFunction("foo/sayhi")
  bar(): void {
    this.fooService.bar();
  }

  @isLoopTick("foo/loop")
  foofoo(): void {
    this.fooService.foofoo();
  }
}
