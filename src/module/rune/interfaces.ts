export abstract class Index{
    protected resetRune():void {};
    protected setRune():void{};
    protected runeCodes:string[];
    public setUI():void {};
    public runeLoop():void {};
}

export interface Rune{
    runeCode:string;
    runeEffect:Function;
    setRune:Function;
    resetRune:Function;
}

export interface Item{
    itemName : string;
    itemGiveCode:string;
    itemRecipe:string;
    apply:Function;
}

export interface MainRune extends Rune{

}

export interface SubRune extends Rune{
    subNumber:number;
    setRune:Function; // override with argument: subNumber.
}