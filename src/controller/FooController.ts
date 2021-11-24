import { say } from "sandstone";
import { isMCFunction } from "../decorators/isMCFunction";

export class FooController {
    @isMCFunction('controller/foo')
    foo(){
        say('HI');
    }
}