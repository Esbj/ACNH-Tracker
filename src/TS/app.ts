import {sea}  from './interface/sea'
import {fish}  from './interface/fish'
import {bugs as bug}  from './interface/bugs'

class Model {
  private url = "https://api.nookipedia.com/nh/";
  private key = "?api_key=814cd58a-d08e-4955-a123-6f42f8356616";

  async fetcher(path: string){
    const fullUrl = this.url + path + this.key;
    const res = await fetch(fullUrl);
    const data = await res.json();
    console.log(fullUrl)
    return data;
  }
}
class View {
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

  createSeaCreature(seaCreature: sea) {
    let holder = document.createElement("div");
    const image = document.createElement("img")
    image.setAttribute("src", seaCreature.imageURL)
    holder.append(image)
    holder.innerHTML += `
    <p>${seaCreature.name}</p>
    <p>
      <span>Avalible: ${seaCreature.north.timesByMonth}</span>
      <span>Location: </span>
    </p>
    `
    console.log(holder)
  }
}

let controller = new Controller();
let view = new View();
let model = new Model();
model.fetcher("bugs");
model.fetcher("sea");
model.fetcher("fish");