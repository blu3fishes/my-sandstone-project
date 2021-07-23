import {scoreboard, MCFunction} from 'sandstone';

const dummies = [];
const dmgDealt = 'cf_dmgDealt';
const dmgTaken = 'cf_dmgTaken';
const carrotStick = 'cf_carrotStick';

MCFunction('static/init', () => {
    dummies.forEach((child) => {
        scoreboard.objectives.add(child, 'dummy');
        scoreboard.players.set('@a', child, 0);
    });
    scoreboard.objectives.add(dmgDealt, 'minecraft:custom.damage_dealt');
    scoreboard.players.set('@a', dmgDealt, 0);
    scoreboard.objectives.add(dmgTaken, 'minecraft:custom.damage_taken');
    scoreboard.players.set('@a', dmgTaken, 0);
    scoreboard.objectives.add(carrotStick, 'minecraft:used.carrot_on_a_stick');
    scoreboard.players.set('@a', carrotStick, 0);
});

MCFunction('static/loop', () => {
    
}, {runEachTick:true});