import Creature from './iCreature'
export interface Fish extends Creature{
  name:         string;
  url:          string;
  number:       number;
  image_url:    string;
  render_url:   string;
  location:     Location;
  shadow_size:  ShadowSize;
  rarity:       Rarity;
  total_catch:  number;
  sell_nook:    number;
  sell_cj:      number;
  tank_width:   number;
  tank_length:  number;
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
  availability_array: AvailabilityArray[];
  times_by_month:     { [key: string]: Time };
  months:             string;
  months_array:       number[];
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
