import { tag, scoreboard, data, effect, execute, MCFunction, say, playsound, coordinatesParser, title, functionCmd, Tag, Selector, attribute, Recipe, clear, NBT } from 'sandstone';
import { Attribute } from 'sandstone/commands/implementations';
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
    execute.at('@s').run.playsound('minecraft:block.respawn_anchor.charge', 'master', '@s', coordinatesParser(['~', '~', '~']), 1, 1.2, 0);
    for(let i = 1; i<mainRunes.length; ++i){
        tag('@s').remove(mainRunesName[i]);
    }
    for(let i = 1; i<mainRunes.length; ++i){
        execute.as(`@s[scores={runeMain=${i}}]`).run.tag('@s').add(mainRunesName[i]);
        scoreboard.players.set('@s', scoreNames[i+2], 0);
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
        execute.as('@s[tag=brutal,scores={runeBrute=140..}]').run.effect.give('@s', 'minecraft:regeneration', 4, 1, true);
        scoreboard.players.add('@s[tag=brutal,scores={runeBrute=..140}]', 'runeBrute', 1);
        scoreboard.players.add('@s[tag=brutal,scores={cf_dmgTaken=1..}]', 'runeBrute', 0);
        effect.clear('@s[tag=brutal,scores={cf_dmgTaken=1..}]', 'minecraft:regeneration');
        execute.at('@s[tag=brutal,scores={runeBrute=140]').run.playsound('minecraft:entity.blaze.ambient', 'master', '@s', coordinatesParser(['~', '~', '~']), 1, 0.7, 0);
    });

    MCFunction(mainRunes[2], () => {
        execute.as('@s[tag=!guardian]').run.functionCmd(mainReset);
        scoreboard.players.set('@s[tag=guardian,scores={cf_dmgGiven=1..}]', 'runeGuard', 40);
        effect.give('@s[tag=guardian,scores={runeGuard=1..}]', 'minecraft:resistance', 2, 1, true);
        scoreboard.players.remove('@s[tag=guardian,scores={runeGuard=1..}]', 'runeGuard', 1);
        effect.clear('@s[tag=guardian,scores={runeGuard=0}]', 'minecraft:resistance');
    });

    MCFunction(mainRunes[3], () => {
        execute.as('@s[tag=!mystic]').run.functionCmd(mainReset);
        // add
        execute.at('@s[scores={runeMystic=4000}]').run.playsound('minecraft:entity.arrow.hit_player', 'master', '@s', coordinatesParser(['~', '~', '~']), 1, 0.8, 0);
        execute.at('@s[scores={runeMystic=4000..,cf_dmgGiven=1..}]').run.effect.give('@e[type=!player,distance=..12]', 'minecraft:levitation', 7, 1, false);
        execute.at('@s[scores={runeMystic=4000..,cf_dmgGiven=1..}]').run.playsound('minecraft:entity.blaze.ambient', 'master', '@a', coordinatesParser(['~','~','~']), 1, 1.4, 0);
        
        effect.give('@s[scores={runeMystic=4000..,cf_dmgGiven=1..}]', 'minecraft:levitation', 1, 5, true);
        effect.clear('@s[scores={runeMystic=-100}]', 'minecraft:levitation');
        effect.give('@s[scores={runeMystic=-100}]', 'feather_falling', 5, 0, false);

        effect.give('@s[scores={runeMystic=-1}]', 'minecraft:speed', 3, 2);
        effect.give('@s[scores={runeMystic=-1}]', 'minecraft:regeneration', 7, 1);
        
        scoreboard.players.set('@s[scores={runeMystic=4000..,cf_dmgGiven=1..', 'runeMystic', -102);
        scoreboard.players.add('@s[scores={runeMystic=..4000}]', 'runeMystic', 1);
        scoreboard.players.set('@s[scores={cf_dmgGiven=1..}]', 'runeMystic', 0);
    });

    MCFunction(mainRunes[4], () => {
        execute.as('@s[tag=!phantom]').run.functionCmd(mainReset);

        execute.as('@s[tag=phantom,scores={runePhantom=240..}]').run.effect.give('@s', 'minecraft:invisiblity', 3, 0, true);
        execute.as('@s[tag=phantom,scores={runePhantom=240..}]').run.effect.give('@s', 'minecraft:strength', 3, 2, true);
        attribute('@s[tag=phantom,scores={runePhantom=240..}', 'minecraft:generic.attack_damage').add('uuid?', 'phm_chrg', 2, 'multiply_base');

        attribute('@s[scores={runePhantom=..239}]', 'minecraft:generic.attack_damage').remove('uuid?');
        execute.at('@s[tag=phantom,scores={runePhantom=240..,cf_dmgGiven=1..}').run.playsound('minecraft:item.totem.use', 'master', '@a', coordinatesParser(['~', '~', '~']), 1, 1, 0);
        execute.at('@s[tag=phantom,scores={runePhantom=240..,cf_dmgGiven=1..}').run.particle('minecraft:totem_of_undying', coordinatesParser(['~', '~', '~']), [0.7, 0.7, 0.7], 0.4, 300, 'force', '@a');

        scoreboard.players.set('@s[tag=phantom,scores={cf_dmgTaken=1..}', 'runePhantom', 0);
        scoreboard.players.set('@s[tag=phantom,scores={runePhantom=240..,cf_dmgGiven=1..}', 'runePhantom', 0);
        
        scoreboard.players.add('@s[tag=phantom,scores={runePhantom=..240}]', 'runePhantom', 1);
    });
})();
// subrune effects.
MCFunction(subReset, () =>{
    // if tag=subreset1, reset sub1 effects
    console.log('yeet');
    // if tag=subreset2, reset sub2 effects
});

MCFunction(subIndex, () => {
    //if sub1 atk, hlt, def

    //and if sub2 atk, hlt, def
});

(function subEffects() {
    //if sub1, or if sub2
    MCFunction(subRunes[1], () => {
        
    });
    MCFunction(subRunes[2], () => {

    });
    MCFunction(subRunes[3], () => {

    });
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
                });
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
// Recipe('cflegend:rune/main/brutal', ''); // get recipe JSON
// Recipe('cflegend:rune/main/guardian', ''); // get recipe JSON
// Recipe('cflegend:rune/main/mystic', '');
// Recipe('cflegend:rune/main/phantom', '');

const items = ['brutal', 'guardian', 'mystic', 'phantom', ''];
const item_codes = [];
// const item_locations = addNamespaceArr(); // use map function so that build array via 'items'
function get_custom_craft(item:string, item_location:string, give_code:string):void{
    MCFunction(item_location, () => {

    });
}

MCFunction('cflegend:rune/item_index', () => {
    for(let i = 1; i<mainRunesName.length; ++i){
        let selector = `@s[scores={cf_carrotStick=1..},nbt={SelectedItem={tag:{${mainRunesName[i]}:1b}}}]`;
        scoreboard.players.set(selector, 'runeMain', 1);        
        clear(selector, `carrot_on_a_stick{${mainRunesName[i]}:1b}`, 1);
    }
});

// loop function. assigned to static loop function.
MCFunction(addNamespace('rune/loop'), () => {
    functionCmd(mainIndex);
    functionCmd(subIndex);
    functionCmd('cflegend:rune/item_index');
});