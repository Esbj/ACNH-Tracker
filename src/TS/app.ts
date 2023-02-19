import dotenv from "dotenv";
dotenv.config();
import Creature from "./interface/iCreature";
import { Sea } from "./interface/sea";
import { Bugs } from "./interface/bugs";
import { Fish } from "./interface/fish";

class Model {
  private url = "https://api.nookipedia.com/nh/";
  private key: string | undefined;
  fishData: Fish[] = [];
  bugData: Bugs[] = [];
  seaData: Sea[] = [];

  constructor() {
    this.key = process.env.API_KEY;
    this.init();
  }
  async fetcher(path: string) {
    const fullUrl = this.url + path + this.key;
    const res = await fetch(fullUrl);
    const data = await res.json();
    return data;
  }
  private init() {
    this.fetcher("fish").then((fishies) => {
      fishies.forEach((fish: Fish) => {
        this.fishData.push(fish);
      });
    });
    this.fetcher("bugs").then((bugs) => {
      bugs.forEach((bug: Bugs) => this.bugData.push(bug));
    });
    this.fetcher("sea").then((sea) => {
      sea.forEach((sea: Sea) => this.seaData.push(sea));
    });
  }
}
class View {
  public avalible: HTMLElement = document.querySelector(
    "#avalible"
  ) as HTMLElement;
  public found: HTMLElement = document.querySelector("#found") as HTMLElement;
  private cards?: HTMLDivElement[];
  clear() {
    this.found.innerHTML = "";
    this.avalible.innerHTML = "";
  }
  printAvalible(creature: Creature<{}>) {
    const div = document.createElement("div");
    div.classList.add("critter");
    div.innerHTML = `
      <a href = ${creature.url} target="_blank">
        <img src = "${creature.image_url}">
        ${controller.capitalize(creature.name)}
      </a>
      <div>
        <p>
          <span>Avalible:</span></br>
          ${creature.north.availability_array[0].months}</br>
          ${creature.north.availability_array[0].time}
        </p>
      </div>
    `;
    if (creature.shadow_size !== undefined) {
      div.innerHTML += `
      <p>
        <span>Shaddow size:</span></br>
        ${creature.shadow_size} 
      </p> 
      `;
    }
    if (creature.location !== undefined) {
      div.innerHTML += `
      <p>
        <span>Location:</span></br>
        ${creature.location} 
      </p> 
      `;
    }
    this.avalible.append(div);
  }
  printFound(creature: Creature<{}>) {}
}

class Controller {
  public activeMonth!: number | undefined;
  private model: Model;
  private view: View;
  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;
    const months = document.querySelectorAll("ul > li");
    months.forEach((month) => {
      month.classList.remove("active");
      month.addEventListener("click", () => {
        months.forEach((m) => m.classList.remove("active"));
        month.classList.add("active");
        this.activeMonth = this.monthToNumber(month.innerHTML);
        const foundCreatures = this.filterCreatures(this.activeMonth);
        this.view.clear();
        for (const creature of foundCreatures) {
          view.printAvalible(creature);
        }
      });
    });
  }
  filterCreatures(month: number): Creature<{}>[] {
    const foundCreatures: any[] = [];
    this.model.bugData.forEach((bug) => {
      if (bug.north.months_array.includes(month)) {
        foundCreatures.push(bug);
      }
    });
    this.model.fishData.forEach((fish) => {
      if (fish.north.months_array.includes(month)) {
        foundCreatures.push(fish);
      }
    });
    this.model.seaData.forEach((sea) => {
      if (sea.north.months_array.includes(month)) {
        foundCreatures.push(sea);
      }
    });
    return foundCreatures;
  }
  monthToNumber(month: string): number {
    const currentMonth = new Date().getMonth() + 1;
    switch (month) {
      case "January":
        return 1;
      case "Febuary":
        return 2;
      case "March":
        return 3;
      case "April":
        return 4;
      case "May":
        return 5;
      case "June":
        return 6;
      case "July":
        return 7;
      case "August":
        return 8;
      case "September":
        return 9;
      case "October":
        return 10;
      case "November":
        return 11;
      case "December":
        return 12;
      default:
        return currentMonth;
    }
  }
  capitalize(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  /*
  Det sparas ett världe i model som visar om ett kort är insamlat eller inte 
  När man clickar på ett görs följande:
    Sök upp kortet i model och flagga det (via controller)
    Töm inehållet i avalible och collected 
    Loopa igenom alla creatures i model igen
    Controller bestämmer baserat på flagga om den ska köra printAvalible eller printCollected
  */
  async findCreature(name: string) {
    name = name.toLowerCase();
    const fish = await this.model.fetcher("fish");
    const sea = await this.model.fetcher("sea");
    const bugs = await this.model.fetcher("bugs");
    const allCreatures: Creature<{}>[] = [...sea, ...fish, ...bugs];
    const foundCreature: Creature<{}> = allCreatures.find(
      (c) => c.name.toLowerCase() == name
    ) as Creature<{}>;
    return foundCreature;
  }
}

const model = new Model();
const view = new View();
const controller = new Controller(model, view);


async function printAllCreatures() {
  model
    .fetcher("bugs")
    .then((bugs) => bugs.forEach((bug: Bugs) => view.printAvalible(bug)));
  model
    .fetcher("sea")
    .then((sea) => sea.forEach((sea: Sea) => view.printAvalible(sea)));
  model
    .fetcher("fish")
    .then((fish) => fish.forEach((fish: Fish) => view.printAvalible(fish)));
}

printAllCreatures();
