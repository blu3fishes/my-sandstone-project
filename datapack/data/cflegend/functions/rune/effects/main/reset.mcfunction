playsound minecraft:block.respawn_anchor.charge master @s ~ ~ ~ 1 1.2 0
tag @s remove brutal
tag @s remove guardian
tag @s remove mystic
tag @s remove phantom
execute as @a[scores={runeMain=1}] run tag @s add brutal
execute as @a[scores={runeMain=2}] run tag @s add guardian
execute as @a[scores={runeMain=3}] run tag @s add mystic
execute as @a[scores={runeMain=4}] run tag @s add phantom