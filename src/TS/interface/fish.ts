export interface fish {
  name:         string;
  url:          string;
  number:       number;
  imageURL:     string;
  renderURL:    string;
  location:     Location;
  shadowSize:   ShadowSize;
  rarity:       Rarity;
  totalCatch:   number;
  sellNook:     number;
  sellCj:       number;
  tankWidth:    number;
  tankLength:   number;
  catchphrases: string[];
  north:        North;
  south:        North;
}

export enum Location {
  Pier = "Pier",
  Pond = "Pond",
  River = "River",
  RiverClifftop = "River (clifftop)",
  RiverMouth = "River (mouth)",
  Sea = "Sea",
  SeaRaining = "Sea (raining)",
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
  The9Am4Pm = "9 AM – 4 PM",
  The9Am4Pm9Pm4Am = "9 AM – 4 PM & 9 PM – 4 AM",
  The9Pm4Am = "9 PM – 4 AM",
}

export enum Rarity {
  Empty = "",
  Rare = "Rare",
  Uncommon = "Uncommon",
  Unknown = "Unknown",
}

export enum ShadowSize {
  Huge = "Huge",
  Large = "Large",
  Long = "Long",
  Medium = "Medium",
  Small = "Small",
  Tiny = "Tiny",
  VeryLarge = "Very large",
  VeryLargeFinned = "Very large (finned)",
}
