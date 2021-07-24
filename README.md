# Craft Legend.

Craft your weapon of legend!

Craft Legend Mod, hereinafter referred to as 'CF', is The Survival Datapack which is JRPG-like elements addon.
<hr/>
전설의 무기를 만들어라!

크래프트 레전드 모드 (이하 CF모드) 는 JRPG 스타일의 요소를 추가한 애드온 형 서바이벌 게임 데이터팩입니다.

# 1. Rune
> **Main Rune**

ㅁ **주 룬**
 - `Mystic Rune` `Brutal Rune` `Guardian Rune` `Phantom Rune` 으로 구성되어 있다.
 - 각각의 룬을 착용할 시 특수한 패시브를 갖는 **장착형 직업** 이라고 보면된다.

## 1. **Brutal Rune** || 붉고 검은 도끼 모양 ||
 - 지옥에서 피글린 야수를 죽이면 별도로 드랍하는 `Brutal Blood` 를 얻는다.
 - `Brutal Blood` 와 `Emerald Block` 을 Smith table 에서 합성하여 Brutal Rune을 얻는다.

1-1. **Brutal Rune : Effect**
 - `7` 초 동안 피격 당하지 않는다면 `재생 II` 효과를 얻는다.

## 2. **Guardian Rune** || 푸른색 검 모양||
 - Elder Guardian을 죽이면 100%로 드랍하는 `Soul of Guardians` 를 얻는다.
 - `Soul of Guardians` 와 `Emerald Block` 을 Smith table 에서 합성하여 Guardian Rune을 얻는다.

2-1. **Guardian Rune : Effect**
 - 매 공격시 `2` 초간 `저항 II` 효과를 얻는다.

## 3. **Mystic Rune** - ||보라색 황금사과 모양||
 - 엔드시티에서 얻는 `Shulker shell` 과 `Emerald Block` 을 Smith table 에서 합성하여 Mystic Rune을 얻는다.

3-1 **Mystric Rune : Effect**
 - `20` 초간 근접공격을 하지 않을 경우 `Wind` 스택이 쌓인다.
 - `Wind` 스택이 쌓인 상태에서 근접 공격을 할 경우 블럭 12 범위 내로 폭발이 퍼져서 해당 범위 내 몬스터에게 `부유 II`  7초를 적용하고, (블레이즈 숨소리)
 시전자를 순간적으로 띄운 뒤 `Feather Falling` 5초 를 적용한다 (엔더맨 이동소리) , Feather Falling 효과가 사라진 후 `Speed III`  3초 , ` 흡수 I ` 20초, ` 재생 II` 20초를 부여받는다. (블레이즈 숨소리)

## 4. **Phantom Rune** || 붉고 검은 낫 모양 ||
 - Phantom 을 잡아 얻은 팬텀막과 불사의 토템을 합성한 `Souls of Phantom` 을 얻는다.
 - `Souls of Phantom` 과 `Emerald Block` 을 Smith table 에서 합성하여 Phantom Rune 을 얻는다.

4-1. **Phantom Rune : Effect**
 - `12` 초 마다 피격 당하지 않을 시 `투명화` , `힘 III`, `공격력 x 200%` 적용, 성공적으로 타격시 불사의 토템 이펙트가 터짐.
 - 상시 ` 공격속도 -40% ` 적용.


> **Sub Runes**  || 2개씩 중복가능 착용 ||

-  **생명석 (+2최대체력)**
-  **수호석 (+0.5방어강도)**
-  **강화석 (+1공격력)**

ㅁ 부가룬은 주 룬을 착용해야 착용가능.
착용방법 : 아이템 들고 우클릭시 아이템 사라지면서 채팅창에 뜸. 어느쪽 룬과 교체할 것인지 해당 룬을 클릭하면 바뀐다.

`생명석 : 베리 + 에메랄드 블럭`
`수호석 : 청금석 + 에메랄드 블럭`
`강화석 : 레드스톤 + 에메랄드블럭`

# Sandstone project

To build the datapack, run:
```ts
npm run build
// or
yarn build
// or
sand build
```

To automatically rebuild the datapack on each change, run:
```ts
npm run watch
// or
yarn watch
// or
sand watch
```

