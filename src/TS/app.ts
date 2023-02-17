import dotenv from "dotenv";
dotenv.config();
import Creature from "./interface/iCreature";
import { Sea } from "./interface/sea";
import { Bugs } from "./interface/bugs";
import { Fish } from "./interface/fish";

class Model {
  private url = "https://api.nookipedia.com/nh/";
  private key: string | undefined;
  fishData: Fish[] = []
  bugData: Bugs[] = []
  seaData: Sea[] = []
  // private _fishData: Fish[] = [];
  // public get fishData(): Fish[] {
  //   return this._fishData;
  // }
  // public set fishData(v: Fish[]) {
  //   this._fishData = v;
  // }

  // private _bugData: Bugs[] = [];
  // public get bugData(): Bugs[] {
  //   return this._bugData;
  // }
  // public set bugData(v: Bugs[]) {
  //   this._bugData = v;
  // }

  // private _seaData: Sea[] = [];
  // public get seaData(): Sea[] {
  //   return this._seaData;
  // }
  // public set seaData(v: Sea[]) {
  //   this._seaData = v;
  // }
  constructor() {
    this.key = process.env.API_KEY;
    this.fetcher("fish").then((data) => {
      data.forEach((fish: Fish) => {
        this.fishData.push(fish);
      });
    });
    this.fetcher("bugs").then((data) => {
      data.forEach((bug: Bugs) => {
        this.bugData.push(bug);
      });
    });
    this.fetcher("sea").then((data) => {
      data.forEach((sea: Sea) => {
        this.seaData.push(sea);
      });
    });
  }
  async fetcher(path: string) {
    const fullUrl = this.url + path + this.key;
    const res = await fetch(fullUrl);
    const data = await res.json();
    return data;
  }
}
class View {
  public holder: HTMLElement = document.querySelector(
    "#critters #avalible"
  ) as HTMLElement;
  private cards?: HTMLDivElement[];
  clear() {
    this.holder.innerHTML = "";
  }
  printCreature(card: HTMLDivElement) {
    this.holder.append(card);
  }
  printCreatures(cards: HTMLDivElement[]) {
    for (const card of cards) {
      this.holder.append(card);
    }
  }
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
        const bugs = this.generateBugs(foundCreatures.bug);
        const sea = this.generateSeaCreatures(foundCreatures.sea);
        const fish = this.generateFish(foundCreatures.fish);
        this.view.clear();
        this.view.printCreatures(bugs);
        this.view.printCreatures(fish);
        this.view.printCreatures(sea);
      });
    });
  }
  filterCreatures(month: number): { [key: string]: any[] } {
    const foundCreatures: { [key: string]: any[] } = {
      bug: [],
      fish: [],
      sea: []
    };
    this.model.bugData.forEach((bug) => {
      if (bug.north.months_array.includes(month)) {
        foundCreatures.bug.push(bug);
      }
    });
    this.model.fishData.forEach((fish) => {
      if (fish.north.months_array.includes(month)) {
        foundCreatures.fish.push(fish);
      }
    });
    this.model.seaData.forEach((sea) => {
      if (sea.north.months_array.includes(month)) {
        foundCreatures.sea.push(sea);
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
  generateSeaCreatures(creatures: Sea[]): HTMLDivElement[] {
    const res: HTMLDivElement[] = [];
    creatures.forEach((c) => {
      let holder = document.createElement("div");
      holder.classList.add("critter");
      holder.innerHTML += `
      <a href = ${c.url} target="_blank">
        <img src="${c.image_url}">
        ${this.capitalize(c.name)}
      </a>
    <div>
    <p>
      <span>Avalible:</span>
      </br>
      ${c.north.availability_array[0].months}</br>
      ${c.north.availability_array[0].time}
      </p>
      <p>
      <span>Shadow size:</span>
      </br>
      ${c.shadow_size} 
      </p>
      </div>
      `;
      res.push(holder);
    });
    return res;
  }
  generateBugs(creatures: Bugs[]) {
    const res: HTMLDivElement[] = [];
    creatures.forEach((c) => {
      let holder = document.createElement("div");
      holder.classList.add("critter");
      holder.innerHTML += `
      <a href = ${c.url} target="_blank">
        <img src="${c.image_url}">
        ${this.capitalize(c.name)}
      </a>
      <div>
        <p>
          <span>Avalible:</span>
          </br>
          ${c.north.availability_array[0].months}
          </br>
          ${c.north.availability_array[0].time}
        </p>
        <p>
          <span>Location:</span>
          </br>
          ${c.location} 
        </p>
        </div>
      `;
      res.push(holder);
    });
    return res;
  }
  generateFish(creatures: Fish[]) {
    const res: HTMLDivElement[] = [];
    creatures.forEach((c) => {
      let holder = document.createElement("div");
      holder.classList.add("critter");
      holder.innerHTML += `
      <a class="flex" href = ${c.url} target="_blank">
        <img src="${c.image_url}">
        ${this.capitalize(c.name)}
      </a>
      <div>
    <p>
      <span>Avalible:</span></br>
      ${c.north.availability_array[0].months}</br>
      ${c.north.availability_array[0].time}
      </p>
      <p>
      <span>Shadow size:</span></br>
      ${c.shadow_size} 
      </p>
      <p>
      <span>Location:</span></br>
      ${c.location} 
      </p>
      </div>
      `;
      res.push(holder);
    });
    return res;
  }
  async findCreature(name: string) {
    const bugs = await model.fetcher('bugs')
    bugs.forEach((b:Bugs) => console.log(b.name))
    // const savedBugs = this.model.bugData
    // savedBugs.forEach(b => console.log(b.name));
  }
}

/*
Det sparas ett världe i model som visar om ett kort är insamlat eller inte 
När man clickar på ett görs följande:
  Sök upp kortet i model och flagga det (via controller)
  Töm inehållet i avalible och collected 
  Loopa igenom alla creatures i model igen
  Controller bestämmer baserat på flagga om den ska köra printAvalible eller printCollected
*/

const model = new Model();
const view = new View();
const controller = new Controller(model, view);
controller.findCreature("ant");
