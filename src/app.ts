class Model {
  private url = "https://api.nookipedia.com/nh/";
  private key = "?api_key=814cd58a-d08e-4955-a123-6f42f8356616";

  async fetcher(path: string): Promise<iCritter> {
    const fullUrl = this.url + path + this.key;
    const res = await fetch(fullUrl);
    const data = await res.json();
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

  createCard(critter: iCritter) {
    let holder = document.createElement("div");
    const image = document.createElement("img")
    image.setAttribute("src", critter.imageURL)
    holder.append(image)
    holder.innerHTML += `
    <p>${critter.name}</p>
    <p>
      <span>Avalible: ${critter.north.timesByMonth}</span>
      <span>Location: ${critter.}</span>
    </p>
    `
    console.log(holder)
  }
}

let controller = new Controller();
let view = new View();
let model = new Model();
model.fetcher("sea");


export interface iCritter {
  name:           string;
  url:            string;
  number:         number;
  imageURL:       string;
  renderURL:      string;
  shadowSize:     ShadowSize;
  shadowMovement: ShadowMovement;
  rarity:         string;
  totalCatch:     number;
  sellNook:       number;
  tankWidth:      number;
  tankLength:     number;
  catchphrases:   string[];
  north:          North;
  south:          North;
}

export interface North {
  availabilityArray: AvailabilityArray[];
  timesByMonth:      { [key: string]: Time };
  months:            string;
  monthsArray:       number[];
}

export interface AvailabilityArray {
  months: string;
  time:   Time;
}

export enum Time {
  AllDay = "All day",
  Na = "NA",
  The4Am9Pm = "4 AM – 9 PM",
  The4Pm9Am = "4 PM – 9 AM",
  The9Am4Pm9Pm4Am = "9 AM – 4 PM; 9 PM – 4 AM",
  The9Pm4Am = "9 PM – 4 AM",
}

export enum ShadowMovement {
  Fast = "Fast",
  Medium = "Medium",
  Slow = "Slow",
  Stationary = "Stationary",
  VeryFast = "Very fast",
  VerySlow = "Very slow",
}

export enum ShadowSize {
  Large = "Large",
  Medium = "Medium",
  Small = "Small",
  Tiny = "Tiny",
  VeryLarge = "Very large",
}
