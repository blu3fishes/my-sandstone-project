import { addNamespace, ModuleObject } from "../Objects";

import { coordinatesParser, execute, MCFunction, scoreboard, tag } from "sandstone";


export class MainRune extends ModuleObject{
    index:string;
    reset:string;
    runes:string[] | void[];
    runeNames:string[];
    scores:string[];
    constructor(namespace: string, index_location:string, reset_location:string, scores:string[]) {
        super();
        this.index = addNamespace(namespace, index_location);
        this.reset = addNamespace(namespace, reset_location);
        this.runes = ['none', 'rune/effects/main/brutal', 'rune/effects/main/guardian', 'rune/effects/main/mystic', 'rune/effects/main/phantom']
        .map(cur => {addNamespace(namespace, cur)});
        this.runeNames = ['none', 'brutal', 'guardian', 'mystic', 'phantom'];
        this.scores = scores;
    }
    resetRune():void {
        // reset my rune!
        MCFunction(this.reset, () => {
            execute.at('@s').run.playsound('minecraft:block.respawn_anchor.charge', 'master', '@s', coordinatesParser(['~', '~', '~']), 1, 1.2, 0);

            for (let i = 1; i < this.runes.length; ++i) {
                tag('@s').remove(this.runeNames[i]);
            }

            for (let i = 1; i < this.runes.length; ++i) {
                execute.as(`@s[scores={runeMain=${i}}]`).run.tag('@s').add(this.runeNames[i]);
                scoreboard.players.set('@s', this.scores[i], 0);
            }
        });
    }
    setRune():void;
}