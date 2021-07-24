playsound minecraft:block.respawn_anchor.charge master @s ~ ~ ~ 1 1.2 0
tag @s remove brutal
tag @s remove guardian
tag @s remove mystic
tag @s remove phantom
execute as @s[scores={runeMain=1}] run tag @s add brutal
execute as @s[tag=brutal] run scoreboard players set @s runeMain 1
execute as @s[scores={runeMain=2}] run tag @s add guardian
execute as @s[tag=guardian] run scoreboard players set @s runeMain 2
execute as @s[scores={runeMain=3}] run tag @s add mystic
execute as @s[tag=mystic] run scoreboard players set @s runeMain 3
execute as @s[scores={runeMain=4}] run tag @s add phantom
execute as @s[tag=phantom] run scoreboard players set @s runeMain 4