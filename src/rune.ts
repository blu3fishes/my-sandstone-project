const scoreNames = ['runeMain', 'runeSub1', 'runeSub2', 'runeBrute'];

import { tag, scoreboard, data, effect, execute, MCFunction, say, playsound, coordinatesParser, title, functionCmd, Tag, Selector } from 'sandstone';
import { TagArguments, TagCommand } from 'sandstone/commands/implementations';

const namespace = 'cflegend:';

// initialize scoreboards.

MCFunction(namespace + 'rune/init', () => {
    scoreNames.forEach(names => {
        scoreboard.objectives.add(names, 'dummy');
        scoreboard.players.set('@a', names, 0);
    });
}, { runOnLoad: true });

// define Main Rune Effects.

const mainIndex = namespace + 'rune/effects/main/index';
const mainReset = namespace + 'rune/effects/main/reset';
let mainRunes = ['none', 'rune/effects/main/brutal', 'rune/effects/main/guardian', 'rune/effects/main/mystic', 'rune/effects/main/phantom'];
let mainRunesName = ['none', 'brutal', 'guardian', 'mystic', 'phantom'];
mainRunes.forEach((child, i) => {
    mainRunes[i] = namespace + mainRunes[i];
});

MCFunction(mainReset, () => {
    playsound('minecraft:block.respawn_anchor.charge', 'master', '@s', coordinatesParser(['~', '~', '~']), 1, 1.2, 0);
    for(let i = 1; i<mainRunes.length; ++i){
        tag('@s').remove(mainRunesName[i]);
    }
    for(let i = 1; i<mainRunes.length; ++i){
        execute.as(`@a[scores={runeMain=${i}}]`).run.tag('@s').add(mainRunesName[i]);
    }
});

MCFunction(mainIndex, () => {
    for (let i = 1; i < mainRunes.length; ++i) {
        execute.as(`@a[scores={runeMain=${i}}]`).run(() => {
            functionCmd(mainRunes[i]);
        });
    }
});

function mainEffects() {
    MCFunction(mainRunes[1], () => {
        execute.as('@s[tag=!brutal]').run.functionCmd(mainReset);
    });

    MCFunction(mainRunes[2], () => {
        execute.as('@s[tag=!guardian]').run.functionCmd(mainReset);

    });

    MCFunction(mainRunes[3], () => {
        execute.as('@s[tag=!mystic]').run.functionCmd(mainReset);
    });

    MCFunction(mainRunes[4], () => {
        execute.as('@s[tag=!phantom]').run.functionCmd(mainReset);
    });
}

mainEffects();
// subrune effects.

const subIndex = 'rune/effects/sub/index';

// display user interface.

const uiCode = [];

let runeArray = new Array(5);
for (let i = 0; i < 5; ++i) {
    runeArray[i] = new Array(4);
    for (let j = 0; j < 4; ++j) {
        runeArray[i][j] = new Array(4);
        for (let k = 0; k < 4; ++k) {
            runeArray[i][j][k] = `rune/rune_effect_ui/main_${i}/sub1_${j}/sub2_${k}`;
            MCFunction(runeArray[i][j][k], () => {
                // display ui.
                // main : 0-empty 1-brutal 2-guardian 3-mystic 4-phantom
                // sub : 0-empty 1-health 2-tough 3-attack
            })
        }
    }
}

MCFunction('rune/rune_effect_ui/main_idx', () => {
    for (let i = 0; i < 5; ++i) {
        execute.as(`@a[scores={${scoreNames[0]}=${i}}`).run(() => {
            functionCmd(`rune/rune_effect_ui/main_${i}/sub1_idx`);
        });
    }
});

MCFunction('rune/loop', () => {

});