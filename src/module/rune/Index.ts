import * as RuneModule from './interfaces';

class Index extends RuneModule.Index{
    protected runeCodes:string[] = [];
    protected runeScoreboard:string[] = [];

    constructor(){
        super();
        // call all of the modules to build the module.
    }
    protected resetRune(){
        // reset the whole Runes.
        // if someone called changing rule procedure, change score, after that, reset & set the runes.
    }
    protected setRune(){
        // set the main, sub1, sub2 runes.
    }
    runeLoop(){
        // the whole loop procedure of this module.
    }
    setUI(){
        // set the ui (mainrune, sub1, sub2)
        // in subrune, if rune change procedure is called, set scoreboard(chance:1) & and call tellraw ui.
    }
}

let main = new Index();