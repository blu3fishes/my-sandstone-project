import { tag, scoreboard, data, effect, execute, MCFunction, say, playsound, coordinatesParser, title, functionCmd, Tag, Selector } from 'sandstone';
// define Variables.
const namespace = 'cflegend:';
function addNamespace(variable:string):string {
    return namespace + variable;
}

function addNamespaceArr(variable:string[]):string[] {
    variable.forEach((tmp, i) =>{
        variable[i] = namespace + tmp;
        });
    return variable;
}

// this is score names.
const scoreNames = ['runeMain', 'runeSub1', 'runeSub2', 'runeBrute', 'runeGuard', 'runeMystic', 'runePhantom'];

//below here is the function's location.
const mainIndex = addNamespace('rune/effects/main/index');
const mainReset = addNamespace('rune/effects/main/reset');
const mainRunes = addNamespaceArr(['none', 'rune/effects/main/brutal', 'rune/effects/main/guardian', 'rune/effects/main/mystic', 'rune/effects/main/phantom']);

const subIndex = addNamespace('rune/effects/sub/index');
const subReset = addNamespace('rune/effects/sub/reset');
const subRunes = addNamespaceArr(['none', 'rune/effects/sub/atk', 'rune/effects/sub/hlt', 'rune/effects/sub/def']);
// below here is the enum
const mainRunesName = ['none', 'brutal', 'guardian', 'mystic', 'phantom'];
const uiCode = []; // actual ui custom font code.
// Selectors.

// initialize scoreboards.
(function runeSettings(){
    
    MCFunction(namespace + 'rune/init', () => {
        scoreNames.forEach(names => {
            scoreboard.objectives.add(names, 'dummy');
            execute.as('@a').store.result.score('@s', names).run.scoreboard.players.get('@s', names);
        });
    }, { runOnLoad: true });

    MCFunction(namespace + 'rune/uninstall', () => {
        scoreNames.forEach(names => {
            scoreboard.objectives.remove(names);
        })
    });
})();

// reset main runes.
MCFunction(mainReset, () => {
    playsound('minecraft:block.respawn_anchor.charge', 'master', '@s', coordinatesParser(['~', '~', '~']), 1, 1.2, 0);
    for(let i = 1; i<mainRunes.length; ++i){
        tag('@s').remove(mainRunesName[i]);
    }
    for(let i = 1; i<mainRunes.length; ++i){
        execute.as(`@s[scores={runeMain=${i}}]`).run.tag('@s').add(mainRunesName[i]);
        execute.as(`@s[tag=${mainRunesName[i]}]`).run.scoreboard.players.set('@s', 'runeMain', i);
    }
});

// index function of main rune effects.
MCFunction(mainIndex, () => {
    for (let i = 1; i < mainRunes.length; ++i) {
        execute.as(`@a[scores={runeMain=${i}}]`).run(() => {
            functionCmd(mainRunes[i]);
        });
    }
});

// main rune effects.
(function mainEffects() {
    MCFunction(mainRunes[1], () => {
        execute.as('@s[tag=!brutal]').run.functionCmd(mainReset);
        execute.as('@s[scores={runeBrute=140..}]').run.effect.give('@s', 'minecraft:regeneration', 4, 1, true);
        scoreboard.players.add('@s[scores={runeBrute=..140}]', 'runeBrute', 1);
        scoreboard.players.add('@s[scores={cf_dmgTaken=1..}]', 'runeBrute', 0);
        effect.clear('@s[scores={cf_dmgTaken=1..}]', 'minecraft:regeneration');
        execute.as('@s[scores={runeBrute=140]').run.playsound('minecraft:entity.blaze.ambient', 'master', '@s', coordinatesParser(['~', '~', '~']), 1, 0.7, 0);
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
})();
// subrune effects.
MCFunction(subReset, () =>{

});

MCFunction(subIndex, () => {

});

(function subEffects() {

})();

// display user interface.
(function setUiFunction(){
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
})();
// Main Rune Modules' items' recipe, give function.

// loop function. assigned to static loop function.
MCFunction(addNamespace('rune/loop'), () => {

});