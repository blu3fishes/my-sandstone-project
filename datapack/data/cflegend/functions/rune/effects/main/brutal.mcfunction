execute as @s[tag=!brutal] run function cflegend:rune/effects/main/reset
execute as @s[scores={runeBrute=140..}] run effect give @s minecraft:regeneration 4 1 true
scoreboard players add @s[scores={runeBrute=..140}] runeBrute 1
scoreboard players add @s[scores={cf_dmgTaken=1..}] runeBrute 0
effect clear @s[scores={cf_dmgTaken=1..}] minecraft:regeneration
execute as @s[scores={runeBrute=140] run playsound minecraft:entity.blaze.ambient master @s ~ ~ ~ 1 0.7 0