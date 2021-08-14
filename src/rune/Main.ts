import { tag, scoreboard, data, effect, execute, MCFunction, say, playsound, coordinatesParser, title, functionCmd, Tag, Selector, attribute, Recipe, clear, NBT, particle, _, Objective, give, Advancement } from 'sandstone';
import { Attribute } from 'sandstone/commands/implementations';
import { notDeepEqual } from 'assert';
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
const scoreNames = ['runeMain', 'runeSubTrigger', 'runeSub1', 'runeSub2', 'runeBrute', 'runeGuard', 'runeMystic', 'runePhantom'];

//below here is the function's location.
const mainIndex = addNamespace('rune/effects/main/index');
const mainReset = addNamespace('rune/effects/main/reset');
const mainRunes = addNamespaceArr(['none', 'rune/effects/main/brutal', 'rune/effects/main/guardian', 'rune/effects/main/mystic', 'rune/effects/main/phantom']);

const subIndex = addNamespace('rune/effects/sub/index');
const subReset = addNamespace('rune/effects/sub/reset');
const subRunes = addNamespaceArr(['none', 'rune/effects/sub/atk', 'rune/effects/sub/def', 'rune/effects/sub/hlt']);
// below here is the enum
const mainRunesName = ['none', 'brutal', 'guardian', 'mystic', 'phantom'];
const uiCode = [
    ['none', 'brutal!', 'guardian!', 'mystic!', 'phantom!'],
    ['none', 'atk1!', 'def1!', 'hlt1!'],
    ['none', 'atk2!', 'def2!', 'hlt2!']
]; // actual ui custom font code.
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
        attribute('@s[tag=phantom,scores={runePhantom=240..}', 'minecraft:generic.attack_damage').add('257bf011-5efe-4655-a29a-5169df92f2a8', 'phm_chrg', 2, 'multiply_base');

        attribute('@s[scores={runePhantom=..239}]', 'minecraft:generic.attack_damage').remove('257bf011-5efe-4655-a29a-5169df92f2a8');
        execute.at('@s[tag=phantom,scores={runePhantom=240..,cf_dmgGiven=1..}').run.playsound('minecraft:item.totem.use', 'master', '@a', coordinatesParser(['~', '~', '~']), 1, 1, 0);
        execute.at('@s[tag=phantom,scores={runePhantom=240..,cf_dmgGiven=1..}').run.particle('minecraft:totem_of_undying', coordinatesParser(['~', '~', '~']), [0.7, 0.7, 0.7], 0.4, 300, 'force', '@a');
        scoreboard.players.set('@s[tag=phantom,scores={cf_dmgTaken=1..}', 'runePhantom', 0);
        scoreboard.players.set('@s[tag=phantom,scores={runePhantom=240..,cf_dmgGiven=1..}', 'runePhantom', 0);
        
        scoreboard.players.add('@s[tag=phantom,scores={runePhantom=..240}]', 'runePhantom', 1);
    });
})();
// subrune effects.

const self = Selector('@s');
const all = Selector('@a');
const sub1 = Objective.get('runeSub1');
const sub2 = Objective.get('runeSub2');
const uuidlist = [['uuidatk1', 'uuidatk2'],['uuiddef1', 'uuiddef2'],['uuidhlt1', 'uuidhlt2']];

MCFunction(subReset, () =>{
    // if tag=subreset1, reset sub1 effects
    tag('@s').remove('atk1');
    tag('@s').remove('def1');
    tag('@s').remove('hlt1');
    tag('@s').remove('atk2');
    tag('@s').remove('def2');
    tag('@s').remove('hlt2');

    //remove attributes.
    attribute('@s', 'minecraft:generic.attack_damage').remove(uuidlist[0][0]);
    attribute('@s', 'minecraft:generic.attack_damage').remove(uuidlist[0][1]);
    attribute('@s', 'minecraft:generic.armor_toughness').remove(uuidlist[1][0]);
    attribute('@s', 'minecraft:generic.armor_toughness').remove(uuidlist[1][1]);
    attribute('@s', 'minecraft:generic.max_health').remove(uuidlist[2][0]);
    attribute('@s', 'minecraft:generic.max_health').remove(uuidlist[2][1]);
    _.if(sub1(self).matches(1), () => {
        tag('@s').add('atk1');
    });
    _.if(sub1(self).matches(2), () => {
        tag('@s').add('def2');
    });
    _.if(sub1(self).matches(3), () => {
        tag('@s').add('hlt1');
    });
    // if tag=subreset2, reset sub2 effects
    _.if(sub2(self).matches(1), () => {
        tag('@s').add('atk2');
    })
    .elseIf(sub2(self).matches(2), () => {
        tag('@s').add('def2');
    })
    .elseIf(sub2(self).matches(3), () => {
        tag('@s').add('hlt2');
    });
});

MCFunction(subIndex, () => {
    //if sub1 atk, hlt, def
    _.if(sub1(all).matches(1), () => {
        execute.as('@s').run.functionCmd(subRunes[1]);
    })
    .elseIf(sub1(all).matches(2), () => {
        execute.as('@s').run.functionCmd(subRunes[2]);
    })
    .elseIf(sub1(all).matches(3), () => {
        execute.as('@s').run.functionCmd(subRunes[3]);
    });
    //and if sub2 atk, hlt, def
});

(function subEffects() {
    //if sub1, or if sub2
    MCFunction(subRunes[1], () => {
        attribute('@s[tag=atk1]', 'minecraft:generic.attack_damage').add(uuidlist[0][0], 'atk1', 1, 'add');
        attribute('@s[tag=atk2]', 'minecraft:generic.attack_damage').add(uuidlist[0][1], 'atk2', 1, 'add');
    });
    MCFunction(subRunes[2], () => {
        attribute('@s[tag=def1]', 'minecraft:generic.armor_toughness').add(uuidlist[1][0], 'def1', 0.5, 'add');
        attribute('@s[tag=def2]', 'minecraft:generic.armor_toughness').add(uuidlist[1][1], 'def2', 0.5, 'add');
    });
    MCFunction(subRunes[3], () => {
        attribute('@s[tag=hlt1]', 'minecraft:generic.max_health').add(uuidlist[2][0], 'hlt1', 2, 'add');
        attribute('@s[tag=hlt2]', 'minecraft:generic.max_health').add(uuidlist[2][1], 'hlt2', 2, 'add');
    });
})();

// display user interface.
(function setUiFunction(){
    for (let i = 0; i < 5; ++i) {
        for (let j = 0; j < 4; ++j) {
            MCFunction(`rune/rune_effect_ui/main_${i}/sub1_${j}/show_effects`, () => {
                for(let k = 0; k<4; ++k){
                    execute.as(`@a[scores={${scoreNames[2]}=${k}}]`).run(() => {
                        title(`@s`).actionbar(`{"text":"heuung~${uiCode[0][i]},${uiCode[1][j]},${uiCode[2][k]}"}`);
                    });
                }
            });
        }
        MCFunction(`rune/rune_effect_ui/main_${i}/sub1_idx`, () => {
            for(let t = 0; t<4; ++t){
                execute.as(`@a[scores={${scoreNames[1]}=${t}}]`).run(() => {
                    functionCmd(addNamespace(`rune/rune_effect_ui/main_${i}/sub1_${t}/sub2_idx`));
                });
            }
        });
    }
    MCFunction('rune/rune_effect_ui/main_idx', () => {
        for (let i = 0; i < 5; ++i) {
            execute.as(`@a[scores={${scoreNames[0]}=${i}}]`).run(() => {
                functionCmd(addNamespace(`rune/rune_effect_ui/main_${i}/sub1_idx`));
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
function get_custom_craft(item:string, recipe_base:string, recipe_addition:string, output_baseitem:string, give_code:string):void{
    let rcp = Recipe(`rune/${item}`, {
        'type':'smithing',
        'base':{
            'item':recipe_base,
            "tag":"ang?"
        },
        "addition":{
            "item":recipe_addition,
            "tag":""
        },
        "result":output_baseitem
    },{'onConflict':'warn'});
    let adv = Advancement(`rune/${item}`, {
        'criteria':{
            'unlock_the_recipe':{
                'trigger':'minecraft:recipe_unlocked',
                'conditions':{
                    'recipe':`cflegend:rune/${item}`
                }
            }
        },
        'rewards':{
            'function':`cflegend:rune/item/${item}`,
            'experience':40
        }
    }, {'onConflict':'warn'});
    MCFunction(`rune/item/give/${item}`, () => {
        // reset & give function.
        rcp.take('@s');
        adv.revoke('@s');
        clear(output_baseitem);
        give('@s', give_code);
    });
}

get_custom_craft('ang', 'ang', 'ang', 'ang', 'ang{ang:ang}');
// get_custom_craft('ang', 'abc');

MCFunction('cflegend:rune/item_index', () => {
    for(let i = 1; i<mainRunesName.length; ++i){
        let selector = `@s[scores={cf_carrotStick=1..},nbt={SelectedItem:{tag:{${mainRunesName[i]}:1b}}}]`;
        scoreboard.players.set(selector, 'runeMain', 1);        
        clear(selector, `carrot_on_a_stick{${mainRunesName[i]}:1b}`, 1);
    }
    let subName = [
        'atk',
        'def',
        'hlt'
    ];
    for(let i = 1; i<=3; ++i){
            let selector = `@s[scores={cf_carrotStick=1..},nbt={SelectedItem:{tag:{${subName[i]}:1b}}}]`;
            execute.as(selector).run(() => {
                functionCmd(subReset);
            });
            scoreboard.players.set(selector, 'runeSubTrigger', i);
            execute.as(selector).run( () => {functionCmd(`cflegend:rune/item/show_select`)});
            // scoreboard.players.set(selector, `runeSub${j}`, 1);
            clear(selector, `minecraft:carrot_on_a_stick{${subName[i]}:1b}`, 1);
    }
});

// loop function. assigned to static loop function.
MCFunction(addNamespace('rune/loop'), () => {
    functionCmd(mainIndex);
    functionCmd(subIndex);
    functionCmd('cflegend:rune/item_index');
});