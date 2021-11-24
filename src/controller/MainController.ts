import { FooController } from "./FooController";
import { StatController } from "./StatController";

export class MainController {
    constructor(){
        new StatController();
        new FooController();
    }
}