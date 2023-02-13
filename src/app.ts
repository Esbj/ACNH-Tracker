class Model {
  private url = "https://api.nookipedia.com/nh/";
  private key = "?api_key=814cd58a-d08e-4955-a123-6f42f8356616";



  async fetcher(path: string) {
    const fullUrl = this.url + path + this.key;
    const res =await fetch(fullUrl)
    const data = await res.json();
    console.log(data)
    return data
  }
}
class View {
  private _months: NodeList;
  public get months(): NodeList {
    return this._months;
  }
  public set months(v: NodeList) {
    this._months = v;
  }

  constructor(c: Controller) {
    let months = document.querySelectorAll("div > p");

    months.forEach((m) =>
      m.addEventListener("click", () => {
        c.activeMonth = m.innerHTML;
      })
    );
    this._months = months;
  }

  printCard(){

  }
}

class Controller {
  public activeMonth!: string;

  createCard(){

  }
}
let controller =new Controller();
let view = new View(controller);
let model = new Model();
model.fetcher('sea')