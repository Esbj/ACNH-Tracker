import { Sea } from "./interface/sea";
import { Bugs } from "./interface/bugs";
import { Fish } from "./interface/fish";
class Model {
  private url = "https://api.nookipedia.com/nh/";
  private key = "?api_key=814cd58a-d08e-4955-a123-6f42f8356616";


  private _fishData: Fish[] = [];
  public get fishData(): Fish[] {
    return this._fishData;
  }
  public set fishData(v: Fish[]) {
    this._fishData = v;
  }

  private _bugData: Bugs[] = [];
  public get bugData(): Bugs[] {
    return this._bugData;
  }
  public set bugData(v: Bugs[]) {
    this._bugData = v;
  }

  private _seaData: Sea[] = [];
  public get seaData(): Sea[] {
    return this._seaData;
  }
  public set seaData(v: Sea[]) {
    this._seaData = v;
  }
  constructor(){
    this.fetcher("fish").then((data) => {
      data.forEach((fish: Fish) => {
        this._fishData.push(fish);
      });
    });
    this.fetcher("bugs").then((data) => {
      data.forEach((bug: Bugs) => {
        this._bugData.push(bug);
      });
    });
    this.fetcher("sea").then((data) => {
      data.forEach((sea: Sea) => {
        this._seaData.push(sea);
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
  public critters: HTMLElement = document.querySelector(
    "#critters"
  ) as HTMLElement;
  printCreature(card: HTMLDivElement) {
    this.critters.append(card);
  }
}

class Controller {
  public activeMonth!: string;

  constructor() {
    const months = document.querySelectorAll("div > p");
    months.forEach((m) =>
      m.addEventListener("click", () => {
        this.activeMonth = m.innerHTML;
      })
    );
  }
  capitalize(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  createSeaCreature(creature: Sea) {
    let holder = document.createElement("div");
    holder.classList.add("critter");
    const image = document.createElement("img");
    image.setAttribute("src", creature.image_url);
    holder.append(image);
    holder.innerHTML += `
    <a href = ${creature.url} target="_blank">${this.capitalize(
      creature.name
    )}</a>
    <p>
      Avalible:</br>
      ${creature.north.availability_array[0].months}</br>
      ${creature.north.availability_array[0].time}
    </p>
    <p>
      Shadow size:</br>
      ${creature.shadow_size} 
    </p>
    `;
    return holder;
  }
  createBug(creature: Bugs) {
    let holder = document.createElement("div");
    holder.classList.add("critter");
    const image = document.createElement("img");
    image.setAttribute("src", creature.image_url);
    holder.append(image);
    holder.innerHTML += `
    <a href = ${creature.url} target="_blank">${this.capitalize(
      creature.name
    )}</a>
    <p>
      Avalible:</br>
      ${creature.north.months}</br>
      ${creature.north.availability_array[0].time}
    </p>
    <p>
      Location:</br>
      ${creature.location} 
    </p>
    `;
    return holder;
  }
  createFish(creature: Fish) {
    let holder = document.createElement("div");
    holder.classList.add("critter");
    const image = document.createElement("img");
    image.setAttribute("src", creature.image_url);
    holder.append(image);
    console.log(creature);
    holder.innerHTML += `
    <a href = ${creature.url} target="_blank">${this.capitalize(
      creature.name
    )}</a>
    <p>
      Avalible:</br>
      ${creature.north.months}</br>
      ${creature.north.availability_array[0].time}
    </p>
    <p>
      Location:</br>
      ${creature.location} 
    </p>
    <p>
      Shadow size:</br>
      ${creature.shadow_size} 
    </p>
    `;
    return holder;
  }
}

let view = new View();
let model = new Model();
let controller = new Controller();

model.fetcher("sea").then((c) =>
  c.forEach((critter: Sea) => {
    let div = controller.createSeaCreature(critter);
    view.printCreature(div);
  })
);
model.fetcher("fish").then((c) =>
  c.forEach((critter: Fish) => {
    let div = controller.createFish(critter);
    view.printCreature(div);
  })
);
model.fetcher("bugs").then((c) =>
  c.forEach((critter: Bugs) => {
    let div = controller.createBug(critter);
    view.printCreature(div);
  })
);
