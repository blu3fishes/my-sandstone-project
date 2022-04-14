import { LootTable, Objective, say, tellraw } from "sandstone";
import { MVCScoreboard } from "mvcstone";
import { Foo } from "./Foo";

// implements detail logics where is used in its controller
// manage your variables which are created by its model class.
export class FooService {
  // in here you can define all of the scoreboards or variables.
  private foos = new Foo();
  private anotherClass = new MVCScoreboard("anoScoreboard", "dummy");
  private loot_table1 = LootTable('footable',
    {
      "pools": [
          {
              "rolls": 1,
              "bonus_rolls": 0,
              "entries": [
              
              ]
          }
        ]
    });

  foo(): void {
    // foos : the member of the service, foos.foo : one of the member of foos, which is the member of this class.
    say("HI");
    let player = Objective.get(this.foos.foo("@s"));
    console.log("hello");
    tellraw("@s", [
      { text: "ff" },
      // its too unefficient to use score this way.
      {score: this.foos.foo, selector: "@s" },
    ]);
  }
  
  bar(): void {
    say("Hello");
    this.getFooClass(this.foos.scoreboard1, "@s");
    this.getFooClass(this.foos.scoreboard1, "lees2541");
    this.getFooClass(this.foos.scoreboard1, "Jinjun");
  }

  getFooClass(fooScoreboard: MVCScoreboard, who: string): void {
    const myScore = fooScoreboard.getSelector(who);
    tellraw("@a", [
      { text: "my score is " },
      fooScoreboard.getTellrawScore(who),
      { text: "score!" }
    ]);
    myScore.add(1);
  }

  foofoo(): void {
    const allFoos = this.foos.foo("@a");
    allFoos.add(1);
  }

}