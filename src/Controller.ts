import { FooController } from "./controller/FooController";
import { StatController } from "./controller/StatController";

export class Controller {
  constructor() {
    new StatController();
    new FooController();
  }
}
